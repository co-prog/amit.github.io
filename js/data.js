/* Reads window.SITE_DATA (data/site-data.js, written by the admin panel) and applies custom CSS, extra sections and footer */
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const siteReady=new Promise((ok,no)=>{
 const D=window.SITE_DATA;if(!D){document.body.insertAdjacentHTML('afterbegin','<p style="padding:100px 20px;text-align:center;font-family:sans-serif">data/site-data.js is missing.</p>');return no()}
 const C=D.custom||{};
 if(C.css){const st=document.createElement('style');st.textContent=C.css;document.head.append(st)}
 const x=document.getElementById('extra'),h=C[document.body.dataset.page+'_extra'];if(x&&h)x.innerHTML=h;
 const f=document.querySelector('footer');if(f&&D.site&&D.site.footer)f.innerHTML=esc(D.site.footer)+' · <a href="login.html">Admin</a>';
 ok(D)});
