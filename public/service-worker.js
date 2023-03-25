/* // Define cache names and versions
const staticCacheName = 'my-static-cache-v1';
const dynamicCacheName = 'my-dynamic-cache-v1';

// Define files to cache
const assetsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/images/logo.png',
  '/images/icon.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        cache.addAll(assetsToCache);
      })
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
        );
      })
  );
});

// Fetch event listener
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        return cacheResponse || fetch(event.request)
          .then(fetchResponse => {
            return caches.open(dynamicCacheName)
              .then(cache => {
                cache.put(event.request.url, fetchResponse.clone());
                return fetchResponse;
              });
          });
      })
      .catch(() => {
        return caches.match('offline.html');
      })
  );
});
 */