import { register as registerWidget } from '../widgets-core.js';
var N="olap-ops", P="w-olap-ops-";
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
function reg(fn){ registerWidget(N, fn); }
function pn(v,d){var x=Number(v);return isFinite(x)?x:d;}
/* ===== core: cube ===== */
var DIM=[
 {name:"Time",lv:["All","Quarter","Month"],mem:[["All"],["Q1","Q2"],["Jan","Feb","Mar","Apr","May","Jun"]],par:function(i){return Math.floor(i/3);}},
 {name:"Location",lv:["All","Region","City"],mem:[["All"],["North","South"],["Delhi","Jaipur","Chennai","Bengaluru"]],par:function(i){return Math.floor(i/2);}},
 {name:"Item",lv:["All","Type","Item"],mem:[["All"],["Electronics","Appliance"],["Mobile","Laptop","TV","Fridge"]],par:function(i){return Math.floor(i/2);}}
];
function base(m,c,i){return 10+((m*5+c*7+i*3+m*c)%17)*3;}
function mapIdx(d,level,fine){return level===2?fine:(level===1?DIM[d].par(fine):0);}
function cellValue(lv,idx){ /* idx = member index per dim at its level -> sum of base cells */
  var s=0,m,c,i;
  for(m=0;m<6;m++)for(c=0;c<4;c++)for(i=0;i<4;i++){
    if(mapIdx(0,lv[0],m)===idx[0]&&mapIdx(1,lv[1],c)===idx[1]&&mapIdx(2,lv[2],i)===idx[2])s+=base(m,c,i);}
  return s;
}
function grandTotal(){return cellValue([0,0,0],[0,0,0]);}
/* ===== core: measures ===== */
function median(a){var s=a.slice().sort(function(x,y){return x-y;}),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;}
function mode(a){var m={},best=null,bc=0;a.slice().sort(function(x,y){return x-y;}).forEach(function(x){m[x]=(m[x]||0)+1;if(m[x]>bc){bc=m[x];best=x;}});return best;}
var FN={
 sum:{cls:"Distributive",label:"SUM",part:function(p){return [p.reduce(function(a,b){return a+b;},0)];},comb:function(P){return P.reduce(function(a,x){return a+x[0];},0);},formula:"SUM = Σ (partition sums)"},
 count:{cls:"Distributive",label:"COUNT",part:function(p){return [p.length];},comb:function(P){return P.reduce(function(a,x){return a+x[0];},0);},formula:"COUNT = Σ (partition counts)"},
 min:{cls:"Distributive",label:"MIN",part:function(p){return [Math.min.apply(null,p)];},comb:function(P){return Math.min.apply(null,P.map(function(x){return x[0];}));},formula:"MIN = min (partition mins)"},
 max:{cls:"Distributive",label:"MAX",part:function(p){return [Math.max.apply(null,p)];},comb:function(P){return Math.max.apply(null,P.map(function(x){return x[0];}));},formula:"MAX = max (partition maxs)"},
 avg:{cls:"Algebraic",label:"AVG",part:function(p){return [p.reduce(function(a,b){return a+b;},0),p.length];},comb:function(P){var s=0,n=0;P.forEach(function(x){s+=x[0];n+=x[1];});return s/n;},formula:"AVG = Σsum / Σcount  (M = 2 values: sum, count)"},
 std:{cls:"Algebraic",label:"STDDEV (population)",part:function(p){return [p.reduce(function(a,b){return a+b;},0),p.reduce(function(a,b){return a+b*b;},0),p.length];},comb:function(P){var s=0,q=0,n=0;P.forEach(function(x){s+=x[0];q+=x[1];n+=x[2];});return Math.sqrt(q/n-(s/n)*(s/n));},formula:"σ = √(Σsq/N − (Σsum/N)²)  (M = 3 values: sum, sum of squares, count)"},
 median:{cls:"Holistic",label:"MEDIAN",part:function(p){return [median(p)];},comb:function(P){return median(P.map(function(x){return x[0];}));},formula:"Koi fixed-size partial nahi! Naive try: median of partition medians"},
 mode:{cls:"Holistic",label:"MODE",part:function(p){return [mode(p)];},comb:function(P){return mode(P.map(function(x){return x[0];}));},formula:"Koi fixed-size partial nahi! Naive try: mode of partition modes"}
};
function direct(fn,parts){var all=[].concat.apply([],parts);
  switch(fn){case "sum":return all.reduce(function(a,b){return a+b;},0);case "count":return all.length;case "min":return Math.min.apply(null,all);case "max":return Math.max.apply(null,all);
  case "avg":return all.reduce(function(a,b){return a+b;},0)/all.length;
  case "std":var m=all.reduce(function(a,b){return a+b;},0)/all.length;return Math.sqrt(all.reduce(function(a,b){return a+(b-m)*(b-m);},0)/all.length);
  case "median":return median(all);case "mode":return mode(all);}}
