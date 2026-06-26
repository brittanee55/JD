
(function(){
  function isPhonePortrait(){
    return window.matchMedia("(max-width: 768px) and (orientation: portrait)").matches;
  }
  function run(){
    var portal=document.querySelector(".mobile-atlas-portal");
    var main=document.querySelector("main");
    if(!portal||!main)return;
    document.body.classList.add("hka-homepage");
    if(!isPhonePortrait())return;
    Array.prototype.slice.call(main.children).forEach(function(el){
      if(el.classList && el.classList.contains("mobile-atlas-portal")) return;
      var cls=(el.className||"").toString().toLowerCase();
      var bg=window.getComputedStyle(el).backgroundImage;
      if(cls.match(/hero|home|splash|landing|atlas/) || (bg && bg!=="none")){
        el.classList.add("desktop-home-hero");
      }
    });
  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",run);}else{run();}
  window.addEventListener("resize",run);
  window.addEventListener("orientationchange",function(){setTimeout(run,250);});
})();
