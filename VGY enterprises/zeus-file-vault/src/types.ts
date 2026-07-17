export interface User {
  id: string;
  username: string;
  roleId: string;
  quota: number;
  usedSpace: number;
  status?: "active" | "disabled";
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface Permission {
  id: string;
  userId?: string;
  roleId?: string;
  folderPath: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  download: boolean;
  rename: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  parentId: string | null;
  path: string;
  physicalPath: string;
  ownerId: string;
  ownerName: string;
  size: number;
  hash: string;
  isFolder: boolean;
  version: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  file: string;
  time: string;
  ip: string;
  status: "success" | "failed";
}

export interface OverviewStats {
  totalFiles: number;
  totalFolders: number;
  activeUsers: number;
  spaceUsed: number;
  totalQuotaAllocated: number;
  systemFreeSpace: number;
  cpuLoad?: number;
  cpuTemp?: number;
  systemTotalSpace?: number;
}
