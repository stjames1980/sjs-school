/* SJS App – shared navigation for every page (version 2, Nov 2026; UFM Record added 28 Nov 2026).
   One look on every page:
   - Header bar: menu button (phone), logo, page title, your initials (account menu: name, role, refresh, sign out).
   - Phone / tablet: bottom bar with the 4 most-used places + More (opens the full menu).
   - Computer (1100 px and wider): the full menu stays open on the left; no bottom bar.
   - Each page's own sections (Mark / Dashboard / Students …) become a row of chips under the header.
   Each page keeps its own screens and rules; this file only changes the frame around them. */
(function(){
if(window.SJSNav)return;
var WIDE=1100;

/* ---------- line icons (one style everywhere) ---------- */
var IC={
 home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
 me:'<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/><path d="m16 11 2 2 4-4"/>',
 notice:'<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16.5 9a3.5 3.5 0 0 1 0 6"/><path d="M19.5 6.5a7.5 7.5 0 0 1 0 11"/>',
 students:'<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5"/><path d="M16 3.6a4 4 0 0 1 0 8.8"/><path d="M22 21c0-3-1.8-5.2-4.5-6"/>',
 tt:'<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M12 12.5v3.2l2.2 1.4"/>',
 marks:'<rect x="5" y="3.5" width="14" height="18" rx="2"/><path d="M9 3.5h6v3H9z"/><path d="m9 13.5 2 2 4-4"/>',
 cap:'<path d="M2 9.5 12 5l10 4.5-10 4.5z"/><path d="M6 11.3V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.7"/><path d="M22 9.5V15"/>',
 trophy:'<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>',
 book:'<path d="M2 5h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
 pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 cal:'<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01"/>',
 fee:'<path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 13.5h2"/>',
 dash:'<path d="M3 3v18h18"/><path d="M7.5 16v-4M12 16V8M16.5 16v-7"/>',
 school:'<path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M10 21v-5h4v5"/><path d="M12 10.5h.01"/>',
 leave:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
 staff:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c.6-1.5 1.8-2.3 3.2-2.3s2.6.8 3.2 2.3M15 10h3M15 13.5h3"/>',
 reg:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16"/>',
 report:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><circle cx="12" cy="13" r="2"/><path d="M8.5 18c.6-1.3 1.9-2 3.5-2s2.9.7 3.5 2"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
 menu:'<path d="M4 6.5h16M4 12h16M4 17.5h16"/>',
 more:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
 out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
 refresh:'<path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/>',
 x:'<path d="M18 6 6 18M6 6l12 12"/>',
 ext:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
 down:'<path d="m6 9 6 6 6-6"/>',
 login:'<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5M15 12H3"/>',
 shield:'<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M12 8v5M12 16h.01"/>'
};
function svg(k,s){return '<svg viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[k]||'')+'</svg>'}

/* ---------- styles ---------- */
var F='Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';
var CSS='\
:root{--sjs-h:56px;--sjs-st:env(safe-area-inset-top,0px);--sjs-sb:env(safe-area-inset-bottom,0px);--sjs-navy:#13294b;--sjs-deep:#0e203d;--sjs-gold:#c9a227;--sjs-line:#e3e8f0;--sjs-mut:#5d6b84}\
.sjs-home,#sjsn-btn{display:none!important}\
/* header bar */\
#sjsbar{position:sticky;top:0;z-index:35;display:flex;align-items:center;gap:10px;min-height:calc(var(--sjs-h) + var(--sjs-st));padding:var(--sjs-st) 10px 0 8px;box-sizing:border-box;background:linear-gradient(115deg,#0e203d 0%,#13294b 55%,#183463 100%);color:#fff;font-family:'+F+';box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 4px 18px rgba(9,20,45,.18)}\
#sjsbar *{box-sizing:border-box}\
#sjsbar .ib{width:40px;height:40px;flex:none;border:0;border-radius:12px;background:transparent;color:#fff;display:grid;place-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent}\
#sjsbar .ib:hover,#sjsbar .ib:focus-visible{background:rgba(255,255,255,.1);outline:none}\
#sjsbar .lg{width:34px;height:34px;flex:none;border-radius:50%;background:#fff;object-fit:contain;padding:1px;box-shadow:0 0 0 2px rgba(201,162,39,.7)}\
#sjsbar .tt{flex:1;min-width:0;line-height:1.2}\
#sjsbar .tt b{display:block;font-size:16.5px;font-weight:700;letter-spacing:.1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
#sjsbar .tt small{display:block;margin-top:2px;font-size:11.5px;font-weight:500;color:#b9c6dd;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
#sjsbar .slot{display:flex;align-items:center;gap:6px;margin-top:3px;min-width:0}\
#sjsbar .slot:empty{display:none}\
#sjsbar .slot>button,#sjsbar .slot>.classbtn{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:4px;max-width:100%;font:600 12px/1.2 '+F+';color:#fff;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:99px;padding:3px 10px;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
#sjsbar .slot>.pill-ro{font:700 10.5px/1 '+F+';background:#fde68a;color:#78350f;border-radius:99px;padding:4px 8px;white-space:nowrap}\
#sjsbar .av{position:relative;width:38px;height:38px;flex:none;border-radius:50%;border:2px solid rgba(255,255,255,.9);background:linear-gradient(135deg,#e0bd45,#c9a227);color:#13294b;font:800 13px/1 '+F+';cursor:pointer;display:grid;place-items:center;padding:0;letter-spacing:.3px}\
#sjsbar .av i{position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#22c55e;border:2px solid #13294b}\
#sjsbar .av i.off{background:#94a3b8}\
/* account menu */\
#sjsacc{position:fixed;z-index:1002;top:calc(var(--sjs-h) + var(--sjs-st) + 6px);right:10px;width:286px;max-width:calc(100vw - 20px);background:#fff;color:#1d2a40;border-radius:18px;box-shadow:0 18px 50px rgba(9,20,45,.28),0 0 0 1px rgba(19,41,75,.06);font-family:'+F+';overflow:hidden;transform-origin:top right;transform:scale(.96);opacity:0;pointer-events:none;transition:transform .14s ease,opacity .14s ease}\
#sjsacc.on{transform:none;opacity:1;pointer-events:auto}\
#sjsacc .hd{display:flex;gap:12px;align-items:center;padding:16px;background:linear-gradient(135deg,#f6f1df,#fbf8ee);border-bottom:1px solid #efe6c7}\
#sjsacc .big{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#183463,#13294b);color:#fff;display:grid;place-items:center;font:800 16px/1 '+F+';flex:none}\
#sjsacc .nm{font-weight:700;font-size:15px;line-height:1.25;word-break:break-word}\
#sjsacc .rl{display:inline-block;margin-top:4px;font-size:11px;font-weight:700;color:#13294b;background:#e8edf7;border-radius:99px;padding:3px 9px}\
#sjsacc .meta{padding:10px 16px;font-size:12px;color:var(--sjs-mut);border-bottom:1px solid var(--sjs-line);line-height:1.5}\
#sjsacc .meta b{color:#1d2a40}\
#sjsacc button,#sjsacc a.it{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:12px;width:100%;padding:12px 16px;font:600 14px/1.2 '+F+';color:#1d2a40;cursor:pointer}\
#sjsacc button:hover,#sjsacc a.it:hover{background:#f4f6fa}\
#sjsacc .danger{color:#b42318}\
#sjsacc-scrim{position:fixed;inset:0;z-index:1001;display:none}\
#sjsacc-scrim.on{display:block}\
/* page sections as chips */\
.sjs-chips{position:sticky!important;top:calc(var(--sjs-h) + var(--sjs-st))!important;bottom:auto!important;left:auto!important;right:auto!important;z-index:30!important;background:rgba(244,246,250,.94)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:0!important;border-bottom:1px solid var(--sjs-line)!important;box-shadow:none!important;padding:0!important;margin:0!important}\
.sjs-chips>.wrap,.sjs-chips>.in,.sjs-chips>.nav-in{display:flex!important;gap:8px!important;overflow-x:auto!important;scrollbar-width:none;padding:9px 12px!important;max-width:none!important;grid-template-columns:none!important;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 10px,#000 calc(100% - 28px),transparent);mask-image:linear-gradient(90deg,transparent 0,#000 10px,#000 calc(100% - 28px),transparent)}\
.sjs-chips>*::-webkit-scrollbar{display:none}\
.sjs-chips button{flex:none!important;display:inline-flex!important;flex-direction:row!important;align-items:center!important;gap:7px!important;padding:8px 14px!important;margin:0!important;border-radius:99px!important;border:1px solid var(--sjs-line)!important;background:#fff!important;color:#334155!important;font:600 13px/1.1 '+F+'!important;white-space:nowrap!important;box-shadow:0 1px 2px rgba(16,24,40,.04)!important;cursor:pointer;min-width:0!important;height:auto!important;width:auto!important}\
.sjs-chips button svg{width:17px!important;height:17px!important;flex:none}\
.sjs-chips button:after,.sjs-chips button:before{display:none!important}\
.sjs-chips button[aria-current="page"],.sjs-chips button.on,.sjs-chips button.act{background:var(--sjs-navy)!important;border-color:var(--sjs-navy)!important;color:#fff!important;box-shadow:0 3px 10px rgba(19,41,75,.25)!important}\
/* time table status line */\
.sjs-strip{display:flex;gap:6px;flex-wrap:wrap;padding:10px 12px 0;font-family:'+F+'}\
.sjs-strip .pill{background:#fff!important;color:#334155!important;border:1px solid var(--sjs-line)!important;font-size:11.5px!important;padding:5px 10px!important}\
.sjs-strip .pill.gold{background:#fbf3d5!important;border-color:#efe0a6!important;color:#7a5b00!important}\
/* phone bottom bar */\
#sjstab{position:fixed;left:0;right:0;bottom:0;z-index:35;display:grid;grid-template-columns:repeat(5,1fr);padding:6px 4px calc(6px + var(--sjs-sb));background:rgba(255,255,255,.97);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-top:1px solid var(--sjs-line);box-shadow:0 -6px 22px rgba(15,34,64,.07);font-family:'+F+'}\
#sjstab a,#sjstab button{all:unset;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:11px;font-weight:600;color:var(--sjs-mut);cursor:pointer;-webkit-tap-highlight-color:transparent;text-align:center;min-width:0}\
#sjstab .ic{width:54px;height:30px;border-radius:99px;display:grid;place-items:center;transition:background .15s}\
#sjstab span.l{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}\
#sjstab .act{color:var(--sjs-navy);font-weight:800}\
#sjstab .act .ic{background:#e6ecf7}\
#sjstab .act svg{stroke-width:2.2}\
body.sjs-shell{padding-bottom:calc(70px + var(--sjs-sb))}\
/* side menu */\
#sjsnav{position:fixed;left:0;top:0;bottom:0;width:272px;max-width:86vw;z-index:1000;background:linear-gradient(180deg,#0e203d 0%,#13294b 60%,#16305a 100%);color:#dce4f2;display:flex;flex-direction:column;font:500 14px/1.35 '+F+';transform:translateX(-105%);transition:transform .22s ease;box-shadow:6px 0 30px rgba(8,18,40,.3);padding-top:var(--sjs-st)}\
#sjsnav.open{transform:none}\
#sjsnav *{box-sizing:border-box}\
.sjsn-top{display:flex;align-items:center;gap:11px;padding:16px 14px 14px}\
.sjsn-top img{width:44px;height:44px;border-radius:50%;background:#fff;flex:none;object-fit:contain;padding:1px;box-shadow:0 0 0 2px rgba(201,162,39,.7)}\
.sjsn-top b{display:block;color:#fff;font-size:14.5px;font-weight:800;line-height:1.2}\
.sjsn-top span{display:block;font-size:10.5px;color:var(--sjs-gold);font-weight:800;letter-spacing:1px;text-transform:uppercase;margin-top:3px}\
.sjsn-x{margin-left:auto;background:rgba(255,255,255,.08);border:0;color:#fff;width:34px;height:34px;border-radius:10px;cursor:pointer;flex:none;display:grid;place-items:center}\
.sjsn-me{display:flex;align-items:center;gap:10px;margin:0 12px 6px;padding:10px 12px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);cursor:pointer}\
.sjsn-me .a{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#e0bd45,#c9a227);color:#13294b;font:800 12px/1 '+F+';display:grid;place-items:center;flex:none}\
.sjsn-me b{display:block;color:#fff;font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\
.sjsn-me small{display:block;color:#9fb0cc;font-size:11.5px}\
.sjsn-list{flex:1;overflow-y:auto;padding:4px 10px 14px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.18) transparent}\
.sjsn-h{font-size:10.5px;font-weight:800;letter-spacing:1.3px;text-transform:uppercase;color:#7f93b5;padding:14px 10px 6px}\
.sjsn-a{display:flex;align-items:center;gap:12px;width:100%;padding:9px 10px;margin:1px 0;border-radius:12px;color:#dce4f2;text-decoration:none;background:none;border:0;text-align:left;font:inherit;cursor:pointer}\
.sjsn-a:hover{background:rgba(255,255,255,.07);color:#fff}\
.sjsn-a svg{flex:none;opacity:.92}\
.sjsn-a .e{margin-left:auto;opacity:.5}\
.sjsn-a.act{background:#fff;color:#13294b;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.2)}\
.sjsn-a.act svg{color:#a07c0c;opacity:1}\
.sjsn-sub{margin:4px 0 8px 21px;padding-left:12px;border-left:2px solid rgba(201,162,39,.45)}\
.sjsn-s{display:block;width:100%;text-align:left;background:none;border:0;color:#c3cde0;font:500 13px/1.3 '+F+';padding:7px 10px;border-radius:9px;cursor:pointer}\
.sjsn-s:hover{background:rgba(255,255,255,.07);color:#fff}\
.sjsn-s.act{color:#13294b;background:#f3e4ad;font-weight:700}\
.sjsn-foot{padding:10px 12px calc(12px + var(--sjs-sb));border-top:1px solid rgba(255,255,255,.08);display:flex;gap:8px}\
.sjsn-foot button{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#dce4f2;border-radius:11px;padding:9px 6px;font:600 12.5px/1 '+F+';cursor:pointer}\
.sjsn-foot button:hover{background:rgba(255,255,255,.1);color:#fff}\
.sjsn-foot .so{color:#fecaca;border-color:rgba(254,202,202,.25)}\
#sjsn-scrim{position:fixed;inset:0;background:rgba(8,16,34,.5);z-index:999;display:none;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}\
#sjsn-scrim.on{display:block}\
#sjstoast{position:fixed;left:50%;bottom:calc(86px + var(--sjs-sb));transform:translateX(-50%);z-index:1003;background:#13294b;color:#fff;font:600 13px/1.3 '+F+';padding:10px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.25);display:none}\
/* each page: hide its old header, keep its fixed bars clear of the bottom bar */\
.sjs-p-index body>header.hdr,body.sjs-p-index>header.hdr,body.sjs-p-index>nav.nav{display:none!important}\
body.sjs-p-attendance header.top{display:none!important}\
body.sjs-p-timetable .app>header.hdr{display:none!important}\
body.sjs-p-marks #app>.hdr,body.sjs-p-school #app>.hdr{display:none!important}\
body.sjs-p-index .savebar{bottom:calc(64px + var(--sjs-sb))!important}\
body.sjs-p-index .toast{bottom:calc(86px + var(--sjs-sb))!important}\
body.sjs-p-attendance .savebar{bottom:calc(64px + var(--sjs-sb))!important}\
body.sjs-p-marks #sync,body.sjs-p-school #sync{bottom:calc(76px + var(--sjs-sb))!important}\
body.sjs-p-attendance main{padding-bottom:calc(90px + var(--sjs-sb))!important}\
body.sjs-p-timetable .app{padding-bottom:12px!important}\
body.sjs-p-attendance #sjstab{background:var(--surface,#fff);border-top-color:var(--line,#e3e8f0)}\
@media (min-width:'+WIDE+'px){\
 #sjsnav{transform:none;box-shadow:none;max-width:none;padding-top:0}\
 .sjsn-x,#sjstab,#sjsn-scrim,#sjsbar .menu{display:none!important}\
 body.sjs-shell{padding-left:272px!important;padding-bottom:0!important}\
 #sjsbar{padding-left:22px;padding-right:18px}\
 #sjsbar .lg{display:none}\
 #sjsbar .tt b{font-size:18px}\
 .savebar,#sync{left:272px!important}\
 body.sjs-shell .savebar{bottom:0!important}\
 body.sjs-p-marks #sync,body.sjs-p-school #sync{bottom:18px!important}\
 body.sjs-p-attendance main{padding-bottom:80px!important}\
 body.sjs-p-marks #app>.nav,body.sjs-p-school #app>.nav{display:none!important}\
 .sjs-chips>.wrap,.sjs-chips>.in,.sjs-chips>.nav-in{padding:10px 22px!important}\
 #sjstoast{bottom:24px}\
}\
@media print{#sjsnav,#sjsbar,#sjstab,#sjsn-scrim,#sjsacc,#sjsacc-scrim,.sjs-chips,.sjs-strip{display:none!important}body.sjs-shell{padding:0!important}}';

/* ---------- data ---------- */
function get(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function page(){var p=location.pathname.split('/').pop();return p&&p.indexOf('.html')>0?p:'index.html'}
function role(){return get('sjs-nav-role')||{}}
function roleName(r){return r.isAdmin||r.role==='admin'?'Admin':r.role==='principal'?'Principal':r.role==='exam'?'Exam In-Charge':r.user?'Teacher':'Not signed in'}
function initials(r){var n=String(r.name||r.user||'').replace(/@.*/,'').trim();if(!n)return '?';
  var w=n.replace(/^(sir|pu|pi|mr|mrs|ms|miss|dr|rev)\.?\s+/i,'').split(/\s+/).filter(Boolean);
  if(w.length>1)return (w[0][0]+w[w.length-1][0]).toUpperCase();if(w.length===1&&/^[a-z]/i.test(w[0])&&!/\d/.test(w[0]))return w[0][0].toUpperCase();return n.slice(0,2).toUpperCase()}
function items(){var r=role(),staff=r.staff!==false,cv=!!r.canView,ad=!!r.isAdmin,L=[];
  L.push({h:'Main'},{u:'index.html#home',t:'Home',i:'home'},{u:'index.html#me',t:'Teacher Attendance',i:'me'},{u:'index.html#notices',t:'Notices',i:'notice'});
  L.push({h:'Academics'});if(staff)L.push({u:'attendance.html',t:'Student Attendance',i:'students'});L.push({u:'timetable.html',t:'Time Table',i:'tt'});if(staff)L.push({u:'marks.html',t:'Exams and Results',i:'marks',sub:1});if(cv||ad)L.push({u:'ufm.html',t:'UFM Record',i:'shield'});
  if(staff)L.push({h:'School Diary'},{u:'school.html#hw',t:'Homework',i:'book'},{u:'school.html#exam',t:'Exams',i:'pen'},{u:'school.html#cal',t:'Calendar',i:'cal'},{u:'school.html#fees',t:'Fee Status',i:'fee'});
  L.push({h:'Events'},{u:'https://stjames1980.github.io/sjs-sports/',t:'Sports Meet',i:'trophy',ext:1});
  if(staff)L.push({u:'https://stjames1980.github.io/sjs-entrance/',t:'Entrance Test',i:'cap',ext:1});
  if(cv||ad){L.push({h:ad?'Admin':'Management'},{u:'index.html#dash',t:'Dashboard',i:'dash'},{u:'index.html#classes',t:'All Classes',i:'school'},{u:'index.html#leave',t:'Leave',i:'leave'});if(ad)L.push({u:'index.html#teachers',t:'Teachers',i:'staff'});L.push({u:'index.html#register',t:'Register',i:'reg'},{u:'index.html#report',t:'Teacher Report',i:'report'});if(ad)L.push({u:'index.html#settings',t:'Settings',i:'gear'})}
  return L}
function tabsFor(){var r=role(),staff=r.staff!==false;
  if(!staff)return[{u:'index.html#home',t:'Home',i:'home'},{u:'index.html#me',t:'Attendance',i:'me'},{u:'timetable.html',t:'Time Table',i:'tt'},{u:'index.html#notices',t:'Notices',i:'notice'}];
  return[{u:'index.html#home',t:'Home',i:'home'},{u:'attendance.html',t:'Attendance',i:'students'},{u:'timetable.html',t:'Time Table',i:'tt'},{u:'marks.html',t:(r.canView||r.isAdmin)?'Results':'Marks',i:'marks'}]}
function isAct(u){var f=u.split('#')[0],h=u.split('#')[1]||'',p=page();if(f!==p)return false;if(!h)return true;var cur=location.hash.slice(1).split('&')[0];
  if(p==='index.html')return h===(cur||'home');if(p==='school.html')return h===(cur||'hw');return h===cur}
var TITLE={'ufm.html':'UFM Record','attendance.html':'Student Attendance','timetable.html':'Time Table','marks.html':'Exams and Results','school.html':'School Diary','index.html':'Home'};
function title(){var p=page(),t=TITLE[p]||'SJS App';if(p==='index.html'||p==='school.html'){items().forEach(function(x){if(x.u&&isAct(x.u))t=x.t})}return t}

/* ---------- build ---------- */
var nav,scrim,bar,tab,acc,accS,toastT;
function toast(m){var t=document.getElementById('sjstoast');if(!t)return;t.textContent=m;t.style.display='block';clearTimeout(toastT);toastT=setTimeout(function(){t.style.display='none'},2600)}
function close(){if(nav)nav.classList.remove('open');if(scrim)scrim.classList.remove('on')}
function open(){render();nav.classList.add('open');scrim.classList.add('on')}
function accClose(){if(acc){acc.classList.remove('on');accS.classList.remove('on')}}
function accOpen(){renderAcc();close();acc.classList.add('on');accS.classList.add('on')}
function signOut(){accClose();close();
  if(window.SJSsignOut)return window.SJSsignOut();
  if(!confirm('Sign out of the SJS App?'))return;
  Promise.resolve().then(function(){if(window.firebase&&firebase.apps&&firebase.apps.length)return firebase.auth().signOut()}).catch(function(){}).then(function(){try{localStorage.removeItem('sjs-nav-role')}catch(e){}location.href='./'})}
function refreshApp(){accClose();close();if(!navigator.onLine){toast('Connect to the internet first, then refresh.');return}
  toast('Getting the newest version…');
  var jobs=[];try{if(navigator.serviceWorker)jobs.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.update()}))}))}catch(e){}
  try{if(window.caches)jobs.push(caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}))}catch(e){}
  Promise.all(jobs).catch(function(){}).then(function(){location.reload()})}
function renderAcc(){if(!acc)return;var r=role(),signed=!!r.user;
  acc.innerHTML='<div class="hd"><div class="big">'+esc(initials(r))+'</div><div style="min-width:0"><div class="nm">'+esc(signed?(r.name||r.user):'Not signed in')+'</div><span class="rl">'+esc(roleName(r))+'</span></div></div>'+
   '<div class="meta"><b>'+esc(r.school||'St. James H.S. School')+'</b>'+(r.session?'<br>Session '+esc(r.session):'')+(signed&&r.name&&r.user&&r.name!==r.user?'<br>Staff ID: '+esc(r.user):'')+'<br>'+(navigator.onLine?'● Online':'○ Offline – saved on this phone')+'</div>'+
   '<button type="button" data-a="refresh">'+svg('refresh',19)+'Refresh app (get newest version)</button>'+
   (signed?'<button type="button" class="danger" data-a="out">'+svg('out',19)+'Sign out</button>':'<a class="it" href="./">'+svg('login',19)+'Sign in</a>');
  acc.querySelectorAll('[data-a]').forEach(function(b){b.onclick=function(){b.dataset.a==='out'?signOut():refreshApp()}})}
function renderBar(){if(!bar)return;var r=role();
  var tb=bar.querySelector('.tt b'),tv=title();if(tb.textContent!==tv)tb.textContent=tv;
  var sm=bar.querySelector('.tt small'),slot=bar.querySelector('.slot'),sv=(r.school||'St. James H.S. School')+(r.session?' · '+r.session:'');
  if(sm.textContent!==sv)sm.textContent=sv;var sd=slot.children.length?'none':'';if(sm.style.display!==sd)sm.style.display=sd;
  var av=bar.querySelector('.av'),iv=initials(r);if(av.firstChild.nodeValue!==iv)av.firstChild.nodeValue=iv;av.title=(r.name||r.user||'Account')+' · '+roleName(r);
  var dc=navigator.onLine?'':'off',dot=av.querySelector('i');if(dot.className!==dc)dot.className=dc}
function renderTabs(){if(!tab)return;var T=tabsFor(),on=false,h='';
  T.forEach(function(x){var a=isAct(x.u);if(a)on=true;h+='<a href="'+x.u+'" data-u="'+x.u+'" class="'+(a?'act':'')+'"'+(a?' aria-current="page"':'')+'><span class="ic">'+svg(x.i,22)+'</span><span class="l">'+esc(x.t)+'</span></a>'});
  h+='<button type="button" class="'+(on?'':'act')+'" data-more="1"><span class="ic">'+svg('more',22)+'</span><span class="l">More</span></button>';
  tab.innerHTML=h;tab.querySelector('[data-more]').onclick=open;wireLinks(tab,'a[data-u]')}
function wireLinks(root,sel){root.querySelectorAll(sel).forEach(function(a){a.onclick=function(e){var u=a.dataset.u,f=u.split('#')[0],hs=u.split('#')[1];
    if(f===page()&&hs!==undefined){e.preventDefault();close();if(location.hash.slice(1)!==hs)location.hash=hs;else window.dispatchEvent(new HashChangeEvent('hashchange'));setTimeout(renderAll,50);return}
    if(f===page()&&!hs){e.preventDefault();close();window.scrollTo(0,0);return}}})}
function render(){if(!nav)return;var r=role(),sub=window.SJSNAV_SUB,h='';
  items().forEach(function(x){if(x.h){h+='<div class="sjsn-h">'+esc(x.h)+'</div>';return}var a=isAct(x.u);
    h+='<a class="sjsn-a'+(a?' act':'')+'" href="'+x.u+'" data-u="'+x.u+'"'+(x.ext?' target="_blank" rel="noopener"':'')+'>'+svg(x.i,20)+'<span>'+esc(x.t)+'</span>'+(x.ext?'<span class="e">'+svg('ext',15)+'</span>':'')+'</a>';
    if(x.sub&&a&&sub&&sub.items&&sub.items.length)h+='<div class="sjsn-sub">'+sub.items.map(function(s){return '<button class="sjsn-s'+(s[0]===sub.act?' act':'')+'" data-s="'+esc(s[0])+'">'+esc(String(s[1]).replace(/^[^\w(]+\s*/,''))+'</button>'}).join('')+'</div>'});
  nav.querySelector('.sjsn-list').innerHTML=h;
  nav.querySelector('.sjsn-top b').textContent=r.school||'St. James H.S. School';
  var me=nav.querySelector('.sjsn-me');me.innerHTML='<span class="a">'+esc(initials(r))+'</span><span style="min-width:0"><b>'+esc(r.user?(r.name||r.user):'Not signed in')+'</b><small>'+esc(roleName(r))+(r.session?' · '+esc(r.session):'')+'</small></span>';
  nav.querySelector('.sjsn-foot').innerHTML='<button type="button" data-a="refresh">'+svg('refresh',16)+'Refresh</button>'+(r.user?'<button type="button" class="so" data-a="out">'+svg('out',16)+'Sign out</button>':'<button type="button" data-a="in">'+svg('login',16)+'Sign in</button>');
  nav.querySelectorAll('.sjsn-foot [data-a]').forEach(function(b){b.onclick=function(){var a=b.dataset.a;if(a==='out')signOut();else if(a==='in')location.href='./';else refreshApp()}});
  wireLinks(nav,'.sjsn-a');
  nav.querySelectorAll('.sjsn-s').forEach(function(b){b.onclick=function(){close();if(sub&&sub.go)sub.go(b.dataset.s);setTimeout(renderAll,80)}})}
function renderAll(){render();renderBar();renderTabs();chips()}

/* each page's own section buttons become chips under the header */
function chips(){var p=page(),el=null;
  if(p==='attendance.html')el=document.querySelector('body>nav.tabs');
  else if(p==='timetable.html')el=document.querySelector('nav.tabs');
  else if(p==='marks.html'||p==='school.html')el=document.querySelector('#app>.nav');
  if(!el)return;if(!el.classList.contains('sjs-chips'))el.classList.add('sjs-chips');
  var a=el.querySelector('[aria-current="page"],.on,.act');if(a&&a!==el._last){el._last=a;try{var s=a.parentNode,l=a.offsetLeft-s.clientWidth/2+a.offsetWidth/2;s.scrollTo({left:Math.max(0,l),behavior:'smooth'})}catch(e){}}}
/* move page header pieces that still matter into the new bar */
function adopt(){var p=page(),slot=bar.querySelector('.slot');
  if(p==='attendance.html'){var sub=document.getElementById('hdrSub'),ro=document.getElementById('roPill');if(sub&&sub.parentNode!==slot)slot.appendChild(sub);if(ro&&ro.parentNode!==slot)slot.appendChild(ro);
    var t=document.querySelector('body>nav.tabs'),m=document.querySelector('body>main');if(t&&m&&t.nextElementSibling!==m)m.parentNode.insertBefore(t,m)}
  if(p==='timetable.html'){var app=document.querySelector('.app'),mn=document.getElementById('main'),pl=document.querySelector('.app>header.hdr .pills'),tb=document.querySelector('body>nav.tabs');
    if(app&&mn){if(tb)app.insertBefore(tb,mn);if(pl){var st=document.createElement('div');st.className='sjs-strip';st.appendChild(pl);app.insertBefore(st,mn);pl.style.margin='0'}}}}

function init(){if(document.getElementById('sjsnav'))return;var p=page();
  var st=document.createElement('style');st.id='sjsnav-css';st.textContent=CSS;document.head.appendChild(st);
  document.body.classList.add('sjs-shell','sjs-p-'+p.replace('.html',''));
  bar=document.createElement('header');bar.id='sjsbar';
  bar.innerHTML='<button class="ib menu" type="button" aria-label="Open menu">'+svg('menu',24)+'</button><img class="lg" src="logo.png" alt="" onerror="this.style.visibility=\'hidden\'"><div class="tt"><b></b><small></small><div class="slot"></div></div><button class="av" type="button" aria-label="Account">?<i></i></button>';
  document.body.insertBefore(bar,document.body.firstChild);
  nav=document.createElement('aside');nav.id='sjsnav';nav.setAttribute('aria-label','Menu');
  nav.innerHTML='<div class="sjsn-top"><img src="logo.png" alt="" onerror="this.style.visibility=\'hidden\'"><div><b>St. James H.S. School</b><span>SJS App</span></div><button class="sjsn-x" aria-label="Close menu">'+svg('x',18)+'</button></div><div class="sjsn-me"></div><nav class="sjsn-list"></nav><div class="sjsn-foot"></div>';
  scrim=document.createElement('div');scrim.id='sjsn-scrim';
  tab=document.createElement('nav');tab.id='sjstab';tab.setAttribute('aria-label','Main');
  acc=document.createElement('div');acc.id='sjsacc';accS=document.createElement('div');accS.id='sjsacc-scrim';
  var t=document.createElement('div');t.id='sjstoast';
  [nav,scrim,tab,accS,acc,t].forEach(function(x){document.body.appendChild(x)});
  bar.querySelector('.menu').onclick=open;bar.querySelector('.av').onclick=function(){acc.classList.contains('on')?accClose():accOpen()};
  scrim.onclick=close;accS.onclick=accClose;nav.querySelector('.sjsn-x').onclick=close;nav.querySelector('.sjsn-me').onclick=accOpen;
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){close();accClose()}});
  window.addEventListener('hashchange',function(){setTimeout(renderAll,30)});
  window.addEventListener('online',renderBar);window.addEventListener('offline',renderBar);
  window.addEventListener('storage',function(e){if(e.key==='sjs-nav-role')renderAll()});
  adopt();renderAll();
  /* pages redraw their own parts; keep the chips and title in step */
  var host=document.getElementById('app')||document.body,q=0;
  try{new MutationObserver(function(){if(q)return;q=1;requestAnimationFrame(function(){q=0;adopt();chips();renderBar()})}).observe(host,{childList:true,subtree:p==='marks.html'||p==='school.html'?false:true})}catch(e){}
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.sjs-chips button'))setTimeout(chips,60)},true)}
window.SJSNav={refresh:function(){renderAll()},open:function(){open()},close:close,setRole:function(o){try{var r=role();for(var k in o)if(o[k]!=null&&o[k]!=='')r[k]=o[k];localStorage.setItem('sjs-nav-role',JSON.stringify(r))}catch(e){}renderAll()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
