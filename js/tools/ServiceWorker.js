console.log('Loaded service worker!');
let alerter = null

function createAlerter(){
    self.print('ok');
    console.warn(1231)
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
    createAlerter();
    self.registration.showNotification('Tango',{
        body: '돌아오신걸 환영합니다.',
    })
})