(function(){
"use strict";
var N="index-lookup", P="w-index-lookup-";
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
var DATA={
  primary:[[5,12,18],[25,31,37],[44,50,56],[63,70,77],[81,88,92],[97,103,110]],
  cluster:[[1,1,1],[1,2,2],[2,3,3],[3,3,4],[4,5,5],[5,5,5]],
  seckey:[[44,5,92],[18,70,110],[31,81,56],[103,12,63],[37,97,25],[88,77,50]],
  secnon:[[3,1,4],[2,5,1],[3,2,5],[4,1,3],[5,2,4],[1,3,2]]
};
function chunk(a,n){var o=[];for(var i=0;i<a.length;i+=n)o.push(a.slice(i,i+n));return o;}
function probes(nb,t){var lo=0,hi=nb-1,seq=[];while(lo<=hi){var m=Math.floor((lo+hi)/2);seq.push(m);if(m===t)break;if(m<t)lo=m+1;else hi=m-1;}return seq;}
function buildIndex(type,data,epb){
  var ents=[],levels=[];
  if(type==="dense"||type==="seckey"){
    data.forEach(function(b,j){b.forEach(function(k,s){ents.push({key:k,blk:j,slot:s});});});
    ents.sort(function(a,b){return a.key-b.key;});
  }else if(type==="sparse"||type==="multi"){
    data.forEach(function(b,j){ents.push({key:b[0],blk:j});});
  }else if(type==="cluster"){
    var seen={};data.forEach(function(b,j){b.forEach(function(k){if(!seen[k]){seen[k]=1;ents.push({key:k,blk:j});}});});
    ents.sort(function(a,b){return a.key-b.key;});
  }else if(type==="secnon"){
    var m={};data.forEach(function(b,j){b.forEach(function(k){(m[k]=m[k]||[]);if(m[k].indexOf(j)<0)m[k].push(j);});});
    Object.keys(m).map(Number).sort(function(a,b){return a-b;}).forEach(function(k){ents.push({key:k,blks:m[k],blk:m[k][0]});});
  }
  levels.push({entries:ents,blocks:chunk(ents,epb)});
  if(type==="multi"){
    while(levels[levels.length-1].blocks.length>1){
      var prev=levels[levels.length-1],e2=prev.blocks.map(function(b,j){return {key:b[0].key,blk:j};});
      levels.push({entries:e2,blocks:chunk(e2,epb)});
    }
  }
  return levels;
}
/* steps: {lv:level or -1 for data, blk, ent:{lvl,block,idx}|null, note} */
function lookup(type,data,levels,key){
  var steps=[],found=false;
  function entPos(L,e){var k=0,acc=0;for(var b=0;b<L.blocks.length;b++){var i=L.blocks[b].indexOf(e);if(i>=0)return {block:b,idx:i};}return null;}
  function pick(L,exact){var e=null;L.entries.forEach(function(x){if(exact?x.key===key:x.key<=key)e=x;});return e;}
  if(type==="multi"){
    for(var l=levels.length-1;l>=0;l--){
      var L=levels[l],e=pick(L,false),pos=entPos(L,e);
      var curBlk=(l===levels.length-1)?0:levels[l+1]?null:null;
      steps.push({lv:l,blk:pos.block,idx:pos.idx,
        note:(l===levels.length-1?"Top level ka sirf 1 block hai (memory me rakh sakte hain, phir bhi 1 access gino). ":"")+"Level "+(l+1)+" index block padha. Sabse bada entry ≤ "+key+" hai "+e.key+" → pointer "+(l>0?"neeche ke index block #"+(e.blk+1):"data block B"+(e.blk+1))+"."});
    }
    var e0=pick(levels[0],false);
    var db=data[e0.blk];found=db.indexOf(key)>=0;
    steps.push({lv:-1,blk:e0.blk,idx:db.indexOf(key),note:"Data block B"+(e0.blk+1)+" padha, andar scan: "+(found?"key "+key+" mil gayi ✓":"key nahi mili")+"."});
    return {steps:steps,found:found,accesses:steps.length};
  }
  var L0=levels[0];
  var dense=(type==="dense"||type==="seckey"||type==="cluster"||type==="secnon");
  var e=pick(L0,dense),pos=entPos(L0,e),nb=L0.blocks.length;
  var seq=probes(nb,pos.block);
  seq.forEach(function(m,i){
    var blk=L0.blocks[m],last=i===seq.length-1;
    var lo=blk[0].key,hi=blk[blk.length-1].key;
    var why=last?(dense?("Is block me key/value "+key+" ka entry mil gaya → pointer follow karo."):("Is block me "+key+" se chhota/barabar sabse bada anchor "+e.key+" hai → pointer follow karo.")):("Block ki range "+lo+".."+hi+": "+key+(key<lo?" isse chhota → binary search left half me.":" isse bada → binary search right half me."));
    steps.push({lv:0,blk:m,idx:last?pos.idx:-1,note:"Index block #"+(m+1)+" padha (binary search ka probe "+(i+1)+"/"+seq.length+"). "+why});
  });
  if(type==="secnon"){
    e.blks.forEach(function(j,i){steps.push({lv:-1,blk:j,idx:data[j].indexOf(key),note:"Data block B"+(j+1)+" padha ("+(i+1)+"/"+e.blks.length+"): is value ke records alag-alag blocks me bikhre hain, isliye har ek block alag access."});});
    found=true;
  }else if(type==="cluster"){
    var j=e.blk;
    do{steps.push({lv:-1,blk:j,idx:data[j].indexOf(key),note:"Data block B"+(j+1)+" padha"+(j===e.blk?" (index ne pehla block bataya)":" (clustered file hai, isliye value ke records agle blocks me bhi chalte hain)")+"."});j++;}
    while(j<data.length&&data[j].indexOf(key)>=0);
    found=true;
  }else{
    var db2=data[e.blk];found=db2.indexOf(key)>=0;
    steps.push({lv:-1,blk:e.blk,idx:db2.indexOf(key),note:"Data block B"+(e.blk+1)+" padha (1 access) aur andar scan: "+(found?"key "+key+" mil gayi ✓":"key nahi mili")+"."});
  }
  return {steps:steps,found:found,accesses:steps.length};
}
function indexCalc(B,R,r,V,P){
  var o={ok:true};
  if(!(B>0&&R>0&&r>0&&V>0&&P>0)||R>B||V+P>B){o.ok=false;return o;}
  o.bfr=Math.floor(B/R);o.b=Math.ceil(r/o.bfr);o.fi=Math.floor(B/(V+P));
  o.denseBlocks=Math.ceil(r/o.fi);o.sparseBlocks=Math.ceil(o.b/o.fi);
  o.denseAcc=(o.denseBlocks<=1?1:Math.ceil(Math.log2(o.denseBlocks)))+1;
  o.sparseAcc=(o.sparseBlocks<=1?1:Math.ceil(Math.log2(o.sparseBlocks)))+1;
  var lv=[o.sparseBlocks];while(lv[lv.length-1]>1)lv.push(Math.ceil(lv[lv.length-1]/o.fi));
  o.levelBlocks=lv;o.levels=lv.length;o.multiAcc=o.levels+1;
  o.noIndexAvg=o.b/2;o.noIndexSorted=o.b<=1?1:Math.ceil(Math.log2(o.b));
  return o;
}
var TYPES={
  dense:{name:"Primary dense (key par sorted file)",data:"primary",desc:"File key par sorted hai. Index me HAR record ka entry hai."},
  sparse:{name:"Primary sparse (key par sorted file)",data:"primary",desc:"File key par sorted. Index me sirf har BLOCK ka pehla record (anchor) hai."},
  cluster:{name:"Clustering index (non-key par sorted)",data:"cluster",desc:"File non-key field par sorted (values repeat). Har DISTINCT value ka ek entry, pehle block ka pointer."},
  seckey:{name:"Secondary index (key, file unsorted)",data:"seckey",desc:"File unsorted hai, to index hamesha DENSE hona chahiye (har record ka entry)."},
  secnon:{name:"Secondary index (non-key, unsorted)",data:"secnon",desc:"Unsorted file, repeated value. Har distinct value ke saare record-blocks ke pointers."},
  multi:{name:"Multilevel index (sparse upar sparse)",data:"primary",desc:"Index ka bhi index. Top par 1 block tak: accesses = levels + 1."}
};
var CSS=
".ROOT .$blk{fill:var(--bg,#fff);stroke:var(--mut,#5b6580);stroke-width:1.2;transition:fill .3s,stroke .3s}"+
".ROOT .$blk.$d{stroke:var(--green,#14a06b)}"+
".ROOT .$blk.$act{fill:rgba(47,91,216,.16);stroke:var(--blue,#2f5bd8);stroke-width:2.5}"+
".ROOT .$blk.$dact{fill:rgba(20,160,107,.2);stroke:var(--green,#14a06b);stroke-width:2.5}"+
".ROOT .$blk.$vis{fill:rgba(232,115,12,.22)}"+
".ROOT .$tx{fill:var(--ink,#1b2438);font:12px ui-monospace,Menlo,monospace}"+
".ROOT .$tx.$hit{font-weight:800;fill:var(--org,#e8730c)}"+
".ROOT .$lbl{fill:var(--mut,#5b6580);font:600 11px system-ui}"+
".ROOT .$ar{stroke:var(--line,#d7deee);stroke-width:1;fill:none}"+
".ROOT .$ar.$on{stroke:var(--blue,#2f5bd8);stroke-width:2.6;stroke-dasharray:none}"+
".ROOT .$big{font-size:20px;font-weight:800;color:var(--blue,#2f5bd8)}"+
".ROOT .$in2{width:96px}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={type:"sparse",key:null,frames:[],epb:3};
  var root=h("div",{class:c("root")});
  var selT=h("select",{class:c("in"),"aria-label":"Index type"},Object.keys(TYPES).map(function(k){return h("option",{value:k,text:TYPES[k].name});}));
  selT.value=S.type;
  var selK=h("select",{class:c("in"),"aria-label":"Search key"});
  var desc=h("div",{class:c("mut")});
  var cap=h("div",{class:c("cap"),"aria-live":"polite"});
  var svgW=h("div",{class:c("svgw")});
  var acc=h("div",{});
  var pl=Player(function(i){S.cur=i;draw();},function(){return S.frames.length;},{end:true,ms:1300});
  S.cur=0;
  function geometry(levels,data){
    var RH=18,BH=3*RH+8,GAP=12,CW=96,AX=84;
    var nCols=levels.length+1,G={cols:[],RH:RH,CW:CW,BH:BH};
    var dataH=data.length*(BH+GAP);
    var maxN=Math.max(dataH,0);
    var xs=[];for(var i=0;i<nCols;i++)xs.push(30+i*(CW+AX));
    G.W=xs[nCols-1]+CW+34;
    G.H=dataH+24;
    G.data=data.map(function(b,j){return {x:xs[nCols-1],y:20+j*(BH+GAP),w:CW,h:BH,vals:b};});
    G.lv=[];
    for(var l=0;l<levels.length;l++){
      var col=nCols-2-l,nb=levels[l].blocks.length,arr=[];
      var slot=(dataH)/nb;
      levels[l].blocks.forEach(function(bl,k){var hh=bl.length*RH+8;arr.push({x:xs[col],y:20+k*slot+(slot-GAP-hh)/2+GAP/2+ (slot>hh?0:0),w:CW,h:hh});});
      G.lv.push(arr);
    }
    return G;
  }
  function build(){
    var T=TYPES[S.type];S.T=T;S.data=DATA[T.data];S.levels=buildIndex(S.type,S.data,S.epb);
    var keys=[];
    if(S.type==="cluster"||S.type==="secnon"){var m={};S.data.forEach(function(b){b.forEach(function(k){m[k]=1;});});keys=Object.keys(m).map(Number).sort(function(a,b){return a-b;});}
    else S.data.forEach(function(b){b.forEach(function(k){keys.push(k);});}),keys.sort(function(a,b){return a-b;});
    var old=S.key;S.keys=keys;
    selK.innerHTML="";keys.forEach(function(k){selK.appendChild(h("option",{value:k,text:String(k)}));});
    S.key=keys.indexOf(old)>=0?old:(S.type==="cluster"||S.type==="secnon"?3:(keys.indexOf(70)>=0?70:keys[Math.floor(keys.length/2)]));
    selK.value=S.key;
    desc.textContent=T.desc;
    S.G=geometry(S.levels,S.data);
    S.res=lookup(S.type,S.data,S.levels,S.key);
    S.frames=[{note:"Search key = "+S.key+". Play dabao: index se data block tak kaise pahunchte hain dekho. Har block padhna = 1 disk access.",done:0,steps:[]}];
    S.res.steps.forEach(function(st,i){S.frames.push({note:"Access #"+(i+1)+": "+st.note,done:i+1,steps:S.res.steps.slice(0,i+1)});});
    var tot=S.res.accesses,idxc=S.res.steps.filter(function(s2){return s2.lv>=0;}).length;
    S.frames.push({note:"Total = "+tot+" block accesses ("+idxc+" index + "+(tot-idxc)+" data). Bina index ke linear scan me average "+(S.data.length/2)+" aur worst "+S.data.length+" blocks padhne padte.",done:tot,steps:S.res.steps,end:true});
    pl.stop();pl.go(0,true);S.cur=0;draw();
  }
  function draw(){
    var fr=S.frames[S.cur],G=S.G,L=S.levels;
    var svg=s("svg",{width:G.W,height:G.H,viewBox:"0 0 "+G.W+" "+G.H,role:"img","aria-label":"Index aur data blocks"});
    var last=fr.steps.length?fr.steps[fr.steps.length-1]:null;
    var visI={},visD={};
    fr.steps.forEach(function(st,i){(st.lv>=0?visI:visD)[(st.lv>=0?st.lv+"_":"")+st.blk]=(i===fr.steps.length-1&&!fr.end)?2:1;});
    var activeEnt=last&&last.lv>=0&&last.idx>=0?last:null;
    /* column labels */
    L.forEach(function(lv,l){var b=G.lv[l][0];svg.appendChild(s("text",{x:b.x,y:12,class:c("lbl")},[L.length>1?("Index level "+(l+1)):"Index file"]));});
    svg.appendChild(s("text",{x:G.data[0].x,y:12,class:c("lbl")},["Data file (blocks)"]));
    /* arrows */
    L.forEach(function(lv,l){
      lv.blocks.forEach(function(bl,k){bl.forEach(function(e,i){
        var from=G.lv[l][k],y0=from.y+4+i*G.RH+G.RH/2,x0=from.x+G.CW;
        var targets=e.blks&&l===0?e.blks:[e.blk];
        targets.forEach(function(tj){
          var tb=l===0?G.data[tj]:G.lv[l-1][tj];
          var y1=tb.y+tb.h/2,x1=tb.x;
          var on=false;
          if(last){fr.steps.forEach(function(st){if(st.lv===l&&st.blk===k&&st.idx===i){if(l===0&&S.type==="secnon"){on=true;}else on=true;}});}
          svg.appendChild(s("path",{class:c("ar")+(on?" "+c("on"):""),d:"M"+x0+","+y0+" C"+(x0+40)+","+y0+" "+(x1-40)+","+y1+" "+x1+","+y1,"marker-end":on?"url(#wil-ah)":""}));
        });
      });});
    });
    svg.insertBefore(s("defs",{},[s("marker",{id:"wil-ah",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"6",markerHeight:"6",orient:"auto"},[s("path",{d:"M0,0 L8,4 L0,8 z",fill:"#2f5bd8"})])]),svg.firstChild);
    /* index blocks */
    L.forEach(function(lv,l){lv.blocks.forEach(function(bl,k){
      var b=G.lv[l][k],cl=c("blk")+(visI[l+"_"+k]===2?" "+c("act"):(visI[l+"_"+k]===1?" "+c("vis"):""));
      svg.appendChild(s("rect",{x:b.x,y:b.y,width:b.w,height:b.h,rx:5,class:cl}));
      svg.appendChild(s("text",{x:b.x-4,y:b.y+12,"text-anchor":"end",class:c("lbl")},["I"+(k+1)]));
      bl.forEach(function(e,i){var hit=activeEnt&&activeEnt.lv===l&&activeEnt.blk===k&&activeEnt.idx===i;
        svg.appendChild(s("text",{x:b.x+10,y:b.y+4+i*G.RH+13,class:c("tx")+(hit?" "+c("hit"):"")},["key "+e.key]));});
    });});
    /* data blocks */
    G.data.forEach(function(b,j){
      var st=visD[j],cl=c("blk")+" "+c("d")+(st===2?" "+c("dact"):(st===1?" "+c("vis"):""));
      svg.appendChild(s("rect",{x:b.x,y:b.y,width:b.w,height:b.h,rx:5,class:cl}));
      svg.appendChild(s("text",{x:b.x+b.w+4,y:b.y+14,class:c("lbl")},["B"+(j+1)]));
      b.vals.forEach(function(v,i){var hit=(st&&v===S.key&&(S.type!=="dense"||true));
        svg.appendChild(s("text",{x:b.x+10,y:b.y+4+i*G.RH+13,class:c("tx")+(hit&&last&&last.lv<0&&last.blk===j?" "+c("hit"):"")},[(S.type==="cluster"||S.type==="secnon"?"dept ":"key ")+v]));});
    });
    svgW.innerHTML="";svgW.appendChild(svg);
    cap.textContent=fr.note;
    var idxN=fr.steps.filter(function(x){return x.lv>=0;}).length,dN=fr.steps.length-idxN;
    acc.innerHTML="Block accesses: <span class='"+c("big")+"'>"+fr.steps.length+"</span> <span class='"+c("mut")+"'>(index "+idxN+" + data "+dN+")</span>";
  }
  selT.addEventListener("change",function(){S.type=selT.value;build();});
  selK.addEventListener("change",function(){S.key=Number(selK.value);build();});
  /* calculator */
  var cv={B:1024,R:128,r:100000,V:10,P:6},cin={},ctab=h("div",{class:c("tw")}),cfm=h("div",{class:c("mut")});
  function ci(k,l){var i=h("input",{class:c("in in2"),type:"number",min:"1",value:cv[k],"aria-label":l});i.addEventListener("input",calc);cin[k]=i;return h("label",{class:c("lab")},[l,i]);}
  function calc(){
    for(var k in cin)cv[k]=pn(cin[k].value,0);
    var o=indexCalc(cv.B,cv.R,cv.r,cv.V,cv.P);
    if(!o.ok){ctab.innerHTML="<span class='"+c("warn")+"'>Inputs sahi nahi (sab >0; R ≤ B; V+P ≤ B)</span>";cfm.textContent="";return;}
    cfm.innerHTML="Data: bfr = ⌊"+cv.B+"/"+cv.R+"⌋ = <b>"+o.bfr+"</b>, data blocks b = ⌈"+cv.r+"/"+o.bfr+"⌉ = <b>"+o.b+"</b>. Index entry = V+P = "+(cv.V+cv.P)+" bytes, index blocking factor fi = ⌊"+cv.B+"/"+(cv.V+cv.P)+"⌋ = <b>"+o.fi+"</b>.";
    ctab.innerHTML="<table class='"+c("t")+"'><tr><th>Index</th><th>Entries</th><th>Index blocks</th><th>Block accesses</th></tr>"+
      "<tr><td>Koi index nahi (sorted file, binary)</td><td>-</td><td>-</td><td>⌈log₂ "+o.b+"⌉ = "+o.noIndexSorted+"</td></tr>"+
      "<tr><td>Dense (single level)</td><td>r = "+cv.r+"</td><td>⌈"+cv.r+"/"+o.fi+"⌉ = "+o.denseBlocks+"</td><td>⌈log₂ "+o.denseBlocks+"⌉ + 1 = "+o.denseAcc+"</td></tr>"+
      "<tr><td>Sparse (single level)</td><td>b = "+o.b+"</td><td>⌈"+o.b+"/"+o.fi+"⌉ = "+o.sparseBlocks+"</td><td>⌈log₂ "+o.sparseBlocks+"⌉ + 1 = "+o.sparseAcc+"</td></tr>"+
      "<tr><td>Multilevel (sparse)</td><td>blocks per level: "+o.levelBlocks.join(" → ")+"</td><td>"+o.levelBlocks.reduce(function(a,b){return a+b;},0)+" total</td><td>"+o.levels+" levels + 1 = <b>"+o.multiAcc+"</b></td></tr></table>";
  }
  root.appendChild(h("div",{class:c("title"),text:"Index lookup: kaise index data tak pahunchata hai"}));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Index type",selT]),h("label",{class:c("lab")},["Search key / value",selK])]));
  root.appendChild(desc);root.appendChild(pl.el);root.appendChild(cap);root.appendChild(acc);root.appendChild(svgW);
  root.appendChild(h("div",{class:c("mut"),text:"Demo me ek index block me 3 entries aur ek data block me 3 records maane hain. Hara border = data block, neela = index block."}));
  root.appendChild(h("div",{class:c("title"),text:"Calculator: index blocks aur levels",style:"margin-top:12px"}));
  root.appendChild(h("div",{class:c("row")},[ci("B","Block size B"),ci("R","Record size R"),ci("r","Records r"),ci("V","Key size V"),ci("P","Pointer size P")]));
  root.appendChild(cfm);root.appendChild(ctab);
  el.appendChild(root);build();calc();
});
if(typeof module!=="undefined"&&module.exports)module.exports={probes:probes,buildIndex:buildIndex,lookup:lookup,indexCalc:indexCalc,DATA:DATA};

})();
