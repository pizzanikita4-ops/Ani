const API="https://api.jikan.moe/v4"

async function getTop(){

let r=await fetch(API+"/top/anime")
let j=await r.json()

return j.data

}

async function searchAnime(q){

let r=await fetch(API+"/anime?q="+q)
let j=await r.json()

return j.data

}

async function randomAnime(){

let r=await fetch(API+"/random/anime")
let j=await r.json()

return j.data

}

async function getRecommendations(id){

let r=await fetch(API+"/anime/"+id+"/recommendations")
let j=await r.json()

return j.data

}

async function getCharacters(id){

let r=await fetch(API+"/anime/"+id+"/characters")
let j=await r.json()

return j.data

}

async function getEpisodes(id){

let r=await fetch(API+"/anime/"+id+"/episodes")
let j=await r.json()

return j.data

}

async function getReviews(id){

let r=await fetch(API+"/anime/"+id+"/reviews")
let j=await r.json()

return j.data

}

async function getSchedule(){

let r=await fetch(API+"/schedules")
let j=await r.json()

return j.data

  }
