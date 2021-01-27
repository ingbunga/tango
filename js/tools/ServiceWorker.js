console.log('Loaded service worker!');
let alerter = null



function createAlerter(){
    alerter = setInterval(()=>{
        self.registration.showNotification('Tango',{
            body: '저랑 단어공부해요~~',
        })
    },1000 * 60 * 60 * 24)
}

function killAlerter(){
    if(alerter !== null){
        clearInterval(alerter);
    }
}

self.addEventListener('install', event => {
    self.registration.showNotification('Tango',{
        body: '단어 공부를 시작해봅시다!',
    })
});

self.addEventListener('activate', event => {
    self.registration.showNotification('Tango',{
        body: '** 활성화 됨 **',
    })
    console.log('activate')
});

self.addEventListener('message', event => {
    if(event.data === 'die'){
        createAlerter();   
    }
    else if(event.data === 'hello'){
        self.registration.showNotification('Tango',{
            body: '돌아오신것을 환영합니다.',
        });
        killAlerter();
    }
    else{
        self.registration.showNotification('Tango',{
            body: event.data,
        })
    }
})