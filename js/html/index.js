import Router from './tools/hashRouter.js';
import EZstorage from './tools/EasyStorage.js';
import LoadHtml from './tools/LoadHtml.js';

import sunguHtml from '../html/sungu.html.js';
import indexHtml from '../html/index.html.js';
import addHtml from '../html/add.html.js';

(async () => {

    const router = new Router();

    router.on({
        url: '',
        html: await LoadHtml('/index.html'),
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

    router.on({
        url: '/add',
        html: await LoadHtml('/add.html'),
        exact: true
    })

    router.setRootDom(document.getElementById('screen'))
    router.bindHtml('route');
    router.refrash();

    const EZ = new EZstorage();
    const Ez2 = new EZstorage();

    EZ.onChange(() => {
        console.log('changed!!!');
    })

    console.log(EZ.storage);
    Ez2.storage.y = 1;
    console.log(EZ.storage.y);
    console.log(Ez2.storage.y);

})()
