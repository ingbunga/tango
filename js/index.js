import { Router } from './tools/hashRouter.js';

const router = new Router();

router.on({
    url: '/sungu',
    func: () => {
        alert('welcome to sungu')
    },
    html: '<h1>welcome to sungu</h1><h2 class="route" href="./fuck">gotosex</h2>',
    exact: true
})

router.on({
    url: '/fuck',
    func: () => {
        alert('welcome to fuck')
    },
    html: '<h1>welcome to fuck</h1>',
})

router.on({
    url: '/sungu/fuck',
    func: () => {
        alert('welcome to sungu and fuck')
    },
    html: '<h1>welcome to sungu and fuck</h1>',
})

router.setRootDom(document.getElementById('screen'))
router.bindHtml('route');
router.refrash();