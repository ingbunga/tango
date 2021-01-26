export default async function LoadHtml(url){
    const res = await fetch(url);
    return await res.text();
}