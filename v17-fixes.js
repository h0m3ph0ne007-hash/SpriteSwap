/* SpriteSwap V17 fixes + backend bridge */
(function(){
  // Clear-all notifications: keeps the notification center tidy.
  const originalRenderNotifications=window.renderNotifications;
  window.clearAllNotifications=async function(){
    const a=typeof notifications==='function'?notifications():[];
    if(!a.length){ if(typeof toast==='function') toast('No notifications to clear.'); return; }
    if(!confirm('Clear all notifications?')) return;
    localStorage.removeItem('ss_notifications');
    try{ const b=window.SpriteSwapBackend; if(b?.enabled) await b.clearNotifications(); }catch(e){console.warn(e)}
    if(typeof renderNotifications==='function') renderNotifications();
    if(typeof toast==='function') toast('All notifications cleared.');
  };
  window.renderNotifications=function(){
    const panel=document.getElementById('notificationPanel'),badge=document.getElementById('notificationBadge');
    if(!panel&&!badge)return;
    const a=typeof notifications==='function'?notifications():[],unread=a.filter(x=>!x.read).length;
    if(badge){badge.textContent=unread;badge.style.display=unread?'grid':'none'}
    if(panel) panel.innerHTML=`<div class="notificationHead"><b>Notifications</b><div class="notificationTools"><button type="button" onclick="event.stopPropagation();markNotificationsRead()">Mark read</button><button type="button" class="notifyClear" onclick="event.stopPropagation();clearAllNotifications()">Clear all</button><button type="button" class="notifyEnable" onclick="event.stopPropagation();requestBrowserNotifications()">${browserAlertsEnabled()?'Alerts on':'Enable alerts'}</button></div></div>${a.length?a.slice(0,10).map(x=>`<div class="notificationItem ${x.read?'':'unread'}"><b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.text)}</small></div>`).join(''):'<div class="notificationEmpty">You’re all caught up.</div>'}`;
  };

  // Make the backend opt-in automatic once the user fills supabase-config.js.
  async function backendSync(){
    const b=await window.SpriteSwapBackendReady;
    if(!b?.enabled)return;
    try{
      const remote=await b.pullTrades();
      if(remote.length){
        trades=remote;
        localStorage.ss_trades=JSON.stringify(trades);
        if(typeof renderTrades==='function') renderTrades(document.querySelector('#filters .active')?.dataset.f||'all',document.getElementById('tradeSearch')?.value||'');
        if(typeof renderLeaderboard==='function') renderLeaderboard();
      }
      if(typeof b.pullOffers==='function'){const offers=await b.pullOffers();if(offers.length){tradeOffersV14=offers;saveOffersV14();}}
      const notes=await b.pullNotifications();
      if(notes.length){
        localStorage.ss_notifications=JSON.stringify(notes.map(n=>({title:n.title,text:n.text,created:new Date(n.created_at).getTime(),read:!!n.read})).slice(0,30));
        renderNotifications();
      }
    }catch(e){console.warn('SpriteSwap backend sync failed:',e)}
  }

  const originalPublishTrade=window.publishTrade;
  window.publishTrade=async function(){
    const before=trades.length;
    originalPublishTrade();
    if(trades.length>before){
      const t=trades[0];
      try{if(window.SpriteSwapBackend?.enabled) await window.SpriteSwapBackend.pushTrade(t);}catch(e){console.warn('Trade backend save failed:',e)}
    }
  };

  const originalSendOffer=window.sendOfferV14;
  if(originalSendOffer) window.sendOfferV14=async function(i){
    const before=typeof tradeOffersV14!=='undefined'?tradeOffersV14.length:0;
    originalSendOffer(i);
    if(typeof tradeOffersV14!=='undefined' && tradeOffersV14.length>before){
      try{if(window.SpriteSwapBackend?.enabled) await window.SpriteSwapBackend.pushOffer(tradeOffersV14[0]);}catch(e){console.warn('Offer backend save failed:',e)}
    }
  };

  const originalRespondOffer=window.respondOfferV14;
  if(originalRespondOffer) window.respondOfferV14=async function(id,status){ originalRespondOffer(id,status); try{if(window.SpriteSwapBackend?.enabled && typeof window.SpriteSwapBackend.updateOffer==='function') await window.SpriteSwapBackend.updateOffer(id,status)}catch(e){console.warn('Offer status backend save failed:',e)} };

  window.addEventListener('spriteswap-backend-ready',backendSync);
  setTimeout(()=>{if(window.SpriteSwapBackendReady) backendSync()},1200);
})();
