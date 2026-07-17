export interface StorageProvider {
  /** Provide capabilities to the Storage Engine */
  getCapabilities(): {
    read: boolean;
    write: boolean;
    versioning: boolean;
    compression: boolean;
    encryption: boolean;
    snapshots: boolean;
  };

  /** Check if the volume is accessible */
  ping(): Promise<boolean>;

  /** Get capacity statistics */
  getCapacity(): Promise<{ totalBytes: number; freeBytes: number; usedBytes: number }>;

  /** Read a file */
  read(path: string): Promise<Buffer>;

  /** Write a file */
  write(path: string, buffer: Buffer): Promise<void>;

  /** Delete a file */
  delete(path: string): Promise<void>;

  /** Move/Rename a file */
  move(oldPath: string, newPath: string): Promise<void>;

  /** List directory contents */
  list(path: string): Promise<{ name: string; isFolder: boolean; size: number; updatedAt: string }[]>;
}
