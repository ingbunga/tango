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
}

function run(){
    navigator.serviceWorker.register('/js/tools/ServiceWorker.js')
    .then(sw => {
        sw.active.postMessage('hello')
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