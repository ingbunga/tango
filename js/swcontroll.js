export default function swcontrol() {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
        run();
    }

    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                run();
            }
        });
    }
    document.addEventListener("visibilitychange", function() {
        console.log(document.hidden);
    });
}

function run(){
    navigator.serviceWorker.register('/js/tools/ServiceWorker.js')
    .then(sw => {
        window.addEventListener('beforeunload', () => {
            sw.active.postMessage('die')
        })
        sw.active.postMessage('helloo')
    })

    navigator.serviceWorker.addEventListener('message', event => {
        console.log(event)
        if(event.data.type == 'notification'){
            new Notification(event.data.text);
        }
    });

    navigator.serviceWorker.ready.then( registration => {
        registration.active.postMessage("Hi service worker");
    });
}