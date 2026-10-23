/* Admin users and passwords. Stored in the real file data/users.js (salted PBKDF2 hashes), written through Backend.
   The login state is only a per-tab flag. NOTE: on a static site this login is a convenience gate, not server security. */
const Auth=(()=>{
 const SK='pf_session',enc=s=>new TextEncoder().encode(s),hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join(''),rnd=n=>hex(crypto.getRandomValues(new Uint8Array(n)));
 const h53=(s,seed=0)=>{let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0,c;i<s.length;i++){c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(36)};
 const all=()=>Array.isArray(window.SITE_USERS)?window.SITE_USERS:[];
 async function hash(pw,salt,alg){if(alg==='h'||!(window.crypto&&crypto.subtle))return 'h:'+h53(salt+pw);const k=await crypto.subtle.importKey('raw',enc(pw),'PBKDF2',false,['deriveBits']);return 'p:'+hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:enc(salt),iterations:100000,hash:'SHA-256'},k,256))}
 const same=(a,b)=>a.toLowerCase()===String(b).trim().toLowerCase(),find=(n,u=all())=>u.find(x=>same(x.name,n)),check=p=>{if(!p||p.length<6)throw new Error('Password must be at least 6 characters')},newCode=()=>rnd(5).toUpperCase().replace(/(.{4})(?=.)/g,'$1-');
 async function fresh(){await Connect.ensure();try{const t=await Backend.get().read('data/users.js');window.SITE_USERS=JSON.parse(t.slice(t.indexOf('['),t.lastIndexOf(']')+1))}catch(e){}return all().map(x=>({...x}))}
 async function persist(u){await Backend.get().write('data/users.js','/* Admin users (hashed passwords). Written by the admin panel. */\nwindow.SITE_USERS = '+JSON.stringify(u,null,2)+';\n');window.SITE_USERS=u}
 async function mut(name,fn){const u=await fresh(),x=find(name,u);if(!x)throw new Error('User not found');await fn(x,u);await persist(u)}
 return{
  has:()=>all().length>0,list:()=>all().map(u=>({name:u.name,role:u.role})),
  session(){try{return JSON.parse(sessionStorage.getItem(SK))}catch(e){return null}},logout(){sessionStorage.removeItem(SK)},
  async create(name,pw,role='editor'){name=String(name).trim();if(!/^[\w.@-]{3,32}$/.test(name))throw new Error('Username: 3 to 32 letters, numbers or . _ - @');check(pw);
   const u=await fresh();if(find(name,u))throw new Error('That username already exists');const salt=rnd(8),code=newCode();u.push({name,role,salt,hash:await hash(pw,salt),rec:await hash(code,salt+'r')});await persist(u);return code},
  async verify(name,pw){const u=find(name);return !!u&&await hash(pw,u.salt,u.hash[0])===u.hash},
  async login(name,pw){if(!await this.verify(name,pw))return false;const u=find(name);sessionStorage.setItem(SK,JSON.stringify({name:u.name,role:u.role}));return true},
  async setPassword(name,pw){check(pw);await mut(name,async x=>{x.hash=await hash(pw,x.salt)})},
  async remove(name){await mut(name,(x,u)=>{if(x.role==='admin'&&u.filter(a=>a.role==='admin').length<2)throw new Error('You cannot delete the last admin');u.splice(u.indexOf(x),1)})},
  async reset(name,code,pw){check(pw);const x=find(name);if(!x||await hash(String(code).trim().toUpperCase(),x.salt+'r',x.rec[0])!==x.rec)throw new Error('Username or recovery code is wrong');const nc=newCode();await mut(name,async y=>{y.hash=await hash(pw,y.salt);y.rec=await hash(nc,y.salt+'r')});return nc}
 }})();
