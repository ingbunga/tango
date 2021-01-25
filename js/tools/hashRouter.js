
export class Router{
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
    #htmlMap = {
        // [url: string] : [html : string]
    }
    #exactMap = {
        
    }
    constructor(){
        this.push(location.hash.slice(2, location.hash.length))
    }
    refrash(){
        this.push(this.nowUrl);
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
                    this.#rootDom.innerHTML += routeinfo.html;
                }
                if(routeinfo.func !== null){
                    routeinfo.func();
                }
                routed = true;
            }
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
        for(let i of urlList){
            if(i == ''){
                this.#nowUrlArray = [''];
            }
            else if(i == '..'){
                this.#nowUrlArray.pop();
            }
            else if(i == '.');
            else{
                this.#nowUrlArray.push(i);
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
    bindHtml(className, attrName = 'href', eventName = 'click'){
        const elements = document.querySelectorAll(`.${className}`);

        for(let i = 0; i < elements.length; i++){
            elements[i].addEventListener(eventName, (e) => {
                e.preventDefault();
                this.push(elements[i].getAttribute(attrName));
            })
        }
    }
    // 스크린 돔 설정
    setRootDom(dom){
        this.#rootDom = dom;
    }
}