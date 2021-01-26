const setInnerHTML = function (elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

export default class Router{
    nowUrl = ''         // 현재 url
    #nowUrlArray = [''];  // 현재 url ( 리스트 형식으로 )
    #rootDom = null;    // 루트 dom
    #notFoundFunc = null;   // 404 함수
    
    #urlMap = {
        /*
            [url: string] : {
                trigger: fucntion,
                html: string,
                exact: boolean
            }
        */ 
    }
    #bindSave = [];
    #bindElements = [];
    constructor(){
        this.push(location.hash.slice(2, location.hash.length))
        window.onhashchange = () => {
            this.push(location.hash.slice(2, location.hash.length))
        }
    }
    refrash(){
        this.push(this.nowUrl);
    }
    #reCallBind(){
        for(let i = 0; i < this.#bindSave.length; i++){
            const set = this.#bindSave[i];
            this.bindHtml(
                set.className,
                set.attrName,
                set.eventName,
                true
            );
        }
    }
    // 프로퍼티를 사용해 라우팅을 해주는 내부함수
    #route(){
        location.hash = '!'+this.nowUrl;

        let routed = false;
        let domChanged = false;
        for(let i in this.#urlMap){
            const fin = i.length
            if(
                this.nowUrl.slice(0, fin) === i.slice(0, fin) || i[fin] === '/'
                //                                               뒤에  /sungus /sungu 같은거 방지
            ){
                const routeinfo = this.#urlMap[i];
                if(routeinfo.exact && i !== this.nowUrl) continue;
                
                if(routeinfo.html !== null && this.#rootDom){
                    if(!domChanged){
                        this.#rootDom.innerHTML = '';
                    }
                    domChanged = true;
                    setInnerHTML(this.#rootDom, this.#rootDom.innerHTML+ routeinfo.html);
                }
                if(routeinfo.func !== null){
                    routeinfo.func();
                }
                routed = true;
            }
        }
        if(domChanged){
            this.#reCallBind();
        }
        if(routed === false && this.#notFoundFunc !== null){
            this.#notFoundFunc();
        }
    }
    // 라우팅 등록함수

    // on(url, func = null, html = null, exact = false){
    on({url, func = null, html = null, exact = false}){
        this.#urlMap[url] = {
            func,
            html,
            exact
        }
    }
    // url을 변경하는 함수
    push(url){
        let urlList = url.split('/');
        for(let i = 0; i < urlList.length; i++){
            const key = urlList[i];
            if(key === '' && i === 0){
                this.#nowUrlArray = [''];
            }
            else if(key === '' && i !== 0) continue;
            else if(key == '..'){
                if(this.#nowUrlArray.length !== 1){
                    this.#nowUrlArray.pop();
                }
            }
            else if(key == '.') continue;
            else{
                this.#nowUrlArray.push(key);
            }
        }
        this.nowUrl = this.#nowUrlArray.join('/');
        this.#route();
    }
    // 404함수를 설정하는 함수
    set404(func){
        this.#notFoundFunc = func;
    }
    // html에 바인딩 하는 함수
    bindHtml(className, attrName = 'href', eventName = 'click', recall=false){
        if(!recall){
            this.#bindSave.push({
                className,
                attrName,
                eventName
            })
        }
        const elements = document.querySelectorAll(`.${className}`);
        for(let i = 0; i < this.#bindElements.length; i++){
            this.#bindElements[i][0].removeEventListener(eventName, this.#bindElements[i][1])
        }
        this.#bindElements = [];
        for(let i = 0; i < elements.length; i++){
            const listner = (e) => {
                e.preventDefault();
                this.push(elements[i].getAttribute(attrName));
            }
            this.#bindElements.push([elements[i], listner]);
            elements[i].addEventListener(eventName, listner);
        }
    }
    // 스크린 돔 설정
    setRootDom(dom){
        this.#rootDom = dom;
    }
}