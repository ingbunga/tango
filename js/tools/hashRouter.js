
export class Router{
    #nowUrlArray = [];
    #screenDom;
    #notFoundFunc = null;
    nowUrl = ''
    #urlMap = {
        // [url: string] : [trigger: fucntion]
    }
    constructor(){
        this.nowurl = location.hash.slice(2, location.hash.length);
        this.#route();
    }
    // 프로퍼티를 사용해 라우팅을 해주는 내부함수
    #route(){
        location.hash = '!'+this.nowUrl;

        let routed = false;
        for(let i in this.#urlMap){
            if(
                i.slice(0,this.nowUrl.length) === this.nowUrl &&
                i.length === this.nowUrl.length || i[this.nowUrl.length+1] === '/'
            ){
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
    on(url, func){
        this.#urlMap[url] = func;
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
    bindHtml(className, attrName = 'href'){
        const elements = document.querySelectorAll(`.${className}`);

        for(let i = 0; i < elements.length; i++){
            elements[i].addEventListener('click', (e) => {
                e.preventDefault();
                router.push(elements[i].getAttribute(attrName));
            }) 
        }
    }
}