/* Blog list page: render posts from posts-data.js, then filter */
siteReady.then(D=>{document.getElementById('posts').innerHTML=D.posts.map(p=>`<a class="post" data-c="${esc(p.category)}" href="post.html?id=${encodeURIComponent(p.id)}"><time>${esc(p.date)}</time><div><h2>${esc(p.title)}</h2><p>${esc(p.summary)}</p></div><span class="rd">${esc(p.read)}</span></a>`).join('')});
document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 document.querySelectorAll('.post').forEach(p=>p.hidden=!(b.dataset.f==='all'||p.dataset.c===b.dataset.f))}));
