import EZstorage from '../../tools/EasyStorage.js';

export default function(router){
    const EZ = new EZstorage();

    function noteBox({
        id = 0,
        name = '',
        detail = '',
    }){
        return `
        <div class="notebox">
            <span class="material-icons">
                delete
            </span>
            <div class="noteRight">
                <h2>${name}</h2>
                <span>${detail}</span>
            </div>
        </div>`
    }

    function getList(){
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
        htmlBind();
    }

    function htmlBind(){
        const noteDoms = document.getElementsByClassName('notebox');
        for(let i = 0; i < noteDoms.length; i++){
            const noteDom = noteDoms[i];
            noteDom.addEventListener('click', (e)=>{
                EZ.storage.noteList.splice(i,1);
                console.log(EZ.storage.noteList);
                getList();
            })
        }
    }

    getList();
}