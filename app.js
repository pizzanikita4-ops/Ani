let page=1, loading=false, currentMode='home', lastParams={};

async function showHome(){ currentMode='home'; page=1; content.innerHTML=''; loadMoreHome(); }
async function loadMoreHome(){
    if(loading) return; loading=true;
    let r=await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    let j=await r.json(); drawGrid(j.data,true); page++; loading=false;
}

async function showRandom(){ currentMode='random'; content.innerHTML=''; let a=await randomAnime(); drawGrid([a]); }
async function showFavorites(){ currentMode='favorites'; drawGrid(getFavorites()); }
async function showTrash(){ currentMode='trash'; page=1; content.innerHTML=''; loadMoreTrash(); }
async function loadMoreTrash(){
    if(loading) return; loading=true;
    let r=await fetch(`https://api.jikan.moe/v4/anime?max_score=6&page=${page}`);
    let j=await r.json(); drawGrid(j.data,true); page++; loading=false;
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 300){
        if(currentMode==='home') loadMoreHome();
        else if(currentMode==='trash') loadMoreTrash();
    }
});

showHome();
