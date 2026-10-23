/* Shared on every page: nav pill, page transitions, cursor dot */
(()=>{
const wipe=document.getElementById('wipe'),pill=document.getElementById('pill'),
 cur=document.querySelector('nav a[aria-current=page]'),
 box=()=>cur?{l:cur.offsetLeft,w:cur.offsetWidth}:null,
 place=b=>{if(b){pill.style.left=b.l+'px';pill.style.width=b.w+'px'}};
/* pill slides from the previous page's tab to this one */
let prev=null;
const now=box();pill.style.transition='none';place(prev||now);pill.offsetWidth;pill.style.transition='';
requestAnimationFrame(()=>place(now));
const save=()=>{};
addEventListener('resize',()=>{place(box());save()});
document.fonts&&document.fonts.ready.then(()=>{place(box());save()});
/* page transition: cover, then navigate; new page reveals itself */
const reveal=()=>{wipe.className='out';setTimeout(()=>wipe.className='',520)};
reveal();
addEventListener('pageshow',e=>{if(e.persisted)wipe.className=''});
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href]');
 if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button||a.target||a.hasAttribute('download'))return;
 if(/^(mailto|tel):/.test(a.getAttribute('href'))||a.origin!==location.origin)return;
 if(a.pathname===location.pathname&&a.search===location.search)return;
 e.preventDefault();wipe.className='in';setTimeout(()=>{location.href=a.href},460)});
/* cursor dot */
const dot=document.getElementById('dot');
addEventListener('pointermove',e=>{dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'});
document.addEventListener('pointerover',e=>dot.classList.toggle('big',!!e.target.closest('a,button')));
})();

/* scroll progress bar */
const bar=document.createElement('div');bar.id='bar';document.body.append(bar);
addEventListener('scroll',()=>{const d=document.documentElement;bar.style.transform=`scaleX(${scrollY/((d.scrollHeight-innerHeight)||1)})`},{passive:true});

/* background effects: orbs in every section + cursor glow */
document.querySelectorAll('.wrap:not(.hero)').forEach((w,i)=>{w.classList.add('fx','fx'+(i%3+1));w.insertAdjacentHTML('beforeend','<i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>')});
const glow=document.createElement('div');glow.id='glow';document.body.prepend(glow);
if(matchMedia('(pointer:fine)').matches)addEventListener('pointermove',e=>{glow.style.setProperty('--mx',e.clientX+'px');glow.style.setProperty('--my',e.clientY+'px')});
