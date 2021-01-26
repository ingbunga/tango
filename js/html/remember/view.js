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
  

export default function(){
    const title = document.getElementsByClassName('title')[0];
    const meanListDom = document.getElementById('meanList');
    let word;
    let mean;
    let selectList = [];

    const save = {
        name: '일본여성케이크',
        detail: '스시녀 사랑한다',
        wordList: ['sex', 'jerkoff'],
        meanList: ['성행위하다', '자위하다']
    }
    const wordList = [...save.wordList];
    const meanList = [...save.meanList];

    function meanFactory({
        mean = '단어'
    }){
        return`
        <div class="mean">
            <span class="material-icons">
                description
            </span>
            <div class="meanRight">
                <h2>${mean}</h2>
            </div>
        </div>
        `
    }

    function setQuestion(){
        [word, mean] = randPopAndDel(wordList, meanList);
        title.innerHTML = `"${word}"의 뜻은?`;
        selectList = [];
        for(let i = 0; i < 3; i++){
            console.error(meanList)
            selectList.push(randPop(meanList));
        }
        selectList.splice(randInt(0,3),0,mean);
        meanListDom.innerHTML = '';
        for(let i = 0; i < 4; i++){
            meanListDom.innerHTML += meanFactory({
                mean: selectList[i]
            })
        }
    }

    function answer(select){
        if(select == rightAnswer){
            right();
        }
        else{
            wrong();
        }
    }

    function right(){

    }
    
    function wrong(){

    }
    function finish(){

    }

    setQuestion();

}