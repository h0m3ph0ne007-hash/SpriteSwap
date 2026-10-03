const FAMILIES=["Jonesy","Adventure","Bush","Sonic","Tails","Shadow","8-Bit","Jackrabbit","Crown","Killswitch","Klombo","Mega Man","Overshield","X-Ray","Onigiri","Storm Scout","Blinky","Birthday","Crash Bandicoot","Pond","Morgana","Spooky Dash","Vampire","The Deer","Dumpster Dive"];const TIERS=["Base","Gold","Cheat Master","Loot Hacker","Bounty Hunter","Trick or Treat"];const NEW=["Spooky Dash","Vampire","The Deer","Dumpster Dive"];const CURRENT_SEASON="Chapter 7 Season 4";const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");const tierSlugs=t=>({"Base":[""],"Gold":["gold"],"Cheat Master":["cheat-master","cheatmaster"],"Loot Hacker":["loot-hacker"],"Bounty Hunter":["bounty-hunter"],"Trick or Treat":["trick-or-treat","trick-treat"]}[t]||[""]);
const imageCandidates=(name,tier="Base")=>{
  const s=slug(name), display=(tier==="Base"?name:`${tier} ${name}`);
  const enc=encodeURIComponent(display);
  const slugs=tierSlugs(tier);
  return [
    ...slugs.map(v=>`https://api.spritetrading.com/sprites/${v?`${s}-${v}`:s}.webp?w=640`),
    `https://api.spritetrading.com/sprites/${s}.webp?w=640`,
    `https://fortnite.gg/img/sprites/${enc}.png`
  ];
};
const image=(name,tier="Base",cls="")=>{
  const candidates=imageCandidates(name,tier);
  const first=candidates[0]||"";
  return `<div class="art dynamic-art ${cls}" data-fallbacks='${esc(JSON.stringify(candidates))}'><img src="${first}" alt="${esc(name)} ${esc(tier)}" loading="lazy" onerror="swapImage(this)" onload="this.classList.add('loaded')"><div class="art-label">${esc(name)}</div></div>`;
};
function swapImage(img){
  try{
    const box=img.closest("[data-fallbacks]"), list=JSON.parse(box?.dataset.fallbacks||"[]"), i=Number(img.dataset.fallbackIndex||0)+1;
    if(i<list.length){img.dataset.fallbackIndex=i;img.src=list[i];return}
    img.style.display="none"; box?.classList.add("missing-art");
  }catch(e){img.style.display="none"}
}
function savedList(key){try{return JSON.parse(localStorage.getItem(key)||"[]")}catch(e){return[]}}
function toggleSaved(key,id){const a=savedList(key),i=a.indexOf(id);i>=0?a.splice(i,1):a.push(id);localStorage.setItem(key,JSON.stringify(a));return i<0}
function spriteCards(list=FAMILIES,tier="Base"){
  return list.filter(n=>isTracked(n,tier)).map(n=>{
    const id=n+"::"+tier,w=savedList("spriteswap-wishlist").includes(id),m=savedList("spriteswap-mastered").includes(id);
    return `<article class="card sprite-card tier-${slug(tier)}" data-name="${esc(n)}" data-tier="${esc(tier)}"><div class="art dynamic-art">${image(n,tier)}<button class="wish-btn ${w?"saved":""}" data-action="wish" title="Wishlist">${w?"★":"☆"}</button></div><div class="card-body"><span class="badge ${NEW.includes(n)?"new":""}">${NEW.includes(n)?"NEW":"SPRITE"}</span><span class="variant">${esc(tier)}</span><h3>${esc(n)}</h3><p>${tier==="Base"?"Base sprite":esc(tier)+" variant"} · ${CURRENT_SEASON}</p><div class="card-actions"><button class="mini-btn" data-action="details">View details</button><button class="mini-btn mastered-btn ${m?"done":""}" data-action="mastered">${m?"✓ Mastered":"Mark mastered"}</button></div></div></article>`
  }).join("")
}
function bindSpriteActions(){
  document.querySelectorAll(".sprite-card").forEach(card=>{
    card.onclick=e=>{
      const action=e.target.closest("[data-action]")?.dataset.action;
      const n=card.dataset.name,t=card.dataset.tier,id=n+"::"+t;
      if(action==="wish"){e.stopPropagation();const now=toggleSaved("spriteswap-wishlist",id);const b=e.target.closest("[data-action]");b.textContent=now?"★":"☆";b.classList.toggle("saved",now);return}
      if(action==="mastered"){e.stopPropagation();const now=toggleSaved("spriteswap-mastered",id);const b=e.target.closest("[data-action]");b.textContent=now?"✓ Mastered":"Mark mastered";b.classList.toggle("done",now);return}
      if(action!=="details" && e.target.closest("button"))return;
      const modal=document.createElement("div");modal.className="modal-backdrop";
      modal.innerHTML=`<div class="modal"><button class="modal-x">×</button><div class="modal-art">${image(n,t)}</div><div class="kicker">${esc(t)}</div><h2>${esc(n)}</h2><p class="muted">${t==="Base"?"Base sprite":esc(t)+" variant"} · ${CURRENT_SEASON}</p><div class="actions"><button class="btn primary" data-modal="wish">${savedList("spriteswap-wishlist").includes(id)?"★ In wishlist":"☆ Add to wishlist"}</button><button class="btn" data-modal="mastered">${savedList("spriteswap-mastered").includes(id)?"✓ Mastered":"Mark mastered"}</button></div></div>`;
      document.body.appendChild(modal);
      modal.querySelector(".modal-x").onclick=()=>modal.remove();
      modal.onclick=e=>{if(e.target===modal)modal.remove()};
      modal.querySelector('[data-modal="wish"]').onclick=()=>{const now=toggleSaved("spriteswap-wishlist",id);modal.querySelector('[data-modal="wish"]').textContent=now?"★ In wishlist":"☆ Add to wishlist"};
      modal.querySelector('[data-modal="mastered"]').onclick=()=>{const now=toggleSaved("spriteswap-mastered",id);modal.querySelector('[data-modal="mastered"]').textContent=now?"✓ Mastered":"Mark mastered"};
    }
  })
}
function allVariantCards(list=FAMILIES){
  return TIERS.flatMap(t=>list.filter(n=>isTracked(n,t)).map(n=>({n,t}))).map(({n,t})=>spriteCards([n],t)).join("")
}
function initIndex(){
  const count=TIERS.reduce((sum,t)=>sum+FAMILIES.filter(n=>isTracked(n,t)).length,0);
  layout("Sprite Index","Sprites",`<main><section class="hero"><div class="shell hero-grid"><div><div class="kicker">SpriteSwap / Index</div><h1>Every sprite.<br><span style="color:var(--mint)">Real icons.</span></h1><p>A clean, community-first catalog with every tracked Season 4 family and variant. Sprite art loads from the live Sprite Trading image endpoint with automatic naming fallbacks.</p><div class="actions"><a class="btn primary" href="trades.html">Find a trade</a><a class="btn" href="new.html">See what's new</a></div></div><div class="hero-card"><div class="kicker">CATALOG</div><strong>${count}</strong><p>tracked Season 4 family/variant entries</p></div></div></section><section class="section"><div class="shell"><div class="section-head"><div><h2>${CURRENT_SEASON} catalog</h2><div class="muted">All tracked families, all tracked variant finishes, with real sprite icons.</div></div></div><div class="tools"><input id="search" class="input" placeholder="Search sprites…"><select id="tier" class="select"><option value="all">All variants</option>${TIERS.map(t=>`<option>${t}</option>`).join("")}</select></div><div class="stats"><div class="stat"><b>${count}</b><span>Tracked variants</span></div><div class="stat"><b>${FAMILIES.length}</b><span>Season 4 families</span></div><div class="stat"><b>${NEW.length}</b><span>Recent additions</span></div><div class="stat"><b>REAL</b><span>Sprite artwork</span></div></div><div id="grid" class="grid">${allVariantCards()}</div></div></section></main>`);
  document.getElementById("search").oninput=render;
  document.getElementById("tier").onchange=render;bindSpriteActions();
  function render(){
    const q=document.getElementById("search").value.toLowerCase().trim();
    const t=document.getElementById("tier").value;
    const names=FAMILIES.filter(n=>n.toLowerCase().includes(q));
    document.getElementById("grid").innerHTML=t==="all"?allVariantCards(names):spriteCards(names,t);
    if(!document.getElementById("grid").innerHTML)document.getElementById("grid").innerHTML=`<div class="notice">No sprites match that search.</div>`;bindSpriteActions();
  }
}
function pageShell(active,kicker,title,desc,content){layout(title,active,`<main><section class="hero"><div class="shell"><div class="kicker">${kicker}</div><h1>${title}</h1><p>${desc}</p></div></section><section class="section"><div class="shell">${content}</div></section></main>`)}function initHome(){layout("Home","Home",`<main><section class="hero home-hero"><div class="shell hero-grid"><div><div class="kicker">SPRITESWAP / COMMUNITY HUB</div><h1>Trade. Collect.<br><span style="color:var(--mint)">Complete your set.</span></h1><p>Explore sprites, discover variants, keep your wishlist organized, and find your next trade.</p><div class="actions"><a class="btn primary" href="index-page.html">Browse sprites</a><a class="btn" href="trades.html">Explore trades</a></div></div><div class="hero-card feature-sprite"><div class="kicker">FEATURED · ${CURRENT_SEASON}</div>${image("Crown","Gold")}<strong>Gold Crown</strong><p>Featured current variant</p></div></div></section><section class="section"><div class="shell"><div class="section-head"><div><div class="kicker">CURRENT</div><h2>New this season</h2></div><a class="btn" href="new.html">View all</a></div><div class="grid">${spriteCards(NEW,"Base")}</div></div></section><section class="section"><div class="shell"><div class="section-head"><div><div class="kicker">UP NEXT</div><h2>Coming soon</h2></div><a class="btn" href="upcoming.html">See upcoming</a></div><div class="list"><div class="row"><div class="avatar">P</div><div class="grow"><b>Pacman</b><div class="muted">Tracked upcoming sprite</div></div></div><div class="row"><div class="avatar">L</div><div class="grow"><b>Loot Master Crown</b><div class="muted">Variant watch</div></div></div></div></div></section></main>`)}
function initWishlist(){
  const render=()=>{
    const wanted=savedList("spriteswap-wishlist"), mastered=savedList("spriteswap-mastered");
    const make=(ids,kind)=>ids.map(id=>{const [n,t]=id.split("::");if(!n||!FAMILIES.includes(n)||!isTracked(n,t))return "";return `<article class="card sprite-card tier-${slug(t)}" data-name="${esc(n)}" data-tier="${esc(t)}"><div class="art dynamic-art">${image(n,t)}</div><div class="card-body"><span class="badge ${kind==="mastered"?"new":""}">${kind==="mastered"?"MASTERED":"WISHLIST"}</span><span class="variant">${esc(t)}</span><h3>${esc(n)}</h3><p>${t==="Base"?"Base sprite":esc(t)+" variant"} · ${CURRENT_SEASON}</p><div class="card-actions"><button class="mini-btn" data-remove="${kind}">Remove</button></div></div></article>`}).join("");
    layout("Wishlist","Wishlist",`<main><section class="hero"><div class="shell"><div class="kicker">YOUR COLLECTION</div><h1>Wishlist &<br><span style="color:var(--mint)">Mastered.</span></h1><p>Your saved sprites stay in this browser. Build your wishlist, then mark the sprites you own as mastered.</p></div></section><section class="section"><div class="shell"><div class="stats"><div class="stat"><b>${wanted.length}</b><span>Wishlist</span></div><div class="stat"><b>${mastered.length}</b><span>Mastered</span></div><div class="stat"><b>${FAMILIES.length}</b><span>Families</span></div><div class="stat"><b>${Math.round((mastered.length/145)*100)}%</b><span>Tracked completion</span></div></div><div class="section-head"><div><h2>Wishlist</h2><div class="muted">Sprites you want to trade for.</div></div><a class="btn" href="index-page.html">Browse sprites</a></div><div id="wishGrid" class="grid">${make(wanted,"wishlist")||'<div class="notice">Nothing here yet. Add sprites from the index.</div>'}</div><div class="section-head" style="margin-top:42px"><div><h2>Mastered</h2><div class="muted">Sprites you've marked as collected.</div></div></div><div id="masteredGrid" class="grid">${make(mastered,"mastered")||'<div class="notice">No mastered sprites yet.</div>'}</div></div></section></main>`);
    document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{const card=b.closest(".sprite-card"),id=card.dataset.name+"::"+card.dataset.tier;toggleSaved(b.dataset.remove==="wishlist"?"spriteswap-wishlist":"spriteswap-mastered",id);render()});
  };
  render();
}
function tradeData(){try{return JSON.parse(localStorage.getItem("spriteswap-trades")||"[]")}catch(e){return[]}}
function saveTrades(a){localStorage.setItem("spriteswap-trades",JSON.stringify(a))}
function initTrades(){
  const render=()=>{
    const q=(document.getElementById("tradeSearch")?.value||"").toLowerCase().trim(), trades=tradeData().filter(x=>!q||(x.title+x.sprite+x.trader).toLowerCase().includes(q));
    layout("Trades","Trades",`<main><section class="hero"><div class="shell"><div class="kicker">MARKETPLACE</div><h1>Find your next<br><span style="color:var(--mint)">trade.</span></h1><p>Community trade posts are saved in this browser for now. Create a listing with the button below.</p><div class="actions"><button class="btn primary" id="postTrade">Post a trade</button><a class="btn" href="index-page.html">Browse sprites</a></div></div></section><section class="section"><div class="shell"><div class="tools"><input id="tradeSearch" class="input" value="${esc(q)}" placeholder="Search sprite, trader or offer…"></div><div class="list">${trades.map((x,i)=>`<div class="row"><div class="avatar">${esc(x.sprite[0]||"S")}</div><div class="grow"><b>${esc(x.title)}</b><div class="muted">${esc(x.sprite)} · ${esc(x.trader)} · ${esc(x.time)}</div></div><button class="btn" data-trade="${i}">View</button></div>`).join("")||'<div class="notice">No trade posts yet. Be the first to create one.</div>'}</div></div></section></main>`);
    document.getElementById("tradeSearch").oninput=render;
    document.getElementById("postTrade").onclick=()=>{const title=prompt("What are you trading for?");if(!title)return;const sprite=prompt("Which sprite is involved?")||"Any sprite";const a=tradeData();a.unshift({title,sprite,trader:"SpriteSwap Trader",time:"just now"});saveTrades(a);render()};
    document.querySelectorAll("[data-trade]").forEach(b=>b.onclick=()=>{const a=tradeData(),x=a[Number(b.dataset.trade)];if(x)alert(x.title+"\n\n"+x.sprite+"\nPosted by "+x.trader)});
  };
  if(!tradeData().length)saveTrades([{title:"Looking for Gold Jonesy",sprite:"Jonesy · Gold",trader:"Community Trader",time:"recently"},{title:"Trading Shadow for Sonic",sprite:"Shadow / Sonic",trader:"Community Trader",time:"recently"},{title:"Need Loot Hacker Crown",sprite:"Crown · Loot Hacker",trader:"Community Trader",time:"recently"}]);
  render();
}
function initUpcoming(){
  const items=[["Pacman","Tracked upcoming sprite","hot"],["Loot Master Crown","Variant watch","hot"],["Halloween Event","Season event sprite watch","hot"],["Mystery Sprite","Details coming soon","hot"]];
  layout("Upcoming","Upcoming",`<main><section class="hero"><div class="shell"><div class="kicker">NEXT UP</div><h1>Coming<br><span style="color:var(--mint)">soon.</span></h1><p>Sprites and variants being watched by SpriteSwap before they are added to the live index.</p></div></section><section class="section"><div class="shell"><div class="upcoming-grid">${items.map(([n,d,b])=>`<article class="card upcoming-card"><div class="upcoming-art"><div class="upcoming-icon">${n==="Pacman"?"P":n==="Loot Master Crown"?"♛":"✦"}</div></div><div class="card-body"><span class="badge ${b}">UPCOMING</span><h3>${n}</h3><p>${d}</p></div></article>`).join("")}</div></div></section></main>`);
}
function profileData(){try{return JSON.parse(localStorage.getItem("spriteswap-profile")||"{}")}catch(e){return{}}}
function saveProfile(p){localStorage.setItem("spriteswap-profile",JSON.stringify(p))}
function initProfile(){
  const p=profileData(),name=p.name||"SpriteSwap Trader",bio=p.bio||"Sprite collector and trader.",avatar=p.avatar||"S",w=savedList("spriteswap-wishlist").length,m=savedList("spriteswap-mastered").length;
  layout("Profile","Profile",`<main><section class="hero"><div class="shell"><div class="kicker">ACCOUNT / PROFILE</div><div class="profile-hero"><div class="profile-avatar">${esc(avatar.slice(0,2).toUpperCase())}</div><div><h1>${esc(name)}</h1><p>${esc(bio)}</p></div></div></div></section><section class="section"><div class="shell"><div class="stats"><div class="stat"><b>${w}</b><span>Wishlist</span></div><div class="stat"><b>${m}</b><span>Mastered</span></div><div class="stat"><b>${m+w}</b><span>Tracked actions</span></div><div class="stat"><b>V1</b><span>Profile</span></div></div><div class="hero-card"><h2>Edit profile</h2><div class="tools"><input id="pName" class="input" value="${esc(name)}" placeholder="Display name"><input id="pAvatar" class="input" value="${esc(avatar)}" placeholder="Avatar initials"></div><textarea id="pBio" class="input" style="width:100%;min-height:110px" placeholder="Short bio">${esc(bio)}</textarea><div class="actions"><button id="saveProfile" class="btn primary">Save profile</button><a class="btn" href="wishlist.html">Open collection</a></div></div></div></section></main>`);
  document.getElementById("saveProfile").onclick=()=>{saveProfile({name:document.getElementById("pName").value.trim()||"SpriteSwap Trader",avatar:document.getElementById("pAvatar").value.trim()||"S",bio:document.getElementById("pBio").value.trim()||"Sprite collector and trader."});initProfile()};
}
function initLeaderboard(){
  const m=savedList("spriteswap-mastered"),w=savedList("spriteswap-wishlist");
  layout("Leaderboard","Leaderboard",`<main><section class="hero"><div class="shell"><div class="kicker">COMMUNITY</div><h1>Trader<br><span style="color:var(--mint)">leaderboard.</span></h1><p>Local collection activity shown for this browser. No fake global player rankings are presented as live data.</p></div></section><section class="section"><div class="shell"><div class="stats"><div class="stat"><b>${m.length}</b><span>Mastered by you</span></div><div class="stat"><b>${w.length}</b><span>Wanted by you</span></div><div class="stat"><b>${m+w.length}</b><span>Collection actions</span></div><div class="stat"><b>LOCAL</b><span>Activity scope</span></div></div><div class="list"><div class="row"><div class="rank">★</div><div class="avatar">S</div><div class="grow"><b>${esc(profileData().name||"SpriteSwap Trader")}</b><div class="muted">${m} mastered sprites · ${w} wishlist sprites</div></div><b>${m*100+w*25} XP</b></div><div class="notice">Live global leaderboards require a shared backend. This version keeps your local progress accurate instead of inventing online users.</div></div></div></section></main>`);
}
function initAccount(){const p=profileData();layout("Account","Profile",`<main><section class="hero"><div class="shell"><div class="kicker">ACCOUNT</div><h1>Your SpriteSwap<br><span style="color:var(--mint)">account.</span></h1><p>Your current V1 profile is stored locally in this browser.</p></div></section><section class="section"><div class="shell"><div class="hero-card"><h2>${esc(p.name||"SpriteSwap Trader")}</h2><p class="muted">No external sign-in is connected in this V1 build.</p><div class="actions"><a class="btn primary" href="profile.html">Edit profile</a><button id="resetLocal" class="btn">Reset local profile</button></div></div></div></section></main>`);document.getElementById("resetLocal").onclick=()=>{localStorage.removeItem("spriteswap-profile");initAccount()}}
function initCommunity(){layout("Community","Community",`<main><section class="hero"><div class="shell"><div class="kicker">COMMUNITY HUB</div><h1>Trade. Chat.<br><span style="color:var(--mint)">Share sprites.</span></h1><p>Keep your SpriteSwap collection here, then jump into the community chat when you want to trade with others.</p><div class="actions"><a class="btn primary" href="https://discord.gg/kS5Xf35Vf" target="_blank" rel="noopener">Open Discord</a><a class="btn" href="trades.html">Browse trades</a></div></div></section><section class="section"><div class="shell"><div class="upcoming-strip"><div><b>Sprite Index</b><span>Browse tracked variants</span><a class="btn" href="index-page.html">Open</a></div><div><b>Your Collection</b><span>Wishlist + mastered</span><a class="btn" href="wishlist.html">Open</a></div><div><b>Report</b><span>Flag a site problem</span><a class="btn" href="report.html">Open</a></div></div></div></section></main>`)}
function initSimple(){const p=location.pathname.split("/").pop()||"index.html";if(p==="index.html")return initHome();if(p==="index-page.html")return initIndex();if(p==="trades.html")return initTrades();if(p==="new.html")return pageShell("New","LATEST","New this week","The newest Season 4 sprite families currently tracked by SpriteSwap.",`<div class="grid">${spriteCards(NEW)}</div>`);if(p==="upcoming.html")return initUpcoming();if(p==="leaderboard.html")return initLeaderboard();if(p==="wishlist.html")return initWishlist();
if(p==="profile.html")return initProfile();if(p==="account.html")return initAccount();if(p==="report.html")return pageShell("Report","SAFETY","Report a problem","Tell the SpriteSwap team about a listing, profile or site issue.",`<div class="hero-card"><label>What happened?</label><textarea class="input" style="width:100%;min-height:140px;margin-top:10px" placeholder="Describe the issue…"></textarea><div class="actions"><button class="btn primary" onclick="alert('Thanks — your report form is ready to connect to the backend.')">Submit report</button></div></div>`);if(p==="rules.html")return pageShell("Rules","COMMUNITY","Community rules","Keep SpriteSwap friendly and useful for everyone.",`<div class="list">${["Be respectful.","No scams or fake trades.","Do not spam listings.","Use the report page for problems.","Have fun trading sprites."].map((x,i)=>`<div class="row"><div class="rank">${i+1}</div><div>${x}</div></div>`).join("")}</div>`);if(p==="community.html")return initCommunity();return initIndex()}
document.addEventListener("DOMContentLoaded",initSimple)function initModerationPanel(){
  const m=moderationData();
  return `<div class="moderation-panel"><div><b>SpriteSwap Safety Bot</b><span class="muted">Local moderation preview · ${moderationStatus()}</span></div><div class="muted">Reports are reviewed locally in this demo. Three confirmed warnings trigger a 24-hour restriction; repeated violations can trigger a lifetime restriction.</div></div>`;
}
;