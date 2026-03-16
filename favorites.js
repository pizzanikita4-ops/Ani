function getFavorites(){

return JSON.parse(localStorage.getItem("favorites")||"[]")

}

function addFavorite(anime){

let fav=getFavorites()

if(!fav.find(a=>a.mal_id==anime.mal_id)){

fav.push(anime)

localStorage.setItem("favorites",JSON.stringify(fav))

}

}

function removeFavorite(id){

let fav=getFavorites().filter(a=>a.mal_id!=id)

localStorage.setItem("favorites",JSON.stringify(fav))

}
