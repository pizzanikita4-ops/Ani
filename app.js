let page = 1;
let loading = false;
let currentMode = 'home';
let lastParams = {};

async function showHome(){ currentMode='home'; page=1; lastParams={}; content.innerHTML=''; loadMoreHome(); }
async function loadMoreHome(){
  if(loading) return; loading=true;
  const url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
  try{ const res=await fetch(url); const data=await res.json(); drawGrid(data.data,true); page++; }catch(e){console.error(e);}
  loading=false;
}

async function showRandom(){ currentMode='random'; page=1; content.innerHTML=''; let a=await randomAnime(); drawGrid([a]); }
function showSearch(){
  currentMode='search';
  page=1;
  content.innerHTML=`
    <input id="q" placeholder="Поиск">
    <input id="year" placeholder="Год">
    <select id="type"><option value="">Тип</option><option value="tv">TV</option><option value="movie">Movie</option><option value="ova">OVA</option></select>
    <select id="status"><option value="">Статус</option><option value="airing">Выходит</option><option value="complete">Завершено</option></select>
    <button onclick="doSearch()">Найти</button>
    <div id="results"></div>
  `;
}
async function doSearch(){
  let q=document.getElementById("q").value;
  let year=document.getElementById("year").value;
  let type=document.getElementById("type").value;
  let status=document.getElementById("status").value;
  lastParams={q,year,type,status};
  page=1;
  let data=await searchAnime({...lastParams,page});
  drawGrid(data);
}

function showFavorites(){ currentMode='favorites'; drawGrid(getFavorites()); }

async function showTrash(){ currentMode='trash'; page=1; content.innerHTML=''; loadMoreTrash(); }
async function loadMoreTrash(){
  if(loading) return; loading=true;
  const url = `https://api.jikan.moe/v4/anime?max_score=6&page=${page}`;
  try{ const res=await fetch(url); const data=await res.json(); if(data.data.length>0){ drawGrid(data.data,true); page++; } }catch(e){console.error(e);}
  loading=false;
}

async function loadMoreSearch(){
  if(loading) return; loading=true;
  page++;
  let data = await searchAnime({...lastParams,page});
  drawGrid(data,true);
  loading=false;
}

window.addEventListener('scroll', ()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 300){
    if(currentMode==='home') loadMoreHome();
    else if(currentMode==='trash') loadMoreTrash();
    else if(currentMode==='search') loadMoreSearch();
  }
});

showHome();
