import EZstorage from '../../tools/EasyStorage.js';

function saveToFile(fileName, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
    const a = document.createElement('a');
    a.download = fileName;
    a.href = objURL;
    a.click();
}

export default function(router){
    const EZ = new EZstorage();

    function noteBox({
        id = 0,
        name = '',
        detail = '',
    }){
        return `
        <div class="C_notebox">
            <span class="material-icons">
                delete
            </span>
            <span class="material-icons">
                get_app
            </span>
            <div class="C_noteRight">
                <h2>${name}</h2>
                <span>${detail}</span>
            </div>
        </div>`
    }

    function getList(){
        const saveList = EZ.storage.noteList;
        
        const noteListDOM = document.getElementById('C_noteList');
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
        const noteDoms = document.getElementsByClassName('C_notebox');
        for(let i = 0; i < noteDoms.length; i++){
            const noteDom = noteDoms[i];
            const nowNote = EZ.storage.noteList[i]
            noteDom.children[0].addEventListener('click',(e)=>{
                EZ.storage.noteList.splice(i,1);
                console.log(EZ.storage.noteList);
                getList();
            })
            noteDom.children[1].addEventListener('click',(e)=>{
                saveToFile(`${nowNote.name}.json`,JSON.stringify(nowNote));
            })
        }
    }

    getList();
}