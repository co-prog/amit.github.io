/* Admin panel (static, no server). Saves real files through Backend: data/site-data.js, data/users.js and uploads/. */
const $=s=>document.querySelector(s),E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50)||'item';
const toast=m=>{$('#st').textContent=m;setTimeout(()=>$('#st').textContent='',3000)};
const F={projects:[['category','Category','sel'],['title','Title'],['tags','Tags (comma separated)'],['summary','Short summary','ta'],['stat','Highlight (e.g. 40% faster)'],['link','Prototype link (user is sent here when the card is clicked)'],['art','Card graphic (used when there is no video)','sel'],['image','Cover image (card thumbnail and video poster)','img'],['video','Video (hover preview on the card + player on the case-study page)','vid'],['doc','Document (PDF, Word, Excel…) shown as a download button on the project page','doc'],['html','Case-study page HTML','html']],
 posts:[['category','Blog filter category','sel'],['label','Tag text (optional)'],['title','Title'],['date','Date (e.g. Oct 2026)'],['read','Read time (e.g. 6 min read)'],['summary','Short summary','ta'],['html','Article HTML','html']]};
const OPTS=k=>k==='projects'?{category:D.categories.map(c=>[c.id,c.label]),art:[['a1','Style 1'],['a2','Style 2'],['a3','Style 3']]}:{category:[['product','Product'],['design','Design'],['career','Career']]};
const SN={'Heading + text':'<h2>Heading</h2>\n<p>Write your text here.</p>\n','Takeaways box':'<div class="key"><b>Key takeaways</b><ul><li>Point one</li><li>Point two</li></ul></div>\n','Two columns':'<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px"><div><h3>Left</h3><p>Text</p></div><div><h3>Right</h3><p>Text</p></div></div>\n','Quote':'<blockquote style="border-left:4px solid #00C46A;padding-left:16px;margin:20px 0">Your quote</blockquote>\n','Embed (Figma / YouTube)':'<iframe src="https://" style="width:100%;height:420px;border:0;border-radius:16px" allowfullscreen></iframe>\n'};
const FT={img:'image/*',vid:'video/*',doc:'.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf'};
let D,me,tab='projects',cur=-1;
async function save(){try{D.updated=Date.now();await Files.saveData(D);toast('Saved ✓ data/site-data.js updated');return true}catch(e){bad(e);return false}}
const ins=(ta,t)=>{ta.setRangeText(t,ta.selectionStart,ta.selectionEnd,'end');ta.focus()};
function field([n,l,t],it,k){const v=it[n]==null?'':it[n],val=Array.isArray(v)?v.join(', '):v;
 if(t==='sel')return `<label>${l}<select id="f_${n}">${OPTS(k)[n].map(([a,b])=>`<option value="${E(a)}"${a===val?' selected':''}>${E(b)}</option>`).join('')}</select></label>`;
 if(t==='ta')return `<label>${l}<textarea id="f_${n}" rows="3">${E(val)}</textarea></label>`;
 if(FT[t])return `<label>${l}<input type="file" data-up="${n}" accept="${FT[t]}"><progress id="p_${n}" max="100" hidden></progress><input id="f_${n}" value="${E(val)}" placeholder="Uploaded file path appears here (or paste a link)"></label>${val&&t==='vid'?`<video class="vp" src="${E(val)}" controls></video>`:''}${val&&t==='img'?`<img class="vp" src="${E(val)}" alt="">`:''}`;
 if(t==='html')return `<label>${l} — design in HTML and paste it here</label><div class="snip">${Object.keys(SN).map(s=>`<button type="button" data-s="${E(s)}">${E(s)}</button>`).join('')}<button type="button" id="img">🖼 Image</button><button type="button" id="dc">📎 Document link</button><input type="file" id="ifile" hidden></div><textarea id="f_${n}" class="code" rows="16" spellcheck="false">${E(val)}</textarea>`;
 return `<label>${l}<input id="f_${n}" value="${E(val)}"></label>`}
function render(){document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));if(tab==='pages')return pages();if(tab==='site')return siteTab();if(tab==='users')return users();if(tab==='media')return media();
 const k=tab,L=D[k],it=cur>=0?L[cur]:{};
 $('#app').innerHTML=`<aside><button class="b" id="new">＋ New ${k==='projects'?'project':'post'}</button>${k==='projects'?'<button class="b ghost" id="addcat">＋ Add category</button>':''}<ul>${L.map((x,i)=>`<li class="${i===cur?'on':''}"><span data-e="${i}">${E(x.title)}<small>${E(k==='projects'?(D.categories.find(c=>c.id===x.category)||{}).label:x.category)}</small></span><i data-u="${i}" title="Move up">↑</i><i data-d="${i}" title="Move down">↓</i><i data-x="${i}" title="Delete">✕</i></li>`).join('')}</ul></aside>
 <section class="ed"><h2>${cur>=0?'Edit':'New'} ${k==='projects'?'project':'post'}</h2>${F[k].map(f=>field(f,it,k)).join('')}<div class="row"><button class="b" id="save">Save</button><button class="b ghost" id="prev">Preview HTML</button></div><iframe id="pv" hidden></iframe></section>`;bind(k)}
