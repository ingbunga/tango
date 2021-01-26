import Router from './tools/hashRouter.js';
import EZstorage from './tools/EasyStorage.js';

import sunguHtml from '../html/sungu.html.js';
import indexHtml from '../html/index.html.js';

const router = new Router();

router.on({
    url: '',
    html: indexHtml(),
    exact: true,
})

router.on({
    url: '/sungu',
    html: sunguHtml(),
    exact: true
})

router.on({
    url: '/fuck',
    html: '<h1>welcome to fuck</h1>',
})

router.on({
    url: '/sungu/fuck',
    html: '<h1>welcome to sungu and fuck</h1><h2 class="route" href="../">back</h2><h2 class="route" href="../../fuck">fuck</h2>',
})

router.setRootDom(document.getElementById('screen'))
router.bindHtml('route');
router.refrash();

const EZ = new EZstorage();
const Ez2 = new EZstorage();

Ez2.onChange(() => {
    console.log('changed!!!');
})

EZ.storage.x = 1;
console.log(EZ.storage);
console.log(Ez2.storage);
