// MindBloom Service Worker — handles push notifications and scheduled reminders
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Handle push events from server (future use)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'MindBloom';
  const options = {
    body: data.body || 'Time for your wellness check-in 🌸',
    icon: '/assets/images/app_logo.png',
    badge: '/assets/images/app_logo.png',
    tag: data.tag || 'mindbloom-reminder',
    renotify: true,
    data: data.url ? { url: data.url } : {},
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/home-dashboard';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

// Handle messages from the main thread (schedule reminders)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_REMINDER') {
    const { tag, title, body, delayMs } = event.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/assets/images/app_logo.png',
        badge: '/assets/images/app_logo.png',
        tag,
        renotify: true,
      });
    }, delayMs);
  }
});
