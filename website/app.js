"use strict";
// The page: building strip, release-date chart, inspector, table, dialogs and share link,
// all driven from one selection state. Data comes from window.BB_DATA (built from the
// Enactra bench/building board) and every 3D canvas is a GLBViewer over the submission
// that scored the number beside it.
const $=(q,root=document)=>root.querySelector(q);
const $$=(q,root=document)=>[...root.querySelectorAll(q)];
const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const escapeHTML=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const usd=v=>v==null?'—':new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(v);
const formatScore=v=>v==null?'—':v.toFixed(3);
const formatMinutes=v=>v==null?'—':(v<10?v.toFixed(1):Math.round(v))+' min';
const dateValue=v=>new Date(v+'T00:00:00Z').getTime();
const formatMonth=v=>v?new Intl.DateTimeFormat('en-US',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(v+'T00:00:00Z')):'—';
const formatDay=v=>v?new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(v+'T00:00:00Z')):'—';
const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DATA=window.BB_DATA;
const {buildings,models,results,families:familyConfig}=DATA;
const FAMILY_ORDER=DATA.familyOrder;
const FEATURED={buildingId:DATA.featured.buildingId,modelId:DATA.featured.modelId};
// Single selection state drives the building strip, plot, inspector, table and share link.
const state={buildingId:FEATURED.buildingId,family:models.find(m=>m.id===FEATURED.modelId).family,modelId:FEATURED.modelId,scope:'case',search:''};
const chartCamera={rotationY:-.7,rotationX:.37,zoom:.96,paused:reducedMotion()};
const modelById=id=>models.find(m=>m.id===id);
const buildingById=id=>buildings.find(b=>b.id===id);
const resultFor=(mid,bid=state.buildingId)=>results.find(r=>r.modelId===mid&&r.buildingId===bid);
const currentModel=()=>modelById(state.modelId);
const currentBuilding=()=>buildingById(state.buildingId);
// In "This building" the effort is the run's; in "Board overall" it is the variant the board row stands for.
const effortOf=(m,r=resultFor(m.id))=>state.scope==='case'&&r?r.effort:state.scope==='clean'&&m.clean?(m.clean.label.match(/\((\w+)\)/)||[])[1]||'none':m.effort;
const effortLabelOf=(m,r=resultFor(m.id))=>{const e=effortOf(m,r);return {none:'default effort',high:'high effort',max:'max effort',low:'low effort',ultra:'ultra effort'}[e]||e;};
const scopeName=()=>state.scope==='case'?'Case score':state.scope==='clean'?'License-clean board':'Board overall';
function valueFor(m,kind='score'){
  if(state.scope==='clean'){
    // The license-clean board's own figures: every model over the same 12 CC BY 4.0 cases.
    if(!m.clean)return null;
    return kind==='cost'?m.clean.cost:kind==='minutes'?m.clean.minutes:m.clean.overall;
  }
  if(state.scope==='mean'){
    // The all-results board's figures for this row: a mean over the buildings that model has run.
    return kind==='cost'?m.board.cost:kind==='minutes'?m.board.minutes:m.board.overall;
  }
  const r=resultFor(m.id);if(!r)return null;
  return kind==='cost'?r.costUSD:kind==='minutes'?r.minutes:r.score;
}
function visibleModels(){return models.filter(m=>(state.family==='All'||m.family===state.family)&&valueFor(m)!=null&&m.date).sort((a,b)=>dateValue(a.date)-dateValue(b.date)||a.name.localeCompare(b.name));}
// "Previous" for a model is the release before it in its own family.
function previousModel(m=currentModel()){
  return models.filter(n=>n.family===m.family&&n.id!==m.id&&n.date&&dateValue(n.date)<=dateValue(m.date)).sort((a,b)=>dateValue(b.date)-dateValue(a.date))[0]
    ||models.filter(n=>n.family===m.family&&n.id!==m.id)[0];
}
function setSelection(patch,{announce=true,writeHash=true}={}){
  Object.assign(state,patch);
  const visible=visibleModels();
  if(!visible.some(m=>m.id===state.modelId)&&visible.length)state.modelId=visible.slice().sort((a,b)=>valueFor(b)-valueFor(a))[0].id;
  renderCaseStrip();renderFamilies();renderChart();renderInspector();renderResults();syncControls();
  if(writeHash)storeHash();
  if(announce)$('#liveStatus').textContent=`${currentBuilding().name}, ${currentModel().name}. ${scopeName()} ${formatScore(valueFor(currentModel()))}.`;
  document.dispatchEvent(new CustomEvent('buildingbench:selectionchange',{detail:{...state}}));
}
function stateHash(){const p=new URLSearchParams({b:state.buildingId,f:state.family,m:state.modelId,s:state.scope});return '#'+p.toString();}
function storeHash(){try{history.replaceState(null,'',location.pathname+location.search+stateHash());}catch{/* Some embedded browsers restrict history access. */}}
function readHash(){
  const p=new URLSearchParams(location.hash.slice(1));if(!p.has('b'))return false;
  if(buildingById(p.get('b')))state.buildingId=p.get('b');
  if(familyConfig[p.get('f')])state.family=p.get('f');
  if(modelById(p.get('m')))state.modelId=p.get('m');
  if(['case','clean'].includes(p.get('s')))state.scope=p.get('s');
  return true;
}
function syncControls(){
  $('#scoreScope').value=state.scope;
  $('#motionLabel').textContent=chartCamera.paused?'Resume rotation':'Pause rotation';
  $('#motionGlyph').textContent=chartCamera.paused?'▷':'Ⅱ';
  $('#toggleMotion').setAttribute('aria-pressed',String(chartCamera.paused));
}

