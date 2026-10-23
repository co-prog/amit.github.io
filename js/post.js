/* Article page: post.html?id=slug renders one article (its HTML comes from data/site-data.js) */
siteReady.then(D=>{
 const q=new URLSearchParams(location.search).get('id'),i=Math.max(0,D.posts.findIndex(x=>x.id===q)),p=D.posts[i];if(!p)return;
 const n=D.posts[(i+1)%D.posts.length];document.title=p.title+' — Amit Kumar';
 document.getElementById('postbox').innerHTML=`<a class="back" href="blog.html">← All notes</a><br><span class="tag">${esc(p.label||p.category)}</span><h1>${esc(p.title)}</h1><div class="meta">${esc(p.date)} · ${esc(p.read)} · By Amit Kumar</div><div class="body">${p.html||''}</div><a class="next" href="post.html?id=${encodeURIComponent(n.id)}"><span><small>Next article</small><b>${esc(n.title)}</b></span><span class="go">→</span></a>`;
});