function viaPartials(fn,parts){var P=parts.map(FN[fn].part);return {partials:P,result:FN[fn].comb(P)};}
var CSS=
".ROOT .$cube{position:relative;margin:6px 0;min-height:60px}"+
".ROOT .$cell{position:absolute;width:62px;height:26px;line-height:24px;text-align:center;font:600 12px ui-monospace,Menlo,monospace;border:1px solid var(--blue,#2f5bd8);border-radius:4px;color:var(--ink,#1b2438);transition:transform .6s cubic-bezier(.4,.1,.2,1),opacity .45s,background .4s;animation:wop-pop .5s ease-out}"+
".ROOT .$cell.$out{opacity:0;background:#999!important;border-color:#999;pointer-events:none}"+
"@keyframes wop-pop{from{opacity:0;transform:scale(.4)}}"+
".ROOT .$cell.$hid{color:transparent}"+
".ROOT .$cl{position:absolute;font:600 11px system-ui;color:var(--mut,#5b6580);white-space:nowrap;text-align:center}"+
".ROOT .$ctl{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:center;margin:6px 0}"+
".ROOT .$dimrow{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:10px;padding:6px 8px;margin:5px 0;display:flex;flex-wrap:wrap;gap:6px;align-items:center}"+
".ROOT .$chip{border:1.5px solid var(--line,#d7deee);border-radius:99px;padding:2px 10px;font:600 12.5px system-ui;background:var(--bg,#fff);color:var(--ink,#1b2438);cursor:pointer}"+
".ROOT .$chip.$on{background:var(--blue,#2f5bd8);color:#fff;border-color:var(--blue,#2f5bd8)}"+
".ROOT .$chip:disabled{opacity:.4;cursor:default}"+
".ROOT .$lv{font-weight:700;min-width:78px}"+
".ROOT .$cls{display:inline-block;padding:1px 10px;border-radius:99px;color:#fff;font-weight:700;font-size:12.5px}"+
".ROOT .$tabs{display:flex;gap:6px;flex-wrap:wrap}"+
".ROOT .$in3{width:min(420px,86vw)}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={lv:[2,2,2],sel:[null,null,null],sliced:[false,false,false],axes:[1,2,0],note:"Cube: Time × Location × Item (sales, ₹ lakh). Neeche buttons se OLAP operations try karo."};
  var root=h("div",{class:c("root")});
  var cap=h("div",{class:c("cap"),"aria-live":"polite"}),cube=h("div",{class:c("cube")}),tables=h("div",{class:c("tw")}),ctl=h("div",{});
  var cells={},labs=[];
  function members(d){return DIM[d].mem[S.lv[d]];}
  function chosen(d){var m=members(d);return S.sel[d]?m.map(function(x,i){return i;}).filter(function(i){return S.sel[d].indexOf(i)>=0;}):m.map(function(x,i){return i;});}
  function shownDims(){return S.axes.filter(function(d){return !S.sliced[d];});}
  function op(kind,d,arg){
    var N=DIM[d]?DIM[d].name:"";
    if(kind==="roll"){if(S.lv[d]>0&&!S.sliced[d]){S.lv[d]--;S.sel[d]=null;S.note="ROLL-UP on "+N+": "+DIM[d].lv[S.lv[d]+1]+" → "+DIM[d].lv[S.lv[d]]+". Detail kam hui (ek level upar), cells merge hokar sum ho gaye; grand total same rehta hai.";}}
    else if(kind==="drill"){if(S.lv[d]<2&&!S.sliced[d]){S.lv[d]++;S.sel[d]=null;S.note="DRILL-DOWN on "+N+": "+DIM[d].lv[S.lv[d]-1]+" → "+DIM[d].lv[S.lv[d]]+". Zyada detail: har cell apne sub-members me toot gaya (ya naya detailed data load hua).";}}
    else if(kind==="dice"){var cur=chosen(d).slice(),ix=cur.indexOf(arg);if(ix>=0){if(cur.length>1)cur.splice(ix,1);}else cur.push(arg);S.sel[d]=cur;
      S.note="DICE: "+shownDims().map(function(x){return DIM[x].name+" = {"+chosen(x).map(function(i){return members(x)[i];}).join(", ")+"}";}).join(" AND ")+". 2 ya zyada dimensions par condition → chhota sub-cube.";}
    else if(kind==="slice"){S.sliced[d]=true;S.sel[d]=[arg];S.note="SLICE: "+N+" = "+members(d)[arg]+" par ek dimension fix kar di → cube se 1 layer (2-D table) nikli. Ek dimension kam ho gayi.";}
    else if(kind==="unslice"){S.sliced[d]=false;S.sel[d]=null;S.note="Slice hata diya: "+N+" dimension wapas cube me.";}
    else if(kind==="pivot"){var a=S.axes;S.axes=[a[1],a[0],a[2]];S.note="PIVOT: rows aur columns swap kiye (data wahi, nazariya alag): ab columns = "+DIM[S.axes[0]].name+", rows = "+DIM[S.axes[1]].name+".";}
    else if(kind==="rotate"){var b=S.axes;S.axes=[b[1],b[2],b[0]];S.note="PIVOT/ROTATE: teeno axes ghumaye: columns = "+DIM[S.axes[0]].name+", rows = "+DIM[S.axes[1]].name+", layers = "+DIM[S.axes[2]].name+".";}
    else if(kind==="reset"){S.lv=[2,2,2];S.sel=[null,null,null];S.sliced=[false,false,false];S.axes=[1,2,0];S.note="Cube reset: sab dimensions finest level par, koi slice/dice nahi.";}
    controls();render();
  }
  function controls(){
    ctl.innerHTML="";
    [0,1,2].forEach(function(d){
      var row=h("div",{class:c("dimrow")});
      row.appendChild(h("b",{text:DIM[d].name,style:"min-width:62px"}));
      row.appendChild(h("span",{class:c("lv"),text:"level: "+DIM[d].lv[S.lv[d]]}));
      var sd=S.sliced[d];
      row.appendChild(h("button",{class:c("b"),type:"button",disabled:sd||S.lv[d]===0,text:"▲ Roll-up",onclick:function(){op("roll",d);}}));
      row.appendChild(h("button",{class:c("b"),type:"button",disabled:sd||S.lv[d]===2,text:"▼ Drill-down",onclick:function(){op("drill",d);}}));
      if(sd){row.appendChild(h("span",{class:c("pill"),text:"Slice: "+DIM[d].name+" = "+members(d)[S.sel[d][0]]}));row.appendChild(h("button",{class:c("b"),type:"button",text:"✕ Slice hatao",onclick:function(){op("unslice",d);}}));}
      else{
        row.appendChild(h("span",{class:c("mut"),text:"Dice (chips toggle):"}));
        var ch=chosen(d);
        members(d).forEach(function(m,i){row.appendChild(h("button",{class:c("chip")+(ch.indexOf(i)>=0?" "+c("on"):""),type:"button","aria-pressed":ch.indexOf(i)>=0?"true":"false",text:m,onclick:function(){op("dice",d,i);}}));});
        if(members(d).length>1){row.appendChild(h("span",{class:c("mut"),text:"Slice:"}));
          members(d).forEach(function(m,i){row.appendChild(h("button",{class:c("chip"),type:"button",title:"Slice: "+DIM[d].name+" = "+m,text:"✂ "+m,onclick:function(){op("slice",d,i);}}));});}
      }
      ctl.appendChild(row);
    });
    ctl.appendChild(h("div",{class:c("row")},[h("button",{class:c("b pri"),type:"button",text:"⇄ Pivot (rows ↔ columns)",onclick:function(){op("pivot");}}),h("button",{class:c("b"),type:"button",text:"⟳ Rotate 3 axes",onclick:function(){op("rotate");}}),h("button",{class:c("b"),type:"button",text:"↺ Reset cube",onclick:function(){op("reset");}})]));
  }
  function render(){
    var sd=shownDims(),dx=sd[0],dy=sd[1],dz=sd[2];
    var xs=dx!=null?chosen(dx):[0],ys=dy!=null?chosen(dy):[0],zs=dz!=null?chosen(dz):[0];
    var CW=66,CH=30,DX=12,DY=14,LBL=92,TOP=8,pages=zs.length;
    var list=[],mx=0,total=0,tabs=[];
    zs.forEach(function(zi,p){ys.forEach(function(yi,r){xs.forEach(function(xi,k){
      var idx=[0,0,0];idx[dx]=xi;if(dy!=null)idx[dy]=yi;if(dz!=null)idx[dz]=zi;
      S.sliced.forEach(function(sl,d){if(sl)idx[d]=S.sel[d][0];});
      var lvv=S.lv.slice();
      var v=cellValue(lvv,idx);mx=Math.max(mx,v);total+=v;
      var key=DIM.map(function(D,d){return D.name+":"+S.lv[d]+":"+idx[d];}).join("|");
      list.push({key:key,v:v,p:p,r:r,k:k});});});});
    var W=LBL+xs.length*CW+pages*DX+90,H=TOP+(pages-1)*DY+ys.length*CH+34+(S.sliced.some(Boolean)?18:0);
    cube.style.height=H+"px";cube.style.minWidth=W+"px";
    var want={};
    list.forEach(function(q){want[q.key]=1;var e=cells[q.key];
      if(!e){e=h("div",{class:c("cell"),text:q.v});cube.appendChild(e);cells[q.key]=e;}
      e.className=c("cell")+(q.p>0?" "+c("hid"):"");e.textContent=q.v;
      e.style.transform="translate("+(LBL+q.k*CW+q.p*DX)+"px,"+(TOP+(pages-1-q.p)*DY+q.r*CH)+"px)";
      e.style.zIndex=String(100-q.p);
      var pc=Math.round(12+55*q.v/mx);e.style.background="rgba(47,91,216,"+(0.08+0.5*q.v/mx).toFixed(2)+")";e.style.background="color-mix(in srgb, #2f5bd8 "+pc+"%, var(--bg,#fff))";});
    Object.keys(cells).forEach(function(k){if(!want[k]){var e=cells[k];delete cells[k];e.classList.add(c("out"));setTimeout(function(){e.parentNode&&e.parentNode.removeChild(e);},520);}});
    labs.forEach(function(l){l.parentNode&&l.parentNode.removeChild(l);});labs=[];
    function lab(t,x,y,al){var l=h("div",{class:c("cl"),text:t,style:"left:"+x+"px;top:"+y+"px;"+(al==="r"?"transform:translateX(-100%);":"")});cube.appendChild(l);labs.push(l);}
    var fy=TOP+(pages-1)*DY;
    xs.forEach(function(xi,k){lab(members(dx)[xi],LBL+k*CW+CW/2-24,fy+ys.length*CH+2);});
    lab("→ "+DIM[dx].name,LBL,fy+ys.length*CH+16);
    if(dy!=null){ys.forEach(function(yi,r){lab(members(dy)[yi],LBL-6,fy+r*CH+7,"r");});lab("↓ "+DIM[dy].name,2,TOP-4);}
    if(dz!=null){zs.forEach(function(zi,p){lab(DIM[dz].name+": "+members(dz)[zi],LBL+xs.length*CW+pages*DX+8,TOP+(pages-1-p)*DY+4);});}
    S.sliced.forEach(function(sl,d){if(sl)lab("Slice: "+DIM[d].name+" = "+members(d)[S.sel[d][0]],LBL,H-18);});
    /* tables */
    var html="";
    zs.forEach(function(zi){
      var title=[];if(dz!=null)title.push(DIM[dz].name+" = "+members(dz)[zi]);S.sliced.forEach(function(sl,d){if(sl)title.push("(slice) "+DIM[d].name+" = "+members(d)[S.sel[d][0]]);});
      html+="<table class='"+c("t")+"' style='margin-right:10px'>"+(title.length?"<caption style='font-weight:700;font-size:12.5px'>"+esc(title.join(", "))+"</caption>":"")+"<tr><th>"+(dy!=null?DIM[dy].name+" \\ ":"")+DIM[dx].name+"</th>"+xs.map(function(xi){return "<th>"+members(dx)[xi]+"</th>";}).join("")+"</tr>";
      ys.forEach(function(yi){html+="<tr><th>"+(dy!=null?members(dy)[yi]:"Total")+"</th>"+xs.map(function(xi){var idx=[0,0,0];idx[dx]=xi;if(dy!=null)idx[dy]=yi;if(dz!=null)idx[dz]=zi;S.sliced.forEach(function(sl,d){if(sl)idx[d]=S.sel[d][0];});return "<td>"+cellValue(S.lv,idx)+"</td>";}).join("")+"</tr>";});
      html+="</table>";});
    tables.innerHTML=html+"<div class='"+c("mut")+"'>Shown cells ka sum = <b>"+total+"</b>"+((S.sel.every(function(x){return x===null;}))?" (poore cube ka grand total = "+grandTotal()+" → roll-up/drill-down/pivot se total nahi badalta)":" (dice/slice se cells kam hui, isliye total chhota)")+".</div>";
    cap.textContent=S.note;
  }
  /* aggregate measures */
  var inP=h("input",{class:c("in in3"),type:"text",value:"3, 7, 10 | 4, 6 | 2, 5, 8, 12","aria-label":"Partitions"});
  var fnTabs=h("div",{class:c("tabs")}),mout=h("div",{}),curFn="avg";
  Object.keys(FN).forEach(function(k){fnTabs.appendChild(h("button",{class:c("b"),type:"button","data-f":k,text:FN[k].label,onclick:function(){curFn=k;meas();}}));});
  function parseParts(){return inP.value.split("|").map(function(p){return p.split(/[\s,;]+/).filter(Boolean).map(Number).filter(isFinite);}).filter(function(p){return p.length;});}
  function r3(x){return Math.round(x*1000)/1000;}
  function meas(){
    [].forEach.call(fnTabs.children,function(b){b.className=c("b")+(b.getAttribute("data-f")===curFn?" "+c("on"):"");});
    var parts=parseParts();if(parts.length<2){mout.innerHTML="<span class='"+c("warn")+"'>Kam se kam 2 partitions do, '|' se alag (jaise 3,7,10 | 4,6).</span>";return;}
    var F=FN[curFn],vp=viaPartials(curFn,parts),d=direct(curFn,parts),ok=Math.abs(vp.result-d)<1e-9;
    var col={Distributive:"var(--green,#14a06b)",Algebraic:"var(--blue,#2f5bd8)",Holistic:"var(--red,#d63b4f)"}[F.cls];
    var expl={Distributive:"Distributive: partitions ke partial results pe SAME function laga do → exact answer (data cube ke cells se aage ke levels aasani se bante hain).",Algebraic:"Algebraic: ek bounded (fixed) size ke partial tuple (M values) rakho, phir formula se combine → exact answer.",Holistic:"Holistic: partial result ka koi bounded-size summary nahi hota; sahi answer ke liye POORA data chahiye. Isliye cube me precompute karna mushkil (approximate ya alag technique)."}[F.cls];
    var t="<span class='"+c("cls")+"' style='background:"+col+"'>"+F.cls+"</span> <b>"+F.label+"</b><div class='"+c("mut")+"' style='margin:4px 0'>"+F.formula+"</div>";
    t+="<table class='"+c("t")+"'><tr><th>Partition</th><th>Data</th><th>Partial aggregate</th></tr>"+parts.map(function(p,i){return "<tr><td>P"+(i+1)+"</td><td>"+p.join(", ")+"</td><td><b>"+vp.partials[i].map(r3).join(", ")+"</b>"+(curFn==="avg"?"  (sum, count)":curFn==="std"?"  (sum, Σx², count)":"")+"</td></tr>";}).join("")+"</table>";
    t+="<div>Partials se combine: <b style='font-size:16px'>"+r3(vp.result)+"</b> &nbsp;|&nbsp; Poore data par seedha: <b style='font-size:16px'>"+r3(d)+"</b> &nbsp; "+(ok?"<span class='"+c("ok")+"'>✓ same</span>":"<span class='"+c("warn")+"'>✗ alag! (partials se galat)</span>")+"</div>";
    t+="<div class='"+c("cap")+"' style='border-left-color:"+col+"'>"+expl+"</div>";
    mout.innerHTML=t;
  }
  inP.addEventListener("input",meas);
  root.appendChild(h("div",{class:c("title"),text:"OLAP operations on a sales cube"}));
  root.appendChild(cap);root.appendChild(ctl);
  root.appendChild(h("div",{class:c("svgw"),style:"overflow-x:auto;padding:6px"},[cube]));
  root.appendChild(h("div",{class:c("mut"),text:"Cell ka rang = value (gehra = zyada). Roll-up me cells merge hokar nayi (pop) hoti hain; dice/slice me bahar hui cells grey hokar ud jaati hain; pivot me cells nayi jagah slide karti hain."}));
  root.appendChild(h("div",{class:c("title"),text:"Result table(s)",style:"margin-top:8px"}));root.appendChild(tables);
  root.appendChild(h("div",{class:c("title"),text:"Aggregate measures: Distributive / Algebraic / Holistic",style:"margin-top:14px"}));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Partitions ('|' se alag, jaise 3 cube ke chunks)",inP])]));
  root.appendChild(fnTabs);root.appendChild(mout);
  el.appendChild(root);controls();render();meas();
});
export { cellValue, grandTotal, FN, direct, viaPartials, DIM, base };
