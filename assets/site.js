
(function(){
 var b=document.querySelector('.burger'),d=document.getElementById('drawer');
 function t(o){d.classList.toggle('open',o);b.setAttribute('aria-expanded',o)}
 b&&b.addEventListener('click',function(){t(true)});d&&d.querySelector('.x').addEventListener('click',function(){t(false)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape')t(false)});
 var els=[].slice.call(document.querySelectorAll('.reveal'));
 if('IntersectionObserver' in window){els.forEach(function(el){if(el.getBoundingClientRect().top>innerHeight)el.classList.add('pre')});
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.remove('pre');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){io.observe(el)})}
 var f=document.getElementById('lead');
 if(f){var q=new URLSearchParams(location.search);if(q.get('unit'))f.unit.value=q.get('unit');if(q.get('plan'))f.plan.value=q.get('plan');
  f.addEventListener('submit',function(ev){ev.preventDefault();
   if(!f.name.value.trim()||!f.phone.value.trim()||!document.getElementById('f-consent').checked){f.reportValidity();return}
   var data=Object.fromEntries(new FormData(f).entries());data.page=location.pathname;data.ts=new Date().toISOString();
   data.consent='true';
   var send=f.querySelector('.send'),err=f.querySelector('.err'),ok=f.querySelector('.ok');
   var fail=function(){send.disabled=false;err.hidden=false};
   send.disabled=true;err.hidden=true;
   fetch(f.dataset.endpoint,{method:'POST',headers:{'Content-Type':'application/json','apikey':f.dataset.key},body:JSON.stringify({payload:data})}).then(function(r){if(!r.ok)return fail();send.hidden=true;ok.hidden=false},fail)
  })}
})();
