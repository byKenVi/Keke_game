// Service worker minimal : met l'app en cache pour qu'elle fonctionne
// hors-ligne une fois ajoutée à l'écran d'accueil (PWA simple).
const CACHE = 'kekeli-v1'

// Pré-cache de la coquille. Les assets avec hash (JS/CSS build) sont
// mis en cache à la volée par la stratégie ci-dessous.
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  )
  self.clients.claim()
})

// Stratégie « network-first » avec repli sur le cache : on a toujours
// la dernière version quand il y a du réseau, et ça marche hors-ligne.
self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {})
        return response
      })
      .catch(() => caches.match(request).then((hit) => hit || caches.match('./index.html'))),
  )
})
