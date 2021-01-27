// 사용방법
/*
import unpack from '이 파일';

unpack(location.href);
*/
export default function(){
    const url = location.href;
    const out = {};
    const query = url.split('?')[1];
    const queryList = query.split(';');
    queryList.forEach(element => {
        out[element.split('=')[0]] = element.split('=')[1];
    });
    return out;
}