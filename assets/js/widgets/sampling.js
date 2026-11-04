(function(){
"use strict";
var N="sampling", P="w-sampling-";
var SVGNS="http://www.w3.org/2000/svg";
function h(tag,a,k,isSvg){
  var e=isSvg?document.createElementNS(SVGNS,tag):document.createElement(tag);
  if(a)for(var x in a){var v=a[x];
    if(v===false||v==null)continue;
    if(x==="class")e.setAttribute("class",v);
    else if(x==="text")e.textContent=v;
    else if(x==="html")e.innerHTML=v;
    else if(x.slice(0,2)==="on")e.addEventListener(x.slice(2),v);
    else e.setAttribute(x,v===true?"":v);}
  (k||[]).forEach(function(c){if(c!=null)e.appendChild(typeof c==="string"?document.createTextNode(c):c)});
  return e;}
function s(tag,a,k){return h(tag,a,k,true);}
function esc(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
var BASE=
".ROOT{border:1px solid var(--line,#d7deee);border-radius:14px;background:var(--card,#f6f8ff);padding:12px;color:var(--ink,#1b2438);font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:12px 0;box-sizing:border-box;max-width:100%}"+
".ROOT *{box-sizing:border-box}"+
".ROOT .TITLE{font-weight:700;font-size:15px;margin-bottom:6px}"+
".ROOT .ROW{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}"+
".ROOT .LAB{font-size:12px;color:var(--mut,#5b6580);display:flex;flex-direction:column;gap:2px}"+
".ROOT .IN,.ROOT select.IN{font:inherit;font-size:14px;padding:5px 8px;border:1px solid var(--line,#d7deee);border-radius:8px;background:var(--bg,#fff);color:var(--ink,#1b2438);min-width:0;max-width:100%}"+
".ROOT .B{font:inherit;font-size:13px;font-weight:600;padding:6px 11px;border:1px solid var(--line,#d7deee);border-radius:9px;background:var(--bg,#fff);color:var(--ink,#1b2438);cursor:pointer;min-height:34px}"+
".ROOT .B:hover{border-color:var(--blue,#2f5bd8)}"+
".ROOT .B:focus-visible,.ROOT .IN:focus-visible{outline:2px solid var(--blue,#2f5bd8);outline-offset:1px}"+
".ROOT .B.$pri{background:var(--blue,#2f5bd8);color:#fff;border-color:var(--blue,#2f5bd8)}"+
".ROOT .B.$on{background:var(--blue,#2f5bd8);color:#fff;border-color:var(--blue,#2f5bd8)}"+
".ROOT .B:disabled{opacity:.4;cursor:default}"+
".ROOT .CAP{margin:8px 0;padding:8px 10px;border-left:4px solid var(--blue,#2f5bd8);background:var(--bg,#fff);border-radius:6px;min-height:3em}"+
".ROOT .MUT{color:var(--mut,#5b6580);font-size:12.5px}"+
".ROOT .SVGW{overflow-x:auto;border:1px solid var(--line,#d7deee);border-radius:10px;background:var(--bg,#fff)}"+
".ROOT .SVGW svg{display:block}"+
".ROOT .PL{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}"+
".ROOT .PL .$cnt{font-size:12px;color:var(--mut,#5b6580);min-width:70px}"+
".ROOT table.T{border-collapse:collapse;font-size:13px;margin:4px 0}"+
".ROOT table.T th,.ROOT table.T td{border:1px solid var(--line,#d7deee);padding:3px 8px;text-align:center}"+
".ROOT table.T th{background:var(--card,#f6f8ff)}"+
".ROOT .TW{overflow-x:auto;max-width:100%}"+
".ROOT .PILL{display:inline-block;padding:1px 8px;border-radius:99px;border:1px solid var(--line,#d7deee);background:var(--bg,#fff);font-size:12.5px;margin:1px 2px}"+
".ROOT code,.ROOT .MONO{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px}"+
".ROOT .WARN{color:var(--red,#d63b4f);font-weight:600}"+
".ROOT .OK{color:var(--green,#14a06b);font-weight:600}"+
"@media (prefers-reduced-motion:reduce){.ROOT *{transition:none!important;animation:none!important}}";
function injectCSS(extra){
  var id="wcss-"+N; if(document.getElementById(id))return;
  var t=(BASE+(extra||"")).replace(/\.ROOT/g,".w-"+N+"-root").replace(/\.(TITLE|ROW|LAB|IN|B|CAP|MUT|SVGW|PL|T|TW|PILL|MONO|WARN|OK)(?![\w-])/g,function(m,c){return ".w-"+N+"-"+c.toLowerCase();}).replace(/\.\$([\w-]+)/g,".w-"+N+"-$1");
  var st=document.createElement("style");st.id=id;st.textContent=t;document.head.appendChild(st);}
/* class helper: c("row") -> "w-N-row" */
function c(x){return x.split(" ").map(function(y){return P+y}).join(" ");}
/* Player: onGo(i), getLen() -> number of frames */
function Player(onGo,getLen,opt){
  opt=opt||{};
  var st={i:0,timer:null,speed:1};
  var cnt=h("span",{class:c("cnt")});
  var bPlay=h("button",{class:c("b pri"),type:"button","aria-label":"Play"},["▶ Play"]);
  var bBack=h("button",{class:c("b"),type:"button","aria-label":"Pichla step"},["◀ Back"]);
  var bStep=h("button",{class:c("b"),type:"button","aria-label":"Agla step"},["Step ▶"]);
  var bReset=h("button",{class:c("b"),type:"button","aria-label":"Reset"},["↺ Reset"]);
  var bEnd=h("button",{class:c("b"),type:"button","aria-label":"Last step"},["⏭ End"]);
  var sp=h("select",{class:c("in"),"aria-label":"Speed"},[h("option",{value:"0.5",text:"Slow"}),h("option",{value:"1",text:"Normal",selected:true}),h("option",{value:"2",text:"Fast"}),h("option",{value:"4",text:"Bahut fast"})]);
  sp.value="1";
  var el=h("div",{class:c("pl")},[bReset,bBack,bPlay,bStep].concat(opt.end?[bEnd]:[]).concat([sp,cnt]));
  function last(){return Math.max(0,getLen()-1);}
  function ui(){var L=last();cnt.textContent="Step "+st.i+" / "+L;bBack.disabled=st.i<=0;bStep.disabled=st.i>=L;bPlay.textContent=st.timer?"⏸ Pause":"▶ Play";bPlay.setAttribute("aria-label",st.timer?"Pause":"Play");}
  function stop(){if(st.timer){clearInterval(st.timer);st.timer=null;}ui();}
  function go(i,silent){var L=last();st.i=Math.max(0,Math.min(L,i));ui();if(!silent)onGo(st.i);}
  function tick(){if(st.i>=last()){stop();return;}go(st.i+1);if(st.i>=last())stop();}
  function start(){if(st.timer)return;if(st.i>=last())go(0);st.timer=setInterval(tick,(opt.ms||900)/st.speed);ui();}
  bPlay.addEventListener("click",function(){st.timer?stop():start();});
  bStep.addEventListener("click",function(){stop();go(st.i+1);});
  bBack.addEventListener("click",function(){stop();go(st.i-1);});
  bReset.addEventListener("click",function(){stop();go(0);});
  bEnd.addEventListener("click",function(){stop();go(last());});
  sp.addEventListener("change",function(){st.speed=parseFloat(sp.value);if(st.timer){clearInterval(st.timer);st.timer=null;start();}});
  ui();
  return {el:el,start:start,go:go,stop:stop,idx:function(){return st.i;},refresh:ui,speed:function(){return st.speed;}};
}
function reg(fn){
  if(typeof window==="undefined")return;
  if(window.Widgets&&window.Widgets.register)window.Widgets.register(N,fn);
  else (window.__widgetQueue=window.__widgetQueue||[]).push([N,fn]);
}
function pn(v,d){var x=Number(v);return isFinite(x)?x:d;}
/* ===== core ===== */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function srswor(N,n,rng){var a=[],i;for(i=1;i<=N;i++)a.push(i);n=Math.min(n,N);var out=[];for(i=0;i<n;i++){var j=i+Math.floor(rng()*(N-i));var t=a[i];a[i]=a[j];a[j]=t;out.push(a[i]);}return out;}
function srswr(N,n,rng){var o=[];for(var i=0;i<n;i++)o.push(1+Math.floor(rng()*N));return o;}
function systematic(N,n,rng){var k=Math.floor(N/n),r=1+Math.floor(rng()*k),o=[];for(var j=0;j<n;j++){var id=r+j*k;if(id<=N)o.push(id);}return {k:k,start:r,ids:o};}
function alloc(sizes,n){
  var N=sizes.reduce(function(a,b){return a+b;},0),ex=sizes.map(function(x){return n*x/N;}),b=ex.map(Math.floor),left=n-b.reduce(function(a,c2){return a+c2;},0);
  var ord=ex.map(function(e,i){return {i:i,r:e-Math.floor(e)};}).sort(function(x,y){return y.r-x.r||x.i-y.i;});
  for(var q=0;q<left;q++)b[ord[q%ord.length].i]++;
  return b;
}
function stratified(groups,n,rng){
  var sizes=groups.map(function(g){return g.length;}),al=alloc(sizes,n),ids=[],per=[];
  groups.forEach(function(g,gi){var pick=srswor(g.length,al[gi],rng).map(function(p){return g[p-1];});per.push(pick);pick.forEach(function(x){ids.push(x);});});
  return {alloc:al,ids:ids,per:per};
}
function clusterS(clusters,c,rng){var pick=srswor(clusters.length,c,rng),ids=[];pick.forEach(function(p){clusters[p-1].forEach(function(x){ids.push(x);});});return {clusters:pick,ids:ids};}
var COLS=10,ROWS=6,NPOP=60;
function popModel(){
  var rng=mulberry32(777),lab=[],i;
  var order=[];for(i=0;i<NPOP;i++)order.push(i);
  for(i=NPOP-1;i>0;i--){var j=Math.floor(rng()*(i+1)),t=order[i];order[i]=order[j];order[j]=t;}
  var st=new Array(NPOP);order.forEach(function(p,k){st[p]=k<30?0:(k<50?1:2);});
  var strata=[[],[],[]];st.forEach(function(s2,p){strata[s2].push(p+1);});
  var clusters=[];for(var cc=0;cc<COLS;cc++){var a=[];for(var r=0;r<ROWS;r++)a.push(r*COLS+cc+1);clusters.push(a);}
  return {st:st,strata:strata,clusters:clusters};
}
var CSS=
".ROOT .$d{transition:fill .35s,stroke .35s,r .35s;fill:var(--card,#f6f8ff);stroke:var(--line,#d7deee);stroke-width:2}"+
".ROOT .$d.$sel{fill:var(--blue,#2f5bd8);stroke:var(--blue,#2f5bd8)}"+
".ROOT .$dn{fill:#fff;font:700 10px system-ui;text-anchor:middle;pointer-events:none}"+
".ROOT .$id{fill:var(--mut,#5b6580);font:9px system-ui;text-anchor:middle;pointer-events:none}"+
".ROOT .$band{fill:var(--blue,#2f5bd8);opacity:.08;transition:opacity .3s}"+
".ROOT .$band.$on{opacity:.3;fill:var(--green,#14a06b)}"+
".ROOT .$bd{fill:var(--red,#d63b4f);font:800 10px system-ui}"+
".ROOT .$tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}"+
".ROOT .$bar{display:inline-block;height:12px;border-radius:4px;vertical-align:middle}";
var SC=["#e8730c","#14a06b","#7048e8"];
reg(function(el,opts){
  injectCSS(CSS);
  var S={method:"srswor",n:12,seed:20271,frames:[],cur:0,P:popModel()};
  var root=h("div",{class:c("root")});
  var tabs=h("div",{class:c("tabs")});
  var M=[["srswor","SRSWOR (bina replacement)"],["srswr","SRSWR (replacement ke saath)"],["sys","Systematic"],["strat","Stratified"],["clus","Cluster"]];
  M.forEach(function(m){tabs.appendChild(h("button",{class:c("b"),type:"button","data-m":m[0],text:m[1],onclick:function(){S.method=m[0];build();}}));});
  var sl=h("input",{type:"range",min:"2",max:"30",value:S.n,"aria-label":"Sample size n",style:"width:min(240px,60vw)"});
  var nlab=h("span",{class:c("mono")});
  var cap=h("div",{class:c("cap"),"aria-live":"polite"}),svgW=h("div",{class:c("svgw")}),info=h("div",{});
  var pl=Player(function(i){S.cur=i;draw();},function(){return S.frames.length;},{end:true,ms:700});
  function rng(){return mulberry32(S.seed);}
  function build(){
    var n=S.n=Number(sl.value),P=S.P,r=rng(),fr=[],sel=[],ids,note;
    nlab.textContent="n = "+n;
    [].forEach.call(tabs.children,function(b){b.className=c("b")+(b.getAttribute("data-m")===S.method?" "+c("on"):"");});
    S.extra="";S.bandOn=[];
    fr.push({sel:[],note:"Population = "+NPOP+" log (dots). Method chuno, n set karo, Play dabao. 'Naya random sample' se alag random result milega."});
    if(S.method==="srswor"){ids=srswor(NPOP,n,r);ids.forEach(function(id,i){fr.push({sel:ids.slice(0,i+1),note:"Draw "+(i+1)+": dot #"+id+" chuna. Ek baar chuna hua dot dobara nahi aayega (without replacement), isliye sab "+n+" alag honge."});});}
    else if(S.method==="srswr"){ids=srswr(NPOP,n,r);ids.forEach(function(id,i){var seen=ids.slice(0,i).indexOf(id)>=0;fr.push({sel:ids.slice(0,i+1),note:"Draw "+(i+1)+": dot #"+id+" chuna"+(seen?" — ye pehle bhi aa chuka tha! With replacement me repeat possible hai (badge ×2)":"")+". Har draw independent, har dot ki probability 1/"+NPOP+"."});});}
    else if(S.method==="sys"){var q=systematic(NPOP,n,r);ids=q.ids;S.extra="k = ⌊N/n⌋ = ⌊"+NPOP+"/"+n+"⌋ = "+q.k+", random start r = "+q.start;
      fr.push({sel:[],note:"Step 1: interval k = ⌊N/n⌋ = ⌊"+NPOP+"/"+n+"⌋ = "+q.k+". Step 2: 1 se k ke beech random start chuna: r = "+q.start+". Phir har k-th dot: r, r+k, r+2k, …"});
      ids.forEach(function(id,i){fr.push({sel:ids.slice(0,i+1),note:(i===0?"Start r = "+id:"Pichla + k ("+q.k+") = "+id)+" → dot #"+id+" chuna. Pattern fixed hai, isliye fast, par agar data me periodic pattern ho to bias aa sakta hai."});});}
    else if(S.method==="strat"){var sr=stratified(P.strata,n,r);ids=sr.ids;S.extra="Allocation (proportional): "+sr.alloc.map(function(a,i){return "S"+(i+1)+" = "+a;}).join(", ");
      fr.push({sel:[],note:"Population 3 strata me hai (rang): sizes "+P.strata.map(function(g){return g.length;}).join(" / ")+". Har stratum se uske size ke proportion me sample: n×Nh/N = "+sr.alloc.join(" + ")+" = "+n+"."});
      var acc=[];sr.per.forEach(function(g,gi){g.forEach(function(id,i){acc.push(id);fr.push({sel:acc.slice(),note:"Stratum S"+(gi+1)+" me se SRS: dot #"+id+" ("+(i+1)+"/"+g.length+"). Har group ka representation guarantee."});});});}
    else{var cs=Math.max(1,Math.min(COLS,Math.ceil(n/ROWS)));var cr=clusterS(P.clusters,cs,r);ids=cr.ids;S.extra="Clusters chune: "+cr.clusters.map(function(x){return "C"+x;}).join(", ")+" (har cluster me "+ROWS+" log) → sample size = "+ids.length;
      fr.push({sel:[],note:"Population "+COLS+" clusters (columns, jaise mohalle) me hai. Hum n ke liye ⌈n/"+ROWS+"⌉ = "+cs+" poore clusters random chunenge aur unke SAARE log lenge."});
      var acc2=[];cr.clusters.forEach(function(cn,i){P.clusters[cn-1].forEach(function(x){acc2.push(x);});fr.push({sel:acc2.slice(),bands:cr.clusters.slice(0,i+1),note:"Cluster C"+cn+" chuna → uske saare "+ROWS+" log sample me. Sasta (field me ek jagah jana), par accuracy kam ho sakti hai agar cluster ke andar log similar hon."});});}
    S.ids=ids;S.frames=fr;pl.stop();S.cur=0;pl.go(0,true);draw();
  }
  function draw(){
    var fr=S.frames[S.cur],P=S.P,D=38,W=COLS*D+20,H=ROWS*D+20;
    var svg=s("svg",{width:W,height:H,viewBox:"0 0 "+W+" "+H,role:"img","aria-label":"Population dots"});
    var cnt={};fr.sel.forEach(function(id){cnt[id]=(cnt[id]||0)+1;});
    if(S.method==="clus"){for(var cc=0;cc<COLS;cc++){var on=(fr.bands||[]).indexOf(cc+1)>=0;svg.appendChild(s("rect",{x:10+cc*D+2,y:6,width:D-4,height:H-12,rx:8,class:c("band")+(on?" "+c("on"):"")}));}}
    for(var id=1;id<=NPOP;id++){
      var col=(id-1)%COLS,row=Math.floor((id-1)/COLS),x=10+col*D+D/2,y=10+row*D+D/2;
      var st=S.method==="strat"?SC[P.st[id-1]]:null;
      var sel=cnt[id]>0;
      var ci=s("circle",{cx:x,cy:y,r:14,class:c("d")+(sel?" "+c("sel"):""),style:st&&!sel?"stroke:"+st:(st&&sel?"fill:"+st+";stroke:"+st:"")});
      svg.appendChild(ci);
      svg.appendChild(s("text",{x:x,y:y+4,class:sel?c("dn"):c("id")},[String(id)]));
      if(cnt[id]>1)svg.appendChild(s("text",{x:x+11,y:y-10,class:c("bd")},["×"+cnt[id]]));
    }
    svgW.innerHTML="";svgW.appendChild(svg);cap.textContent=fr.note;
    var uniq=Object.keys(cnt).length,dup=fr.sel.length-uniq;
    var t="Abhi tak chune: <b>"+fr.sel.length+"</b> draws, <b>"+uniq+"</b> alag dots"+(dup?", <b class='"+c("warn")+"'>"+dup+" repeat</b>":"")+". Final sample size = <b>"+S.ids.length+"</b>."+(S.extra?" "+S.extra+".":"");
    if(S.method==="strat"){var per=[0,0,0];S.ids.forEach(function(x){per[P.st[x-1]]++;});
      t+="<br>"+P.strata.map(function(g,i){return "<span class='"+c("pill")+"'><span class='"+c("bar")+"' style='width:"+(g.length)+"px;background:"+SC[i]+"'></span> S"+(i+1)+": population "+g.length+" ("+Math.round(100*g.length/NPOP)+"%) → sample "+per[i]+" ("+Math.round(100*per[i]/S.ids.length)+"%)</span>";}).join("");}
    info.innerHTML=t;
  }
  sl.addEventListener("input",build);
  root.appendChild(h("div",{class:c("title"),text:"Sampling methods: dots ko chunte dekho"}));
  root.appendChild(tabs);
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Sample size n ",sl]),nlab,h("button",{class:c("b"),type:"button",text:"🎲 Naya random sample",onclick:function(){S.seed=Math.floor(Math.random()*1e9);build();}})]));
  root.appendChild(pl.el);root.appendChild(cap);root.appendChild(svgW);root.appendChild(info);
  root.appendChild(h("div",{class:c("mut"),text:"Population N = 60. Stratified me rang = strata (30/20/10 log), Cluster me har column ek cluster hai. Seeded random: same seed = same sample."}));
  el.appendChild(root);build();
});
if(typeof module!=="undefined"&&module.exports)module.exports={mulberry32:mulberry32,srswor:srswor,srswr:srswr,systematic:systematic,stratified:stratified,clusterS:clusterS,alloc:alloc,popModel:popModel};

})();
