// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              // Display a popup to inform the user of the update
              alert('Looks like the service worker has updated. You may have to reload this site to update it as there might be outdated content that needs to be cleared.');
              // Send a notification to the user
              if (Notification.permission === 'granted') {
                const notification = new Notification('Update Available', {
                  body: 'Looks like the service worker has updated. Reload to clear old cached assets.',
                  icon: 'img/icons/icon-192x192.png'
                });
              } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                  if (permission === 'granted') {
                    const notification = new Notification('Update Available', {
                      body: 'Looks like the service worker has updated. Reload to clear old cached assets.',
                      icon: 'img/icons/icon-192x192.png'
                    });
                  }
                });
              }
            }
          });
        });
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  });
}

// Reload the page to update the PWA
function restartPWA() {
  navigator.serviceWorker.getRegistration()
    .then(registration => {
      if (registration) {
        registration.unregister()
          .then(() => {
            window.location.reload();
          });
      }
    });
}
