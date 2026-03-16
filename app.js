async function showHome(){

let data=await getTop()

drawGrid(data)

}

async function showRandom(){

let a=await randomAnime()

drawGrid([a])

}

function showSearch(){

content.innerHTML=`

<input id="q" placeholder="Поиск">

<button onclick="doSearch()">Найти</button>

<div id="results"></div>

`

}

async function doSearch(){

let q=document.getElementById("q").value

let data=await searchAnime(q)

drawGrid(data)

}

function showFavorites(){

let fav=getFavorites()

drawGrid(fav)

}

showHome()
