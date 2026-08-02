self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// A simple fetch handler is required by Chrome to trigger the install prompt
self.addEventListener("fetch", (event) => {
  // We can just pass through all requests for now, or serve from cache later
  return;
});
