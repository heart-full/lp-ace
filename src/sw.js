// sw.js
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import * as navigationPreload from 'workbox-navigation-preload';
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import {precacheAndRoute} from 'workbox-precaching';

// Precache the manifest
//precacheAndRoute(self.__WB_MANIFEST);
const processedManifest = (self.__WB_MANIFEST || []).filter(entry => {
  return !entry.url.match(/\.(html|json|txt)(\?.+)?$/);
});

precacheAndRoute(processedManifest);

// Enable navigation preload
navigationPreload.enable();

// Create a new navigation route that uses the Network-first, falling back to
// cache strategy for navigation requests with its own cache. This route will be
// handled by navigation preload. The NetworkOnly strategy will work as well.
const navigationRoute = new NavigationRoute(new NetworkFirst({
  cacheName: 'navigations'
}));

const imageAssetRoute = new Route(({request}) => {
  return request.destination === 'image';
}, new CacheFirst({
  cacheName: 'image-assets',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      purgeOnQuotaError: true,
    }),
  ],
}));

registerRoute(navigationRoute);
registerRoute(imageAssetRoute);