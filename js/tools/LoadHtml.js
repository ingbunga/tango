// const isGithub = true;
const isGithub = location.href.includes('github.com');

export default async function LoadHtml(url){
    let res;
    if(isGithub){
        res = await fetch('/tango'+url);
    }
    else{
        res = await fetch(url);
    }
    return await res.text();
}