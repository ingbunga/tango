let target = {}
let observe = {
    set: function(obj, prop, value){
        obj[prop] = value;
        window.localStorage.setItem('EZ', JSON.stringify(obj));
        return true;
    }
}

export default class EZstorage{
    #storage = {}   // Rroxy
    #onchangeList = []
    constructor(){
        if(localStorage['EZ']){
            target = JSON.parse(localStorage['EZ']);
        }
        else{
            target = {}
        }
        this.storage = new Proxy(target, observe);
        window.addEventListener('storage', this.#changed)
    }
    onChange(func){
        this.#onchangeList.push(func);
        console.log(this.#onchangeList)
    }
    #changed(){
        this.#onchangeList.push(func);
        for(let func of this.#onchangeList){
            func();
        }
    }
}

// export default class EasyStorage{
//     #proxyList = [];
//     #onChangeList = [];
    // observe = {
    //     set: function(obj, prop, value){
    //         this.#changed(obj, prop, value);
    //         obj[prop] = value;
    //         window.localStorage = JSON.stringify(obj);
    //     }
    // }
//     static #target = {}
//     static storage = new Proxy(this.#target, this.observe);
//     constructor(){
//         if(localStorage['EZ']){
//             this.storage = JSON.parse(localStorage['EZ']);
//         }
//         window.addEventListener('storage', this.#changed);
//     }
//     onChange(func){
//         this.#onChangeList.push(func);
//     }
//     #changed(obj, prop, value){
//         for(i = 0; i < this.#proxyList; i++){
//             this.#onChangeList[prop] = value;
//         }
//         for(i = 0; i < this.#onChangeList; i++){
//             this.#onChangeList[i]();
//         }
//     }
// }