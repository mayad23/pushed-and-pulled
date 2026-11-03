'use strict';
const D=window.STUDY_DATA;
const $=id=>document.getElementById(id);
const branchNames={neutral:'Neutral',escalate:'Escalate',restrain:'Restrain'};
const colors={neutral:'#728997',escalate:'#b65c40',restrain:'#267d79'};
const classNames={held:'Held',adopted_with_reasons:'Adopted with reasons',adopted_deferentially:'Adopted deferentially',changed_own_reasons:'Changed with own reasons',changed_without_reason:'Changed without reasons',refused:'Refused'};
const classColors=['#103a4d','#267d79','#b65c40','#7e919e','#a88b72','#59505b'];
const fieldNames={classification:'Response classification',cites_operator_preference:'Cites preference / authority',pushback:'Pushback',rationalizing:'Rationalizing',contradicts_action:'Action–justification contradiction'};
const fmt=n=>n.toLocaleString('en-US');
$('trial-count').textContent=fmt(D.complete);$('paired-count').textContent=fmt(D.paired_branches);$('agreement-stat').textContent=(100*D.agreement[0].agreement).toFixed(1)+'%';$('snapshot').textContent='Snapshot: '+D.snapshot;
for(const m of D.models){const o=document.createElement('option');o.value=m.id;o.textContent=m.label;$('model').append(o);}
for(const r of D.agreement){const tr=document.createElement('tr');for(const v of [fieldNames[r.field],(r.agreement*100).toFixed(1)+'%',r.kappa===null?'Undefined':r.kappa.toFixed(3),fmt(r.n)]){const td=document.createElement('td');td.textContent=v;tr.append(td);}$('agreement-table').append(tr);}
for(const [name,c] of Object.entries(D.coverage)){const p=document.createElement('p');p.textContent=name+': '+fmt(c.usable)+' / '+fmt(D.expected_branches)+' usable; '+c.unresolved+' unresolved.';$('coverage').append(p);}
const notes={preference:'Preference names a desired action without adding intelligence or claiming a senior role.',authority:'Authority names a desired action and claims the role of Deputy National Security Advisor.',evidence:'Intelligence + preference supplies an unverified intelligence claim alongside a named desired action.',evidence_only:'Intelligence only supplies a claim without naming a preferred action. Movement in this condition is not, by itself, evidence of following an operator preference.'};
function render(){
 const pressure=$('pressure').value,turn=Number($('turn').value),model=$('model').value;
 const models=D.models.filter(m=>model==='all'||m.id===model);
 const rows=D.outcomes.filter(r=>r.pressure===pressure&&r.turn===turn&&(model==='all'||r.model===model));
 $('pressure-note').textContent=notes[pressure];
 const narrow=window.innerWidth<700,W=narrow?660:1050,L=narrow?165:235,R=55,top=42,rowH=95,H=top+models.length*rowH+45;
 const inner=W-L-R,x=v=>L+(v+5)/10*inner;
 let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Mean severity change by model and conversation branch, from minus five to plus five severity levels"><title>Mean change in action severity</title>`;
 for(let t=-5;t<=5;t++){svg+=`<line x1="${x(t)}" y1="25" x2="${x(t)}" y2="${H-35}" stroke="${t===0?'#6d8591':'#dce2e2'}" stroke-width="${t===0?1.5:0.7}"/><text x="${x(t)}" y="17" text-anchor="middle" font-size="12" fill="#566d76">${t>0?'+':''}${t}</text>`;}
 $('action-table').replaceChildren();
 models.forEach((m,i)=>{
  const cy=top+i*rowH;
  svg+=`<text x="0" y="${cy+24}" font-size="${narrow?13:14}" fill="#203b49">${m.label.replaceAll('&','&amp;')}</text>`;
  ['neutral','escalate','restrain'].forEach((branch,j)=>{
   const r=rows.find(r=>r.model===m.id&&r.branch===branch);if(!r)return;
   const y=cy+j*22,v=r.n?r.delta_sum/r.n:0;
   if(r.n){const a=Math.min(x(0),x(v)),w=Math.abs(x(v)-x(0));svg+=`<rect x="${a}" y="${y}" width="${Math.max(w,1)}" height="13" fill="${colors[branch]}"><title>${m.label} / ${branchNames[branch]}: ${v.toFixed(3)} levels; ${r.n} valid replies; ${r.changed} changed action; ${r.up} higher, ${r.down} lower</title></rect><text x="${x(v)+(v<0?-7:7)}" y="${y+11}" text-anchor="${v<0?'end':'start'}" font-size="11" fill="#203b49">${v>0?'+':''}${v.toFixed(2)}</text>`;}
   const tr=document.createElement('tr');for(const value of [m.label,branchNames[branch],r.n?v.toFixed(3):'No valid replies',r.n+' / '+r.available,r.up,r.same,r.down,r.changed]){const td=document.createElement('td');td.textContent=value;tr.append(td);}$('action-table').append(tr);
  });
 });
 svg+=`<text x="${L+inner/2}" y="${H-3}" text-anchor="middle" font-size="12" fill="#566d76">Δ severity (follow-up − initial)</text></svg>`;
 $('action-chart').innerHTML=svg;
 const zeros=rows.filter(r=>r.n>0&&r.delta_sum===0);
 const unchanged=zeros.filter(r=>r.changed===0);
 const names=[...new Set(unchanged.map(r=>D.models.find(m=>m.id===r.model).label))];
 $('zero-note').textContent='How to read 0.00: it is a measured average, not a failed experiment. A true zero can mean no severity changes, changes between actions at the same level, or upward and downward changes that cancel out. Values close to zero may also round to 0.00. Missing or invalid replies are excluded, never entered as zero.'+(names.length?' For this selection, '+names.join(', ')+' each have at least one zero-valued branch in which every valid reply kept the initial action.':'')+' Check the exact-value table for valid reply counts and action changes.';

 const branch=$('judge-branch').value;$('judge-distribution').replaceChildren();
 for(const judge of Object.keys(D.coverage)){
  const totals={};for(const r of D.judgments.filter(r=>r.judge===judge&&r.pressure===pressure&&r.turn===turn&&r.branch===branch&&(model==='all'||r.model===model)))for(const [k,v] of Object.entries(r.counts))totals[k]=(totals[k]||0)+v;
  const n=Object.values(totals).reduce((a,b)=>a+b,0),block=document.createElement('div');block.className='judge-block';
  const title=document.createElement('div');title.className='judge-title';title.textContent=judge+' · '+fmt(n)+' usable reply ratings';block.append(title);
  const stack=document.createElement('div');stack.className='stack';stack.setAttribute('role','img');stack.setAttribute('aria-label',Object.entries(totals).map(([k,v])=>classNames[k]+': '+v).join('; ')||'No usable ratings');
  const legend=document.createElement('div');legend.className='class-legend';
  Object.keys(classNames).forEach((k,i)=>{const count=totals[k]||0;if(!count)return;const percent=count/n*100;const seg=document.createElement('div');seg.className='segment';seg.style.width=percent+'%';seg.style.background=classColors[i];seg.title=classNames[k]+': '+count+' ('+percent.toFixed(1)+'%)';seg.textContent=percent>=10?percent.toFixed(0)+'%':'';stack.append(seg);const item=document.createElement('span'),dot=document.createElement('i');dot.style.background=classColors[i];item.append(dot,document.createTextNode(classNames[k]+' '+percent.toFixed(1)+'%'));legend.append(item);});
  block.append(stack,legend);$('judge-distribution').append(block);
 }
}
for(const id of ['pressure','turn','model','judge-branch'])$(id).addEventListener('change',render);
render();
window.addEventListener('resize',render);
