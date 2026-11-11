import { register as registerWidget } from '../widgets-core.js';
var N="data-scaling", P="w-data-scaling-";
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
function stats(v){var n=v.length,mn=Math.min.apply(null,v),mx=Math.max.apply(null,v),sum=v.reduce(function(a,b){return a+b;},0),mean=sum/n;
  var ss=v.reduce(function(a,b){return a+(b-mean)*(b-mean);},0);
  return {n:n,min:mn,max:mx,sum:sum,mean:mean,ss:ss,popSd:Math.sqrt(ss/n),sampleSd:n>1?Math.sqrt(ss/(n-1)):0};}
function minmax(v,a,b){var st=stats(v),d=st.max-st.min;return v.map(function(x){return d===0?a:(x-st.min)/d*(b-a)+a;});}
function zscore(v,sample){var st=stats(v),sd=sample?st.sampleSd:st.popSd;return v.map(function(x){return sd===0?0:(x-st.mean)/sd;});}
function decimalJ(v){var m=Math.max.apply(null,v.map(Math.abs));var j=0;while(m/Math.pow(10,j)>=1)j++;return j;}
function decimal(v){var j=decimalJ(v);return {j:j,out:v.map(function(x){return x/Math.pow(10,j);})};}
function binning(v,k,type){
  var s=v.slice().sort(function(a,b){return a-b;}),bins=[],i;
  for(i=0;i<k;i++)bins.push([]);
  if(type==="freq"){var d=Math.ceil(s.length/k);s.forEach(function(x,idx){bins[Math.min(k-1,Math.floor(idx/d))].push(x);});}
  else{var mn=s[0],mx=s[s.length-1],w=(mx-mn)/k;s.forEach(function(x){var b=w===0?0:Math.min(k-1,Math.floor((x-mn)/w));bins[b].push(x);});}
  return bins;
}
function widthInfo(v,k){var s=v.slice().sort(function(a,b){return a-b;}),mn=s[0],mx=s[s.length-1],w=(mx-mn)/k;return {min:mn,max:mx,w:w};}
function smoothMeans(bins){return bins.map(function(b){if(!b.length)return [];var m=b.reduce(function(x,y){return x+y;},0)/b.length;return b.map(function(){return m;});});}
function smoothBounds(bins){return bins.map(function(b){if(!b.length)return [];var lo=b[0],hi=b[b.length-1];return b.map(function(x){return (x-lo)<=(hi-x)?lo:hi;});});}
function parseNums(t){return String(t).split(/[\s,;]+/).filter(Boolean).map(Number).filter(function(x){return isFinite(x);});}
function r4(x){return Math.round(x*10000)/10000;}
var CSS=
".ROOT .$dot{transition:none}"+
".ROOT .$ax{stroke:var(--ink,#1b2438);stroke-width:1.5}"+
".ROOT .$tk{stroke:var(--mut,#5b6580);stroke-width:1}"+
".ROOT .$tl{fill:var(--mut,#5b6580);font:11px system-ui;text-anchor:middle}"+
".ROOT .$vl{font:600 11px ui-monospace,Menlo,monospace;text-anchor:middle}"+
".ROOT .$lnk{stroke:var(--line,#d7deee);stroke-width:1.2;stroke-dasharray:3 3}"+
".ROOT .$tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}"+
".ROOT .$bins{display:flex;flex-wrap:wrap;gap:10px;margin:8px 0}"+
".ROOT .$bin{flex:1 1 120px;min-width:110px;border:2px solid var(--line,#d7deee);border-radius:10px;background:var(--bg,#fff);padding:6px}"+
".ROOT .$bin h4{margin:0 0 4px;font-size:12.5px;color:var(--mut,#5b6580)}"+
".ROOT .$chip{display:inline-block;min-width:34px;text-align:center;padding:2px 6px;margin:2px;border-radius:6px;background:var(--card,#f6f8ff);border:1px solid var(--line,#d7deee);font:600 13px ui-monospace,Menlo,monospace;transition:background .4s,color .4s,transform .4s}"+
".ROOT .$chip.$ch{background:var(--org,#e8730c);color:#fff;border-color:var(--org,#e8730c);transform:scale(1.08)}"+
".ROOT .$in3{width:min(420px,86vw)}"+
".ROOT .$in2{width:80px}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={vals:[200,300,400,600,1000],method:"minmax",sample:false,nmin:0,nmax:1,tween:null};
  var root=h("div",{class:c("root")});
  var inV=h("input",{class:c("in in3"),type:"text",value:"200, 300, 400, 600, 1000","aria-label":"Numbers list"});
  var tabs=h("div",{class:c("tabs")});
  var opt=h("div",{class:c("row")}),fm=h("div",{class:c("cap")}),svgW=h("div",{class:c("svgw")}),tbl=h("div",{class:c("tw")});
  var M=[["minmax","Min-Max"],["z","Z-score"],["dec","Decimal scaling"]];
  M.forEach(function(m){tabs.appendChild(h("button",{class:c("b"),type:"button","data-m":m[0],text:m[1],onclick:function(){S.method=m[0];sync();}}));});
  var bA=h("input",{class:c("in in2"),type:"number",value:0,"aria-label":"new min"}),bB=h("input",{class:c("in in2"),type:"number",value:1,"aria-label":"new max"});
  var sd=h("select",{class:c("in"),"aria-label":"Std dev type"},[h("option",{value:"0",text:"Population std (÷n)"}),h("option",{value:"1",text:"Sample std (÷(n−1))"})]);
  var run=h("button",{class:c("b pri"),type:"button",text:"▶ Animate: before → after",onclick:function(){animate();}});
  function compute(){
    var v=S.vals,st=stats(v),out,f="";
    if(S.method==="minmax"){out=minmax(v,S.nmin,S.nmax);
      f="Min-Max: v' = (v − min)/(max − min) × (new_max − new_min) + new_min.  Yahan min = "+st.min+", max = "+st.max+". Pehli value "+v[0]+" → ("+v[0]+" − "+st.min+")/("+st.max+" − "+st.min+") × ("+S.nmax+" − "+S.nmin+") + "+S.nmin+" = <b>"+r4(out[0])+"</b>. Min hamesha new_min, max hamesha new_max ban jata hai; shape same rehta hai.";}
    else if(S.method==="z"){out=zscore(v,S.sample);var sdv=S.sample?st.sampleSd:st.popSd;
      f="Z-score: z = (v − mean)/std. mean = "+r4(st.mean)+", "+(S.sample?"sample":"population")+" std = "+(S.sample?"√(Σ(v−mean)²/(n−1))":"√(Σ(v−mean)²/n)")+" = √("+r4(st.ss)+"/"+(S.sample?st.n-1:st.n)+") = "+r4(sdv)+". Pehli value: ("+v[0]+" − "+r4(st.mean)+")/"+r4(sdv)+" = <b>"+r4(out[0])+"</b>. Naye data ka mean = 0 aur std = 1. (Z-score 'kitne std door' batata hai; outliers me min-max se behtar.)";}
    else{var d=decimal(v);out=d.out;f="Decimal scaling: v' = v / 10<sup>j</sup>, j = sabse chhota integer jisse max|v'| < 1. Max|v| = "+Math.max.apply(null,v.map(Math.abs))+" → j = <b>"+d.j+"</b> (10<sup>"+d.j+"</sup> = "+Math.pow(10,d.j)+"). Pehli value "+v[0]+" → <b>"+r4(out[0])+"</b>.";}
    return {out:out,f:f,st:st};
  }
  var cur=null;
  function sync(){
    var nums=parseNums(inV.value);
    if(nums.length<2){fm.innerHTML="<span class='"+c("warn")+"'>Kam se kam 2 numbers daalo (comma ya space se alag).</span>";return;}
    S.vals=nums;S.sample=sd.value==="1";S.nmin=pn(bA.value,0);S.nmax=pn(bB.value,1);
    [].forEach.call(tabs.children,function(b){b.className=c("b")+(b.getAttribute("data-m")===S.method?" "+c("on"):"");});
    opt.innerHTML="";
    if(S.method==="minmax"){opt.appendChild(h("label",{class:c("lab")},["new_min",bA]));opt.appendChild(h("label",{class:c("lab")},["new_max",bB]));}
    if(S.method==="z")opt.appendChild(h("label",{class:c("lab")},["Std type",sd]));
    opt.appendChild(run);
    cur=compute();fm.innerHTML=cur.f;
    drawLine(0);table();bins();
  }
  function table(){
    var h1="<table class='"+c("t")+"'><tr><th>Original</th>"+S.vals.map(function(x){return "<td>"+x+"</td>";}).join("")+"</tr><tr><th>Scaled</th>"+cur.out.map(function(x){return "<td><b>"+r4(x)+"</b></td>";}).join("")+"</tr></table>"+
    "<div class='"+c("mut")+"'>n = "+cur.st.n+", min = "+cur.st.min+", max = "+cur.st.max+", mean = "+r4(cur.st.mean)+", pop std = "+r4(cur.st.popSd)+", sample std = "+r4(cur.st.sampleSd)+"</div>";
    tbl.innerHTML=h1;
  }
  function axisFor(vals,x0,x1){var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals),pad=(mx-mn)*0.08||1;mn-=pad;mx+=pad;return {mn:mn,mx:mx,px:function(v){return x0+(v-mn)/(mx-mn)*(x1-x0);}};}
  function drawLine(t){
    var W=640,H=190,x0=34,x1=W-34,A=axisFor(S.vals,x0,x1),Bx=axisFor(cur.out.concat(S.method==="z"?[0]:[]),x0,x1);
    var svg=s("svg",{width:W,height:H,viewBox:"0 0 "+W+" "+H,role:"img","aria-label":"Number line before and after"});
    function axis(y,ax,vals,lab){
      svg.appendChild(s("line",{x1:x0,x2:x1,y1:y,y2:y,class:c("ax")}));
      svg.appendChild(s("text",{x:x0,y:y-26-14,class:c("tl"),style:"font-weight:700;text-anchor:start"},[lab]));
      var ticks=vals.slice().sort(function(a,b){return a-b;});
      ticks.forEach(function(v){svg.appendChild(s("line",{x1:ax.px(v),x2:ax.px(v),y1:y-4,y2:y+4,class:c("tk")}));});
    }
    axis(60,A,S.vals,"Pehle (original)");axis(140,Bx,cur.out,"Baad me (scaled)");
    if(S.method==="z"||S.method==="minmax"){var z=Bx.px(0);if(S.method==="z"){svg.appendChild(s("line",{x1:z,x2:z,y1:128,y2:152,class:c("tk"),style:"stroke:var(--red,#d63b4f)"}));svg.appendChild(s("text",{x:z,y:166,class:c("tl"),style:"fill:var(--red,#d63b4f)"},["0 (mean)"]));}}
    var cols=["#2f5bd8","#14a06b","#e8730c","#7048e8","#0e9aa7","#d63b4f"];
    S.vals.forEach(function(v,i){
      var xa=A.px(v),xb0=xa,xb1=Bx.px(cur.out[i]),xb=xb0+(xb1-xb0)*t,col=cols[i%cols.length];
      svg.appendChild(s("line",{x1:xa,y1:60,x2:xb,y2:140,class:c("lnk")}));
      svg.appendChild(s("circle",{cx:xa,cy:60,r:6,fill:col}));
      svg.appendChild(s("text",{x:xa,y:(i%2?44:30)+0,class:c("vl"),fill:col},[String(v)]));
      svg.appendChild(s("circle",{cx:xb,cy:140,r:6,fill:col}));
      svg.appendChild(s("text",{x:xb,y:(i%2?160:174),class:c("vl"),fill:col},[r4(cur.out[i])+""]));
    });
    svgW.innerHTML="";svgW.appendChild(svg);
  }
  function animate(){
    if(S.tween)cancelAnimationFrame(S.tween);
    var t0=null;function step(ts){if(t0==null)t0=ts;var t=Math.min(1,(ts-t0)/1300);var e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;drawLine(e);if(t<1)S.tween=requestAnimationFrame(step);}
    drawLine(0);S.tween=requestAnimationFrame(step);
  }
  /* binning */
  var bk=h("input",{class:c("in in2"),type:"number",min:"1",max:"8",value:3,"aria-label":"Bins"});
  var btype=h("select",{class:c("in"),"aria-label":"Binning type"},[h("option",{value:"freq",text:"Equal-frequency (depth)"}),h("option",{value:"width",text:"Equal-width"})]);
  var bsm=h("select",{class:c("in"),"aria-label":"Smoothing"},[h("option",{value:"mean",text:"Smoothing by bin means"}),h("option",{value:"bound",text:"Smoothing by bin boundaries"})]);
  var bdata=h("input",{class:c("in in3"),type:"text",value:"4, 8, 15, 21, 21, 24, 25, 28, 34","aria-label":"Binning data"});
  var bbox=h("div",{class:c("bins")}),bcap=h("div",{class:c("cap"),"aria-live":"polite"});
  var bpl=Player(function(i){drawBins(i);},function(){return 3;},{ms:1500});
  var B={};
  function bins(){
    var v=parseNums(bdata.value),k=Math.max(1,Math.min(8,Math.floor(pn(bk.value,3))));
    if(v.length<2){bbox.innerHTML="";bcap.textContent="Binning ke liye kam se kam 2 numbers.";return;}
    B.v=v.slice().sort(function(a,b){return a-b;});B.k=k;B.bins=binning(v,k,btype.value);B.type=btype.value;
    B.sm=bsm.value==="mean"?smoothMeans(B.bins):smoothBounds(B.bins);B.info=widthInfo(v,k);
    bpl.stop();bpl.go(0,true);drawBins(0);
  }
  function drawBins(i){
    if(!B.bins)return;
    bbox.innerHTML="";
    B.bins.forEach(function(b,j){
      if(i===0){}
      var title="Bin "+(j+1);
      if(i>=1){title+=B.type==="width"?(" ["+r4(B.info.min+j*B.info.w)+" – "+r4(B.info.min+(j+1)*B.info.w)+(j===B.k-1?"]":")")):(" ("+b.length+" values)");}
      var box=h("div",{class:c("bin"),style:i===0?"border-style:dashed":""},[h("h4",{text:i===0?"Sorted data":title})]);
      var src=i===0?null:b;
      if(i===0){if(j===0)B.v.forEach(function(x){box.appendChild(h("span",{class:c("chip"),text:x}));});else return;}
      else b.forEach(function(x,q){var sm=B.sm[j][q];var changed=i===2;box.appendChild(h("span",{class:c("chip")+(changed&&sm!==x?" "+c("ch"):""),text:r4(changed?sm:x),title:changed?("pehle "+x):""}));});
      bbox.appendChild(box);
    });
    var bn=B.type==="freq"?("Equal-frequency: depth = ⌈n/k⌉ = ⌈"+B.v.length+"/"+B.k+"⌉ = "+Math.ceil(B.v.length/B.k)+" values har bin me."):("Equal-width: width w = (max − min)/k = ("+B.info.max+" − "+B.info.min+")/"+B.k+" = "+r4(B.info.w)+"; har bin ki range same, par values ki ginti alag ho sakti hai.");
    var smt=bsm.value==="mean"?"Smoothing by means: bin ki har value = us bin ka mean.":"Smoothing by boundaries: bin ki har value apne paas wale boundary (bin ka min ya max) se replace; barabar doori ho to chhota boundary.";
    bcap.innerHTML=[ "Pehle data ko <b>sort</b> karo. Phir bins banao.","<b>Bins ban gaye.</b> "+bn,"<b>Smoothing:</b> "+smt+" Orange = value badli."][i];
  }
  [bk,btype,bsm,bdata].forEach(function(x){x.addEventListener("input",bins);x.addEventListener("change",bins);});
  [inV,bA,bB,sd].forEach(function(x){x.addEventListener("input",sync);x.addEventListener("change",sync);});
  root.appendChild(h("div",{class:c("title"),text:"Data scaling (normalization)"}));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Numbers (comma / space)",inV])]));
  root.appendChild(tabs);root.appendChild(opt);root.appendChild(fm);root.appendChild(svgW);root.appendChild(tbl);
  root.appendChild(h("div",{class:c("title"),text:"Binning aur smoothing",style:"margin-top:14px"}));
  root.appendChild(h("div",{class:c("row")},[h("label",{class:c("lab")},["Data",bdata]),h("label",{class:c("lab")},["k bins",bk]),h("label",{class:c("lab")},["Type",btype]),h("label",{class:c("lab")},["Smoothing",bsm])]));
  root.appendChild(bpl.el);root.appendChild(bcap);root.appendChild(bbox);
  el.appendChild(root);sync();bins();
});
export { stats, minmax, zscore, decimal, binning, smoothMeans, smoothBounds };
