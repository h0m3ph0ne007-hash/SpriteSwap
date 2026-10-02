/* SpriteSwap V37 — shared UI, navigation and resilience fixes */
(function(){
  'use strict';
  const page=location.pathname.split('/').pop()||'index.html';
  const links=[
    ['trades.html','Trades'],['index-page.html','Sprites'],['new.html','New This Week'],
    ['upcoming.html','Upcoming'],['leaderboard.html','Leaderboard'],['quests.html','Quests'],
    ['wishlist.html','Wishlist'],['profile.html','Profile'],['community.html','Community'],
    ['report.html','Report'],['rules.html','Rules']
  ];
  function setupNav(){
    const header=document.querySelector('header'), nav=document.querySelector('header nav');
    if(!header||!nav)return;
    nav.querySelectorAll('a').forEach(a=>{
      const href=(a.getAttribute('href')||'').split('#')[0];
      if(href===page || (page==='index.html'&&href==='index.html')){
        a.classList.add('active');a.setAttribute('aria-current','page');
      }
    });
    if(!document.querySelector('.ssMobileMenu')){
      const btn=document.createElement('button');
      btn.className='ssMobileMenu';btn.type='button';btn.setAttribute('aria-label','Open menu');btn.textContent='☰';
      btn.addEventListener('click',()=>mobile.classList.toggle('open'));
      header.insertBefore(btn,header.querySelector('.notifyWrap')||header.lastElementChild);
    }
    if(!document.querySelector('.ssMobileNav')){
      const mobile=document.createElement('div');mobile.className='ssMobileNav';
      mobile.innerHTML=links.map(([href,label])=>'<a href="'+href+'">'+label+'</a>').join('');
      document.body.appendChild(mobile);
      mobile.addEventListener('click',e=>{if(e.target.matches('a'))mobile.classList.remove('open')});
    }
  }
  function setupDiscord(){
    const a=document.getElementById('discordLink');
    if(a&&!a.getAttribute('href'))a.href=window.SPRITESWAP_DISCORD_INVITE||'https://discord.gg/kS5Xf35Vf';
  }
  function hardenImages(){
    document.querySelectorAll('img').forEach(img=>{
      if(!img.hasAttribute('loading'))img.loading='lazy';
      if(!img.hasAttribute('decoding'))img.decoding='async';
      img.addEventListener('error',function(){
        if(this.dataset.ssFallback)return;
        this.dataset.ssFallback='1';
        this.style.opacity='.2';
        this.alt=(this.alt||'Sprite')+' image unavailable';
      },{once:true});
    });
  }
  function fixBrokenInternalLinks(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const h=a.getAttribute('href');
      if(!h||h.startsWith('#')||/^(https?:|mailto:|javascript:)/i.test(h))return;
      if(h==='index.html#index')a.href='index-page.html';
    });
  }
  function addEscape(){
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        document.querySelectorAll('.notificationPanel.show').forEach(x=>x.classList.remove('show'));
        const m=document.getElementById('modalOverlay');if(m)m.classList.remove('show');
        document.querySelector('.ssMobileNav.open')?.classList.remove('open');
      }
    });
  }
  function loadV40(){
    if(document.querySelector('script[data-ss-v40]'))return;
    const s=document.createElement('script');s.src='v40-vibrant.js';s.dataset.ssV40='1';s.defer=true;document.head.appendChild(s);
  }
  function cacheBustSW(){
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('sw.js?v=39',{updateViaCache:'none'}).then(reg=>reg.update()).catch(()=>{});
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    setupNav();setupDiscord();hardenImages();fixBrokenInternalLinks();addEscape();loadV40();cacheBustSW();
    document.documentElement.dataset.ssVersion='39';
  });
})();