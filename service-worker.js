// service-worker.js
self.addEventListener("push", function (event) {
    const data = event.data ? JSON.parse(event.data.text()) : {};
    const options = {
        body: data.body || "您有新的通知！",
        icon: "/notification-icon-192x192.png",
        badge: "/notification-badge-72x72.png",
        data: { 
            url: self.registration.scope,  // 使用當前網站的 URL
            ...data 
        },
        requireInteraction: true  // 通知不會自動消失
    };

    event.waitUntil(
        self.registration.showNotification("接送通知", options)
    );
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function(clientList) {
            // 如果已經有開啟的視窗，就切換過去
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            // 如果沒有開啟的視���，就開新的
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
}); 