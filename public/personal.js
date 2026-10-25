'use strict';
(()=>{
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)],escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yuan=fen=>'¥'+(fen/100).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2});
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let memories=[],records=[],busy=false,ready=false,nickname='',editing=null,username='';
q('#journal-date').value=today>='2026-10-29'&&today<='2026-11-06'?today:'2026-10-29';
const date=()=>q('#journal-date').value,city=d=>d<='2026-10-31'?'三亚':d<='2026-11-03'?'万宁':'海口';
function status(t,error=false){q('#journal-status').textContent=t;q('#journal-status').classList.toggle('error',error)}
function lock(v){busy=v;qa('main button,main input,main select,main textarea,#record-dialog button,#record-dialog input,#record-dialog textarea').forEach(x=>x.disabled=v||(!ready&&!x.closest('#profile-form')))}
async function api(action,data={}){const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),15000);try{const r=await fetch('/api/personal',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',signal:ctl.signal,body:JSON.stringify({action,...data,username})});const d=await r.json();if(!r.ok){const err=Error(d.error||'服务暂时不可用');throw err}return d}finally{clearTimeout(timer)}}
async function change(action,data={}){if(busy)return false;lock(true);status(action==='load'?'正在读取云端记录…':'正在保存…');try{const d=await api(action,data);records=d.records;memories=d.memories||[];nickname=d.nickname;ready=true;render();status(action==='load'?'已读取云端记录。':'已保存到云端 · '+new Date().toLocaleTimeString('zh-CN',{timeZone:'Asia/Shanghai'}));return true}catch(e){status(e.name==='AbortError'?'请求超时，保存结果未确认。请先刷新核对记录，再决定是否重试。':e.message,true);return false}finally{lock(false);q('#refresh-records').disabled=false}}
function actions(r,extra=''){return `<div class="record-actions"><button data-edit="${r.id}" type="button">修改</button><button data-remove="${r.id}" type="button">删除</button>${extra}</div>`}
function dueLabel(r){return r.dueAt?new Date(r.dueAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false})+' 北京时间':'未设时间'}
function render(){
 q('#nickname').textContent=nickname||'我';q('#profile-name').value=nickname;document.title=(nickname||'我')+'的海南旅行手记';
 const pack=records.filter(r=>r.kind==='packing'),expenses=records.filter(r=>r.kind==='expense'),dayExpenses=expenses.filter(r=>r.day===date());
 q('#total-money').textContent=yuan(expenses.reduce((s,r)=>s+r.amountFen,0));q('#selected-money').textContent=yuan(dayExpenses.reduce((s,r)=>s+r.amountFen,0));q('#selected-label').textContent=date()+' 支出';q('#expense-count').textContent=expenses.length+' 笔支出';q('#packing-summary').textContent=pack.filter(r=>r.done).length+' / '+pack.length;q('#packing-count').textContent=pack.filter(r=>r.done).length+'/'+pack.length;
 q('#day-city').textContent=date()>='2026-10-29'&&date()<='2026-11-06'?city(date())+' · 海南行程':'行程以外日期';
 for(const kind of ['packing','reminder','memo']){const rows=records.filter(r=>r.kind===kind).sort((a,b)=>a.done-b.done);q('#'+kind+'-list').innerHTML=rows.length?rows.map(r=>`<li class="${r.done?'done':''}"><label><input type="checkbox" data-toggle="${r.id}" ${r.done?'checked':''}><span class="item-title">${escape(r.title)}${kind==='reminder'?`<small class="${!r.done&&r.dueAt&&Date.parse(r.dueAt)<=Date.now()?'overdue':''}">${escape(dueLabel(r))}${!r.done&&r.dueAt&&Date.parse(r.dueAt)<=Date.now()?' · 已到期':''}</small>`:''}</span></label>${actions(r)}</li>`).join(''):'<li class="empty">还没有记录，添加第一条吧。</li>'}
 q('#meal-cards').innerHTML=['breakfast','lunch','dinner'].map((slot,i)=>{
 const meals=records.filter(r=>r.kind==='meal'&&r.day===date()&&r.slot===slot);
 return `<article class="meal-card"><h3>${['早餐','午餐','晚餐'][i]}</h3>${meals.length?meals.map(r=>{const query=[r.day>='2026-10-29'&&r.day<='2026-11-06'?city(r.day):'',r.venue,r.address].filter(Boolean).join(' '),url='https://api.map.baidu.com/place/search?query='+encodeURIComponent(query)+'&region='+encodeURIComponent(r.day>='2026-10-29'&&r.day<='2026-11-06'?city(r.day):'海南')+'&output=html&src=webapp.hainan.journal';return `<div class="meal-entry"><strong>${escape(r.title)}</strong><p>${escape(r.venue||'未填写店名')}<br>${escape(r.address||'未填写地址')}</p>${actions(r,(r.venue||r.address)?`<a href="${escape(url)}" target="_blank" rel="noopener">百度地图检索 ↗</a>`:'')}</div>`}).join(''):'<p class="empty">这一餐，等你来记。</p>'}<form class="stack meal-form" data-slot="${slot}"><input name="id" type="hidden"><label>吃了什么<input name="title" maxlength="120" required placeholder="例如：海南粉、清补凉"></label><label>店名<input name="venue" maxlength="120" placeholder="例如：酒店早餐厅"></label><label>地址 / 所在位置<input name="address" maxlength="200" placeholder="城市、街道、门牌或商场楼层"></label><div class="inline"><button class="primary">记录这餐</button><button class="meal-cancel" type="button" hidden>取消修改</button></div></form></article>`}).join('');
 const visible=q('#expense-filter').value==='all'?expenses:dayExpenses;
 const sums={};for(const r of visible)sums[r.category]=(sums[r.category]||0)+r.amountFen;
 q('#category-totals').innerHTML=Object.entries(sums).map(([k,v])=>`<span>${escape(k)} ${yuan(v)}</span>`).join('');
 q('#expense-list').innerHTML=visible.length?visible.slice().sort((a,b)=>b.day.localeCompare(a.day)||b.createdAt.localeCompare(a.createdAt)).map(r=>`<li><span class="money">${yuan(r.amountFen)}</span><strong>${escape(r.title)}</strong><small>${escape(r.day)} · ${escape(r.category)}</small>${actions(r)}</li>`).join(''):'<li class="empty">这个范围还没有支出。总金额仅统计已录入的支出。</li>';
 qa('[data-toggle]').forEach(b=>b.onchange=async()=>{if(!await change('toggle',{id:b.dataset.toggle,done:b.checked}))b.checked=!b.checked});
 qa('[data-remove]').forEach(b=>b.onclick=()=>{const r=records.find(r=>r.id===b.dataset.remove);if(confirm('删除“'+r.title+'”？'))change('remove',{id:r.id})});
 qa('[data-edit]').forEach(b=>b.onclick=()=>edit(records.find(r=>r.id===b.dataset.edit)));
 qa('.meal-form').forEach(f=>{f.onsubmit=async e=>{e.preventDefault();const v=Object.fromEntries(new FormData(f));await change('save',{...v,kind:'meal',slot:f.dataset.slot,day:date()})};f.querySelector('.meal-cancel').onclick=render});
 renderMemories();
}
function memoryStatus(text,error=false){q('#memory-status').textContent=text;q('#memory-status').classList.toggle('memory-status-error',error)}
let previewURLs=[];
function clearPreviews(){previewURLs.forEach(u=>URL.revokeObjectURL(u));previewURLs=[];q('#memory-preview').innerHTML=''}
function resetMemory(){q('#memory-form').reset();q('#memory-form').elements.id.value=crypto.randomUUID();q('#memory-form').elements.day.value=date();q('#memory-kept').innerHTML='';clearPreviews();q('#memory-heading').textContent='写一篇旅行日记';q('#memory-cancel').hidden=true;memoryStatus('')}
function renderMemories(){
 q('#memory-count').textContent=memories.length+'篇日记 · '+memories.reduce((n,m)=>n+m.photos.length,0)+'张照片';
 const visible=q('#memory-filter').value==='day'?memories.filter(m=>m.day===date()):memories;
 q('#memory-list').innerHTML=visible.length?visible.map(m=>`<article class="memory-card"><small>${escape(m.day)} · ${escape(nickname)}</small><h4>${escape(m.place||'旅行中的一刻')}</h4>${m.feeling?`<p>${escape(m.feeling)}</p>`:''}<div class="memory-photo-grid ${m.photos.length===1?'one':''}">${m.photos.map((key,i)=>`<button type="button" data-memory-photo="${escape(key)}" aria-label="放大第${i+1}张照片"><img src="/api/photos/${escape(key)}" loading="lazy" alt="${escape(m.place||'旅行记录')} · 第${i+1}张照片"></button>`).join('')}</div><div class="record-actions"><button type="button" data-memory-edit="${m.id}">修改日记</button><button type="button" data-memory-remove="${m.id}">删除日记</button></div></article>`).join(''):'<div class="memory-empty"><strong>相册的第一页，留给你。</strong>拍下眼前的风景，写一句当下的感受。<br>保存后就会出现在这里。</div>';
 qa('[data-memory-photo]').forEach(b=>b.onclick=()=>{q('#memory-lightbox img').src='/api/photos/'+b.dataset.memoryPhoto;q('#memory-lightbox').showModal()});
 qa('[data-memory-edit]').forEach(b=>b.onclick=()=>{const m=memories.find(m=>m.id===b.dataset.memoryEdit),f=q('#memory-form');resetMemory();for(const key of ['id','day','place','feeling'])f.elements[key].value=m[key];q('#memory-heading').textContent='修改这篇旅行日记';q('#memory-cancel').hidden=false;q('#memory-kept').innerHTML=m.photos.map(key=>`<label><img src="/api/photos/${escape(key)}" alt="已保存照片"><span><input type="checkbox" value="${escape(key)}" checked>保留这张</span></label>`).join('');f.scrollIntoView({behavior:'smooth',block:'center'})});
 qa('[data-memory-remove]').forEach(b=>b.onclick=async()=>{if(busy||!confirm('删除这篇日记及其照片？'))return;const data=new FormData();data.set('username',username);data.set('action','remove');data.set('id',b.dataset.memoryRemove);await saveMemoryRequest(data,false)});
}
async function compressPhoto(file){
 if(file.size>25*1024*1024)throw Error('原始照片超过25MB，请先缩小后上传。');
 if(!file.type.startsWith('image/')||file.type==='image/svg+xml')throw Error('请选择JPEG、PNG、WebP或手机照片。');
 const url=URL.createObjectURL(file),image=new Image();
 try{
  await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error('无法读取“'+file.name+'”。HEIC照片请先转为JPEG。'));image.src=url});
  const scale=Math.min(1,1280/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));const ctx=canvas.getContext('2d');if(!ctx)throw Error('无法处理照片，请换浏览器重试。');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
  const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.72));canvas.width=1;canvas.height=1;if(!blob||blob.size>512*1024)throw Error('照片压缩后仍超过512KB，请缩小后再试。');return blob;
 }finally{URL.revokeObjectURL(url);image.src=''}
}
async function saveMemoryRequest(data,reset){
 if(busy)return false;lock(true);memoryStatus(data.get('action')==='remove'?'正在删除日记…':'正在处理照片并保存…');
 const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),60000);
 try{
  const raw=data.getAll('photos').filter(f=>typeof f!=='string'&&f.size);data.delete('photos');
  for(let i=0;i<raw.length;i++){memoryStatus('正在压缩照片 '+(i+1)+' / '+raw.length+'…');data.append('photos',await compressPhoto(raw[i]),'travel-'+i+'.jpg')}
  memoryStatus(data.get('action')==='remove'?'正在删除…':'照片已处理，正在保存到云端…');
  const r=await fetch('/api/memories',{method:'POST',body:data,signal:ctl.signal}),result=await r.json();if(!r.ok)throw Error(result.error||'保存未完成，请重试。');
  lock(false);const loaded=await change('load');
  if(reset&&loaded)resetMemory();
  memoryStatus(loaded?'已保存到云端。':'操作已提交，但刷新记录失败。请先刷新核对后再操作。',!loaded);return true;
 }catch(e){memoryStatus(e.name==='AbortError'?'上传超时，结果未确认。请刷新核对后再重试，避免重复保存。':e.message,true);return false}finally{clearTimeout(timer);lock(false)}
}
q('#memory-form').onsubmit=async e=>{e.preventDefault();if(busy)return;const data=new FormData(e.target),keep=qa('#memory-kept input:checked').map(x=>x.value),files=data.getAll('photos').filter(f=>typeof f!=='string'&&f.size);if(keep.length+files.length>6){memoryStatus('每篇最多6张照片，请先减少新照片或取消保留旧照片。',true);return}data.set('keep',JSON.stringify(keep));data.set('action','save');data.set('username',username);await saveMemoryRequest(data,true)};
q('#memory-files').onchange=()=>{clearPreviews();const files=[...q('#memory-files').files];if(files.length>6){memoryStatus('一次最多选择6张照片。',true);q('#memory-files').value='';return}for(const file of files){const url=URL.createObjectURL(file);previewURLs.push(url);const image=document.createElement('img');image.src=url;image.alt='待上传：'+file.name;q('#memory-preview').append(image)}memoryStatus(files.length?'已选择'+files.length+'张，保存时自动压缩上传。':'')};
q('#memory-cancel').onclick=resetMemory;q('#memory-filter').onchange=renderMemories;
q('#memory-lightbox button').onclick=()=>q('#memory-lightbox').close();q('#memory-lightbox').onclick=e=>{if(e.target===q('#memory-lightbox'))q('#memory-lightbox').close()};

