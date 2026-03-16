// app.js
let page = 1;
let loading = false;
let currentMode = 'home';
let lastParams = {};
let genresList = [], subGenresList = [];

async function showHome(){ 
    currentMode='home'; page=1; lastParams={}; content.innerHTML=''; loadMoreHome(); 
}
async function loadMoreHome(){
    if(loading) return; loading=true;
    const url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
    try{ const res=await fetch(url); const data=await res.json(); drawGrid(data.data,true); page++; }catch(e){console.error(e);}
    loading=false;
}

async function showRandom(){ 
    currentMode='random'; page=1; content.innerHTML=''; 
    let a=await randomAnime(); drawGrid([a]); 
}

async function showSearch(){
    currentMode='search'; page=1; content.innerHTML='Loading...';
    genresList = await getGenres();
    subGenresList = genresList; // можно фильтровать по поджанрам
    renderSearchUI();
}

function renderSearchUI(){
    content.innerHTML = `
        <div class="flex flex-wrap gap-2 mb-2">
            <input id="q" placeholder="Поиск..." class="border p-2 rounded flex-1">
            <input id="year" placeholder="Год" class="border p-2 rounded w-24">
            <select id="type" class="border p-2 rounded">
                <option value="">Тип</option>
                <option value="tv">TV</option>
                <option value="movie">Movie</option>
                <option value="ova">OVA</option>
            </select>
            <select id="status" class="border p-2 rounded">
                <option value="">Статус</option>
                <option value="airing">Выходит</option>
                <option value="complete">Завершено</option>
            </select>
            <button onclick="doSearch()" class="bg-pastel-green text-gray-900 p-2 rounded hover:bg-green-400">Найти</button>
        </div>
        <div class="flex flex-wrap gap-2 mb-2" id="genreContainer"></div>
        <div id="results"></div>
    `;
    let genreContainer = document.getElementById("genreContainer");
    genresList.forEach(g=>{
        let btn = document.createElement("button");
        btn.className="border p-2 rounded bg-gray-800 hover:bg-gray-700";
        btn.innerText=g.name;
        btn.onclick=()=>{
            btn.classList.toggle("bg-pastel-green");
            btn.classList.toggle("text-gray-900");
        };
        genreContainer.appendChild(btn);
    });
}

async function doSearch(){
    let q=document.getElementById("q").value;
    let year=document.getElementById("year").value;
    let type=document.getElementById("type").value;
    let status=document.getElementById("status").value;
    let genreButtons = Array.from(document.getElementById("genreContainer").children);
    let selectedGenres = genreButtons.filter(b=>b.classList.contains("bg-pastel-green")).map(b=>genresList.find(g=>g.name===b.innerText).mal_id);

    lastParams={q,year,type,status,genres:selectedGenres};
    page=1;
    let data = await searchAnime({...lastParams,page});
    drawGrid(data);
}

function showFavorites(){ currentMode='favorites'; drawGrid(getFavorites()); }

async function showTrash(){ 
    currentMode='trash'; page=1; content.innerHTML=''; loadMoreTrash(); 
}
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
