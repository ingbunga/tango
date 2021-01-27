import EZstorage from "../../tools/EasyStorage.js";

export default function(){
    function noteBox({
        id = 0,
        name = '',
        detail = '',
    }){
        return `
        <div class="notebox route" href="./view?id=${id}">
            <span class="material-icons">
                description
            </span>
            <div class="noteRight">
                <h2>${name}</h2>
                <span>${detail}</span>
            </div>
        </div>`
    }

    const EZ = new EZstorage();
    
    const saveList = EZ.storage.noteList
    
    const noteListDOM = document.getElementById('noteList');
    noteListDOM.innerHTML = '';
    
    saveList.forEach((value, index)=>{
        noteListDOM.innerHTML += (
            noteBox({
                id: index,
                name: value.name,
                detail: value.detail
            })
        )
    })
}
