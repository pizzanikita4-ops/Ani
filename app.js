const API="https://api.jikan.moe/v4"

async function getTop(){ let r=await fetch(API+"/top/anime"); let j=await r.json(); return j.data; }
async function randomAnime(){ let r=await fetch(API+"/random/anime"); let j=await r.json(); return j.data; }
async function searchAnime(params){ 
  let url=API+"/anime?";
  if(params.q) url+="q="+encodeURIComponent(params.q)+"&";
  if(params.type) url+="type="+params.type+"&";
  if(params.status) url+="status="+params.status+"&";
  if(params.year) url+="start_date="+params.year+"-01-01&end_date="+params.year+"-12-31&";
  if(params.genres) url+="genres="+params.genres.join(",")+"&";
  if(params.order_by) url+="order_by="+params.order_by+"&";
  if(params.sort) url+="sort="+params.sort+"&";
  if(params.page) url+="page="+params.page+"&";
  let r=await fetch(url); let j=await r.json(); return j.data;
}
async function getRecommendations(id){ let r=await fetch(API+"/anime/"+id+"/recommendations"); let j=await r.json(); return j.data; }
async function getCharacters(id){ let r=await fetch(API+"/anime/"+id+"/characters"); let j=await r.json(); return j.data; }
