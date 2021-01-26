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
    
    
    const saveList = [
        {
            name: '노트1',
            detail: '응애노트',
            wordList: ['sex', 'jerkoff'],
            meanList: ['성행위하다', '자위하다']
        },
        {
            name: '일본여성케이크',
            detail: '스시녀 사랑한다',
            wordList: ['sex', 'jerkoff'],
            meanList: ['성행위하다', '자위하다']
        }
    ]
    
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