function bind(k){const L=D[k],g=n=>$('#f_'+n);
 $('#new').onclick=()=>{cur=-1;render()};
 const ac=$('#addcat');if(ac)ac.onclick=async()=>{const n=prompt('Category name');if(!n)return;D.categories.push({id:slug(n),label:n});if(await save())render()};
 document.querySelectorAll('[data-e]').forEach(e=>e.onclick=()=>{cur=+e.dataset.e;render()});
 document.querySelectorAll('[data-u],[data-d],[data-x]').forEach(e=>e.onclick=async()=>{const d=e.dataset,i=+(d.u!==undefined?d.u:d.d!==undefined?d.d:d.x);
  if(d.x!==undefined){if(!confirm('Delete "'+L[i].title+'"?'))return;L.splice(i,1);cur=-1}
  else{const j=i+(d.u!==undefined?-1:1);if(j<0||j>=L.length)return;[L[i],L[j]]=[L[j],L[i]];cur=j}
  if(await save())render()});
 $('#save').onclick=async()=>{const o={};F[k].forEach(([n])=>{const v=g(n).value;o[n]=n==='tags'?v.split(',').map(s=>s.trim()).filter(Boolean):v});
  if(!o.title.trim())return alert('Title is required');
  const keep=cur>=0?L[cur]:{};let id=keep.id||slug(o.title);while(L.some((x,i)=>x.id===id&&i!==cur))id+='-'+Math.random().toString(36).slice(2,5);
  const rec={...keep,...o,id};if(cur>=0)L[cur]=rec;else if(k==='posts'){L.unshift(rec);cur=0}else{L.push(rec);cur=L.length-1}
  if(await save())render()};
 $('#prev').onclick=async()=>{const f=$('#pv');f.hidden=!f.hidden;f.srcdoc=`<base href="${new URL('./',location.href).href}"><link rel="stylesheet" href="css/style.css"><body><div class="wrap art-page" style="padding-top:30px"><div class="body">${g('html').value}</div></div></body>`};
 document.querySelectorAll('[data-up]').forEach(i=>i.onchange=async()=>{const n=i.dataset.up,bar=$('#p_'+n);try{bar.hidden=false;g(n).value=await Files.upload(i.files[0],v=>bar.value=v);toast('Uploaded ✓ now click Save')}catch(e){bad(e)}bar.hidden=true});
 document.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>ins(g('html'),SN[b.dataset.s]));
 const pick=(acc,fn)=>{const i=$('#ifile');i.accept=acc;i.onchange=async()=>{try{const f=i.files[0];fn(await Files.upload(f),f.name);toast('Uploaded ✓')}catch(e){bad(e)}i.value=''};i.click()};
 $('#img').onclick=()=>pick('image/*',p=>ins(g('html'),`<img src="${p}" alt="">\n`));$('#dc').onclick=()=>pick(FT.doc,(p,n)=>ins(g('html'),`<p><a href="${p}" download>${E(n)}</a></p>\n`))}
function pages(){const C=D.custom,K=[['work_extra','Work page: extra section (shown above the contact band)'],['about_extra','About page: extra section (bottom of page)'],['blog_extra','Blog page: extra section (bottom of page)'],['css','Custom CSS (applies to every page, use it to style your pasted HTML)']];
 $('#app').innerHTML=`<section class="ed wide"><h2>Pages &amp; CSS</h2>${K.map(([n,l])=>`<label>${l}</label><textarea id="c_${n}" class="code" rows="9" spellcheck="false">${E(C[n]||'')}</textarea>`).join('')}<div class="row"><button class="b" id="save">Save</button></div></section>`;
 $('#save').onclick=async()=>{K.forEach(([n])=>C[n]=$('#c_'+n).value);await save()}}
function siteTab(){const S=D.site=D.site||{},I=[['about_heading','About page heading'],['about_text','About page intro','ta'],['email','Email'],['phone','Phone'],['linkedin','LinkedIn URL'],['location','Location'],['footer','Footer text (shown on every page)']],H=[['jobs_html','Work experience (HTML cards)'],['skills_html','Skills (HTML)'],['education_html','Education (HTML)']];
 $('#app').innerHTML=`<section class="ed wide"><h2>Site content</h2>${I.map(([n,l,t])=>`<label>${l}${t?`<textarea id="s_${n}" rows="3">${E(S[n])}</textarea>`:`<input id="s_${n}" value="${E(S[n])}">`}</label>`).join('')}<label>Result numbers on the Work page (one per line: value | label)<textarea id="s_stats" rows="7">${E((D.stats||[]).map(x=>x.v+' | '+x.l).join('\n'))}</textarea></label>${H.map(([n,l])=>`<label>${l}</label><textarea id="s_${n}" class="code" rows="10" spellcheck="false">${E(S[n])}</textarea>`).join('')}<div class="row"><button class="b" id="save">Save</button></div></section>`;
 $('#save').onclick=async()=>{[...I,...H].forEach(([n])=>S[n]=$('#s_'+n).value);D.stats=$('#s_stats').value.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{const r=l.split('|');return{v:r[0].trim(),l:r.slice(1).join('|').trim()}});await save()}}
