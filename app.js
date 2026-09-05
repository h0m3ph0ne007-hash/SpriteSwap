window.SPRITESWAP_DISCORD_INVITE="https://discord.gg/kS5Xf35Vf";
const SPRITES={"Killswitch":"killswitch","8-Bit":"8bit","Adventure":"adventure","Crown":"crown","Jackrabbit":"jackrabbit","Jonesy":"jonesy","Klombo":"klombo","Shadow":"shadow","Sonic":"sonic","Storm Scout":"stormscout","Tails":"tails","Bush":"bush","Mega Man":"mega-man","Overshield":"overshield","Onigiri":"onigiri","X-Ray":"x-ray"};
const SPRITE_NAMES=Object.keys(SPRITES);
const NEW_SPRITES=["Mega Man","Overshield","Onigiri","X-Ray"];
const VARIANTABLE_NEW=["Overshield","Onigiri","X-Ray"];
const tiers={
 Base:SPRITE_NAMES,
 Gold:SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Gold "+x),
 "Cheat Master":SPRITE_NAMES.filter(x=>x!=="Mega Man").map(x=>"Cheat Master "+x),
 "Loot Master":["Loot Master Crown"]
};
const ALL_SPRITES=Object.values(tiers).flat();
const TOTAL_SPRITES=ALL_SPRITES.length; // 47 live variants in the current SpriteSwap catalog
const SPRITE_FAMILIES=SPRITE_NAMES.length;

const SPRITE_LOCATIONS={
  "Killswitch":"Night matches — found on the island after dark.",
  "8-Bit":"High and mountainous areas; also from Cheat Codes and Sprite-capable chests.",
  "Adventure":"Starter selection (Base); also found around high and mountainous areas.",
  "Crown":"High and mountainous areas; Mythic — also tied to Victory Royale rewards.",
  "Jackrabbit":"High and mountainous areas; Legendary — can also come from boss encounters.",
  "Jonesy":"Starter selection (Base); also found around high and mountainous areas.",
  "Klombo":"High and mountainous areas; Mythic Sprite found through the seasonal Sprite pool.",
  "Shadow":"High and mountainous areas; also from Cheat Codes and Sprite-capable chests.",
  "Sonic":"High and mountainous areas; also from Cheat Codes and Sprite-capable chests.",
  "Storm Scout":"High and mountainous areas; also from Cheat Codes and Sprite-capable chests.",
  "Tails":"High and mountainous areas; also from Cheat Codes and Sprite-capable chests.",
  "Bush":"Starter selection (Base); also available through the seasonal Sprite pool.",
  "Mega Man":"High and mountainous areas; also from Cheat Codes and Sprite-capable chests.",
  "Overshield":"High and mountainous areas; also from chests and Cheat Codes.",
  "Onigiri":"Found in chests and through Cheat Codes; Rare Cheat Codes give the best odds.",
  "X-Ray":"Found through the seasonal Cheat Code / Sprite chest system; Legendary rarity means rarer drops.",
  "Loot Master Crown":"Unlocked by mastering the Gold Crown Sprite — win a match with Gold Crown equipped. Fortnite.GG lists this variant as Loot Hacker Crown."
};
function spriteLocation(name){return SPRITE_LOCATIONS[name.replace(/^Gold |^Cheat Master |^Loot Master /,'')]||"Found on the Chapter 7 Season 4 Override island through the Sprite pool."}

