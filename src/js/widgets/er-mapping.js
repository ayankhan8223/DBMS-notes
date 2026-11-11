/* widget: er-mapping — self-contained, registers via register() from widgets-core.js */
import { register as registerWidget } from '../widgets-core.js';
var NAME='er-mapping';
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
function T(name,cols,rows){return {name:name,cols:cols,rows:rows||null};}
function c(n,k,ref,hl){return {n:n,k:k||'',ref:ref||'',hl:!!hl};}
var FR=[
 {id:'1:1',n:'1:1 — Person ↔ Passport',
  nodes:[['e','p',55,75,'Person'],['a','pid',28,24,'PID',1],['a','pn',90,128,'Name'],['r','has',180,75,'has'],['e','q',305,75,'Passport'],['a','no',282,24,'PNo',1],['a','co',322,128,'Country']],
  edges:[['p','pid'],['p','pn'],['p','has','1'],['has','q','1'],['q','no'],['q','co']],
  steps:[{hl:[],cap:'ER diagram: ek Person ka sirf ek Passport, aur ek Passport sirf ek Person ka (1:1).',tabs:[]},
   {hl:['p','q'],cap:'Step 1: <b>Har entity → ek table</b>. Key attribute → PRIMARY KEY (underline).',tabs:[T('Person',[c('PID','pk'),c('Name')]),T('Passport',[c('PNo','pk'),c('Country')])]},
   {hl:['has'],cap:'Step 2: Relationship <b>has</b> ke liye alag table nahi. Kisi ek side mein dusre ki key (<b>FK</b>) daalo + <b>UNIQUE</b> (taaki 1:1 rahe). Jis side ki participation total ho wahan FK rakhna better (Passport ke bina Person nahi, par yahan Passport hamesha kisi Person ka hai).',tabs:[T('Person',[c('PID','pk'),c('Name')]),T('Passport',[c('PNo','pk'),c('Country'),c('PID','fk','Person(PID)',true)])]},
   {hl:[],cap:'Step 3: Sample data. PID har Passport row mein sirf ek baar (UNIQUE).',tabs:[T('Person',[c('PID','pk'),c('Name')],[[1,'Rahul'],[2,'Aman']]),T('Passport',[c('PNo','pk'),c('Country'),c('PID','fk','Person(PID)',true)],[['P77','India',1],['P91','India',2]])]}],
  quiz:{q:'1:1 mein FK kahan jaata hai?',o:['Dono tables mein','Kisi ek table mein, UNIQUE ke saath','Teesri alag table mein'],a:1}},
 {id:'1:N',n:'1:N — Dept ↔ Employee',
  nodes:[['e','d',55,75,'Dept'],['a','did',28,24,'DID',1],['a','dn',90,128,'DName'],['r','w',180,75,'works_in'],['e','m',305,75,'Employee'],['a','eid',282,24,'EID',1],['a','en',322,128,'EName']],
  edges:[['d','did'],['d','dn'],['d','w','1'],['w','m','N'],['m','eid'],['m','en']],
  steps:[{hl:[],cap:'ER diagram: ek Dept mein <b>bahut</b> Employees, par ek Employee sirf <b>ek</b> Dept mein (1:N).',tabs:[]},
   {hl:['d','m'],cap:'Step 1: Dono entities → tables.',tabs:[T('Dept',[c('DID','pk'),c('DName')]),T('Employee',[c('EID','pk'),c('EName')])]},
   {hl:['w','m'],cap:'Step 2: <b>FK hamesha N side par</b> — Employee table mein DID (Dept ki key). Kyunki ek Employee ki sirf ek Dept hoti hai, ek hi column kaafi.',tabs:[T('Dept',[c('DID','pk'),c('DName')]),T('Employee',[c('EID','pk'),c('EName'),c('DID','fk','Dept(DID)',true)])]},
   {hl:[],cap:'Step 3: Data — Dept 10 ke 2 employees hain, isliye DID 10 do baar aaya (allowed). Ulta (Dept mein EID) hota to ek cell mein list banti ✗.',tabs:[T('Dept',[c('DID','pk'),c('DName')],[[10,'CSE'],[20,'ECE']]),T('Employee',[c('EID','pk'),c('EName'),c('DID','fk','Dept(DID)',true)],[[1,'Rahul',10],[2,'Aman',10],[3,'Priya',20]])]}],
  quiz:{q:'1:N mein FK kahan jaata hai?',o:['1 side (Dept) mein','N side (Employee) mein','Alag table mein'],a:1}},
 {id:'M:N',n:'M:N — Student ↔ Course',
  nodes:[['e','s',50,75,'Student'],['a','sid',24,24,'SID',1],['a','sn',70,128,'Name'],['r','en',180,75,'enrolls'],['a','gr',180,128,'Grade'],['e','c',310,75,'Course'],['a','cid',286,24,'CID',1],['a','ct',326,128,'Title']],
  edges:[['s','sid'],['s','sn'],['s','en','M'],['en','c','N'],['en','gr'],['c','cid'],['c','ct']],
  steps:[{hl:[],cap:'ER diagram: ek Student bahut Courses, ek Course bahut Students (M:N). Grade relationship ka apna attribute hai.',tabs:[]},
   {hl:['s','c'],cap:'Step 1: Dono entities → tables.',tabs:[T('Student',[c('SID','pk'),c('Name')]),T('Course',[c('CID','pk'),c('Title')])]},
   {hl:['en','gr'],cap:'Step 2: M:N ke liye <b>teesri table</b> (relationship table). Dono keys FK banti hain, dono milke <b>composite PK</b>. Relationship ka attribute (Grade) bhi yahin.',tabs:[T('Student',[c('SID','pk'),c('Name')]),T('Course',[c('CID','pk'),c('Title')]),T('Enroll',[c('SID','pkfk','Student(SID)',true),c('CID','pkfk','Course(CID)',true),c('Grade','',' ',true)])]},
   {hl:[],cap:'Step 3: Data — Rahul 2 courses, DBMS 2 students. Har pair ek row.',tabs:[T('Student',[c('SID','pk'),c('Name')],[[1,'Rahul'],[2,'Aman']]),T('Course',[c('CID','pk'),c('Title')],[['C1','DBMS'],['C2','Python']]),T('Enroll',[c('SID','pkfk','Student(SID)',true),c('CID','pkfk','Course(CID)',true),c('Grade')],[[1,'C1','A'],[1,'C2','B'],[2,'C1','B']])]}],
  quiz:{q:'M:N ka mapping kaise hota hai?',o:['Student mein CID daalo','Course mein SID daalo','Alag table (SID, CID) — dono FK'],a:2}},
 {id:'weak',n:'Weak entity — Employee ↔ Dependent',
  nodes:[['e','e',55,75,'Employee'],['a','eid',28,24,'EID',1],['a','en',90,128,'EName'],['r','h',180,75,'has','id'],['w','d',305,75,'Dependent'],['a','dn',282,24,'DName',2],['a','ag',322,128,'Age']],
  edges:[['e','eid'],['e','en'],['e','h','1'],['h','d','N'],['d','dn'],['d','ag']],
  steps:[{hl:[],cap:'ER diagram: Dependent <b>weak entity</b> hai (double box) — iski apni poori key nahi, sirf partial key DName (dashed underline). Employee (owner) ke bina pehchaan nahi.',tabs:[]},
   {hl:['e','d'],cap:'Step 1: Tables banao. Dependent ke paas abhi sirf partial key DName hai — yeh akeli PK nahi ban sakti (do employees ke bachhe ka naam same ho sakta hai).',tabs:[T('Employee',[c('EID','pk'),c('EName')]),T('Dependent',[c('DName','',''),c('Age')])]},
   {hl:['h','d'],cap:'Step 2: Owner ki key <b>EID</b> Dependent mein FK banke aati hai, aur <b>PK = (EID + DName)</b>. Owner delete ho to dependents bhi (ON DELETE CASCADE).',tabs:[T('Employee',[c('EID','pk'),c('EName')]),T('Dependent',[c('EID','pkfk','Employee(EID)',true),c('DName','pk'),c('Age')])]},
   {hl:[],cap:'Step 3: Data — "Sam" naam do alag employees ke bachhon ka hai, par (EID,DName) alag hai.',tabs:[T('Employee',[c('EID','pk'),c('EName')],[[1,'Rahul'],[2,'Aman']]),T('Dependent',[c('EID','pkfk','Employee(EID)',true),c('DName','pk'),c('Age')],[[1,'Sam',8],[2,'Sam',5],[2,'Tia',2]])]}],
  quiz:{q:'Dependent ki Primary Key kya hogi?',o:['DName','EID','EID + DName (composite)'],a:2}},
 {id:'multi',n:'Multivalued attribute — Student.Phone',
  nodes:[['e','s',90,75,'Student'],['a','sid',45,24,'SID',1],['a','sn',150,24,'Name'],['m','ph',250,100,'Phone']],
  edges:[['s','sid'],['s','sn'],['s','ph']],
  steps:[{hl:[],cap:'ER diagram: Student ke ek se zyada Phone ho sakte hain — <b>multivalued</b> attribute (double ellipse).',tabs:[]},
   {hl:['s'],cap:'Step 1: Student table — multivalued Phone yahan <b>nahi</b> rakhte (ek cell mein list = 1NF violation).',tabs:[T('Student',[c('SID','pk'),c('Name')])]},
   {hl:['ph'],cap:'Step 2: Multivalued attribute ke liye <b>nayi table</b>: owner ki key (FK) + attribute. PK = (SID, Phone).',tabs:[T('Student',[c('SID','pk'),c('Name')]),T('Student_Phone',[c('SID','pkfk','Student(SID)',true),c('Phone','pk','',true)])]},
   {hl:[],cap:'Step 3: Data — Rahul ke 2 phone = 2 rows.',tabs:[T('Student',[c('SID','pk'),c('Name')],[[1,'Rahul'],[2,'Aman']]),T('Student_Phone',[c('SID','pkfk','Student(SID)',true),c('Phone','pk','',true)],[[1,'98110'],[1,'98220'],[2,'91330']])]}],
  quiz:{q:'Multivalued attribute ka kya karte hain?',o:['Student mein comma se likh do','Alag table (SID, Phone)','Phone1, Phone2, Phone3 columns'],a:1}}
];
var LOGIC={FR:FR};
function drawER(fr,hl){
  var N={};fr.nodes.forEach(function(n){N[n[1]]={t:n[0],x:(n[0]==='a'||n[0]==='m')?Math.max(34,Math.min(326,n[2])):n[2],y:n[3],l:n[4],k:n[5]};});
  var s='<svg viewBox="0 0 360 150" role="img" aria-label="ER diagram" style="width:100%;max-width:520px;display:block;margin:0 auto" font-family="system-ui" font-size="12">';
  fr.edges.forEach(function(e){var a=N[e[0]],b=N[e[1]];s+='<line x1="'+a.x+'" y1="'+a.y+'" x2="'+b.x+'" y2="'+b.y+'" stroke="currentColor" stroke-opacity=".6" stroke-width="1.4"'+(a.t==='r'&&b.t==='w'||b.t==='r'&&a.t==='w'?'':'')+'/>';
    if(e[2]){var mx=(a.x*.45+b.x*.55),my=(a.y*.45+b.y*.55);s+='<text x="'+mx+'" y="'+(my-5)+'" text-anchor="middle" font-weight="700" fill="var(--org,#e8730c)" font-size="13">'+e[2]+'</text>';}});
  fr.nodes.forEach(function(n){var id=n[1],o=N[id],on=hl.indexOf(id)>=0,fill=on?'color-mix(in srgb,var(--org,#e8730c) 30%,var(--bg,#fff))':'var(--bg,#fff)',stk=on?'var(--org,#e8730c)':'currentColor',sw=on?2.6:1.5;
    if(o.t==='e'||o.t==='w'){s+='<rect x="'+(o.x-38)+'" y="'+(o.y-17)+'" width="76" height="34" rx="3" fill="'+fill+'" stroke="'+stk+'" stroke-width="'+sw+'"/>';if(o.t==='w')s+='<rect x="'+(o.x-33)+'" y="'+(o.y-12)+'" width="66" height="24" fill="none" stroke="'+stk+'" stroke-width="1.2"/>';s+='<text x="'+o.x+'" y="'+(o.y+4)+'" text-anchor="middle" font-weight="700" fill="currentColor">'+o.l+'</text>';}
    else if(o.t==='r'){s+='<polygon points="'+o.x+','+(o.y-24)+' '+(o.x+40)+','+o.y+' '+o.x+','+(o.y+24)+' '+(o.x-40)+','+o.y+'" fill="'+fill+'" stroke="'+stk+'" stroke-width="'+sw+'"/>';if(o.k==='id')s+='<polygon points="'+o.x+','+(o.y-19)+' '+(o.x+32)+','+o.y+' '+o.x+','+(o.y+19)+' '+(o.x-32)+','+o.y+'" fill="none" stroke="'+stk+'" stroke-width="1.1"/>';s+='<text x="'+o.x+'" y="'+(o.y+4)+'" text-anchor="middle" font-size="11" fill="currentColor">'+o.l+'</text>';}
    else{s+='<ellipse cx="'+o.x+'" cy="'+o.y+'" rx="30" ry="14" fill="'+fill+'" stroke="'+stk+'" stroke-width="'+sw+'"'+(o.k===2?' stroke-dasharray="0"':'')+'/>';if(o.t==='m')s+='<ellipse cx="'+o.x+'" cy="'+o.y+'" rx="25" ry="10" fill="none" stroke="'+stk+'" stroke-width="1.1"/>';
      s+='<text x="'+o.x+'" y="'+(o.y+4)+'" text-anchor="middle" fill="currentColor"'+(o.k===1?' text-decoration="underline"':'')+'>'+o.l+'</text>';if(o.k===2)s+='<line x1="'+(o.x-17)+'" y1="'+(o.y+8)+'" x2="'+(o.x+17)+'" y2="'+(o.y+8)+'" stroke="currentColor" stroke-dasharray="3 2"/>';}});
  return s+'</svg>';}
