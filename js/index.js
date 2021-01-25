import { Router } from './tools/hashRouter.js';

const router = new Router();

router.on('/sungu', ()=>{
    alert('welcome to sungu')
}, '<h1>welcome to sungu</h1>');

router.on('/fuck', ()=>{
    alert('welcome to fuck')
},'<h1>welcome to fuck</h1>')

router.setRootDom(document.getElementById('screen'))
router.bindHtml('route');
router.refrash();