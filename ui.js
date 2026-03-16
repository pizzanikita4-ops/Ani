// ui.js
async function drawGrid(list, append=false){
    let container = content;
    if(!append) container.innerHTML = '';
    const gridDiv = document.createElement('div');
    gridDiv.className = 'grid';
    list.forEach(a=>{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${a.images.jpg.large_image_url}">
            <h4>${a.title}</h4>
            ⭐ ${a.score || 'N/A'}
        `;
        card.onclick = ()=>openAnime(a.mal_id);
        gridDiv.appendChild(card);
    });
    container.appendChild(gridDiv);
}

async function openAnime(id){
    let r=await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    let j=await r.json();
    let a=j.data;
    let rec=await getRecommendations(id);
    let chars=await getCharacters(id);

    let html=`
    <div class="modal animate__animated animate__zoomIn">
        <div class="modal-content">
            <button class="close" onclick="closeModal()">✖</button>
            <h2>${a.title}</h2>
            <img src="${a.images.jpg.large_image_url}" class="mb-2">
            <p>${a.synopsis || "Описание отсутствует"}</p>
            <p>Год: ${a.year || "N/A"} | Эпизоды: ${a.episodes || "N/A"} | Тип: ${a.type || "N/A"}</p>
            <p>Статус: ${a.status || "N/A"} | OVA: ${a.type==="OVA"?"Да":"Нет"}</p>
            <p>Рейтинг: ${a.score || "N/A"} | Популярность: ${a.popularity || "N/A"}</p>
            <p>Производство: ${a.producers.map(p=>p.name).join(", ") || "N/A"}</p>
            ${a.trailer?.embed_url ? `<iframe src="${a.trailer.embed_url}" width="100%" height="200" frameborder="0" allowfullscreen></iframe>`:""}
            <h3>Персонажи:</h3> ${chars.slice(0,5).map(c=>c.character.name).join("<br>")}
            <h3>Рекомендации:</h3> ${rec.slice(0,5).map(r=>r.entry.title).join("<br>")}
            <button onclick='addFavorite(${JSON.stringify(a)})' class="mt-2 bg-pastel-green text-gray-900 p-2 rounded hover:bg-green-400">❤️ Хочу посмотреть</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend",html);
}

function closeModal(){ document.querySelector(".modal")?.remove(); }
