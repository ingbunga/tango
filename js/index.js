import Router from './tools/hashRouter.js';
import EZstorage from './tools/EasyStorage.js';
import LoadHtml from './tools/LoadHtml.js';

import swcontrol from './swcontroll.js';

import afterRInstall from './html/remember/index.js';
import afterR_VInstall from './html/remember/view.js';
import afterTInstall from './html/timer/index.js';
import afterAInstall from './html/add.js';
import afterCFGInstall from './html/confignote/index.js';
import afterANTInstall from './html/analytics/index.js';

export const router = new Router();
const EZ = new EZstorage();

(async () => {
    swcontrol();

    router.on({
        url: '',
        html: await LoadHtml('/home.html'),
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
        func: () => {afterAInstall(router)},
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
        func: () => {afterR_VInstall(router)},
        html: await LoadHtml('/html/remember/view.html'),
        exact: true
    })

    router.on({
        url: '/timer',
        func: ()=>{afterTInstall()},
        html: await LoadHtml('/timer.html'),
    })

    router.on({
        url: '/confignote',
        func: ()=>{afterCFGInstall(router)},
        html: await LoadHtml('/confignote.html'),
    })

    router.on({
        url: '/analytics',
        func: ()=>{afterANTInstall(router)},
        html: await LoadHtml('/analytics.html'),
    })

    router.setRootDom(document.getElementById('screen'))
    router.bindHtml('route');
    router.refrash();
    
    EZ.onChange(() => {
        console.log('changed!!!');
    })
    
    // console.log(EZ.storage);
    if(EZ.storage.noteList === undefined){
        EZ.storage.noteList = [];
        EZ.storage.analytics = {
            totalRight: 0,
            totalWrong: 0,
            totalTimer: 0,
            recent: [],
        }
    }

    console.log(EZ.storage);
})()
