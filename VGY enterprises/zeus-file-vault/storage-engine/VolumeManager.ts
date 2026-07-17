import { StorageProvider } from './providers/StorageProvider';

export type VolumeStatus = 'Healthy' | 'Warning' | 'Offline' | 'ReadOnly' | 'Full' | 'Degraded' | 'Maintenance' | 'Migrating' | 'Retiring';

export interface StorageVolume {
  id: string; // GUID
  poolId: string;
  name: string;
  status: VolumeStatus;
  provider: StorageProvider;
  totalBytes: number;
  freeBytes: number;
  capabilities: ReturnType<StorageProvider['getCapabilities']>;
}

export class VolumeManager {
  private volumes: Map<string, StorageVolume> = new Map();

  async registerVolume(volume: Omit<StorageVolume, 'totalBytes' | 'freeBytes' | 'capabilities' | 'status'>): Promise<void> {
    const capabilities = volume.provider.getCapabilities();
    const capacity = await volume.provider.getCapacity();
    const isOnline = await volume.provider.ping();
    
    this.volumes.set(volume.id, {
      ...volume,
      status: isOnline ? 'Healthy' : 'Offline',
      totalBytes: capacity.totalBytes,
      freeBytes: capacity.freeBytes,
      capabilities
    });
  }

  getVolume(volumeId: string): StorageVolume | undefined {
    return this.volumes.get(volumeId);
  }

  getVolumesForPool(poolId: string): StorageVolume[] {
    return Array.from(this.volumes.values()).filter(v => v.poolId === poolId);
  }

  // Volume Scanner method (to be called periodically)
  async scanVolumes(): Promise<void> {
    for (const volume of this.volumes.values()) {
      const isOnline = await volume.provider.ping();
      if (!isOnline && volume.status !== 'Maintenance') {
        volume.status = 'Offline';
        continue;
      }
      
      const capacity = await volume.provider.getCapacity();
      volume.totalBytes = capacity.totalBytes;
      volume.freeBytes = capacity.freeBytes;

      if (volume.freeBytes < 1024 * 1024 * 50) { // Under 50MB
        volume.status = 'Full';
      } else if (volume.freeBytes < 1024 * 1024 * 500) { // Under 500MB
        volume.status = 'Warning';
      } else if (volume.status === 'Full' || volume.status === 'Offline') {
        volume.status = 'Healthy';
      }
    }
  }
}
