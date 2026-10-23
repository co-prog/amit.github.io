/* Project page: project.html?id=slug (video, prototype link and custom HTML from data/site-data.js) */
siteReady.then(D=>{
 const q=new URLSearchParams(location.search).get('id'),p=D.projects.find(x=>x.id===q)||D.projects[0];if(!p)return;
 const c=D.categories.find(x=>x.id===p.category);document.title=p.title+' — Amit Kumar';
 document.getElementById('projbox').innerHTML=`<a class="back" href="index.html">← All work</a><br><span class="tag">${esc(c?c.label:'')}</span>${(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}<h1>${esc(p.title)}</h1><p class="lede">${esc(p.summary)}</p>${p.video?`<video class="pvid" src="${esc(p.video)}"${p.image?` poster="${esc(p.image)}"`:''} controls playsinline></video>`:p.image?`<img class="pvid" src="${esc(p.image)}" alt="">`:''}${p.link?`<a class="btn" href="${esc(p.link)}" target="_blank" rel="noopener">Open prototype ↗</a>`:''}${p.doc?` <a class="btn ghost" href="${esc(p.doc)}" download>Download document</a>`:''}<div class="body">${p.html||''}</div>`;
});
