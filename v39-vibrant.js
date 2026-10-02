/* SpriteSwap V39 — visual refresh + logo + index resilience */
(function(){
  "use strict";
  function ensureImgTag(){
    if(typeof window.imgTag==="function" || typeof window.spriteIcon!=="function")return;
    window.imgTag=function(name,cls=""){const src=window.spriteIcon(name);return '<img class="'+(cls||'')+'" src="'+src+'" alt="'+String(name).replace(/[&<>\\\"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\\\"":"&quot;","'":"&#39;"}[m]))+'" loading="lazy" decoding="async">'};
  }
  function loadCSS(){
    if(document.querySelector('link[data-ss-v39]'))return;
    const l=document.createElement("link");
    l.rel="stylesheet";l.href="v39-vibrant.css";l.dataset.ssV39="1";
    document.head.appendChild(l);
  }
  function refreshLogo(){
    document.querySelectorAll("a.logo").forEach(a=>{
      if(a.dataset.ssLogo==="1")return;
      a.dataset.ssLogo="1";
      a.innerHTML='<span class="ssLogoMark" aria-hidden="true">S</span><span class="ssLogoWord">SPRITE<span>SWAP</span></span>';
      a.setAttribute("aria-label","SpriteSwap home");
    });
  }
  function fixIndexStats(){
    const total=window.TOTAL_SPRITES||145;
    const shown=document.getElementById("indexShown");
    if(shown&&!shown.textContent.trim())shown.textContent=total;
  }
  function upgrade(){
    ensureImgTag();loadCSS();refreshLogo();fixIndexStats();
    document.documentElement.dataset.ssVersion="39";
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",upgrade);
  else upgrade();
})();