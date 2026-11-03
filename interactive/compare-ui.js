'use strict';
(function(){
const C=window.COMPARISON_DATA,el=id=>document.getElementById(id);
const names=Object.fromEntries(window.STUDY_DATA.models.map(m=>[m.id,m.label]));
const percent=v=>v===null?'Not applicable':(100*v).toFixed(1)+'%';
const ci=r=>r.value===null?'—':(100*r.low).toFixed(1)+'–'+(100*r.high).toFixed(1)+'%';
const choose=(rows,kw)=>rows.find(r=>Object.keys(kw).every(k=>r[k]===kw[k]));
function addRow(tid,values){const tr=document.createElement('tr');for(const v of values){const td=document.createElement('td');td.textContent=v;tr.append(td);}el(tid).append(tr);}
function render(){
 const pressure=el('compare-pressure').value,branch=el('compare-branch').value,turn=Number(el('compare-turn').value);
 el('group-comparison-table').replaceChildren();
 for(const group of ['Proprietary','Open-weight']){
  const r=choose(C.group_summary,{group,pressure,branch,turn,metric:'toward'});
  addRow('group-comparison-table',[group+' · '+r.models+' models',percent(r.value),ci(r),r.valid+' / '+r.available]);
  for(const model of C.groups[group]){const m=choose(C.models,{model,pressure,branch,turn,metric:'toward'});addRow('group-comparison-table',['↳ '+names[model],percent(m.value),ci(m),m.valid+' / '+m.available]);}
 }
 const diff=choose(C.contrasts,{comparison:'Open-weight minus proprietary',pressure,branch,turn,metric:'toward'});
 el('group-comparison-note').textContent='Open-weight minus proprietary: '+(diff.value>=0?'+':'')+(100*diff.value).toFixed(1)+' percentage points; conditional 95% interval '+(100*diff.low).toFixed(1)+' to '+(100*diff.high).toFixed(1)+'. A positive value means more movement among the selected open-weight models. This difference does not isolate training or weight availability.';
 el('gpt-comparison-table').replaceChildren();const metric=el('gpt-metric').value;
 for(const model of ['gpt-4o','gpt-6-astra','gpt-6.1-sol']){
  const rows=[1,3].map(turn=>choose(C.models,{model,pressure,branch,turn,metric}));
  addRow('gpt-comparison-table',[names[model],percent(rows[0].value)+(rows[0].value===null?'':' ['+ci(rows[0])+']'),rows[0].valid+' / '+rows[0].available,percent(rows[1].value)+(rows[1].value===null?'':' ['+ci(rows[1])+']'),rows[1].valid+' / '+rows[1].available]);
 }
}
for(const id of ['compare-pressure','compare-branch','compare-turn','gpt-metric'])el(id).addEventListener('change',render);
render();window.renderComparisons=render;
})();
