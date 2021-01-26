let target = {}
let onchangeList = []

export default class EZstorage{
    #storage = {}   // Rroxy
    observe = {
        set: (obj, prop, value) => {
            obj[prop] = value;
            window.localStorage.setItem('EZ', JSON.stringify(obj));
            this.changed();
            return true;
        }
    }
    constructor(){
        this.storage = this.storage !== undefined? this.storage: [];
        if(localStorage['EZ']){
            target = JSON.parse(localStorage['EZ']);
        }
        else{
            target = {}
        }
        window.addEventListener('storage', this.changed)
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
}