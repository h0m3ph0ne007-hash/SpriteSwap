/* SpriteSwap V34 Fortnitemares 2026 */
(function(){
const entries=[
["Spooky Dash","LIVE NOW"],["Vampire","LIVE NOW"],["The Deer","LIVE NOW"],["Dumpster Dive","LIVE NOW"],
["Trick or Treat Crown","LIVE"],["Trick or Treat Klombo","UPCOMING"],["Trick or Treat Spooky Dash","UPCOMING"],
["Trick or Treat Crash Bandicoot","UPCOMING"],["Trick or Treat Blinky","UPCOMING"],["Trick or Treat Vampire","UPCOMING"],
["Trick or Treat The Deer","UPCOMING"],["Trick or Treat Killswitch","UPCOMING"],["Trick or Treat X-Ray","UPCOMING"],
["Trick or Treat Morgana","UPCOMING"],["Trick or Treat Tails","UPCOMING"],["Trick or Treat Sonic","UPCOMING"],
["Trick or Treat Overshield","UPCOMING"],["Trick or Treat Shadow","UPCOMING"],["Trick or Treat Pond","UPCOMING"],
["Trick or Treat Dumpster Dive","UPCOMING"],["Trick or Treat 8-Bit","UPCOMING"],["Trick or Treat Birthday","UPCOMING"],
["Trick or Treat Bushranger","UPCOMING"],["Trick or Treat Adventure","UPCOMING"],["Trick or Treat Jonesy","UPCOMING"],
["Trick or Treat Storm Scout","UPCOMING"],["Trick or Treat Onigiri","UPCOMING"],["Honey","OCT 15"],["Obsession","OCT 15"]
];
const slug=n=>n.toLowerCase().replace(/^trick or treat /,"trick-or-treat-").replaceAll(" ","-");
const img=n=>`https://api.spritetrading.com/sprites/${slug(n)}.webp?w=256`;
function render(){
 const g=document.getElementById("upcomingGrid"); if(!g)return;
 g.innerHTML=entries.map(([n,s])=>`<article class="updateCard"><div style="min-height:150px;display:grid;place-items:center;background:rgba(255,255,255,.035);border-radius:14px;padding:12px"><img src="${img(n)}" alt="${n}" loading="lazy" style="width:120px;height:120px;object-fit:contain" onerror="this.style.opacity='.25'"></div><div style="padding-top:12px"><div style="display:flex;justify-content:space-between;gap:8px"><b>${n}</b><span class="chip">${s}</span></div></div></article>`).join("");
 const h=document.querySelector(".heroSmall h1"),p=document.querySelector(".heroSmall p");
 if(h)h.textContent="Fortnitemares 2026 — Sprite update";
 if(p)p.textContent="The newest Halloween Sprites and Trick or Treat variants are tracked here with real Sprite artwork.";
}
document.addEventListener("DOMContentLoaded",render);
})();