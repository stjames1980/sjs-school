/* SJS App – shared code for marks.html and school.html
   Sign-in, roles, classes and students come from the same Firebase project as the rest of SJS App. */
(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parse=s=>{const[y,m,d]=String(s).split('-').map(Number);return new Date(y,(m||1)-1,d||1)};
const todayISO=()=>{const n=new Date(Date.now()+(330+new Date().getTimezoneOffset())*60000);return iso(n)};
const fmtDate=s=>{if(!s)return'';const d=parse(s);return d.getDate()+' '+MONTHS[d.getMonth()].slice(0,3)+' '+d.getFullYear()};
const addDays=(s,n)=>{const d=parse(s);d.setDate(d.getDate()+n);return iso(d)};
let tt=null;function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2800)}
function sheet(html){closeSheet();const o=document.createElement('div');o.className='ov';o.id='ov';o.innerHTML=`<div class="sheet">${html}</div>`;o.onclick=e=>{if(e.target===o)closeSheet()};document.body.appendChild(o);return o}
function closeSheet(){const o=$('#ov');if(o)o.remove()}
function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function printHTML(title,body){const f=document.createElement('iframe');f.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0';document.body.appendChild(f);
  const d=f.contentWindow.document;d.open();d.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(title)}</title><style>
  @page{size:A4;margin:12mm}body{font-family:Arial,Helvetica,sans-serif;color:#111;font-size:12px}h1,h2,h3{margin:0}
  .ph{text-align:center;border-bottom:2px solid #13294b;padding-bottom:6px;margin-bottom:10px}.ph h1{font-size:18px;color:#13294b}.ph .s{font-size:11px}
  table{width:100%;border-collapse:collapse;margin-top:6px}th,td{border:1px solid #555;padding:4px 6px;text-align:center}th{background:#e8ecf3}
  td.l,th.l{text-align:left}.pb{page-break-after:always}.sig{display:flex;justify-content:space-between;margin-top:46px;font-size:12px}.sig div{border-top:1px solid #333;padding-top:4px;min-width:150px;text-align:center}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;margin:8px 0}.box{border:1px solid #555;padding:6px 8px;margin-top:8px}
  </style></head><body>${body}</body></html>`);d.close();
  setTimeout(()=>{try{f.contentWindow.focus();f.contentWindow.print()}catch(e){toast("Couldn't open print")}setTimeout(()=>f.remove(),60000)},400)}
function waPhone(p){let d=String(p||'').replace(/\D/g,'');if(d.length===11&&d[0]==='0')d=d.slice(1);if(d.length===10)d='91'+d;return d.length>=11&&d.length<=13?d:''}
function csvDownload(name,rows){const q=v=>{v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v};
  const b=new Blob(['﻿'+rows.map(r=>r.map(q).join(',')).join('\r\n')],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000)}
/* Paste from Excel: tab or comma separated rows */
function pasteRows(t){return String(t||'').split(/\r?\n/).map(l=>l.trim()).filter(Boolean).map(l=>(l.includes('\t')?l.split('\t'):l.split(',')).map(x=>x.trim()))}
const classLabel=k=>k?(k.cls||'–')+(k.section?' - '+k.section:''):'';
const normN=n=>String(n||'').toLowerCase().replace(/\b(sir|mdm|madam|ms|mrs|mr|miss|dr)\b\.?/g,' ').replace(/[^a-z]/g,'');

/* ---------- data layer: Firebase, or a demo store (?demo=1) for trying the screens ---------- */
function fbDB(fs){return{
  get:async p=>{const s=await fs.doc(p).get();return s.exists?s.data():null},
  list:async(c,o={})=>{let q=fs.collection(c);if(o.where)q=q.where(...o.where);if(o.order)q=q.orderBy(o.order);if(o.limit)q=q.limit(o.limit);const s=await q.get();return s.docs.map(d=>({id:d.id,...d.data()}))},
  set:(p,d,merge)=>fs.doc(p).set(d,merge?{merge:true}:{}),
  add:(c,d)=>fs.collection(c).add(d).then(r=>r.id),
  del:p=>fs.doc(p).delete(),
  watch:(p,cb)=>fs.doc(p).onSnapshot(s=>cb(s.exists?s.data():null),()=>cb(null)),
  watchList:(c,cb,o={})=>{let q=fs.collection(c);if(o.where)q=q.where(...o.where);if(o.order)q=q.orderBy(o.order);if(o.limit)q=q.limit(o.limit);return q.onSnapshot(s=>cb(s.docs.map(d=>({id:d.id,...d.data()}))),e=>{cb([]);if(e&&e.code==='permission-denied')toast('Permission problem – the Admin must update the Firestore rules.')})},
  now:()=>firebase.firestore.FieldValue.serverTimestamp()}}
function demoDB(){const K='sjs-demo-db';let D={};try{D=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
  const L=[];const save=()=>{try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}L.forEach(f=>f())};
  const kids=c=>Object.keys(D).filter(k=>k.startsWith(c+'/')&&!k.slice(c.length+1).includes('/')).map(k=>({id:k.split('/').pop(),...D[k]}));
  const filt=(r,o)=>{if(o.where){const[f,op,v]=o.where;r=r.filter(x=>op==='>='?x[f]>=v:op==='<='?x[f]<=v:op==='=='?x[f]===v:true)}if(o.order)r.sort((a,b)=>String(a[o.order]).localeCompare(String(b[o.order])));if(o.limit)r=r.slice(0,o.limit);return r};
  return{get:async p=>D[p]?JSON.parse(JSON.stringify(D[p])):null,list:async(c,o={})=>filt(kids(c),o),
    set:async(p,d,m)=>{D[p]=m?{...(D[p]||{}),...JSON.parse(JSON.stringify(d))}:JSON.parse(JSON.stringify(d));save()},
    add:async(c,d)=>{const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);D[c+'/'+id]=JSON.parse(JSON.stringify(d));save();return id},
    del:async p=>{delete D[p];save()},
    watch:(p,cb)=>{const f=()=>cb(D[p]?JSON.parse(JSON.stringify(D[p])):null);L.push(f);setTimeout(f);return()=>{}},
    watchList:(c,cb,o={})=>{const f=()=>cb(filt(kids(c),o));L.push(f);setTimeout(f);return()=>{}},
    now:()=>Date.now(),_seed:fn=>{if(!D._seeded){fn(D);D._seeded=1;save()}}}}

const SJS={$,esc,MONTHS,DOW,pad,iso,parse,todayISO,fmtDate,addDays,toast,sheet,closeSheet,printHTML,waPhone,csvDownload,pasteRows,classLabel,normN,
  db:null,user:null,isAdmin:false,role:'teacher',isStaff:false,canView:false,me:null,teachers:[],classes:[],school:{name:'ST. JAMES HIGHER SECONDARY SCHOOL',place:'Gongrai, Sepahijala, Tripura',session:'2026-2027'},
  myClasses(){return this.classes.filter(c=>(c.teacherUids||[]).includes(this.user&&this.user.uid))},
  canClass(cid){const c=this.classes.find(x=>x.id===cid);return this.isAdmin||!!(c&&(c.teacherUids||[]).includes(this.user&&this.user.uid))},
  async students(cid){const r=await this.db.list('c/'+cid+'/students');return r.sort((a,b)=>(+a.roll||0)-(+b.roll||0))},
  header(title){return `<div class="hdr"><div class="hdr-in"><img src="logo.png" alt=""><div><h1>${esc(title)}</h1><div class="s">${esc(this.school.name)} · ${esc(this.school.session)}</div></div><span class="who">${this.user?esc(this.me?this.me.name:(this.user.email||'').split('@')[0])+(this.isAdmin?' · Admin':this.role==='principal'?' · Principal':this.role==='exam'?' · Exam In-Charge':''):'Not signed in'}</span></div></div>`},
  printHead(sub){return `<div class="ph"><img src="${new URL('logo.png',location.href).href}" alt="" style="width:54px;height:54px;float:left"><h1>${esc(this.school.name)}</h1><div class="s">${esc(this.school.place)} · Session ${esc(this.school.session)}</div>${sub?`<h3 style="margin-top:4px">${esc(sub)}</h3>`:''}</div>`},
  async boot(title,onReady){
    document.body.insertAdjacentHTML('afterbegin','<div id="app"></div><a class="sjs-home" href="./">⌂ SJS Home</a>');
    const app=$('#app');app.innerHTML=this.header(title)+'<main><div class="empty">Loading…</div></main>';
    if(/[?&]demo=1/.test(location.search)){this.db=demoDB();this.user={uid:'demo-admin',email:'admin@demo'};this.isAdmin=true;this.isStaff=true;this.canView=true;this.role='admin';
      if(window.SJS_DEMO_SEED)this.db._seed(window.SJS_DEMO_SEED);await this.loadCommon();onReady();return}
    const cfg=window.SJS_FIREBASE;
    try{const b='https://www.gstatic.com/firebasejs/10.12.2/';await loadScript(b+'firebase-app-compat.js');await loadScript(b+'firebase-auth-compat.js');await loadScript(b+'firebase-firestore-compat.js');
      if(!firebase.apps.length)firebase.initializeApp(cfg);try{await firebase.firestore().enablePersistence({synchronizeTabs:true})}catch(e){}}
    catch(e){app.querySelector('main').innerHTML='<div class="card empty">Could not load. Check the internet and open again.</div>';return}
    const fs=firebase.firestore();this.db=fbDB(fs);
    firebase.auth().onAuthStateChanged(async u=>{this.user=u;
      if(!u){app.innerHTML=this.header(title)+'<main><div class="card empty">Please sign in on the SJS App Home screen first.<br><br><a class="btn pri" href="./">Go to SJS Home</a></div></main>';return}
      try{await fs.collection('att_links').limit(1).get();this.isAdmin=true}catch(e){this.isAdmin=false}
      let st=null;try{const r=await fs.doc('att_staff/'+u.uid).get();st=r.exists?r.data():null}catch(e){}
      this.role=this.isAdmin?'admin':(st&&st.role)||'teacher';this.isStaff=this.isAdmin||!!st;this.canView=this.isAdmin||this.role==='principal'||this.role==='exam';
      if(!this.isStaff){app.innerHTML=this.header(title)+'<main><div class="card empty">This opens after the Admin confirms you (SJS App → Teachers → Confirm).<br><br><a class="btn pri" href="./">Go to SJS Home</a></div></main>';return}
      await this.loadCommon();onReady()})},
  async loadCommon(){
    try{const tq=await this.db.list('att_teachers');this.teachers=tq.filter(t=>t.active!==false).sort((a,b)=>(a.order??999)-(b.order??999));this.me=tq.find(t=>t.uid===this.user.uid)||null}catch(e){}
    try{const cq=await this.db.list('classes');this.classes=cq.sort((a,b)=>(a.order||0)-(b.order||0)||String(a.cls).localeCompare(String(b.cls))||String(a.section).localeCompare(String(b.section)))}catch(e){}
    try{const m=await this.db.get('sjs_tt/main');if(m&&m.school)Object.assign(this.school,{name:m.school.name||this.school.name,place:m.school.place||this.school.place,session:m.school.session||this.school.session})}catch(e){}
    $('#app').querySelector('.hdr').outerHTML=this.header(document.title.split('–')[0].trim())}
};
window.SJS=SJS;
})();