function mount(el,opts){
  injectCss('.$tabs{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start}.$tt th.$pk{text-decoration:underline;background:color-mix(in srgb,var(--green,#14a06b) 25%,var(--bg,#fff))}.$tt th.$pkfk{text-decoration:underline;background:color-mix(in srgb,var(--org,#e8730c) 32%,var(--bg,#fff))}.$tt th.$fk{background:color-mix(in srgb,var(--org,#e8730c) 32%,var(--bg,#fff))}.$tt th small{display:block;font-weight:400;color:var(--mut,#5b6580);font-size:10px}.$tt th.$hl{animation:$pulse 1.1s ease 2}@keyframes $pulse{50%{box-shadow:inset 0 0 0 3px var(--org,#e8730c)}}.$ans{margin-right:6px;margin-top:4px}.$er{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:10px;padding:6px;color:var(--ink,#1b2438)}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','ER diagram → Tables (mapping)'));
  root.appendChild(h('div','sub','Fragment chuno. Har step mein dekho ER ka kaun-sa hissa table bana, aur <b>FK kahan</b> baitha (naarangi).'));
  var fi=0;var sel=mkSelect(FR.map(function(f,i){return {v:i,t:f.n};}),0,function(v){fi=+v;pl.stop();pl.go(0);buildQuiz();});
  var r1=h('div','row');r1.appendChild(sel);root.appendChild(r1);
  var er=h('div','er');root.appendChild(er);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);var tabs=h('div','tabs');root.appendChild(tabs);
  var qz=h('div','try');root.appendChild(qz);
  var pl=player(barHost,{n:function(){return FR[fi].steps.length;},show:show});
  var prev=[];
  function buildQuiz(){var q=FR[fi].quiz;qz.innerHTML='<b>Try it:</b> '+esc(q.q)+'<br>';var fb=h('div','','');q.o.forEach(function(o,i){var b=btn(o,function(){fb.innerHTML=i===q.a?'<span class="'+P+'ok">✓ Sahi!</span> Upar Step 2/3 dekho.':'<span class="'+P+'bad">✗ Nahi.</span> Ek baar steps dobara chalao aur dekho.';},'ans');qz.appendChild(b);});qz.appendChild(fb);}
  function show(i){var f=FR[fi],s=f.steps[i];er.innerHTML=drawER(f,s.hl);cap.innerHTML=s.cap;tabs.innerHTML='';
    var pn=i>0?f.steps[i-1].tabs.map(function(t){return t.name;}):[];
    s.tabs.forEach(function(t){var w=h('div','wrap'+(pn.indexOf(t.name)<0?' new':''));var h1='<table class="'+P+'t '+P+'tt"><caption>'+esc(t.name)+'</caption><tr>';t.cols.forEach(function(cc){h1+='<th class="'+P+(cc.k||'')+(cc.hl?' '+P+'hl':'')+'">'+esc(cc.n)+(cc.ref&&cc.ref.trim()?'<small>FK→ '+esc(cc.ref)+'</small>':cc.k==='pk'?'<small>PK</small>':'')+'</th>';});h1+='</tr>';
      if(t.rows)t.rows.forEach(function(r){h1+='<tr>'+r.map(function(v,ci){return '<td class="'+(t.cols[ci].ref&&t.cols[ci].ref.trim()?P+'o':'')+'">'+esc(v)+'</td>';}).join('')+'</tr>';});tabs.appendChild(Object.assign(w,{innerHTML:h1+'</table>'}));});}
  buildQuiz();pl.go(0);
}

export { LOGIC };
registerWidget(NAME, mount);