function renderCaseStrip(){
  const root=$('#caseStrip'),scroll=root.scrollLeft;
  const query=state.search.trim().toLowerCase();
  const list=buildings.filter(b=>(b.name+' '+b.short).toLowerCase().includes(query));
  $('#caseCount').textContent=query?`${list.length} of ${buildings.length} buildings`:'';
  root.replaceChildren();
  if(!list.length){root.innerHTML='<span class="case-empty">No matching buildings. Try another name.</span>';return;}
  const groups={shared:`Shared set · ${buildings.filter(b=>b.group==='shared').length}`,clean:`License-clean set · ${buildings.filter(b=>b.group==='clean').length}`};
  let last=null;
  list.forEach(b=>{
    if(b.group!==last&&new Set(buildings.map(x=>x.group)).size>1){const g=document.createElement('span');g.className='case-group';g.textContent=groups[b.group]||b.group;root.append(g);last=b.group;}
    const el=document.createElement('button');el.type='button';el.className='case-card';el.dataset.building=b.id;el.title=`${b.name} · ${b.submissions} submissions on the board`;
    el.setAttribute('aria-pressed',String(b.id===state.buildingId));el.setAttribute('aria-label',`Show ${b.name} results`);
    el.innerHTML=`<img src="${escapeHTML(b.image)}" alt=""><span class="case-name">${escapeHTML(b.shortName||b.name)}</span>`;
    el.addEventListener('click',()=>setSelection({buildingId:b.id}));root.append(el);
  });root.scrollLeft=scroll;
}
function renderFamilies(){
  const root=$('#familyFilters');root.replaceChildren();
  [...FAMILY_ORDER,'All'].forEach(f=>{
    const b=document.createElement('button');b.type='button';b.className='family-filter';b.dataset.family=f;b.style.setProperty('--family-color',familyConfig[f].color);
    b.setAttribute('aria-pressed',String(f===state.family));b.setAttribute('aria-label',f==='All'?'Show all model families':`Show ${familyConfig[f].label} models`);
    b.innerHTML=`${f!=='All'?'<i aria-hidden="true"></i>':''}${escapeHTML(f==='All'?'All':familyConfig[f].label)}`;
    b.addEventListener('click',()=>setSelection({family:f}));root.append(b);
  });
}

// Every canvas shows the submission that earned the score beside it.
const outputHandles=new Map();
function unmountCanvas(canvas){const h=outputHandles.get(canvas);if(h){h.destroy?.();outputHandles.delete(canvas);}activeViewers.forEach(v=>{if(v.canvas===canvas)v.destroy();});}
function unmountWithin(root){[...outputHandles.keys()].forEach(c=>{if(root.contains(c))unmountCanvas(c);});destroyViewersWithin(root);}
function mountOutput(canvas,b,m,options={}){
  unmountCanvas(canvas);const r=resultFor(m.id,b.id);
  if(!r){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);return null;}
  const viewer=new GLBViewer(canvas,{assetKey:r.assetKey,speed:.13,...options});
  viewer.paused=reducedMotion();outputHandles.set(canvas,viewer);return viewer;
}

