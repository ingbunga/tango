var alreadyRun = false;
var timerStart
export default function(EZ){
    let stTime = 0
    let endTime = 0

    let min
    let sec
    let milisec

    const startBtn = document.getElementById('testStartBtn')
    const stopBtn = document.getElementById('testStopBtn')
    const recordList = document.getElementById('testRecordList')

    if(EZ.storage.Timer == undefined){
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
            console.log(min, sec, milisec)
            var li = document.createElement('li')
            li.style.color = "#fff"
            li.innerText = min + ' : ' + sec + ' : ' + milisec
            if (!recordList.firstChild) {
                recordList.append(li)
            } else {
                recordList.insertBefore(li, recordList.firstChild)
            }
            return false
        }
        this.innerText = 'RECORD'
        console.error('1')
        console.error(Date.now());
        if (!stTime) {
            stTime = new Date().getTime() // 최초 START
            console.warn(stTime);
            EZ.storage.Timer.stTime = stTime;
        } else {
            console.log(stTime)
            stopBtn.innerText = 'STOP'
            if(alreadyRun || EZ.storage.Timer.run === false){
                stTime += (Date.now() - endTime) // RESTART
            }
            console.warn(stTime);
            EZ.storage.Timer.stTime = stTime;
        }
        if(!alreadyRun){
            timerStart = setInterval(function () {
                var nowTime = new Date(Date.now() - stTime)
                min = addZero(nowTime.getMinutes())
                sec = addZero(nowTime.getSeconds())
                milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10))
                document.getElementById('postTestMin').innerText = min
                document.getElementById('postTestSec').innerText = sec
                document.getElementById('postTestMilisec').innerText = milisec
            }, 1)
            alreadyRun = true;
        }
        EZ.storage.Timer.run = true;
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
                EZ.storage.Timer.stTime = 0;
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

    console.error(EZ.storage.Timer.stTime);
    if(EZ.storage.Timer.stTime !== 0 && EZ.storage.Timer.run){
        startBtn.click();
    }
    else{
        var nowTime = new Date(endTime - stTime)
        min = addZero(nowTime.getMinutes())
        sec = addZero(nowTime.getSeconds())
        milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10))
        document.getElementById('postTestMin').innerText = min
        document.getElementById('postTestSec').innerText = sec
        document.getElementById('postTestMilisec').innerText = milisec
    }
}