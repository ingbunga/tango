export default function(EZ){
    const voca_form = document.getElementById('form');
    const file = document.getElementById('A_file');

    const voca_add = document.querySelector('.voca_add');

    const init_add = voca_add.children[2];
    const init_rm = voca_add.children[3];
    console.debug(init_add);
    console.debug(init_rm);
    console.debug(voca_add.children);
    init_add.addEventListener('click', add);
    init_rm.addEventListener('click', remove);


    voca_form.onsubmit = submit;

    function submit(event){
        alert("테스트!");
        event.preventDefault();
        voca_text();
        mean_text();
        save();
    }

    // 저장용 변수
    const vocat = [];
    const meant = [];

    var count = 1;

    function add(){
        var newDIV = document.createElement("div");
        var parent = document.getElementsByClassName("voca_add")[0].parentElement;
        newDIV.setAttribute("class", "voca_add");
        newDIV.innerHTML = `
            <input type="text" name="voca" class="voca" placeholder="단어" required>
            <input type="text" name="mean" class="mean" placeholder="뜻" required>
            <input type="button" value="추가하기" class="voca_input">
            <input type="button" value="제거하기">
        `
        newDIV.children[2].addEventListener('click', add);
        newDIV.children[3].addEventListener('click', remove);
        parent.appendChild(newDIV);
        count++;
    }

    function remove(){
        if(count == 1){
            alert("단어 입력 칸을 전부 지울 수 없습니다!");
            return;
        }
        var parent = this.parentElement;
        parent.parentElement.removeChild(parent);
        count--;
    }

    function save(){
        let titlet = document.getElementById('title').value;
        let detailt = document.getElementById('detail').value;
        EZ.storage.noteList.push({
            name: titlet,
            detail: detailt,
            wordList: vocat,
            meanList: meant
        })
    }


    function voca_text(){
        const vocaDoms = document.getElementsByClassName('voca');
        for(let i = 0; i < vocaDoms.length; i++){
            vocat.push(vocaDoms[i].value);
        }
        for(let i = 0; i < vocaDoms.length; i++){
            console.debug(vocat[i]);
        }
    }

    function mean_text(){
        const meanDoms = document.getElementsByClassName('mean');
        for(let i = 0; i < meanDoms.length; i++){
            meant.push(meanDoms[i].value);
        }
        for(let i = 0; i < meanDoms.length; i++){
            console.debug(meant[i]);
        }
    }

    // --------------< 파일 불러오기 >---------------

    file.onchange = (event) => {
        processFile(event.target.files[0]);
    }

    function processFile(file) {
        var reader = new FileReader();
        reader.onload = function () {
            fileSave(reader.result);
        };
        reader.readAsText(file, "utf-8");
    }
    
    function fileSave(json){
        EZ.storage.noteList.push(JSON.parse(json));
        alert('complete')
    }
    
}