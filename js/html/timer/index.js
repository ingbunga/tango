import EZStorage from '../../tools/EasyStorage.js';
const EZ = new EZStorage();

var alreadyRun = false;
var timerStart

export default function(){

    let stTime = 0
    let endTime = 0

    let min
    let sec
    let milisec

    const startBtn = document.getElementById('testStartBtn')
    const stopBtn = document.getElementById('testStopBtn')
    const recordList = document.getElementById('testRecordList')

    if(EZ.storage.Timer === undefined){
        EZ.storage.Timer = {
            stTime: 0,
            endTime: 0,
            run: false
        }
    }
    else{
        stTime = EZ.storage.Timer.stTime;
        endTime = EZ.storage.Timer.endTime;
    }
    
    startBtn.addEventListener('click', function () {
        // RECORD
        if (this.innerText == 'RECORD' && milisec) {
            var li = document.createElement('li')
            li.innerText = min + ' : ' + sec + ' : ' + milisec
            if (!recordList.firstChild) {
                recordList.append(li)
            } else {
                recordList.insertBefore(li, recordList.firstChild)
            }
            return false
        }
        this.innerText = 'RECORD'
        if (!stTime) {
            stTime = new Date().getTime() // 최초 START
            EZ.storage.Timer.stTime = stTime;
        } else {
            stopBtn.innerText = 'STOP'
            if(alreadyRun && EZ.storage.Timer.run === false){
                stTime += (Date.now() - endTime) // RESTART
            }
            EZ.storage.Timer.stTime = stTime;
        }
        if(!alreadyRun){
            timerStart = setInterval(function () {
                var nowTime = new Date(Date.now() - stTime)
                min = addZero(Math.floor(nowTime / (1000 * 60 * 60)));
                sec = addZero(Math.floor(nowTime / (1000 * 60))% 60);
                milisec = addZero(Math.floor(nowTime / 1000)% 60);
                if(document.getElementById('postTestMin') !== null){
                    document.getElementById('postTestMin').innerText = min
                    document.getElementById('postTestSec').innerText = sec
                    document.getElementById('postTestMilisec').innerText = milisec
                }
            }, 1000)
            alreadyRun = true;
            EZ.storage.Timer.run = true;
        }
    })

    stopBtn.addEventListener('click', function () {
        if (timerStart) {
            clearInterval(timerStart) // STOP
            if (this.innerText == 'STOP') {
                endTime = Date.now()
                EZ.storage.Timer.endTime = endTime
                this.innerText = 'RESET'
                startBtn.innerText = 'RESTART'
                alreadyRun = false;
            } else { // RESET
                stTime = 0
                EZ.storage.Timer.stTime = 0;
                EZ.storage.Timer.endTime = 0;
                min = 0
                sec = 0
                milisec = 0
                document.getElementById('postTestMin').innerText = '00'
                document.getElementById('postTestSec').innerText = '00'
                document.getElementById('postTestMilisec').innerText = '00'
                startBtn.innerText = 'START'
                this.innerText = 'STOP'
                timerStart = null
                recordList.innerHTML = ''
            }
            EZ.storage.Timer.run = false;
        }
    })

    function addZero(num) {
        return (num < 10 ? '0' + num : '' + num)
    }

    var nowTime = Date.now() - stTime;
    if(EZ.storage.Timer.stTime !== 0 && EZ.storage.Timer.run){
        startBtn.click();
    }
    else if(!EZ.storage.Timer.run && EZ.storage.Timer.stTime !== 0){
        nowTime = (endTime - stTime)
    }
    else{
        var nowTime = 0;
    }
    min = addZero(Math.floor(nowTime / (1000 * 60 * 60)));
    sec = addZero(Math.floor(nowTime / (1000 * 60))% 60);
    milisec = addZero(Math.floor(nowTime / 1000)% 60);
    document.getElementById('postTestMin').innerText = min
    document.getElementById('postTestSec').innerText = sec
    document.getElementById('postTestMilisec').innerText = milisec
}