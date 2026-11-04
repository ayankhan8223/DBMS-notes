/* widget: fd-closure — self-contained, registers via window.Widgets.register */
(function(){'use strict';
var NAME='fd-closure';
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
var LOGIC={closure:closure,closureTrace:closureTrace,candidateKeys:candidateKeys,parseFDs:parseFDs,parseAttrs:parseAttrs};
var PRESETS=[
 {n:'Basic: A→B, B→C, CD→E',attrs:'ABCDE',fds:'A->B\nB->C\nCD->E',x:'AD'},
 {n:'GATE style: AB→C, BC→AD, D→E, CF→B',attrs:'ABCDEF',fds:'AB->C\nBC->AD\nD->E\nCF->B',x:'AB'},
 {n:'Cycle: A→B→C→D→A',attrs:'ABCD',fds:'A->B\nB->C\nC->D\nD->A',x:'A'},
 {n:'Do keys: AB→C, C→B',attrs:'ABC',fds:'AB->C\nC->B',x:'AC'}
];
function mount(el,opts){
  injectCss('.$chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.$fd{display:flex;gap:8px;align-items:center;padding:4px 8px;border:1px solid var(--line,#d7deee);border-radius:8px;margin:3px 0;background:var(--bg,#fff);transition:all .3s;font-family:ui-monospace,Menlo,monospace;font-size:14px}.$fd.$cur{border-color:var(--org,#e8730c);background:color-mix(in srgb,var(--org,#e8730c) 18%,var(--bg,#fff))}.$fd.$done{border-color:var(--green,#14a06b)}.$fd small{font-family:system-ui;color:var(--mut,#5b6580);margin-left:auto;text-align:right}.$grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:560px){.$grid{grid-template-columns:1fr}}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','Attribute Closure X⁺ — step by step'));
  root.appendChild(h('div','sub','Preset chuno ya khud attributes / FDs likho (single capital letters, FD ek line mein: AB->C). X ka closure chalke dekho.'));
  var ps=mkSelect(PRESETS.map(function(p,i){return {v:i,t:p.n};}),0,function(v){var p=PRESETS[v];ia.value=p.attrs;ifd.value=p.fds;ix.value=p.x;recompute();});
  var r1=h('div','row');r1.appendChild(ps);root.appendChild(r1);
  var ia=h('input','inp mono');ia.value=PRESETS[0].attrs;ia.size=10;ia.setAttribute('aria-label','Relation attributes');
  var ix=h('input','inp mono');ix.value=PRESETS[0].x;ix.size=8;ix.setAttribute('aria-label','X attributes');
  var ifd=h('textarea','ta');ifd.rows=4;ifd.value=PRESETS[0].fds;ifd.setAttribute('aria-label','FDs');
  var r2=h('div','row');
  [['R ke attributes',ia],['X (closure kiska?)',ix]].forEach(function(p){var c=h('div','col');c.appendChild(h('span','lab',p[0]));c.appendChild(p[1]);r2.appendChild(c);});
  root.appendChild(r2);var c3=h('div','col');c3.appendChild(h('span','lab','FDs (ek line mein ek)'));c3.appendChild(ifd);root.appendChild(c3);
  var err=h('div','bad','');root.appendChild(err);
  var pl;var S={steps:[],attrs:[],fds:[],X:[],ok:false};
  var bodyHost=h('div','');var barHost=h('div','');
  var cap=h('div','cap','');var chips=h('div','chips');var fdl=h('div','');var keyBox=h('div','try','');
  root.appendChild(barHost);root.appendChild(cap);
  var g=h('div','grid');var a=h('div','');a.appendChild(h('div','lab','Attributes (hara = X⁺ mein aa gaya)'));a.appendChild(chips);var b=h('div','');b.appendChild(h('div','lab','FDs'));b.appendChild(fdl);g.appendChild(a);g.appendChild(b);root.appendChild(g);root.appendChild(keyBox);
  pl=player(barHost,{n:function(){return S.ok?S.steps.length:1;},show:show});
  function recompute(){
    var attrs=parseAttrs(ia.value),pf=parseFDs(ifd.value),X=parseAttrs(ix.value),msgs=pf.errs.slice();
    var bad=checkFDs(attrs,pf.fds);if(bad.length)msgs.push('FD mein ye attributes R mein nahi hain: '+bad.join(', '));
    var xb=minusS(X,attrs);if(xb.length)msgs.push('X mein R se bahar attributes: '+xb.join(', '));
    if(!attrs.length)msgs.push('Attributes likho.');if(!X.length)msgs.push('X khaali hai.');
    err.textContent=msgs.join(' | ');S.ok=!msgs.length;
    if(S.ok){S.attrs=attrs;S.fds=pf.fds;S.X=X;S.steps=closureTrace(X,pf.fds);}
    pl.stop();pl.go(0);
  }
  function show(i){
    if(!S.ok){cap.innerHTML='Input theek karo (upar laal message dekho).';chips.innerHTML='';fdl.innerHTML='';keyBox.style.display='none';return;}
    var st=S.steps[i],fired={};
    for(var k=1;k<=i;k++){var s=S.steps[k];if(s.type==='fd'&&s.added.length)fired[s.i]=1;}
    chips.innerHTML='';S.attrs.forEach(function(x){var inSet=st.set.indexOf(x)>=0;var c=h('span','chip'+(st.added.indexOf(x)>=0?' o':inSet?' g':' dim'),x);if(S.X.indexOf(x)>=0&&st.type==='init')c.className+=' '+P+'p';chips.appendChild(c);});
    fdl.innerHTML='';S.fds.forEach(function(f,j){var d=h('div','fd'+(st.type==='fd'&&st.i===j?' cur':fired[j]?' done':''),esc(fmtFD(f)));var sm=h('small','','');
      if(st.type==='fd'&&st.i===j)sm.innerHTML=st.applicable?(st.added.length?'LHS ⊆ X⁺ ✓ → '+st.added.join(',')+' add':'LHS ⊆ X⁺ ✓ par kuch naya nahi'):'LHS X⁺ mein poora nahi ✗';
      else if(fired[j])sm.textContent='use ho chuka';d.appendChild(sm);fdl.appendChild(d);});
    var cur='X⁺ = '+fmtSet(st.set);
    if(st.type==='init')cap.innerHTML='Shuruaat: <b>X⁺ = X = '+fmtSet(S.X)+'</b>. Ab FDs ko baar-baar lagao jab tak kuch naya na mile.';
    else if(st.type==='fd'){var f=S.fds[st.i];cap.innerHTML='<b>Round '+st.round+'</b> — FD <b>'+esc(fmtFD(f))+'</b>: '+(st.applicable?'LHS '+fmtSet(f.l)+' poora X⁺ ke andar hai ✓. '+(st.added.length?'To RHS ke naye attributes <b>'+st.added.join(', ')+'</b> add. ':'Par RHS pehle se hai, kuch naya nahi. '):'LHS '+fmtSet(f.l)+' abhi X⁺ mein poora nahi hai, skip. ')+'<br><b>'+cur+'</b>';}
    else{var full=st.set.length===S.attrs.length;var ck=S.X.length&&!S.X.some(function(_,q){var sub=S.X.filter(function(__,z){return z!==q;});return sub.length&&closure(sub,S.fds).length===S.attrs.length;});
      cap.innerHTML='Round '+st.rounds+' mein kuch naya nahi mila → <b>ruk jao</b>. <b>'+cur+'</b>.<br>'+(full?'X⁺ = poora R, isliye <span class="'+P+'ok">X superkey hai</span>'+(ck?' aur minimal hai → <span class="'+P+'ok">candidate key</span>.':' (par minimal nahi — X ka chhota hissa bhi key hai).'):'X⁺ poora R nahi hai → <span class="'+P+'bad">X key nahi hai</span>. Missing: '+fmtSet(minusS(S.attrs,st.set))+'.');}
    var keys=candidateKeys(S.attrs,S.fds);var prime=[];keys.forEach(function(k){prime=unionS(prime,k);});
    keyBox.style.display='';keyBox.innerHTML='<b>Try it:</b> X badlo aur dobara dekho. <br><b>Candidate key(s) of R:</b> '+keys.map(function(k){return '<span class="'+P+'tag">'+k.join('')+'</span>';}).join(' ')+' &nbsp; <b>Prime:</b> '+fmtSet(prime)+' &nbsp; <b>Non-prime:</b> '+fmtSet(minusS(S.attrs,prime));
  }
  var tmr;[ia,ix,ifd].forEach(function(x){x.addEventListener('input',function(){clearTimeout(tmr);tmr=setTimeout(recompute,250);});});
  recompute();
}

if(typeof module!=='undefined'&&module.exports){module.exports=LOGIC;}
if(typeof window!=='undefined'&&typeof document!=='undefined'){if(window.Widgets&&window.Widgets.register){window.Widgets.register(NAME,mount);}else{(window.__widgetQueue=window.__widgetQueue||[]).push([NAME,mount]);}}
})();
