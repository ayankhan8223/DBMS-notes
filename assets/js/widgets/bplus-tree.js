(function(){
"use strict";
var N="bplus-tree", P="w-bplus-tree-";
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
/* ===== Core logic: B+ tree and B-tree =====
   Convention (GATE style): order p = max number of TREE POINTERS in an internal node.
   Internal node: max p-1 keys, min ceil(p/2) pointers (root: min 2 pointers).
   B+ leaf: max p-1 keys, min ceil((p-1)/2) keys. Leaf split: copy-up of right leaf's first key.
   B-tree: every node max p-1 keys, min ceil(p/2)-1 keys (non-root); split pushes median up.
*/
function Tree(mode,p){this.mode=mode;this.p=p;this.nid=1;this.root=this.mk(true);}
Tree.prototype.mk=function(leaf){return {id:this.nid++,leaf:leaf,keys:[],ch:[]};};
Tree.prototype.maxKeys=function(){return this.p-1;};
Tree.prototype.minLeaf=function(){return this.mode==="B+"?Math.ceil((this.p-1)/2):Math.ceil(this.p/2)-1;};
Tree.prototype.minInt=function(){return Math.ceil(this.p/2)-1;};
function cidx(n,key){var i=0;while(i<n.keys.length&&n.keys[i]<=key)i++;return i;}
Tree.prototype.contains=function(key){
  var n=this.root;
  while(true){
    if(this.mode==="B"&&n.keys.indexOf(key)>=0)return true;
    if(n.leaf)return n.keys.indexOf(key)>=0;
    n=n.ch[cidx(n,key)];
  }
};
function clone(n){return {id:n.id,leaf:n.leaf,keys:n.keys.slice(),ch:n.ch.map(clone)};}
function fmt(n){return "["+n.keys.join("|")+"]";}
var NOP=function(){};
Tree.prototype.insert=function(key,log){
  log=log||NOP;var p=this.p,self=this;
  if(this.contains(key)){log("Key "+key+" pehle se hai - duplicate allowed nahi, ignore.",{});return false;}
  var n=this.root,path=[],ids=[n.id];
  while(!n.leaf){var i=cidx(n,key);path.push([n,i]);n=n.ch[i];ids.push(n.id);}
  log("Insert "+key+": root se neeche jao (har node me compare karke sahi pointer lo) → leaf "+fmt(n)+" mila.",{path:ids,mark:[key]});
  var pos=0;while(pos<n.keys.length&&n.keys[pos]<key)pos++;
  n.keys.splice(pos,0,key);
  var over=n.keys.length>p-1;
  log(over?("Key "+key+" leaf me daali → ab leaf me "+n.keys.length+" keys hain, max "+(p-1)+" hai: OVERFLOW!"):("Key "+key+" leaf me sorted jagah par daal di. Space thi, bas itna hi."),{nodes:[n.id],mark:[key],bad:over?[n.id]:[]});
  var node=n;
  while(node.keys.length>p-1){
    var nw=this.mk(node.leaf),sep;
    if(this.mode==="B+"&&node.leaf){
      var m=Math.ceil(p/2);
      nw.keys=node.keys.slice(m);node.keys=node.keys.slice(0,m);sep=nw.keys[0];
    }else{
      var md=Math.floor(p/2);
      sep=node.keys[md];nw.keys=node.keys.slice(md+1);
      if(!node.leaf){nw.ch=node.ch.slice(md+1);node.ch=node.ch.slice(0,md+1);}
      node.keys=node.keys.slice(0,md);
    }
    var how=(this.mode==="B+"&&node.leaf)?("Leaf split: pehle "+Math.ceil(p/2)+" keys left me, baaki right me. Right leaf ki pehli key "+sep+" ki COPY upar parent me jaati hai (leaf me bhi rehti hai)."):("Node split: beech ki key "+sep+" upar PUSH hoti hai (neeche se nikal jaati hai); left aur right alag nodes bane.");
    if(!path.length){
      var r=this.mk(false);r.keys=[sep];r.ch=[node,nw];this.root=r;
      log(how+" Root hi split hua → NAYA ROOT bana, tree ki height 1 badh gayi.",{nodes:[node.id,nw.id,r.id],isnew:[nw.id,r.id],mark:[sep]});
      break;
    }
    var pr=path.pop(),par=pr[0],ci=pr[1];
    par.keys.splice(ci,0,sep);par.ch.splice(ci+1,0,nw);
    var ov=par.keys.length>p-1;
    log(how+" "+sep+" parent me gayi."+(ov?" Parent me ab "+par.keys.length+" keys → wo bhi OVERFLOW, split aage badhega.":" Parent me jagah thi, split yahin ruk gaya."),{nodes:[node.id,nw.id,par.id],isnew:[nw.id],mark:[sep],bad:ov?[par.id]:[]});
    node=par;
  }
  return true;
};
Tree.prototype.remove=function(key,log){
  log=log||NOP;var self=this;
  if(!this.contains(key)){log("Key "+key+" tree me hai hi nahi - kuch delete nahi hoga.",{});return false;}
  var minL=this.minLeaf(),minI=this.minInt(),B=this.mode==="B+";
  function minOf(n){return (B&&n.leaf)?minL:minI;}
  function rightmost(n){while(!n.leaf)n=n.ch[n.ch.length-1];return n;}
  function fix(par,i){
    var ch=par.ch[i],mn=minOf(ch);
    if(ch.keys.length>=mn)return;
    log("Underflow! Node "+fmt(ch)+" me "+ch.keys.length+" key hai, minimum "+mn+" chahiye.",{nodes:[ch.id],bad:[ch.id]});
    var L=i>0?par.ch[i-1]:null,R=i<par.ch.length-1?par.ch[i+1]:null;
    if(L&&L.keys.length>mn){
      if(B&&ch.leaf){var k=L.keys.pop();ch.keys.unshift(k);par.keys[i-1]=ch.keys[0];
        log("Left sibling ke paas extra key thi → BORROW: uski last key "+k+" le li, parent ka separator "+ch.keys[0]+" kar diya.",{nodes:[L.id,ch.id,par.id],mark:[k]});}
      else{var pk=par.keys[i-1];ch.keys.unshift(pk);par.keys[i-1]=L.keys.pop();if(!ch.leaf)ch.ch.unshift(L.ch.pop());
        log("Left sibling se BORROW (parent ke through ghumake): parent ki key neeche aayi, sibling ki last key upar gayi.",{nodes:[L.id,ch.id,par.id]});}
      return;
    }
    if(R&&R.keys.length>mn){
      if(B&&ch.leaf){var k2=R.keys.shift();ch.keys.push(k2);par.keys[i]=R.keys[0];
        log("Right sibling ke paas extra key thi → BORROW: uski pehli key "+k2+" le li, parent ka separator "+R.keys[0]+" ho gaya.",{nodes:[R.id,ch.id,par.id],mark:[k2]});}
      else{var pk2=par.keys[i];ch.keys.push(pk2);par.keys[i]=R.keys.shift();if(!ch.leaf)ch.ch.push(R.ch.shift());
        log("Right sibling se BORROW (parent ke through ghumake): parent ki key neeche aayi, sibling ki pehli key upar gayi.",{nodes:[R.id,ch.id,par.id]});}
      return;
    }
    var si=L?i-1:i,a=par.ch[si],b=par.ch[si+1];
    if(B&&a.leaf){a.keys=a.keys.concat(b.keys);}
    else{a.keys=a.keys.concat([par.keys[si]],b.keys);a.ch=a.ch.concat(b.ch);}
    par.keys.splice(si,1);par.ch.splice(si+1,1);
    log("Siblings ke paas extra key nahi → MERGE: dono nodes ek ho gaye"+((B&&a.leaf)?" (parent ka separator hata diya, leaf me copy tha).":" (parent ka separator bhi neeche aa gaya).")+" Parent ab "+par.keys.length+" key ka.",{nodes:[a.id,par.id]});
  }
  function rec(n,k,first){
    if(n.leaf){var ix=n.keys.indexOf(k);n.keys.splice(ix,1);
      log("Leaf se "+k+" hata di."+(n.keys.length?"":" (leaf khali)"),{nodes:[n.id],mark:[]});return;}
    var j=self.mode==="B"?n.keys.indexOf(k):-1;
    if(j>=0){
      var pred=rightmost(n.ch[j]).keys.slice(-1)[0];
      n.keys[j]=pred;
      log("Key "+k+" internal node me mili. Isko left subtree ki sabse badi key (predecessor) "+pred+" se replace kiya; ab "+pred+" ko neeche leaf se hatana hai.",{nodes:[n.id],mark:[pred]});
      rec(n.ch[j],pred);fix(n,j);return;
    }
    var i=cidx(n,k);
    rec(n.ch[i],k);fix(n,i);
  }
  /* path highlight frame */
  var ids=[],q=this.root;
  while(true){ids.push(q.id);if(q.leaf||(this.mode==="B"&&q.keys.indexOf(key)>=0))break;q=q.ch[cidx(q,key)];}
  log("Delete "+key+": pehle search karke key ka node dhundo.",{path:ids});
  rec(this.root,key);
  if(!this.root.leaf&&this.root.keys.length===0){this.root=this.root.ch[0];
    log("Root me koi key nahi bachi → uska ek hi child naya ROOT ban gaya, height 1 kam ho gayi.",{nodes:[this.root.id]});}
  return true;
};
Tree.prototype.search=function(key,log){
  log=log||NOP;var n=this.root,ids=[],found=false;
  while(true){
    ids.push(n.id);
    var inNode=n.keys.indexOf(key)>=0;
    if(n.leaf){found=inNode;
      log("Leaf "+fmt(n)+" me "+key+(found?" mil gayi! ✓":" nahi mili ✗ → key tree me nahi hai.")+" Total "+ids.length+" node (block) padhe.",{path:ids,mark:found?[key]:[]});break;}
    if(this.mode==="B"&&inNode){found=true;log("Internal node "+fmt(n)+" me hi "+key+" mil gayi (B-tree me internal node me data/key hota hai) ✓. "+ids.length+" node padhe.",{path:ids,mark:[key]});break;}
    var i=cidx(n,key);
    var why=i===0?(key+" < "+n.keys[0]+" → pehla pointer"):(i===n.keys.length?(key+" ≥ "+n.keys[n.keys.length-1]+" → aakhri pointer"):(n.keys[i-1]+" ≤ "+key+" < "+n.keys[i]+" → "+(i+1)+"-th pointer"));
    log("Node "+fmt(n)+": "+why+".",{path:ids.slice(),mark:[]});
    n=n.ch[i];
  }
  return found;
};
Tree.prototype.leaves=function(){var out=[];(function w(n){if(n.leaf)out.push(n);else n.ch.forEach(w);})(this.root);return out;};
Tree.prototype.range=function(lo,hi,log){
  log=log||NOP;var res=[];
  if(this.mode==="B"){
    var hit=[];
    (function w(n){for(var i=0;i<n.keys.length;i++){if(!n.leaf)w(n.ch[i]);if(n.keys[i]>=lo&&n.keys[i]<=hi){res.push(n.keys[i]);if(hit.indexOf(n.id)<0)hit.push(n.id);}}if(!n.leaf)w(n.ch[n.ch.length-1]);})(this.root);
    log("B-tree me leaf links nahi hote, isliye in-order traversal (upar-neeche aate jaate) karna padta hai. ["+lo+","+hi+"] ke result: "+(res.join(", ")||"koi nahi")+".",{path:hit,mark:res});
    return res;
  }
  var n=this.root,ids=[];
  while(!n.leaf){ids.push(n.id);log("Range ["+lo+","+hi+"]: pehle "+lo+" ko search karo (normal search path).",{path:ids.slice()});n=n.ch[cidx(n,lo)];}
  var lv=this.leaves(),k=lv.indexOf(n),seen=[];
  while(k<lv.length){
    var lf=lv[k],stop=false;seen.push(lf.id);
    lf.keys.forEach(function(x){if(x>=lo&&x<=hi)res.push(x);if(x>hi)stop=true;});
    log("Leaf "+fmt(lf)+" padha"+(k===lv.indexOf(n)?" (start leaf)":" (leaf link follow karke)")+". Ab tak result: "+(res.join(", ")||"-")+"."+(stop?" Key > "+hi+" mil gayi → ruk jao.":(k===lv.length-1?" Aakhri leaf, khatam.":" Next leaf pointer follow karo.")),{path:seen.slice(),mark:res.slice()});
    if(stop)break;k++;
  }
  return res;
};
Tree.prototype.stats=function(){
  var mode=this.mode,nodes=0,keys=0,h=0;
  (function w(n,d){nodes++;if(mode!=="B+"||n.leaf)keys+=n.keys.length;if(d>h)h=d;n.ch.forEach(function(c){w(c,d+1);});})(this.root,1);
  var lv=this.leaves().length;
  return {nodes:nodes,keys:keys,height:h,leaves:lv};
};
Tree.prototype.check=function(model){
  var p=this.p,B=this.mode==="B+",self=this,errs=[],depth=-1,all=[];
  function err(m){errs.push(m);}
  (function w(n,d,lo,hi,isRoot){
    for(var i=0;i<n.keys.length;i++){
      if(i&&!(n.keys[i-1]<n.keys[i]))err("unsorted "+n.id);
      if(lo!=null&&n.keys[i]<lo)err("key "+n.keys[i]+" < lo "+lo);
      if(hi!=null&&n.keys[i]>=hi)err("key "+n.keys[i]+" >= hi "+hi);
    }
    if(n.keys.length>p-1)err("overflow "+n.id);
    var mn=(B&&n.leaf)?self.minLeaf():self.minInt();
    if(isRoot){if(!n.leaf&&n.keys.length<1)err("root internal empty");}
    else if(n.keys.length<mn)err("underflow node "+n.id+" has "+n.keys.length+" min "+mn);
    if(n.leaf){if(depth<0)depth=d;else if(depth!==d)err("leaf depths differ");if(n.ch.length)err("leaf has children");}
    else{
      if(n.ch.length!==n.keys.length+1)err("children count");
      for(var j=0;j<n.ch.length;j++)w(n.ch[j],d+1,j?n.keys[j-1]:lo,j<n.keys.length?n.keys[j]:hi,false);
    }
    if(B){if(n.leaf)all=all.concat(n.keys);}
  })(this.root,1,null,null,true);
  if(!B){(function w(n){for(var i=0;i<n.keys.length;i++){if(!n.leaf)w(n.ch[i]);all.push(n.keys[i]);}if(!n.leaf)w(n.ch[n.ch.length-1]);})(this.root);}
  if(model){var m=Array.from(model).sort(function(a,b){return a-b;});
    if(JSON.stringify(m)!==JSON.stringify(all))err("content mismatch "+JSON.stringify(m)+" vs "+JSON.stringify(all));}
  return errs;
};
function layout(root,p,mode){
  var CW=30,PAD=8,GAP=14,LH=80;
  function nw(n){return Math.max(1,n.keys.length)*CW+2*PAD;}
  var pos={},edges=[],maxD=0;
  function sw(n){if(n.leaf){n._sw=nw(n);return n._sw;}var t=0;n.ch.forEach(function(c){t+=sw(c);});t+=GAP*(n.ch.length-1);n._sw=Math.max(nw(n),t);return n._sw;}
  function place(n,left,d){
    var w=n.leaf?nw(n):n._sw;if(n.leaf)n._sw=w;
    if(d>maxD)maxD=d;
    var cx;
    if(n.leaf)cx=left+w/2;
    else{
      var tot=0;n.ch.forEach(function(c){tot+=c._sw;});tot+=GAP*(n.ch.length-1);
      var x=left+(w-tot)/2,cs=[];
      n.ch.forEach(function(c){cs.push(place(c,x,d+1));x+=c._sw+GAP;});
      cx=(cs[0]+cs[cs.length-1])/2;
    }
    pos[n.id]={x:cx,y:d*LH+26,w:nw(n),n:n,d:d};
    return cx;
  }
  sw(root);place(root,10,0);
  (function w(n){n.ch.forEach(function(c,i){edges.push({from:n.id,to:c.id,i:i});w(c);});})(root);
  return {pos:pos,edges:edges,W:root._sw+20,H:(maxD+1)*LH+30,CW:CW,PAD:PAD};
}
/* ===== Widget UI ===== */
var CSS=
".ROOT .$cvt{display:block}"+
".ROOT .$nd{transition:transform .55s cubic-bezier(.4,.1,.2,1),opacity .4s}"+
".ROOT .$nd rect.k{fill:var(--bg,#fff);stroke:var(--ink,#1b2438);stroke-width:1.3;transition:fill .3s,stroke .3s}"+
".ROOT .$nd text{fill:var(--ink,#1b2438);font:600 13px ui-monospace,Menlo,Consolas,monospace;text-anchor:middle;dominant-baseline:central}"+
".ROOT .$nd.$leafn rect.k{fill:var(--card,#f6f8ff)}"+
".ROOT .$nd.$hl rect.k{stroke:var(--blue,#2f5bd8);stroke-width:2.5;fill:rgba(47,91,216,.13)}"+
".ROOT .$nd.$bad rect.k{stroke:var(--red,#d63b4f);stroke-width:2.5;fill:rgba(214,59,79,.15)}"+
".ROOT .$nd.$isnew rect.k{stroke:var(--green,#14a06b);stroke-width:2.5;fill:rgba(20,160,107,.15)}"+
".ROOT .$nd rect.k.mk{fill:var(--org,#e8730c);stroke:var(--org,#e8730c)}"+
".ROOT .$nd rect.k.mk+text{fill:#fff}"+
".ROOT .$ed{stroke:var(--mut,#5b6580);stroke-width:1.4;fill:none;transition:d .55s,stroke .3s}"+
".ROOT .$ed.$hl{stroke:var(--blue,#2f5bd8);stroke-width:2.6}"+
".ROOT .$lk{stroke:var(--teal,#0e9aa7);stroke-width:1.6;stroke-dasharray:4 3;fill:none;transition:d .55s}"+
".ROOT .$stat{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}"+
".ROOT .$conv{font-size:12.5px;background:var(--bg,#fff);border:1px dashed var(--line,#d7deee);border-radius:8px;padding:6px 10px;margin:6px 0}"+
".ROOT .$sm{width:70px}";
reg(function(el,opts){
  injectCSS(CSS);
  opts=opts||{};
  var S={mode:opts.mode==="B"?"B":"B+",p:pn(opts.p,4),frames:[],cur:0};
  var root=h("div",{class:c("root")});
  var title=h("div",{class:c("title"),text:"B+ Tree / B-Tree visualizer (step-by-step)"});
  var selMode=h("select",{class:c("in"),"aria-label":"Tree type"},[h("option",{value:"B+",text:"B+ Tree"}),h("option",{value:"B",text:"B-Tree"})]);
  selMode.value=S.mode;
  var selP=h("select",{class:c("in"),"aria-label":"Order p"},[3,4,5,6,7].map(function(v){return h("option",{value:v,text:"p = "+v});}));
  selP.value=S.p;
  var conv=h("div",{class:c("conv")});
  var inKeys=h("input",{class:c("in"),type:"text",value:"10 20 5 15 25 30 35 40",placeholder:"keys: 10 20 5 ...","aria-label":"Insert keys"});
  var inDel=h("input",{class:c("in sm"),type:"number",placeholder:"key","aria-label":"Delete/Search key"});
  var inLo=h("input",{class:c("in sm"),type:"number",placeholder:"low","aria-label":"Range low"});
  var inHi=h("input",{class:c("in sm"),type:"number",placeholder:"high","aria-label":"Range high"});
  function btn(t,f,cls){return h("button",{class:c("b "+(cls||"")),type:"button",onclick:f,text:t});}
  var svgW=h("div",{class:c("svgw")});
  var svg=s("svg",{class:c("cvt"),role:"img","aria-label":"Tree diagram"});
  var gE=s("g"),gL=s("g"),gN=s("g");svg.appendChild(gE);svg.appendChild(gL);svg.appendChild(gN);
  var defs=s("defs",{},[s("marker",{id:"w-bp-arr",viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"6",markerHeight:"6",orient:"auto"},[s("path",{d:"M0,0 L8,4 L0,8 z",fill:"#0e9aa7"})])]);
  svg.insertBefore(defs,gE);
  svgW.appendChild(svg);
  var cap=h("div",{class:c("cap"),"aria-live":"polite"});
  var stat=h("div",{class:c("stat")});
  var pl=Player(function(i){S.cur=i;render();},function(){return S.frames.length;},{end:true});
  function base(){return S.frames[S.cur].tree;}
  function tree(){var t=new Tree(S.mode,S.p);var b=S.frames[S.cur].tree;t.root=clone(b);t.nid=S.frames[S.cur].nid;return t;}
  function pushFrame(t,caption,hl){S.frames.push({tree:clone(t.root),nid:t.nid,cap:caption,hl:hl||{}});}
  function resetAll(){
    var t=new Tree(S.mode,S.p);S.frames=[];pushFrame(t,"Khali tree. Neeche se keys insert karo (ya “1..20” / “random” button dabao), phir Play/Step dabao.",{});S.cur=0;pl.stop();pl.go(0,true);render();
  }
  function begin(){ /* drop future frames when branching from the middle */
    S.frames=S.frames.slice(0,S.cur+1);
  }
  function run(fn){
    pl.stop();begin();var t=tree();var start=S.frames.length;
    fn(t,function(cp,hl){pushFrame(t,cp,hl);});
    pl.go(start,false);pl.refresh();
    if(S.frames.length-start>1)pl.start();
  }
  function parseKeys(str){return String(str).split(/[\s,;]+/).filter(Boolean).map(Number).filter(function(x){return isFinite(x);});}
  function doInsert(){var ks=parseKeys(inKeys.value);if(!ks.length)return;
    run(function(t,log){ks.forEach(function(k){t.insert(k,log);});log("Saari keys ho gayin. "+ks.length+" keys process hui.",{});});
}
  function doDelete(){var k=Number(inDel.value);if(inDel.value===""||!isFinite(k))return;run(function(t,log){t.remove(k,log);log("Delete "+k+" complete.",{});});}
  function doSearch(){var k=Number(inDel.value);if(inDel.value===""||!isFinite(k))return;run(function(t,log){t.search(k,log);});}
  function doRange(){var a=Number(inLo.value),b=Number(inHi.value);if(inLo.value===""||inHi.value===""||a>b)return;run(function(t,log){t.range(a,b,log);});}
  function seq(){run(function(t,log){for(var i=1;i<=20;i++)t.insert(i,log);log("1 se 20 insert ho gaye.",{});});}
  function rnd(){var pool=[];for(var i=1;i<=60;i++)pool.push(i);var ks=[];for(var j=0;j<12;j++){var r=Math.floor(Math.random()*pool.length);ks.push(pool.splice(r,1)[0]);}
    inKeys.value=ks.join(" ");doInsert();}
  function convText(){
    var p=S.p,B=S.mode==="B+";
    var minI=Math.ceil(p/2);
    conv.innerHTML="<b>Convention (GATE):</b> order <b>p = "+p+"</b> = ek internal node me max pointers. Max keys = <b>p−1 = "+(p-1)+"</b>. "+
      "Internal node: min <b>⌈p/2⌉ = "+minI+"</b> pointers (= "+(minI-1)+" keys), root me min 2 pointers. "+
      (B?"Leaf: max "+(p-1)+" keys, min <b>⌈(p−1)/2⌉ = "+Math.ceil((p-1)/2)+"</b> keys. Leaf split = <i>copy-up</i> (key leaf me bhi rehti hai); leaves linked hain.":
      "B-Tree me har node (leaf bhi) me max "+(p-1)+", min "+(minI-1)+" keys; split me beech ki key <i>push-up</i> hoti hai; leaf links nahi hote.");
  }
  /* rendering with keyed reuse */
  var nodeEls={},edgeEls={},linkEls={};
  function render(){
    var fr=S.frames[S.cur];if(!fr)return;
    var t=new Tree(S.mode,S.p);t.root=clone(fr.tree);
    var L=layout(t.root,S.p,S.mode),hl=fr.hl||{};
    var inPath={};(hl.path||[]).forEach(function(i){inPath[i]=1;});
    (hl.nodes||[]).forEach(function(i){inPath[i]=1;});
    var bad={};(hl.bad||[]).forEach(function(i){bad[i]=1;});
    var isn={};(hl.isnew||[]).forEach(function(i){isn[i]=1;});
    var marks={};(hl.mark||[]).forEach(function(k){marks[k]=1;});
    var W=Math.max(L.W,320);
    svg.setAttribute("width",W);svg.setAttribute("height",L.H);svg.setAttribute("viewBox","0 0 "+W+" "+L.H);
    var offX=(W-L.W)/2;
    /* nodes */
    var seen={};
    Object.keys(L.pos).forEach(function(id){
      var q=L.pos[id],n=q.n;seen[id]=1;
      var g=nodeEls[id];
      if(!g){g=s("g",{class:c("nd")});g.style.opacity="0";gN.appendChild(g);nodeEls[id]=g;
        g.style.transform="translate("+(q.x+offX)+"px,"+(q.y)+"px)";
        setTimeout(function(){g.style.opacity="1";},20);}
      g.setAttribute("class",c("nd")+(n.leaf&&S.mode==="B+"?" "+c("leafn"):"")+(bad[id]?" "+c("bad"):(isn[id]?" "+c("isnew"):(inPath[id]?" "+c("hl"):""))));
      g.style.transform="translate("+(q.x+offX)+"px,"+q.y+"px)";
      var w=Math.max(1,n.keys.length)*L.CW+2*L.PAD,x0=-w/2+L.PAD;
      var html="";
      if(!n.keys.length)html+="<rect class='k' x='"+(-w/2+L.PAD)+"' y='-14' width='"+L.CW+"' height='28' rx='3'/>";
      n.keys.forEach(function(k,i){
        html+="<rect class='k"+(marks[k]&&(inPath[id]||isn[id]||bad[id])?" mk":"")+"' x='"+(x0+i*L.CW)+"' y='-14' width='"+L.CW+"' height='28' rx='3'/><text x='"+(x0+i*L.CW+L.CW/2)+"' y='1'>"+k+"</text>";
      });
      g.innerHTML=html;
    });
    Object.keys(nodeEls).forEach(function(id){if(!seen[id]){var g=nodeEls[id];delete nodeEls[id];g.style.opacity="0";setTimeout(function(){if(g.parentNode)g.parentNode.removeChild(g);},400);}});
    /* edges */
    var seenE={};
    L.edges.forEach(function(e){
      var a=L.pos[e.from],b=L.pos[e.to],k=e.to;seenE[k]=1;
      var x0=a.x+offX-a.w/2+L.PAD+e.i*L.CW,y0=a.y+14,x1=b.x+offX,y1=b.y-14;
      var d="M"+x0+","+y0+" C"+x0+","+(y0+22)+" "+x1+","+(y1-22)+" "+x1+","+y1;
      var pe=edgeEls[k];
      if(!pe){pe=s("path",{class:c("ed")});gE.appendChild(pe);edgeEls[k]=pe;}
      pe.setAttribute("d",d);pe.style.d="path('"+d+"')";
      var on=inPath[e.from]&&inPath[e.to]&&(hl.path||[]).indexOf(e.to)>=0;
      pe.setAttribute("class",c("ed")+(on?" "+c("hl"):""));
    });
    Object.keys(edgeEls).forEach(function(k){if(!seenE[k]){var pe=edgeEls[k];delete edgeEls[k];pe.parentNode&&pe.parentNode.removeChild(pe);}});
    /* leaf links */
    Object.keys(linkEls).forEach(function(k){var pe=linkEls[k];pe.parentNode&&pe.parentNode.removeChild(pe);});linkEls={};
    if(S.mode==="B+"){
      var lv=t.leaves();
      for(var i=0;i+1<lv.length;i++){
        var A=L.pos[lv[i].id],Bn=L.pos[lv[i+1].id];
        var xa=A.x+offX+A.w/2,xb=Bn.x+offX-Bn.w/2,y=A.y;
        var d2="M"+xa+","+y+" L"+(xb-1)+","+y;
        linkEls[i]=s("path",{class:c("lk"),d:d2,"marker-end":"url(#w-bp-arr)"});gL.appendChild(linkEls[i]);
      }
    }
    cap.textContent=fr.cap;
    var st=t.stats();
    stat.innerHTML="";
    [["Nodes",st.nodes],["Height (levels)",st.height],[S.mode==="B+"?"Data keys (leaf)":"Keys",st.keys],["Leaves",st.leaves]].forEach(function(a){stat.appendChild(h("span",{class:c("pill"),html:a[0]+": <b>"+a[1]+"</b>"}));});
  }
  selMode.addEventListener("change",function(){S.mode=selMode.value;convText();resetAll();});
  selP.addEventListener("change",function(){S.p=Number(selP.value);convText();resetAll();});
  root.appendChild(title);
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Type",selMode]),h("label",{class:c("lab")},["Order",selP])]));
  root.appendChild(conv);
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Insert sequence (space se alag)",inKeys]),btn("Insert karo",doInsert,"pri"),btn("1..20",seq),btn("Random 12",rnd)]));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Key",inDel]),btn("Delete",doDelete),btn("Search",doSearch),h("label",{class:c("lab")},["Range low",inLo]),h("label",{class:c("lab")},["high",inHi]),btn("Range query",doRange)]));
  root.appendChild(pl.el);
  root.appendChild(cap);
  root.appendChild(svgW);
  root.appendChild(stat);
  root.appendChild(h("div",{class:c("mut"),text:"Legend: neela border = abhi ye node/path active; laal = overflow/underflow; hara = naya node; orange key = abhi wali key; teal dashed arrow = leaf link (sirf B+). Try it: p=3 chuno aur 1..20 daalo – splits zyada dikhenge; phir delete karke borrow/merge dekho."}));
  convText();resetAll();
  el.appendChild(root);
});
if(typeof module!=="undefined"&&module.exports)module.exports={Tree:Tree,clone:clone,layout:layout};

})();