const SVG_NS='http://www.w3.org/2000/svg';
function svgEl(name,attrs={},text){const e=document.createElementNS(SVG_NS,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;return e;}
const DAY=86400000;
let chartGeometry=null;
// Big outputs cannot all sit exactly on their points, so each is laid out near its point and,
// when it had to move, tethered to the true point by a thin line. The family curve and its
// arrows run through the true points.
function layoutNodes(items,bounds){
  const nodes=items.map(p=>({...p,x:p.ax,y:p.ay}));
  for(let it=0;it<400;it++){
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j];let dx=b.x-a.x,dy=b.y-a.y;let d=Math.hypot(dx,dy);
      const min=a.r+b.r+14;
      if(d>=min)continue;
      if(d<1e-3){dx=(i%2?1:-1)*0.5;dy=0.3;d=Math.hypot(dx,dy);}
      const push=(min-d)/2,ux=dx/d,uy=dy/d;
      a.x-=ux*push;a.y-=uy*push*.85;b.x+=ux*push;b.y+=uy*push*.85;
    }
    nodes.forEach(n=>{n.x+=(n.ax-n.x)*.04;n.y+=(n.ay-n.y)*.04;n.x=clamp(n.x,bounds.x0+n.r,bounds.x1-n.r);n.y=clamp(n.y,bounds.y0+n.r,bounds.y1-n.r);});
  }
  return nodes;
}
function renderChart(){
  const chart=$('#chart'),svg=$('#chartSvg'),nodesRoot=$('#chartNodes'),all=state.family==='All';
  const list=visibleModels();
  unmountWithin(nodesRoot);nodesRoot.replaceChildren();svg.replaceChildren();$('#chartTooltip').classList.remove('visible');
  chart.style.minWidth=all?'1180px':(innerWidth<=650?'0px':'700px');
  const w=chart.clientWidth,h=chart.clientHeight,p={left:innerWidth<=650?40:64,right:innerWidth<=650?24:56,top:40,bottom:96};
  const pw=w-p.left-p.right,ph=h-p.top-p.bottom;
  const size=parseFloat(getComputedStyle(chart).getPropertyValue('--node-size'))||(all?100:124);
  // Axes fitted to what is on the plot: release dates with a fortnight of air, scores with a
  // minimum span of 0.4 so small gaps are not exaggerated.
  // Family members with no run on this building are marked at their release date, so a
  // missing model reads as "not run here" rather than as an omission.
  // Only while one family is on screen: with every family shown the marker is noise, and its
  // release date drags the axis back into empty space — Gemini 3.1 Pro has run 1 of the 12
  // buildings, so on the other 11 it was a ghost three months left of every real point.
  const absent=state.scope==='case'&&state.family!=='All'?models.filter(m=>m.family===state.family&&m.date&&!resultFor(m.id)):[];
  const ds=list.concat(absent).map(m=>dateValue(m.date)),ys=list.map(m=>valueFor(m));
  if(!ds.length){ds.push(dateValue(DATA.snapshot));ys.push(.5);}
  let dmin=Math.min(...ds)-16*DAY,dmax=Math.max(...ds)+16*DAY;
  if(dmax-dmin<90*DAY){const mid=(dmin+dmax)/2;dmin=mid-45*DAY;dmax=mid+45*DAY;}
  let ymin=Math.max(0,Math.floor((Math.min(...ys)-.06)*20)/20),ymax=Math.min(1,Math.ceil((Math.max(...ys)+.06)*20)/20);
  while(ymax-ymin<.4){if(ymin>0)ymin=Math.max(0,ymin-.05);if(ymax<1&&ymax-ymin<.4)ymax=Math.min(1,ymax+.05);if(ymin===0&&ymax===1)break;}
  const y=score=>p.top+(1-(score-ymin)/(ymax-ymin))*ph;
  const x=m=>p.left+(dateValue(m.date)-dmin)/(dmax-dmin)*pw;
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
  const ystep=ymax-ymin<=.5?.1:.25;
  for(let t=Math.ceil(ymin/ystep-1e-9)*ystep;t<=ymax+1e-9;t+=ystep){
    svg.append(svgEl('line',{x1:p.left,y1:y(t),x2:w-p.right,y2:y(t),stroke:Math.abs(t-ymin)<1e-9?'#cfdcce':'#e8eee4','stroke-width':1}));
    svg.append(svgEl('text',{x:p.left-13,y:y(t)+3,'text-anchor':'end','font-size':11,fill:'#94a08b','font-family':'Arial, sans-serif'},t.toFixed(2)));
  }
  svg.append(svgEl('text',{x:p.left,y:17,'font-size':11,fill:'#87977c','font-family':'Arial, sans-serif'},state.scope==='mean'?'Overall · all-results board, each model’s own buildings ↑':state.scope==='clean'?'Overall · license-clean board, 12 buildings ↑':'Overall · this building ↑'));
  // Month ticks, the year named at each January and at the first tick.
  const first=new Date(dmin);first.setUTCDate(1);first.setUTCHours(0,0,0,0);
  let seenYear=null;
  for(let d=new Date(first);d.getTime()<=dmax;d.setUTCMonth(d.getUTCMonth()+1)){
    const tms=d.getTime();if(tms<dmin)continue;
    const tx=p.left+(tms-dmin)/(dmax-dmin)*pw,yr=d.getUTCFullYear(),jan=d.getUTCMonth()===0;
    svg.append(svgEl('line',{x1:tx,x2:tx,y1:p.top,y2:y(ymin),stroke:jan?'#dfe7dc':'#eef2ea','stroke-width':1}));
    svg.append(svgEl('text',{x:tx,y:y(ymin)+22,'text-anchor':'middle','font-size':11,fill:'#839777','font-family':'Arial, sans-serif'},d.toLocaleString('en-US',{month:'short',timeZone:'UTC'})));
    if(yr!==seenYear){svg.append(svgEl('text',{x:tx,y:y(ymin)+40,'text-anchor':'middle','font-size':12,'font-weight':600,fill:'#6c8460','font-family':'Arial, sans-serif'},String(yr)));seenYear=yr;}
  }
  svg.append(svgEl('text',{x:p.left+pw/2,y:h-14,'text-anchor':'middle','font-size':11,fill:'#8b9c7e','font-family':'Arial, sans-serif'},'Model release date →'));
  const anchors=list.map(m=>({m,ax:x(m),ay:y(valueFor(m)),score:valueFor(m),r:size/2}));
  const nodes=layoutNodes(anchors,{x0:p.left-size*.35,x1:w-p.right+size*.35,y0:p.top+4,y1:p.top+ph-6});
  const moved=n=>Math.hypot(n.x-n.ax,n.y-n.ay)>6;
  // The family curve through the true points, arrowed from release to release.
  const defs=svgEl('defs');svg.append(defs);
  Object.entries(familyConfig).forEach(([f,cfg])=>{const mk=svgEl('marker',{id:'arrow-'+f,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:8,markerHeight:8,orient:'auto-start-reverse',markerUnits:'userSpaceOnUse'});mk.append(svgEl('path',{d:'M0 0.5 L10 5 L0 9.5 z',fill:cfg.color}));defs.append(mk);});
  const edgeR=n=>moved(n)?7:n.r+4;
  [...new Set(nodes.map(n=>n.m.family))].forEach(f=>{
    const pts=nodes.filter(n=>n.m.family===f);   // already in release order
    for(let i=1;i<pts.length;i++){
      const a=pts[i-1],b=pts[i];const dx=b.ax-a.ax,dy=b.ay-a.ay,len=Math.hypot(dx,dy);if(len<1)continue;
      const ux=dx/len,uy=dy/len;let ra=edgeR(a),rb=edgeR(b);
      if(len<ra+rb+10){ra=0;rb=Math.min(rb,Math.max(2,len-10));}
      svg.append(svgEl('line',{'data-from':a.m.id,'data-to':b.m.id,x1:(a.ax+ux*ra).toFixed(1),y1:(a.ay+uy*ra).toFixed(1),x2:(b.ax-ux*rb).toFixed(1),y2:(b.ay-uy*rb).toFixed(1),stroke:familyConfig[f].color,'stroke-width':all?1.5:2,opacity:all?.55:.75,'marker-end':`url(#arrow-${f})`}));
    }
  });
  // Tethers and true points for the outputs that had to move aside.
  nodes.forEach(n=>{
    if(!moved(n))return;
    const c=familyConfig[n.m.family].color,dx=n.x-n.ax,dy=n.y-n.ay,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len;
    svg.append(svgEl('line',{class:'tether',x1:(n.ax+ux*7).toFixed(1),y1:(n.ay+uy*7).toFixed(1),x2:(n.x-ux*(n.r+1)).toFixed(1),y2:(n.y-uy*(n.r+1)).toFixed(1),stroke:c,'stroke-width':1.2,opacity:.5,'stroke-dasharray':'3 3'}));
    svg.append(svgEl('circle',{class:'anchor',cx:n.ax.toFixed(1),cy:n.ay.toFixed(1),r:5.5,fill:c,stroke:'#fff','stroke-width':1.5}));
  });
  absent.forEach(m=>{
    const c=familyConfig[m.family].color,ax=x(m),ay=p.top+18;
    const g=svgEl('g',{class:'absent','aria-label':`${m.name} has not run ${currentBuilding().name}`});
    g.append(svgEl('circle',{cx:ax,cy:ay,r:9,fill:'none',stroke:c,'stroke-width':1.4,'stroke-dasharray':'3 2.5',opacity:.7}));
    g.append(svgEl('text',{x:ax,y:ay+24,'text-anchor':'middle','font-size':11,'font-weight':600,fill:c,'font-family':'Arial, sans-serif',opacity:.85},m.name));
    g.append(svgEl('text',{x:ax,y:ay+38,'text-anchor':'middle','font-size':10,fill:'#8a978b','font-family':'Arial, sans-serif'},'not run on this building'));
    svg.append(g);
  });
  if(!list.length)svg.append(svgEl('text',{x:w/2,y:h/2,'text-anchor':'middle','font-size':14,fill:'#899a7a'},'No results for this selection.'));
  nodes.forEach(n=>{
    const {m,score}=n;
    const button=document.createElement('button');button.type='button';button.className='chart-node'+(m.id===state.modelId?' selected':'')+(all?' dense':'');
    button.dataset.model=m.id;button.dataset.x=n.x;button.dataset.y=n.y;button.dataset.ax=n.ax;button.dataset.ay=n.ay;button.style.left=n.x+'px';button.style.top=n.y+'px';button.style.setProperty('--family-color',familyConfig[m.family].color);
    button.setAttribute('aria-pressed',String(m.id===state.modelId));button.setAttribute('aria-label',`${m.name}, released ${formatDay(m.date)}, ${currentBuilding().name}, ${scopeName().toLowerCase()} ${score.toFixed(3)}. Inspect the submitted 3D output.`);
    button.innerHTML=`<canvas aria-hidden="true"></canvas><span class="node-label"><b>${escapeHTML(m.base)} <em>${escapeHTML(effortOf(m)==='none'?'':effortOf(m))}</em></b><small>${score.toFixed(3)} · ${escapeHTML(usd(valueFor(m,'cost')))} · ${escapeHTML(formatMonth(m.date))}</small></span>`;
    nodesRoot.append(button);mountOutput($('canvas',button),currentBuilding(),m,{group:chartCamera});
    button.addEventListener('click',()=>{state.modelId=m.id;renderSelection();storeHash();if(innerWidth<=940)openOutput('selected');});
    const show=()=>showTooltip(m,n.x,n.y,w,h);
    button.addEventListener('mouseenter',show);button.addEventListener('focus',show);
    button.addEventListener('mouseleave',()=>$('#chartTooltip').classList.remove('visible'));
    button.addEventListener('blur',()=>$('#chartTooltip').classList.remove('visible'));
  });
  chartGeometry={width:w,height:h,positions:nodes};
  const undated=models.filter(m=>(state.family==='All'||m.family===state.family)&&valueFor(m)!=null&&!m.date).length;
  $('#chartContext').textContent=(state.scope==='case'?`${currentBuilding().name}`:state.scope==='clean'?`License-clean board · every model over the same 12 CC BY 4.0 buildings · 3D examples: ${currentBuilding().name}`:`All-results board, each model over the buildings it has run · 3D examples: ${currentBuilding().name}`)+(undated?` · ${undated} without a release date`:'')+(absent.length?` · ${absent.length} not run here: ${absent.map(m=>m.name).join(', ')}`:'');
  $('#chartHint').textContent=(all&&chart.scrollWidth>$('#chartScroll').clientWidth?`${list.length} models · Scroll horizontally for the full timeline`:`${list.length} models · ${innerWidth<=940?'Tap':'Click'} a 3D output to inspect`)+' · dotted tether = output moved aside from its point';
  $('#chart').setAttribute('aria-label',`${state.scope==='mean'?'Board overall':'Case score'} against model release date. ${currentBuilding().name} submissions.`);
}
function showTooltip(m,x,y,w,h){
  const tip=$('#chartTooltip'),r=resultFor(m.id);
  tip.innerHTML=`<b>${escapeHTML(m.name)}</b><span>${escapeHTML(m.org)} · ${escapeHTML(effortLabelOf(m))} · released ${escapeHTML(formatDay(m.date))}</span><span>${scopeName()} ${formatScore(valueFor(m))} · ${usd(valueFor(m,'cost'))} · ${formatMinutes(valueFor(m,'minutes'))}</span>${state.scope==='case'&&r?`<span>${r.nruns>1?`Median of ${r.nruns} runs`:'1 run'}</span>`:state.scope==='clean'?`<span>Over ${m.clean.cells} buildings · F ${formatScore(m.clean.f)}</span>`:`<span>Over ${m.board.cells} buildings · F ${formatScore(m.board.f)}</span>`}`;
  tip.style.left=clamp(x-82,10,w-208)+'px';tip.style.top=(y>135?y-132:Math.min(h-90,y+76))+'px';tip.classList.add('visible');
}
function renderSelection(){
  $$('.chart-node').forEach(n=>{const chosen=n.dataset.model===state.modelId;n.classList.toggle('selected',chosen);n.setAttribute('aria-pressed',String(chosen));});
  renderInspector();renderResults();$('#liveStatus').textContent=`Selected ${currentModel().name}, ${currentBuilding().name}, case score ${formatScore(resultFor(state.modelId)?.score)}.`;
}
let selectedViewer=null,featuredViewer=null;
function runNote(r){return r?`${r.nruns>1?`Median of ${r.nruns} runs`:'1 run'} · ${r.ran}${r.triangles?` · ${r.triangles.toLocaleString()} triangles`:''}`:'No run for this building';}
function renderInspector(){
  const m=currentModel(),b=currentBuilding(),r=resultFor(m.id),previous=previousModel();
  $('#selectedName').textContent=m.name;$('#selectedBuilding').textContent=`${b.name} · ${m.org} · ${r?r.effortLabel:m.effortLabel}`;$('#selectedFamily').textContent=familyConfig[m.family].label;$('#selectedFamily').style.color=familyConfig[m.family].color;
  $('#selectedReferenceImg').src=b.image;$('#selectedReferenceImg').alt=`${b.name} as the 3D tiles have it`;
  $('#selectedScore').textContent=formatScore(r?.score);$('#selectedCost').textContent=usd(r?.costUSD);$('#selectedDate').textContent=formatMonth(m.date);
  $('#selectedCanvas').setAttribute('aria-label',`${b.name}, ${m.name}: the submitted glTF. Drag or use arrow keys to rotate.`);
  selectedViewer=mountOutput($('#selectedCanvas'),b,m,{rotationX:.37,rotationY:chartCamera.rotationY,centerX:.5});
  $('#inspectorNote').textContent=runNote(r);
  $('#aggregateNote').hidden=state.scope==='case';$('#aggregateNote').textContent=state.scope==='clean'?`Chart: ${formatScore(m.clean?.overall)} on the license-clean board (${m.clean?.cells||0} buildings). Above: this building’s run.`:`Chart: ${formatScore(m.board.overall)} on the all-results board across its ${m.board.cells} buildings. Above: this building’s run.`;
  $('#comparePrevious').innerHTML=`<span>${previous?'Compare with '+escapeHTML(previous.name):'Compare with another model'}</span><span aria-hidden="true">↗</span>`;
  $('#mobileInspect').textContent='Inspect '+m.name+' ↗';
}
function renderResults(){
  const list=visibleModels().sort((a,b)=>valueFor(b)-valueFor(a)),body=$('#resultsBody');body.replaceChildren();
  $('#tableSummary').textContent=`${list.length} models · ${state.scope==='case'?'same building':state.scope==='clean'?'license-clean board':'all-results board'}`;
  $('#tableCaption').textContent=state.scope==='clean'?`License-clean board · every model over the same 12 buildings · snapshot ${DATA.snapshot}`:state.scope==='mean'?`All-results board, each model over its own buildings · snapshot ${DATA.snapshot}`:`${currentBuilding().name} · one run per model · snapshot ${DATA.snapshot}`;
  $('#scoreTableHead').textContent=scopeName();$('#costTableHead').textContent=state.scope==='case'?'Cost / run':'Mean cost / run';$('#minutesTableHead').textContent=state.scope==='case'?'Minutes':'Mean minutes';
  list.forEach(m=>{const tr=document.createElement('tr');tr.classList.toggle('selected',m.id===state.modelId);tr.dataset.model=m.id;
    tr.innerHTML=`<td><button type="button" aria-label="Select ${escapeHTML(m.name)}">${escapeHTML(m.name)}</button></td><td>${escapeHTML(familyConfig[m.family].label)}</td><td>${escapeHTML(effortLabelOf(m))}</td><td>${escapeHTML(formatDay(m.date))}</td><td>${formatScore(valueFor(m))}</td><td>${usd(valueFor(m,'cost'))}</td><td>${formatMinutes(valueFor(m,'minutes'))}</td><td><button class="text-button" type="button">Inspect 3D ↗</button></td>`;
    $$('button',tr).forEach((button,i)=>button.addEventListener('click',()=>{state.modelId=m.id;renderSelection();storeHash();if(i===1||innerWidth<=940)openOutput('selected');}));body.append(tr);
  });
}

