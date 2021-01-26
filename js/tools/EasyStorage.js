let target = {}
let onchangeList = []

export default class EZstorage{
    #storage = {}   // Rroxy
    observe = {
        set: (obj, prop, value) => {
            obj[prop] = value;
            this.#save();
            return true;
        }
    }
    constructor(){
        this.#connect();
    }
    #save(){
        window.localStorage.setItem('EZ', JSON.stringify(this.storage));
        this.changed();
    }
    #connect(){
        if(localStorage['EZ']){
            target = JSON.parse(localStorage['EZ']);
        }
        else{
            target = {}
        }
        this.storage = new Proxy(target, this.observe);
    }
    onChange(func){
        onchangeList.push(func);
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