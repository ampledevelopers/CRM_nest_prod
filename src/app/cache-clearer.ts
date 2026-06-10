// cache-clearer.ts
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';

export function cacheClearer(swUpdate: SwUpdate) {
  console.log('Checking for Updates');
    if (swUpdate.isEnabled) {
      console.log('Updated new version 3.1.10 (02-04-2026)');
        const updatesAvailable = swUpdate.versionUpdates.pipe(
            filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
            map(evt => ({
                type: 'UPDATE_AVAILABLE',
                current: evt.currentVersion,
                available: evt.latestVersion,
            })));
        updatesAvailable.subscribe(() => {
            caches.keys().then(keys => {
                keys.forEach(key => {
                    caches.delete(key);
                });
            });
            swUpdate.activateUpdate().then(() => document.location.reload());
        });
        swUpdate.checkForUpdate();
    }
}
