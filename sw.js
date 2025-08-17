const CACHE_NAME = 'mana-chelluru-cache-v2'; // వెర్షన్‌ను అప్‌డేట్ చేశాము
// కేవలం అవసరమైన ఫైల్స్‌ను మాత్రమే కాష్ చేద్దాం
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'Gemini_Generated_Image_bqk9rbqk9rbqk9rb.png'
];

// పాత కాష్‌లను తొలగించడానికి
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache, caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // కాష్‌లో దొరికితే, దాన్ని పంపండి
        if (response) {
          return response;
        }
        // లేకపోతే, నెట్‌వర్క్ నుండి తీసుకురండి
        return fetch(event.request);
      })
  );
});
