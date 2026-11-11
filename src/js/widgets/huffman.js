import { register as registerWidget } from '../widgets-core.js';
var N="huffman", P="w-huffman-";
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
/* ===== core ===== */
function huffman(syms){
  var nid=0,queue=syms.map(function(x){return {id:nid++,sym:x.s,f:x.f,l:null,r:null};}),steps=[];
  function sortQ(q){q.sort(function(a,b){return a.f-b.f||a.id-b.id;});}
  sortQ(queue);var init=queue.slice();
  while(queue.length>1){
    var before=queue.slice(),a=queue.shift(),b=queue.shift();
    var n={id:nid++,sym:null,f:a.f+b.f,l:a,r:b};
    queue.push(n);sortQ(queue);
    steps.push({a:a,b:b,node:n,before:before,after:queue.slice()});
  }
  var root=queue[0],codes={};
  (function w(n,p){if(!n.l){codes[n.sym]=p||"0";return;}w(n.l,p+"0");w(n.r,p+"1");})(root,"");
  return {root:root,steps:steps,codes:codes,init:init};
}
function huffMetrics(syms,codes){
  var tot=syms.reduce(function(a,x){return a+x.f;},0),bits=0,H=0;
  syms.forEach(function(x){bits+=x.f*codes[x.s].length;var p=x.f/tot;H-=p*Math.log2(p);});
  var fixedLen=Math.max(1,Math.ceil(Math.log2(syms.length)));
  return {total:tot,bits:bits,avg:bits/tot,fixedLen:fixedLen,fixedBits:fixedLen*tot,entropy:H};
}
function parseSyms(t){
  var out=[],seen={};
  String(t).split(/[,;\n]+/).forEach(function(tok){tok=tok.trim();if(!tok)return;
    var m=tok.match(/^(\S+?)\s*[:=\s]\s*([0-9.]+)$/);if(!m)return;
    var f=Number(m[2]);if(!(f>0)||seen[m[1]])return;seen[m[1]]=1;out.push({s:m[1],f:f});});
  return out;
}
var CSS=
".ROOT .$q{display:flex;flex-wrap:wrap;gap:6px;align-items:center;min-height:38px;margin:6px 0}"+
".ROOT .$qc{border:2px solid var(--line,#d7deee);border-radius:99px;padding:2px 10px;background:var(--bg,#fff);font:600 13px ui-monospace,Menlo,monospace;transition:all .35s}"+
".ROOT .$qc.$pick{border-color:var(--org,#e8730c);background:rgba(232,115,12,.15);transform:scale(1.08)}"+
".ROOT .$qc.$nw{border-color:var(--green,#14a06b);background:rgba(20,160,107,.15)}"+
".ROOT .$nd{transition:transform .6s cubic-bezier(.4,.1,.2,1),opacity .4s}"+
".ROOT .$nd circle{fill:var(--bg,#fff);stroke:var(--blue,#2f5bd8);stroke-width:2;transition:fill .3s,stroke .3s}"+
".ROOT .$nd.$leaf circle{stroke:var(--green,#14a06b)}"+
".ROOT .$nd.$pick circle{stroke:var(--org,#e8730c);stroke-width:3.5;fill:rgba(232,115,12,.15)}"+
".ROOT .$nd.$nw circle{stroke:var(--green,#14a06b);stroke-width:3.5;fill:rgba(20,160,107,.15)}"+
".ROOT .$nd.$path circle{stroke:var(--pur,#7048e8);stroke-width:3.5;fill:rgba(112,72,232,.15)}"+
".ROOT .$nd text{fill:var(--ink,#1b2438);font:700 12px system-ui;text-anchor:middle}"+
".ROOT .$nd text.s{font:800 13px ui-monospace,Menlo,monospace;fill:var(--green,#14a06b)}"+
".ROOT .$ed{stroke:var(--mut,#5b6580);stroke-width:1.6;fill:none;transition:d .6s,stroke .3s}"+
".ROOT .$ed.$path{stroke:var(--pur,#7048e8);stroke-width:3.2}"+
".ROOT .$el{fill:var(--red,#d63b4f);font:800 12px ui-monospace,Menlo,monospace;text-anchor:middle;transition:transform .6s}"+
".ROOT tr.$clk{cursor:pointer}.ROOT tr.$clk:hover td{background:var(--card,#f6f8ff)}"+
".ROOT .$in3{width:min(440px,86vw)}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={syms:[],H:null,frames:[],cur:0,hl:null};
  var root=h("div",{class:c("root")});
  var inp=h("input",{class:c("in in3"),type:"text",value:"a:45, b:13, c:12, d:16, e:9, f:5","aria-label":"Symbols and frequencies"});
  var cap=h("div",{class:c("cap"),"aria-live":"polite"}),qbox=h("div",{class:c("q")}),svgW=h("div",{class:c("svgw")}),tbl=h("div",{class:c("tw")}),met=h("div",{});
  var svg=s("svg",{role:"img","aria-label":"Huffman tree forest"}),gE=s("g"),gN=s("g");svg.appendChild(gE);svg.appendChild(gN);svgW.appendChild(svg);
  var pl=Player(function(i){S.cur=i;S.hl=null;render();},function(){return S.frames.length;},{end:true,ms:1400});
  function build(){
    var syms=parseSyms(inp.value);
    if(syms.length<2||syms.length>12){cap.innerHTML="<span class='"+c("warn")+"'>2 se 12 symbols daalo, format  a:45, b:13  (frequency > 0, symbol unique).</span>";return;}
    S.syms=syms;S.H=huffman(syms);S.M=huffMetrics(syms,S.H.codes);
    var H=S.H;S.frames=[{q:H.init,note:"Shuru: har symbol ek akela node (tree) hai, frequency ke hisaab se priority queue me sorted. Rule: hamesha 2 sabse chhoti frequency wale nodes milao.",pick:[],nw:[]}];
    H.steps.forEach(function(st,i){
      S.frames.push({q:st.before,note:"Step "+(i+1)+": sabse chhote do nodes chuno: "+lab(st.a)+" aur "+lab(st.b)+" (tie ho to pehle bana node pehle).",pick:[st.a.id,st.b.id],nw:[]});
      S.frames.push({q:st.after,note:"Step "+(i+1)+": inko milake naya parent banaya, frequency = "+st.a.f+" + "+st.b.f+" = "+st.node.f+" (left edge 0 = chhota, right edge 1). Parent wapas queue me sahi jagah gaya.",pick:[],nw:[st.node.id]});
    });
    S.frames.push({q:H.steps[H.steps.length-1].after,note:"Tree complete! Root se har symbol tak edges ke 0/1 padho = uska Huffman code. Table ki row par click karo to path highlight hoga. Frequent symbol ka code chhota, rare ka lamba.",pick:[],nw:[],final:true});
    pl.stop();S.cur=0;pl.go(0,true);render();
  }
  function lab(n){return n.sym!==null?(n.sym+":"+n.f):("("+n.f+")");}
  function leaves(n){return n.l?leaves(n.l)+leaves(n.r):1;}
  var nodeEls={},edgeEls={},lblEls={};
  function pathIds(sym){var out=[],code=S.H.codes[sym],n=S.H.root;out.push(n.id);for(var i=0;i<code.length;i++){n=code[i]==="0"?n.l:n.r;if(!n)break;out.push(n.id);}return out;}
  function render(){
    var fr=S.frames[S.cur];if(!fr)return;
    var XW=58,YH=70,x=20,pos={},edges=[],maxD=0;
    fr.q.forEach(function(r){
      var lc=leaves(r),w=lc*XW,x0=x;
      (function pl2(n,left,d){
        var wd=leaves(n)*XW;
        if(!n.l){pos[n.id]={x:left+wd/2,y:34+d*YH,n:n};}
        else{var lw=leaves(n.l)*XW;pl2(n.l,left,d+1);pl2(n.r,left+lw,d+1);pos[n.id]={x:(pos[n.l.id].x+pos[n.r.id].x)/2,y:34+d*YH,n:n};edges.push({p:n,c:n.l,b:"0"});edges.push({p:n,c:n.r,b:"1"});}
        if(d>maxD)maxD=d;
      })(r,x0,0);
      x+=w+14;
    });
    var W=Math.max(x+10,320),H=34+(maxD)*YH+50;
    svg.setAttribute("width",W);svg.setAttribute("height",H);svg.setAttribute("viewBox","0 0 "+W+" "+H);
    var hp={};if(S.hl&&fr.final)pathIds(S.hl).forEach(function(i){hp[i]=1;});
    var pk={},nw={};fr.pick.forEach(function(i){pk[i]=1;});fr.nw.forEach(function(i){nw[i]=1;});
    var seen={};
    Object.keys(pos).forEach(function(id){
      var q=pos[id],n=q.n;seen[id]=1;var g=nodeEls[id];
      if(!g){g=s("g",{class:c("nd")});g.style.opacity="0";gN.appendChild(g);nodeEls[id]=g;g.style.transform="translate("+q.x+"px,"+q.y+"px)";setTimeout(function(){g.style.opacity="1";},20);
        g.innerHTML="<circle r='20'/>"+(n.l?"<text y='5'>"+n.f+"</text>":"<text class='s' y='-2' style='text-anchor:middle'>"+esc(n.sym)+"</text><text y='13'>"+n.f+"</text>");}
      g.setAttribute("class",c("nd")+(n.l?"":" "+c("leaf"))+(hp[id]?" "+c("path"):(pk[id]?" "+c("pick"):(nw[id]?" "+c("nw"):""))));
      g.style.transform="translate("+q.x+"px,"+q.y+"px)";
    });
    Object.keys(nodeEls).forEach(function(id){if(!seen[id]){var g=nodeEls[id];delete nodeEls[id];g.parentNode&&g.parentNode.removeChild(g);}});
    var seenE={};
    edges.forEach(function(e){
      var a=pos[e.p.id],b=pos[e.c.id],k=e.c.id;seenE[k]=1;
      var d="M"+a.x+","+(a.y+20)+" L"+b.x+","+(b.y-20);
      var pe=edgeEls[k],lb=lblEls[k];
      if(!pe){pe=s("path",{class:c("ed")});gE.appendChild(pe);edgeEls[k]=pe;lb=s("text",{class:c("el")},[e.b]);gE.appendChild(lb);lblEls[k]=lb;}
      pe.setAttribute("d",d);pe.style.d="path('"+d+"')";
      pe.setAttribute("class",c("ed")+(hp[e.c.id]?" "+c("path"):""));
      lb.setAttribute("x",(a.x+b.x)/2+(e.b==="0"?-9:9));lb.setAttribute("y",(a.y+b.y)/2+4);
    });
    Object.keys(edgeEls).forEach(function(k){if(!seenE[k]){edgeEls[k].parentNode&&edgeEls[k].parentNode.removeChild(edgeEls[k]);lblEls[k].parentNode&&lblEls[k].parentNode.removeChild(lblEls[k]);delete edgeEls[k];delete lblEls[k];}});
    qbox.innerHTML="";qbox.appendChild(h("span",{class:c("mut"),text:"Priority queue (chhota pehle):"}));
    fr.q.forEach(function(n){qbox.appendChild(h("span",{class:c("qc")+(pk[n.id]?" "+c("pick"):(nw[n.id]?" "+c("nw"):"")),text:lab(n)}));});
    cap.textContent=fr.note;
    table(fr.final);
  }
  function table(final){
    var M=S.M,codes=S.H.codes;
    var rows=S.syms.map(function(x){var cd=final?codes[x.s]:"—";return "<tr class='"+c("clk")+"' data-s='"+esc(x.s)+"'><td><b>"+esc(x.s)+"</b></td><td>"+x.f+"</td><td class='"+c("mono")+"'>"+cd+"</td><td>"+(final?cd.length:"—")+"</td><td>"+(final?x.f*cd.length:"—")+"</td></tr>";}).join("");
    tbl.innerHTML="<table class='"+c("t")+"'><tr><th>Symbol</th><th>Freq f</th><th>Code</th><th>Length</th><th>f × len</th></tr>"+rows+"</table>";
    [].forEach.call(tbl.querySelectorAll("tr[data-s]"),function(tr){tr.addEventListener("click",function(){if(!S.frames[S.cur].final){return;}S.hl=tr.getAttribute("data-s");render();});});
    if(!final){met.innerHTML="<div class='"+c("mut")+"'>Codes aur totals tree complete hone par dikhenge (End dabao).</div>";return;}
    var sv=100*(1-M.bits/M.fixedBits);
    met.innerHTML="<div class='"+c("pill")+"'>Total bits (Huffman) = Σ f×len = <b>"+M.bits+"</b></div>"+
      "<div class='"+c("pill")+"'>Average length = "+M.bits+"/"+M.total+" = <b>"+M.avg.toFixed(3)+"</b> bits/symbol</div>"+
      "<div class='"+c("pill")+"'>Fixed-length = ⌈log₂ "+S.syms.length+"⌉ = <b>"+M.fixedLen+"</b> bits → total "+M.fixedBits+" bits</div>"+
      "<div class='"+c("pill")+"'>Bachat = <b>"+sv.toFixed(1)+"%</b></div>"+
      "<div class='"+c("pill")+"'>Entropy H = −Σ p log₂ p = <b>"+M.entropy.toFixed(3)+"</b> bits</div>"+
      "<div class='"+c("mut")+"'>H ≤ avg length < H+1 : "+M.entropy.toFixed(3)+" ≤ "+M.avg.toFixed(3)+" < "+(M.entropy+1).toFixed(3)+" "+((M.entropy<=M.avg+1e-9&&M.avg<M.entropy+1)?"✓":"?")+". Huffman code prefix-free hota hai (koi code kisi dusre ka shuruaati hissa nahi) → decode me confusion nahi.</div>";
  }
  inp.addEventListener("change",build);
  root.appendChild(h("div",{class:c("title"),text:"Huffman coding: tree banate dekho"}));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Symbol:frequency (comma se alag)",inp]),h("button",{class:c("b pri"),type:"button",text:"Build",onclick:build})]));
  root.appendChild(h("div",{class:c("row")},[h("span",{class:c("mut"),text:"Presets:"})].concat([["CLRS (a-f)","a:45, b:13, c:12, d:16, e:9, f:5"],["Equal 4","a:5, b:5, c:5, d:5"],["Skewed","a:50, b:25, c:12, d:8, e:5"]].map(function(p){return h("button",{class:c("b"),type:"button",text:p[0],onclick:function(){inp.value=p[1];build();}});}))));
  root.appendChild(pl.el);root.appendChild(cap);root.appendChild(qbox);root.appendChild(svgW);root.appendChild(tbl);root.appendChild(met);
  el.appendChild(root);build();
});
export { huffman, huffMetrics, parseSyms };