let dialogGroup=null,dialogModels=[];
function cleanupViewerDialog(){unmountWithin($('#viewerDialogBody'));dialogGroup=null;dialogModels=[];}
function openReference(featured=false){
  cleanupViewerDialog();const b=buildingById(featured?FEATURED.buildingId:state.buildingId);
  $('#viewerDialogEyebrow').textContent='THE BUILDING ITSELF';$('#viewerDialogTitle').textContent=b.name;
  $('#viewerDialogBody').innerHTML=`<div class="dialog-reference"><img src="${escapeHTML(b.photo)}" alt="${escapeHTML(b.name)} in ${escapeHTML(b.source)} at benchmark camera ${escapeHTML(b.photoView)}"></div>`;
  $('#viewerDialogNote').textContent=`${b.source} at benchmark camera ${b.photoView} — the same pose every submission is scored against. ${b.submissions} submissions on the board.`;$('#dialogReset').hidden=true;$('#dialogMotion').hidden=true;$('#viewerDialog').showModal();
}
function openOutput(mode='selected',compareId=null){
  cleanupViewerDialog();const featured=mode==='featured',compare=mode==='compare';
  const b=buildingById(featured?FEATURED.buildingId:state.buildingId),m=modelById(featured?FEATURED.modelId:state.modelId);
  const other=compare?(modelById(compareId)||previousModel(m)||models.find(n=>n.id!==m.id)):null;
  dialogModels=compare?[m,other]:[m];
  dialogGroup={rotationX:.37,rotationY:chartCamera.rotationY,zoom:1,paused:chartCamera.paused||reducedMotion()};
  $('#viewerDialogEyebrow').textContent=compare?'SIDE-BY-SIDE COMPARISON':'OUTPUT INSPECTION';$('#viewerDialogTitle').textContent=b.name;
  const options=models.filter(n=>n.id!==m.id&&resultFor(n.id,b.id)).map(n=>`<option value="${n.id}" ${other?.id===n.id?'selected':''}>${escapeHTML(n.name)}</option>`).join('');
  const controls=compare?`<div class="comparison-controls"><label>Compare with <select id="compareModel" aria-label="Choose the comparison model">${options}</select></label><span class="linked-badge"><i aria-hidden="true"></i>Linked cameras</span></div>`:`<div class="comparison-controls"><span>Selected building · one submission</span><button class="text-button" id="startCompare">Compare submissions ↗</button></div>`;
  $('#viewerDialogBody').innerHTML=controls+`<div class="output-layout"><div class="dialog-reference-panel"><img src="${escapeHTML(b.image)}" alt="${escapeHTML(b.name)} as the 3D tiles have it"><div><h3>The building itself</h3><p>${escapeHTML(b.name)}<br>${escapeHTML(b.source)}, the same case for every output.<br>Drag either model to inspect.</p></div></div><div class="dialog-outputs" style="--columns:${dialogModels.length}">${dialogModels.map(n=>{const r=resultFor(n.id,b.id);return `<div class="dialog-output"><div class="dialog-output-head"><h3>${escapeHTML(n.name)}</h3><b>${formatScore(r?.score)}</b></div><p>Case score · ${escapeHTML(n.org)} · ${escapeHTML(r?r.effortLabel:n.effortLabel)} · released ${escapeHTML(formatDay(n.date))}</p><canvas data-model="${n.id}" tabindex="0" aria-label="${escapeHTML(n.name)} submission, drag or use arrow keys to rotate"></canvas><small>${usd(r?.costUSD)} / run · ${escapeHTML(runNote(r))}</small></div>`;}).join('')}</div></div>`;
  if(!compare)$('.dialog-reference-panel p').innerHTML=`${escapeHTML(b.name)}<br>${escapeHTML(b.source)} at the benchmark cameras.<br>Drag or use arrow keys to rotate.`;
  $('#viewerDialogNote').textContent=`Submitted glTF · board snapshot ${DATA.snapshot}`;$('#dialogReset').hidden=false;$('#dialogMotion').hidden=false;
  $('#viewerDialog').showModal();
  $$('.dialog-output canvas').forEach(c=>mountOutput(c,b,modelById(c.dataset.model),{group:dialogGroup}));
  $('#compareModel')?.addEventListener('change',e=>openOutput('compare',e.target.value));
  $('#startCompare')?.addEventListener('click',()=>{if(featured)setSelection({buildingId:b.id,modelId:m.id,family:m.family});openOutput('compare');});
  $('#dialogMotion').textContent=dialogGroup.paused?'Resume rotation':'Pause rotation';
}
function initFeatured(){
  const b=buildingById(FEATURED.buildingId),m=modelById(FEATURED.modelId),r=resultFor(m.id,b.id);$('#heroReferenceImg').src=b.image;
  $('#featuredPill').textContent=m.name;$('#featuredNote').textContent=`Overall ${formatScore(r?.score)} on this building · released ${formatDay(m.date)}`;
  $('.featured-footer strong').textContent=b.name;
  featuredViewer=mountOutput($('#featuredCanvas'),b,m,{rotationX:.42,rotationY:-.7,centerX:.5,zoom:.97,speed:.09});
}

