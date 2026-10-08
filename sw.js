/* Projektkompass – Service Worker
   Hält die App für den Offline-Betrieb vor. Nutzerdaten liegen nicht hier,
   sondern im localStorage des Geräts; dieser Cache enthält nur die App-Dateien. */
const VERSION = 'v2';
const APP_CACHE = `kompass-app-${VERSION}`;
const APP_FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png',
  './fonts/figtree-latin.woff2', './fonts/figtree-latin-ext.woff2',
  './fonts/ibm-plex-mono-500-latin.woff2', './fonts/ibm-plex-mono-500-latin-ext.woff2',
  './fonts/ibm-plex-mono-600-latin.woff2', './fonts/ibm-plex-mono-600-latin-ext.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('kompass-app-') && k !== APP_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

  // App-Seite: erst Netz (damit Updates ankommen), offline aus dem Cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { if (res.ok) { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put('./index.html', copy)); } return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Übrige App-Dateien: Cache zuerst, sonst Netz
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
