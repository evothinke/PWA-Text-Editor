const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(({request}) => {['style', 'script', 'worker'].includes(request.destination)}, // determining if a request matches the route.if destination prop is one of the 3
new StaleWhileRevalidate({ //instance of the StaleWhileRevalidate caching strategy from the Workbox library.
  cacheName: "assetCache", //setting the cacheName option for the caching strategy to assetCache
  plugins:[
    new CacheableResponsePlugin({
      statuses: [0,200]
    })
  ]
}));
