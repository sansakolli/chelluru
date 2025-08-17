const CACHE_NAME = 'mana-chelluru-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'Gemini_Generated_Image_bqk9rbqk9rbqk9rb.png',
  'Test_image_ad.png',
  'ChelluruAd_audio.wav',
  'feature01_emergency_directory_audio.wav',
  'feature02_flash_news_audio.wav',
  'feature03_digital_card_audio.wav',
  'feature04_donations_gallery_audio.wav',
  'feature05_local_ads_audio.wav',
  'feature06_temple_info_audio.wav',
  'feature07_problem_solution_audio.wav',
  'feature08_chelluru_tv_audio.wav',
  'feature09_photo_gallery_audio.wav',
  'feature1_emergency_audio.wav',
  'feature10_school_updates_audio.wav'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        const cachePromises = urlsToCache.map(urlToCache => {
            return cache.add(urlToCache).catch(reason => {
                console.log(`[SW] Caching failed for: ${urlToCache}`, reason);
            });
        });
        return Promise.all(cachePromises);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});