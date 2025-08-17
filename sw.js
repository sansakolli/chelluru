// sw.js

const CACHE_NAME = 'mana-chelluru-cache-v4'; // వెర్షన్‌ను అప్‌డేట్ చేశాము

// ఇన్‌స్టాలేషన్ ఈవెంట్
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  // కొత్త సర్వీస్ వర్కర్‌ను వెంటనే యాక్టివేట్ చేయడానికి
  event.waitUntil(self.skipWaiting());
});

// యాక్టివేషన్ ఈవెంట్
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  // పాత కాష్‌లను తొలగించడం
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ఫెచ్ ఈవెంట్
self.addEventListener('fetch', event => {
  // ఆఫ్‌లైన్ కార్యాచరణ కోసం మనం దీన్ని తరువాత మెరుగుపరచవచ్చు,
  // ప్రస్తుతానికి, కేవలం నెట్‌వర్క్ రిక్వెస్ట్‌లను పంపుదాం.
  event.respondWith(fetch(event.request));
});
