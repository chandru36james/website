import { StorageProvider } from './StorageProvider';
import fs from 'fs';
import path from 'path';

export class LocalStorageProvider implements StorageProvider {
  constructor(private basePath: string) {}

  getCapabilities() {
    return {
      read: true,
      write: true,
      versioning: false,
      compression: false,
      encryption: false,
      snapshots: false,
    };
  }

  async ping(): Promise<boolean> {
    try {
      if (!fs.existsSync(this.basePath)) {
        fs.mkdirSync(this.basePath, { recursive: true });
      }
      fs.accessSync(this.basePath, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  async getCapacity() {
    // In a real local implementation, we would use native OS calls or fs.statfs
    // For now, returning mocked enterprise capacity (1TB total, 500GB free)
    return {
      totalBytes: 1000 * 1024 * 1024 * 1024,
      usedBytes: 500 * 1024 * 1024 * 1024,
      freeBytes: 500 * 1024 * 1024 * 1024,
    };
  }

  async read(relativePath: string): Promise<Buffer> {
    const fullPath = path.join(this.basePath, relativePath);
    return fs.promises.readFile(fullPath);
  }

  async write(relativePath: string, buffer: Buffer): Promise<void> {
    const fullPath = path.join(this.basePath, relativePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(fullPath, buffer);
  }

  async delete(relativePath: string): Promise<void> {
    const fullPath = path.join(this.basePath, relativePath);
    await fs.promises.unlink(fullPath);
  }

  async move(oldRelativePath: string, newRelativePath: string): Promise<void> {
    const oldPath = path.join(this.basePath, oldRelativePath);
    const newPath = path.join(this.basePath, newRelativePath);
    const dir = path.dirname(newPath);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.rename(oldPath, newPath);
  }

  async list(relativePath: string): Promise<{ name: string; isFolder: boolean; size: number; updatedAt: string }[]> {
    const fullPath = path.join(this.basePath, relativePath);
    if (!fs.existsSync(fullPath)) return [];
    
    const dirents = await fs.promises.readdir(fullPath, { withFileTypes: true });
    const items = [];
    for (const dirent of dirents) {
      const itemPath = path.join(fullPath, dirent.name);
      try {
        const stats = await fs.promises.stat(itemPath);
        items.push({
          name: dirent.name,
          isFolder: dirent.isDirectory(),
          size: stats.size,
          updatedAt: stats.mtime.toISOString()
        });
      } catch (err) {
        // Skip inaccessible files
      }
    }
    return items;
  }
}
