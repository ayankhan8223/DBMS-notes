(function(){
"use strict";
var N="star-schema", P="w-star-schema-";
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
/* ===== data ===== */
var T={
 Sales:{type:"fact",desc:"FACT table: business ke events/numbers (measures) yahan store hote hain: kitne units bike, kitne dollars. Bahut badi (crore rows), foreign keys se har dimension se judi hoti hai.",
  cols:[["time_key","fk"],["item_key","fk"],["branch_key","fk"],["location_key","fk"],["units_sold","m"],["dollars_sold","m"]],
  rows:[[1,10,1,100,3,450],[2,12,2,101,1,900],[3,11,3,102,2,300]]},
 Shipping:{type:"fact",desc:"Doosri FACT table (shipping process). Fact constellation me ek se zyada fact tables hoti hain jo Time, Item, Location jaisi dimensions share karti hain.",
  cols:[["time_key","fk"],["item_key","fk"],["shipper_key","fk"],["from_location","fk"],["to_location","fk"],["dollars_cost","m"],["units_shipped","m"]],
  rows:[[1,10,5,100,102,40,3],[3,12,5,101,100,25,1],[3,11,5,102,101,30,2]]},
 Time:{type:"dim",desc:"DIMENSION: 'kab' ka context. Chhoti table, descriptive attributes (day, month, quarter, year) = ek concept hierarchy: day < month < quarter < year.",
  cols:[["time_key","pk"],["day",""],["month",""],["quarter",""],["year",""]],rows:[[1,5,"May","Q2",2024],[2,6,"May","Q2",2024],[3,7,"Jul","Q3",2024]]},
 Branch:{type:"dim",desc:"DIMENSION: kis branch/shop par sale hui.",cols:[["branch_key","pk"],["branch_name",""],["branch_type",""]],rows:[[1,"Connaught Pl","Flagship"],[2,"Andheri","Mall"],[3,"Koramangala","Mall"]]},
 ItemStar:{name:"Item",type:"dim",desc:"DIMENSION: kya becha. Star schema me denormalized: supplier_type yahin repeat hota hai (redundancy), par join kam.",
  cols:[["item_key","pk"],["item_name",""],["brand",""],["type",""],["supplier_type",""]],rows:[[10,"Galaxy M","Samsung","Mobile","Wholesale"],[11,"Galaxy S","Samsung","Mobile","Wholesale"],[12,"Inspiron","Dell","Laptop","Retail"]]},
 ItemSnow:{name:"Item",type:"dim",desc:"DIMENSION (normalized): supplier ki details alag Supplier table me gayi; yahan sirf supplier_key (FK). Redundancy kam, par join badha.",
  cols:[["item_key","pk"],["item_name",""],["brand",""],["type",""],["supplier_key","fk"]],rows:[[10,"Galaxy M","Samsung","Mobile",1],[11,"Galaxy S","Samsung","Mobile",1],[12,"Inspiron","Dell","Laptop",2]]},
 Supplier:{type:"dim",desc:"Snowflake me Item ki sub-dimension (normalized table). Fact se seedha nahi, Item ke through judti hai.",cols:[["supplier_key","pk"],["supplier_type",""]],rows:[[1,"Wholesale"],[2,"Retail"]]},
 LocStar:{name:"Location",type:"dim",desc:"DIMENSION: kahan. Star me city, state, country sab ek table me → 'Pune, MH, India' baar-baar repeat (redundancy), lekin ek hi join.",
  cols:[["location_key","pk"],["street",""],["city",""],["state",""],["country",""]],rows:[[100,"MG Road","Pune","MH","India"],[101,"FC Road","Pune","MH","India"],[102,"Park St","Kolkata","WB","India"]]},
 LocSnow:{name:"Location",type:"dim",desc:"DIMENSION (normalized): city ki details City table me; yahan city_key (FK).",cols:[["location_key","pk"],["street",""],["city_key","fk"]],rows:[[100,"MG Road",7],[101,"FC Road",7],[102,"Park St",8]]},
 City:{type:"dim",desc:"Snowflake me Location ki sub-dimension. Pune/MH/India ab sirf ek baar store hota hai.",cols:[["city_key","pk"],["city",""],["state",""],["country",""]],rows:[[7,"Pune","MH","India"],[8,"Kolkata","WB","India"]]},
 Shipper:{type:"dim",desc:"DIMENSION sirf Shipping fact ke liye (constellation me sab dimensions shared nahi hoti).",cols:[["shipper_key","pk"],["shipper_name",""],["location_key","fk"],["shipper_type",""]],rows:[[5,"BlueDart",100,"Courier"],[6,"IndiaPost",102,"Postal"]]}
};
var SCHEMAS={
 star:{name:"Star schema",tables:{Sales:[300,180],Time:[20,20],ItemStar:[580,20],Branch:[20,350],LocStar:[580,350]},
  edges:[["Sales","Time"],["Sales","ItemStar"],["Sales","Branch"],["Sales","LocStar"]],
  note:"<b>Star:</b> beech me ek fact, charo taraf denormalized dimensions (tara jaisa). Fayda: simple queries, kam joins, fast. Nuksan: dimension me redundancy (jaise city/country repeat), space zyada.",
  joins:2,tables_q:["Sales","Time","LocStar"],
  sql:"SELECT t.year, l.country, SUM(s.dollars_sold)\nFROM Sales s\nJOIN Time t ON s.time_key = t.time_key\nJOIN Location l ON s.location_key = l.location_key\nGROUP BY t.year, l.country;"},
 snow:{name:"Snowflake schema",tables:{Sales:[300,180],Time:[20,20],ItemSnow:[300,10],Supplier:[580,20],Branch:[20,350],LocSnow:[300,390],City:[580,350]},
  edges:[["Sales","Time"],["Sales","ItemSnow"],["ItemSnow","Supplier"],["Sales","Branch"],["Sales","LocSnow"],["LocSnow","City"]],
  note:"<b>Snowflake:</b> dimensions normalized hoke sub-tables me toot gayi (barf ke crystal jaisa). Fayda: redundancy/space kam. Nuksan: zyada joins → queries complex aur slow; browsing hierarchy mushkil.",
  joins:3,tables_q:["Sales","Time","LocSnow","City"],
  sql:"SELECT t.year, c.country, SUM(s.dollars_sold)\nFROM Sales s\nJOIN Time t ON s.time_key = t.time_key\nJOIN Location l ON s.location_key = l.location_key\nJOIN City c ON l.city_key = c.city_key   -- extra join!\nGROUP BY t.year, c.country;"},
 const:{name:"Fact constellation (galaxy)",tables:{Sales:[20,185],Shipping:[580,185],Time:[300,10],ItemStar:[300,170],LocStar:[300,345],Branch:[20,370],Shipper:[580,370]},
  edges:[["Sales","Time"],["Sales","ItemStar"],["Sales","LocStar"],["Sales","Branch"],["Shipping","Time"],["Shipping","ItemStar"],["Shipping","LocStar"],["Shipping","Shipper"]],
  note:"<b>Fact constellation:</b> ek se zyada fact tables (Sales, Shipping) jo kuch dimensions (Time, Item, Location) share karti hain. Enterprise data warehouse me common (kai business processes). Do facts ko jodna = drill-across.",
  joins:3,tables_q:["Sales","Shipping","Time","ItemStar"],
  sql:"-- drill-across: Sales aur Shipping dono facts ko shared dimensions par milao\nSELECT t.year, i.brand, SUM(s.dollars_sold), SUM(sh.dollars_cost)\nFROM Sales s\nJOIN Time t ON s.time_key = t.time_key\nJOIN Item i ON s.item_key = i.item_key\nJOIN Shipping sh ON sh.time_key = s.time_key AND sh.item_key = s.item_key\nGROUP BY t.year, i.brand;"}
};
function schemaTables(k){return Object.keys(SCHEMAS[k].tables);}
function tableName(id){return T[id].name||id;}
function boxH(id){return 22+T[id].cols.length*15+6;}
var CSS=
".ROOT .$tb{transition:transform .65s cubic-bezier(.4,.1,.2,1),opacity .45s;cursor:pointer}"+
".ROOT .$tb rect.bg{fill:var(--bg,#fff);stroke-width:2;transition:stroke .3s,fill .3s}"+
".ROOT .$tb.fact rect.bg{stroke:var(--org,#e8730c)}.ROOT .$tb.dim rect.bg{stroke:var(--teal,#0e9aa7)}"+
".ROOT .$tb rect.hd{transition:fill .3s}.ROOT .$tb.fact rect.hd{fill:var(--org,#e8730c)}.ROOT .$tb.dim rect.hd{fill:var(--teal,#0e9aa7)}"+
".ROOT .$tb.$sel rect.bg{stroke:var(--blue,#2f5bd8);stroke-width:4}"+
".ROOT .$tb.$pulse rect.bg{fill:rgba(47,91,216,.14);stroke:var(--blue,#2f5bd8);stroke-width:3.5}"+
".ROOT .$tb.$gone{opacity:0;pointer-events:none}"+
".ROOT .$tb text{font:12px ui-monospace,Menlo,monospace;fill:var(--ink,#1b2438)}"+
".ROOT .$tb text.nm{font:700 13px system-ui;fill:#fff}"+
".ROOT .$tb text.pk{font-weight:800}.ROOT .$tb text.m{fill:var(--org,#e8730c);font-weight:700}.ROOT .$tb text.fk{fill:var(--pur,#7048e8)}"+
".ROOT .$ln{stroke:var(--mut,#5b6580);stroke-width:2;transition:opacity .4s,stroke .3s}"+
".ROOT .$ln.$pulse{stroke:var(--blue,#2f5bd8);stroke-width:4}"+
".ROOT pre.$sql{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:8px;padding:8px 10px;font:12px/1.5 ui-monospace,Menlo,monospace;overflow-x:auto;margin:6px 0;white-space:pre}"+
".ROOT .$tabs{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}"+
".ROOT .$panel{background:var(--bg,#fff);border:1px solid var(--line,#d7deee);border-radius:10px;padding:8px 12px;margin:8px 0}";
reg(function(el,opts){
  injectCSS(CSS);
  var S={sch:"star",sel:null,pulse:{},q:false};
  var root=h("div",{class:c("root")});
  var tabs=h("div",{class:c("tabs")});
  Object.keys(SCHEMAS).forEach(function(k){tabs.appendChild(h("button",{class:c("b"),type:"button","data-k":k,text:SCHEMAS[k].name,onclick:function(){S.sch=k;S.sel=null;S.pulse={};S.q=false;update(true);}}));});
  var note=h("div",{class:c("cap")}),svgW=h("div",{class:c("svgw")}),panel=h("div",{class:c("panel")}),qbox=h("div",{});
  var W=760,Hh=500,svg=s("svg",{width:W,height:Hh,viewBox:"0 0 "+W+" "+Hh,role:"img","aria-label":"Schema diagram"});
  var gL=s("g"),gT=s("g");svg.appendChild(gL);svg.appendChild(gT);svgW.appendChild(svg);
  var els={};
  Object.keys(T).forEach(function(id){
    var t=T[id],g=s("g",{class:c("tb")+" "+t.type+" "+c("gone"),tabindex:"0",role:"button","aria-label":"Table "+tableName(id)});
    var hh=boxH(id),html="<rect class='bg' width='150' height='"+hh+"' rx='6'/><path class='hd' d='M0,6 a6,6 0 0 1 6,-6 h138 a6,6 0 0 1 6,6 v16 h-150 z' style='fill:inherit'/><rect class='hd' width='150' height='22' rx='6'/><rect class='hd' y='12' width='150' height='10'/>";
    html+="<text class='nm' x='8' y='15'>"+esc(tableName(id).toUpperCase())+(t.type==="fact"?"  (FACT)":"")+"</text>";
    t.cols.forEach(function(cc,i){html+="<text class='"+cc[1]+"' x='8' y='"+(36+i*15)+"'>"+(cc[1]==="pk"?"🔑 ":cc[1]==="fk"?"→ ":cc[1]==="m"?"Σ ":"   ")+esc(cc[0])+"</text>";});
    g.innerHTML=html;g.firstChild.nextSibling.remove();
    g.addEventListener("click",function(){S.sel=id;update(false);});
    g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();S.sel=id;update(false);}});
    gT.appendChild(g);els[id]=g;
    g.style.transform="translate(300px,180px)";
  });
  var lineEls=[];
  function update(moved){
    var sc=SCHEMAS[S.sch];
    [].forEach.call(tabs.children,function(b){b.className=c("b")+(b.getAttribute("data-k")===S.sch?" "+c("on"):"");});
    Object.keys(els).forEach(function(id){
      var g=els[id],p=sc.tables[id];
      if(p){g.style.transform="translate("+p[0]+"px,"+p[1]+"px)";}
      g.setAttribute("class",c("tb")+" "+T[id].type+(p?"":" "+c("gone"))+(S.sel===id?" "+c("sel"):"")+(S.pulse[id]?" "+c("pulse"):""));
    });
    var draw=function(){
      gL.innerHTML="";lineEls=[];
      sc.edges.forEach(function(e){
        var a=sc.tables[e[0]],b=sc.tables[e[1]];if(!a||!b)return;
        var ax=a[0]+75,ay=a[1]+boxH(e[0])/2,bx=b[0]+75,by=b[1]+boxH(e[1])/2;
        var ln=s("line",{x1:ax,y1:ay,x2:bx,y2:by,class:c("ln")+((S.pulse[e[0]]&&S.pulse[e[1]])?" "+c("pulse"):"")});gL.appendChild(ln);
      });
    };
    if(moved){gL.innerHTML="";setTimeout(draw,680);}else draw();
    note.innerHTML=sc.note;
    info();query();
  }
  function info(){
    var id=S.sel;
    if(!id){panel.innerHTML="<span class='"+c("mut")+"'>Kisi bhi table par click karo: pata chalega wo FACT hai ya DIMENSION, uske columns (🔑 = primary key, → = foreign key, Σ = measure) aur sample rows.</span>";return;}
    var t=T[id];
    var h1="<b>"+esc(tableName(id))+"</b> <span class='"+c("pill")+"' style='border-color:"+(t.type==="fact"?"var(--org,#e8730c)":"var(--teal,#0e9aa7)")+"'>"+(t.type==="fact"?"FACT table":"DIMENSION table")+"</span><div>"+t.desc+"</div>";
    h1+="<div class='"+c("tw")+"'><table class='"+c("t")+"'><tr>"+t.cols.map(function(cc){return "<th>"+esc(cc[0])+"<br><small>"+({pk:"PK",fk:"FK",m:"measure","":"attribute"}[cc[1]])+"</small></th>";}).join("")+"</tr>"+
      t.rows.map(function(r){return "<tr>"+r.map(function(v){return "<td>"+esc(v)+"</td>";}).join("")+"</tr>";}).join("")+"</table></div>";
    panel.innerHTML=h1;
  }
  function query(){
    var sc=SCHEMAS[S.sch];
    qbox.innerHTML="";
    qbox.appendChild(h("div",{class:c("title"),text:"Sample query: "+(S.sch==="const"?"drill-across (2 facts)":"year-wise, country-wise sales")}));
    qbox.appendChild(h("pre",{class:c("sql"),text:sc.sql}));
    qbox.appendChild(h("div",{class:c("row")},[h("button",{class:c("b pri"),type:"button",text:"▶ Query chalao (kaun si tables judti hain?)",onclick:runQ}),h("span",{class:c("pill"),html:"Joins = <b>"+sc.joins+"</b>"+(S.sch==="snow"?" (star me 2 the)":"")})]));
  }
  function runQ(){
    var sc=SCHEMAS[S.sch],qs=sc.tables_q,i=0;S.pulse={};update(false);
    (function nxt(){if(i>=qs.length)return;S.pulse[qs[i]]=1;i++;update(false);setTimeout(nxt,650);})();
  }
  root.appendChild(h("div",{class:c("title"),text:"Star / Snowflake / Fact constellation — click karke explore karo"}));
  root.appendChild(tabs);root.appendChild(note);root.appendChild(svgW);
  root.appendChild(h("div",{class:c("mut"),text:"Orange header = FACT, teal header = DIMENSION. Schema toggle karo: boxes naye position par slide honge."}));
  root.appendChild(panel);root.appendChild(qbox);
  el.appendChild(root);
  /* initial placement without animation */
  update(false);
});
if(typeof module!=="undefined"&&module.exports)module.exports={SCHEMAS:SCHEMAS,T:T};

})();
