import EZstorage from '../../tools/EasyStorage.js';

function recentFactory({
    name = 'noteName',
    wrongWords = [''],
    wrongMeans = ['']
}){
    if(wrongWords.length === 0){
        return '';
    }
    const combinedWords =  []
    for(let i = 0; i < wrongMeans.length; i++){
        combinedWords.push(`${wrongWords[i]}:${wrongMeans[i]}`)
    }
    return`
    <div id="A_bodyMenu">
        <div class="A_bodyItem">
            <span>${name}</span>
            <div>
                틀린단어:<br> ${combinedWords.join('<br>')}
            </div>
        </div>
    </div>`
}


export default function (router){
    const totalRight = document.getElementById('A_totalRight');
    const totalWrong = document.getElementById('A_totalWrong');

    const recentList = document.getElementById('A_recentList');
    const EZ = new EZstorage();

    const $ = EZ.storage;
    console.log($.analytics.recent);

    // 총 맞은개수
    totalRight.innerHTML = `총 맞은 개수: ${$.analytics.totalRight}`;
    totalWrong.innerHTML = `총 틀린 개수: ${$.analytics.totalWrong}`;


    for(let i = 0; i < $.analytics.recent.length; i++){
        const target = $.analytics.recent[i];
        recentList.innerHTML += recentFactory({
            name: target.noteName,
            wrongWords: target.wrong.word,
            wrongMeans: target.wrong.mean,
        })
    }
}