function edit(r){if(busy)return;if(r.kind==='expense'){const f=q('#expense-form');for(const key of ['id','day','title','category'])f.elements[key].value=r[key];f.elements.amount.value=(r.amountFen/100).toFixed(2);q('#expense-heading').textContent='修改支出';q('#cancel-expense').hidden=false;f.scrollIntoView({behavior:'smooth',block:'center'});return}
 if(r.kind==='meal'){const f=q('.meal-form[data-slot="'+r.slot+'"]');for(const k of ['id','title','venue','address'])f.elements[k].value=r[k];f.querySelector('.primary').textContent='保存修改';f.querySelector('.meal-cancel').hidden=false;f.elements.title.focus();return}
 editing=r;const f=q('#record-form');f.elements.title.value=r.title;f.elements.title.maxLength=r.kind==='memo'?2000:120;f.elements.due.value=r.dueAt?new Date(Date.parse(r.dueAt)+8*3600000).toISOString().slice(0,16):'';q('#edit-due-label').hidden=r.kind!=='reminder';q('#record-dialog').showModal();
}
async function openUser(name){
 if(busy)return false;
 name=name.normalize('NFKC').trim().toLocaleLowerCase('en-US');
 if(!/^[\p{L}\p{N}_-]{2,24}$/u.test(name)){status('请输入2—24位中文、字母、数字、_ 或 -。',true);return false}
 const previous=username;username=name;
 if(!await change('load')){username=previous;return false}
 try{localStorage.setItem('hainan-nickname',name)}catch{}
 history.replaceState(null,'','/my?name='+encodeURIComponent(name));
 q('#packing-form').reset();q('#reminder-form').reset();q('#memo-form').reset();resetExpense();resetMemory();editing=null;q('#record-dialog').close();return true;
}
q('#profile-form').onsubmit=async e=>{e.preventDefault();await openUser(q('#profile-name').value)};
q('#memo-form').onsubmit=async e=>{e.preventDefault();const f=e.target;if(await change('save',{kind:'memo',title:f.elements.title.value}))f.reset()};
q('#packing-form').onsubmit=async e=>{e.preventDefault();const f=e.target,title=f.elements.title.value;if(await change('save',{kind:'packing',title}))f.reset()};
q('#reminder-form').onsubmit=async e=>{e.preventDefault();const f=e.target,due=f.elements.due.value;if(await change('save',{kind:'reminder',title:f.elements.title.value,dueAt:due?new Date(due+':00+08:00').toISOString():null}))f.reset()};
qa('[data-pack]').forEach(b=>b.onclick=()=>change('save',{kind:'packing',title:b.dataset.pack}));
q('#record-form').onsubmit=async e=>{e.preventDefault();const f=e.target,due=f.elements.due.value;if(await change('save',{...editing,title:f.elements.title.value,dueAt:editing.kind==='reminder'&&due?new Date(due+':00+08:00').toISOString():null}))q('#record-dialog').close()};
q('#close-record').onclick=()=>q('#record-dialog').close();
function resetExpense(){q('#expense-form').reset();q('#expense-form').elements.id.value='';q('#expense-form').elements.day.value=date();q('#expense-heading').textContent='记一笔支出';q('#cancel-expense').hidden=true}
q('#expense-form').onsubmit=async e=>{e.preventDefault();const values=Object.fromEntries(new FormData(e.target));if(await change('save',{...values,kind:'expense'}))resetExpense()};q('#cancel-expense').onclick=resetExpense;
q('#journal-date').onchange=()=>{if(!date()){status('请选择有效的记录日期。',true);return}render();resetExpense()};q('#expense-filter').onchange=render;q('#refresh-records').onclick=()=>change('load');
lock(true);busy=false;
(async()=>{let name=new URLSearchParams(location.search).get('name');if(!name){try{name=localStorage.getItem('hainan-nickname')}catch{}}if(name){q('#profile-name').value=name;await openUser(name)}else{lock(false);status('先输入你的用户名，打开自己的记录。');q('#profile-name').focus();resetExpense()}})();
setInterval(()=>{if(!ready||document.hidden)return;qa('[data-toggle]').forEach(input=>{const r=records.find(r=>r.id===input.dataset.toggle);if(r?.kind==='reminder'&&!r.done&&r.dueAt&&Date.parse(r.dueAt)<=Date.now()){const label=input.closest('label').querySelector('small');if(label&&!label.classList.contains('overdue')){label.classList.add('overdue');label.textContent+=' · 已到期'}}})},30000);
})();
