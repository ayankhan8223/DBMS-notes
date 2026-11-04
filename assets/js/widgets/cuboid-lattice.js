(function(){
"use strict";
var N="cuboid-lattice", P="w-cuboid-lattice-";
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
function cuboidCount(Ls){return Ls.reduce(function(a,l){return a*(l+1);},1);}
function enumerate(Ls){var out=[[]];Ls.forEach(function(L){var nx=[];out.forEach(function(p){for(var t=0;t<=L;t++)nx.push(p.concat([t]));});out=nx;});return out;}
function key(t){return t.join(",");}
function leq(a,b){for(var i=0;i<a.length;i++)if(a[i]>b[i])return false;return true;}
function ancestors(t,all){return all.filter(function(x){return key(x)!==key(t)&&leq(x,t);});}      /* more aggregated (roll-up reachable) */
function descendants(t,all){return all.filter(function(x){return key(x)!==key(t)&&leq(t,x);});}  /* more detailed (drill-down reachable) */
function latticeEdges(all){var idx={};all.forEach(function(t){idx[key(t)]=t;});var e=[];
  all.forEach(function(t){for(var i=0;i<t.length;i++){var u=t.slice();u[i]++;if(idx[key(u)])e.push([t,u]);}});return e;} /* [coarser, finer] */
function rollupPath(start){var p=[start.slice()],cur=start.slice();
  while(cur.some(function(v){return v>0;})){var i=cur.length-1;while(cur[i]===0)i--;cur=cur.slice();cur[i]--;p.push(cur);}return p;}
var DIMS=[
 {k:"T",name:"Time",names:["day","month","quarter","year"]},
 {k:"I",name:"Item",names:["item","brand","type","category"]},
 {k:"L",name:"Location",names:["street","city","country","continent"]},
 {k:"S",name:"Supplier",names:["supplier","sup_city","sup_country","sup_region"]}];
var CSS=
".ROOT .$nd rect{fill:var(--bg,#fff);stroke:var(--mut,#5b6580);stroke-width:1.5;transition:fill .3s,stroke .3s}"+
".ROOT .$nd{cursor:pointer}"+
".ROOT .$nd text{fill:var(--ink,#1b2438);font:600 12px ui-monospace,Menlo,monospace;text-anchor:middle;pointer-events:none}"+
".ROOT .$nd.$up rect{fill:rgba(47,91,216,.18);stroke:var(--blue,#2f5bd8);stroke-width:2.2}"+
".ROOT .$nd.$dn rect{fill:rgba(232,115,12,.18);stroke:var(--org,#e8730c);stroke-width:2.2}"+
".ROOT .$nd.$sel rect{fill:rgba(20,160,107,.28);stroke:var(--green,#14a06b);stroke-width:3.5}"+
".ROOT .$nd.$path rect{fill:rgba(112,72,232,.25);stroke:var(--pur,#7048e8);stroke-width:3}"+
".ROOT .$nd.$cur rect{fill:var(--pur,#7048e8)}.ROOT .$nd.$cur text{fill:#fff}"+
".ROOT .$ed{stroke:var(--line,#d7deee);stroke-width:1.4;transition:stroke .3s}"+
".ROOT .$ed.$up{stroke:var(--blue,#2f5bd8);stroke-width:2.4}.ROOT .$ed.$dn{stroke:var(--org,#e8730c);stroke-width:2.4}.ROOT .$ed.$path{stroke:var(--pur,#7048e8);stroke-width:4}"+
".ROOT .$panel{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:10px;padding:8px 12px;margin:8px 0}"+
".ROOT .$dims{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0}"+
".ROOT .$dm{border:1px solid var(--line,#d7deee);border-radius:10px;background:var(--bg,#fff);padding:5px 8px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}"+
".ROOT .$big{font-size:18px;font-weight:800;color:var(--blue,#2f5bd8)}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={on:[true,true,true,false],lv:[1,1,1,1],sel:null,frames:[],cur:0,all:[],pathMode:true};
  var root=h("div",{class:c("root")});
  var dimsBox=h("div",{class:c("dims")}),cnt=h("div",{class:c("cap")}),svgW=h("div",{class:c("svgw")}),info=h("div",{class:c("panel")});
  var cap=h("div",{class:c("cap"),"aria-live":"polite"});
  var pl=Player(function(i){S.cur=i;draw();},function(){return S.frames.length;},{end:true,ms:1100});
  var cbs=[],sels=[];
  DIMS.forEach(function(d,i){
    var cb=h("input",{type:"checkbox","aria-label":d.name+" dimension"});cb.checked=S.on[i];
    var sl=h("select",{class:c("in"),"aria-label":d.name+" levels"},[1,2,3].map(function(n){return h("option",{value:n,text:n+" level"+(n>1?"s":"")+(n===1?" (hierarchy nahi)":"")});}));
    cb.addEventListener("change",function(){S.on[i]=cb.checked;if(S.on.filter(Boolean).length>4||S.on.filter(Boolean).length<1){cb.checked=S.on[i]=!cb.checked;}build();});
    sl.addEventListener("change",function(){S.lv[i]=Number(sl.value);build();});
    cbs.push(cb);sels.push(sl);
    dimsBox.appendChild(h("div",{class:c("dm")},[h("label",{style:"display:flex;gap:4px;align-items:center;font-weight:700"},[cb,d.name+" ("+d.k+")"]),sl]));
  });
  function active(){var o=[];DIMS.forEach(function(d,i){if(S.on[i])o.push(i);});return o;}
  function lname(di,t){if(t===0)return "all";var L=S.lv[di];return DIMS[di].names[L-t];}
  function label(t,act){var hier=act.some(function(di){return S.lv[di]>1;}),parts=[];
    t.forEach(function(v,j){var d=DIMS[act[j]];if(v>0)parts.push(hier?d.k+v:d.k);});
    return parts.length?parts.join(" "):"( )";}
  function groupBy(t,act){var p=[];t.forEach(function(v,j){if(v>0)p.push(lname(act[j],v));});return p.length?p.join(", "):"(kuch nahi → grand total, apex)";}
  var pos={};
  function build(){
    var act=active();S.act=act;var Ls=act.map(function(di){return S.lv[di];});
    S.Ls=Ls;S.all=enumerate(Ls);S.N=S.all.length;
    var flat=Ls.every(function(l){return l===1;});
    var f=flat?("2<sup>n</sup> = 2<sup>"+act.length+"</sup> = <span class='"+c("big")+"'>"+S.N+"</span> cuboids"):("∏ (L<sub>i</sub> + 1) = "+Ls.map(function(l){return "("+l+"+1)";}).join(" × ")+" = <span class='"+c("big")+"'>"+S.N+"</span> cuboids");
    cnt.innerHTML="<b>Total cuboids</b> ("+act.map(function(di){return DIMS[di].name;}).join(", ")+"): "+f+"<br><span class='"+c("mut")+"'>L<sub>i</sub> = dimension i ke hierarchy levels ('all' ko chhodke). Har dimension me 'all' ka option bhi aata hai, isliye +1. Base cuboid = sabse detailed (neeche), apex = sab 'all' (upar).</span>";
    S.sel=null;
    if(S.N>100){svgW.innerHTML="<div style='padding:14px'>Lattice me "+S.N+" nodes hain — drawing ke liye bahut zyada. Count formula upar dekho; kam levels/dimensions chuno to diagram dikhega.</div>";info.innerHTML="";cap.textContent="";S.frames=[{path:[]}];pl.go(0,true);return;}
    setPath(S.all.reduce(function(m,t){return t.reduce(function(a,b){return a+b;},0)>m.reduce(function(a,b){return a+b;},0)?t:m;},S.all[0]),true);
  }
  function setPath(start,keepSel){
    var p=rollupPath(start);S.frames=p.map(function(t,i){
      var note=i===0?("Start: cuboid "+label(t,S.act)+"  [GROUP BY "+groupBy(t,S.act)+"]. Play = roll-up (upar, kam detail); Back = drill-down (neeche, zyada detail)."):"";
      if(i>0){var q=p[i-1],j=0;for(;j<t.length;j++)if(t[j]!==q[j])break;var di=S.act[j];
        note="ROLL-UP: "+DIMS[di].name+" dimension "+lname(di,q[j])+" → "+lname(di,t[j])+". Ab cuboid "+label(t,S.act)+"  [GROUP BY "+groupBy(t,S.act)+"] — detail kam, data chhota.";}
      return {path:p.slice(0,i+1),t:t,note:note};});
    pl.stop();S.cur=0;pl.go(0,true);draw();
  }
  function draw(){
    if(S.N>100)return;
    var act=S.act,all=S.all,fr=S.frames[S.cur];
    var rows={},maxR=0;all.forEach(function(t){var r=t.reduce(function(a,b){return a+b;},0);(rows[r]=rows[r]||[]).push(t);if(r>maxR)maxR=r;});
    var NH=28,RH=66,GAP=12,maxRow=0;
    Object.keys(rows).forEach(function(r){rows[r].sort(function(a,b){return key(a)<key(b)?-1:1;});if(rows[r].length>maxRow)maxRow=rows[r].length;});
    function nw(t){return Math.max(38,label(t,act).length*7.4+14);}
    var widths={};Object.keys(rows).forEach(function(r){widths[r]=rows[r].reduce(function(a,t){return a+nw(t)+GAP;},0);});
    var W=Math.max(340,Math.max.apply(null,Object.keys(widths).map(function(r){return widths[r];}))+20),H=(maxR+1)*RH+30;
    pos={};
    Object.keys(rows).forEach(function(r){var x=(W-widths[r])/2+GAP/2;rows[r].forEach(function(t){var w=nw(t);pos[key(t)]={x:x+w/2,y:24+r*RH,w:w};x+=w+GAP;});});
    var svg=s("svg",{width:W,height:H,viewBox:"0 0 "+W+" "+H,role:"img","aria-label":"Cuboid lattice"});
    var upS={},dnS={},selK=S.sel?key(S.sel):null;
    if(S.sel){ancestors(S.sel,all).forEach(function(t){upS[key(t)]=1;});descendants(S.sel,all).forEach(function(t){dnS[key(t)]=1;});}
    var pathS={},pathE={};
    (fr.path||[]).forEach(function(t,i){pathS[key(t)]=1;if(i>0)pathE[key(t)+">"+key(fr.path[i-1])]=1;});
    var curK=fr.t?key(fr.t):null;
    latticeEdges(all).forEach(function(e){
      var a=pos[key(e[0])],b=pos[key(e[1])],ka=key(e[0]),kb=key(e[1]),cl=c("ed");
      if(pathE[ka+">"+kb])cl+=" "+c("path");
      else if(S.sel&&(upS[ka]||ka===selK)&&(upS[kb]||kb===selK))cl+=" "+c("up");
      else if(S.sel&&(dnS[ka]||ka===selK)&&(dnS[kb]||kb===selK))cl+=" "+c("dn");
      svg.appendChild(s("line",{x1:a.x,y1:a.y+NH/2,x2:b.x,y2:b.y-NH/2,class:cl}));
    });
    all.forEach(function(t){
      var k=key(t),p=pos[k],cl=c("nd");
      if(k===curK)cl+=" "+c("cur");else if(pathS[k])cl+=" "+c("path");
      if(k===selK)cl+=" "+c("sel");else if(upS[k])cl+=" "+c("up");else if(dnS[k])cl+=" "+c("dn");
      var g=s("g",{class:cl,tabindex:"0",role:"button","aria-label":"Cuboid "+label(t,act)});
      g.appendChild(s("rect",{x:p.x-p.w/2,y:p.y-NH/2,width:p.w,height:NH,rx:7}));
      g.appendChild(s("text",{x:p.x,y:p.y+4},[label(t,act)]));
      var fn=function(){S.sel=t;setPath(t,true);infoDraw();};
      g.addEventListener("click",fn);g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}});
      svg.appendChild(g);
    });
    svgW.innerHTML="";svgW.appendChild(svg);
    cap.textContent=fr.note||"";
    if(!S.sel)infoDraw();
  }
  function infoDraw(){
    var act=S.act,hier=act.some(function(di){return S.lv[di]>1;});
    var leg=hier?("<div class='"+c("mut")+"'>Legend: "+act.map(function(di){var s2=[];for(var t=1;t<=S.lv[di];t++)s2.push(DIMS[di].k+t+"="+lname(di,t));return DIMS[di].name+": "+s2.join(", ");}).join(" | ")+" (number 0 = 'all', label me nahi likha).</div>"):"";
    if(!S.sel){info.innerHTML="Kisi bhi cuboid (box) par click karo: wo 'GROUP BY' kya hoga, kaun se cuboids us se ROLL-UP se bante hain (neela) aur kin me DRILL-DOWN ho sakta hai (orange), aur roll-up path animate hoga."+leg;return;}
    var up=ancestors(S.sel,S.all).length,dn=descendants(S.sel,S.all).length;
    info.innerHTML="<b>Cuboid "+label(S.sel,act)+"</b> = GROUP BY <code>"+groupBy(S.sel,act)+"</code><br><span style='color:var(--blue,#2f5bd8);font-weight:700'>Roll-up reachable (neela): "+up+"</span> cuboids • <span style='color:var(--org,#e8730c);font-weight:700'>Drill-down reachable (orange): "+dn+"</span> cuboids"+leg+"<div class='"+c("mut")+"'>Neela = is cuboid se hi compute ho sakte hain (kam detail). Orange = jin se ye cuboid compute hota hai.</div>";
  }
  root.appendChild(h("div",{class:c("title"),text:"Cuboid lattice (data cube ka lattice)"}));
  root.appendChild(h("div",{class:c("mut"),text:"Dimensions chuno (1 se 4) aur har dimension ke hierarchy levels:"}));
  root.appendChild(dimsBox);root.appendChild(cnt);root.appendChild(pl.el);root.appendChild(cap);root.appendChild(svgW);root.appendChild(info);
  el.appendChild(root);
  build();
});
if(typeof module!=="undefined"&&module.exports)module.exports={cuboidCount:cuboidCount,enumerate:enumerate,ancestors:ancestors,descendants:descendants,latticeEdges:latticeEdges,rollupPath:rollupPath};

})();
