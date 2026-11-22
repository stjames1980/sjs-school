/* SJS App – side menu for every page.
   Computer / tablet (1100 px and wider): the menu stays open on the left.
   Phone: the "☰ Menu" button opens it from the left.
   Each page keeps its own screens and rules; this file only adds the menu. */
(function(){
if(window.SJSNav)return;
var WIDE=1100;
var CSS='\
#sjsnav{position:fixed;left:0;top:0;bottom:0;width:256px;z-index:1000;background:linear-gradient(180deg,#0f2240 0%,#13294b 55%,#16305a 100%);color:#dfe6f3;display:flex;flex-direction:column;font:500 14px/1.35 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;transform:translateX(-105%);transition:transform .22s ease;box-shadow:4px 0 24px rgba(8,18,40,.25)}\
#sjsnav.open{transform:none}\
#sjsnav *{box-sizing:border-box}\
.sjsn-top{display:flex;align-items:center;gap:10px;padding:16px 14px 14px;border-bottom:1px solid rgba(255,255,255,.09)}\
.sjsn-top img{width:42px;height:42px;border-radius:50%;background:#fff;flex:none;object-fit:contain}\
.sjsn-top b{display:block;color:#fff;font-size:14.5px;font-weight:800;letter-spacing:.2px;line-height:1.2}\
.sjsn-top span{display:block;font-size:11px;color:#c9a227;font-weight:700;letter-spacing:.6px;text-transform:uppercase;margin-top:2px}\
.sjsn-x{margin-left:auto;background:rgba(255,255,255,.08);border:0;color:#fff;width:32px;height:32px;border-radius:9px;font-size:16px;cursor:pointer;flex:none}\
.sjsn-list{flex:1;overflow-y:auto;padding:8px 10px 14px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.2) transparent}\
.sjsn-h{font-size:10.5px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;color:#8ea0bf;padding:14px 10px 6px}\
.sjsn-a{display:flex;align-items:center;gap:11px;width:100%;padding:9px 10px;margin:1px 0;border-radius:10px;color:#dfe6f3;text-decoration:none;background:none;border:0;text-align:left;font:inherit;cursor:pointer}\
.sjsn-a:hover{background:rgba(255,255,255,.07);color:#fff}\
.sjsn-a .i{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:rgba(255,255,255,.07);font-size:15px;flex:none}\
.sjsn-a.act{background:#fff;color:#13294b;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,.18)}\
.sjsn-a.act .i{background:#f3e4ad}\
.sjsn-sub{margin:2px 0 6px 25px;padding-left:12px;border-left:2px solid rgba(201,162,39,.45)}\
.sjsn-s{display:block;width:100%;text-align:left;background:none;border:0;color:#c3cde0;font:500 13px/1.3 inherit;font-family:inherit;padding:7px 10px;border-radius:8px;cursor:pointer}\
.sjsn-s:hover{background:rgba(255,255,255,.07);color:#fff}\
.sjsn-s.act{color:#13294b;background:#f3e4ad;font-weight:700}\
.sjsn-foot{padding:10px 14px 14px;border-top:1px solid rgba(255,255,255,.09);font-size:11.5px;color:#9fb0cc}\
.sjsn-foot b{color:#fff;font-weight:700}\
#sjsn-scrim{position:fixed;inset:0;background:rgba(8,16,34,.45);z-index:999;display:none}\
#sjsn-scrim.on{display:block}\
#sjsn-btn{position:fixed;right:10px;bottom:18px;z-index:998;background:#13294b;color:#fff;border:0;font:700 13px/1 system-ui,-apple-system,"Segoe UI",sans-serif;padding:11px 15px;border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,.25);cursor:pointer}\
.sjs-home{display:none!important}\
@media (min-width:'+WIDE+'px){\
 #sjsnav{transform:none;box-shadow:none}\
 .sjsn-x,#sjsn-btn,#sjsn-scrim{display:none!important}\
 body{padding-left:256px!important}\
 .savebar,nav.tabs,.tabs,#sync{left:256px!important}\
 body.sjsn-hidenav .nav{display:none!important}\
}\
@media print{#sjsnav,#sjsn-btn,#sjsn-scrim{display:none!important}body{padding-left:0!important}}';
function get(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function page(){var p=location.pathname.split('/').pop();return p&&p.indexOf('.html')>0?p:'index.html'}
function items(){var r=get('sjs-nav-role')||{},staff=r.staff!==false,cv=!!r.canView,ad=!!r.isAdmin,L=[];
  L.push({h:'Main'},{u:'index.html#home',t:'Home',i:'🏠'},{u:'index.html#me',t:'Teacher Attendance',i:'✅'},{u:'index.html#notices',t:'Notices',i:'📢'});
  L.push({h:'Academics'});if(staff)L.push({u:'attendance.html',t:'Student Attendance',i:'🧑‍🎓'});L.push({u:'timetable.html',t:'Time Table',i:'🗓️'});if(staff)L.push({u:'marks.html',t:'Exams and Results',i:'📝',sub:1});
  L.push({h:'Events'},{u:'https://stjames1980.github.io/sjs-sports/',t:'Sports Meet',i:'🏆'});
  if(staff)L.push({h:'School Diary'},{u:'school.html#hw',t:'Homework',i:'📚'},{u:'school.html#exam',t:'Exams',i:'✍️'},{u:'school.html#cal',t:'Calendar',i:'📆'},{u:'school.html#fees',t:'Fee Status',i:'💰'});
  if(cv||ad){L.push({h:ad?'Admin':'Management'},{u:'index.html#dash',t:'Dashboard',i:'📊'},{u:'index.html#classes',t:'All Classes',i:'🏫'},{u:'index.html#leave',t:'Leave',i:'🗒️'});if(ad)L.push({u:'index.html#teachers',t:'Teachers',i:'👥'});L.push({u:'index.html#register',t:'Register',i:'📅'},{u:'index.html#report',t:'Teacher Report',i:'👤'});if(ad)L.push({u:'index.html#settings',t:'Settings',i:'⚙️'})}
  return L}
function isAct(u){var f=u.split('#')[0],h=u.split('#')[1]||'',p=page();if(f!==p)return false;if(!h)return true;var cur=location.hash.slice(1).split('&')[0];
  if(p==='index.html')return h===(cur||'home');if(p==='school.html')return h===(cur||'hw');return h===cur}
var nav,scrim,btn;
function close(){if(nav)nav.classList.remove('open');if(scrim)scrim.classList.remove('on')}
function open(){render();nav.classList.add('open');scrim.classList.add('on')}
function render(){if(!nav)return;var r=get('sjs-nav-role')||{},sub=window.SJSNAV_SUB,h='';
  items().forEach(function(x){if(x.h){h+='<div class="sjsn-h">'+esc(x.h)+'</div>';return}var a=isAct(x.u);
    h+='<a class="sjsn-a'+(a?' act':'')+'" href="'+x.u+'" data-u="'+x.u+'"><span class="i">'+x.i+'</span><span>'+esc(x.t)+'</span></a>';
    if(x.sub&&a&&sub&&sub.items&&sub.items.length)h+='<div class="sjsn-sub">'+sub.items.map(function(s){return '<button class="sjsn-s'+(s[0]===sub.act?' act':'')+'" data-s="'+esc(s[0])+'">'+esc(s[1])+'</button>'}).join('')+'</div>'});
  nav.querySelector('.sjsn-list').innerHTML=h;
  nav.querySelector('.sjsn-top b').textContent=r.school||'St. James H.S. School';
  nav.querySelector('.sjsn-foot').innerHTML=(r.session?'Session <b>'+esc(r.session)+'</b><br>':'')+(r.user?'Signed in: <b>'+esc(r.user)+'</b>':'SJS App');
  nav.querySelectorAll('.sjsn-a').forEach(function(a){a.onclick=function(e){var u=a.dataset.u,f=u.split('#')[0],hs=u.split('#')[1];
    if(f===page()&&hs!==undefined){e.preventDefault();close();if(location.hash.slice(1)!==hs)location.hash=hs;else window.dispatchEvent(new HashChangeEvent('hashchange'));setTimeout(render,50);return}
    if(f===page()&&!hs){e.preventDefault();close();window.scrollTo(0,0);return}}});
  nav.querySelectorAll('.sjsn-s').forEach(function(b){b.onclick=function(){close();if(sub&&sub.go)sub.go(b.dataset.s);setTimeout(render,80)}})}
function init(){if(document.getElementById('sjsnav'))return;var st=document.createElement('style');st.id='sjsnav-css';st.textContent=CSS;document.head.appendChild(st);
  nav=document.createElement('aside');nav.id='sjsnav';nav.setAttribute('aria-label','Menu');
  nav.innerHTML='<div class="sjsn-top"><img src="logo.png" alt="" onerror="this.style.visibility=\'hidden\'"><div><b>St. James H.S. School</b><span>SJS App</span></div><button class="sjsn-x" aria-label="Close menu">✕</button></div><nav class="sjsn-list"></nav><div class="sjsn-foot"></div>';
  scrim=document.createElement('div');scrim.id='sjsn-scrim';btn=document.createElement('button');btn.id='sjsn-btn';btn.textContent='☰ Menu';
  var p=page();if(p==='attendance.html'||p==='timetable.html')btn.style.bottom='84px';
  if(p==='index.html'||p==='marks.html'||p==='school.html')document.body.classList.add('sjsn-hidenav');
  document.body.appendChild(nav);document.body.appendChild(scrim);document.body.appendChild(btn);
  btn.onclick=open;scrim.onclick=close;nav.querySelector('.sjsn-x').onclick=close;
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  window.addEventListener('hashchange',function(){setTimeout(render,30)});
  render()}
window.SJSNav={refresh:function(){render()},open:function(){open()},close:close};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
