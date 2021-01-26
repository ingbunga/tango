(function(){
    const voca_form = document.getElementById('form');

    voca_form.onsubmit = submit;

    function submit(event){
        alert("테스트!");
        //event.preventDefault();
    }
    
})()
let count = 1;

function add(){
    var newDIV = document.createElement("div");
    var parent = document.getElementsByClassName("voca_add")[0].parentElement;
    newDIV.setAttribute("class", "voca_add");
    newDIV.innerHTML = '<input type="text" name="voca" class="voca" placeholder="단어" required> <input type="text" name="mean" class="mean" placeholder="뜻" required> <input type="button" value="추가하기" onclick="add()" class="voca_input"> <input type="button" value="제거하기" onclick="remove(this)">' 
    parent.appendChild(newDIV);
    count++;
    console.log(count);
}

function remove(p){
    if(count == 1){
        alert("단어 입력 칸을 전부 지울 수 없습니다!");
        return;
    }
    var parent = p.parentElement;
    parent.parentNode.removeChild(parent);
    count--;
    console.log(count);
}

function title_text(){
    let titlet = document.getElementById('title').value;
    console.log(titlet);
}

function detail_text(){
    let detailt = document.getElementById('detail').value;
    console.log(detailt);
}
