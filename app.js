function esc(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function isTracked(name,tier="Base"){return FAMILIES.includes(name)&&TIERS.includes(tier)}
function moderationStatus(){const m=moderationData();if(m.lifetime)return "Lifetime restriction";if(m.bannedUntil>Date.now())return "24-hour restriction";return (m.warnings||0)+"/3 warnings"}
function layout(title,active,content){
  const nav=[["Home","index.html"],["Sprites","index-page.html"],["New","new.html"],["Trades","trades.html"],["Upcoming","upcoming.html"],["Wishlist","wishlist.html"],["Community","community.html"],["Leaderboard","leaderboard.html"],["Profile","profile.html"],["Settings","settings.html"]];
  document.title=title+" · SpriteSwap";
  const app=document.getElementById("app");
  if(!app) throw new Error("SpriteSwap app root is missing");
  app.innerHTML=`<header class="topbar"><div class="shell"><a class="brand" href="index.html"><span class="mark">S</span><span>SpriteSwap</span></a><nav class="nav">${nav.map(([n,h])=>`<a class="${n===active?"active":""}" href="${h}">${n}</a>`).join("")}</nav><a class="btn nav-cta" href="trades.html">Trade</a></div></header>${content}<footer class="footer"><div class="shell"><b>SpriteSwap</b><span>Community sprite trading hub</span></div></footer>`;
}
const FAMILIES=["Jonesy","Adventure","Air","Aura","8-Bit","Batman","Birthday","Blinky","Boss","Burnt Peanut","Bush","Crash Bandicoot","Crown","Demon","Dream","Duck","Dumpster Dive","Earth","Fire","Fishy","Ghost","Grim","Ironmouse","Jackrabbit","John Wick","Killswitch","King","Klombo","Llama","Mega Man","Morgana","Onigiri","Overshield","Peeky Peely","Pond","Pollo","Punk","Seven","Shadow","Sonic","Spooky Dash","Storm Scout","Striker","Tails","The Deer","Vampire","Vini Jr.","Water","X-Ray","Zero Point","Peely"];const TIERS=["Base","Gold","Cheat Master","Loot Hacker","Bounty Hunter","Trick or Treat"];const NEW=["Spooky Dash","Vampire","The Deer","Dumpster Dive"];const CURRENT_SEASON="Chapter 7 Season 4";const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");const tierSlugs=t=>({"Base":[""],"Gold":["gold"],"Cheat Master":["cheat-master","cheatmaster"],"Loot Hacker":["loot-hacker"],"Bounty Hunter":["bounty-hunter"],"Trick or Treat":["trick-or-treat","trick-treat"]}[t]||[""]);
const assetSlug=s=>String(s).replace(/[^a-zA-Z0-9]+/g,"_").replace(/^_+|_+$/g,"");
const SPRITE_ASSET_ALIASES={
  "Mega Man":["ImprovedSlide","MegaMan","Mega_Man"],
  "8-Bit":["8Bit","8_Bit"],
  "Crash Bandicoot":["CrashBandicoot","Crash_Bandicoot"],
  "Storm Scout":["StormScout","Storm_Scout"],
  "Spooky Dash":["SpookyDash","Spooky_Dash"],
  "Dumpster Dive":["DumpsterDive","Dumpster_Dive"],
  "The Deer":["TheDeer","The_Deer"],
  "Zero Point":["ZeroPoint","Zero_Point"],
  "Peeky Peely":["PeekyPeely","Peeky_Peely"],
  "Vini Jr.":["ViniJr","Vini_Jr"]
};
const imageCandidates=(name,tier="Base")=>{
  const aliases=SPRITE_ASSET_ALIASES[name]||[assetSlug(name),slug(name).replace(/-/g,"_")];
  const variants=tier==="Base"?[""]:tierSlugs(tier);
  const urls=[];
  aliases.forEach(a=>variants.forEach(v=>{
    if(v) urls.push(`https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_${a}_${v}_L.webp`);
    else urls.push(`https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_${a}_L.webp`);
  }));
  tierSlugs(tier).forEach(v=>urls.push(`https://api.spritetrading.com/sprites/${v?`${slug(name)}-${v}`:slug(name)}.webp?w=640`));
  return [...new Set(urls)];
};
const image=(name,tier="Base",cls="")=>{
  const candidates=imageCandidates(name,tier);
  return `<div class="art dynamic-art ${cls}" data-fallbacks='${esc(JSON.stringify(candidates))}'><img src="${candidates[0]}" alt="${esc(name)} ${esc(tier)}" loading="lazy" onerror="swapImage(this)" onload="this.classList.add("loaded")"><div class="art-label">${esc(name)}</div></div>`;
};
function swapImage(img){try{const box=img.closest("[data-fallbacks]"),list=JSON.parse(box?.dataset.fallbacks||"[]"),i=Number(img.dataset.fallbackIndex||0)+1;if(i<list.length){img.dataset.fallbackIndex=i;img.src=list[i];return}box?.classList.add("missing-art");img.style.display="none"}catch(e){img.style.display="none"}}
function savedList(key){try{return JSON.parse(localStorage.getItem(key)||"[]")}catch(e){return[]}}
function toggleSaved(key,id){const a=savedList(key),i=a.indexOf(id);i>=0?a.splice(i,1):a.push(id);localStorage.setItem(key,JSON.stringify(a));return i<0}
function spriteCards(list=FAMILIES,tier="Base"){
  return list.filter(n=>isTracked(n,tier)).map(n=>{
    const id=n+"::"+tier,w=savedList("spriteswap-wishlist").includes(id),m=savedList("spriteswap-mastered").includes(id);
    return `<article class="card sprite-card tier-${slug(tier)}" data-name="${esc(n)}" data-tier="${esc(tier)}">${image(n,tier)}<button class="wish-btn ${w?"saved":""}" data-action="wish" title="Wishlist">${w?"★":"☆"}</button><div class="card-body"><span class="badge ${NEW.includes(n)?"new":""}">${NEW.includes(n)?"NEW":"SPRITE"}</span><span class="variant">${esc(tier)}</span><h3>${esc(n)}</h3><p>${tier==="Base"?"Base sprite":esc(tier)+" variant"} · ${CURRENT_SEASON}</p><div class="card-actions"><button class="mini-btn" data-action="details">View details</button><button class="mini-btn mastered-btn ${m?"done":""}" data-action="mastered">${m?"✓ Mastered":"Mark mastered"}</button></div></div></article>`
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
function applyStoredSettings(){
  const themes={mint:["#07110f","#10231e","#62f5bf","#c7ff55"],blue:["#07101b","#10213a","#5bbcff","#78f0ff"],purple:["#10091a","#231535","#c68cff","#f2a8ff"],orange:["#170d07","#2b1b10","#ffb35c","#ffd166"]};
  const k=localStorage.getItem("spriteswap-theme")||"mint",t=themes[k]||themes.mint,custom=localStorage.getItem("spriteswap-custom-accent");
  document.documentElement.style.setProperty("--bg",t[0]);document.documentElement.style.setProperty("--bg2",t[0]);document.documentElement.style.setProperty("--panel",t[1]);document.documentElement.style.setProperty("--mint",custom||t[2]);document.documentElement.style.setProperty("--lime",t[3]);document.documentElement.style.setProperty("--aqua",custom||t[2]);
  document.documentElement.classList.toggle("reduce-motion",localStorage.getItem("spriteswap-reduced-motion")==="1");
  document.documentElement.classList.toggle("compact-mode",localStorage.getItem("spriteswap-compact")==="1");
}
applyStoredSettings();
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
function moderationData(){try{return JSON.parse(localStorage.getItem("spriteswap-moderation")||'{"warnings":0,"bannedUntil":0,"lifetime":false,"reports":[]}')}catch(e){return {warnings:0,bannedUntil:0,lifetime:false,reports:[]}}}
function saveModeration(x){localStorage.setItem("spriteswap-moderation",JSON.stringify(x))}
function moderationCheck(text){const s=String(text||"").toLowerCase();return [/spam/i,/scam/i,/phish/i,/threat/i,/harass/i,/hate/i,/slur/i,/cheat code/i].some(r=>r.test(s))}
function issueWarning(reason){const m=moderationData();m.warnings=(m.warnings||0)+1;m.lastReason=reason;if(m.warnings>=3)m.bannedUntil=Date.now()+86400000;if(m.warnings>=6){m.lifetime=true;m.bannedUntil=0}saveModeration(m);return m}
function isBanned(){const m=moderationData();if(m.lifetime)return true;if(m.bannedUntil>Date.now())return true;if(m.bannedUntil){m.bannedUntil=0;saveModeration(m)}return false}
function botMessage(){const m=moderationData();if(m.lifetime)return "Safety Bot: lifetime restriction is active.";if(m.bannedUntil>Date.now())return "Safety Bot: 24-hour restriction is active.";return m.warnings?("Safety Bot: "+m.warnings+"/3 warnings."): "Safety Bot: good standing."}
function initTrades(){
  let channel=null,cloudDb=null,cloudRef=null,cloudPresence=null,cloudReady=false;
  const clientId=localStorage.getItem("spriteswap-client-id")||(()=>{const x=window.crypto?.randomUUID?.()||("ss-"+Date.now()+"-"+Math.random().toString(36).slice(2));localStorage.setItem("spriteswap-client-id",x);return x})();
  try{channel="BroadcastChannel" in window?new BroadcastChannel("spriteswap-trading"):null}catch(e){}
  const config=window.SPRITESWAP_FIREBASE_CONFIG||{};
  const hasConfig=!!(window.firebase&&config.apiKey&&config.databaseURL&&config.projectId&&config.appId);
  if(hasConfig){
    try{
      if(!firebase.apps.length)firebase.initializeApp(config);
      const startCloud=()=>{
        cloudDb=firebase.database();cloudRef=cloudDb.ref("spriteswap/trading/messages");cloudPresence=cloudDb.ref("spriteswap/trading/presence/"+clientId);cloudReady=true;
        cloudPresence.set({name:profileData().name||"Trader",at:firebase.database.ServerValue.TIMESTAMP});
        cloudPresence.onDisconnect().remove();
        cloudDb.ref(".info/connected").on("value",snap=>{document.querySelector(".online-dot")?.replaceChildren(document.createTextNode(snap.val()===true?"● LIVE":"○ OFFLINE"));if(snap.val()===true)render()});
        render();
      };
      if(firebase.auth?.currentUser)startCloud();else if(firebase.auth?.signInAnonymously)firebase.auth().signInAnonymously().then(startCloud).catch(err=>console.warn("SpriteSwap anonymous sign-in unavailable:",err));
    }catch(err){console.warn("SpriteSwap realtime backend unavailable:",err);cloudReady=false}
  }
  const getCloud=()=>new Promise(resolve=>{
    if(!cloudReady||!cloudRef)return resolve(null);
    cloudRef.limitToLast(100).once("value").then(snap=>{const v=snap.val()||{};resolve(Object.values(v).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0))) }).catch(()=>resolve(null));
  });
  const render=async()=>{
    const q=(document.getElementById("tradeSearch")?.value||"").toLowerCase().trim();
    const source=cloudReady?await getCloud():tradeData();
    const trades=(source||[]).filter(x=>!q||(x.title+" "+x.sprite+" "+x.trader).toLowerCase().includes(q));
    layout("Trades","Trades",`<main><section class="hero"><div class="shell"><div class="kicker">TRADING CHAT</div><h1>Trade in real time.<br><span style="color:var(--mint)">Talk like a community.</span></h1><p>${cloudReady?"Global realtime trading chat is connected.":"Trading chat is running locally until the Firebase connection is configured."}</p><div class="actions"><button class="btn primary" id="postTrade">Post a trade</button><a class="btn" href="index-page.html">Browse sprites</a></div></div></section><section class="section"><div class="shell"><div class="trade-layout"><div class="trade-chat"><div class="chat-head"><b>SpriteSwap Trading Chat</b><span class="online-dot">${cloudReady?"● LIVE":"○ LOCAL"}</span></div><div id="tradeMessages" class="chat-messages">${trades.map((x,i)=>`<div class="chat-msg"><div class="avatar">${esc((x.trader||"S")[0])}</div><div class="chat-bubble"><div><b>${esc(x.trader)}</b><span class="muted"> · ${esc(x.time||"now")}</span></div><div>${esc(x.title)}</div><small>🔄 ${esc(x.sprite)}</small></div><button class="chat-view" data-trade="${i}">View</button></div>`).join("")||'<div class="notice">No trade messages yet. Start the chat.</div>'}</div><div class="chat-compose"><input id="tradeSearch" class="input" value="${esc(q)}" placeholder="Search trading chat…"><input id="tradeMessage" class="input" placeholder="Say what you want to trade…" maxlength="180"><select id="tradeSprite" class="input"><option value="">Choose a sprite…</option>${FAMILIES.map(n=>`<option>${esc(n)}</option>`).join("")}</select><button id="quickPost" class="btn primary">Send</button></div></div><aside class="trade-side"><h3>Trading room</h3><p class="muted">Post an offer and choose the sprite involved. Messages are checked by the Safety Bot.</p><div class="notice">${esc(botMessage())}</div><div class="notice">${cloudReady?"🌐 Global mode: other connected devices can receive messages instantly.":"💾 Local mode: add your Firebase config to enable global chat."}</div><a class="btn" href="report.html">Report a message</a></aside></div></div></section></main>`);
    document.getElementById("tradeSearch").oninput=render;
    const post=async()=>{
      if(isBanned()){alert(botMessage());return}
      const input=document.getElementById("tradeMessage"),select=document.getElementById("tradeSprite");
      const title=input?.value.trim(),sprite=select?.value||"Any sprite";
      if(!title)return;
      if(moderationCheck(title+" "+sprite)){const m=issueWarning("Potentially rule-breaking trade content.");alert(m.bannedUntil?"Safety Bot: 24-hour restriction applied.":"Safety Bot: warning issued ("+m.warnings+"/3).");render();return}
      const item={title,sprite,trader:profileData().name||"SpriteSwap Trader",time:"just now",createdAt:Date.now(),clientId};
      if(cloudReady&&cloudRef){try{await cloudRef.push(item)}catch(err){alert("The global chat could not send that message.");return}}
      else{const a=tradeData();a.unshift(item);saveTrades(a.slice(0,100));if(channel)try{channel.postMessage({type:"new-trade"})}catch(e){}}
      render();
    };
    document.getElementById("postTrade").onclick=post;document.getElementById("quickPost").onclick=post;document.getElementById("tradeMessage").onkeydown=e=>{if(e.key==="Enter")post()};
    document.querySelectorAll("[data-trade]").forEach(b=>b.onclick=()=>{const x=trades[Number(b.dataset.trade)];if(x)alert(x.title+"\\n\\n"+x.sprite+"\\nPosted by "+x.trader)});
  };
  if(cloudReady&&cloudRef)cloudRef.on("value",()=>render());
  if(channel)channel.onmessage=()=>render();
  window.addEventListener("storage",e=>{if(e.key==="spriteswap-trades")render()});
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
function initSettings(){
  const themes={
    mint:["#07110f","#10231e","#62f5bf","#c7ff55"],
    blue:["#07101b","#10213a","#5bbcff","#78f0ff"],
    purple:["#10091a","#231535","#c68cff","#f2a8ff"],
    orange:["#170d07","#2b1b10","#ffb35c","#ffd166"]
  };
  const current=localStorage.getItem("spriteswap-theme")||"mint";
  const reduced=localStorage.getItem("spriteswap-reduced-motion")==="1";
  const compact=localStorage.getItem("spriteswap-compact")==="1";
  layout("Settings","Settings",`<main><section class="hero"><div class="shell"><div class="kicker">SETTINGS</div><h1>Make SpriteSwap<br><span style="color:var(--mint)">yours.</span></h1><p>One place for appearance, chat, profile and safety preferences.</p></div></section><section class="section"><div class="shell"><div class="settings-grid">
    <div class="hero-card"><h2>🎨 Site color</h2><p class="muted">Pick the accent used across SpriteSwap.</p><div class="theme-options">${Object.keys(themes).map(k=>`<button class="theme-choice ${k===current?"selected":""}" data-theme="${k}"><i style="background:${themes[k][2]}"></i>${k[0].toUpperCase()+k.slice(1)}</button>`).join("")}</div><label class="setting-row"><span><b>Custom accent</b><small>Choose any accent color.</small></span><input id="customAccent" type="color" value="${localStorage.getItem("spriteswap-custom-accent")||themes[current][2]}"></label></div>
    <div class="hero-card"><h2>💬 Trading chat</h2><p class="muted">Discord-style trading room with search, offers, safety checks and instant updates between open SpriteSwap tabs.</p><div class="actions"><a class="btn primary" href="trades.html">Open trading chat</a><a class="btn" href="report.html">Safety & reports</a></div><div class="notice">Global chat connects automatically when the Firebase configuration is installed. Otherwise SpriteSwap stays in local mode.</div></div>
    <div class="hero-card"><h2>✨ Experience</h2><label class="setting-row"><span><b>Reduce motion</b><small>Turn off most animated effects.</small></span><input id="reduceMotion" type="checkbox" ${reduced?"checked":""}></label><label class="setting-row"><span><b>Compact cards</b><small>Use tighter spacing for sprite browsing.</small></span><input id="compactMode" type="checkbox" ${compact?"checked":""}></label></div>
    <div class="hero-card"><h2>👤 Account</h2><p class="muted">Manage your local profile, moderation status and community tools.</p><div class="actions"><a class="btn" href="profile.html">Profile</a><a class="btn" href="account.html">Account</a><a class="btn" href="community.html">Community</a></div></div>
    <div class="hero-card"><h2>🧹 Data</h2><p class="muted">Preferences are stored in this browser.</p><button id="resetSettings" class="btn">Reset site settings</button></div>
  </div></div></section></main>`);
  const apply=k=>{
    const t=themes[k]||themes.mint;
    document.documentElement.style.setProperty("--bg",t[0]);document.documentElement.style.setProperty("--bg2",t[0]);document.documentElement.style.setProperty("--panel",t[1]);document.documentElement.style.setProperty("--mint",t[2]);document.documentElement.style.setProperty("--lime",t[3]);localStorage.setItem("spriteswap-theme",k);
  };
  apply(current);
  const custom=localStorage.getItem("spriteswap-custom-accent");
  if(custom){document.documentElement.style.setProperty("--mint",custom);document.documentElement.style.setProperty("--aqua",custom)}
  document.querySelectorAll("[data-theme]").forEach(b=>b.onclick=()=>{localStorage.removeItem("spriteswap-custom-accent");apply(b.dataset.theme);initSettings()});
  document.getElementById("customAccent").oninput=e=>{localStorage.setItem("spriteswap-custom-accent",e.target.value);document.documentElement.style.setProperty("--mint",e.target.value);document.documentElement.style.setProperty("--aqua",e.target.value)};
  document.getElementById("reduceMotion").onchange=e=>{localStorage.setItem("spriteswap-reduced-motion",e.target.checked?"1":"0");document.documentElement.classList.toggle("reduce-motion",e.target.checked)};
  document.getElementById("compactMode").onchange=e=>{localStorage.setItem("spriteswap-compact",e.target.checked?"1":"0");document.documentElement.classList.toggle("compact-mode",e.target.checked)};
  document.getElementById("resetSettings").onclick=()=>{localStorage.removeItem("spriteswap-theme");localStorage.removeItem("spriteswap-custom-accent");localStorage.removeItem("spriteswap-reduced-motion");localStorage.removeItem("spriteswap-compact");initSettings()};
}
function initSimple(){const p=location.pathname.split("/").pop()||"index.html";if(p==="index.html")return initHome();if(p==="index-page.html")return initIndex();if(p==="trades.html")return initTrades();if(p==="settings.html")return initSettings();if(p==="new.html")return pageShell("New","LATEST","New this week","The newest Season 4 sprite families currently tracked by SpriteSwap.",`<div class="grid">${spriteCards(NEW)}</div>`);if(p==="upcoming.html")return initUpcoming();if(p==="leaderboard.html")return initLeaderboard();if(p==="wishlist.html")return initWishlist();
if(p==="profile.html")return initProfile();if(p==="account.html")return initAccount();if(p==="report.html")return pageShell("Report","SAFETY","Report a problem","Tell the SpriteSwap team about a listing, profile or site issue.",`<div class="hero-card"><label>What happened?</label><textarea class="input" style="width:100%;min-height:140px;margin-top:10px" placeholder="Describe the issue…"></textarea><div class="actions"><button class="btn primary" onclick="alert('Thanks — your report form is ready to connect to the backend.')">Submit report</button></div></div>`);if(p==="rules.html")return pageShell("Rules","COMMUNITY","Community rules","Keep SpriteSwap friendly and useful for everyone.",`<div class="list">${["Be respectful.","No scams or fake trades.","Do not spam listings.","Use the report page for problems.","Have fun trading sprites."].map((x,i)=>`<div class="row"><div class="rank">${i+1}</div><div>${x}</div></div>`).join("")}</div>`);if(p==="community.html")return initCommunity();return initIndex()}
function safeStart(){
  try{ initSimple(); }
  catch(err){
    console.error("SpriteSwap startup error:",err);
    const app=document.getElementById("app");
    if(app) app.innerHTML=`<main class="section"><div class="shell"><div class="hero-card"><div class="kicker">SPRITESWAP</div><h1>SpriteSwap is loading…</h1><p class="muted">The page hit a startup error. Refresh to try again.</p><button class="btn primary" onclick="location.reload()">Reload SpriteSwap</button></div></div></main>`;
  }
}
document.addEventListener("DOMContentLoaded",safeStart);
function initModerationPanel(){
  const m=moderationData();
  return `<div class="moderation-panel"><div><b>SpriteSwap Safety Bot</b><span class="muted">Local moderation preview · ${moderationStatus()}</span></div><div class="muted">Reports are reviewed locally in this demo. Three confirmed warnings trigger a 24-hour restriction; repeated violations can trigger a lifetime restriction.</div></div>`;
}
;