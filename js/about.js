/* About page: content from data/site-data.js */
siteReady.then(D=>{const S=D.site||{},q=s=>document.querySelector(s);
 if(S.about_heading)q('#a-h').textContent=S.about_heading;if(S.about_text)q('#a-t').textContent=S.about_text;
 q('#a-l').innerHTML=[S.email&&`<a class="tag" href="mailto:${esc(S.email)}">${esc(S.email)}</a>`,S.phone&&`<a class="tag" href="tel:${esc(S.phone.replace(/\s/g,''))}">${esc(S.phone)}</a>`,S.linkedin&&`<a class="tag" href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,S.location&&`<span class="tag">${esc(S.location)}</span>`].filter(Boolean).join('');
 [['jobs_html','#a-jobs'],['skills_html','#a-skills'],['education_html','#a-edu']].forEach(([k,s])=>{if(S[k]!=null)q(s).innerHTML=S[k]})});
/* About page: eyes follow the cursor + rules accordion */
const eyes=[...document.querySelectorAll('.eye i')];
addEventListener('pointermove',e=>{eyes.forEach(i=>{const r=i.parentElement.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),a=Math.atan2(dy,dx),m=Math.min(Math.hypot(dx,dy)/8,r.width*.22);i.style.transform=`translate(${Math.cos(a)*m}px,${Math.sin(a)*m}px)`})});
document.querySelectorAll('.rule').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')!=='true')));
