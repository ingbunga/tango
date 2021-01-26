function add(){
    var newDIV = document.createElement("div");
    var parent = document.getElementById("voca_add").parentElement;
    newDIV.setAttribute("id", "voca_add");
    newDIV.innerHTML = '<input type="text" name="voca" placeholder="단어"> <input type="text" name="mean" placeholder="뜻"> <button onclick="add()">추가하기</button> <button onclick="remove(this)">제거하기</button>'
    parent.appendChild(newDIV);
}

function remove(p){
    var parent = p.parentElement;
    console.log(parent);
    parent.parentNode.removeChild(parent);
}