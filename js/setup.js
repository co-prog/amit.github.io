/* setup.html: first run only. Asks where to save, creates the first admin in data/users.js, shows a recovery code once. */
const q=s=>document.querySelector(s);
if(Auth.has())location.replace('login.html');
q('#sf').onsubmit=async e=>{e.preventDefault();q('#se').textContent='';
 if(q('#sp').value!==q('#sp2').value)return q('#se').textContent='Passwords do not match';
 try{const u=q('#su').value,code=await Auth.create(u,q('#sp').value,'admin');await Auth.login(u,q('#sp').value);
  q('#sf').innerHTML=`<h1>Account created ✓</h1><p>Save this <b>recovery code</b>. It is the only way to reset a forgotten password, and it is shown just once:</p><div class="codebox">${code}</div><button class="b" onclick="location.replace('admin.html')">Continue to admin</button>`}catch(x){q('#se').textContent=x.message}};
