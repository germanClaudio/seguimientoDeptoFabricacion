const CACHE_NAME = 'my-web-app-cache-v1';
const urlsToCache = [
	'/css/style.css',
	'/css/sweetalert2.all.min.js'
];

//Instalar el service worker y almacenar los archivos en caché
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				console.log('Archivos en caché');
				return cache.addAll(urlsToCache);
			})
	);
});

// Interceptar solicitudes y servir archivos desde el caché si están disponibles
self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				// Si el archivo está en el caché, lo devuelve
				if (response) {
					return response;
				}

				// Si no está en el caché, lo obtiene de la red
				return fetch(event.request);
			})
	);
});

// Actualizar el service worker
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

// Estrategia "Stale-While-Revalidate" en la fase de fetch
// self.addEventListener('fetch', event => {
// 	event.respondWith(
// 		// Intentamos obtener el recurso de la caché
// 		caches.match(event.request).then(cachedResponse => {
// 			// Hacemos una solicitud a la red para actualizar en segundo plano
// 			const networkFetch = fetch(event.request).then(async networkResponse => {
// 				// Al recibir una respuesta de la red, actualizamos la caché con la nueva versión
// 				const cache = await caches.open(CACHE_NAME);
// 				cache.put(event.request, networkResponse.clone());
// 				return networkResponse;
// 			});

// 			// Si el recurso está en la caché, lo devolvemos inmediatamente
// 			// Mientras tanto, la red está obteniendo una versión más reciente
// 			return cachedResponse || networkFetch;
// 		})
// 	);
// });

// Activación del service worker
// self.addEventListener('activate', event => {
// 	const cacheWhitelist = [CACHE_NAME];
// 	event.waitUntil(
// 		caches.keys().then(cacheNames => {
// 			return Promise.all(
// 				cacheNames.map(cacheName => {
// 					if (!cacheWhitelist.includes(cacheName)) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });