
export class Router{
    nowUrl = ''         // 현재 url
    #nowUrlArray = [''];  // 현재 url ( 리스트 형식으로 )
    #rootDom = null;    // 루트 dom
    #notFoundFunc = null;   // 404 함수
    
    #urlMap = {
        // [url: string] : [trigger: fucntion]
    }
    #htmlMap = {
        // [url: string] : [html : string]
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
            if(
                i.slice(0,this.nowUrl.length) === this.nowUrl &&
                i.length === this.nowUrl.length || i[this.nowUrl.length+1] === '/'
            ){
                if(this.#htmlMap[i] && this.#rootDom){
                    if(!domChanged){
                        this.#rootDom.innerHTML = '';
                    }
                    domChanged = true;
                    this.#rootDom.innerHTML += this.#htmlMap[i];
                }
                console.error('yeah')
                this.#urlMap[i]();
                routed = true;
            }
        }
        if(routed === false && this.#notFoundFunc !== null){
            this.#notFoundFunc();
        }
    }
    // 라우팅 등록함수
    on(url, func, html = null){
        this.#urlMap[url] = func;
        if(html){
            this.#htmlMap[url] = html;
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