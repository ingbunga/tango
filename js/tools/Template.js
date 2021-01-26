export default ( html, data ) => {
    const dataReg = /\{{2}\ *.*\ *\}{2}/g
    return html.replace(dataReg, (name)=>{
        console.log(name)
        return data[name]
    })
}