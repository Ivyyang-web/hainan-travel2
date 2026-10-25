

const reply=(data        ,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
async function boundedForm(request        ){
 const limit=13*1024*1024;
 if(Number(request.headers.get('content-length'))>limit)throw Error('SIZE');
 const reader=request.body?.getReader();if(!reader)throw Error('FORMAT');
 const chunks             =[];let size=0;
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw Error('SIZE')}chunks.push(value)}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.byteLength}
 return new Response(bytes,{headers:{'Content-Type':request.headers.get('content-type')||''}}).formData();
}
function format(data           ){
 if(data.length>3&&data[0]===255&&data[1]===216&&data[2]===255)return 'jpg';
 if(data.length>8&&[137,80,78,71,13,10,26,10].every((v,i)=>data[i]===v))return 'png';
 if(data.length>12&&String.fromCharCode(...data.slice(0,4))==='RIFF'&&String.fromCharCode(...data.slice(8,12))==='WEBP')return 'webp';
 return '';
}
export async function POST(request        ,env    ){
 if(request.headers.get('origin')!==new URL(request.url).origin)return reply({error:'请在本站上传和保存。'},403);
 let form         ;try{form=await boundedForm(request)}catch(e){return reply({error:e instanceof Error&&e.message==='SIZE'?'一次上传请控制在1512KB以内。':'上传格式无效，请重新选择照片。'},400)}
 const str=(key       ,n       )=>String(form.get(key)||'').normalize('NFKC').trim().slice(0,n);
 const owner=str('username',100).toLocaleLowerCase('en-US'),id=str('id',80),action=str('action',10);
 if(!/^[\p{L}\p{N}_-]{2,24}$/u.test(owner)||!uuid.test(id))return reply({error:'请先选择有效用户名和日记。'},400);
 if(!['save','remove'].includes(action))return reply({error:'不支持的操作。'},400);
 const db=env.DB,bucket=env.BUCKET;if(!db||!bucket)return reply({error:'照片存储暂时不可用，请稍后重试。'},503);
 const uploaded         =[];
 try{
 const result=await db.prepare('SELECT owner_id,photo_keys FROM travel_memories WHERE id=?').bind(id).all();const current=result.results[0]       ;
 if(current&&current.owner_id!==owner)return reply({error:'这条日记不在当前用户名下。'},404);
 const oldKeys         =current?JSON.parse(current.photo_keys):[];
 if(action==='remove'){
  if(!current)return reply({error:'日记不存在或已删除。'},404);
  await db.prepare('DELETE FROM travel_memories WHERE id=? AND owner_id=?').bind(id,owner).run();
  await Promise.allSettled(oldKeys.map(k=>bucket.delete(k)));return reply({ok:true});
 }
 const day=str('day',10),place=str('place',120),feeling=str('feeling',4000);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day))||new Date(day).toISOString().slice(0,10)!==day)return reply({error:'请填写有效日期。'},400);
 let keep         ;try{const value=JSON.parse(str('keep',2000)||'[]');if(!Array.isArray(value)||!value.every(k=>typeof k==='string'&&oldKeys.includes(k)))throw Error();keep=[...new Set(value)]}catch{return reply({error:'保留照片列表无效，请刷新后重试。'},400)}
 const files=form.getAll('photos').filter((v)          =>typeof v!=='string'&&v.size>0);
 if(keep.length+files.length>6)return reply({error:'每篇最多6张照片。'},400);
 if(!feeling&&!place&&!files.length&&!keep.length)return reply({error:'写点感受、地点或添加一张照片再保存。'},400);
 if(!current){const count=await db.prepare('SELECT count(*) AS n FROM travel_memories WHERE owner_id=?').bind(owner).all();if(Number(count.results[0]?.n)>=200)return reply({error:'最多保存200篇日记，请先整理旧记录。'},400)}
 const prepared                                            =[];
 for(const file of files){if(file.size>512*1024)return reply({error:'单张照片请控制在512KB以内，页面会自动压缩。'},400);const bytes=new Uint8Array(await file.arrayBuffer()),ext=format(bytes);if(!ext)return reply({error:'照片需为有效的JPEG、PNG或WebP。HEIC请先转为JPEG。'},400);prepared.push({key:crypto.randomUUID()+'.'+ext,bytes,mime:ext==='jpg'?'image/jpeg':'image/'+ext})}
 for(const photo of prepared){await bucket.put(photo.key,photo.bytes,{httpMetadata:{contentType:photo.mime}});uploaded.push(photo.key)}
 const keys=[...keep,...uploaded];
 if(current)await db.prepare('UPDATE travel_memories SET day=?,place=?,feeling=?,photo_keys=? WHERE id=? AND owner_id=?').bind(day,place,feeling,JSON.stringify(keys),id,owner).run();
 else await db.prepare('INSERT INTO travel_memories(id,owner_id,day,place,feeling,photo_keys,created_at) VALUES(?,?,?,?,?,?,?)').bind(id,owner,day,place,feeling,JSON.stringify(keys),new Date().toISOString()).run();
 await Promise.allSettled(oldKeys.filter(k=>!keep.includes(k)).map(k=>bucket.delete(k)));
 return reply({ok:true,id});
 }catch{await Promise.allSettled(uploaded.map(k=>bucket.delete(k)));return reply({error:'保存未完成，请刷新核对后重试；未确认前不要关闭本页。'},503)}
}
