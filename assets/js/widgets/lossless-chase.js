/* widget: lossless-chase — self-contained, registers via window.Widgets.register */
(function(){'use strict';
var NAME='lossless-chase';
var P='w-'+NAME+'-';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls.split(' ').map(function(c){return c?P+c:'';}).join(' ');if(html!=null)e.innerHTML=html;return e;}
var BASE=[
'.$w{font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink,#1b2438);background:var(--card,#f6f8ff);border:1px solid var(--line,#d7deee);border-radius:14px;padding:12px;margin:14px 0;max-width:100%;overflow:hidden;box-sizing:border-box}',
'.$w *{box-sizing:border-box}',
'.$title{font-weight:700;font-size:15px;margin:0 0 6px}',
'.$sub{color:var(--mut,#5b6580);font-size:13px;margin:0 0 6px}',
'.$row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}',
'.$col{display:flex;flex-direction:column;gap:3px;min-width:0}',
'.$lab{font-size:12px;color:var(--mut,#5b6580);font-weight:600}',
'.$btn{font:inherit;font-size:14px;cursor:pointer;border:1px solid var(--line,#d7deee);background:var(--bg,#fff);color:var(--ink,#1b2438);border-radius:9px;padding:5px 11px;min-height:34px}',
'.$btn:hover:not(:disabled){border-color:var(--blue,#2f5bd8)}',
'.$btn:disabled{opacity:.4;cursor:default}',
'.$btn.$pri{background:var(--blue,#2f5bd8);color:#fff;border-color:var(--blue,#2f5bd8)}',
'.$btn.$on{background:color-mix(in srgb,var(--blue,#2f5bd8) 18%,var(--bg,#fff));border-color:var(--blue,#2f5bd8)}',
'.$sel,.$inp,.$ta{font:inherit;font-size:14px;border:1px solid var(--line,#d7deee);background:var(--bg,#fff);color:var(--ink,#1b2438);border-radius:8px;padding:5px 8px;min-height:34px;max-width:100%}',
'.$ta{width:100%;font-family:ui-monospace,Menlo,Consolas,monospace;resize:vertical}',
'.$inp.$mono{font-family:ui-monospace,Menlo,Consolas,monospace}',
'.$cap{background:var(--bg,#fff);border-left:4px solid var(--blue,#2f5bd8);border-radius:8px;padding:8px 10px;margin:8px 0;min-height:46px;font-size:14px}',
'.$wrap{overflow-x:auto;max-width:100%;padding-bottom:2px}',
'.$t{border-collapse:collapse;font-size:13px;background:var(--bg,#fff);margin:2px 0}',
'.$t th,.$t td{border:1px solid var(--line,#d7deee);padding:3px 9px;text-align:left;white-space:nowrap;transition:background .3s}',
'.$t th{background:color-mix(in srgb,var(--blue,#2f5bd8) 10%,var(--bg,#fff));font-weight:700}',
'.$t caption{caption-side:top;text-align:left;font-weight:700;font-size:13px;padding:2px 0 3px;color:var(--mut,#5b6580)}',
'.$t .$g,.$t tr.$g td{background:color-mix(in srgb,var(--green,#14a06b) 26%,var(--bg,#fff))}',
'.$t .$r,.$t tr.$r td{background:color-mix(in srgb,var(--red,#d63b4f) 24%,var(--bg,#fff));text-decoration:line-through;text-decoration-color:var(--red,#d63b4f)}',
'.$t .$x{background:color-mix(in srgb,var(--red,#d63b4f) 24%,var(--bg,#fff))}',
'.$t .$o,.$t tr.$o td{background:color-mix(in srgb,var(--org,#e8730c) 30%,var(--bg,#fff))}',
'.$t .$b,.$t tr.$b td{background:color-mix(in srgb,var(--blue,#2f5bd8) 20%,var(--bg,#fff))}',
'.$t .$p,.$t tr.$p td{background:color-mix(in srgb,var(--pur,#7048e8) 22%,var(--bg,#fff))}',
'.$t .$dim{opacity:.45}',
'.$null{font-style:italic;color:var(--mut,#5b6580)}',
'.$chip{display:inline-block;min-width:30px;text-align:center;padding:3px 9px;border-radius:999px;border:2px solid var(--line,#d7deee);background:var(--bg,#fff);font-weight:700;font-family:ui-monospace,Menlo,Consolas,monospace;transition:all .35s}',
'.$chip.$g{background:color-mix(in srgb,var(--green,#14a06b) 28%,var(--bg,#fff));border-color:var(--green,#14a06b)}',
'.$chip.$o{background:color-mix(in srgb,var(--org,#e8730c) 35%,var(--bg,#fff));border-color:var(--org,#e8730c);transform:scale(1.15)}',
'.$chip.$p{border-color:var(--pur,#7048e8);background:color-mix(in srgb,var(--pur,#7048e8) 18%,var(--bg,#fff))}',
'.$chip.$r{border-color:var(--red,#d63b4f);background:color-mix(in srgb,var(--red,#d63b4f) 18%,var(--bg,#fff))}',
'.$chip.$dim{opacity:.5}',
'.$ok{color:var(--green,#14a06b);font-weight:700}',
'.$bad{color:var(--red,#d63b4f);font-weight:700}',
'.$tag{display:inline-block;font-size:12px;font-weight:700;border-radius:6px;padding:1px 7px;border:1px solid var(--line,#d7deee);background:var(--bg,#fff)}',
'.$code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:8px;padding:6px 9px;overflow-x:auto;white-space:pre-wrap;word-break:break-word}',
'.$try{border:1px dashed var(--org,#e8730c);border-radius:10px;padding:8px 10px;margin:8px 0;background:var(--bg,#fff)}',
'.$new{animation:$pop .5s ease}',
'.$slide{animation:$slide .6s ease}',
'@keyframes $pop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
'@keyframes $slide{from{opacity:0;transform:translateX(-22px)}to{opacity:1;transform:none}}',
'@media (max-width:480px){.$w{padding:9px}.$t{font-size:12px}.$t th,.$t td{padding:3px 6px}}'
].join('\n');
function injectCss(extra){var id='w-css-'+NAME;if(document.getElementById(id))return;var s=document.createElement('style');s.id=id;s.textContent=(BASE+'\n'+(extra||'')).replace(/\$/g,P);document.head.appendChild(s);}
function btn(label,fn,cls,aria){var b=h('button','btn '+(cls||''),label);b.type='button';if(aria)b.setAttribute('aria-label',aria);b.addEventListener('click',fn);return b;}
function mkSelect(items,val,fn){var s=h('select','sel');items.forEach(function(it,i){var o=document.createElement('option');if(typeof it==='object'){o.value=it.v;o.textContent=it.t;}else{o.value=it;o.textContent=it;}s.appendChild(o);});if(val!==undefined)s.value=val;s.addEventListener('change',function(){fn(s.value);});return s;}
function player(host,o){
  var st={i:0,t:null,speed:1};
  var bar=h('div','row');
  var bReset=btn('⏮ Reset',function(){stop();go(0);},'','Reset');
  var bBack=btn('◀ Back',function(){stop();go(st.i-1);},'','Pichla step');
  var bPlay=btn('▶ Play',function(){if(st.t){stop();}else{if(st.i>=o.n()-1)go(0);start();}},'pri','Play ya pause');
  var bNext=btn('Next ▶',function(){stop();go(st.i+1);},'','Agla step');
  var sp=mkSelect([{v:'0.5',t:'Slow'},{v:'1',t:'Normal'},{v:'2',t:'Fast'}],'1',function(v){st.speed=parseFloat(v);if(st.t){stop();start();}});
  sp.setAttribute('aria-label','Speed');
  var lab=h('span','lab','');
  [bReset,bBack,bPlay,bNext,sp,lab].forEach(function(x){bar.appendChild(x);});
  host.appendChild(bar);
  function upd(){var n=o.n();lab.textContent='Step '+(st.i+1)+' / '+n;bBack.disabled=st.i<=0;bNext.disabled=st.i>=n-1;bReset.disabled=st.i<=0&&!st.t;}
  function stop(){if(st.t){clearInterval(st.t);st.t=null;}bPlay.textContent='▶ Play';upd();}
  function start(){bPlay.textContent='⏸ Pause';st.t=setInterval(function(){if(st.i>=o.n()-1){stop();return;}go(st.i+1);},1500/st.speed);upd();}
  function go(i){var n=o.n();st.i=Math.max(0,Math.min(n-1,i));o.show(st.i);upd();}
  return {go:go,stop:stop,get i(){return st.i;},bar:bar};
}
function parseAttrs(s){var seen={},out=[];String(s||'').toUpperCase().replace(/[^A-Z]/g,'').split('').forEach(function(c){if(c&&!seen[c]){seen[c]=1;out.push(c);}});return out.sort();}
function parseFDs(text){var fds=[],errs=[];String(text||'').split(/[\n;]+/).forEach(function(line){line=line.trim();if(!line)return;var m=line.split(/->|→|=>/);if(m.length!==2){errs.push('"'+line+'" mein -> nahi mila');return;}var l=parseAttrs(m[0]),r=parseAttrs(m[1]);if(!l.length||!r.length){errs.push('"'+line+'" adhoori FD hai');return;}fds.push({l:l,r:r});});return {fds:fds,errs:errs};}
function subsetOf(a,b){return a.every(function(x){return b.indexOf(x)>=0;});}
function unionS(a,b){var o=a.slice();b.forEach(function(x){if(o.indexOf(x)<0)o.push(x);});return o.sort();}
function minusS(a,b){return a.filter(function(x){return b.indexOf(x)<0;});}
function interS(a,b){return a.filter(function(x){return b.indexOf(x)>=0;});}
function eqS(a,b){return a.length===b.length&&subsetOf(a,b);}
function closure(X,fds){var cur=unionS([],X),ch=true;while(ch){ch=false;fds.forEach(function(f){if(subsetOf(f.l,cur)&&!subsetOf(f.r,cur)){cur=unionS(cur,f.r);ch=true;}});}return cur;}
function closureTrace(X,fds){var cur=unionS([],X),steps=[{type:'init',set:cur.slice(),added:[]}],round=0,ch=true;while(ch){ch=false;round++;fds.forEach(function(f,i){var ap=subsetOf(f.l,cur);var add=ap?minusS(f.r,cur):[];if(add.length){cur=unionS(cur,add);ch=true;}steps.push({type:'fd',round:round,i:i,applicable:ap,added:add,set:cur.slice()});});}steps.push({type:'done',set:cur.slice(),rounds:round,added:[]});return steps;}
function candidateKeys(attrs,fds){attrs=attrs.slice().sort();var n=attrs.length,keys=[];for(var size=1;size<=n;size++){var comb=[];(function rec(start,cur){if(cur.length===size){comb.push(cur.slice());return;}for(var i=start;i<n;i++){cur.push(attrs[i]);rec(i+1,cur);cur.pop();}})(0,[]);comb.forEach(function(c){if(keys.some(function(k){return subsetOf(k,c);}))return;if(closure(c,fds).length===n)keys.push(c);});}return keys;}
function fmtS(s){return s.length?s.join(''):'∅';}
function fmtSet(s){return '{'+s.join(', ')+'}';}
function fmtFD(f){return f.l.join('')+' → '+f.r.join('');}
function checkFDs(attrs,fds){var bad=[];fds.forEach(function(f){f.l.concat(f.r).forEach(function(a){if(attrs.indexOf(a)<0&&bad.indexOf(a)<0)bad.push(a);});});return bad;}
function chase(attrs,fds,decomp){
  attrs=attrs.slice().sort();
  var T=decomp.map(function(R,i){var row={};attrs.forEach(function(a){row[a]=R.indexOf(a)>=0?'a'+a:'b'+(i+1)+a;});return row;});
  function snap(){return T.map(function(r){return Object.assign({},r);});}
  var init=snap(),steps=[],changed=true,guard=0;
  while(changed&&guard++<500){changed=false;
    fds.forEach(function(f,fi){for(var i=0;i<T.length;i++)for(var j=i+1;j<T.length;j++){
      if(!f.l.every(function(a){return T[i][a]===T[j][a];}))continue;
      f.r.forEach(function(a){var x=T[i][a],y=T[j][a];if(x===y)return;var win,lose;
        if(x[0]==='a'){win=x;lose=y;}else if(y[0]==='a'){win=y;lose=x;}else{win=x<y?x:y;lose=x<y?y:x;}
        var cells=[];for(var r=0;r<T.length;r++)if(T[r][a]===lose){T[r][a]=win;cells.push([r,a]);}
        changed=true;steps.push({fi:fi,i:i,j:j,attr:a,from:lose,to:win,cells:cells,table:snap()});});}});}
  var lossless=T.some(function(r){return attrs.every(function(a){return r[a][0]==='a';});});
  var allRow=-1;T.forEach(function(r,i){if(allRow<0&&attrs.every(function(a){return r[a][0]==='a';}))allRow=i;});
  return {init:init,steps:steps,final:snap(),lossless:lossless,allRow:allRow,attrs:attrs};
}
function depPreservation(attrs,fds,decomp){
  return fds.map(function(f){var Z=f.l.slice(),trace=[Z.slice()],ch=true;while(ch){ch=false;decomp.forEach(function(R,k){var add=interS(closure(interS(Z,R),fds),R);var nz=unionS(Z,add);if(nz.length!==Z.length){Z=nz;ch=true;trace.push({R:k,Z:Z.slice()});}});}
    return {fd:f,Z:Z,preserved:subsetOf(f.r,Z),trace:trace};});
}
var LOGIC={chase:chase,depPreservation:depPreservation,parseFDs:parseFDs,parseAttrs:parseAttrs,closure:closure};
var PRESETS=[
 {n:'R(A,B,C), A→B → AB, AC (lossless)',attrs:'ABC',fds:'A->B',dec:'AB, AC'},
 {n:'R(A,B,C), A→B → AB, BC (lossy)',attrs:'ABC',fds:'A->B',dec:'AB, BC'},
 {n:'R(A,B,C), AB→C, C→B → AC, BC (lossless, FD lost)',attrs:'ABC',fds:'AB->C\nC->B',dec:'AC, BC'},
 {n:'Classic 5-way: AD, AB, BE, CDE, AE',attrs:'ABCDE',fds:'A->C\nB->C\nC->D\nDE->C\nCE->A',dec:'AD, AB, BE, CDE, AE'},
 {n:'R(A,B,C,D): A→B, C→D → AB, CD (lossy)',attrs:'ABCD',fds:'A->B\nC->D',dec:'AB, CD'}
];
function sym(s){return s[0]==='a'?'a<sub>'+s.slice(1)+'</sub>':'b<sub>'+s.slice(1)+'</sub>';}
function mount(el,opts){
  injectCss('.$tb td{text-align:center;min-width:40px}.$ver{font-weight:700;font-size:15px;padding:8px 10px;border-radius:9px;margin:6px 0}.$ver.$y{background:color-mix(in srgb,var(--green,#14a06b) 22%,var(--bg,#fff));border:2px solid var(--green,#14a06b)}.$ver.$n{background:color-mix(in srgb,var(--red,#d63b4f) 18%,var(--bg,#fff));border:2px solid var(--red,#d63b4f)}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','Lossless join — Chase / Tableau method'));
  root.appendChild(h('div','sub','Decomposition lossless hai ya nahi, tableau bana ke FDs lagao. Agar koi row poori <b>a</b> ban jaye → lossless. Neeche dependency preservation bhi check hota hai.'));
  var ps=mkSelect(PRESETS.map(function(p,i){return {v:i,t:p.n};}),0,function(v){var p=PRESETS[v];ia.value=p.attrs;ifd.value=p.fds;idc.value=p.dec;recompute();});
  var r1=h('div','row');r1.appendChild(ps);root.appendChild(r1);
  var ia=h('input','inp mono');ia.value=PRESETS[0].attrs;ia.size=10;ia.setAttribute('aria-label','Attributes');
  var idc=h('input','inp mono');idc.value=PRESETS[0].dec;idc.size=22;idc.setAttribute('aria-label','Decomposition');
  var ifd=h('textarea','ta');ifd.rows=3;ifd.value=PRESETS[0].fds;ifd.setAttribute('aria-label','FDs');
  var r2=h('div','row');[['R ke attributes',ia],['Decomposition (comma se alag, jaise AB, BC)',idc]].forEach(function(p){var c=h('div','col');c.appendChild(h('span','lab',p[0]));c.appendChild(p[1]);r2.appendChild(c);});root.appendChild(r2);
  var c2=h('div','col');c2.appendChild(h('span','lab','FDs'));c2.appendChild(ifd);root.appendChild(c2);
  var err=h('div','bad','');root.appendChild(err);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);var tab=h('div','wrap');root.appendChild(tab);var ver=h('div','');root.appendChild(ver);var dp=h('div','');root.appendChild(dp);
  var S=null;
  var pl=player(barHost,{n:function(){return S?S.res.steps.length+2:1;},show:show});
  function recompute(){
    var attrs=parseAttrs(ia.value),pf=parseFDs(ifd.value),msgs=pf.errs.slice();
    var dec=String(idc.value).split(/[,;]+/).map(parseAttrs).filter(function(x){return x.length;});
    var bad=checkFDs(attrs,pf.fds);if(bad.length)msgs.push('FD mein R se bahar attribute: '+bad.join(', '));
    if(!attrs.length)msgs.push('Attributes likho.');if(dec.length<2)msgs.push('Kam se kam 2 relations ki decomposition do.');
    dec.forEach(function(d){var b=minusS(d,attrs);if(b.length)msgs.push('Decomposition mein R se bahar: '+b.join(','));});
    var cov=[];dec.forEach(function(d){cov=unionS(cov,d);});if(!msgs.length&&minusS(attrs,cov).length)msgs.push('Decomposition mein ye attributes chhoot gaye: '+minusS(attrs,cov).join(','));
    if(attrs.length>8||dec.length>8)msgs.push('Max 8 attributes / 8 relations.');
    err.textContent=msgs.join(' | ');S=null;if(!msgs.length){S={attrs:attrs,fds:pf.fds,dec:dec,res:chase(attrs,pf.fds,dec),dp:depPreservation(attrs,pf.fds,dec)};}
    pl.stop();pl.go(0);}
  function show(i){
    tab.innerHTML='';ver.innerHTML='';dp.innerHTML='';
    if(!S){cap.innerHTML='Input theek karo.';return;}
    var R=S.res,n=R.steps.length,last=i===n+1,step=i>=1&&i<=n?R.steps[i-1]:null;
    var T=i===0?R.init:(i===1?R.steps.length?R.steps[0].table:R.init:null);
    T=i===0?R.init:(i<=n?R.steps[i-1].table:R.final);
    if(i===0)cap.innerHTML='<b>Initial tableau</b>: har relation ki ek row. Jo attribute us relation mein hai wahan <b>a</b>, baaki jagah <b>b</b> (row number ke saath). Ab FDs lagao.';
    else if(step){var f=S.fds[step.fi];cap.innerHTML='FD <b>'+esc(fmtFD(f))+'</b>: rows <b>R'+(step.i+1)+'</b> aur <b>R'+(step.j+1)+'</b> ke '+f.l.join(',')+' columns same hain → column <b>'+step.attr+'</b> barabar karo: '+sym(step.from)+' → '+sym(step.to)+(step.to[0]==='a'?' (a ko priority)':' (chhota b rakha)')+'.';}
    else cap.innerHTML=(n?'Ab koi FD kuch naya nahi badal sakti → chase khatam. ':'Koi FD apply nahi hui (kisi do rows ka LHS same nahi). ')+(R.lossless?'Row <b>R'+(R.allRow+1)+'</b> poori <b>a</b> hai → <b>lossless</b>.':'Koi bhi row poori <b>a</b> nahi → <b>lossy</b>.');
    var hl={};if(step){step.cells.forEach(function(c){hl[c[0]+c[1]]='o';});S.fds[step.fi].l.forEach(function(a){if(!hl[step.i+a])hl[step.i+a]='b';if(!hl[step.j+a])hl[step.j+a]='b';});}
    var t='<table class="'+P+'t '+P+'tb"><tr><th></th>'+R.attrs.map(function(a){return '<th>'+a+'</th>';}).join('')+'</tr>';
    T.forEach(function(row,ri){var full=last&&ri===R.allRow;t+='<tr class="'+(full?P+'g':'')+'"><th>R'+(ri+1)+' ('+S.dec[ri].join('')+')</th>'+R.attrs.map(function(a){var c=hl[ri+a];return '<td class="'+(c?P+c:'')+'">'+sym(row[a])+'</td>';}).join('')+'</tr>';});
    tab.innerHTML=t+'</table>';
    if(last)ver.innerHTML='<div class="'+P+'ver '+P+(R.lossless?'y':'n')+'">'+(R.lossless?'✓ Lossless join decomposition (ek row poori a).':'✗ Lossy decomposition — koi row poori a nahi.')+'</div>';
    var lostN=S.dp.filter(function(d){return !d.preserved;}).length;
    var h2='<div class="'+P+'sec"><b>Dependency preservation check</b><div class="'+P+'sub">Har FD X→Y ke liye Z=X se shuru; baar-baar Z = Z ∪ ((Z∩Ri)⁺ ∩ Ri) har Ri par. Agar Y ⊆ Z → FD preserved.</div><div class="'+P+'wrap"><table class="'+P+'t"><tr><th>FD</th><th>Z (final)</th><th>Preserved?</th></tr>';
    S.dp.forEach(function(d){h2+='<tr><td>'+esc(fmtFD(d.fd))+'</td><td>'+fmtS(d.Z)+'</td><td class="'+P+(d.preserved?'g':'x')+'">'+(d.preserved?'haan':'nahi')+'</td></tr>';});
    dp.innerHTML=h2+'</table></div>'+(lostN?'<span class="'+P+'bad">Dependency preserved nahi</span> ('+lostN+' FD kho gayi — join karke hi check ho sakti hai).':'<span class="'+P+'ok">Saari FDs preserved.</span>')+' <small>Lossless aur preserving dono alag-alag properties hain.</small></div>';
  }
  var tmr;[ia,idc,ifd].forEach(function(x){x.addEventListener('input',function(){clearTimeout(tmr);tmr=setTimeout(recompute,250);});});
  recompute();
}

if(typeof module!=='undefined'&&module.exports){module.exports=LOGIC;}
if(typeof window!=='undefined'&&typeof document!=='undefined'){if(window.Widgets&&window.Widgets.register){window.Widgets.register(NAME,mount);}else{(window.__widgetQueue=window.__widgetQueue||[]).push([NAME,mount]);}}
})();
