/* SpriteSwap V20 — Levels, Owner tag, Achievements, smarter search, trade chat, real presence */
(function(){
  const esc=s=>typeof escapeHtml==='function'?escapeHtml(String(s)):String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const me=()=>localStorage.ss_name||'Guest Trader';
  let secureOwner=false;
  let secureOwnerUserId=null;
  const OWNER_USERNAME='CoolGuy_247';
  const owner=()=>secureOwner && me().toLowerCase()===OWNER_USERNAME.toLowerCase();
  async function loadSecureRole(){
    secureOwner=false; secureOwnerUserId=null;
    try{
      const b=window.SpriteSwapBackend; if(!b?.enabled||!b.client)return;
      const u=await b.user(); if(!u)return; secureOwnerUserId=u.id;
      const {data,error}=await b.client.from('profiles').select('role').eq('user_id',u.id).maybeSingle();
      if(!error && data?.role==='owner') secureOwner=true;
    }catch(e){secureOwner=false; secureOwnerUserId=null;}
  }
  const userTrades=()=> (typeof trades!=='undefined'?trades:JSON.parse(localStorage.ss_trades||'[]')).filter(t=>t.user===me());
  const xp=()=>{
    const c=typeof collected!=='undefined'?collected:[];
    const w=typeof wishlist!=='undefined'?wishlist:[];
    const m=typeof mastered!=='undefined'?mastered:[];
    const q=typeof questClaims!=='undefined'?questClaims:[];
    return c.length*25+w.length*10+m.length*40+userTrades().length*75+q.length*50;
  };
  const levelInfo=()=>owner()?{level:Infinity,xp:Infinity,next:Infinity}:(()=>{const x=xp();return {level:Math.floor(x/100)+1,xp:x,next:(Math.floor(x/100)+1)*100}})();
  const ownerTag=()=>owner()?'<span class="ownerTag">👑 OWNER</span>':'';

  const achievements=[
    ['first-sprite','FIRST FIND','Collect your first Sprite.',()=>collected.length>=1,'🧩'],
    ['five-sprites','STARTER COLLECTOR','Collect 5 Sprites.',()=>collected.length>=5,'📦'],
    ['ten-sprites','COLLECTION CREW','Collect 10 Sprites.',()=>collected.length>=10,'🔥'],
    ['all-sprites','FULL SET','Collect all 46 live variants.',()=>collected.length>=46,'🏆'],
    ['first-trade','FIRST SWAP','Post your first trade.',()=>userTrades().length>=1,'🔄'],
    ['ten-trades','TRADE MACHINE','Post 10 trades.',()=>userTrades().length>=10,'⚡'],
    ['first-master','MASTER','Master your first variant.',()=>mastered.length>=1,'★'],
    ['five-master','MASTER CLASS','Master 5 variants.',()=>mastered.length>=5,'💠'],
    ['wish-five','WISH COLLECTOR','Add 5 Sprites to your wishlist.',()=>wishlist.length>=5,'♡'],
    ['quest-five','QUEST GRINDER','Claim 5 quest rewards.',()=>questClaims.length>=5,'🎯']
  ];
  function renderAchievements(){
    const el=document.getElementById('v20Achievements'); if(!el)return;
    const unlocked=JSON.parse(localStorage.ss_achievements||'[]');
    const rows=achievements.map(a=>{const ok=a[3](),was=unlocked.includes(a[0]);if(ok&&!was)unlocked.push(a[0]);return {...a,ok,was:was||ok}});
    localStorage.ss_achievements=JSON.stringify(unlocked);
    el.innerHTML=rows.map(a=>`<article class="achievementCard ${a.ok?'unlocked':'locked'}"><div class="achievementIcon">${a[4]}</div><div><b>${esc(a[1])}</b><small>${esc(a[2])}</small></div><span>${a.ok?'UNLOCKED':'LOCKED'}</span></article>`).join('');
  }
  function renderLevel(){
    document.querySelectorAll('[data-v20-level]').forEach(e=>e.textContent=owner()?'∞':levelInfo().level);
    document.querySelectorAll('[data-v20-xp]').forEach(e=>e.textContent=owner()?'OWNER':`${levelInfo().xp} XP`);
    document.querySelectorAll('[data-v20-owner]').forEach(e=>e.innerHTML=ownerTag());
    const bar=document.getElementById('v20LevelBar'); if(bar)bar.style.width=owner()?'100%':`${Math.min(100,(levelInfo().xp%100))}%`;
  }
  function addProfileUI(){
    if(location.pathname.split('/').pop()!=='profile.html')return;
    const hero=document.querySelector('.profileHeroInfo');
    if(hero&&!document.getElementById('v20LevelBox')){
      const box=document.createElement('div');box.id='v20LevelBox';box.className='v20LevelBox';box.innerHTML=`<div class="v20LevelTop"><div><small>TRADER LEVEL</small><strong data-v20-level>1</strong></div><div class="v20XP" data-v20-owner></div></div><div class="v20LevelBar"><i id="v20LevelBar"></i></div><span data-v20-xp>0 XP</span>`;hero.appendChild(box);
    }
    const anchor=[...document.querySelectorAll('.section')].find(s=>s.querySelector('#badgesGrid'))||document.querySelector('#overview')?.parentElement;
    if(anchor&&!document.getElementById('v20Achievements')){
      const sec=document.createElement('section');sec.className='section';sec.innerHTML=`<div class="sectionTitle"><div><label>ACHIEVEMENTS</label><h2>Your achievements</h2><p class="sub">Unlock milestones while you collect, trade and master Sprites.</p></div><span class="ownerHeader" data-v20-owner></span></div><div id="v20Achievements" class="achievementGrid"></div>`;anchor.parentNode.insertBefore(sec,anchor.nextSibling);
    }
    renderAchievements();renderLevel();
  }

  // Smarter sprite search: supports multiple words, variant aliases, collected/missing/mastered terms.
  function smartIndex(){
    const el=document.getElementById('indexGrid');if(!el||typeof tiers==='undefined')return;
    const raw=(document.getElementById('spriteSearch')?.value||'').trim().toLowerCase();
    const terms=raw.split(/\s+/).filter(Boolean);const status=document.getElementById('statusFilter')?.value||'All';const variant=document.getElementById('variantFilter')?.value||'All';
    let list=[];Object.entries(tiers).forEach(([t,a])=>a.forEach(n=>{
      const hay=`${n} ${t} ${n.replace(/^(Gold |Cheat Master )/,'')}`.toLowerCase();
      const aliases={normal:'base',cheat:'cheat master',master:'cheat master',cm:'cheat master'};
      const q=terms.map(x=>aliases[x]||x);
      const matches=q.every(x=>hay.includes(x));
      const st=status==='All'||(status==='Collected'&&collected.includes(n))||(status==='Missing'&&!collected.includes(n))||(status==='Mastered'&&mastered.includes(n));
      const vr=variant==='All'||t===variant;
      if(matches&&st&&vr)list.push([n,t]);
    }));
    el.innerHTML=list.map(([n,t])=>`<div class="sprite ${collected.includes(n)?'collected':''}"><div class="art">${imgTag(n)}</div><b>${esc(n)}</b><small>${t} · ${collected.includes(n)?'Collected':'Missing'}${mastered.includes(n)?' · Mastered':''}</small><div class="spriteActions"><button class="miniAction ${isWish(n)?'active':''}" onclick="toggleWishlist('${n.replace(/'/g,"\\'")}',event)">♡ ${isWish(n)?'Wanted':'Wishlist'}</button><button class="miniAction ${mastered.includes(n)?'active master':''}" onclick="toggleMastered('${n.replace(/'/g,"\\'")}');event.stopPropagation()">★ ${mastered.includes(n)?'Mastered':'Master'}</button><button class="miniAction" onclick="collectSprite('${n.replace(/'/g,"\\'")}');event.stopPropagation()">${collected.includes(n)?'✓ Collected':'＋ Collect'}</button></div></div>`).join('')||'<div class="empty">No sprites match those filters.</div>';
    document.getElementById('indexShown')?.replaceChildren(document.createTextNode(String(list.length)));
    el.querySelectorAll('.sprite').forEach(card=>{const name=card.querySelector('b')?.textContent;if(name)card.addEventListener('dblclick',()=>openSpriteDetailV14(name));});
  }

  function injectSearchFilter(){
    if(!document.getElementById('spriteSearch'))return;
    const status=document.getElementById('statusFilter');if(status&&!status.querySelector('option[value="Mastered"]'))status.insertAdjacentHTML('beforeend','<option value="Mastered">Mastered</option>');
    ['input','change'].forEach(ev=>document.getElementById('spriteSearch').addEventListener(ev,smartIndex));status?.addEventListener('change',smartIndex);document.getElementById('variantFilter')?.addEventListener('change',smartIndex);
    smartIndex();
  }

  // Trade chat: local history always works; Supabase persistence/realtime activates when configured.
  const chatKey=id=>`ss_trade_chat_${id}`;
  function chatMessages(id){return JSON.parse(localStorage.getItem(chatKey(id))||'[]');}
  async function loadRemoteChat(id){try{if(window.SpriteSwapBackend?.enabled&&window.SpriteSwapBackend.client){const {data,error}=await window.SpriteSwapBackend.client.from('trade_chat').select('*').eq('trade_id',String(id)).order('created_at',{ascending:true}).limit(100);if(!error&&data)return data.map(x=>({user:x.username,userId:x.user_id,text:x.message,created:new Date(x.created_at).getTime()}));}}catch(e){}return null}
  function renderChat(id,remote){const el=document.getElementById('v20ChatMessages');if(!el)return;const rows=remote||chatMessages(id);el.innerHTML=rows.map(x=>`<div class="chatMsg"><b>${esc(x.user)} ${ownerForUserId(x.userId)||ownerFor(x.user)}</b><p>${esc(x.text)}</p></div>`).join('')||'<div class="emptyPanel">No messages yet. Say hi and negotiate!</div>';el.scrollTop=el.scrollHeight;}
  function ownerFor(n){return secureOwner && String(n)===me()?'<span class="ownerMini">OWNER</span>':''}
  function ownerForUserId(id){return secureOwnerUserId && id===secureOwnerUserId?'<span class="ownerMini">OWNER</span>':''}
  async function sendTradeChat(id){const input=document.getElementById('v20ChatInput');const text=input?.value.trim();if(!text)return;const msg={user:me(),userId:secureOwnerUserId,text,created:Date.now()};const rows=chatMessages(id);rows.push(msg);localStorage.setItem(chatKey(id),JSON.stringify(rows.slice(-100)));input.value='';renderChat(id);try{if(window.SpriteSwapBackend?.enabled){const u=await window.SpriteSwapBackend.user();if(u)await window.SpriteSwapBackend.client.from('trade_chat').insert({trade_id:String(id),user_id:u.id,username:me(),message:text});}}catch(e){console.warn('Chat backend:',e)} }
  async function openChat(id){const remote=await loadRemoteChat(id);renderChat(id,remote||undefined);if(window.__v20ChatSub)window.__v20ChatSub.unsubscribe();try{if(window.SpriteSwapBackend?.enabled){window.__v20ChatSub=window.SpriteSwapBackend.client.channel('trade-chat-'+id).on('postgres_changes',{event:'INSERT',schema:'public',table:'trade_chat',filter:`trade_id=eq.${id}`},p=>{const x=p.new;renderChat(id,[...chatMessages(id),{user:x.username,userId:x.user_id,text:x.message,created:new Date(x.created_at).getTime()}]);}).subscribe();}}catch(e){} }

  const oldView=window.viewTrade;
  window.viewTrade=function(i){
    if(typeof trades==='undefined'||!trades[i])return oldView?.(i);
    const t=trades[i],id=t.id||`${t.user}-${t.created||i}`;
    showModal(`<button class="close" onclick="closeModal()">×</button><label>TRADE POST</label><h2>${esc(t.user)} ${ownerFor(t.user)}</h2><div class="chips"><span class="chip">${esc(t.tier||'Base')}</span></div><div class="field"><label>OFFERING</label><div class="tradeChips">${(t.offer||[]).map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div></div><div class="field"><label>LOOKING FOR</label><div class="tradeChips">${(t.want||[]).map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div></div><p class="sub">${esc(t.note||'Open to a fair trade')}</p>${t.user!==me()?'<button class="btn primary" onclick="openOfferBuilderV14('+i+')">Send trade offer</button>':''}<div class="v20Chat"><div class="v20ChatHead"><div><label>TRADE CHAT</label><h3>Talk it out</h3></div><span class="onlineMini">● LIVE</span></div><div id="v20ChatMessages" class="v20ChatMessages"></div><div class="v20ChatInput"><input id="v20ChatInput" maxlength="240" placeholder="Message the trader…" onkeydown="if(event.key==='Enter')sendTradeChat('${esc(String(id))}')"><button class="btn primary" onclick="sendTradeChat('${esc(String(id))}')">Send</button></div></div>`);
    setTimeout(()=>openChat(id),30);
  };

  // Real cross-device presence through Supabase Realtime Presence when configured.
  async function startRealPresence(){
    try{
      if(!window.SpriteSwapBackend?.enabled)return;
      const client=window.SpriteSwapBackend.client;const channel=client.channel('spriteswap-online',{config:{presence:{key:localStorage.ss_presence_id||(localStorage.ss_presence_id=Math.random().toString(36).slice(2))}}});
      channel.on('presence',{event:'sync'},()=>{const state=channel.presenceState(),users=Object.values(state).flat();const unique=[];const seen=new Set();users.forEach(u=>{const n=u.name||'Guest Trader';if(!seen.has(n)){seen.add(n);unique.push(u)}});const count=document.getElementById('onlineCount');if(count)count.textContent=unique.length;const out=document.getElementById('onlinePlayers');if(out)out.innerHTML=unique.slice(0,30).map(u=>`<span class="onlineUser"><i></i>${esc(u.name||'Trader')} ${ownerFor(u.name||'')}</span>`).join('')||'<span class="emptyInline">Nobody is online right now.</span>';});
      await channel.subscribe(async status=>{if(status==='SUBSCRIBED')await channel.track({name:me(),level:owner()?'∞':String(levelInfo().level),online:true})});window.__v20Presence=channel;
    }catch(e){console.warn('Real presence unavailable:',e)}
  }

  function decorateOwnerEverywhere(){
    const auth=document.getElementById('auth');
    if(auth&&owner()&&!auth.querySelector('.ownerMini'))auth.insertAdjacentHTML('beforeend',' <span class="ownerMini">OWNER</span>');
  }
  const oldTrades=window.renderTrades;
  if(typeof oldTrades==='function'){window.renderTrades=function(filter='all',q=''){oldTrades(filter,q);if(owner()){document.querySelectorAll('#tradeGrid .trade b').forEach(b=>{if(b.textContent.trim()===me()&&!b.querySelector('.ownerMini'))b.insertAdjacentHTML('beforeend',' <span class="ownerMini">OWNER</span>')});}}}
  async function boot(){
    await loadSecureRole();
    addProfileUI();injectSearchFilter();startRealPresence();renderAchievements();renderLevel();decorateOwnerEverywhere();
    if(typeof window.renderTrades==='function'&&document.getElementById('tradeGrid'))window.renderTrades(document.querySelector('#filters .active')?.dataset.f||'all',document.getElementById('tradeSearch')?.value||'');
    const mo=new MutationObserver(()=>{renderLevel();renderAchievements();decorateOwnerEverywhere()});mo.observe(document.body,{subtree:true,childList:true});
    window.addEventListener('spriteswap-backend-ready',async()=>{await loadSecureRole();renderLevel();decorateOwnerEverywhere();startRealPresence();});
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,80));
  window.SpriteSwapV20={renderAchievements,renderLevel,smartIndex,sendTradeChat};
})();
