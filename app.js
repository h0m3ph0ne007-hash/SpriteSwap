window.SPRITESWAP_DISCORD_INVITE="https://discord.gg/kS5Xf35Vf";

// Current Chapter 7 Season 4 Sprite roster: 25 families.
// Sprite Trading currently indexes 145 variants: 25 Base + 24 each of Gold,
// Cheat Master, Loot Hacker, Bounty Hunter and Trick or Treat.
// Mega Man is the Base-only family in the current 145-variant catalog.
const SPRITE_FAMILIES_LIST=[
 "Jonesy","Adventure","Bush","Sonic","Tails","Shadow","8-Bit","Jackrabbit","Crown",
 "Killswitch","Klombo","Mega Man","Overshield","Pond","X-Ray","Onigiri","Storm Scout",
 "Blinky","Birthday","Crash Bandicoot","Morgana","Spooky Dash","Vampire","The Deer","Dumpster Dive"
];
const SPRITES={
 "Killswitch":"killswitch","8-Bit":"8bit","Adventure":"adventure","Crown":"crown","Jackrabbit":"jackrabbit",
 "Jonesy":"jonesy","Klombo":"klombo","Shadow":"shadow","Sonic":"sonic","Storm Scout":"stormscout","Tails":"tails",
 "Bush":"bush","Mega Man":"mega-man","Overshield":"overshield","Onigiri":"onigiri","X-Ray":"x-ray",
 "Pond":"pond","Crash Bandicoot":"crash-bandicoot","Blinky":"blinky","Birthday":"birthday","Morgana":"morgana",
 "Spooky Dash":"spooky-dash","Vampire":"vampire","The Deer":"the-deer","Dumpster Dive":"dumpster-dive"
};
const SPRITE_NAMES=SPRITE_FAMILIES_LIST.slice();
const NEW_SPRITES=["Spooky Dash","Vampire","The Deer","Dumpster Dive"];
const VARIANTABLE_NEW=NEW_SPRITES.slice();
const SPECIAL_TIERS=["Gold","Cheat Master","Loot Hacker","Bounty Hunter","Trick or Treat"];
const tiers={
 Base:SPRITE_NAMES.slice(),
 Gold:SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Gold "+x),
 "Cheat Master":SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Cheat Master "+x),
 "Loot Hacker":SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Loot Hacker "+x),
 "Bounty Hunter":SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Bounty Hunter "+x),
 "Trick or Treat":SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Trick or Treat "+x)
};
const ALL_SPRITES=Object.values(tiers).flat();
const TOTAL_SPRITES=ALL_SPRITES.length; // 145 indexed variants
const SPRITE_FAMILIES=SPRITE_NAMES.length; // 25 families
const OBTAINABLE_SPRITES=122;
const NEW_THIS_WEEK=[
 {name:"Spooky Dash",type:"NEW",status:"LIVE NOW",image:"https://api.spritetrading.com/sprites/spooky-dash.webp?w=192",note:"New Fortnitemares Sprite. Airborne dash with charges that regenerate over time."},
 {name:"Vampire",type:"NEW",status:"LIVE NOW",image:"https://api.spritetrading.com/sprites/vampire.webp?w=192",note:"New Fortnitemares Sprite. Damaging enemies restores health."},
 {name:"The Deer",type:"NEW",status:"LIVE NOW",image:"https://api.spritetrading.com/sprites/the-deer.webp?w=192",note:"New Fortnitemares Sprite. Melee attacks deal increased damage."},
 {name:"Dumpster Dive",type:"NEW",status:"LIVE NOW",image:"https://api.spritetrading.com/sprites/dumpster-dive.webp?w=192",note:"New Fortnitemares Sprite. Food provides extra healing and can appear from hiding props."}
];
const UPCOMING=[
 {name:"Trick or Treat Jonesy",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-jonesy.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Adventure",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-adventure.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Bush",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-bush.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Sonic",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-sonic.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Tails",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-tails.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Shadow",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-shadow.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat 8-Bit",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-8bit.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Jackrabbit",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-jackrabbit.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Killswitch",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-killswitch.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Klombo",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-klombo.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Overshield",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-overshield.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Pond",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-pond.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat X-Ray",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-x-ray.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Onigiri",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-onigiri.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Storm Scout",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-stormscout.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Blinky",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-blinky.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Birthday",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-birthday.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Crash Bandicoot",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-crash-bandicoot.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Morgana",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-morgana.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Spooky Dash",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-spooky-dash.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Vampire",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-vampire.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat The Deer",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-the-deer.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."},
 {name:"Trick or Treat Dumpster Dive",type:"UPCOMING",image:"https://api.spritetrading.com/sprites/trick-or-treat-dumpster-dive.webp?w=192",note:"Trick or Treat variant — indexed, but not currently obtainable."}
];
const BACKGROUNDS={
 "Midnight":"linear-gradient(135deg,#070b10,#0d1320 55%,#111827)",
 "Cyan Grid":"linear-gradient(135deg,#061014,#071c24 55%,#0b151d)",
 "Violet Grid":"linear-gradient(135deg,#090712,#17102a 55%,#0d1020)",
 "Lime Circuit":"linear-gradient(135deg,#07100b,#102018 55%,#0b1510)",
 "Aurora":"linear-gradient(135deg,#071015,#11102a 45%,#0b201c)",
 "Arcade":"linear-gradient(135deg,#10100a,#17152a 45%,#0c1920)"
};
const QUESTS=[
 {id:"collector6",title:"Collector Level 1",desc:"Collect 6 sprites.",reward:"Violet Grid",type:"collect",goal:6,kind:"evergreen"},
 {id:"wish3",title:"Make a Wish",desc:"Add 3 sprites to your wishlist.",reward:"Cyan Grid",type:"wish",goal:3,kind:"evergreen"},
 {id:"master1",title:"Master Your Craft",desc:"Mark your first Sprite as mastered.",reward:"Lime Circuit",type:"master",goal:1,kind:"evergreen"},
 {id:"trader1",title:"First Swap",desc:"Post your first trade.",reward:"Aurora",type:"trade",goal:1,kind:"evergreen"},
 {id:"collector16",title:"Base Completion",desc:"Collect all 25 Base sprites.",reward:"Arcade",type:"base",goal:25,kind:"evergreen"}
];
const DAILY_QUESTS=[
 {title:"Daily Hunt",desc:"Collect 2 sprites.",reward:"Daily XP",type:"collect",goal:2},
 {title:"Daily Wishlist",desc:"Have 1 sprite on your wishlist.",reward:"Daily XP",type:"wish",goal:1},
 {title:"Daily Trader",desc:"Post 1 trade.",reward:"Daily XP",type:"trade",goal:1},
 {title:"Daily Mastery",desc:"Master 1 sprite.",reward:"Daily XP",type:"master",goal:1},
 {title:"Daily Collector",desc:"Collect 4 sprites.",reward:"Daily XP",type:"collect",goal:4}
];
const WEEKLY_QUESTS=[
 {title:"Weekly Collector",desc:"Collect 8 sprites.",reward:"Weekly XP",type:"collect",goal:8},
 {title:"Weekly Wishlist",desc:"Build a wishlist with 5 sprites.",reward:"Weekly XP",type:"wish",goal:5},
 {title:"Weekly Trader",desc:"Post 3 trades.",reward:"Weekly XP",type:"trade",goal:3},
 {title:"Weekly Master",desc:"Master 3 sprites.",reward:"Weekly XP",type:"master",goal:3},
 {title:"Weekly Completionist",desc:"Collect 12 sprites.",reward:"Weekly XP",type:"collect",goal:12}
];
const MONTHLY_QUESTS=[
 {title:"Monthly Master",desc:"Master 5 sprites this month.",reward:"Monthly XP",type:"master",goal:5},
 {title:"Monthly Collector",desc:"Collect 20 sprites this month.",reward:"Monthly XP",type:"collect",goal:20},
 {title:"Monthly Wishlist",desc:"Build a wishlist with 10 sprites.",reward:"Monthly XP",type:"wish",goal:10},
 {title:"Monthly Trader",desc:"Post 5 trades this month.",reward:"Monthly XP",type:"trade",goal:5}
];
function utcDateKey(d=new Date()){return d.toISOString().slice(0,10)}
function periodIndex(length,period){let n=0;for(let i=0;i<period.length;i++)n=(n*31+period.charCodeAt(i))%100000;return n%length}
function getActiveQuests(){
 const day=utcDateKey();
 const weekDate=new Date(); const dayNum=Math.floor((Date.UTC(weekDate.getUTCFullYear(),weekDate.getUTCMonth(),weekDate.getUTCDate())-Date.UTC(1970,0,1))/86400000);
 const week=Math.floor((dayNum+3)/7);
 const month=`${weekDate.getUTCFullYear()}-${String(weekDate.getUTCMonth()+1).padStart(2,"0")}`;
 const daily=[0,1,2].map((_,i)=>{const idx=(periodIndex(DAILY_QUESTS.length,day)+i)%DAILY_QUESTS.length;return {...DAILY_QUESTS[idx],id:`daily-${day}-${i}`,kind:"daily",period:day}});
 const weekly=[0,1].map((_,i)=>{const idx=(periodIndex(WEEKLY_QUESTS.length,String(week))+i)%WEEKLY_QUESTS.length;return {...WEEKLY_QUESTS[idx],id:`weekly-${week}-${i}`,kind:"weekly",period:String(week)}});
 const monthlyIdx=periodIndex(MONTHLY_QUESTS.length,month);
 const monthly={...MONTHLY_QUESTS[monthlyIdx],id:`monthly-${month}`,kind:"monthly",period:month};
 return [...QUESTS,...daily,...weekly,monthly];
}
function questPeriodText(q){return q.kind==="daily"?"RESETS DAILY":q.kind==="weekly"?"RESETS WEEKLY":q.kind==="monthly"?"RESETS MONTHLY":""}
function readJSON(key,fallback){try{const v=JSON.parse(localStorage.getItem(key)||"");return v??fallback}catch{return fallback}}
let collected=readJSON("ss_collected",[]); if(!Array.isArray(collected))collected=[];
let trades=readJSON("ss_trades",[]); if(!Array.isArray(trades)||trades.some(t=>Array.isArray(t))){trades=[];localStorage.ss_trades="[]";}
let wishlist=readJSON("ss_wishlist",[]); if(!Array.isArray(wishlist))wishlist=[];
let mastered=readJSON("ss_mastered",[]); if(typeof mastered==="string")mastered=mastered?[mastered]:[]; if(!Array.isArray(mastered))mastered=[];
let questClaims=readJSON("ss_quest_claims",[]); if(!Array.isArray(questClaims))questClaims=[];
let currentTier="Base";
function notifications(){return readJSON("ss_notifications",[])}
function browserAlertsEnabled(){return "Notification" in window&&Notification.permission==="granted"}
async function requestBrowserNotifications(){
  if(!("Notification" in window)){toast("This browser does not support notifications.");return}
  const p=await Notification.requestPermission();
  localStorage.ss_browser_notifications=p==="granted"?"1":"0";
  renderNotifications();
  if(p==="granted") pushBrowserNotification("SpriteSwap alerts enabled","You’ll get browser alerts for new SpriteSwap activity.");
  else toast("Browser notifications are off. You can enable them in browser settings.");
}
function pushBrowserNotification(title,text){
  if(!browserAlertsEnabled()) return;
  try{
    if("serviceWorker" in navigator){navigator.serviceWorker.ready.then(reg=>reg.showNotification(title,{body:text,icon:"spriteswap-icon.png",badge:"spriteswap-icon.png",tag:"spriteswap",renotify:true})).catch(()=>new Notification(title,{body:text,icon:"spriteswap-icon.png"}));}
    else new Notification(title,{body:text,icon:"spriteswap-icon.png"});
  }catch{}
}
function addNotification(title,text){const a=notifications();a.unshift({title,text,created:Date.now(),read:false});localStorage.ss_notifications=JSON.stringify(a.slice(0,30));renderNotifications();pushBrowserNotification(title,text)}
function renderNotifications(){const panel=document.getElementById("notificationPanel"),badge=document.getElementById("notificationBadge");if(!panel&&!badge)return;const a=notifications(),unread=a.filter(x=>!x.read).length;if(badge){badge.textContent=unread;badge.style.display=unread?"grid":"none"}if(panel)panel.innerHTML=`<div class="notificationHead"><b>Notifications</b><div class="notificationTools"><button type="button" onclick="event.stopPropagation();markNotificationsRead()">Mark all as read</button><button type="button" class="notifyEnable" onclick="event.stopPropagation();requestBrowserNotifications()">${browserAlertsEnabled()?"Alerts on":"Enable alerts"}</button></div></div>${a.length?a.slice(0,10).map(x=>`<div class="notificationItem ${x.read?"":"unread"}"><b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.text)}</small></div>`).join(""): '<div class="notificationEmpty">You’re all caught up.</div>'}`}
function toggleNotifications(){const p=document.getElementById("notificationPanel");if(!p)return;p.classList.toggle("show");renderNotifications()}
function markNotificationsRead(){const a=notifications().map(x=>({...x,read:true}));localStorage.ss_notifications=JSON.stringify(a);renderNotifications();toast("All notifications marked as read.")}
function save(){localStorage.ss_collected=JSON.stringify(collected);localStorage.ss_trades=JSON.stringify(trades);localStorage.ss_wishlist=JSON.stringify(wishlist);localStorage.ss_mastered=JSON.stringify(mastered);localStorage.ss_quest_claims=JSON.stringify(questClaims)}
function toast(msg){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2600)}
function escapeHtml(s){return String(s??"").replace(/[&<>'"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[m]))}
function spriteSlug(name){
 const prefixes=[
  ["Trick or Treat ","trick-or-treat-"],
  ["Bounty Hunter ","bounty-hunter-"],
  ["Loot Hacker ","loot-hacker-"],
  ["Cheat Master ","cheatmaster-"],
  ["Gold ","gold-"]
 ];
 let base=name, prefix="";
 for(const pair of prefixes){if(name.startsWith(pair[0])){base=name.slice(pair[0].length);prefix=pair[1];break}}
 const slug=SPRITES[base]||base.toLowerCase().replaceAll(" ","-");
 return prefix+slug;
}
const SPRITE_VERSIONS={};
const SPRITE_IMAGE_OVERRIDES={
  "x-ray":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerB_L.webp",
  "gold-x-ray":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerB_Gold_L.webp",
  "cheatmaster-x-ray":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerB_Cheatmaster_L.webp",
  "onigiri":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerC_L.webp",
  "gold-onigiri":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerC_Gold_L.webp",
  "cheatmaster-onigiri":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerC_Cheatmaster_L.webp",
  "mega-man":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ImprovedSlide_L.webp",
  "overshield":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Overshield_L.webp",
  "gold-overshield":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Overshield_Gold_L.webp",
  "cheatmaster-overshield":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Overshield_Cheatmaster_L.webp"
};
function spriteIcon(name){
 const slug=spriteSlug(name);
 const mapped=SPRITE_IMAGE_OVERRIDES[slug];
 if(mapped)return mapped;
 return `https://api.spritetrading.com/sprites/${slug}.webp?w=192`;
}
function editProfile(){showModal(`<button class="close" onclick="closeModal()">×</button><label>PROFILE</label><h2>Edit profile</h2><div class="field"><label>Display name</label><input id="newName" value="${escapeHtml(localStorage.ss_name||"Guest Trader")}"></div><button class="btn primary" onclick="saveName()">Save</button>`)}
function saveName(){const n=document.getElementById("newName")?.value.trim()||"Guest Trader";localStorage.ss_name=n;setUser();renderOnline();closeModal();toast("Profile name updated.")}
function setUser(){const n=localStorage.ss_name||"Guest Trader";document.querySelectorAll("#name").forEach(x=>x.textContent=n);const auth=document.getElementById("auth");if(auth)auth.textContent=n==="Guest Trader"?"Sign in":n;const st=document.getElementById("statTrades");if(st)st.textContent=trades.filter(t=>t.user===n).length;const ph=localStorage.ss_avatar;document.querySelectorAll("#avatar,#profileAvatar,#profileBigAvatar,#accountAvatar").forEach(av=>{av.innerHTML=ph?`<img class="profilePhoto" src="${ph}" alt="Profile picture">`:escapeHtml(n[0]?.toUpperCase()||"S")})}
function renderLeaderboard(){const el=document.getElementById("leaders");if(!el)return;const me=localStorage.ss_name||"Guest Trader";const rows=trades.map(t=>({n:t.user,tr:trades.filter(x=>x.user===t.user).length,p:trades.filter(x=>x.user===t.user).length*20})).filter((x,i,a)=>a.findIndex(y=>y.n===x.n)===i);if(me!=="Guest Trader"&&!rows.some(x=>x.n===me))rows.push({n:me,tr:trades.filter(t=>t.user===me).length,p:collected.length*200});rows.sort((a,b)=>b.p-a.p);el.innerHTML=rows.length?rows.map((x,i)=>`<div class="leader leaderRow"><span class="rank">${i+1}</span><b>${escapeHtml(x.n)}${x.n===me&&me!=="Guest Trader"?'<span class="youBadge">YOU</span>':''}</b><span>${x.tr} trades</span><b>${x.p.toLocaleString()} pts</b></div>`).join(""):'<div class="empty">No community rankings yet. Post a trade to appear here.</div>'}
function renderUpdates(){const week=document.getElementById("newThisWeekGrid");if(week)week.innerHTML=NEW_THIS_WEEK.map(updateCard).join("");const upcoming=document.getElementById("upcomingGrid");if(upcoming)upcoming.innerHTML=UPCOMING.map(updateCard).join("")}
function updateCard(x){return `<article class="updateCard"><div class="updateArt" style="background-image:url('${x.image}');background-position:${x.pos||"center"};"></div><div class="updateBody"><div class="updateMeta"><span>${x.type}</span><b>${x.status||"UPCOMING"}</b></div><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.note)}</p><a class="btn" href="index-page.html">View index</a></div></article>`}
function init(){const auth=document.getElementById("auth");if(auth&&!auth.getAttribute("href"))auth.onclick=login;const discord=document.getElementById("discordLink");if(discord)discord.href=window.SPRITESWAP_DISCORD_INVITE;const filterBox=document.getElementById("filters");if(filterBox){filterBox.innerHTML=["all","Base","Gold","Cheat Master"].map(x=>`<button class="${x==="all"?"active":""}" data-f="${x}">${x==="all"?"All":x}</button>`).join("");filterBox.querySelectorAll("button").forEach(b=>b.onclick=()=>{filterBox.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTrades(b.dataset.f,document.getElementById("tradeSearch")?.value||"")})}
const tabs=document.getElementById("tabs");if(tabs){tabs.innerHTML=Object.keys(tiers).map((x,i)=>`<button class="${i===0?"active":""}" data-t="${x}">${x} · ${tiers[x].length}</button>`).join("");tabs.querySelectorAll("button").forEach(b=>b.onclick=()=>{tabs.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentTier=b.dataset.t;renderSprites()})}
document.querySelectorAll("nav a").forEach(a=>{try{const href=a.getAttribute("href"),path=location.pathname.split("/").pop()||"index.html";if(href===path||(path===""&&href==="index.html"))a.classList.add("active")}catch{}});
if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js").catch(()=>{})}
renderNotifications();
document.getElementById("tradeSearch")?.addEventListener("input",e=>renderTrades(document.querySelector("#filters .active")?.dataset.f||"all",e.target.value));document.getElementById("spriteSearch")?.addEventListener("input",renderIndex);document.getElementById("statusFilter")?.addEventListener("change",renderIndex);document.getElementById("variantFilter")?.addEventListener("change",renderIndex);mini();progress();renderSprites();renderTrades();renderIndex();renderLeaderboard();renderUpdates();renderMastered();renderWishlist();renderWishlistBoard();renderQuests();setUser();applyBackground();renderOnline();}
document.addEventListener("DOMContentLoaded",init);
/* SpriteSwap V14 additions: offers, details, challenges, badges, status polish */
let tradeOffersV14=readJSON('ss_trade_offers_v14',[]); if(!Array.isArray(tradeOffersV14)) tradeOffersV14=[];
function saveOffersV14(){localStorage.ss_trade_offers_v14=JSON.stringify(tradeOffersV14)}
function currentUserV14(){return localStorage.ss_name||'Guest Trader'}
function offerPickerV14(field){return spritePicker([],field)}
function openOfferBuilderV14(i){const t=trades[i];if(!t)return;showModal(`<button class="close" onclick="closeModal()">×</button><label>TRADE OFFER</label><h2>Offer ${escapeHtml(t.user)}</h2><p class="sub">They want: <b>${(t.want||[]).map(escapeHtml).join(', ')}</b></p><div class="field"><label>YOUR OFFER</label>${offerPickerV14('offerNow')}<input id="offerNowSelected" readonly placeholder="Select sprites"><button class="btn primary" onclick="sendOfferV14(${i})">Send offer</button></div>`)}
function sendOfferV14(i){const t=trades[i],offer=(document.getElementById('offerNowSelected')?.value||'').split(', ').filter(Boolean),from=currentUserV14();if(!offer.length)return toast('Pick at least one Sprite to offer.');if(from===t.user)return toast("You can't offer on your own trade.");tradeOffersV14.unshift({id:Date.now().toString(36),tradeIndex:i,from,to:t.user,offer,want:t.want||[],status:'pending',created:Date.now()});saveOffersV14();addNotification('Trade offer sent',`Your offer was sent to ${t.user}.`);closeModal();toast('Trade offer sent!')}
function respondOfferV14(id,status){const o=tradeOffersV14.find(x=>x.id===id);if(!o)return;o.status=status;saveOffersV14();addNotification(status==='accepted'?'Trade offer accepted':'Trade offer declined',`The offer from ${o.from} was ${status}.`);showTradeOffersV14()}
function showTradeOffersV14(){const me=currentUserV14(),incoming=tradeOffersV14.filter(o=>o.to===me&&o.status==='pending'),outgoing=tradeOffersV14.filter(o=>o.from===me&&o.status==='pending');showModal(`<button class="close" onclick="closeModal()">×</button><label>TRADE OFFERS</label><h2>Offers inbox</h2><div class="offerList"><h3>Incoming (${incoming.length})</h3>${incoming.map(o=>`<div class="offerRow"><div><b>${escapeHtml(o.from)}</b><small>offers ${o.offer.map(escapeHtml).join(', ')} for ${o.want.map(escapeHtml).join(', ')}</small></div><div class="offerButtons"><button class="btn primary" onclick="respondOfferV14('${o.id}','accepted')">Accept</button><button class="btn" onclick="respondOfferV14('${o.id}','declined')">Decline</button></div></div>`).join('')||'<div class="emptyPanel">No pending offers.</div>'}<h3>Sent (${outgoing.length})</h3>${outgoing.map(o=>`<div class="offerRow"><div><b>${escapeHtml(o.to)}</b><small>You offered ${o.offer.map(escapeHtml).join(', ')}</small></div><span class="chip">Pending</span></div>`).join('')||'<div class="emptyPanel">No pending sent offers.</div>'}</div>`) }
function viewTrade(i){const t=trades[i];showModal(`<button class="close" onclick="closeModal()">×</button><label>TRADE POST</label><h2>${escapeHtml(t.user)}</h2><div class="chips"><span class="chip">${escapeHtml(t.tier||'Base')}</span></div><div class="field"><label>OFFERING</label><div class="tradeChips">${(t.offer||[]).map(x=>`<span class="chip">${escapeHtml(x)}</span>`).join('')}</div></div><div class="field"><label>LOOKING FOR</label><div class="tradeChips">${(t.want||[]).map(x=>`<span class="chip">${escapeHtml(x)}</span>`).join('')}</div></div><p class="sub">${escapeHtml(t.note||'Open to a fair trade')}</p>${t.user===currentUserV14()?'<div class="notice">This is your trade post.</div>':'<button class="btn primary" onclick="openOfferBuilderV14('+i+')">Send trade offer</button>'}`)}
function openSpriteDetailV14(name){const base=name.replace(/^Gold |^Cheat Master /,'');const variants=[base,...(VARIANTABLE_NEW.includes(base)||!NEW_SPRITES.includes(base)?['Gold '+base,'Cheat Master '+base]:[])];showModal(`<button class="close" onclick="closeModal()">×</button><label>SPRITE DETAILS</label><div class="detailHero">${imgTag(base,'detailArt')}<div><h2>${escapeHtml(base)}</h2><p class="sub">${variants.filter(x=>collected.includes(x)).length} / ${variants.length} variants collected</p><button class="btn primary" onclick="toggleWishlist('${base}',event);openSpriteDetailV14('${base.replace(/'/g,"\\'")}')">${wishlist.includes(base)?'Remove from wishlist':'Add to wishlist'}</button></div></div><div class="detailVariants">${variants.map(v=>`<div class="detailVariant">${imgTag(v)}<b>${escapeHtml(v)}</b><small>${collected.includes(v)?'Collected':'Missing'} · ${mastered.includes(v)?'Mastered':'Not mastered'}</small></div>`).join('')}</div>`)}
function renderBadgesV14(){const el=document.getElementById('badgesGrid');if(!el)return;const b=[];if(collected.length>=1)b.push(['First Find','Collected your first Sprite.']);if(trades.some(t=>t.user===currentUserV14()))b.push(['First Trade','Posted your first trade.']);if(mastered.length>=3)b.push(['Triple Master','Mastered 3 variants.']);if(wishlist.length>=5)b.push(['Wish Collector','Added 5 Sprites to your wishlist.']);if(collected.length>=TOTAL_SPRITES)b.push(['Full Set',`Collected all ${TOTAL_SPRITES} current variants.`]);el.innerHTML=b.map(x=>`<div class="badgeCard"><b>★ ${escapeHtml(x[0])}</b><small>${escapeHtml(x[1])}</small></div>`).join('')||'<div class="emptyPanel">Your first badge is waiting. Start collecting.</div>'}
function renderChallengeV14(){const el=document.getElementById('dailyChallenge');if(!el)return;const day=Math.floor(Date.now()/86400000),choices=[['Daily Hunt','Collect 2 Sprites.',2,collected.length],['Wishlist Pick','Have 1 Sprite on your wishlist.',1,wishlist.length],['Trade Ready','Post 1 trade.',1,trades.filter(t=>t.user===currentUserV14()).length]],q=choices[day%choices.length],p=Math.min(q[2],q[3]);el.innerHTML=`<div class="challengeCard"><div><label>DAILY CHALLENGE</label><h3>${q[0]}</h3><p>${q[1]}</p></div><div class="challengeProgress"><b>${p} / ${q[2]}</b><div class="questBar"><i style="width:${p/q[2]*100}%"></i></div></div></div>`}
function addV14UI(){const path=location.pathname.split('/').pop()||'index.html';if(path==='trades.html'){const hero=document.querySelector('.heroSmall');if(hero&&!document.getElementById('offersBtnV14')){const b=document.createElement('button');b.id='offersBtnV14';b.className='btn';b.textContent='📨 Trade offers';b.onclick=showTradeOffersV14;hero.appendChild(b)}}if(path==='profile.html'){const first=document.querySelector('.profileHeroPage');if(first&&!document.getElementById('dailyChallenge')){const sec=document.createElement('section');sec.className='section';sec.innerHTML='<div id="dailyChallenge"></div>';first.parentNode.insertBefore(sec,first.nextSibling)}const qs=document.querySelector('.section');if(qs&&!document.getElementById('badgesGrid')){const sec=document.createElement('section');sec.className='section';sec.innerHTML='<div class="sectionTitle"><div><label>BADGES</label><h2>Your collector badges</h2><p class="sub">Small milestones for collecting, trading and mastering.</p></div></div><div id="badgesGrid" class="badgesGrid"></div>';first.parentNode.insertBefore(sec,qs)}}renderBadgesV14();renderChallengeV14()}
const oldRenderSpritesV14=renderSprites;renderSprites=function(t=currentTier,q=''){oldRenderSpritesV14(t,q);document.querySelectorAll('#spriteGrid .sprite').forEach((card)=>{const name=card.querySelector('b')?.textContent;if(name)card.onclick=()=>openSpriteDetailV14(name)})};
const oldRenderIndexV14=renderIndex;renderIndex=function(){oldRenderIndexV14();document.querySelectorAll('#indexGrid .sprite').forEach(card=>{const name=card.querySelector('b')?.textContent;if(name)card.onclick=()=>openSpriteDetailV14(name)})};
const oldCollectV14=collectSprite;collectSprite=function(n){oldCollectV14(n);renderBadgesV14();renderChallengeV14()};
const oldToggleWishV14=toggleWishlist;toggleWishlist=function(n,e){oldToggleWishV14(n,e);renderBadgesV14();renderChallengeV14()};
const oldPostTradeV14=publishTrade;publishTrade=function(){oldPostTradeV14();renderBadgesV14();renderChallengeV14()};
document.addEventListener('DOMContentLoaded',()=>setTimeout(addV14UI,30));