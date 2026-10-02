const CACHE='spriteswap-v40-final';
const ASSETS=['index.html','index-page.html','trades.html','new.html','upcoming.html','leaderboard.html','quests.html','wishlist.html','profile.html','account.html','rules.html','community.html','about.html','report.html','style.css','v40-vibrant.css','v40-vibrant.js','app.js','auth.js','v37-redesign.js','v34-fortnitemares.js','manifest.json','spriteswap-logo.png','spriteswap-icon.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data?.type==='SHOW_NOTIFICATION'){self.registration.showNotification(e.data.title||'SpriteSwap',{body:e.data.body||'',icon:'spriteswap-icon.png',badge:'spriteswap-icon.png',tag:e.data.tag||'spriteswap'})}});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus()}if(clients.openWindow)return clients.openWindow('index.html')}))});
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 const fresh=e.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('.js')||url.pathname.endsWith('.css');
 if(fresh){
   e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
     const copy=r.clone();
     caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
     return r;
   }).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
   return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('index.html'))));
});
