/* widget: sql-order — self-contained, registers via window.Widgets.register */
(function(){'use strict';
var NAME='sql-order';
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
var EMP={cols:['id','name','dept','salary'],rows:[[1,'Rahul','CSE',50],[2,'Aman','ECE',40],[3,'Priya','CSE',60],[4,'Neha','ME',35],[5,'Karan','CSE',45],[6,'Sita','ECE',55],[7,'Dev','ME',30],[8,'Isha','ECE',42]]};
function aggCalc(fn,vals){if(fn==='COUNT')return vals.length;if(!vals.length)return null;var s=vals.reduce(function(a,b){return a+b;},0);if(fn==='SUM')return s;if(fn==='AVG')return Math.round(s/vals.length*100)/100;if(fn==='MAX')return Math.max.apply(null,vals);if(fn==='MIN')return Math.min.apply(null,vals);}
var QUERIES=[
 {n:'Dept-wise average salary',params:{T:35,H:2},ui:{T:'WHERE salary >',H:'HAVING COUNT(*) >='},
  sql:function(p){return "SELECT dept, COUNT(*) AS n, AVG(salary) AS avg_sal\nFROM emp\nWHERE salary > "+p.T+"\nGROUP BY dept\nHAVING COUNT(*) >= "+p.H+"\nORDER BY avg_sal DESC;";},
  where:function(r,p){return r[3]>p.T;},group:2,aggs:[{fn:'COUNT',col:null,alias:'n'},{fn:'AVG',col:3,alias:'avg_sal'}],having:function(g,p){return g.n>=p.H;},select:['dept','n','avg_sal'],order:{col:'avg_sal',desc:true}},
 {n:'Sirf SELECT + WHERE + ORDER BY (GROUP nahi)',params:{T:40},ui:{T:'WHERE salary >'},
  sql:function(p){return "SELECT name, salary\nFROM emp\nWHERE salary > "+p.T+"\nORDER BY salary DESC;";},
  where:function(r,p){return r[3]>p.T;},group:null,aggs:[],having:null,select:['name','salary'],order:{col:'salary',desc:true}},
 {n:'Dept-wise total salary (HAVING)',params:{H:100},ui:{H:'HAVING SUM(salary) >'},
  sql:function(p){return "SELECT dept, SUM(salary) AS total\nFROM emp\nGROUP BY dept\nHAVING SUM(salary) > "+p.H+";";},
  where:null,group:2,aggs:[{fn:'SUM',col:3,alias:'total'}],having:function(g,p){return g.total>p.H;},select:['dept','total'],order:null}
];
function runQuery(q,p){
  var st=[],cols=EMP.cols,rows=EMP.rows;
  st.push({name:'FROM',cols:cols,rows:rows.map(function(r){return {v:r,k:'b'};}),note:'Pehle poori table (emp) uthti hai — 8 rows.'});
  var kept=rows;
  if(q.where){var w=rows.map(function(r){return {v:r,k:q.where(r,p)?'g':'r'};});kept=rows.filter(function(r){return q.where(r,p);});st.push({name:'WHERE',cols:cols,rows:w,note:'Har <b>row</b> par condition lagi. Hari = bachi, laal = hat gayi. ('+kept.length+' rows bachi)'});}
  else st.push({name:'WHERE',skip:true,cols:cols,rows:rows.map(function(r){return {v:r,k:'g'};}),note:'Is query mein WHERE nahi hai → saari rows aage.'});
  var groups=null,gk=null;
  if(q.group!==null){var order=[],map={};kept.forEach(function(r){var k=r[q.group];if(!map[k]){map[k]=[];order.push(k);}map[k].push(r);});
    groups=order.map(function(k){var o={key:k,rows:map[k]};q.aggs.forEach(function(a){o[a.alias]=aggCalc(a.fn,a.col===null?map[k]:map[k].map(function(r){return r[a.col];}));});return o;});
    var gc=[EMP.cols[q.group],'rows (id)'].concat(q.aggs.map(function(a){return a.alias+' = '+a.fn+'('+(a.col===null?'*':EMP.cols[a.col])+')';}));
    gk={cols:gc,rows:groups.map(function(g){return {v:[g.key,g.rows.map(function(r){return r[0];}).join(',')].concat(q.aggs.map(function(a){return g[a.alias];})),k:'p'};})};
    st.push({name:'GROUP BY',cols:gk.cols,rows:gk.rows,note:'Bachi hui rows ko <b>'+EMP.cols[q.group]+'</b> ke hisaab se groups mein baanta; har group ka aggregate nikla. Ab ek group = ek row.'});
  } else st.push({name:'GROUP BY',skip:true,cols:cols,rows:kept.map(function(r){return {v:r,k:'g'};}),note:'GROUP BY nahi hai → rows jaisi hain waisi.'});
  var fg=groups;
  if(q.having){var hv=groups.map(function(g,i){return {v:gk.rows[i].v,k:q.having(g,p)?'g':'r'};});fg=groups.filter(function(g){return q.having(g,p);});st.push({name:'HAVING',cols:gk.cols,rows:hv,note:'HAVING <b>groups</b> ko filter karta hai (aggregate yahin allowed). '+fg.length+' group(s) bache.'});}
  else if(groups)st.push({name:'HAVING',skip:true,cols:gk.cols,rows:gk.rows.map(function(r){return {v:r.v,k:'g'};}),note:'HAVING nahi hai → saare groups aage.'});
  else st.push({name:'HAVING',skip:true,cols:cols,rows:kept.map(function(r){return {v:r,k:'g'};}),note:'HAVING nahi hai.'});
  var oc=q.select,orows;
  if(groups){orows=fg.map(function(g){return q.select.map(function(c){return c===EMP.cols[q.group]?g.key:g[c];});});}
  else orows=kept.map(function(r){return q.select.map(function(c){return r[EMP.cols.indexOf(c)];});});
  st.push({name:'SELECT',cols:oc,rows:orows.map(function(v){return {v:v,k:'g'};}),note:'Ab jaake <b>SELECT</b> chalta hai: sirf maange hue columns / expressions nikle (alias <code>'+q.select.join(', ')+'</code> yahin bante hain).'});
  var sorted=orows.slice();
  if(q.order){var ci=oc.indexOf(q.order.col);sorted.sort(function(a,b){return (a[ci]<b[ci]?-1:a[ci]>b[ci]?1:0)*(q.order.desc?-1:1);});st.push({name:'ORDER BY',cols:oc,rows:sorted.map(function(v){return {v:v,k:'g'};}),note:'Aakhir mein <b>ORDER BY '+q.order.col+(q.order.desc?' DESC':'')+'</b> — sort. Alias yahan use kar sakte ho kyunki SELECT ho chuka.'});}
  else st.push({name:'ORDER BY',skip:true,cols:oc,rows:sorted.map(function(v){return {v:v,k:'g'};}),note:'ORDER BY nahi → order guaranteed nahi. Yehi final result hai.'});
  return st;
}
var LOGIC={runQuery:runQuery,QUERIES:QUERIES,EMP:EMP};
function mount(el,opts){
  injectCss('.$pipe{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0}.$stg{flex:1;min-width:70px;text-align:center;font-size:12px;font-weight:700;padding:5px 3px;border-radius:8px;border:2px solid var(--line,#d7deee);background:var(--bg,#fff);transition:all .3s}.$stg.$cur{border-color:var(--org,#e8730c);background:color-mix(in srgb,var(--org,#e8730c) 28%,var(--bg,#fff))}.$stg.$past{border-color:var(--green,#14a06b)}.$stg.$skip{opacity:.5;border-style:dashed}.$stg small{display:block;font-weight:400;color:var(--mut,#5b6580)}');
  el.innerHTML='';var root=h('div','w');el.appendChild(root);
  root.appendChild(h('div','title','SQL ka asli execution order'));
  root.appendChild(h('div','sub','Likhte SELECT pehle hain, par chalta <b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</b> hai. Har stage ke baad table dekho.'));
  var qi=0,params=Object.assign({},QUERIES[0].params);
  var sel=mkSelect(QUERIES.map(function(q,i){return {v:i,t:q.n};}),0,function(v){qi=+v;params=Object.assign({},QUERIES[qi].params);buildParams();run();});
  var r1=h('div','row');r1.appendChild(sel);root.appendChild(r1);
  var pr=h('div','try');root.appendChild(pr);
  var code=h('pre','code');root.appendChild(code);
  var pipe=h('div','pipe');root.appendChild(pipe);
  var barHost=h('div','');root.appendChild(barHost);var cap=h('div','cap','');root.appendChild(cap);var tb=h('div','wrap');root.appendChild(tb);
  var ST=[];
  var pl=player(barHost,{n:function(){return ST.length;},show:show});
  function buildParams(){pr.innerHTML='<b>Try it:</b> ';var q=QUERIES[qi];Object.keys(q.ui).forEach(function(k){var l=h('label','lab',esc(q.ui[k])+' ');var inp=h('input','inp mono');inp.type='number';inp.style.width='80px';inp.value=params[k];inp.setAttribute('aria-label',q.ui[k]);inp.addEventListener('input',function(){var v=parseFloat(inp.value);if(!isNaN(v)){params[k]=v;run();}});l.appendChild(inp);pr.appendChild(l);pr.appendChild(document.createTextNode(' '));});}
  function run(){var q=QUERIES[qi];code.textContent=q.sql(params);ST=runQuery(q,params);var keep=pl.i;pl.stop();pl.go(Math.min(keep,ST.length-1));}
  var NAMES=['FROM','WHERE','GROUP BY','HAVING','SELECT','ORDER BY'];
  function show(i){
    pipe.innerHTML='';ST.forEach(function(s,k){var d=h('div','stg'+(k===i?' cur':k<i?' past':'')+(s.skip?' skip':''),s.name+'<small>'+(s.skip?'skip':s.rows.length+' row'+(s.rows.length===1?'':'s'))+'</small>');pipe.appendChild(d);});
    var s=ST[i];cap.innerHTML='<b>'+(i+1)+'. '+s.name+'</b> — '+s.note+(s.name==='WHERE'&&!s.skip?' <br><small>Trap: WHERE mein aggregate (COUNT/AVG) nahi chalta, kyunki groups abhi bane hi nahi.</small>':'');
    var t='<table class="'+P+'t new"><tr>'+s.cols.map(function(c){return '<th>'+esc(c)+'</th>';}).join('')+'</tr>';
    if(!s.rows.length)t+='<tr><td colspan="'+s.cols.length+'"><i>(khaali — koi row nahi bachi)</i></td></tr>';
    s.rows.forEach(function(r){t+='<tr class="'+(s.skip?'':P+r.k)+'">'+r.v.map(function(c){return '<td>'+esc(c)+'</td>';}).join('')+'</tr>';});
    tb.innerHTML=t.replace('class="'+P+'t new"','class="'+P+'t '+P+'new"')+'</table>';
  }
  buildParams();run();
}

if(typeof module!=='undefined'&&module.exports){module.exports=LOGIC;}
if(typeof window!=='undefined'&&typeof document!=='undefined'){if(window.Widgets&&window.Widgets.register){window.Widgets.register(NAME,mount);}else{(window.__widgetQueue=window.__widgetQueue||[]).push([NAME,mount]);}}
})();