let toastTimer;
function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3400);}
function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function csvValue(v){return '"'+String(v??'').replaceAll('"','""')+'"';}
function exportCSV(){
  const headers=['snapshot','building_or_set','model_id','model','board_label','family','effort','release_date','score_scope','overall','surface_f','cost_usd','minutes','run_id','runs_in_cell'];
  const rows=visibleModels().map(m=>{const r=resultFor(m.id);const mean=state.scope!=='case';return [DATA.snapshot,state.scope==='clean'?'board:license-clean 12':mean?'board:own buildings':currentBuilding().short,m.id,m.name,state.scope==='clean'?m.clean.label:mean?m.label:(r?.series||''),familyConfig[m.family].label,effortOf(m),m.date,state.scope,valueFor(m),state.scope==='clean'?m.clean.f:mean?m.board.f:r?.surfaceF,valueFor(m,'cost'),valueFor(m,'minutes'),mean?'':r?.runId,mean?'':r?.nruns];});
  downloadBlob(new Blob(['﻿'+[headers,...rows].map(r=>r.map(csvValue).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}),`buildingbench-${state.buildingId}-${state.scope}-${DATA.snapshot}.csv`);
}
function openShare(){
  storeHash();$('#shareURL').value=location.href;$('#shareDescription').textContent=`${currentBuilding().name} · ${state.family==='All'?'All families':familyConfig[state.family].label} · ${scopeName()} over release date`;
  $('#shareLocalNote').textContent=location.protocol==='file:'?'This is a local file. Its link is not public; host the HTML to make shared views accessible to others.':'The link preserves the building, selected model, family filter and score scope.';$('#shareDialog').showModal();
}
async function copyURL(){
  try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText($('#shareURL').value);else{$('#shareURL').select();if(!document.execCommand('copy'))throw new Error('Clipboard unavailable');}$('#copyURL').textContent='Copied';setTimeout(()=>$('#copyURL').textContent='Copy link',1400);}
  catch{$('#shareURL').focus();$('#shareURL').select();toast('Select and copy the link from the field.');}
}
async function exportFigure(){
  const button=$('#exportFigure');button.disabled=true;const label=button.textContent;button.textContent='Preparing figure…';
  try{
    const chart=$('#chart'),w=chart.clientWidth,h=chart.clientHeight,margin=26,header=87,footer=54,scale=2;
    const out=document.createElement('canvas');out.width=(w+margin*2)*scale;out.height=(h+header+footer)*scale;const ctx=out.getContext('2d');ctx.scale(scale,scale);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,out.width,out.height);
    ctx.fillStyle='#123527';ctx.font='600 19px Arial';ctx.fillText('BuildingBench  /  '+currentBuilding().name,margin,30);
    ctx.fillStyle='#73836b';ctx.font='11px Arial';ctx.fillText(`${state.family==='All'?'All families':familyConfig[state.family].label} · ${state.scope==='clean'?'License-clean board, 12 buildings':state.scope==='mean'?'All-results board, each model over its own buildings':'Selected-building scores'} · over model release date`,margin,52);
    ctx.fillStyle='#987b4c';ctx.font='10px Arial';ctx.fillText(`Enactra bench/building · snapshot ${DATA.snapshot}`,margin,71);
    const svg=$('#chartSvg').cloneNode(true);svg.setAttribute('xmlns',SVG_NS);
    const uri=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));
    const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=uri;});ctx.drawImage(img,margin,header,w,h);URL.revokeObjectURL(uri);
    $$('.chart-node').forEach(node=>{
      const x=+node.dataset.x,y=+node.dataset.y,size=node.clientWidth,canvas=$('canvas',node),m=modelById(node.dataset.model);ctx.save();ctx.translate(margin+x,header+y);ctx.beginPath();ctx.arc(0,0,size/2,0,Math.PI*2);ctx.fillStyle='#f5f8f0';ctx.fill();if(m.id===state.modelId){ctx.strokeStyle=familyConfig[m.family].color;ctx.lineWidth=1.2;ctx.stroke();}ctx.drawImage(canvas,-size/2,-size/2,size,size);
      if(state.family!=='All'||m.id===state.modelId){ctx.textAlign='center';ctx.fillStyle='#446440';ctx.font='600 11px Arial';ctx.fillText(m.name,0,size/2+15);ctx.fillStyle='#8c9d80';ctx.font='10px Arial';ctx.fillText(`${formatScore(valueFor(m))} · ${usd(valueFor(m,'cost'))} · ${formatMonth(m.date)}`,0,size/2+29);}ctx.restore();
    });
    ctx.fillStyle='#839579';ctx.font='10px Arial';ctx.fillText('Every 3D preview is the submitted glTF for the selected building. Scores are the board’s.',margin,header+h+29);
    const blob=await new Promise(resolve=>out.toBlob(resolve,'image/png'));if(!blob)throw new Error('Image export failed');downloadBlob(blob,`buildingbench-${state.buildingId}-${DATA.snapshot}.png`);
  }catch(err){console.error('Figure export failed',err);toast('Could not export the figure in this browser. The interactive chart remains available.');}
  finally{button.disabled=false;button.textContent=label;}
}

