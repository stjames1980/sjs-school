// SJS App – offline cache for all sections. Change VERSION when you upload new app files.
const VERSION = "sjs-school-v27";
const SHELL = ["./", "./index.html", "./manifest.json", "./config.js", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./logo.png", "./cbse.png", "./favicon.png",
  "./timetable.html", "./attendance.html", "./chart.png",
  "./marks.html", "./school.html", "./sjs-common.js", "./sjs-common.css"];
const CDN = ["fonts.googleapis.com", "fonts.gstatic.com", "www.gstatic.com", "cdnjs.cloudflare.com"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(fetch(req.url, {cache: "no-cache"}).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("./index.html"))));
  } else if (CDN.includes(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
