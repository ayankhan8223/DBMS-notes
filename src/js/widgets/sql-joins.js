/* widget: sql-joins — self-contained, registers via register() from widgets-core.js */
import { register as registerWidget } from '../widgets-core.js';
var NAME='sql-joins';
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
function nv(x){if(x===null||x===undefined)return null;x=String(x).trim();if(x===''||x.toUpperCase()==='NULL')return null;return x;}
function eqk(a,b){return a!==null&&b!==null&&a===b;}
// L rows: [id,name], R rows: [id,val]; returns {cols, rows:[{v, li, ri, kind}] , events}
function joinTables(L,R,type){
  var nat=type==='NATURAL';var cols=nat?['id','name','marks']:['S.id','name','M.id','marks'];
  var out=[],ev=[];
  function mk(l,r){return nat?[l?l[0]:r[0],l?l[1]:null,r?r[1]:null]:[l?l[0]:null,l?l[1]:null,r?r[0]:null,r?r[1]:null];}
  if(type==='CROSS'){cols=['S.id','name','M.id','marks'];L.forEach(function(l,li){var rows=[];R.forEach(function(r,ri){var o={v:mk(l,r),li:li,ri:ri};out.push(o);rows.push(o);});ev.push({li:li,ris:R.map(function(_,k){return k;}),rows:rows,text:'S ki row '+(li+1)+' har M row ke saath pair hui ('+R.length+' pairs).'});});return {cols:cols,rows:out,events:ev};}
  var inner=type==='INNER'||nat,keepL=type==='LEFT'||type==='FULL',keepR=type==='RIGHT'||type==='FULL';
  var matchedR={};
  L.forEach(function(l,li){var ris=[];R.forEach(function(r,ri){if(eqk(l[0],r[0])){ris.push(ri);matchedR[ri]=1;}});var rows=[];
    if(ris.length){ris.forEach(function(ri){var o={v:mk(l,R[ri]),li:li,ri:ri,kind:'g'};out.push(o);rows.push(o);});ev.push({li:li,ris:ris,rows:rows,text:'S row '+(li+1)+' (id='+(l[0]===null?'NULL':l[0])+') ke '+ris.length+' match mile → '+ris.length+' row bani.'});}
    else if(keepL){var o={v:mk(l,null),li:li,ri:-1,kind:'o'};out.push(o);rows.push(o);ev.push({li:li,ris:[],rows:rows,text:'S row '+(li+1)+' ka M mein match nahi — <b>'+(type==='LEFT'?'LEFT':'FULL')+'</b> mein row rehti hai, M wale columns NULL.'});}
    else ev.push({li:li,ris:[],rows:[],drop:true,text:'S row '+(li+1)+' (id='+(l[0]===null?'NULL':l[0])+') ka M mein match nahi — '+(keepR?'RIGHT mein left ka dangling row hat jaati hai':'INNER mein row hat jaati hai')+'.'});});
  if(keepR)R.forEach(function(r,ri){if(!matchedR[ri]){var o={v:mk(null,r),li:-1,ri:ri,kind:'o'};out.push(o);ev.push({li:-1,ris:[ri],rows:[o],text:'M row '+(ri+1)+' (id='+(r[0]===null?'NULL':r[0])+') ka S mein match nahi — <b>'+(type==='RIGHT'?'RIGHT':'FULL')+'</b> mein row rehti hai, S wale columns NULL.'});}});
  return {cols:cols,rows:out,events:ev};
}
function notIn(a,B){if(B.length===0)return 'T';var unk=false;for(var i=0;i<B.length;i++){if(a===null||B[i]===null){unk=true;continue;}if(a===B[i])return 'F';}return unk?'U':'T';}
function notExists(a,B){return B.some(function(b){return eqk(a,b);})?'F':'T';}
// 3-valued logic for "a <> b": any NULL => UNKNOWN. Returns 'T' | 'F' | 'U'.
function cmpNe(a,b){if(a===null||b===null)return 'U';return a!==b?'T':'F';}
// AND of 3-valued values: any FALSE => FALSE; else any UNKNOWN => UNKNOWN; else TRUE (empty AND = TRUE).
function andAll(v){if(v.indexOf('F')>=0)return 'F';if(v.indexOf('U')>=0)return 'U';return 'T';}
var LOGIC={joinTables:joinTables,notIn:notIn,notExists:notExists,nv:nv,cmpNe:cmpNe,andAll:andAll};
function mount(el,opts){
  injectCss('.$ex{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:10px;padding:8px 11px;margin:9px 0;font-size:14px}.$ex .$h{font-weight:700;margin-bottom:3px}.$ex p{margin:3px 0}.$ex ul,.$ex ol{margin:4px 0 2px 18px;padding:0}.$ex li{margin:2px 0}.$ex pre{margin:5px 0;padding:6px 9px;border-radius:8px;background:color-mix(in srgb,var(--blue,#2f5bd8) 8%,var(--card,#f6f8ff));font:12.5px/1.4 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap}.$c2{display:grid;grid-template-columns:1fr 1fr;gap:8px}@media(max-width:600px){.$c2{grid-template-columns:1fr}}.$okc{color:var(--green,#14a06b);font-weight:700}.$noc{color:var(--red,#d63b4f);font-weight:700}.$unk{color:var(--org,#e8730c);font-weight:700}.$key{border-left:4px solid var(--blue,#2f5bd8)}.$edit input{width:68px;min-height:28px;padding:2px 5px;font-size:13px}.$edit td{padding:2px 3px}.$xb{padding:0 7px;min-height:26px}.$two{display:flex;flex-wrap:wrap;gap:14px}.$venn{max-width:230px;width:100%}.$ttabs{display:flex;flex-wrap:wrap;gap:5px;margin:6px 0}.$vrow{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}.$u{background:color-mix(in srgb,var(--org,#e8730c) 30%,var(--bg,#fff))}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','SQL Joins — dono tables badlo, result dekho'));
  root.appendChild(h('div','sub','Neeche ke dono tables edit karo (id ko khaali ya NULL chhodo to NULL maana jaayega; <b>NULL kabhi kisi se match nahi hota</b>). Join type chuno, phir Step se rows banti dekho.'));
  var L=[['1','Rahul'],['2','Aman'],['3','Priya']],R=[['1','80'],['3','75'],['4','60']];
  var type='INNER';
  var edit=h('div','two edit');root.appendChild(edit);var srcL=h('div',''),srcR=h('div','');edit.appendChild(srcL);edit.appendChild(srcR);
  var trows={L:[],R:[]};
  function buildEdit(){
    [['L',L,srcL,'S (STUDENT)',['id','name']],['R',R,srcR,'M (MARKS)',['id','marks']]].forEach(function(d){var key=d[0],data=d[1],host=d[2];host.innerHTML='';
      var t=h('table','t');t.innerHTML='<caption>'+d[3]+'</caption><tr><th>'+d[4][0]+'</th><th>'+d[4][1]+'</th><th></th></tr>';trows[key]=[];
      data.forEach(function(row,ri){var tr=document.createElement('tr');trows[key].push(tr);[0,1].forEach(function(ci){var td=document.createElement('td');var inp=h('input','inp mono');inp.value=row[ci]===null?'':row[ci];inp.setAttribute('aria-label',d[3]+' row '+(ri+1)+' '+d[4][ci]);inp.addEventListener('input',function(){row[ci]=inp.value;refresh();});td.appendChild(inp);tr.appendChild(td);});
        var td=document.createElement('td');var x=btn('✕',function(){data.splice(ri,1);buildEdit();refresh();},'xb','Row hatao');td.appendChild(x);tr.appendChild(td);t.appendChild(tr);});
      host.appendChild(t);var add=btn('+ row',function(){if(data.length<5){data.push([String(data.length+1),key==='L'?'Name':'0']);buildEdit();refresh();}},'','Row jodo');host.appendChild(add);});
  }
  var tabs=h('div','ttabs');root.appendChild(tabs);var tbtn={};
  ['INNER','LEFT','RIGHT','FULL','CROSS','NATURAL'].forEach(function(t){var b=btn(t==='NATURAL'?'NATURAL':t+' JOIN',function(){type=t;refresh();},'',t);tbtn[t]=b;tabs.appendChild(b);});
  var code=h('pre','code');root.appendChild(code);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);
  var vr=h('div','vrow');root.appendChild(vr);var venn=h('div','venn');var res=h('div','wrap');vr.appendChild(venn);vr.appendChild(res);
  var J=null;
  var pl=player(barHost,{n:function(){return J?J.events.length+1:1;},show:show});
  function norm(D){return D.map(function(r){return [nv(r[0]),r[1]===''?null:r[1]];});}
  function refresh(){J=joinTables(norm(L),norm(R),type);Object.keys(tbtn).forEach(function(k){tbtn[k].className=P+'btn'+(k===type?' '+P+'on':'');});
    var sql={INNER:'SELECT * FROM S\nINNER JOIN M ON S.id = M.id;',LEFT:'SELECT * FROM S\nLEFT JOIN M ON S.id = M.id;',RIGHT:'SELECT * FROM S\nRIGHT JOIN M ON S.id = M.id;',FULL:'SELECT * FROM S\nFULL OUTER JOIN M ON S.id = M.id;',CROSS:'SELECT * FROM S\nCROSS JOIN M;   -- koi ON nahi',NATURAL:'SELECT * FROM S\nNATURAL JOIN M;  -- same naam wale column (id) par'}[type];code.textContent=sql;
    pl.stop();pl.go(0);drawVenn();}
  function drawVenn(){var l=type==='LEFT'||type==='FULL'||type==='CROSS',r=type==='RIGHT'||type==='FULL'||type==='CROSS',i=type!=='CROSS';
    var col='var(--blue,#2f5bd8)';
    venn.innerHTML='<svg viewBox="0 0 230 130" class="'+P+'venn" role="img" aria-label="Venn diagram '+type+'"><defs><clipPath id="'+P+'cl"><circle cx="88" cy="65" r="50"/></clipPath></defs>'+
     '<circle cx="88" cy="65" r="50" fill="'+(l?col:'none')+'" fill-opacity=".28"/><circle cx="142" cy="65" r="50" fill="'+(r?col:'none')+'" fill-opacity=".28"/>'+
     '<circle cx="142" cy="65" r="50" clip-path="url(#'+P+'cl)" fill="'+(type!=='CROSS'?'var(--green,#14a06b)':'none')+'" fill-opacity="'+(type!=='CROSS'?'.55':'0')+'"/>'+
     '<circle cx="88" cy="65" r="50" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="142" cy="65" r="50" fill="none" stroke="currentColor" stroke-width="2"/>'+
     '<text x="58" y="69" font-size="16" font-weight="700" text-anchor="middle" fill="currentColor">S</text><text x="172" y="69" font-size="16" font-weight="700" text-anchor="middle" fill="currentColor">M</text>'+(type==='CROSS'?'<text x="115" y="70" font-size="20" font-weight="700" text-anchor="middle" fill="currentColor">×</text>':'')+'</svg>';
    var vcap=h('div','sub',{INNER:'Sirf dono mein common (hara).',LEFT:'Poora S + common (M ke NULL).',RIGHT:'Poora M + common (S ke NULL).',FULL:'Dono ka poora.',CROSS:'Har S row × har M row = m×n.',NATURAL:'Same-naam column par match, us column ek hi baar.'}[type]);venn.appendChild(vcap);}
  function show(i){
    if(!J)return;var ev=J.events,shown=[];for(var k=0;k<i;k++)shown=shown.concat(ev[k].rows);
    var cur=i>0?ev[i-1]:null;
    cap.innerHTML=i===0?'Shuru: do tables hain. '+type+' join kaise chalta hai — Next dabao, S ki ek-ek row (phir zarurat ho to M ki) dekhi jaayegi.':(cur.text+(i===ev.length?'<br><b>Khatam. Total '+J.rows.length+' row(s).</b>':''));
    trows.L.forEach(function(tr,li){tr.className=cur&&cur.li===li?P+'o':'';});trows.R.forEach(function(tr,ri){tr.className=cur&&cur.ris.indexOf(ri)>=0?P+(cur.rows.length&&cur.rows[0].kind==='o'&&cur.li<0?'o':'g'):'';});
    var t='<table class="'+P+'t"><caption>Result ('+shown.length+' / '+J.rows.length+' rows)</caption><tr>'+J.cols.map(function(c){return '<th>'+c+'</th>';}).join('')+'</tr>';
    if(!shown.length)t+='<tr><td colspan="'+J.cols.length+'"><i>(abhi khaali)</i></td></tr>';
    shown.forEach(function(r){var isNew=cur&&cur.rows.indexOf(r)>=0;t+='<tr class="'+(isNew?P+'new ':'')+(r.kind==='o'?P+'o':'')+'">'+r.v.map(function(c){return '<td>'+(c===null?'<span class="'+P+'null">NULL</span>':esc(c))+'</td>';}).join('')+'</tr>';});
    res.innerHTML=t+'</table>';
  }
  // NOT IN trap
  var trap=h('div','try');root.appendChild(trap);
  var A=['1','2','3','4'],B=['1','3'],hasNull=false;
  var tcap=h('div','','');var tin=h('div','row');
  function ex(cls,title,body){return '<div class="'+P+'ex '+(cls||'')+'"><div class="'+P+'h">'+title+'</div>'+body+'</div>';}
  var OK='<span class="'+P+'okc">',NO='<span class="'+P+'noc">',UK='<span class="'+P+'unk">';
  trap.innerHTML='<b>NULL ka trap: NOT IN</b>'+
   '<div class="'+P+'sub">Sawaal: A ke woh ids dikhao jo B mein <b>nahi</b> hain. Dikhne mein asaan hai, par B mein <b>ek bhi NULL</b> ho to result ulta ho jaata hai. Neeche step by step samjho.</div>'+
   ex('', '1) Pehle sawaal samjho','<pre>SELECT id FROM A\nWHERE id NOT IN (SELECT id FROM B);</pre><p>Matlab: A ka har id lo, B ki list se milao. Jo B mein <b>nahi mila</b>, wahi answer hai. Hamare example mein A = 1, 2, 3, 4 aur B = 1, 3. Seedha answer: <b>2 aur 4</b>.</p>')+
   ex('', '2) Kahani: party ka doorman','<p>B = invited logon ki list. A = gate par khade log. Doorman ka rule: <b>jiska naam list mein NAHI hai, use andar aane do</b> (yahi NOT IN hai).</p><p>Ab socho list ki ek line par naam <b>mita hua</b> hai, kuch padh nahi sakte. Yahi <b>NULL</b> hai: ek value jo hai to, par humein <b>pata nahi</b> wo kya hai.</p>')+
   ex('', '3) Id = 2 ke saath dekho','<div class="'+P+'c2"><div><p><b>NULL ke bina</b> (B = 1, 3)</p><ol><li><code>2 = 1</code>? Nahi.</li><li><code>2 = 3</code>? Nahi.</li><li>Pakka hai ki 2 list mein nahi. '+OK+'NOT IN = TRUE</span> &rarr; row <b>aayi</b> ✓</li></ol></div><div><p><b>NULL ke saath</b> (B = 1, 3, NULL)</p><ol><li><code>2 = 1</code>? Nahi.</li><li><code>2 = 3</code>? Nahi.</li><li><code>2 = NULL</code>? '+UK+'Pata nahi (UNKNOWN)</span>. Kya pata mita hua naam asal mein 2 hi ho!</li><li>Pakka nahi bol sakte. '+UK+'NOT IN = UNKNOWN</span> &rarr; <code>WHERE</code> ne row <b>hata di</b> ✗</li></ol></div></div>')+
   ex('', '4) Id = 1 ke saath dekho','<p><code>1 = 1</code> mil gaya, to pakka hai ki 1 B mein hai. '+NO+'NOT IN = FALSE</span> &rarr; row gayi. NULL ho ya na ho, <b>1 ka jawab nahi badalta</b>. Badalte sirf wo ids hain jo B mein <b>mile hi nahi</b> (2 aur 4): TRUE se UNKNOWN ban jaate hain.</p>')+
   ex(P+'key', '5) Teen baatein yaad rakho','<ol><li><b>NULL = &ldquo;pata nahi&rdquo;.</b> <code>x = NULL</code> ka jawab TRUE bhi nahi, FALSE bhi nahi: <b>UNKNOWN</b>.</li><li><code>WHERE</code> sirf <b>TRUE</b> rows rakhta hai. UNKNOWN wali row bhi hat jaati hai.</li><li>Isliye B mein <b>ek bhi NULL</b> ho to NOT IN se <b>koi row nahi aati</b>: jo B mein hain wo FALSE, baaki sab UNKNOWN.</li></ol>')+
   ex('', '6) Isse bachne ke 2 tareeke','<pre>-- 1) NOT EXISTS: match dhoondta hai, NULL kisi se match nahi hota\nSELECT id FROM A\nWHERE NOT EXISTS (SELECT 1 FROM B WHERE B.id = A.id);\n\n-- 2) NOT IN ke andar NULL hata do\nSELECT id FROM A\nWHERE id NOT IN (SELECT id FROM B WHERE id IS NOT NULL);</pre><p>Dono mein answer <b>2 aur 4</b> hi aata hai, NULL ho ya na ho.</p>')+
   '<div class="'+P+'sub" style="margin-top:8px"><b>Ab khud try karo:</b> A ids / B ids badlo, ya toggle dabao.</div>';
  var ia=h('input','inp mono');ia.value=A.join(', ');ia.setAttribute('aria-label','A ids');var ib=h('input','inp mono');ib.value=B.join(', ');ib.setAttribute('aria-label','B ids');
  var cb=document.createElement('input');cb.type='checkbox';cb.id=P+'cb'+Math.random().toString(36).slice(2);var cl=document.createElement('label');cl.htmlFor=cb.id;cl.textContent=' B mein NULL daalo';
  [['A ids',ia],['B ids',ib]].forEach(function(p){var c=h('div','col');c.appendChild(h('span','lab',p[0]));c.appendChild(p[1]);tin.appendChild(c);});var cw=h('div','col');cw.appendChild(h('span','lab','Toggle'));var cc=h('div','');cc.appendChild(cb);cc.appendChild(cl);cw.appendChild(cc);tin.appendChild(cw);trap.appendChild(tin);
  var tout=h('div','wrap');trap.appendChild(tout);var tmsg=h('div','');trap.appendChild(tmsg);
  var tsteps=h('div','');trap.appendChild(tsteps);
  function parseList(s){return s.split(',').map(function(x){return nv(x);}).filter(function(x,i,a){return !(x===null&&s.trim()==='');});}
  function hasNullIn(b){return b.some(function(x){return x===null;});}
  // Step-by-step tables: x NOT IN (b1, b2, ...) is  x<>b1 AND x<>b2 AND ...  (one column per b, then the AND).
  function stepTables(a,bClean){
    var NM={T:'TRUE',F:'FALSE',U:'UNKNOWN'};
    function cell(v){return '<td class="'+P+(v==='T'?'g':v==='U'?'o':'x')+'">'+NM[v]+'</td>';}
    function build(title,bs){var finals=[];
      var t='<table class="'+P+'t"><caption>'+title+'</caption><tr><th>A.id</th>'+bs.map(function(b){return '<th>&lt;&gt; '+(b===null?'NULL':esc(b))+'</th>';}).join('')+'<th>Final AND</th><th>Output</th></tr>';
      a.forEach(function(x){var cs=bs.map(function(b){return cmpNe(x,b);}),f=andAll(cs);finals.push(f);
        t+='<tr><td>'+(x===null?'NULL':esc(x))+'</td>'+cs.map(cell).join('')+cell(f)+'<td class="'+P+(f==='T'?'g':'x')+'">'+(f==='T'?'Keep ✓':'Reject')+'</td></tr>';});
      return {html:'<div class="'+P+'wrap">'+t+'</table></div>',finals:finals};}
    var t1=build('Table 1: NOT IN — NULL ke bina',bClean),t2=build('Table 2: NOT IN — NULL ke saath',bClean.concat([null]));
    var c='<table class="'+P+'t"><caption>Table 3: Comparison</caption><tr><th>A.id</th><th>NULL ke bina</th><th>NULL ke saath</th></tr>';
    a.forEach(function(x,i){c+='<tr><td>'+(x===null?'NULL':esc(x))+'</td>'+cell(t1.finals[i])+cell(t2.finals[i])+'</tr>';});
    return '<div class="'+P+'sub" style="margin-top:10px">Step-by-step: <code>x NOT IN (b1, b2, …)</code> = <code>x&lt;&gt;b1 AND x&lt;&gt;b2 AND …</code>. FALSE AND UNKNOWN = FALSE, TRUE AND UNKNOWN = UNKNOWN. <code>WHERE</code> sirf TRUE rakhta hai.</div>'+t1.html+t2.html+'<div class="'+P+'wrap">'+c+'</table></div>';
  }
  function trapRender(){var a=parseList(ia.value),b=parseList(ib.value);var hasNull=hasNullIn(b);
    tsteps.innerHTML=stepTables(a,b.filter(function(x){return x!==null;}));
    var t='<table class="'+P+'t"><tr><th>A.id</th><th>id NOT IN B</th><th>NOT EXISTS</th></tr>';var rin=[],rex=[];
    a.forEach(function(x){var v=notIn(x,b),e=notExists(x,b);if(v==='T')rin.push(x);if(e==='T')rex.push(x);var nm={T:'TRUE ✓ (row aayi)',F:'FALSE (row gayi)',U:'UNKNOWN (row gayi)'};t+='<tr><td>'+(x===null?'NULL':esc(x))+'</td><td class="'+P+(v==='T'?'g':v==='U'?'o':'x')+'">'+nm[v]+'</td><td class="'+P+(e==='T'?'g':'x')+'">'+(e==='T'?'TRUE ✓':'FALSE')+'</td></tr>';});
    tout.innerHTML=t+'</table>';
    tmsg.innerHTML='NOT IN result: <b>'+(rin.length?rin.join(', '):'(khaali)')+'</b> &nbsp;|&nbsp; NOT EXISTS result: <b>'+(rex.length?rex.join(', '):'(khaali)')+'</b>'+(hasNull&&!rin.length&&rex.length?'<br><span class="'+P+'bad">Trap!</span> <code>x NOT IN (…, NULL)</code> = <code>x≠1 AND x≠3 AND x≠NULL</code> — aakhri part UNKNOWN, to poora UNKNOWN, WHERE sirf TRUE rows rakhta hai. NOT EXISTS (ya NOT IN ke andar IS NOT NULL filter) safe hai.':'');}
  // B ids box ka text hi asli source hai: toggle ON => box mein ', NULL' judta hai, OFF => NULL hat jaata hai.
  function setNullInB(on){
    var toks=ib.value.split(',').map(function(x){return x.trim();}).filter(function(x){return x!=='';});
    toks=toks.filter(function(x){return nv(x)!==null;});
    if(on)toks.push('NULL');
    ib.value=toks.join(', ');
  }
  ia.addEventListener('input',trapRender);
  ib.addEventListener('input',function(){cb.checked=hasNullIn(parseList(ib.value));trapRender();});
  cb.addEventListener('change',function(){setNullInB(cb.checked);trapRender();});
  buildEdit();refresh();trapRender();
}

export { LOGIC };
registerWidget(NAME, mount);