const NEW_THIS_WEEK=[
 {name:"X-Ray",type:"NEW",status:"LIVE NOW",image:"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerB_L.webp",note:"Design-A-Sprite winner by Avila215. Periodically marks nearby enemies."},
 {name:"Onigiri",type:"NEW",status:"LIVE NOW",image:"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_WinnerC_L.webp",note:"Design-A-Sprite winner by Enorull. Applies Overdrive after eating or drinking a consumable."},
 {name:"Mega Man",type:"NEW",status:"LIVE NOW",image:"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_ImprovedSlide_L.webp",note:"New Sprite. Reduces friction while sliding or swimming so you can slide farther as you level it up."},
 {name:"Overshield",type:"NEW",status:"LIVE NOW",image:"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Overshield_L.webp",note:"New Sprite. Grants Overshield, with the amount scaling with Sprite Level."}
];
const UNRELEASED_LOOT_MASTERS=[
  ["Jonesy","loot-master-jonesy"],["Adventure","loot-master-adventure"],["Bush","loot-master-bush"],["Sonic","loot-master-sonic"],["Tails","loot-master-tails"],["Shadow","loot-master-shadow"],["8-Bit","loot-master-8bit"],["Jackrabbit","loot-master-jackrabbit"],["Killswitch","loot-master-killswitch"],["Klombo","loot-master-klombo"],["Overshield","loot-master-overshield"],["X-Ray","loot-master-x-ray"],["Onigiri","loot-master-onigiri"],["Storm Scout","loot-master-stormscout"]
].map(([name,slug])=>({name:`Loot Master ${name}`,type:"UNRELEASED",status:"NOT LIVE",image:`https://api.spritetrading.com/sprites/${slug}.webp?w=192`,note:`Loot Master ${name} variant is listed in the current unreleased catalog. It is not collectible or tradeable yet.`}));
const UPCOMING=[
 {name:"Dumpster Dive",type:"UPCOMING",image:"https://pbs.twimg.com/media/HPH1muLWIAAbvWh.jpg",pos:"78% 73%",note:"Community-designed Sprite announced for a later mid-season update."},
 {name:"Honey",type:"UPCOMING",image:"https://pbs.twimg.com/media/HPH1muLWIAAbvWh.jpg",pos:"79% 52%",note:"Community-designed Sprite announced for a later mid-season update."},
 {name:"Pond",type:"UPCOMING",image:"https://pbs.twimg.com/media/HPH1muLWIAAbvWh.jpg",pos:"42% 22%",note:"Community-designed Sprite announced for a later mid-season update."}
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
 {id:"collector16",title:"Base Completion",desc:"Collect all 16 Base sprites.",reward:"Arcade",type:"base",goal:16,kind:"evergreen"}
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
 {title:"Monthly Master",desc:"Master 8 sprites this month.",reward:"Monthly Master Badge",type:"master",goal:8},
 {title:"Monthly Completionist",desc:"Collect 20 sprites this month.",reward:"Monthly XP",type:"collect",goal:20},
 {title:"Monthly Trader",desc:"Post 8 trades this month.",reward:"Monthly Trader Badge",type:"trade",goal:8},
 {title:"Monthly Wishlist",desc:"Build a wishlist with 12 sprites this month.",reward:"Monthly XP",type:"wish",goal:12},
 {title:"Monthly Base Hunter",desc:"Collect 12 Base sprites this month.",reward:"Monthly XP",type:"base",goal:12}
];
function localDateKey(d=new Date()){const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0");return `${y}-${m}-${day}`}
function periodIndex(length,period){let n=0;for(let i=0;i<period.length;i++)n=(n*31+period.charCodeAt(i))%100000;return n%length}
function periodKeys(){
 const now=new Date(),day=localDateKey(now);
 const start=new Date(now.getFullYear(),0,1);
 const dayNum=Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate())-start)/86400000);
 const week=Math.floor((dayNum+start.getDay())/7);
 const month=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
 return {day,week:String(week),month};
}
function getActiveQuests(){
 const {day,week,month}=periodKeys();
 const daily=[0,1,2].map((_,i)=>{const idx=(periodIndex(DAILY_QUESTS.length,day)+i)%DAILY_QUESTS.length;return {...DAILY_QUESTS[idx],id:`daily-${day}-${i}`,kind:"daily",period:day}});
 const weekly=[0,1,2].map((_,i)=>{const idx=(periodIndex(WEEKLY_QUESTS.length,week)+i)%WEEKLY_QUESTS.length;return {...WEEKLY_QUESTS[idx],id:`weekly-${week}-${i}`,kind:"weekly",period:week}});
 const monthly=[0,1,2].map((_,i)=>{const idx=(periodIndex(MONTHLY_QUESTS.length,month)+i)%MONTHLY_QUESTS.length;return {...MONTHLY_QUESTS[idx],id:`monthly-${month}-${i}`,kind:"monthly",period:month}});
 return [...QUESTS,...daily,...weekly,...monthly];
}
function questPeriodText(q){return q.kind==="daily"?"RESETS EVERY DAY":q.kind==="weekly"?"RESETS EVERY WEEK":q.kind==="monthly"?"RESETS EVERY MONTH":""}
function readJSON(key,fallback){try{const v=JSON.parse(localStorage.getItem(key)||"");return v??fallback}catch{return fallback}}
let collected=readJSON("ss_collected",[]); if(!Array.isArray(collected))collected=[];
let trades=readJSON("ss_trades",[]); if(!Array.isArray(trades)||trades.some(t=>Array.isArray(t))){trades=[];localStorage.ss_trades="[]";}
let wishlist=readJSON("ss_wishlist",[]); if(!Array.isArray(wishlist))wishlist=[];
let mastered=readJSON("ss_mastered",[]); if(typeof mastered==="string")mastered=mastered?[mastered]:[]; if(!Array.isArray(mastered))mastered=[];
let questClaims=readJSON("ss_quest_claims",[]); if(!Array.isArray(questClaims))questClaims=[];
let questBaselines=readJSON("ss_quest_baselines_v2",{}); if(!questBaselines||typeof questBaselines!=="object")questBaselines={};
let currentTier="Base";
// Notification center startup/UX fixes
(function(){
  const boot=()=>{
    const badge=document.getElementById("notificationBadge");
    if(badge){badge.classList.remove("hasUnread");badge.style.display="";badge.textContent="0";}
    renderNotifications();
  };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true}); else boot();
  document.addEventListener("click",e=>{
    const wrap=document.querySelector(".notifyWrap"), panel=document.getElementById("notificationPanel");
    if(panel?.classList.contains("show") && wrap && !wrap.contains(e.target)) panel.classList.remove("show");
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape") document.getElementById("notificationPanel")?.classList.remove("show")});
})();
function notifications(){
  const raw=readJSON("ss_notifications",[]);
  return Array.isArray(raw)?raw.map(x=>({title:String(x?.title||"SpriteSwap"),text:String(x?.text||""),created:Number(x?.created||Date.now()),read:!!x?.read})):[];
}
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
function renderNotifications(){const panel=document.getElementById("notificationPanel"),badge=document.getElementById("notificationBadge");if(!panel&&!badge)return;const a=notifications(),unread=a.filter(x=>!x.read).length;if(badge){badge.textContent=unread;badge.classList.toggle("hasUnread",unread>0);badge.style.display="";badge.setAttribute("aria-label",`${unread} unread notification${unread===1?"":"s"}`)}if(panel)panel.innerHTML=`<div class="notificationHead"><b>Notifications</b><div class="notificationTools"><button type="button" onclick="event.stopPropagation();markNotificationsRead()">Mark all as read</button><button type="button" class="notifyEnable" onclick="event.stopPropagation();requestBrowserNotifications()">${browserAlertsEnabled()?"Alerts on":"Enable alerts"}</button></div></div>${a.length?a.slice(0,10).map(x=>`<div class="notificationItem ${x.read?"":"unread"}"><b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.text)}</small></div>`).join(""): '<div class="notificationEmpty">You’re all caught up.</div>'}`}
function toggleNotifications(){const p=document.getElementById("notificationPanel");if(!p)return;p.classList.toggle("show");renderNotifications()}
function markNotificationsRead(){const a=notifications().map(x=>({...x,read:true}));localStorage.ss_notifications=JSON.stringify(a);renderNotifications();toast("All notifications marked as read.")}
function save(){localStorage.ss_collected=JSON.stringify(collected);localStorage.ss_trades=JSON.stringify(trades);localStorage.ss_wishlist=JSON.stringify(wishlist);localStorage.ss_mastered=JSON.stringify(mastered);localStorage.ss_quest_claims=JSON.stringify(questClaims);localStorage.ss_quest_baselines_v2=JSON.stringify(questBaselines)}
function toast(msg){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2600)}
function escapeHtml(s){return String(s??"").replace(/[&<>'"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[m]))}
function spriteSlug(name){const isGold=name.startsWith("Gold "),isCheat=name.startsWith("Cheat Master "),isLootMaster=name.startsWith("Loot Master ");const base=name.replace(/^Gold |^Cheat Master |^Loot Master /,"");const slug=SPRITES[base]||base.toLowerCase().replaceAll(" ","");return isGold?`gold-${slug}`:isCheat?`cheatmaster-${slug}`:isLootMaster?`loot-master-${slug}`:slug}
const SPRITE_VERSIONS={
  "killswitch":"jyamt3kpsuy","gold-killswitch":"l3imt3kpsuu","cheatmaster-killswitch":"llomt3kpsuu",
  "8bit":"n46mt3kpt0a","gold-8bit":"mbgmt3kpt0e","cheatmaster-8bit":"pp2mt3kpt0i",
  "adventure":"nqgmt3kpswm","gold-adventure":"nk6mt3kpswm","cheatmaster-adventure":"ntgmt3kpswm",
  "crown":"mm4mt3kpt0a","gold-crown":"p1gmt3kpt0a","cheatmaster-crown":"pmcmt3kpt16",
  "jackrabbit":"kkimt3kpsqq","gold-jackrabbit":"knumt3kpsqq","cheatmaster-jackrabbit":"pqimt3kpsqq",
  "jonesy":"jwcmt3kpswm","gold-jonesy":"k3imt3kpt0a","cheatmaster-jonesy":"kbomt3kpsyi",
  "klombo":"pbmmt3kpswm","gold-klombo":"m6amt3kpsyi","cheatmaster-klombo":"qzimt3kpsyi",
  "shadow":"m2amt3kpsqq","gold-shadow":"l7amt3kpsuu","cheatmaster-shadow":"p3gmt3kpsr2",
  "sonic":"mdymt3kpsyi","gold-sonic":"kaumt3kpsyi","cheatmaster-sonic":"qfcmt3kpt0a",
  "stormscout":"n9cmt3kpt1u","gold-stormscout":"ngsmt3kpt1y","cheatmaster-stormscout":"pdimt3kpt1q",
  "tails":"o5ymt3kpsta","gold-tails":"nvymt3kpsuu","cheatmaster-tails":"rkgmt3kpsta",
  "bush":"lewmt3kpsta","gold-bush":"luqmt3kpsta","cheatmaster-bush":"nn4mt3kpsuu"
};
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
  "cheatmaster-overshield":"https://fortnite.gg/img/x/sprites/icons/T_Icon_BR_Creature_Sprite_Overshield_Cheatmaster_L.webp",
  "loot-master-crown":"https://dillyapp.gg/_next/image?dpl=dpl_C4LQUkZPT55ZQvUGejQXZ2JPq4WS&q=90&url=%2Fsprites%2Fcrown-loothacker.webp&w=512"
};
function spriteIcon(name){const slug=spriteSlug(name),v=SPRITE_VERSIONS[slug];return SPRITE_IMAGE_OVERRIDES[slug]||`https://api.spritetrading.com/sprites/${slug}.webp${v?`?v=${v}&w=192`:`?w=192`}`}
function imgTag(name,cls=""){return `<img class="${cls}" src="${spriteIcon(name)}" alt="${escapeHtml(name)}" loading="lazy" onerror="this.onerror=null;this.classList.add('spriteFallback');this.removeAttribute('src')">`}
function mini(){const el=document.getElementById("mini");if(el)el.innerHTML=SPRITE_NAMES.slice(0,5).map(n=>`<div>${imgTag(n)}</div>`).join("")}
function progress(){const n=collected.length;document.querySelectorAll("[data-progress]").forEach(x=>x.textContent=`${n} / ${TOTAL_SPRITES}`);const bar=document.getElementById("bar");if(bar)bar.style.width=Math.min(100,n/TOTAL_SPRITES*100)+"%";const ab=document.getElementById("accountBar");if(ab)ab.style.width=Math.min(100,n/TOTAL_SPRITES*100)+"%";const ap=document.getElementById("accountProgress");if(ap)ap.textContent=`${n} / ${TOTAL_SPRITES}`;const pc=document.getElementById("profileCount");if(pc)pc.textContent=`${n} / ${TOTAL_SPRITES}`;const sc=document.getElementById("statCollection");if(sc)sc.textContent=`${n} / ${TOTAL_SPRITES}`}
function isWish(n){return wishlist.includes(n)}
function toggleWishlist(n,e){if(e)e.stopPropagation();if(isWish(n)){wishlist=wishlist.filter(x=>x!==n);toast(`${n} removed from wishlist.`)}else{wishlist=[...wishlist,n];addNotification("Wishlist updated",`${n} was added to your wishlist.`);toast(`${n} added to wishlist.`)}save();renderIndex();renderWishlist();renderQuests()}
function masterPicker(){return `<div class="masterPicker">${ALL_SPRITES.map(n=>`<button type="button" class="masterPick ${mastered.includes(n)?"selected":""}" onclick="toggleMastered('${n.replace(/'/g,"\\'")}')">${imgTag(n)}<span>${mastered.includes(n)?"✓ Mastered":"Mark mastered"}</span><b>${escapeHtml(n)}</b></button>`).join("")}</div>`}
function selectMasteredSprite(){showModal(`<button class="close" onclick="closeModal()">×</button><label>MASTERED SPRITES</label><h2>What have you mastered?</h2><p class="sub">You can master as many Sprites as you want. Pick your featured mastered Sprite below.</p>${masterPicker()}<div class="field"><label>FEATURED MASTERED SPRITE</label><select id="featuredMaster">${ALL_SPRITES.map(n=>`<option ${localStorage.ss_featured_master===n?"selected":""} value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join("")}<option value="">None</option></select></div><button class="btn primary" onclick="saveMasterSetup()">Save mastery</button>`)}
function toggleMastered(n){mastered=mastered.includes(n)?mastered.filter(x=>x!==n):[...mastered,n];save();renderMastered();renderIndex();renderQuests()}
function saveMasterSetup(){const f=document.getElementById("featuredMaster")?.value||"";if(f&&!mastered.includes(f))mastered=[...mastered,f];localStorage.ss_featured_master=f;save();if(f)addNotification("Mastered Sprite updated",`${f} is now your featured mastered Sprite.`);closeModal();renderMastered();renderQuests();toast("Mastery saved!")}
function renderMastered(){const feature=localStorage.ss_featured_master||mastered[0]||"";document.querySelectorAll("[data-mastered-name]").forEach(x=>x.textContent=feature||"None selected");document.querySelectorAll("[data-mastered-art]").forEach(x=>x.innerHTML=feature?imgTag(feature):"<span>?</span>");document.querySelectorAll("[data-mastered-count]").forEach(x=>x.textContent=mastered.length);const g=document.getElementById("masteredGrid");if(g)g.innerHTML=mastered.map(n=>`<div class="masterMini">${imgTag(n)}<b>${escapeHtml(n)}</b><small>Mastered</small></div>`).join("")||'<div class="emptyPanel">No mastered Sprites yet. Choose one above.</div>';renderNotifications()}
function renderSprites(t=currentTier,q=""){const el=document.getElementById("spriteGrid");if(!el)return;const query=q.toLowerCase();const list=tiers[t].filter(n=>!query||n.toLowerCase().includes(query));el.innerHTML=list.map(n=>`<div class="sprite ${collected.includes(n)?"collected":""}" onclick="collectSprite('${n.replace(/'/g,"\\'")}")"><div class="art">${imgTag(n)}</div><b>${escapeHtml(n)}</b><small>${collected.includes(n)?"Collected":"Not collected"} · ${mastered.includes(n)?"Mastered":"Not mastered"}</small><div class="spriteActions"><button class="miniAction ${isWish(n)?"active":""}" onclick="toggleWishlist('${n}',event)">♡ ${isWish(n)?"Wanted":"Wishlist"}</button><button class="miniAction ${mastered.includes(n)?"active master":""}" onclick="toggleMastered('${n}');event.stopPropagation()">★ ${mastered.includes(n)?"Mastered":"Master"}</button></div></div>`).join("")||'<div class="empty">No sprites match your search.</div>'}
function collectSprite(n){const adding=!collected.includes(n);collected=adding?[...collected,n]:collected.filter(x=>x!==n);save();progress();renderSprites(currentTier);renderIndex();renderLeaderboard();renderQuests();if(adding){addNotification("Sprite collected",`${n} was added to your collection.`)}toast(adding?`Added ${n} to your collection.`:`Removed ${n} from your collection.`)}
function spritePicker(selected=[],field="offer"){return `<div class="picker" data-picker="${field}">${ALL_SPRITES.map(n=>`<button type="button" class="pickSprite ${selected.includes(n)?"selected":""}" data-sprite="${n}" onclick="toggleTradeSprite(this,'${field}')">${imgTag(n)}<span>${escapeHtml(n)}</span></button>`).join("")}</div><div id="${field}Summary" class="tradeSelected">Nothing selected yet</div>`}
function toggleTradeSprite(btn,field){btn.classList.toggle("selected");const picker=btn.closest('.picker');const chosen=[...picker.querySelectorAll('.pickSprite.selected')].map(x=>x.dataset.sprite);const out=document.getElementById(field+"Selected");if(out)out.value=chosen.join(", ");const summary=document.getElementById(field+"Summary");if(summary){summary.classList.toggle("hasItems",chosen.length>0);summary.innerHTML=chosen.length?`<b>${chosen.length}</b> selected · ${chosen.map(escapeHtml).join(", ")}`:"Nothing selected yet"}}
function renderTrades(filter="all",q=""){const el=document.getElementById("tradeGrid");if(!el)return;const list=trades.filter(t=>(filter==="all"||t.tier===filter)&&(!q||JSON.stringify(t).toLowerCase().includes(q.toLowerCase())));el.innerHTML=list.map((t,i)=>`<div class="trade"><div><b>${escapeHtml(t.user)}</b><div class="chips"><span class="chip">${escapeHtml(t.tier)}</span><span class="chip">Offering: ${escapeHtml(t.offer.join(", "))}</span><span class="chip">Looking for: ${escapeHtml(t.want.join(", "))}</span></div><small>${escapeHtml(t.note||"Open to a fair trade")}</small></div><button class="btn" onclick="viewTrade(${i})">View</button></div>`).join("")||'<div class="empty">No community trades yet. Be the first to post one.</div>';const c=document.getElementById("openCount");if(c)c.textContent=trades.length;renderWishlistBoard()}
function viewTrade(i){const t=trades[i];showModal(`<button class="close" onclick="closeModal()">×</button><label>TRADE POST</label><h2>${escapeHtml(t.user)}</h2><div class="chips"><span class="chip">${escapeHtml(t.tier)}</span></div><div class="field"><label>OFFERING</label><div class="tradeChips">${t.offer.map(x=>`<span class="chip">${escapeHtml(x)}</span>`).join("")}</div></div><div class="field"><label>LOOKING FOR</label><div class="tradeChips">${t.want.map(x=>`<span class="chip">${escapeHtml(x)}</span>`).join("")}</div></div><p class="sub">${escapeHtml(t.note||"")}</p><button class="btn primary" onclick="toast('Trade request saved locally.');closeModal()">Request trade</button>`)}
function showModal(content){const overlay=document.getElementById("modalOverlay");if(!overlay)return;const isTradeBuilder=content.includes("tradeBuilder");overlay.innerHTML=`<div class="modal${isTradeBuilder?" tradeBuildModal":""}">${content}</div>`;overlay.classList.add("show");document.body.classList.add("modalOpen");}
function closeModal(){const overlay=document.getElementById("modalOverlay");if(overlay){overlay.classList.remove("show");overlay.innerHTML="";}document.body.classList.remove("modalOpen");}
function postTrade(){showModal(`<button class="close" onclick="closeModal()">×</button><label>NEW TRADE</label><h2>Build your trade</h2><p class="sub">Choose the Sprites you can give and the ones you want back.</p><div class="tradeBuilder"><div class="field"><label>YOU OFFER</label>${spritePicker([],"offer")}<input id="offerSelected" type="hidden"></div><div class="field"><label>YOU WANT</label>${spritePicker([],"want")}<input id="wantSelected" type="hidden"></div></div><div class="field"><label>MESSAGE <span class="mutedLabel">OPTIONAL</span></label><textarea id="desc" placeholder="Example: Looking for Gold Crown."></textarea></div><div class="tradeModalActions"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="publishTrade()">Post trade</button></div>`)}
function publishTrade(){const offer=(document.getElementById("offerSelected")?.value||"").split(", ").filter(Boolean),want=(document.getElementById("wantSelected")?.value||"").split(", ").filter(Boolean),d=document.getElementById("desc")?.value.trim()||"Open to a fair trade";if(!offer.length||!want.length){toast("Select at least one sprite on each side.");return}const user=localStorage.ss_name||"Guest Trader";trades.unshift({user,tier:"Base",offer,want,note:d,created:Date.now()});save();renderTrades();renderLeaderboard();renderQuests();addNotification("Trade posted",`${user} posted a new trade.`);closeModal();toast("Trade posted!")}
function renderIndex(){const el=document.getElementById("indexGrid");if(!el)return;const q=(document.getElementById("spriteSearch")?.value||"").toLowerCase(),status=document.getElementById("statusFilter")?.value||"All",variant=document.getElementById("variantFilter")?.value||"All";let list=[];Object.entries(tiers).forEach(([t,a])=>a.forEach(n=>{if((variant==="All"||variant===t)&&(status==="All"||(status==="Collected"&&collected.includes(n))||(status==="Missing"&&!collected.includes(n)))&&(!q||n.toLowerCase().includes(q)||n.replace(/^(Gold |Cheat Master |Loot Master )/,"").toLowerCase().includes(q)))list.push([n,t])}));el.innerHTML=list.map(([n,t])=>`<div class="sprite ${collected.includes(n)?"collected":""}"><div class="art">${imgTag(n)}</div><b>${escapeHtml(n)}</b><small>${t} · ${collected.includes(n)?"Collected":"Missing"}</small><div class="spriteActions"><button class="miniAction ${isWish(n)?"active":""}" onclick="toggleWishlist('${n}',event)">♡ ${isWish(n)?"Wanted":"Wishlist"}</button><button class="miniAction ${mastered.includes(n)?"active master":""}" onclick="toggleMastered('${n}');event.stopPropagation()">★ ${mastered.includes(n)?"Mastered":"Master"}</button><button class="miniAction" onclick="collectSprite('${n.replace(/'/g,"\\'")}');event.stopPropagation()">${collected.includes(n)?"✓ Collected":"＋ Collect"}</button></div></div>`).join("")||'<div class="empty">No sprites match those filters.</div>';const shown=document.getElementById("indexShown");if(shown)shown.textContent=list.length;const m=document.getElementById("masteredShown");if(m)m.textContent=mastered.length}
function renderWishlist(){const el=document.getElementById("wishlistGrid");if(!el)return;el.innerHTML=wishlist.map(n=>`<div class="wishCard">${imgTag(n)}<div><b>${escapeHtml(n)}</b><small>Wanted by ${escapeHtml(localStorage.ss_name||"Guest Trader")}</small></div><button class="miniAction active" onclick="toggleWishlist('${n}')">Remove</button></div>`).join("")||'<div class="emptyPanel">Your wishlist is empty. Use the Wishlist button on any Sprite.</div>';const c=document.getElementById("wishlistCount");if(c)c.textContent=wishlist.length}
function renderWishlistBoard(){const el=document.getElementById("wishlistBoard");if(!el)return;const rows=trades.flatMap(t=>(t.want||[]).map(n=>({n,user:t.user})));const grouped={};rows.forEach(r=>(grouped[r.n]??=[]).push(r.user));el.innerHTML=Object.entries(grouped).map(([n,users])=>`<div class="wishBoardRow">${imgTag(n)}<div><b>${escapeHtml(n)}</b><small>${users.length} trader${users.length===1?"":"s"} looking for it · ${users.slice(0,3).map(escapeHtml).join(", ")}</small></div></div>`).join("")||'<div class="emptyPanel">No public wants yet. Trade posts will appear here.</div>'}
function questProgress(q){
 if(!q.kind||q.kind==="evergreen")switch(q.type){case"collect":return Math.min(collected.length,q.goal);case"wish":return Math.min(wishlist.length,q.goal);case"master":return Math.min(mastered.length,q.goal);case"trade":return Math.min(trades.filter(t=>t.user===(localStorage.ss_name||"Guest Trader")).length,q.goal);case"base":return Math.min(collected.filter(n=>tiers.Base.includes(n)).length,q.goal);default:return 0}
 const key=`${q.kind}:${q.period}`;
 if(!questBaselines[key]){questBaselines[key]={collect:collected.length,wish:wishlist.length,master:mastered.length,trade:trades.filter(t=>t.user===(localStorage.ss_name||"Guest Trader")).length,base:collected.filter(n=>tiers.Base.includes(n)).length};save()}
 const b=questBaselines[key];
 const current={collect:collected.length,wish:wishlist.length,master:mastered.length,trade:trades.filter(t=>t.user===(localStorage.ss_name||"Guest Trader")).length,base:collected.filter(n=>tiers.Base.includes(n)).length};
 return Math.min(Math.max(0,(current[q.type]||0)-(b[q.type]||0)),q.goal);
}
function claimQuest(id){const quests=getActiveQuests(),q=quests.find(x=>x.id===id);if(!q||questClaims.includes(id)||questProgress(q)<q.goal)return;questClaims=[...questClaims,id];save();addNotification("Quest complete",`${q.title} unlocked ${q.reward}.`);closeModal();renderQuests();applyBackground();toast(`${q.title} complete! ${q.reward} unlocked.`)}
function renderQuests(){const el=document.getElementById("questGrid");if(!el)return;const quests=getActiveQuests();const groups={daily:[],weekly:[],monthly:[],evergreen:[]};quests.forEach(q=>(groups[q.kind||"evergreen"]||groups.evergreen).push(q));const renderGroup=(title,sub,list)=>list.length?`<div class="questSection"><div class="questSectionHead"><div><label>${title}</label><p>${sub}</p></div><span class="questCount">${list.length} quests</span></div><div class="questGrid questGridLarge">${list.map(q=>{const p=questProgress(q),done=p>=q.goal,claimed=questClaims.includes(q.id),pct=Math.min(100,Math.round(p/q.goal*100));return `<article class="questCard ${done?"complete":""} ${q.kind||""}"><div class="questTop"><span>${q.kind==="daily"?"EASY · DAILY":q.kind==="weekly"?"MEDIUM · WEEKLY":q.kind==="monthly"?"HARD · MONTHLY":"CORE"}</span><b>${claimed?"CLAIMED":done?"READY":"IN PROGRESS"}</b></div><h3>${escapeHtml(q.title)}</h3><p>${escapeHtml(q.desc)}</p><div class="questBar"><i style="width:${pct}%"></i></div><div class="questBottom"><small>${p} / ${q.goal}</small><span>🎁 ${escapeHtml(q.reward)}</span></div>${done&&!claimed?`<button class="btn primary" onclick="claimQuest('${q.id}')">Claim reward</button>`:""}<small class="questReset">${questPeriodText(q)}</small></article>`}).join("")}</div></div>`:"";el.innerHTML=renderGroup("DAILY QUESTS","Easy challenges · fresh every day.",groups.daily)+renderGroup("WEEKLY QUESTS","Medium challenges · fresh every week.",groups.weekly)+renderGroup("MONTHLY QUESTS","Hard challenges · fresh every month.",groups.monthly)+renderGroup("CORE QUESTS","Permanent SpriteSwap goals.",groups.evergreen)}
function showBackgroundPicker(){const current=localStorage.ss_background||"Midnight";showModal(`<button class="close" onclick="closeModal()">×</button><label>PROFILE CUSTOMIZATION</label><h2>Choose your background</h2><p class="sub">Unlocked backgrounds can be used across your profile.</p><div class="bgPicker">${Object.entries(BACKGROUNDS).map(([n,v])=>{const unlocked=n==="Midnight"||questClaims.some(id=>QUESTS.find(q=>q.id===id)?.reward===n);return `<button class="bgChoice ${current===n?"selected":""} ${unlocked?"":"locked"}" style="background:${v}" ${unlocked?`onclick="setBackground('${n}')"`:"disabled"}><b>${escapeHtml(n)}</b><small>${unlocked?"Unlocked":"Complete a quest"}</small></button>`}).join("")}</div><div class="field"><label>CUSTOM BACKGROUND IMAGE</label><input id="bgUpload" type="file" accept="image/*"><button class="btn" onclick="uploadBackground()">Upload background</button></div>`)}
function setBackground(name){if(!BACKGROUNDS[name])return;localStorage.ss_background=name;applyBackground();closeModal();toast(`${name} background applied.`)}
function uploadBackground(){const f=document.getElementById("bgUpload")?.files?.[0];if(!f)return toast("Choose an image first.");if(f.size>2*1024*1024)return toast("Please use an image under 2 MB.");const r=new FileReader();r.onload=()=>{localStorage.ss_custom_bg=r.result;localStorage.ss_background="custom";applyBackground();closeModal();toast("Custom background saved!")};r.readAsDataURL(f)}
function applyBackground(){const custom=localStorage.ss_custom_bg;const name=localStorage.ss_background||"Midnight";document.body.style.backgroundImage=custom&&name==="custom"?`linear-gradient(rgba(7,11,16,.65),rgba(7,11,16,.82)),url(${custom})`:BACKGROUNDS[name]||BACKGROUNDS.Midnight}
function renderOnline(){
  const key="ss_presence_v2",id=localStorage.ss_presence_id||(localStorage.ss_presence_id=Math.random().toString(36).slice(2)),name=localStorage.ss_name||"Guest Trader";
  const draw=()=>{const p=readJSON(key,{}),t=Date.now();Object.keys(p).forEach(k=>{if(t-p[k].last>15000)delete p[k]});p[id]={name,last:t};localStorage[key]=JSON.stringify(p);const fresh=Object.entries(p).filter(([,v])=>t-v.last<15000);const out=document.getElementById("onlinePlayers"),count=document.getElementById("onlineCount");if(count)count.textContent=fresh.length;if(out)out.innerHTML=fresh.slice(0,20).map(([,v])=>`<span class="onlineUser"><i></i>${escapeHtml(v.name)}${v.name===name?' <b class="youBadge">YOU</b>':''}</span>`).join("")||'<span class="emptyInline">Nobody is online right now.</span>';if(window.__presenceChannel)window.__presenceChannel.postMessage({type:"heartbeat",id})};
  draw();window.__presenceTimer&&clearInterval(window.__presenceTimer);window.__presenceTimer=setInterval(draw,5000);
  window.addEventListener("storage",e=>{if(e.key===key)draw()});
  if("BroadcastChannel" in window){window.__presenceChannel=window.__presenceChannel||new BroadcastChannel("spriteswap-presence");window.__presenceChannel.onmessage=()=>draw();window.__presenceChannel.postMessage({type:"heartbeat",id})}
}
function editProfile(){showModal(`<button class="close" onclick="closeModal()">×</button><label>PROFILE</label><h2>Edit profile</h2><div class="field"><label>Display name</label><input id="newName" value="${escapeHtml(localStorage.ss_name||"Guest Trader")}"></div><button class="btn primary" onclick="saveName()">Save</button>`)}
function saveName(){const n=document.getElementById("newName")?.value.trim()||"Guest Trader";localStorage.ss_name=n;setUser();renderOnline();closeModal();toast("Profile name updated.")}
function setUser(){const n=localStorage.ss_name||"Guest Trader";document.querySelectorAll("#name").forEach(x=>x.textContent=n);const auth=document.getElementById("auth");if(auth)auth.textContent=n==="Guest Trader"?"Sign in":n;const st=document.getElementById("statTrades");if(st)st.textContent=trades.filter(t=>t.user===n).length;const ph=localStorage.ss_avatar;document.querySelectorAll("#avatar,#profileAvatar,#profileBigAvatar,#accountAvatar").forEach(av=>{av.innerHTML=ph?`<img class="profilePhoto" src="${ph}" alt="Profile picture">`:escapeHtml(n[0]?.toUpperCase()||"S")})}
function renderLeaderboard(){const el=document.getElementById("leaders");if(!el)return;const me=localStorage.ss_name||"Guest Trader";const rows=trades.map(t=>({n:t.user,tr:trades.filter(x=>x.user===t.user).length,p:trades.filter(x=>x.user===t.user).length*20})).filter((x,i,a)=>a.findIndex(y=>y.n===x.n)===i);if(me!=="Guest Trader"&&!rows.some(x=>x.n===me))rows.push({n:me,tr:trades.filter(t=>t.user===me).length,p:collected.length*200});rows.sort((a,b)=>b.p-a.p);el.innerHTML=rows.length?rows.map((x,i)=>`<div class="leader leaderRow"><span class="rank">${i+1}</span><b>${escapeHtml(x.n)}${x.n===me&&me!=="Guest Trader"?'<span class="youBadge">YOU</span>':''}</b><span>${x.tr} trades</span><b>${x.p.toLocaleString()} pts</b></div>`).join(""):'<div class="empty">No community rankings yet. Post a trade to appear here.</div>'}
function renderUpdates(){const week=document.getElementById("newThisWeekGrid");if(week)week.innerHTML=NEW_THIS_WEEK.map(updateCard).join("");const upcoming=document.getElementById("upcomingGrid");if(upcoming)upcoming.innerHTML=UPCOMING.map(updateCard).join("");const unreleased=document.getElementById("unreleasedGrid");if(unreleased)unreleased.innerHTML=UNRELEASED_LOOT_MASTERS.map(updateCard).join("")}
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
function openSpriteDetailV14(name){
 const base=name.replace(/^Gold |^Cheat Master |^Loot Master /,'');
 const variants=base==="Crown"?["Crown","Gold Crown","Cheat Master Crown","Loot Master Crown"]:[base,...(VARIANTABLE_NEW.includes(base)||!NEW_SPRITES.includes(base)?['Gold '+base,'Cheat Master '+base]:[])];
 const location=spriteLocation(name);
 showModal(`<button class="close" onclick="closeModal()">×</button><label>SPRITE DETAILS</label><div class="detailHero">${imgTag(base,'detailArt')}<div><h2>${escapeHtml(base)}</h2><p class="sub">${variants.filter(x=>collected.includes(x)).length} / ${variants.length} variants collected</p><button class="btn primary" onclick="toggleWishlist('${base}',event);openSpriteDetailV14('${base.replace(/'/g,"\'")}')">${wishlist.includes(base)?'Remove from wishlist':'Add to wishlist'}</button></div></div><div class="spriteFindBox"><b>📍 WHERE TO FIND</b><p>${escapeHtml(location)}</p><small>Location info based on current Fortnite Override Sprite tracking.</small></div><div class="detailVariants">${variants.map(v=>`<div class="detailVariant">${imgTag(v)}<b>${escapeHtml(v)}</b><small>${collected.includes(v)?'Collected':'Missing'} · ${mastered.includes(v)?'Mastered':'Not mastered'}</small></div>`).join('')}</div>`);
}
function renderBadgesV14(){const el=document.getElementById('badgesGrid');if(!el)return;const b=[];if(collected.length>=1)b.push(['First Find','Collected your first Sprite.']);if(trades.some(t=>t.user===currentUserV14()))b.push(['First Trade','Posted your first trade.']);if(mastered.length>=3)b.push(['Triple Master','Mastered 3 variants.']);if(wishlist.length>=5)b.push(['Wish Collector','Added 5 Sprites to your wishlist.']);if(collected.length>=TOTAL_SPRITES)b.push(['Full Set',`Collected all ${TOTAL_SPRITES} current variants.`]);el.innerHTML=b.map(x=>`<div class="badgeCard"><b>★ ${escapeHtml(x[0])}</b><small>${escapeHtml(x[1])}</small></div>`).join('')||'<div class="emptyPanel">Your first badge is waiting. Start collecting.</div>'}
function renderChallengeV14(){const el=document.getElementById('dailyChallenge');if(!el)return;const day=Math.floor(Date.now()/86400000),choices=[['Daily Hunt','Collect 2 Sprites.',2,collected.length],['Wishlist Pick','Have 1 Sprite on your wishlist.',1,wishlist.length],['Trade Ready','Post 1 trade.',1,trades.filter(t=>t.user===currentUserV14()).length]],q=choices[day%choices.length],p=Math.min(q[2],q[3]);el.innerHTML=`<div class="challengeCard"><div><label>DAILY CHALLENGE</label><h3>${q[0]}</h3><p>${q[1]}</p></div><div class="challengeProgress"><b>${p} / ${q[2]}</b><div class="questBar"><i style="width:${p/q[2]*100}%"></i></div></div></div>`}
function addV14UI(){const path=location.pathname.split('/').pop()||'index.html';if(path==='trades.html'){const hero=document.querySelector('.heroSmall');if(hero&&!document.getElementById('offersBtnV14')){const b=document.createElement('button');b.id='offersBtnV14';b.className='btn';b.textContent='📨 Trade offers';b.onclick=showTradeOffersV14;hero.appendChild(b)}}if(path==='profile.html'){const first=document.querySelector('.profileHeroPage');if(first&&!document.getElementById('dailyChallenge')){const sec=document.createElement('section');sec.className='section';sec.innerHTML='<div id="dailyChallenge"></div>';first.parentNode.insertBefore(sec,first.nextSibling)}const qs=document.querySelector('.section');if(qs&&!document.getElementById('badgesGrid')){const sec=document.createElement('section');sec.className='section';sec.innerHTML='<div class="sectionTitle"><div><label>BADGES</label><h2>Your collector badges</h2><p class="sub">Small milestones for collecting, trading and mastering.</p></div></div><div id="badgesGrid" class="badgesGrid"></div>';first.parentNode.insertBefore(sec,qs)}}renderBadgesV14();renderChallengeV14()}
const oldRenderSpritesV14=renderSprites;renderSprites=function(t=currentTier,q=''){oldRenderSpritesV14(t,q);document.querySelectorAll('#spriteGrid .sprite').forEach((card)=>{const name=card.querySelector('b')?.textContent;if(name)card.onclick=()=>openSpriteDetailV14(name)})};
const oldRenderIndexV14=renderIndex;renderIndex=function(){oldRenderIndexV14();document.querySelectorAll('#indexGrid .sprite').forEach(card=>{card.onclick=null;const name=card.querySelector('b')?.textContent;const art=card.querySelector('.art');if(name&&art){art.setAttribute('role','button');art.setAttribute('tabindex','0');art.title='View sprite details';art.onclick=(e)=>{e.stopPropagation();openSpriteDetailV14(name)};art.onkeydown=(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();openSpriteDetailV14(name)}}}})};
const oldCollectV14=collectSprite;collectSprite=function(n){oldCollectV14(n);renderBadgesV14();renderChallengeV14()};
const oldToggleWishV14=toggleWishlist;toggleWishlist=function(n,e){oldToggleWishV14(n,e);renderBadgesV14();renderChallengeV14()};
const oldPostTradeV14=publishTrade;publishTrade=function(){oldPostTradeV14();renderBadgesV14();renderChallengeV14()};
document.addEventListener('DOMContentLoaded',()=>setTimeout(addV14UI,30));
