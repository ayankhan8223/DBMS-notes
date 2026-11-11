/* widget: ra-operators — self-contained, registers via register() from widgets-core.js */
import { register as registerWidget } from '../widgets-core.js';
var NAME='ra-operators';
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
var DB={STUDENT:{cols:['ID','Name','Dept','Age'],rows:[[1,'Rahul','CSE',20],[2,'Aman','ECE',21],[3,'Priya','CSE',19],[4,'Neha','ME',22]]},
 COURSE:{cols:['CID','Title','Credits'],rows:[['C1','DBMS',4],['C2','Python',3],['C3','Maths',4]]},
 ENROLL:{cols:['ID','CID'],rows:[[1,'C1'],[1,'C2'],[2,'C1'],[3,'C1'],[3,'C2']]}};
function pv(s){s=String(s).trim().replace(/^['"]|['"]$/g,'');return /^-?\d+(\.\d+)?$/.test(s)?Number(s):s;}
function cmp(a,op,b){if(typeof a==='number'&&typeof b!=='number'){if(/^-?\d+(\.\d+)?$/.test(String(b)))b=Number(b);else{a=String(a);}}
  switch(op){case '=':return a===b;case '!=':return a!==b;case '<':return a<b;case '<=':return a<=b;case '>':return a>b;case '>=':return a>=b;}return false;}
function rk(r){return JSON.stringify(r);}
function dedupeRows(rows){var s={},o=[];rows.forEach(function(r){var k=rk(r);if(!s[k]){s[k]=1;o.push(r);}});return o;}
function pn(title,cols,rows,o){o=o||{};return {t:title,cols:cols,rows:rows,rm:o.rm||{},cm:o.cm||{},nw:o.nw===undefined?-1:o.nw,slide:!!o.slide,role:o.role||''};}
function sigmaScene(p){var T=DB[p.tbl],ci=T.cols.indexOf(p.col),st=[],n=T.rows.length,okc=[];
  var cond=p.col+' '+p.op+' '+(typeof pv(p.val)==='number'?pv(p.val):"'"+pv(p.val)+"'");
  st.push({cap:'<b>σ (selection)</b> = <b>rows</b> filter. Condition: <b>'+esc(cond)+'</b>. Har row par condition lagegi; true = rakho, false = hata do. Table ke columns same rehte hain.',panels:[pn(p.tbl,T.cols,T.rows),pn('Result',T.cols,[],{role:'out'})]});
  for(var k=1;k<=n;k++){var rm={},out=[];for(var i=0;i<k;i++){var ok=cmp(T.rows[i][ci],p.op,pv(p.val));rm[i]=ok?'g':'r';if(ok)out.push(T.rows[i]);}
    var cur=T.rows[k-1],cok=rm[k-1]==='g';
    st.push({cap:'Row '+k+': <b>'+esc(p.col)+' = '+esc(cur[ci])+'</b> → '+esc(cur[ci])+' '+esc(p.op)+' '+esc(pv(p.val))+' ? '+(cok?'<b class="'+P+'ok">true ✓ rakho</b>':'<b class="'+P+'bad">false ✗ hatao</b>')+(k===n?'<br><b>Result: '+out.length+' row(s).</b>':''),panels:[pn(p.tbl,T.cols,T.rows,{rm:rm}),pn('Result',T.cols,out,{role:'out',nw:cok?out.length-1:out.length})]});}
  return st;}
function piScene(p){var T=DB[p.tbl],idx=p.cols.map(function(c){return T.cols.indexOf(c);}).filter(function(i){return i>=0;}).sort(function(a,b){return a-b;});
  if(!idx.length)return [{cap:'Kam se kam ek column chuno.',panels:[pn(p.tbl,T.cols,T.rows)]}];
  var cm={};T.cols.forEach(function(_,i){cm[i]=idx.indexOf(i)>=0?'g':'r';});
  var oc=idx.map(function(i){return T.cols[i];}),raw=T.rows.map(function(r){return idx.map(function(i){return r[i];});}),dd=dedupeRows(raw),hasDup=dd.length!==raw.length;
  var seen={},rm={};raw.forEach(function(r,i){var k=rk(r);if(seen[k])rm[i]='r';seen[k]=1;});
  var st=[{cap:'<b>π (projection)</b> = <b>columns</b> chunna. Chune hue columns: <b>'+oc.join(', ')+'</b>. Rows nahi, columns kaat-te hain.',panels:[pn(p.tbl,T.cols,T.rows),pn('Result',oc,[],{role:'out'})]},
   {cap:'Step 1: Jo columns chahiye wo <span class="'+P+'ok">hare</span>, baaki <span class="'+P+'bad">laal</span> (hat jaayenge).',panels:[pn(p.tbl,T.cols,T.rows,{cm:cm}),pn('Result',oc,[],{role:'out'})]},
   {cap:'Step 2: Hare columns slide karke result mein aa gaye. '+(hasDup?'Dhyan do: ab kuch rows <b>bilkul same</b> dikh rahi hain!':'Saari rows alag hain.'),panels:[pn(p.tbl,T.cols,T.rows,{cm:cm}),pn('Result (duplicates ke saath)',oc,raw,{role:'out',slide:true,rm:hasDup?rm:{}})]},
   {cap:hasDup?'Step 3: RA mein relation ek <b>set</b> hai — duplicate rows <b>apne-aap hat jaati hain</b> ('+raw.length+' → '+dd.length+' rows). (SQL mein DISTINCT lagana padta.)':'Step 3: Koi duplicate nahi, result final. (Agar non-key column chuno, jaise Dept, to duplicates hatenge — try karo!)',panels:[pn(p.tbl,T.cols,T.rows,{cm:cm}),pn('Result',oc,dd,{role:'out'})]}];
  return st;}
function rhoScene(p){var T=DB[p.tbl],ci=T.cols.indexOf(p.col),nn=(p.name||'').trim()||p.col,nc=T.cols.slice();nc[ci]=nn;
  return [{cap:'<b>ρ (rename)</b> sirf <b>naam</b> badalta hai, data nahi. ρ'+esc('('+nn+'/'+p.col+')')+' — column <b>'+esc(p.col)+'</b> ka naya naam <b>'+esc(nn)+'</b>.',panels:[pn(p.tbl,T.cols,T.rows),pn('Result',nc,[],{role:'out'})]},
   {cap:'Step 1: Jis column ka naam badalna hai wo chuna gaya.',panels:[pn(p.tbl,T.cols,T.rows,{cm:(function(){var o={};o[ci]='o';return o;})()}),pn('Result',nc,[],{role:'out'})]},
   {cap:'Step 2: Header badal gaya, rows bilkul same ('+T.rows.length+' rows). Self-join ya same naam ke clash hatane mein kaam aata hai.',panels:[pn(p.tbl,T.cols,T.rows),pn('Result',nc,T.rows,{role:'out',slide:true,cm:(function(){var o={};o[ci]='o';return o;})()})]}];}
function setScene(op,swap){
  var A=DB.STUDENT.rows.filter(function(r){return r[2]==='CSE';}).map(function(r){return [r[1]];}),B=DB.STUDENT.rows.filter(function(r){return r[3]>=20;}).map(function(r){return [r[1]];});
  var X=swap?B:A,Y=swap?A:B,xn=swap?'B':'A',yn=swap?'A':'B',xt=xn+' = π Name(σ '+(swap?'Age≥20':"Dept='CSE'")+')',yt=yn+' = π Name(σ '+(swap?"Dept='CSE'":'Age≥20')+')';
  var sym={'U':'∪','I':'∩','D':'−'}[op];var oname=op==='D'?xn+' − '+yn:op==='U'?xn+' ∪ '+yn:xn+' ∩ '+yn;
  var intro={U:'<b>∪ union</b>: dono mein se koi bhi row — duplicate ek hi baar.',I:'<b>∩ intersection</b>: sirf wo rows jo <b>dono</b> mein hain.',D:'<b>− difference</b>: pehli relation ki wo rows jo doosri mein <b>nahi</b> hain. (Order matter karta hai: A−B ≠ B−A.)'}[op];
  var st=[{cap:intro+' <br>Dono relations <b>union-compatible</b> hain (same columns: Name). '+esc(oname),panels:[pn(xt,['Name'],X),pn(yt,['Name'],Y),pn(oname,['Name'],[],{role:'out'})]}];
  var xm={},ym={},out=[];
  function inY(r){return Y.some(function(y){return rk(y)===rk(r);});}function inX(r){return X.some(function(y){return rk(y)===rk(r);});}
  X.forEach(function(r,i){var txt,mark;var other=Y.map(rk).indexOf(rk(r));
    if(op==='U'){xm[i]='g';out.push(r);txt=esc(r[0])+' → '+xn+' ki row, result mein add.';}
    else if(op==='I'){if(other>=0){xm[i]='g';ym[other]='g';out.push(r);txt=esc(r[0])+' '+yn+' mein <b>bhi hai</b> ✓ → rakho.';}else{xm[i]='r';txt=esc(r[0])+' '+yn+' mein nahi ✗ → hatao.';}}
    else{if(other>=0){xm[i]='r';ym[other]='o';txt=esc(r[0])+' '+yn+' mein <b>hai</b> ✗ → hatao.';}else{xm[i]='g';out.push(r);txt=esc(r[0])+' '+yn+' mein <b>nahi</b> ✓ → rakho.';}}
    st.push({cap:xn+' ki row: '+txt,panels:[pn(xt,['Name'],X,{rm:Object.assign({},xm)}),pn(yt,['Name'],Y,{rm:Object.assign({},ym)}),pn(oname,['Name'],out.slice(),{role:'out'})]});});
  if(op==='U')Y.forEach(function(r,i){var dup=out.map(rk).indexOf(rk(r))>=0,txt;if(dup){ym[i]='r';xm[X.map(rk).indexOf(rk(r))]='o';txt=esc(r[0])+' pehle se result mein hai → <b>duplicate, ek hi baar</b>.';}else{ym[i]='g';out.push(r);txt=esc(r[0])+' naya hai → add.';}
    st.push({cap:yn+' ki row: '+txt+(i===Y.length-1?'<br><b>Result: '+out.length+' row(s).</b>':''),panels:[pn(xt,['Name'],X,{rm:Object.assign({},xm)}),pn(yt,['Name'],Y,{rm:Object.assign({},ym)}),pn(oname,['Name'],out.slice(),{role:'out'})]});});
  else st[st.length-1].cap+='<br><b>Result: '+out.length+' row(s).</b>';
  return st;}
function crossScene(){var S=DB.STUDENT,C=DB.COURSE,oc=S.cols.concat(C.cols),out=[],st=[{cap:'<b>× (cartesian product)</b>: har STUDENT row ka har COURSE row ke saath jodi. Rows = 4 × 3 = 12, columns = 4 + 3 = 7. Aksar baad mein σ lagana padta hai.',panels:[pn('STUDENT',S.cols,S.rows),pn('COURSE',C.cols,C.rows),pn('STUDENT × COURSE',oc,[],{role:'out'})]}];
  S.rows.forEach(function(s,i){C.rows.forEach(function(c,j){out.push(s.concat(c));st.push({cap:'Pair '+out.length+'/12: STUDENT row <b>'+esc(s[1])+'</b> + COURSE row <b>'+esc(c[0])+'</b> → ek nayi row.'+(out.length===12?'<br><b>Result: 12 rows. (Kaam ki rows chunne ke liye σ lagao.)</b>':''),panels:[pn('STUDENT',S.cols,S.rows,{rm:(function(){var o={};o[i]='o';return o;})()}),pn('COURSE',C.cols,C.rows,{rm:(function(){var o={};o[j]='o';return o;})()}),pn('STUDENT × COURSE',oc,out.slice(),{role:'out'})]});});});return st;}
var PAIRS=[['STUDENT','ENROLL'],['ENROLL','STUDENT'],['COURSE','ENROLL'],['ENROLL','COURSE']];
function joinScene(type,pair){var Ln=pair[0],Rn=pair[1],L=DB[Ln],R=DB[Rn],common=L.cols.filter(function(c){return R.cols.indexOf(c)>=0;}),oc=L.cols.concat(R.cols.filter(function(c){return common.indexOf(c)<0;}));
  var keepL=type==='LEFT'||type==='FULL',keepR=type==='RIGHT'||type==='FULL';var nm={NAT:'⋈',LEFT:'⟕',RIGHT:'⟖',FULL:'⟗'}[type],title=Ln+' '+nm+' '+Rn;
  function val(c,l,r){var li=L.cols.indexOf(c),ri=R.cols.indexOf(c);if(l&&li>=0)return l[li];if(r&&ri>=0)return r[ri];return null;}
  function mk(l,r){return oc.map(function(c){return val(c,l,r);});}
  function match(l,r){return common.every(function(c){return l[L.cols.indexOf(c)]===r[R.cols.indexOf(c)];});}
  var intro={NAT:'<b>⋈ natural join</b>: same-naam column ('+common.join(',')+') par equal rows jodta hai; wo column result mein <b>ek hi baar</b>. Jiska match nahi, wo row hat jaati hai.',LEFT:'<b>⟕ left outer join</b>: left ki <b>saari</b> rows rehti hain; match nahi mila to right ke columns NULL.',RIGHT:'<b>⟖ right outer join</b>: right ki <b>saari</b> rows rehti hain; match nahi to left ke columns NULL.',FULL:'<b>⟗ full outer join</b>: dono taraf ki saari rows; jahan match nahi wahan NULL.'}[type];
  var st=[{cap:intro+' <br>Join: <b>'+esc(title)+'</b> (common: '+common.join(',')+')',panels:[pn(Ln,L.cols,L.rows),pn(Rn,R.cols,R.rows),pn(title,oc,[],{role:'out'})],lines:[]}];
  var lm={},rm={},out=[],matchedR={};
  L.rows.forEach(function(l,li){var ris=[];R.rows.forEach(function(r,ri){if(match(l,r)){ris.push(ri);matchedR[ri]=1;}});var txt,cl={},cr={},lines=[];
    cl[li]='o';
    if(ris.length){ris.forEach(function(ri){out.push(mk(l,R.rows[ri]));rm[ri]='g';cr[ri]='g';lines.push({a:0,ai:li,b:1,bi:ri});});lm[li]='g';txt=Ln+' row '+(li+1)+' ke <b>'+ris.length+' match</b> mile (lines dekho) → '+ris.length+' row bani.';}
    else if(keepL){out.push(mk(l,null));lm[li]='b';txt=Ln+' row '+(li+1)+' ka koi match nahi — <b>outer join</b> mein row rehti hai, right ke columns <b>NULL</b>.';}
    else{lm[li]='r';txt=Ln+' row '+(li+1)+' ka koi match nahi → '+(keepR?'right outer mein left ki dangling row hat jaati hai.':'row <b>hat gayi</b>.');}
    var rmm=Object.assign({},rm);Object.keys(cr).forEach(function(k){rmm[k]='g';});
    st.push({cap:txt,panels:[pn(Ln,L.cols,L.rows,{rm:Object.assign({},lm,(function(){var o={};if(!ris.length&&!keepL)o[li]='r';else o[li]='o';return o;})())}),pn(Rn,R.cols,R.rows,{rm:cr}),pn(title,oc,out.slice(),{role:'out',nw:out.length-Math.max(1,ris.length)})],lines:lines});
    lm[li]=lm[li];});
  if(keepR)R.rows.forEach(function(r,ri){if(!matchedR[ri]){out.push(mk(null,r));var cr={};cr[ri]='b';st.push({cap:Rn+' row '+(ri+1)+' ka '+Ln+' mein match nahi — right outer ki wajah se row rehti hai, left ke columns <b>NULL</b>.',panels:[pn(Ln,L.cols,L.rows,{rm:Object.assign({},lm)}),pn(Rn,R.cols,R.rows,{rm:cr}),pn(title,oc,out.slice(),{role:'out',nw:out.length-1})],lines:[]});}});
  var dropR=R.rows.length-Object.keys(matchedR).length;
  var last=st[st.length-1];last.cap+='<br><b>Result: '+out.length+' row(s).</b>'+(!keepR&&dropR>0?' ('+Rn+' ki '+dropR+' unmatched row hat gayi.)':'')+((type==='RIGHT'||type==='FULL')&&dropR===0&&type==='RIGHT'?' (Is pair mein right ki har row match hui, isliye right outer = natural join. Pair badal ke dekho!)':'')+((type==='LEFT')&&out.every(function(r){return r.indexOf(null)<0;})?' (Is pair mein left ki har row match hui, isliye left outer = natural join. Pair badal ke dekho!)':'');
  return st;}
function divScene(req){var T=DB.ENROLL.rows,Rq=req.map(function(c){return [c];}),cand=dedupeRows(T.map(function(r){return [r[0]];}));
  var all=[];cand.forEach(function(c){Rq.forEach(function(q){all.push([c[0],q[0]]);});});
  var tk=T.map(rk),allm={},missing=[];all.forEach(function(p,i){if(tk.indexOf(rk(p))>=0)allm[i]='g';else{allm[i]='r';missing.push(p);}});
  var bad=dedupeRows(missing.map(function(m){return [m[0]];})),badk=bad.map(rk),ans=cand.filter(function(c){return badk.indexOf(rk(c))<0;});
  var TK=function(o){return pn('TAKES(ID,CID)',['ID','CID'],T,o);},RQ=function(o){return pn('REQUIRED(CID)',['CID'],Rq,o);};
  return [
   {cap:'<b>÷ division</b> = "kaun-sa ID <b>saare</b> REQUIRED CIDs ke saath TAKES mein hai?". Seedha formula yaad rakhna mushkil — isliye 5 chhote steps (missing pairs method). Neeche REQUIRED badal ke try karo.',panels:[TK(),RQ()]},
   {cap:'<b>Step 1 — Candidates</b>: TAKES se sab ID (<b>π<sub>ID</sub>(TAKES)</b>). Yahi log jawab ban sakte hain.',panels:[TK({cm:{0:'g'}}),pn('Candidates',['ID'],cand,{role:'c',nw:0})]},
   {cap:'<b>Step 2 — Sab possible pairs</b>: Candidates × REQUIRED. Agar har candidate ne har required course liya hota to TAKES mein yeh saare pairs hote.',panels:[pn('Candidates',['ID'],cand),RQ(),pn('Candidates × REQUIRED ('+all.length+' pairs)',['ID','CID'],all,{role:'a',slide:true})]},
   {cap:'<b>Step 3 — Missing pairs</b>: (Candidates × REQUIRED) <b>−</b> TAKES. Jo pair TAKES mein hai wo <span class="'+P+'ok">hara</span>, jo <b>nahi hai</b> wo <span class="'+P+'bad">laal</span> = missing. '+missing.length+' missing.',panels:[pn('Candidates × REQUIRED',['ID','CID'],all,{rm:allm}),TK(),pn('Missing pairs',['ID','CID'],missing,{role:'m',nw:0})]},
   {cap:'<b>Step 4 — Disqualified</b>: missing pairs mein jo ID aaye, unhone koi required course chhoda → <b>π<sub>ID</sub>(Missing)</b>. '+(bad.length?'Disqualified: '+bad.map(function(b){return b[0];}).join(', ')+'.':'Koi disqualified nahi.'),panels:[pn('Missing pairs',['ID','CID'],missing,{cm:{0:'r'}}),pn('Disqualified IDs',['ID'],bad,{role:'b',nw:0})]},
   {cap:'<b>Step 5 — Answer</b> = Candidates <b>−</b> Disqualified. '+(ans.length?'<b>TAKES ÷ REQUIRED = {'+ans.map(function(a){return a[0];}).join(', ')+'}</b> — inhone saare required courses liye.':'<b>Result khaali</b> — kisi ne saare required courses nahi liye.')+(req.length===0?' (REQUIRED khaali hai → sab candidates pass; division by empty relation.)':''),panels:[pn('Candidates',['ID'],cand,{rm:(function(){var o={};cand.forEach(function(c,i){o[i]=badk.indexOf(rk(c))<0?'g':'r';});return o;})()}),pn('Disqualified',['ID'],bad),pn('Answer (TAKES ÷ REQUIRED)',['ID'],ans,{role:'out',nw:0})]}];}
function lastOut(steps){var p=steps[steps.length-1].panels;return p[p.length-1].rows;}
var LOGIC={DB:DB,sigmaScene:sigmaScene,piScene:piScene,rhoScene:rhoScene,setScene:setScene,crossScene:crossScene,joinScene:joinScene,divScene:divScene,lastOut:lastOut,PAIRS:PAIRS};
var OPS=[['sigma','σ  Selection (rows filter)'],['pi','π  Projection (columns)'],['rho','ρ  Rename'],['U','∪  Union'],['I','∩  Intersection'],['D','−  Difference'],['cross','×  Cartesian product'],['NAT','⋈  Natural join'],['LEFT','⟕  Left outer join'],['RIGHT','⟖  Right outer join'],['FULL','⟗  Full outer join'],['div','÷  Division']];
function mount(el,opts){
  injectCss('.$stage{position:relative;display:flex;flex-wrap:wrap;gap:12px 16px;align-items:flex-start;padding-right:26px}.$pan{min-width:0;max-width:100%}.$ov{position:absolute;left:0;top:0;pointer-events:none;overflow:visible}.$expr{font-size:15px}.$ctl label{font-size:13px;margin-right:8px;white-space:nowrap}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','Relational Algebra Operators — animated'));
  root.appendChild(h('div','sub','Practice DB: STUDENT(ID,Name,Dept,Age), COURSE(CID,Title,Credits), ENROLL(ID,CID). Operator chuno, condition badlo, Step se dekho rows hari (rakhi) / laal (hata di) hoti hain.'));
  var op=(opts&&opts.op&&OPS.some(function(o){return o[0]===opts.op;}))?opts.op:'sigma';
  var S={tbl:'STUDENT',col:'Dept',opr:'=',val:'CSE',pcols:['Name','Dept'],rcol:'Dept',rname:'Branch',swap:false,pair:0,req:['C1','C2','C3']};
  var r1=h('div','row');var sel=mkSelect(OPS.map(function(o){return {v:o[0],t:o[1]};}),op,function(v){op=v;buildCtl();run();});r1.appendChild(sel);root.appendChild(r1);
  var ctl=h('div','try ctl');root.appendChild(ctl);var expr=h('div','code expr');root.appendChild(expr);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);var stage=h('div','stage');root.appendChild(stage);
  var ST=[];var pl=player(barHost,{n:function(){return ST.length;},show:show});
  function lab(t,node){var l=h('label','','');l.innerHTML=t+' ';l.appendChild(node);return l;}
  function colSel(tbl,val,fn){var s=mkSelect(DB[tbl].cols,undefined,fn);s.value=val;return s;}
  function buildCtl(){ctl.innerHTML='<b>Try it:</b> ';
    if(op==='sigma'){ctl.appendChild(lab('Table',mkSelect(['STUDENT','COURSE','ENROLL'],S.tbl,function(v){S.tbl=v;S.col=DB[v].cols[0];S.val=String(DB[v].rows[0][0]);buildCtl();run();})));ctl.appendChild(lab('Column',colSel(S.tbl,S.col,function(v){S.col=v;run();})));ctl.appendChild(lab('Op',mkSelect(['=','!=','<','<=','>','>='],S.opr,function(v){S.opr=v;run();})));var inp=h('input','inp mono');inp.value=S.val;inp.size=8;inp.setAttribute('aria-label','Value');inp.addEventListener('input',function(){S.val=inp.value;run();});ctl.appendChild(lab('Value',inp));}
    else if(op==='pi'){ctl.appendChild(lab('Table',mkSelect(['STUDENT','COURSE','ENROLL'],S.tbl,function(v){S.tbl=v;S.pcols=[DB[v].cols[1]||DB[v].cols[0]];buildCtl();run();})));DB[S.tbl].cols.forEach(function(c){var cb=document.createElement('input');cb.type='checkbox';cb.checked=S.pcols.indexOf(c)>=0;cb.addEventListener('change',function(){S.pcols=S.pcols.filter(function(x){return x!==c;});if(cb.checked)S.pcols.push(c);run();});var l=h('label','','');l.appendChild(cb);l.appendChild(document.createTextNode(' '+c));ctl.appendChild(l);});}
    else if(op==='rho'){ctl.appendChild(lab('Table',mkSelect(['STUDENT','COURSE','ENROLL'],S.tbl,function(v){S.tbl=v;S.rcol=DB[v].cols[DB[v].cols.length>2?2:1]||DB[v].cols[0];buildCtl();run();})));ctl.appendChild(lab('Column',colSel(S.tbl,S.rcol,function(v){S.rcol=v;run();})));var ni=h('input','inp mono');ni.value=S.rname;ni.size=9;ni.setAttribute('aria-label','Naya naam');ni.addEventListener('input',function(){S.rname=ni.value;run();});ctl.appendChild(lab('Naya naam',ni));}
    else if(op==='U'||op==='I'||op==='D'){var cb=document.createElement('input');cb.type='checkbox';cb.checked=S.swap;cb.addEventListener('change',function(){S.swap=cb.checked;run();});var l=h('label','','');l.appendChild(cb);l.appendChild(document.createTextNode(' A aur B ki jagah badlo (order dekho)'));ctl.appendChild(l);ctl.appendChild(h('span','sub','  A = CSE students ke naam, B = Age ≥ 20 wale ke naam'));}
    else if(op==='cross'){ctl.appendChild(h('span','sub','Koi input nahi — 12 pairs dekho.'));}
    else if(op==='div'){ctl.appendChild(h('span','sub','REQUIRED mein kaun-se courses hon: '));['C1','C2','C3'].forEach(function(c){var cb=document.createElement('input');cb.type='checkbox';cb.checked=S.req.indexOf(c)>=0;cb.addEventListener('change',function(){S.req=S.req.filter(function(x){return x!==c;});if(cb.checked)S.req.push(c);S.req.sort();run();});var l=h('label','','');l.appendChild(cb);l.appendChild(document.createTextNode(' '+c));ctl.appendChild(l);});}
    else{ctl.appendChild(lab('Kaun-si tables join',mkSelect(PAIRS.map(function(p,i){return {v:i,t:p[0]+' ,  '+p[1]};}),S.pair,function(v){S.pair=+v;run();})));}
  }
  function run(){
    if(op==='sigma'){ST=sigmaScene({tbl:S.tbl,col:S.col,op:S.opr,val:S.val});expr.textContent='σ '+S.col+' '+S.opr+' '+(typeof pv(S.val)==='number'?pv(S.val):"'"+pv(S.val)+"'")+' ( '+S.tbl+' )';}
    else if(op==='pi'){ST=piScene({tbl:S.tbl,cols:S.pcols});expr.textContent='π '+S.pcols.join(', ')+' ( '+S.tbl+' )';}
    else if(op==='rho'){ST=rhoScene({tbl:S.tbl,col:S.rcol,name:S.rname});expr.textContent='ρ ( '+(S.rname||S.rcol)+' / '+S.rcol+' ) ( '+S.tbl+' )';}
    else if(op==='cross'){ST=crossScene();expr.textContent='STUDENT × COURSE';}
    else if(op==='div'){ST=divScene(S.req);expr.textContent='TAKES ÷ REQUIRED   [REQUIRED = {'+S.req.join(', ')+'}]';}
    else if(op==='NAT'||op==='LEFT'||op==='RIGHT'||op==='FULL'){var pr=PAIRS[S.pair];ST=joinScene(op,pr);expr.textContent=pr[0]+' '+{NAT:'⋈',LEFT:'⟕',RIGHT:'⟖',FULL:'⟗'}[op]+' '+pr[1];}
    else{ST=setScene(op,S.swap);expr.textContent=ST[0].panels[2].t;}
    pl.stop();pl.go(0);}
  function tableHtml(p){var t='<table class="'+P+'t'+(p.slide?' '+P+'slide':'')+'"><caption>'+esc(p.t)+'</caption><tr>'+p.cols.map(function(c,i){return '<th class="'+(p.cm[i]?P+p.cm[i]:'')+'">'+esc(c)+'</th>';}).join('')+'</tr>';
    if(!p.rows.length)t+='<tr><td colspan="'+p.cols.length+'"><i>'+(p.role?'(abhi khaali)':'(khaali)')+'</i></td></tr>';
    p.rows.forEach(function(r,i){var isNew=p.nw>=0&&i>=p.nw&&p.role;t+='<tr data-r="'+i+'" class="'+(p.rm[i]?P+p.rm[i]+' ':'')+(isNew?P+'new':'')+'">'+r.map(function(c,ci){return '<td class="'+(p.cm[ci]&&!p.rm[i]?P+p.cm[ci]:'')+'">'+(c===null?'<span class="'+P+'null">NULL</span>':esc(c))+'</td>';}).join('')+'</tr>';});return t+'</table>';}
  var ov=null;
  function show(i){var s=ST[i];cap.innerHTML=s.cap;stage.innerHTML='';
    s.panels.forEach(function(p,k){var w=h('div','pan wrap');w.setAttribute('data-p',k);w.innerHTML=tableHtml(p);stage.appendChild(w);});
    if(s.lines&&s.lines.length)requestAnimationFrame(function(){drawLines(s.lines);});}
  function drawLines(lines){var sr=stage.getBoundingClientRect();var svg='<svg class="'+P+'ov" width="'+stage.scrollWidth+'" height="'+stage.scrollHeight+'" aria-hidden="true">';
    lines.forEach(function(l){var ra=stage.querySelector('[data-p="'+l.a+'"] tr[data-r="'+l.ai+'"]'),rb=stage.querySelector('[data-p="'+l.b+'"] tr[data-r="'+l.bi+'"]');if(!ra||!rb)return;var wa=ra.closest('.'+P+'pan').getBoundingClientRect(),wb=rb.closest('.'+P+'pan').getBoundingClientRect(),a=ra.getBoundingClientRect(),b=rb.getBoundingClientRect();
      var ay=a.top+a.height/2-sr.top,by=b.top+b.height/2-sr.top,ax=Math.min(a.right,wa.right)-sr.left,bx;var d;
      if(wa.right<=wb.left+4){bx=Math.max(b.left,wb.left)-sr.left;var m=(ax+bx)/2;d='M'+ax+' '+ay+' C'+m+' '+ay+' '+m+' '+by+' '+bx+' '+by;}
      else{bx=Math.min(b.right,wb.right)-sr.left;var o=Math.max(ax,bx)+16;d='M'+ax+' '+ay+' C'+o+' '+ay+' '+o+' '+by+' '+bx+' '+by;}
      svg+='<path d="'+d+'" fill="none" stroke="var(--green,#14a06b)" stroke-width="2.4" stroke-linecap="round"/><circle cx="'+ax+'" cy="'+ay+'" r="3.2" fill="var(--green,#14a06b)"/><circle cx="'+bx+'" cy="'+by+'" r="3.2" fill="var(--green,#14a06b)"/>';});
    var old=stage.querySelector('.'+P+'ov');if(old)old.remove();stage.insertAdjacentHTML('beforeend',svg+'</svg>');}
  var rz;window.addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){if(el.isConnected)pl.go(pl.i);},200);});
  buildCtl();run();
}

export { LOGIC };
registerWidget(NAME, mount);
