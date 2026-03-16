function drawGrid(list){

let html='<div class="grid">'

list.forEach(a=>{

html+=`
<div class="card" onclick="openAnime(${a.mal_id})">

<img src="${a.images.jpg.large_image_url}">

<h4>${a.title}</h4>

⭐ ${a.score}

</div>
`

})

html+='</div>'

content.innerHTML=html

}

async function openAnime(id){

let r=await fetch(API+"/anime/"+id+"/full")

let j=await r.json()

let a=j.data

let rec=await getRecommendations(id)

let chars=await getCharacters(id)

let html=`

<div class="modal">

<div class="modal-content">

<h2>${a.title}</h2>

<img src="${a.images.jpg.large_image_url}" width="200">

<p>${a.synopsis}</p>

<button onclick='addFavorite(${JSON.stringify(a)})'>❤️ Хочу посмотреть</button>

<h3>Персонажи</h3>

${chars.slice(0,5).map(c=>c.character.name).join("<br>")}

<h3>Рекомендации</h3>

${rec.slice(0,5).map(r=>r.entry.title).join("<br>")}

<button onclick="closeModal()">Закрыть</button>

</div>

</div>

`

document.body.insertAdjacentHTML("beforeend",html)

}

function closeModal(){

document.querySelector(".modal").remove()

}
