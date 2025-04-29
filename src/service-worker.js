self.addEventListener('install', (event) => {
    console.log('Service worker instalado.');
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activado.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
