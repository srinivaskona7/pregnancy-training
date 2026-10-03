const B=window.BOOK,$=s=>document.querySelector(s),nav=$('#nav'),main=$('#main');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ch=n=>B.chapters.find(c=>c.n===n);
nav.innerHTML='<a href="#/">Overview</a>'+B.parts.map(p=>`<h3>${p.label} · ${esc(p.name)}</h3>`+B.chapters.filter(c=>c.n>=p.from_&&c.n<=p.to).map(c=>`<a href="#/${c.n}" data-n="${c.n}">${c.n}. ${esc(c.title)}</a>`).join('')).join('');
const mins=c=>Math.max(1,Math.round([c.summary,...c.points,...c.takeaways,...c.cautions].join(' ').split(/\s+/).length/200));
const li=a=>a.map(x=>`<li>${esc(x)}</li>`).join('');
function home(){
  main.innerHTML='<div class="kick">Study guide</div><h1>Physical Training During Pregnancy: From Theory to Practice</h1><p>Chapter-by-chapter summaries with key points and practical takeaways for all 28 chapters in four parts.</p>'+
  B.parts.map(p=>`<h2>${p.label} · ${esc(p.name)}</h2><div class="grid">`+B.chapters.filter(c=>c.n>=p.from_&&c.n<=p.to).map(c=>`<a class="card" href="#/${c.n}"><b>${c.n}</b> ${esc(c.title)}<small>${esc(c.takeaways[0]||'')}</small></a>`).join('')+'</div>').join('');
}
function chapter(n){const c=ch(n);if(!c)return home();const p=B.parts.find(p=>n>=p.from_&&n<=p.to),pr=ch(n-1),nx=ch(n+1);
  main.innerHTML=`<div class="kick">${p.label} · Chapter ${n}</div><h1>${esc(c.title)}</h1><div class="meta"><span>${mins(c)} min read</span><span>${c.points.length} key points · ${c.takeaways.length} takeaways</span></div>`+
  c.summary.split(/\n+/).map(t=>`<p>${esc(t)}</p>`).join('')+`<h2>Key points</h2><ul>${li(c.points)}</ul>`+
  `<div class="box tk"><h2>Key takeaways</h2><ul>${li(c.takeaways)}</ul></div>`+
  (c.cautions.length?`<div class="box warn"><h2>Cautions</h2><ul>${li(c.cautions)}</ul></div>`:'')+
  `<div class="pager"><span>${pr?`<a href="#/${pr.n}"><small>← Previous</small>${pr.n}. ${esc(pr.title)}</a>`:''}</span><span>${nx?`<a href="#/${nx.n}"><small>Next →</small>${nx.n}. ${esc(nx.title)}</a>`:''}</span></div>`;
}
function search(q){const t=q.toLowerCase(),re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');
  const hits=B.chapters.flatMap(c=>[...c.points.map(x=>['Point',x]),...c.takeaways.map(x=>['Takeaway',x]),...c.cautions.map(x=>['Caution',x]),['Summary',c.summary]].filter(([,x])=>x.toLowerCase().includes(t)).map(([k,x])=>({c,k,x})));
  main.innerHTML=`<h1>${hits.length} result${hits.length==1?'':'s'} for “${esc(q)}”</h1>`+hits.map(h=>`<p><a href="#/${h.c.n}"><b>${h.c.n}. ${esc(h.c.title)}</b></a> · ${h.k}<br>${esc(h.x).replace(re,'<mark>$1</mark>')}</p>`).join('');}
function route(){const m=location.hash.match(/^#\/(\d+)/);nav.classList.remove('open');
  m?chapter(+m[1]):home();nav.querySelectorAll('a').forEach(a=>a.classList.toggle('on',m&&a.dataset.n===m[1]));scrollTo(0,0);document.title=(m&&ch(+m[1])?ch(+m[1]).title+' — ':'')+'Physical Training During Pregnancy';}
addEventListener('hashchange',route);route();
$('#q').addEventListener('input',e=>{const q=e.target.value.trim();q.length>1?search(q):route();});
$('#menu').onclick=()=>nav.classList.toggle('open');
