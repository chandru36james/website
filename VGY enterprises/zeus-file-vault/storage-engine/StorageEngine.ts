import { PoolManager } from './PoolManager';
import { VolumeManager } from './VolumeManager';
import { JobManager } from './JobManager';
import fs from 'fs';
import path from 'path';

export class StorageEngine {
  public pools: PoolManager;
  public volumes: VolumeManager;
  public jobs: JobManager;

  private directoryCache = new Map<string, { timestamp: number; data: any[] }>();
  private cacheTtlMs = 5000; // 5 seconds default TTL
  private activeWatchers = new Map<string, fs.FSWatcher>();

  constructor() {
    this.volumes = new VolumeManager();
    this.pools = new PoolManager(this.volumes);
    this.jobs = new JobManager();

    // Start the background volume scanner
    this.startScanner();
  }

  private startScanner() {
    console.log("[StorageEngine] Initializing Enterprise Volume Scanner and Rebalancer...");
    setInterval(async () => {
      await this.volumes.scanVolumes();
      this.triggerRebalance();
    }, 60000); // Scan every minute
  }

  private triggerRebalance() {
    // Basic Rebalancing Policy:
    // If a primary volume goes above 90% utilization, find the largest files and migrate them to an Archive pool.
    const allVolumes = Array.from(this.volumes['volumes'].values());
    for (const volume of allVolumes) {
      if (volume.status === 'Full' || volume.status === 'Warning') {
        console.log(`[StorageEngine] Policy Triggered: Volume ${volume.id} is degraded. Scheduling FileMigration job...`);
        this.jobs.scheduleJob('FileMigration', { 
          sourceVolumeId: volume.id, 
          targetPoolId: 'archive-pool',
          reason: 'Threshold Based (Warning/Full)'
        });
      }
    }
  }

  async writeDocument(poolId: string, relativePath: string, buffer: Buffer): Promise<{ volumeId: string }> {
    // 1. Allocate based on Pool Strategy
    const targetVolume = this.pools.allocateVolume(poolId);

    // 2. Write to the specific physical volume
    await targetVolume.provider.write(relativePath, buffer);
    
    console.log(`[StorageEngine] Routed document to Volume ${targetVolume.id} in Pool ${poolId}`);

    // 3. Schedule background jobs (Thumbnails, Antivirus)
    this.jobs.scheduleJob('AntivirusScan', { volumeId: targetVolume.id, relativePath });
    this.jobs.scheduleJob('ThumbnailGeneration', { volumeId: targetVolume.id, relativePath });

    return { volumeId: targetVolume.id };
  }

  async readDocument(volumeId: string, relativePath: string): Promise<Buffer> {
    const volume = this.volumes.getVolume(volumeId);
    if (!volume) throw new Error("Volume not found or offline");
    if (volume.status === 'Offline') throw new Error("Volume is currently Offline. Data inaccessible.");

    return await volume.provider.read(relativePath);
  }

  async deleteDocument(volumeId: string, relativePath: string): Promise<void> {
    const volume = this.volumes.getVolume(volumeId);
    if (!volume) throw new Error("Volume not found or offline");
    if (volume.status === 'Offline') throw new Error("Volume is currently Offline. Data inaccessible.");

    return await volume.provider.delete(relativePath);
  }

  async moveDocument(volumeId: string, oldRelativePath: string, newRelativePath: string): Promise<void> {
    const volume = this.volumes.getVolume(volumeId);
    if (!volume) throw new Error("Volume not found or offline");
    if (volume.status === 'Offline') throw new Error("Volume is currently Offline. Data inaccessible.");

    await volume.provider.move(oldRelativePath, newRelativePath);
    this.invalidateCache(volumeId, path.dirname(oldRelativePath));
    this.invalidateCache(volumeId, path.dirname(newRelativePath));
  }

  async listDocuments(volumeId: string, relativePath: string): Promise<{ name: string; isFolder: boolean; size: number; updatedAt: string }[]> {
    const volume = this.volumes.getVolume(volumeId);
    if (!volume) throw new Error("Volume not found or offline");
    if (volume.status === 'Offline') throw new Error("Volume is currently Offline. Data inaccessible.");

    const cacheKey = `${volumeId}:${relativePath}`;
    const cached = this.directoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTtlMs) {
      return cached.data;
    }

    const data = await volume.provider.list(relativePath);
    this.directoryCache.set(cacheKey, { timestamp: Date.now(), data });
    
    // Setup watcher for this physical path if not already watching (local only for now)
    this.setupWatcher(volumeId, relativePath);
    
    return data;
  }

  private setupWatcher(volumeId: string, relativePath: string) {
    const cacheKey = `${volumeId}:${relativePath}`;
    if (this.activeWatchers.has(cacheKey)) return;

    const volume = this.volumes.getVolume(volumeId);
    if (volume && (volume.provider as any).basePath) { // Only local provider has basePath
      const fullPath = path.join((volume.provider as any).basePath, relativePath);
      try {
        if (fs.existsSync(fullPath)) {
          const watcher = fs.watch(fullPath, (eventType, filename) => {
            console.log(`[StorageEngine] External change detected (${eventType}) in ${cacheKey}`);
            this.invalidateCache(volumeId, relativePath);
          });
          this.activeWatchers.set(cacheKey, watcher);
        }
      } catch (e) {
        console.warn(`[StorageEngine] Could not watch path ${fullPath}`, e);
      }
    }
  }

  private invalidateCache(volumeId: string, relativePath: string) {
    // Normalize path just in case
    relativePath = relativePath.replace(/\\/g, '/');
    if (relativePath === '.' || relativePath === '') relativePath = '/';
    const cacheKey = `${volumeId}:${relativePath}`;
    this.directoryCache.delete(cacheKey);
  }
}