// Event wiring: building selection never navigates away or jumps between sections.
$('#caseSearch').addEventListener('input',e=>{state.search=e.target.value;renderCaseStrip();});
$('#scoreScope').addEventListener('change',e=>setSelection({scope:e.target.value}));
$('#toggleMotion').addEventListener('click',()=>{chartCamera.paused=!chartCamera.paused;syncControls();});
$('#heroReference').addEventListener('click',()=>openReference(true));$('#selectedReference').addEventListener('click',()=>openReference(false));
$('#expandFeatured').addEventListener('click',()=>openOutput('featured'));$('#expandSelected').addEventListener('click',()=>openOutput());$('#mobileInspect').addEventListener('click',()=>openOutput());
$('#comparePrevious').addEventListener('click',()=>openOutput('compare'));
$('#heroExplore').addEventListener('click',()=>{state.search='';$('#caseSearch').value='';setSelection({buildingId:FEATURED.buildingId,family:modelById(FEATURED.modelId).family,modelId:FEATURED.modelId,scope:'case'});$('#benchmark').scrollIntoView({behavior:reducedMotion()?'instant':'smooth'});});
$('#dialogMotion').addEventListener('click',()=>{if(dialogGroup){dialogGroup.paused=!dialogGroup.paused;$('#dialogMotion').textContent=dialogGroup.paused?'Resume rotation':'Pause rotation';}});
$('#dialogReset').addEventListener('click',()=>{if(dialogGroup)Object.assign(dialogGroup,{rotationX:.37,rotationY:-.7,zoom:1});});
$$('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('#viewerDialog').addEventListener('close',cleanupViewerDialog);
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
$('#shareView').addEventListener('click',openShare);$('#copyURL').addEventListener('click',copyURL);$('#exportFigure').addEventListener('click',exportFigure);$('#exportCSV').addEventListener('click',exportCSV);
window.addEventListener('hashchange',()=>{if(readHash())setSelection({}, {writeHash:false});});
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(renderChart,140);});
window.addEventListener('keydown',e=>{if(e.key==='Escape')$('#chartTooltip').classList.remove('visible');});
window.BuildingBench={getState:()=>({...state}),getData:()=>DATA,select:setSelection,exportFigure};

const deepLinked=readHash();initFeatured();setSelection({}, {announce:false,writeHash:deepLinked});
if(deepLinked)requestAnimationFrame(()=>$('#benchmark').scrollIntoView({behavior:'instant'}));
