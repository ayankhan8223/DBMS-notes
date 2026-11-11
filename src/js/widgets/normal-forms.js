/* widget: normal-forms — self-contained, registers via register() from widgets-core.js */
import { register as registerWidget } from '../widgets-core.js';
var NAME='normal-forms';
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
function analyze(attrs,fds){
  attrs=attrs.slice().sort();
  var keys=candidateKeys(attrs,fds),prime=[];keys.forEach(function(k){prime=unionS(prime,k);});
  var nonprime=minusS(attrs,prime),rows=[];
  fds.forEach(function(f){f.r.forEach(function(a){if(f.l.indexOf(a)>=0)return;
    var superkey=closure(f.l,fds).length===attrs.length,aPrime=prime.indexOf(a)>=0;
    var inKey=keys.some(function(k){return subsetOf(f.l,k);}),proper=keys.some(function(k){return subsetOf(f.l,k)&&f.l.length<k.length;});
    var kind='';if(!superkey&&!aPrime){kind=proper?'partial':'transitive';}
    rows.push({l:f.l,a:a,superkey:superkey,aPrime:aPrime,bcnf:superkey,nf3:superkey||aPrime,kind:kind,inKey:inKey});});});
  var partials=[],seen={};
  keys.forEach(function(K){var n=K.length;for(var m=1;m<(1<<n)-1;m++){var S=K.filter(function(_,i){return m&(1<<i);});var key=S.join('');if(seen[key])continue;var c=closure(S,fds);var extra=minusS(c,S).filter(function(x){return nonprime.indexOf(x)>=0;});if(extra.length){seen[key]=1;partials.push({S:S,attrs:extra,key:K});}}});
  var is2=!partials.length,is3=rows.every(function(r){return r.nf3;}),isB=rows.every(function(r){return r.bcnf;});
  var highest=isB?'BCNF':is3?'3NF':is2?'2NF':'1NF';
  return {attrs:attrs,keys:keys,prime:prime,nonprime:nonprime,rows:rows,partials:partials,is2NF:is2,is3NF:is3,isBCNF:isB,highest:highest};
}
var LOGIC={analyze:analyze,parseFDs:parseFDs,parseAttrs:parseAttrs,closure:closure,candidateKeys:candidateKeys};
var PRESETS=[
 {n:'R(A,B,C,D): AB→C, B→D  (partial dependency)',attrs:'ABCD',fds:'AB->C\nB->D'},
 {n:'R(A,B,C): A→B, B→C  (transitive)',attrs:'ABC',fds:'A->B\nB->C'},
 {n:'R(A,B,C): AB→C, C→B  (3NF par BCNF nahi)',attrs:'ABC',fds:'AB->C\nC->B'},
 {n:'R(A,B,C): A→B, A→C  (BCNF)',attrs:'ABC',fds:'A->B\nA->C'},
 {n:'R(A,B,C,D,E): AB→C, C→D, B→E',attrs:'ABCDE',fds:'AB->C\nC->D\nB->E'}
];
function mount(el,opts){
  injectCss('.$ladder{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}.$rung{flex:1;min-width:60px;text-align:center;padding:6px 4px;border-radius:9px;border:2px solid var(--line,#d7deee);background:var(--bg,#fff);font-weight:700;opacity:.6;transition:all .4s}.$rung.$yes{opacity:1;border-color:var(--green,#14a06b);background:color-mix(in srgb,var(--green,#14a06b) 25%,var(--bg,#fff))}.$rung.$no{opacity:1;border-color:var(--red,#d63b4f);background:color-mix(in srgb,var(--red,#d63b4f) 18%,var(--bg,#fff))}.$rung.$top{outline:3px solid var(--blue,#2f5bd8)}.$sec{margin:8px 0}.$sec h4{margin:0 0 4px;font-size:14px}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','Normal Form detector — 1NF → BCNF'));
  root.appendChild(h('div','sub','Relation aur FDs do. Steps: candidate keys → prime/non-prime → har FD ki jaanch → partial/transitive → verdict. (Maan ke chalte hain ki saare attributes atomic hain, yaani 1NF to hai hi.)'));
  var ps=mkSelect(PRESETS.map(function(p,i){return {v:i,t:p.n};}),0,function(v){var p=PRESETS[v];ia.value=p.attrs;ifd.value=p.fds;recompute();});
  var r1=h('div','row');r1.appendChild(ps);root.appendChild(r1);
  var ia=h('input','inp mono');ia.value=PRESETS[0].attrs;ia.size=10;ia.setAttribute('aria-label','Attributes');
  var ifd=h('textarea','ta');ifd.rows=3;ifd.value=PRESETS[0].fds;ifd.setAttribute('aria-label','FDs');
  var r2=h('div','row');var c1=h('div','col');c1.appendChild(h('span','lab','R ke attributes'));c1.appendChild(ia);r2.appendChild(c1);root.appendChild(r2);
  var c2=h('div','col');c2.appendChild(h('span','lab','FDs (ek line mein ek, jaise AB->C)'));c2.appendChild(ifd);root.appendChild(c2);
  var err=h('div','bad','');root.appendChild(err);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);var out=h('div','');root.appendChild(out);
  var A=null;
  var pl=player(barHost,{n:function(){return A?6:1;},show:show});
  function recompute(){var attrs=parseAttrs(ia.value),pf=parseFDs(ifd.value),msgs=pf.errs.slice();var bad=checkFDs(attrs,pf.fds);if(bad.length)msgs.push('Ye attributes R mein nahi: '+bad.join(', '));if(!attrs.length)msgs.push('Attributes likho.');if(!pf.fds.length)msgs.push('Kam se kam ek FD do.');if(attrs.length>8)msgs.push('Max 8 attributes.');
    err.textContent=msgs.join(' | ');A=msgs.length?null:analyze(attrs,pf.fds);if(A)A.fds=pf.fds;pl.stop();pl.go(0);}
  var CAPS=['Step 1: Relation aur FDs. Ab sabse pehle candidate keys nikalenge.','Step 2: <b>Candidate keys</b> — jinka closure poora R de aur minimal ho. (Closure se check kiya.)','Step 3: <b>Prime</b> attribute = kisi bhi candidate key ka hissa. Baaki <b>non-prime</b>.','Step 4: <b>BCNF test</b> — har non-trivial FD X→A ke liye X superkey hona chahiye.','Step 5: <b>3NF test</b> — X superkey ho <i>ya</i> A prime ho. Phir 2NF: partial / transitive dependency dhoondo.','Step 6: <b>Verdict</b> — sabse oonchi normal form jo saare tests pass kare.'];
  function show(i){
    if(!A){cap.innerHTML='Input theek karo.';out.innerHTML='';return;}
    cap.innerHTML=CAPS[i];out.innerHTML='';
    function sec(title,html,isNew){var s=h('div','sec'+(isNew?' new':''));s.innerHTML='<h4>'+title+'</h4>'+html;out.appendChild(s);}
    sec('Relation & FDs','R('+A.attrs.join(', ')+')<br>'+A.fds.map(function(f){return '<span class="'+P+'tag">'+esc(fmtFD(f))+'</span>';}).join(' '),i===0);
    if(i>=1)sec('Candidate keys',A.keys.map(function(k){return '<span class="'+P+'chip '+P+'g">'+k.join('')+'</span> <small>('+k.join('')+')⁺ = '+fmtS(closure(k,A.fds))+'</small>';}).join('<br>'),i===1);
    if(i>=2)sec('Prime / Non-prime','Prime: '+A.prime.map(function(x){return '<span class="'+P+'chip '+P+'g">'+x+'</span>';}).join(' ')+' &nbsp; Non-prime: '+(A.nonprime.length?A.nonprime.map(function(x){return '<span class="'+P+'chip">'+x+'</span>';}).join(' '):'koi nahi'),i===2);
    if(i>=3){var t='<div class="'+P+'wrap"><table class="'+P+'t"><tr><th>FD</th><th>LHS superkey?</th>'+(i>=4?'<th>RHS prime?</th><th>3NF</th>':'')+'<th>BCNF</th>'+(i>=4?'<th>Dosh</th>':'')+'</tr>';
      A.rows.forEach(function(r){t+='<tr><td>'+esc(r.l.join('')+' → '+r.a)+'</td><td class="'+P+(r.superkey?'g':'x')+'">'+(r.superkey?'haan':'nahi')+'</td>'+(i>=4?'<td>'+(r.aPrime?'haan':'nahi')+'</td><td class="'+P+(r.nf3?'g':'x')+'">'+(r.nf3?'✓':'✗')+'</td>':'')+'<td class="'+P+(r.bcnf?'g':'x')+'">'+(r.bcnf?'✓':'✗')+'</td>'+(i>=4?'<td>'+(r.kind==='partial'?'<b>partial</b> (key ka hissa → non-prime)':r.kind==='transitive'?'<b>transitive</b> (non-key → non-prime)':'—')+'</td>':'')+'</tr>';});
      sec('Har FD ki jaanch','<div class="'+P+'sub">Sirf non-trivial FDs (RHS ko alag-alag tod ke)</div>'+t+'</table></div>',i===3||i===4);}
    if(i>=4){var pt='';if(A.partials.length)pt=A.partials.map(function(p){return 'key <b>'+p.key.join('')+'</b> ka hissa <b>'+p.S.join('')+'</b> → non-prime '+p.attrs.join(',')+' (partial)';}).join('<br>');else pt='Koi partial dependency nahi → <span class="'+P+'ok">2NF OK</span>';
      sec('Partial dependency (2NF test)',pt,i===4);}
    if(i>=5){var lad='<div class="'+P+'ladder">'+[['1NF',true],['2NF',A.is2NF],['3NF',A.is3NF],['BCNF',A.isBCNF]].map(function(x){return '<div class="'+P+'rung '+P+(x[1]?'yes':'no')+(x[0]===A.highest?' '+P+'top':'')+'">'+x[0]+'<br>'+(x[1]?'✓':'✗')+'</div>';}).join('')+'</div>';
      var why=[];if(!A.is2NF)why.push('2NF fail: partial dependency hai ('+A.partials.map(function(p){return p.S.join('')+'→'+p.attrs.join('');}).join(', ')+').');
      if(A.is2NF&&!A.is3NF)why.push('3NF fail: transitive dependency — '+A.rows.filter(function(r){return !r.nf3;}).map(function(r){return r.l.join('')+'→'+r.a;}).join(', ')+' (LHS superkey nahi aur RHS non-prime).');
      if(A.is3NF&&!A.isBCNF)why.push('BCNF fail: '+A.rows.filter(function(r){return !r.bcnf;}).map(function(r){return r.l.join('')+'→'+r.a;}).join(', ')+' ka LHS superkey nahi, par RHS prime hai (isliye 3NF bach gaya).');
      if(A.isBCNF)why.push('Har FD ka LHS superkey hai → BCNF.');
      sec('Verdict: sabse oonchi NF = <span class="'+P+'ok">'+A.highest+'</span>',lad+why.join('<br>'),true);}
  }
  var tmr;[ia,ifd].forEach(function(x){x.addEventListener('input',function(){clearTimeout(tmr);tmr=setTimeout(recompute,250);});});
  recompute();
}

export { LOGIC };
registerWidget(NAME, mount);
