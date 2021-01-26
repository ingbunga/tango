import Router from './tools/hashRouter.js';
import EZstorage from './tools/EasyStorage.js';
import LoadHtml from './tools/LoadHtml.js';

import swcontrol from './swcontroll.js';

import afterRInstall from './html/remember/index.js';
import afterR_VInstall from './html/remember/view.js';

export const router = new Router();

(async () => {
    swcontrol();

    router.on({
        url: '',
        html: await LoadHtml('/index.html'),
        exact: true,
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

    router.on({
        url: '/remember',
        func: afterRInstall,
        html: await LoadHtml('/remember.html'),
        exact: true
    })

    router.on({
        url: '/remember/view',
        func: afterR_VInstall,
        html: await LoadHtml('/view.html'),
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
    
    EZ.storage.noteList = [];
    console.log(EZ.storage);
    console.log(Ez2.storage);
    Ez2.storage.y = 1;
    EZ.storage.noteList.push('ayy');

    console.log(EZ.storage);
    console.log(Ez2.storage);
})()
