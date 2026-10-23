/* login.html: sign in against data/users.js, or reset a forgotten password with the recovery code */
const q=s=>document.querySelector(s);
if(!Auth.has())location.replace('setup.html');else if(Auth.session())location.replace('admin.html');
q('#lf').onsubmit=async e=>{e.preventDefault();q('#le').textContent='';
 try{if(await Auth.login(q('#lu').value,q('#pw').value))location.replace('admin.html');else q('#le').textContent='Wrong username or password'}catch(x){q('#le').textContent=x.message}};
q('#fg').onclick=e=>{e.preventDefault();q('#lf').hidden=true;q('#rf').hidden=false};
q('#bk').onclick=e=>{e.preventDefault();q('#rf').hidden=true;q('#lf').hidden=false};
q('#rf').onsubmit=async e=>{e.preventDefault();q('#re').textContent='';
 try{const c=await Auth.reset(q('#ru').value,q('#rc').value,q('#rp').value);q('#rf').innerHTML=`<h1>Password changed ✓</h1><p>Your <b>new</b> recovery code (the old one no longer works). Save it somewhere safe:</p><div class="codebox">${c}</div><button class="b" onclick="location.reload()">Go to login</button>`}catch(x){q('#re').textContent=x.message}};
