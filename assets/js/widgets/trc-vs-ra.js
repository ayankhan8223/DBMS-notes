/* widget: trc-vs-ra — self-contained, registers via window.Widgets.register */
(function(){'use strict';
var NAME='trc-vs-ra';
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
function enrolled(id,cid){return DB.ENROLL.rows.some(function(e){return e[0]===id&&e[1]===cid;});}
function courses(o){return DB.COURSE.rows.filter(function(c){return !(o&&o.noC3&&c[0]==='C3');});}
function dedupe(rows){var s={},o=[];rows.forEach(function(r){var k=JSON.stringify(r);if(!s[k]){s[k]=1;o.push(r);}});return o;}
var QS=[
 {id:'filter',n:'1. Filter — CSE ke students ke naam',out:['Name'],
  ra:['STUDENT','σ Dept=\'CSE\' (STUDENT)','π Name ( σ Dept=\'CSE\' (STUDENT) )'],
  trc:'{ t.Name | t ∈ STUDENT ∧ t.Dept = \'CSE\' }',
  eng:'Hinglish: tuple t jo STUDENT mein ho aur uska Dept CSE ho; uska Name do.',
  cands:function(){return DB.STUDENT.rows.map(function(s){var ok=s[2]==='CSE';return {label:'t = ('+s.join(', ')+')',ok:ok,why:'Dept = '+s[2]+(ok?' = CSE ✓':' ≠ CSE ✗'),out:[s[1]]};});}},
 {id:'join',n:'2. Join — student ka naam + course title',out:['Name','Title'],
  ra:['STUDENT ⋈ ENROLL (ID par)','(STUDENT ⋈ ENROLL) ⋈ COURSE (CID par)','π Name,Title ( STUDENT ⋈ ENROLL ⋈ COURSE )'],
  trc:'{ s.Name, c.Title | s ∈ STUDENT ∧ c ∈ COURSE ∧ ∃e ∈ ENROLL ( e.ID = s.ID ∧ e.CID = c.CID ) }',
  eng:'Hinglish: student s aur course c lo, aisa ki koi enrollment e ho jo dono ko jode.',
  cands:function(){var o=[];DB.STUDENT.rows.forEach(function(s){DB.COURSE.rows.forEach(function(c){var ok=enrolled(s[0],c[0]);o.push({label:'s='+s[1]+', c='+c[0],ok:ok,why:ok?'ENROLL mein ('+s[0]+','+c[0]+') hai ✓':'ENROLL mein ('+s[0]+','+c[0]+') nahi ✗',out:[s[1],c[1]]});});});return o;}},
 {id:'not',n:'3. NOT — jo kisi course mein enrolled nahi',out:['Name'],
  ra:['π ID (STUDENT)','π ID (STUDENT) − π ID (ENROLL)   (enroll nahi hue IDs)','π Name ( STUDENT ⋈ ( π ID(STUDENT) − π ID(ENROLL) ) )'],
  trc:'{ s.Name | s ∈ STUDENT ∧ ¬∃e ∈ ENROLL ( e.ID = s.ID ) }',
  eng:'Hinglish: student s jiske liye aisi koi enrollment e nahi hai jiski ID s.ID ho.',
  cands:function(){return DB.STUDENT.rows.map(function(s){var n=DB.ENROLL.rows.filter(function(e){return e[0]===s[0];}).length;var ok=n===0;return {label:'s = '+s[1],ok:ok,why:'ENROLL mein '+n+' row(s) → ¬∃ '+(ok?'true ✓':'false ✗'),out:[s[1]]};});}},
 {id:'both',n:'4. BOTH — C1 aur C2 dono mein enrolled',out:['Name'],
  ra:['π ID ( σ CID=\'C1\' (ENROLL) )','π ID(σ CID=\'C1\'(ENROLL))  ∩  π ID(σ CID=\'C2\'(ENROLL))','π Name ( STUDENT ⋈ ( … ∩ … ) )'],
  trc:'{ s.Name | s ∈ STUDENT ∧ ∃e1 ∈ ENROLL ( e1.ID = s.ID ∧ e1.CID = \'C1\' ) ∧ ∃e2 ∈ ENROLL ( e2.ID = s.ID ∧ e2.CID = \'C2\' ) }',
  eng:'Hinglish: ek hi student ke liye do alag existential — ek C1 wali enrollment aur ek C2 wali.',
  cands:function(){return DB.STUDENT.rows.map(function(s){var a=enrolled(s[0],'C1'),b=enrolled(s[0],'C2');return {label:'s = '+s[1],ok:a&&b,why:'C1: '+(a?'✓':'✗')+', C2: '+(b?'✓':'✗'),out:[s[1]]};});}},
 {id:'all',n:'5. ALL — saare courses mein enrolled (÷)',out:['Name'],opt:'noC3',
  ra:['π CID (COURSE)   (jo sab chahiye)','ENROLL ÷ π CID (COURSE)   (IDs jo saare CIDs ke saath dikhein)','π Name ( STUDENT ⋈ ( ENROLL ÷ π CID(COURSE) ) )'],
  trc:'{ s.Name | s ∈ STUDENT ∧ ∀c ∈ COURSE ∃e ∈ ENROLL ( e.ID = s.ID ∧ e.CID = c.CID ) }',
  eng:'Hinglish: har course c ke liye s ki ek enrollment mile. (∀ = "sab ke liye")',
  cands:function(o){var cs=courses(o);return DB.STUDENT.rows.map(function(s){var det=cs.map(function(c){return c[0]+(enrolled(s[0],c[0])?'✓':'✗');});var ok=cs.every(function(c){return enrolled(s[0],c[0]);});return {label:'s = '+s[1],ok:ok,why:det.join(' ')+(ok?' → sab ✓':' → koi ✗'),out:[s[1]]};});}}
];
function result(q,o){return dedupe(q.cands(o).filter(function(c){return c.ok;}).map(function(c){return c.out;}));}
var LOGIC={DB:DB,QS:QS,result:result};
function mount(el,opts){
  injectCss('.$two{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:640px){.$two{grid-template-columns:1fr}}.$box{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:10px;padding:8px 10px;min-width:0}.$box h4{margin:0 0 4px;font-size:13px}.$ras{font-family:ui-monospace,Menlo,monospace;font-size:13px;padding:3px 0;border-bottom:1px dashed var(--line,#d7deee);word-break:break-word}.$ras:last-child{border:0}.$cand{display:flex;gap:6px;align-items:baseline;padding:3px 6px;border-radius:7px;margin:2px 0;font-size:13px;border:1px solid transparent}.$cand.$ok1{background:color-mix(in srgb,var(--green,#14a06b) 22%,var(--bg,#fff))}.$cand.$no1{background:color-mix(in srgb,var(--red,#d63b4f) 16%,var(--bg,#fff));opacity:.8}.$cand.$cur{border-color:var(--org,#e8730c)}.$cand.$wait{opacity:.35}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','Relational Algebra  vs  Tuple Relational Calculus'));
  root.appendChild(h('div','sub','Ek hi sawal — RA mein <b>kaise</b> (procedure), TRC mein <b>kya chahiye</b> (condition). Neeche TRC ko tuple-by-tuple chalke dekho.'));
  var qi=0,opt={noC3:false};
  var sel=mkSelect(QS.map(function(q,i){return {v:i,t:q.n};}),0,function(v){qi=+v;build();});
  var r1=h('div','row');r1.appendChild(sel);root.appendChild(r1);
  var dbn=h('div','sub','');dbn.innerHTML='DB: STUDENT(ID,Name,Dept,Age) · COURSE(CID,Title,Credits) · ENROLL(ID,CID)';root.appendChild(dbn);
  var tryBox=h('div','try');var cbId=P+'c'+Math.random().toString(36).slice(2);tryBox.innerHTML='<b>Try it:</b> <input type="checkbox" id="'+cbId+'"> <label for="'+cbId+'">COURSE table se C3 (Maths) hata do</label> — dekho ∀ ka result kaise badalta hai.';root.appendChild(tryBox);
  tryBox.querySelector('input').addEventListener('change',function(e){opt.noC3=e.target.checked;build();});
  var two=h('div','two');root.appendChild(two);var raB=h('div','box'),trB=h('div','box');two.appendChild(raB);two.appendChild(trB);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);
  var C=[];var resHost=h('div','wrap');root.appendChild(resHost);
  var pl=player(barHost,{n:function(){return C.length+2;},show:show});
  function build(){var q=QS[qi];tryBox.style.display=q.opt?'':'none';C=q.cands(opt);
    raB.innerHTML='<h4>RA — step-by-step expression (andar se bahar)</h4>'+q.ra.map(function(s,i){return '<div class="'+P+'ras">'+(i+1)+'. '+esc(s)+'</div>';}).join('');
    trB.innerHTML='<h4>TRC — formula</h4><div class="'+P+'ras">'+esc(q.trc)+'</div><div class="'+P+'sub" style="margin-top:6px">'+esc(q.eng)+'</div><div id="'+P+'cands"></div>';
    pl.stop();pl.go(0);}
  function show(i){var q=QS[qi];var host=trB.querySelector('div[id$="cands"]');if(!host)return;host.innerHTML='';
    C.forEach(function(c,k){var st=k<i?(c.ok?'ok1':'no1'):'wait';var d=h('div','cand '+st+(k===i-1?' cur':''),'<b>'+esc(c.label)+'</b> <span>'+esc(c.why)+'</span>'+(k<i?(c.ok?' <span class="'+P+'ok">→ output</span>':' <span class="'+P+'bad">→ skip</span>'):''));host.appendChild(d);});
    var res=result(q,opt),shown=dedupe(C.slice(0,i).filter(function(c){return c.ok;}).map(function(c){return c.out;}));
    if(i===0)cap.innerHTML='TRC mein hum har candidate tuple par condition lagate hain. Next dabao — ek-ek candidate check hoga.';
    else if(i<=C.length)cap.innerHTML='Candidate '+i+'/'+C.length+': <b>'+esc(C[i-1].label)+'</b> — '+esc(C[i-1].why)+(C[i-1].ok?' → formula <b>true</b>, output mein jaayega.':' → formula <b>false</b>.');
    else cap.innerHTML='Saare candidates ho gaye. '+(res.length?'RA aur TRC dono ka <b>same result</b>: '+res.length+' row(s).':'Result <b>khaali</b> hai — koi student formula ko satisfy nahi karta.')+(q.id==='all'&&!opt.noC3&&!res.length?' Wajah: C3 mein koi enrolled nahi → ∀ kisi ke liye true nahi. Upar C3 hatao aur dekho!':'');
    var t='<table class="'+P+'t"><caption>Result ('+(i>C.length?'final':'abhi tak')+')</caption><tr>'+q.out.map(function(c){return '<th>'+c+'</th>';}).join('')+'</tr>';
    var rows=i>C.length?res:shown;if(!rows.length)t+='<tr><td colspan="'+q.out.length+'"><i>(khaali)</i></td></tr>';rows.forEach(function(r){t+='<tr class="'+P+'g">'+r.map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';});
    resHost.innerHTML=t+'</table>';
  }
  build();
}

if(typeof module!=='undefined'&&module.exports){module.exports=LOGIC;}
if(typeof window!=='undefined'&&typeof document!=='undefined'){if(window.Widgets&&window.Widgets.register){window.Widgets.register(NAME,mount);}else{(window.__widgetQueue=window.__widgetQueue||[]).push([NAME,mount]);}}
})();