const bad=e=>alert(e.message||e);
async function users(){const L=me.role==='admin'?Auth.list():[];
 $('#app').innerHTML=`<section class="ed wide"><h2>My account (${E(me.name)})</h2><label>Current password<input id="u_o" type="password" autocomplete="current-password"></label><label>New password<input id="u_n" type="password" autocomplete="new-password"></label><label>Repeat new password<input id="u_n2" type="password" autocomplete="new-password"></label><div class="row"><button class="b" id="u_cp">Change my password</button></div></section>
 ${me.role==='admin'?`<section class="ed wide"><h2>Users</h2><ul class="ul">${L.map(u=>`<li><span>${E(u.name)}<small>${u.role==='admin'?'Admin (everything)':'Editor (content only)'}</small></span><button class="b ghost" data-cp="${E(u.name)}">Change password</button><button class="b ghost" data-rm="${E(u.name)}">Delete</button></li>`).join('')}</ul>
 <h2>Add user</h2><label>Username<input id="n_u" autocomplete="off"></label><label>Password (6+ characters)<input id="n_p" type="password" autocomplete="new-password"></label><label>Role<select id="n_r"><option value="editor">Editor: content only</option><option value="admin">Admin: content + users</option></select></label><div class="row"><button class="b" id="n_add">Create user</button></div></section>`:''}`;
 $('#u_cp').onclick=async()=>{try{if($('#u_n').value!==$('#u_n2').value)throw new Error('Passwords do not match');if(!await Auth.verify(me.name,$('#u_o').value))throw new Error('Current password is wrong');await Auth.setPassword(me.name,$('#u_n').value);toast('Password changed ✓ (saved in data/users.js)');users()}catch(e){bad(e)}};
 const na=$('#n_add');if(na)na.onclick=async()=>{try{const c=await Auth.create($('#n_u').value,$('#n_p').value,$('#n_r').value);alert('User created.\n\nRecovery code (shown once, give it to the user):\n'+c);users()}catch(e){bad(e)}};
 document.querySelectorAll('[data-cp]').forEach(b=>b.onclick=async()=>{const p=prompt('New password for '+b.dataset.cp+' (6+ characters)');if(!p)return;try{await Auth.setPassword(b.dataset.cp,p);toast('Password changed ✓')}catch(e){bad(e)}});
 document.querySelectorAll('[data-rm]').forEach(b=>b.onclick=async()=>{if(!confirm('Delete user '+b.dataset.rm+'?'))return;try{await Auth.remove(b.dataset.rm);if(b.dataset.rm.toLowerCase()===me.name.toLowerCase()){Auth.logout();location.replace('login.html')}else users()}catch(e){bad(e)}})}
async function media(){const files=await Files.list();
 $('#app').innerHTML=`<section class="ed wide"><h2>Media library</h2><p>Files are saved in the real folders <code>uploads/videos</code>, <code>uploads/images</code> and <code>uploads/documents</code>.</p><label>Upload a video, image or document<input type="file" id="m_f"><progress id="m_p" max="100" hidden></progress></label><ul class="ul">${files.map(f=>`<li><span><a href="${E(f.path)}" target="_blank">${E(f.name)}</a><small>${E(f.path)} · ${(f.size/1048576).toFixed(2)} MB</small></span><button class="b ghost" data-cpy="${E(f.path)}">Copy path</button><button class="b ghost" data-fx="${E(f.path)}">Delete</button></li>`).join('')||'<li><span>No files yet</span></li>'}</ul></section>`;
 $('#m_f').onchange=async e=>{try{$('#m_p').hidden=false;await Files.upload(e.target.files[0],v=>$('#m_p').value=v);toast('Uploaded ✓')}catch(x){bad(x)}media()};
 document.querySelectorAll('[data-cpy]').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.cpy);toast('Path copied')});
 document.querySelectorAll('[data-fx]').forEach(b=>b.onclick=async()=>{if(confirm('Delete this file?')){try{await Files.del(b.dataset.fx)}catch(e){bad(e)}media()}})}
(async()=>{
 if(!Auth.has())return location.replace('setup.html');
 me=Auth.session();if(!me)return location.replace('login.html');
 try{await Connect.ensure();D=await Files.loadData()}catch(e){document.body.innerHTML='<p style="padding:60px;font-family:sans-serif">'+E(e.message)+'</p>';return}
 D.custom=D.custom||{};const B=Backend.get();
 $('#who').textContent='Signed in as '+me.name+' ('+me.role+') · saving to '+(B.kind==='github'?'GitHub '+B.label:'folder “'+B.label+'”');
 document.querySelectorAll('[data-admin]').forEach(b=>b.hidden=me.role!=='admin');
 $('#tabs').onclick=e=>{const b=e.target.closest('button');if(b){tab=b.dataset.t;cur=-1;render()}};
 $('#out').onclick=e=>{e.preventDefault();Auth.logout();location.replace('login.html')};
 $('#chg').onclick=async e=>{e.preventDefault();await Backend.forget();location.reload()};
 render()})();
