import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export let isPostgresConnected = false;
export let pgPool: pg.Pool | null = null;

const DATABASE_URL = process.env.DATABASE_URL;

if (DATABASE_URL) {
  try {
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1") ? false : { rejectUnauthorized: false }
    });
    console.log("PostgreSQL Pool initialized.");
  } catch (err) {
    console.error("Failed to initialize PostgreSQL pool:", err);
  }
} else {
  console.log("DATABASE_URL not found. Running on file-based JSON DB fallback.");
}

export async function initPostgres(defaultStore: any): Promise<any> {
  if (!pgPool) return null;

  try {
    const client = await pgPool.connect();
    isPostgresConnected = true;
    console.log("Successfully connected to PostgreSQL database!");

    // Create Tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt VARCHAR(100) NOT NULL,
        role_id VARCHAR(50) REFERENCES roles(id),
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        quota BIGINT NOT NULL DEFAULT 1073741824,
        used_space BIGINT NOT NULL DEFAULT 0
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS files_and_folders (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id VARCHAR(50) REFERENCES files_and_folders(id) ON DELETE CASCADE,
        path TEXT NOT NULL,
        physical_path TEXT NOT NULL,
        owner_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        owner_name VARCHAR(100) NOT NULL,
        size BIGINT NOT NULL DEFAULT 0,
        hash VARCHAR(100),
        is_folder BOOLEAN NOT NULL DEFAULT false,
        version INT NOT NULL DEFAULT 1,
        mime_type VARCHAR(100) NOT NULL,
        is_favorite BOOLEAN DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS permissions (
        id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        role_id VARCHAR(50) REFERENCES roles(id) ON DELETE CASCADE,
        folder_path TEXT NOT NULL,
        read BOOLEAN NOT NULL DEFAULT false,
        write BOOLEAN NOT NULL DEFAULT false,
        delete BOOLEAN NOT NULL DEFAULT false,
        download BOOLEAN NOT NULL DEFAULT false,
        rename BOOLEAN NOT NULL DEFAULT false
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        action TEXT NOT NULL,
        file TEXT NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT NOW(),
        ip VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        token VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
        username VARCHAR(100) NOT NULL,
        role_id VARCHAR(50) REFERENCES roles(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
      );
    `);

    // Check if roles are empty
    const roleCountRes = await client.query("SELECT COUNT(*) FROM roles");
    const roleCount = parseInt(roleCountRes.rows[0].count, 10);

    if (roleCount === 0) {
      console.log("PostgreSQL database is empty. Seeding from default data store...");
      
      // Seed roles
      for (const role of defaultStore.roles) {
        await client.query(
          "INSERT INTO roles (id, name, description) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING",
          [role.id, role.name, role.description]
        );
      }

      // Seed users
      for (const user of defaultStore.users) {
        await client.query(
          "INSERT INTO users (id, username, password_hash, salt, role_id, status, quota, used_space) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING",
          [user.id, user.username, user.passwordHash, user.salt, user.roleId, user.status, user.quota, user.usedSpace]
        );
      }

      // Seed permissions
      for (const perm of defaultStore.permissions) {
        await client.query(
          "INSERT INTO permissions (id, user_id, role_id, folder_path, read, write, delete, download, rename) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING",
          [perm.id, perm.userId || null, perm.roleId || null, perm.folderPath, perm.read, perm.write, perm.delete, perm.download, perm.rename]
        );
      }

      // Seed files and folders (First folders, then files, since parent_id FK refers to itself)
      // Sort folders to be inserted first
      const folders = defaultStore.files.filter((f: any) => f.isFolder);
      const files = defaultStore.files.filter((f: any) => !f.isFolder);

      // We need to insert folders top-down so parent folders exist before nested ones.
      // A simple sorting by path length handles nested folders correctly.
      folders.sort((a: any, b: any) => a.path.length - b.path.length);

      for (const folder of folders) {
        await client.query(
          `INSERT INTO files_and_folders (id, name, parent_id, path, physical_path, owner_id, owner_name, size, hash, is_folder, version, mime_type, is_favorite, created_at, updated_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT (id) DO NOTHING`,
          [
            folder.id,
            folder.name,
            folder.parentId || null,
            folder.path,
            folder.physicalPath,
            folder.ownerId,
            folder.ownerName,
            folder.size,
            folder.hash || null,
            folder.isFolder,
            folder.version || 1,
            folder.mimeType,
            !!folder.isFavorite,
            folder.createdAt,
            folder.updatedAt
          ]
        );
      }

      for (const file of files) {
        await client.query(
          `INSERT INTO files_and_folders (id, name, parent_id, path, physical_path, owner_id, owner_name, size, hash, is_folder, version, mime_type, is_favorite, created_at, updated_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) ON CONFLICT (id) DO NOTHING`,
          [
            file.id,
            file.name,
            file.parentId || null,
            file.path,
            file.physicalPath,
            file.ownerId,
            file.ownerName,
            file.size,
            file.hash || null,
            file.isFolder,
            file.version || 1,
            file.mimeType,
            !!file.isFavorite,
            file.createdAt,
            file.updatedAt
          ]
        );
      }

      client.release();
      return defaultStore;
    } else {
      console.log("PostgreSQL database is already seeded. Loading existing records into cache...");

      // Load all records from PG to populate DBStore cache
      const rolesRes = await client.query("SELECT * FROM roles");
      const usersRes = await client.query("SELECT * FROM users");
      const permissionsRes = await client.query("SELECT * FROM permissions");
      const filesRes = await client.query("SELECT * FROM files_and_folders");
      const logsRes = await client.query("SELECT * FROM audit_logs ORDER BY time DESC LIMIT 1000");
      const sessionsRes = await client.query("SELECT * FROM sessions WHERE expires_at > NOW()");

      const dbUsers = usersRes.rows.map(u => ({
        id: u.id,
        username: u.username,
        passwordHash: u.password_hash,
        salt: u.salt,
        roleId: u.role_id,
        status: u.status,
        quota: parseInt(u.quota, 10),
        usedSpace: parseInt(u.used_space, 10)
      }));

      const dbFiles = filesRes.rows.map(f => ({
        id: f.id,
        name: f.name,
        parentId: f.parent_id,
        path: f.path,
        physicalPath: f.physical_path,
        ownerId: f.owner_id,
        ownerName: f.owner_name,
        size: parseInt(f.size, 10),
        hash: f.hash,
        isFolder: f.is_folder,
        version: f.version,
        mimeType: f.mime_type,
        isFavorite: f.is_favorite,
        createdAt: f.created_at.toISOString(),
        updatedAt: f.updated_at.toISOString()
      }));

      const dbPermissions = permissionsRes.rows.map(p => ({
        id: p.id,
        userId: p.user_id,
        roleId: p.role_id,
        folderPath: p.folder_path,
        read: p.read,
        write: p.write,
        delete: p.delete,
        download: p.download,
        rename: p.rename
      }));

      const dbLogs = logsRes.rows.map(l => ({
        id: l.id,
        user: l.username,
        action: l.action,
        file: l.file,
        time: l.time.toISOString(),
        ip: l.ip,
        status: l.status
      }));

      const dbSessions = sessionsRes.rows.map(s => ({
        token: s.token,
        userId: s.user_id,
        username: s.username,
        roleId: s.role_id,
        createdAt: s.created_at.toISOString(),
        expiresAt: s.expires_at.toISOString()
      }));

      client.release();

      return {
        users: dbUsers,
        roles: rolesRes.rows,
        permissions: dbPermissions,
        files: dbFiles,
        auditLogs: dbLogs,
        sessions: dbSessions
      };
    }
  } catch (err) {
    console.error("PostgreSQL connection/initialization error. Falling back to local db.json store:", err);
    isPostgresConnected = false;
    return null;
  }
}

// -------------------------------------------------------------
// Mutation Helpers to keep Postgres fully synchronized
// -------------------------------------------------------------

export async function saveUserToPostgres(user: any) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query(
      `INSERT INTO users (id, username, password_hash, salt, role_id, status, quota, used_space)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       ON CONFLICT (id) DO UPDATE SET
       username = EXCLUDED.username,
       password_hash = EXCLUDED.password_hash,
       salt = EXCLUDED.salt,
       role_id = EXCLUDED.role_id,
       status = EXCLUDED.status,
       quota = EXCLUDED.quota,
       used_space = EXCLUDED.used_space`,
      [user.id, user.username, user.passwordHash, user.salt, user.roleId, user.status, user.quota, user.usedSpace]
    );
  } catch (err) {
    console.error("Error saving user to PostgreSQL:", err);
  }
}

export async function deleteUserFromPostgres(userId: string) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query("DELETE FROM users WHERE id = $1", [userId]);
  } catch (err) {
    console.error("Error deleting user from PostgreSQL:", err);
  }
}

export async function saveFileToPostgres(file: any) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query(
      `INSERT INTO files_and_folders (id, name, parent_id, path, physical_path, owner_id, owner_name, size, hash, is_folder, version, mime_type, is_favorite, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       ON CONFLICT (id) DO UPDATE SET
       name = EXCLUDED.name,
       parent_id = EXCLUDED.parent_id,
       path = EXCLUDED.path,
       physical_path = EXCLUDED.physical_path,
       owner_id = EXCLUDED.owner_id,
       owner_name = EXCLUDED.owner_name,
       size = EXCLUDED.size,
       hash = EXCLUDED.hash,
       is_folder = EXCLUDED.is_folder,
       version = EXCLUDED.version,
       mime_type = EXCLUDED.mime_type,
       is_favorite = EXCLUDED.is_favorite,
       created_at = EXCLUDED.created_at,
       updated_at = EXCLUDED.updated_at`,
      [
        file.id,
        file.name,
        file.parentId || null,
        file.path,
        file.physicalPath,
        file.ownerId,
        file.ownerName,
        file.size,
        file.hash || null,
        file.isFolder,
        file.version || 1,
        file.mimeType,
        !!file.isFavorite,
        new Date(file.createdAt),
        new Date(file.updatedAt)
      ]
    );
  } catch (err) {
    console.error("Error saving file to PostgreSQL:", err);
  }
}

export async function deleteFileFromPostgres(fileId: string) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query("DELETE FROM files_and_folders WHERE id = $1", [fileId]);
  } catch (err) {
    console.error("Error deleting file from PostgreSQL:", err);
  }
}

export async function savePermissionToPostgres(perm: any) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query(
      `INSERT INTO permissions (id, user_id, role_id, folder_path, read, write, delete, download, rename)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (id) DO UPDATE SET
       user_id = EXCLUDED.user_id,
       role_id = EXCLUDED.role_id,
       folder_path = EXCLUDED.folder_path,
       read = EXCLUDED.read,
       write = EXCLUDED.write,
       delete = EXCLUDED.delete,
       download = EXCLUDED.download,
       rename = EXCLUDED.rename`,
      [perm.id, perm.userId || null, perm.roleId || null, perm.folderPath, perm.read, perm.write, perm.delete, perm.download, perm.rename]
    );
  } catch (err) {
    console.error("Error saving permission to PostgreSQL:", err);
  }
}

export async function deletePermissionFromPostgres(permId: string) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query("DELETE FROM permissions WHERE id = $1", [permId]);
  } catch (err) {
    console.error("Error deleting permission from PostgreSQL:", err);
  }
}

export async function saveAuditLogToPostgres(log: any) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query(
      `INSERT INTO audit_logs (id, username, action, file, time, ip, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [log.id, log.user, log.action, log.file, new Date(log.time), log.ip, log.status]
    );
  } catch (err) {
    console.error("Error saving audit log to PostgreSQL:", err);
  }
}

export async function saveSessionToPostgres(session: any) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query(
      `INSERT INTO sessions (token, user_id, username, role_id, created_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (token) DO UPDATE SET
       user_id = EXCLUDED.user_id,
       username = EXCLUDED.username,
       role_id = EXCLUDED.role_id,
       created_at = EXCLUDED.created_at,
       expires_at = EXCLUDED.expires_at`,
      [session.token, session.userId, session.username, session.roleId, new Date(session.createdAt), new Date(session.expiresAt)]
    );
  } catch (err) {
    console.error("Error saving session to PostgreSQL:", err);
  }
}

export async function deleteSessionFromPostgres(token: string) {
  if (!pgPool || !isPostgresConnected) return;
  try {
    await pgPool.query("DELETE FROM sessions WHERE token = $1", [token]);
  } catch (err) {
    console.error("Error deleting session from PostgreSQL:", err);
  }
}

export async function syncPostgresState(db: any) {
  if (!pgPool || !isPostgresConnected) return;

  try {
    // 1. Sync users
    for (const u of db.users) {
      await saveUserToPostgres(u);
    }

    // 2. Sync permissions
    for (const p of db.permissions) {
      await savePermissionToPostgres(p);
    }

    // 3. Sync files and folders (folders first)
    const folders = db.files.filter((f: any) => f.isFolder);
    const files = db.files.filter((f: any) => !f.isFolder);

    folders.sort((a: any, b: any) => a.path.length - b.path.length);

    for (const folder of folders) {
      await saveFileToPostgres(folder);
    }
    for (const file of files) {
      await saveFileToPostgres(file);
    }

    // 4. Sync audit logs
    for (const l of db.auditLogs) {
      await saveAuditLogToPostgres(l);
    }

    // 5. Sync sessions
    for (const s of db.sessions) {
      await saveSessionToPostgres(s);
    }
  } catch (err) {
    console.error("Failed to batch sync state to PostgreSQL:", err);
  }
}

