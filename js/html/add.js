export default function(EZ){
    (function(){
        const voca_form = document.getElementById('form');

        voca_form.onsubmit = submit;

        function submit(event){
            alert("테스트!");
            event.preventDefault();
            voca_text();
            mean_text();
            save();
        }
    })()

    var count = 1;

    function add(){
        var newDIV = document.createElement("div");
        var parent = document.getElementsByClassName("voca_add")[0].parentElement;
        newDIV.setAttribute("class", "voca_add");
        newDIV.innerHTML = '<input type="text" name="voca" class="voca" placeholder="단어" required> <input type="text" name="mean" class="mean" placeholder="뜻" required> <input type="button" value="추가하기" onclick="add()" class="voca_input"> <input type="button" value="제거하기" onclick="remove(this)">' 
        parent.appendChild(newDIV);
        count++;
    }

    function remove(p){
        if(count == 1){
            alert("단어 입력 칸을 전부 지울 수 없습니다!");
            return;
        }
        var parent = p.parentElement;
        parent.parentNode.removeChild(parent);
        count--;
    }

    function save(){
        let titlet = document.getElementById('title').value;
        let detailt = document.getElementById('detail').value;
        length = document.getElementsByClassName('voca').length;
        EZ.storage.noteList.push({
            name: titlet,
            detail: detailt,
            wordList: vocat,
            meanList: meant
        })
    }


    function voca_text(){
        length = document.getElementsByClassName('voca').length;
        vocat = [];
        for(var i=0; i<length; i++){
            vocat.push(document.getElementsByClassName('voca')[i].value);
        }
        for(var i=0; i<length; i++){
            console.log(vocat[i]);
        }
    }

    function mean_text(){
        length = document.getElementsByClassName('voca').length;
        meant = [];
        for(var i=0; i<length; i++){
            meant.push(document.getElementsByClassName('mean')[i].value);
        }
        for(var i=0; i<length; i++){
            console.log(meant[i]);
        }
    }
}