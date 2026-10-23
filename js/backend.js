/* Static storage for the admin panel. Writes REAL files, with no server (no PHP / Apache / Node).
   Local folder = File System Access API (Chrome / Edge): saves into data/ and uploads/ of your portfolio folder.
   GitHub       = GitHub REST API: commits data/ and uploads/ into your repo, which GitHub Pages serves.
   Only your choice of storage (a folder permission handle or GitHub token) is remembered in this browser. */
const Backend=(()=>{
 const idb=()=>new Promise((ok,no)=>{const r=indexedDB.open('pf_backend',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
 const kv=async(op,k,v)=>{try{const db=await idb();return await new Promise((ok,no)=>{const t=db.transaction('kv',op==='get'?'readonly':'readwrite'),s=t.objectStore('kv'),r=op==='get'?s.get(k):op==='set'?s.put(v,k):s.delete(k);t.oncomplete=()=>ok(r.result);t.onerror=()=>no(t.error)})}catch(e){return null}};
 let cur=null;
 const walk=async(root,dir,create)=>{let h=root;for(const s of dir.split('/').filter(Boolean))h=await h.getDirectoryHandle(s,{create});return h};
 const split=p=>{const i=p.lastIndexOf('/');return[p.slice(0,i),p.slice(i+1)]};
 const Local=root=>({kind:'local',label:root.name,
  async read(p){const[d,n]=split(p);return (await (await (await walk(root,d)).getFileHandle(n)).getFile()).text()},
  async write(p,data,onp){const[d,n]=split(p),w=await (await (await walk(root,d,true)).getFileHandle(n,{create:true})).createWritable();
   if(typeof data==='string')await w.write(data);else{const rd=data.stream().getReader();let c=0;for(;;){const r=await rd.read();if(r.done)break;await w.write(r.value);c+=r.value.length;if(onp)onp(c/data.size*100)}}await w.close()},
  async list(d){const out=[];try{for await(const[n,e] of (await walk(root,d)).entries())if(e.kind==='file'&&!/^\./.test(n)){const f=await e.getFile();out.push({name:n,path:d+'/'+n,size:f.size,time:f.lastModified})}}catch(e){}return out},
  async remove(p){const[d,n]=split(p);await (await walk(root,d)).removeEntry(n)}});
 const b64=blob=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).split(',')[1]);r.onerror=()=>no(r.error);r.readAsDataURL(blob)});
 const GH=c=>{const H={Authorization:'Bearer '+c.token,Accept:'application/vnd.github+json'},url=p=>`https://api.github.com/repos/${c.repo}/contents/${p.split('/').map(encodeURIComponent).join('/')}`,ref=`?ref=${encodeURIComponent(c.branch)}`;
  const sha=async p=>{const r=await fetch(url(p)+ref,{headers:H,cache:'no-store'});return r.ok?(await r.json()).sha:null};
  return{kind:'github',label:c.repo,
   async read(p){const r=await fetch(url(p)+ref,{headers:{...H,Accept:'application/vnd.github.raw+json'},cache:'no-store'});if(!r.ok)throw new Error('not found');return r.text()},
   async write(p,data,onp){const content=typeof data==='string'?btoa(unescape(encodeURIComponent(data))):await b64(data),s=await sha(p),
    r=await fetch(url(p),{method:'PUT',headers:H,body:JSON.stringify({message:'Admin: update '+p,content,branch:c.branch,...(s?{sha:s}:{})})});
    if(!r.ok)throw new Error((await r.json().catch(()=>({}))).message||'GitHub error '+r.status);if(onp)onp(100)},
   async list(d){const r=await fetch(url(d)+ref,{headers:H,cache:'no-store'});return r.ok?(await r.json()).filter(x=>x.type==='file'&&!/^\./.test(x.name)).map(x=>({name:x.name,path:x.path,size:x.size,time:0})):[]},
   async remove(p){const s=await sha(p);if(s)await fetch(url(p),{method:'DELETE',headers:H,body:JSON.stringify({message:'Admin: delete '+p,sha:s,branch:c.branch})})}}};
 return{get:()=>cur,
  async pickLocal(){if(!window.showDirectoryPicker)throw new Error('This browser cannot save to a folder. Use Chrome or Edge, or choose GitHub.');
   const d=await showDirectoryPicker({mode:'readwrite'});try{await d.getFileHandle('index.html')}catch(e){throw new Error('That folder has no index.html. Choose your portfolio folder itself (if you unzipped it, the inner "portfolio" folder).')}
   cur=Local(d);await kv('set','cfg',{type:'local',handle:d});return cur},
  async useGitHub(c){c={repo:c.repo.trim().replace(/^https?:\/\/github\.com\//,'').replace(/\.git$/,'').replace(/\/$/,''),branch:(c.branch||'main').trim()||'main',token:c.token.trim()};
   if(!/^[\w.-]+\/[\w.-]+$/.test(c.repo))throw new Error('Repository must look like owner/name');
   const r=await fetch('https://api.github.com/repos/'+c.repo,{headers:{Authorization:'Bearer '+c.token}});
   if(!r.ok)throw new Error(r.status===404?'Repository not found. Check the name and that the token can access it.':'GitHub rejected the token ('+r.status+')');
   const j=await r.json();if(j.permissions&&!j.permissions.push)throw new Error('This token cannot write. Give it "Contents: Read and write".');
   cur=GH(c);await kv('set','cfg',{type:'github',...c});return cur},
  async restore(){const c=await kv('get','cfg');if(!c)return{state:'none'};if(c.type==='github'){cur=GH(c);return{state:'ready'}}
   if(c.handle){try{if(await c.handle.queryPermission({mode:'readwrite'})==='granted'){cur=Local(c.handle);return{state:'ready'}}}catch(e){}return{state:'permission',handle:c.handle}}return{state:'none'}},
  async grant(h){if(await h.requestPermission({mode:'readwrite'})!=='granted')throw new Error('Permission was not granted');cur=Local(h);return cur},
  async forget(){cur=null;await kv('del','cfg')}}})();

/* One-time "where should I save?" screen. Connect.ensure() resolves once a storage is ready. */
const Connect={ensure(){return new Promise(async res=>{
 if(Backend.get())return res(Backend.get());const r=await Backend.restore();if(r.state==='ready')return res(Backend.get());
 const box=document.createElement('div'),x=s=>box.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));box.id='cn';document.body.append(box);
 box.innerHTML=`<div class="cnc"><h2>Where should your site be saved?</h2><p>One-time step. Your data goes into real files and your uploads into real folders. Your choice is remembered in this browser.</p>
  ${r.state==='permission'?`<button class="b" id="cn_re">Reconnect to “${esc(r.handle.name)}”</button><p>or choose again below</p>`:''}
  <div class="cnopts"><div><h3>📁 Folder on this computer</h3><p>Chrome / Edge. Saves into the <code>data/</code> and <code>uploads/</code> folders of your portfolio folder.</p><button class="b" id="cn_l">Choose portfolio folder</button></div>
  <div><h3>🐙 GitHub (publish online)</h3><p>Commits into your repo, which GitHub Pages serves. Token needs <b>Contents: Read and write</b>.</p><input id="cn_r" placeholder="owner/repository"><input id="cn_b" placeholder="branch (default: main)"><input id="cn_t" type="password" placeholder="Access token"><button class="b" id="cn_g">Connect GitHub</button></div></div><p class="err"></p></div>`;
 const run=async f=>{x('.err').textContent='';try{await f();box.remove();res(Backend.get())}catch(e){if(e.name!=='AbortError')x('.err').textContent=e.message}};
 x('#cn_l').onclick=()=>run(()=>Backend.pickLocal());x('#cn_g').onclick=()=>run(()=>Backend.useGitHub({repo:x('#cn_r').value,branch:x('#cn_b').value,token:x('#cn_t').value}));
 if(r.state==='permission')x('#cn_re').onclick=()=>run(()=>Backend.grant(r.handle))})}};

