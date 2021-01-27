let target = {}
let onchangeList = []

export default class EZstorage{
    #storage = {}   // Rroxy
    constructor(){
        var observe = {
            get: (target, key)=> {
                if (typeof target[key] === 'object' && target[key] !== null) {
                    return new Proxy(target[key], observe)
                } else {
                    return target[key];
                }
            },
            set: (obj, prop, value) => {
                obj[prop] = value;
                this.#save(obj);
                return true;
            },
            deleteProperty: (obj, prop, value) => {
                delete obj[prop];
                this.#save(obj);
                return true;
            }
        }
        if(localStorage['EZ']){
            target = JSON.parse(localStorage['EZ']);
        }
        else{
            target = {}
        }
        this.storage = new Proxy(target, observe);
    }
    #save(){
        window.localStorage.setItem('EZ', JSON.stringify(this.storage));
        this.changed();
    }
    onChange(func){
        onchangeList.push(func);
    }
    #connect(){
        if(localStorage['EZ']){
            target = JSON.parse(localStorage['EZ']);
        }
        else{
            target = {}
        }
    }
    changed(){
        for(let i = 0; i < onchangeList.length; i++){
            onchangeList[i]();
        }
    }
    clear(){
        window.localStorage.setItem('EZ', '{}');
        target = {};
        this.#connect();
        this.changed();
    }
}