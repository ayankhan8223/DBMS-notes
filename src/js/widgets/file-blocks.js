import { register as registerWidget } from '../widgets-core.js';
var N="file-blocks", P="w-file-blocks-";
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
function fileCalc(B,R,r,spanned){
  var o={B:B,R:R,r:r,spanned:!!spanned,ok:true};
  if(!(B>0&&R>0&&r>=0)){o.ok=false;o.msg="Sab inputs positive hone chahiye.";return o;}
  if(spanned){
    o.bfrExact=B/R;o.bfr=B/R;o.blocks=Math.ceil(r*R/B);o.wastePerBlock=0;o.totalWaste=o.blocks*B-r*R;
  }else{
    if(R>B){o.ok=false;o.msg="Record size block size se bada hai → unspanned me record block me fit hi nahi hota (bfr = 0). Spanned chuno.";return o;}
    o.bfr=Math.floor(B/R);o.blocks=Math.ceil(r/o.bfr);o.wastePerBlock=B-o.bfr*R;
    o.totalWaste=o.blocks*B-r*R;
  }
  o.heapAvg=o.blocks/2;o.heapWorst=o.blocks;
  o.binary=o.blocks<=1?1:Math.ceil(Math.log2(o.blocks));
  o.hash=1;
  return o;
}
var CSS=
".ROOT .$blk{fill:var(--bg,#fff);stroke:var(--ink,#1b2438);stroke-width:1.2}"+
".ROOT .$rec{stroke:var(--bg,#fff);stroke-width:1}"+
".ROOT .$rec.$n{animation:wfb-pop .35s ease-out}"+
"@keyframes wfb-pop{from{opacity:0;transform:scale(.3)}to{opacity:1;transform:scale(1)}}"+
".ROOT .$waste{fill:var(--red,#d63b4f);opacity:.28}"+
".ROOT .$wl{fill:var(--red,#d63b4f);font:600 10px system-ui}"+
".ROOT .$lb{fill:var(--mut,#5b6580);font:11px system-ui}"+
".ROOT .$bar{height:16px;border-radius:5px;transition:width .5s;min-width:3px}"+
".ROOT .$cost{display:grid;grid-template-columns:150px 1fr;gap:4px 8px;align-items:center;font-size:13px}"+
".ROOT .$fm{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:8px;padding:8px 10px;font-size:13px;line-height:1.7}"+
".ROOT .$in2{width:110px}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={B:1024,R:150,r:1000,sp:false,shown:0,max:8};
  var root=h("div",{class:c("root")});
  function num(v){return h("input",{class:c("in in2"),type:"number",min:"1",value:v,"aria-label":"number input"});}
  var iB=num(S.B),iR=num(S.R),iN=num(S.r);
  var sSp=h("select",{class:c("in"),"aria-label":"Spanned ya unspanned"},[h("option",{value:"0",text:"Unspanned (record block todta nahi)"}),h("option",{value:"1",text:"Spanned (record 2 blocks me bat sakta hai)"})]);
  var cap=h("div",{class:c("cap"),"aria-live":"polite"});
  var svgW=h("div",{class:c("svgw")});
  var fm=h("div",{class:c("fm")}),cost=h("div",{});
  var pl=Player(function(i){S.shown=i;draw();},function(){return S.total+1;},{end:true,ms:140});
  S.total=0;
  var COL=["#2f5bd8","#14a06b","#e8730c","#7048e8","#0e9aa7","#d63b4f"];
  function read(){S.B=pn(iB.value,0);S.R=pn(iR.value,0);S.r=Math.floor(pn(iN.value,0));S.sp=sSp.value==="1";}
  function recalc(){
    read();var f=fileCalc(S.B,S.R,S.r,S.sp);S.f=f;
    if(!f.ok){S.total=0;fm.innerHTML="<span class='"+c("warn")+"'>"+esc(f.msg)+"</span>";svgW.innerHTML="";cost.innerHTML="";cap.textContent=f.msg;return;}
    var nb=Math.min(f.blocks,S.max);
    S.total=S.sp?Math.min(S.r,Math.ceil(nb*S.B/S.R)):Math.min(S.r,nb*f.bfr);
    pl.go(S.total,true);S.shown=S.total;
    formulas();draw();costs();
    cap.textContent="Play dabao: records ek ek karke blocks me bharte dikhenge. Lal hissa = waste (bekaar) jagah.";
    pl.go(0);
  }
  function formulas(){
    var f=S.f,t="";
    if(!S.sp){
      t+="<b>bfr</b> (blocking factor) = ⌊ B / R ⌋ = ⌊ "+f.B+" / "+f.R+" ⌋ = ⌊ "+(f.B/f.R).toFixed(2)+" ⌋ = <b>"+f.bfr+"</b> records/block<br>";
      t+="<b>Blocks b</b> = ⌈ r / bfr ⌉ = ⌈ "+f.r+" / "+f.bfr+" ⌉ = ⌈ "+(f.r/f.bfr).toFixed(2)+" ⌉ = <b>"+f.blocks+"</b><br>";
      t+="Har block me waste = B − bfr×R = "+f.B+" − "+f.bfr+"×"+f.R+" = <b style='color:var(--red,#d63b4f)'>"+f.wastePerBlock+" bytes</b>"+
        " (kul waste = "+f.totalWaste+" bytes, "+(f.blocks*f.B?(100*f.totalWaste/(f.blocks*f.B)).toFixed(1):0)+"%)";
    }else{
      t+="<b>bfr</b> = B / R = "+f.B+" / "+f.R+" = <b>"+(f.B/f.R).toFixed(2)+"</b> (fractional ho sakta hai, kyunki record split hota hai)<br>";
      t+="<b>Blocks b</b> = ⌈ (r × R) / B ⌉ = ⌈ "+f.r+"×"+f.R+" / "+f.B+" ⌉ = ⌈ "+(f.r*f.R/f.B).toFixed(2)+" ⌉ = <b>"+f.blocks+"</b><br>";
      t+="Waste sirf aakhri block me = "+f.totalWaste+" bytes (spanned me beech me waste nahi, par record padhne ke liye 2 blocks lag sakte hain).";
    }
    fm.innerHTML=t;
  }
  function draw(){
    var f=S.f;if(!f||!f.ok)return;
    var nb=Math.min(f.blocks,S.max),W=620,bw=560,sc=bw/f.B,rh=26,gap=16,y0=8;
    var more=f.blocks>nb;
    var H=y0+nb*(rh+gap)+(more?26:6);
    var svg=s("svg",{width:W,height:H,viewBox:"0 0 "+W+" "+H,role:"img","aria-label":"Blocks aur records ka diagram"});
    var n=S.shown;
    for(var j=0;j<nb;j++){
      var y=y0+j*(rh+gap),x0=40;
      svg.appendChild(s("text",{x:2,y:y+rh/2+4,class:c("lb")},["B"+(j+1)]));
      svg.appendChild(s("rect",{x:x0,y:y,width:bw,height:rh,class:c("blk"),rx:3}));
      if(!S.sp){
        var first=j*f.bfr,cnt=0;
        for(var q=0;q<f.bfr;q++){var idx=first+q;if(idx>=Math.min(S.r,n))break;cnt++;
          svg.appendChild(s("rect",{x:x0+q*S.R*sc+0.5,y:y+1,width:Math.max(1,S.R*sc-1),height:rh-2,fill:COL[idx%COL.length],class:c("rec")+(idx===n-1?" "+c("n"):""),rx:2,style:"transform-box:fill-box;transform-origin:center"}));}
        var filled=Math.min(f.bfr,Math.max(0,Math.min(S.r,n)-first));
        var isFull=(first+f.bfr<=Math.min(S.r,n));
        var lastBlk=(j===f.blocks-1);
        var usedAll=Math.min(f.bfr,S.r-first);
        if(f.wastePerBlock>0&&filled>=usedAll&&usedAll===f.bfr){
          svg.appendChild(s("rect",{x:x0+f.bfr*S.R*sc,y:y,width:f.wastePerBlock*sc,height:rh,class:c("waste")}));
          if(f.wastePerBlock*sc>28)svg.appendChild(s("text",{x:x0+f.bfr*S.R*sc+f.wastePerBlock*sc/2,y:y+rh/2+3,"text-anchor":"middle",class:c("wl")},["waste "+f.wastePerBlock]));
        }
        if(lastBlk&&usedAll<f.bfr&&filled>=usedAll){
          svg.appendChild(s("rect",{x:x0+usedAll*S.R*sc,y:y,width:(f.B-usedAll*S.R)*sc,height:rh,class:c("waste")}));
          svg.appendChild(s("text",{x:x0+usedAll*S.R*sc+(f.B-usedAll*S.R)*sc/2,y:y+rh/2+3,"text-anchor":"middle",class:c("wl")},["khali / waste"]));
        }
      }else{
        var lo=j*f.B,hi=lo+f.B,r0=Math.floor(lo/S.R),r1=Math.ceil(hi/S.R);
        for(var idx2=r0;idx2<r1;idx2++){
          if(idx2>=Math.min(S.r,n))break;
          var a=Math.max(lo,idx2*S.R),b2=Math.min(hi,(idx2+1)*S.R);
          svg.appendChild(s("rect",{x:x0+(a-lo)*sc+0.3,y:y+1,width:Math.max(1,(b2-a)*sc-0.6),height:rh-2,fill:COL[idx2%COL.length],class:c("rec")+(idx2===n-1?" "+c("n"):""),rx:2,style:"transform-box:fill-box;transform-origin:center"}));
          if(b2-a<S.R-1e-9)svg.appendChild(s("text",{x:x0+((a+b2)/2-lo)*sc,y:y+rh/2+4,"text-anchor":"middle",fill:"#fff",style:"font:700 11px system-ui"},[a>idx2*S.R+1e-9?"←":"→"]));
        }
        var tot=S.r*S.R;
        if(j===f.blocks-1&&tot<hi&&n>=S.r){svg.appendChild(s("rect",{x:x0+(tot-lo)*sc,y:y,width:(hi-tot)*sc,height:rh,class:c("waste")}));
          svg.appendChild(s("text",{x:x0+(tot-lo+(hi-tot)/2)*sc,y:y+rh/2+3,"text-anchor":"middle",class:c("wl")},["waste"]));}
      }
    }
    if(more)svg.appendChild(s("text",{x:40,y:H-8,class:c("lb")},["… aur "+(f.blocks-nb)+" blocks (total b = "+f.blocks+"); sirf pehle "+nb+" dikhaye"]));
    svgW.innerHTML="";svgW.appendChild(svg);
    if(n>0){var upto=Math.min(n,S.r);cap.textContent=S.sp?("Record #"+upto+" rakha. Spanned me record block ke end par kat ke agle block me continue hota hai (→ / ← nishan)."):("Record #"+upto+" rakha → block B"+(Math.floor((upto-1)/f.bfr)+1)+" me, slot "+(((upto-1)%f.bfr)+1)+"/"+f.bfr+". Slots bhar jaye to agla block."+(n>=S.total?" Sab dikh gaya: lal hissa = har block ka waste.":""));}
  }
  function costs(){
    var f=S.f,m=Math.log(f.blocks+1);
    function row(label,val,txt,col){var wpc=Math.max(2,100*Math.log(val+1)/Math.max(m,0.01));
      return "<div>"+label+"</div><div style='display:flex;align-items:center;gap:6px'><div class='"+c("bar")+"' style='width:"+Math.min(100,wpc)*0.7+"%;background:"+col+"'></div><b>"+txt+"</b></div>";}
    cost.innerHTML="<div class='"+c("cost")+"'>"+
      row("Heap (unordered) linear",f.heapWorst,"avg b/2 = "+f.heapAvg.toFixed(1)+", worst b = "+f.heapWorst,"var(--red,#d63b4f)")+
      row("Sorted + binary search",f.binary,"⌈log₂ b⌉ = ⌈log₂ "+f.blocks+"⌉ = "+f.binary,"var(--org,#e8730c)")+
      row("Hash (ideal, no overflow)",1,"≈ 1 block","var(--green,#14a06b)")+
      "</div><div class='"+c("mut")+"'>(Bars log scale me hain.) Note: sorted file me binary search tabhi chalta hai jab search usi field par ho jis par file sorted hai. Range query me sorted file achhi, hash buri.</div>";
  }
  [iB,iR,iN,sSp].forEach(function(x){x.addEventListener("input",recalc);x.addEventListener("change",recalc);});
  root.appendChild(h("div",{class:c("title"),text:"File blocks: blocking factor, blocks aur search cost"}));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Block size B (bytes)",iB]),h("label",{class:c("lab")},["Record size R (bytes)",iR]),h("label",{class:c("lab")},["Records r",iN]),h("label",{class:c("lab")},["Organization",sSp])]));
  root.appendChild(h("div",{class:c("row")},[h("span",{class:c("mut"),text:"Presets:"})].concat([["1024/150/1000",1024,150,1000],["4096/100/30000",4096,100,30000],["512/200/50",512,200,50]].map(function(p){return h("button",{class:c("b"),type:"button",text:p[0],onclick:function(){iB.value=p[1];iR.value=p[2];iN.value=p[3];recalc();}});}))));
  root.appendChild(fm);root.appendChild(pl.el);root.appendChild(cap);root.appendChild(svgW);
  root.appendChild(h("div",{class:c("title"),text:"Search cost (block accesses)",style:"margin-top:10px"}));root.appendChild(cost);
  el.appendChild(root);recalc();
});
export { fileCalc };