/* Reads and writes the site's real files: data/site-data.js and uploads/videos|images|documents */
const KINDS={videos:['mp4','m4v','webm','mov','ogg','ogv'],images:['png','jpg','jpeg','gif','webp','avif'],documents:['pdf','doc','docx','xls','xlsx','ppt','pptx','txt','csv','rtf']};
const Files={
 text:D=>'/* Portfolio data - written by the admin panel. */\nwindow.SITE_DATA = '+JSON.stringify(D,null,2)+';\n',
 async saveData(D){await Backend.get().write('data/site-data.js',Files.text(D))},
 async loadData(){try{const t=await Backend.get().read('data/site-data.js');return JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1))}catch(e){return JSON.parse(JSON.stringify(window.SITE_DATA||{categories:[],projects:[],posts:[],custom:{}}))}},
 async upload(file,onp){const m=file.name.match(/\.([^.]+)$/),ext=m?m[1].toLowerCase():'',kind=Object.keys(KINDS).find(k=>KINDS[k].includes(ext));if(!kind)throw new Error('File type .'+ext+' is not allowed');
  const base=file.name.replace(/\.[^.]+$/,'').replace(/[^a-z0-9_-]+/gi,'-').replace(/^-|-$/g,'').slice(0,40)||'file',path=`uploads/${kind}/${Date.now().toString(36)}-${base}.${ext}`;await Backend.get().write(path,file,onp);return path},
 async list(){const r=[];for(const k of Object.keys(KINDS))for(const f of await Backend.get().list('uploads/'+k))r.push({...f,kind:k,name:f.name.replace(/^[a-z0-9]{6,24}-/,'')});return r.sort((a,b)=>b.time-a.time)},
 del:p=>Backend.get().remove(p)};
