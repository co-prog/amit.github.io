/* Work page: scroll story + project filter */
const N=12,stage=document.getElementById('stage'),sh=[];
for(let i=0;i<N;i++){const d=document.createElement('div');d.className='sh';d.style.setProperty('--i',i);stage.appendChild(d);sh.push(d)}
const pal=['var(--pri)','var(--sec)','var(--mint)'];
const rnd=(i,k)=>{const x=Math.sin(i*97.3+k*13.1)*10000;return x-Math.floor(x)};
function lay(s,i){
 const c=i%4,r=Math.floor(i/4);
 if(s===0)return{l:rnd(i,1)*78,t:rnd(i,2)*78,w:10+rnd(i,3)*14,h:10+rnd(i,4)*14,rot:rnd(i,5)*160-80,bg:'var(--dim)',br:rnd(i,6)>.5?'50%':'4px'};
 if(s===1)return{l:c*25+2,t:r*33+3,w:21,h:27,rot:0,bg:'var(--dim)',br:'8px'};
 if(s===2){if(i===0)return{l:2,t:3,w:71,h:61,rot:0,bg:'var(--pri)',br:'18px'};
  const k=i-1;return{l:2+(k%6)*16.4,t:k<5?70:84,w:14,h:k<5?11:11,rot:0,bg:'var(--dim)',br:'8px'}}
 if(s===3){const circ=[0,3,5,8,11].includes(i);return{l:c*25+2,t:r*33+3,w:21,h:27,rot:0,bg:pal[(i*5+r)%3],br:circ?'50%':(i%2?'8px 40px 8px 40px':'8px')}}
 const x=i/(N-1);return{l:x*86+1,t:42+Math.sin(x*Math.PI*2)*22,w:12,h:12,rot:0,bg:pal[i%3],br:'50%'}}
function setState(s){stage.classList.toggle('bounce',s===4);
 sh.forEach((d,i)=>{const o=lay(s,i);Object.assign(d.style,{left:o.l+'%',top:o.t+'%',width:o.w+'%',height:o.h+'%',background:o.bg,borderRadius:o.br,transform:`rotate(${o.rot}deg)`})})}
setState(0);
const chaps=[...document.querySelectorAll('.chap')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){chaps.forEach(c=>c.classList.toggle('on',c===e.target));setState(+e.target.dataset.s)}}),{rootMargin:'-45% 0px -45% 0px'});
chaps.forEach(c=>io.observe(c));


/* ---- creative layer: reveal, counters, hero parallax ---- */
document.documentElement.classList.add('js');
document.querySelectorAll('.sec-h,.wfil,.bc,.st,.proj,.cta-band').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%6)*70+'ms'});
const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>rv.observe(e));
const cnt=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cnt.unobserve(e.target);const el=e.target,m=el.textContent.match(/^(\d+)(.*)$/);if(!m)return;const n=+m[1],t0=performance.now();(function f(t){const k=Math.min((t-t0)/1100,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+m[2];if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
document.querySelectorAll('.st b').forEach(b=>cnt.observe(b));
const art=document.querySelector('.hx-art');
if(art&&matchMedia('(pointer:fine)').matches)addEventListener('pointermove',e=>{art.style.setProperty('--px',((e.clientX/innerWidth-.5)*16)+'px');art.style.setProperty('--py',((e.clientY/innerHeight-.5)*16)+'px')});

/* ---- projects come from data/site-data.js ---- */
siteReady.then(D=>{
 const SG=document.querySelector('.stats');if(SG&&D.stats){SG.innerHTML=D.stats.map(s=>`<div class="st"><b>${esc(s.v)}</b><span>${esc(s.l)}</span></div>`).join('');SG.querySelectorAll('.st').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%6)*70+'ms';rv.observe(e)});SG.querySelectorAll('b').forEach(b=>cnt.observe(b))}
 const S=D.site||{},m=document.querySelector('.cta-band a[href^="mailto:"]'),l=document.querySelector('.cta-band a[href*="linkedin"]');if(m&&S.email)m.href='mailto:'+S.email;if(l&&S.linkedin)l.href=S.linkedin;
 const cats=D.categories,L=document.getElementById('wfil'),G=document.getElementById('pgrid');
 L.innerHTML=cats.map(c=>`<button data-w="${esc(c.id)}">${esc(c.label)}</button>`).join('')+'<button data-w="all">All</button>';
 G.innerHTML=D.projects.map(p=>{
    const ext=/^https?:/i.test(p.link||''),more=p.html||p.video,href=p.link||(more?'project.html?id='+encodeURIComponent(p.id):''),
  media=p.video?`<div class="art vid"><video src="${esc(p.video)}"${p.image?` poster="${esc(p.image)}"`:''} muted loop playsinline preload="metadata"></video></div>`:p.image?`<div class="art vid"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`:`<div class="art ${esc(p.art||'a1')}"><i></i><i></i></div>`;
  return `<article class="proj" data-w="${esc(p.category)}">${media}<div class="pb">${(p.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}<h3><a class="pl"${href?` href="${esc(href)}"`:''}${ext?' target="_blank" rel="noopener"':''}>${esc(p.title)}</a></h3><p>${esc(p.summary)}</p><div class="stat">${esc(p.stat)}</div>${p.link&&more?`<a class="more" href="project.html?id=${encodeURIComponent(p.id)}">Case study →</a>`:''}</div></article>`}).join('');

 const apply=f=>{L.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.w===f));G.querySelectorAll('.proj').forEach(p=>p.hidden=!(f==='all'||p.dataset.w===f))};
 L.onclick=e=>{const b=e.target.closest('button');if(b)apply(b.dataset.w)};apply(cats[0]?cats[0].id:'all');
 G.querySelectorAll('.proj').forEach((e,i)=>{e.classList.add('rv');e.style.transitionDelay=(i%6)*70+'ms';rv.observe(e)});
 const vid=e=>{const c=e.target.closest('.proj');return c&&c.querySelector('video')};
 G.addEventListener('mouseover',e=>{const v=vid(e);if(v)v.play().catch(()=>{})});
 G.addEventListener('mouseout',e=>{const v=vid(e);if(v&&!e.target.closest('.proj').contains(e.relatedTarget))v.pause()});
 if(matchMedia('(hover:none)').matches)G.querySelectorAll('video').forEach(v=>{v.autoplay=true;v.play().catch(()=>{})});

});
