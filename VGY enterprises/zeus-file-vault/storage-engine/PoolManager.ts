import { VolumeManager, StorageVolume } from './VolumeManager';

export type AllocationStrategy = 'PriorityFill' | 'MostFreeSpace' | 'RoundRobin';
export type StorageClass = 'Primary' | 'Archive' | 'Backup' | 'Temporary' | 'Immutable';

export interface StoragePool {
  id: string;
  name: string;
  storageClass: StorageClass;
  strategy: AllocationStrategy;
}

export class PoolManager {
  private pools: Map<string, StoragePool> = new Map();
  private volumeManager: VolumeManager;
  private roundRobinCursor: Map<string, number> = new Map();

  constructor(volumeManager: VolumeManager) {
    this.volumeManager = volumeManager;
  }

  registerPool(pool: StoragePool): void {
    this.pools.set(pool.id, pool);
    this.roundRobinCursor.set(pool.id, 0);
  }

  getPool(poolId: string): StoragePool | undefined {
    return this.pools.get(poolId);
  }

  allocateVolume(poolId: string): StorageVolume {
    const pool = this.pools.get(poolId);
    if (!pool) throw new Error(`Storage Pool ${poolId} not found`);

    const volumes = this.volumeManager.getVolumesForPool(poolId)
        .filter(v => v.status === 'Healthy' || v.status === 'Warning');

    if (volumes.length === 0) {
      throw new Error(`No healthy volumes available in Pool ${poolId}`);
    }

    switch (pool.strategy) {
      case 'MostFreeSpace':
        return volumes.reduce((prev, current) => (prev.freeBytes > current.freeBytes) ? prev : current);

      case 'RoundRobin': {
        const cursor = this.roundRobinCursor.get(poolId) || 0;
        const volume = volumes[cursor % volumes.length];
        this.roundRobinCursor.set(poolId, cursor + 1);
        return volume;
      }

      case 'PriorityFill':
      default:
        // PriorityFill simply takes the first volume with > 5% free space
        for (const vol of volumes) {
          const freeRatio = vol.freeBytes / vol.totalBytes;
          if (freeRatio > 0.05) return vol;
        }
        // Spill over to the absolute first one if everything is critically full
        return volumes[0];
    }
  }
}
