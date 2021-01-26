export default ( html, data ) => {
    const dataReg = /{{\s*([A-z]+)\s*}}/g
    const exactFind = /{{\s*(.+)\s*}}/
    return html.replace(dataReg, (raw)=>{
        const name = raw.match(exactFind)[1].trim();
        return data[name];
    })
}