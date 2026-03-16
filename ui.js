async function drawGrid(list, append=false){
    if(!append) content.innerHTML='';
    const gridDiv = document.createElement('div');
    gridDiv.className = 'grid';
    list.forEach(a=>{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${a.images.jpg.large_image_url}">
            <h4 class="p-2">${a.title}</h4>
            <p class="p-2">⭐ ${a.score || 'N/A'}</p>
        `;
        card.onclick = ()=>openAnime(a.mal_id);
        gridDiv.appendChild(card);
    });
    content.appendChild(gridDiv);
}

async function openAnime(id){
    let r=await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    let j=await r.json();
    let a=j.data;
    let html=`
    <div class="modal">
        <div class="modal-content">
            <button class="close" onclick="closeModal()">✖</button>
            <h2>${a.title}</h2>
            <img src="${a.images.jpg.large_image_url}" class="mb-2">
            <p>${a.synopsis || "Описание отсутствует"}</p>
            <p>Год: ${a.year || "N/A"} | Эпизоды: ${a.episodes || "N/A"} | Тип: ${a.type || "N/A"}</p>
            <p>Статус: ${a.status || "N/A"} | OVA: ${a.type==="OVA"?"Да":"Нет"}</p>
            <p>Рейтинг: ${a.score || "N/A"} | Популярность: ${a.popularity || "N/A"}</p>
            <p>Производство: ${a.producers.map(p=>p.name).join(", ") || "N/A"}</p>
            ${a.trailer?.embed_url ? `<iframe src="${a.trailer.embed_url}" width="100%" height="250" frameborder="0" allowfullscreen></iframe>`:""}
            <button onclick='addFavorite(${JSON.stringify(a)})'>❤️ Хочу посмотреть</button>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend",html);
}

function closeModal(){ document.querySelector(".modal")?.remove(); }
