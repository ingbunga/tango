(function(){
    let stTime = 0
    let endTime = 0
    let timerStart

    let min
    let sec
    let milisec

    const startBtn = document.getElementById('testStartBtn')
    const stopBtn = document.getElementById('testStopBtn')

    startBtn.addEventListener('click', function () {
        if (!stTime) {
            stTime = Date.now() // 처음 시작할 때
        } else {
            stTime += (Date.now() - endTime) // 재시작할 때
        }

        timerStart = setInterval(function () {
            const nowTime = new Date(Date.now() - stTime)
            min = addZero(nowTime.getMinutes())
            sec = addZero(nowTime.getSeconds())
            milisec = addZero(Math.floor(nowTime.getMilliseconds() / 10))
            document.getElementById('postTestMin').innerText = min
            document.getElementById('postTestSec').innerText = sec
            document.getElementById('postTestMilisec').innerText = milisec
        }, 1)
    })

    stopBtn.addEventListener('click', function () {
        if (timerStart) {
            clearInterval(timerStart)
            endTime = Date.now() // STOP시점의 시간 저장
        }
    })

    function addZero(num) {
        return (num < 10 ? '0' + num : '' + num)
    }
})();