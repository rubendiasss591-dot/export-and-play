export const META_PIXEL_ID = "1429266975807753";

export const metaPixelScript = String.raw`
!function(){
  var pixelId='${META_PIXEL_ID}';
  var optOutKey='serena_meta_ads_opt_out';
  var regionKey='serena_visitor_region';
  var consentRegions=new Set(['AT','BE','BG','BR','CA','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GB','GR','HR','HU','IE','IS','IT','LI','LT','LU','LV','MT','NL','NO','PL','PT','RO','SE','SI','SK']);
  function optedOut(){
    try{return localStorage.getItem(optOutKey)==='true'||navigator.globalPrivacyControl===true}catch(e){return true}
  }
  function install(){
    if(optedOut()||window.fbq)return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',pixelId);
    fbq('track','PageView');
  }
  function decide(loc){
    if(!loc||loc==='XX'||loc==='T1'||consentRegions.has(loc)||optedOut())return;
    install();
  }
  try{
    var cached=sessionStorage.getItem(regionKey);
    if(cached){decide(cached);return}
  }catch(e){}
  var controller=new AbortController();
  var timer=setTimeout(function(){controller.abort()},2000);
  fetch('/cdn-cgi/trace',{cache:'no-store',signal:controller.signal})
    .then(function(response){if(!response.ok)throw new Error('region unavailable');return response.text()})
    .then(function(text){
      var match=text.match(/(?:^|\n)loc=([^\n]+)/);
      var loc=match&&match[1]?match[1].trim().toUpperCase():'XX';
      try{sessionStorage.setItem(regionKey,loc)}catch(e){}
      decide(loc);
    })
    .catch(function(){})
    .finally(function(){clearTimeout(timer)});
}();`;

type MetaPixelWindow = Window & {
  fbq?: (command: "track", event: "InitiateCheckout") => void;
};

export function trackInitiateCheckout() {
  (window as MetaPixelWindow).fbq?.("track", "InitiateCheckout");
}