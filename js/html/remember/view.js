import QueryParser from '../../tools/unpackQuery.js';
import EZstorage from '../../tools/EasyStorage.js'

function randPopAndDel(arr, arr2){
    const num = Math.floor(Math.random() * arr.length);
    const temp = arr[num];
    const temp2 = arr2[num];
    arr.splice(num, 1);
    arr2.splice(num, 1);
    return [temp, temp2];
}

function randPop(a) {
    return a[Math.floor(Math.random() * a.length)];
}

function randInt(min, max){
    Math.floor(Math.random() * (max-min))+min
}
  

export default function(router){
    const title = document.getElementsByClassName('title')[0];
    const meanListDom = document.getElementById('View_meanList');
    let wordList = [];
    let meanList = [];
    let word;
    let mean;
    let selectList = [];

    let correctCnt = 0;
    let wrongCnt = 0;

    const EZ = new EZstorage();
    const query = QueryParser();
    const $ = EZ.storage;
    const save = EZ.storage.noteList[parseInt(query.id)];
    
    $.analytics.recent.unshift({
        noteName: save.name,
        time: Date.now(),
        wrong:{
            word: [],
            mean: []
        },
        right:{
            word: [],
            mean: []
        }
    })
    const analyticsMe = $.analytics.recent[0];

    function init(){
        wrongCnt = 0;
        correctCnt = 0;
        wordList = [...save.wordList];
        meanList = [...save.meanList];
    }

    function meanFactory({
        mean = '단어'
    }){
        return`
        <div class="View_mean">
            <span class="material-icons">
                description
            </span>
            <div class="View_meanRight">
                <h2>${mean}</h2>
            </div>
        </div>
        `
    }

    function setQuestion(){
        if(wordList.length === 1){
            finish();
        }
        [word, mean] = randPopAndDel(wordList, meanList);
        title.innerHTML = `"${word}"의 뜻은?`;
        selectList = [];
        for(let i = 0; i < 3; i++){
            selectList.push(randPop(meanList));
        }
        selectList.splice(randInt(0,3),0,mean);
        meanListDom.innerHTML = '';
        for(let i = 0; i < 4; i++){
            meanListDom.innerHTML += meanFactory({
                mean: selectList[i]
            })
        }
        document.querySelectorAll('.View_meanRight > h2').forEach((value)=>{
            value.parentElement.parentElement.onclick = () => {
                answer(value.innerHTML);
            }
        })
    }

    function answer(select){
        if(select === mean){
            right();
        }
        else{
            wrong();
        }
        console.log(EZ.storage.analytics)
    }

    function right(){
        correctCnt++;
        $.analytics.totalRight++;
        analyticsMe.right.word.push(word);
        analyticsMe.right.mean.push(mean);
        alert('맞았습니다!');
        setQuestion();
    }
    
    function wrong(){
        wrongCnt++;
        $.analytics.totalWrong++;
        analyticsMe.wrong.word.push(word);
        analyticsMe.wrong.mean.push(mean);
        alert(`틀렸습니다. 정답은 ${mean}`);
        setQuestion();
    }
    function finish(){
        alert(`맞춘 개수: ${correctCnt}\n틀린개수: ${wrongCnt}`)
        if(confirm('끝내시겠습니까?')){
            router.push('/');
        }
        else{
            init();
        }
    }

    init();
    setQuestion();
}