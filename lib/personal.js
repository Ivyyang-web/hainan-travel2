

const reply=(data        ,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie'}});
const clean=(v        ,n=120)=>typeof v==='string'?v.normalize('NFKC').trim().slice(0,n):'';
export async function POST(request        ,env    ){
  if(request.headers.get('origin')!==new URL(request.url).origin)return reply({error:'请求来源无效，请在本站操作。'},403);
  let b    ;try{b=await request.json()}catch{return reply({error:'请求格式无效。'},400)}
  if(!b||typeof b!=='object')return reply({error:'请求格式无效。'},400);
  const owner=clean(b.username,100).toLocaleLowerCase('en-US');
  if(!/^[\p{L}\p{N}_-]{2,24}$/u.test(owner))return reply({error:'用户名请输入2—24位中文、字母、数字、_ 或 -。'},400);
  const db=env.DB;
  const all=async()=>{
    const records=await db.prepare('SELECT id,kind,day,slot,title,venue,address,category,amount_fen AS amountFen,done,due_at AS dueAt,created_at AS createdAt FROM companion_records WHERE owner_id=? ORDER BY created_at,id').bind(owner).all();
    const memories=await db.prepare('SELECT id,day,place,feeling,photo_keys AS photoKeys,created_at AS createdAt FROM travel_memories WHERE owner_id=? ORDER BY day DESC,created_at DESC').bind(owner).all();
    const rows=records.results         ;
    return reply({nickname:owner,records:rows,memories:memories.results.map((m    )=>({...m,photos:JSON.parse(m.photoKeys),photoKeys:undefined})),totalFen:rows.filter(r=>r.kind==='expense').reduce((s,r)=>s+r.amountFen,0)});
  };
  try{
    if(b.action==='load')return await all();
    if(!['save','remove','toggle'].includes(b.action))return reply({error:'不支持的操作。'},400);
    const id=clean(b.id,80);let existing    ;
    if(id){const r=await db.prepare('SELECT kind FROM companion_records WHERE id=? AND owner_id=?').bind(id,owner).all();existing=r.results[0];if(!existing)return reply({error:'这条记录不在当前用户名下。'},404)}
    if(b.action==='remove'||b.action==='toggle'){
      if(!id)return reply({error:'请选择记录。'},400);
      if(b.action==='remove')await db.prepare('DELETE FROM companion_records WHERE id=? AND owner_id=?').bind(id,owner).run();
      else {if(!['packing','reminder','memo'].includes(existing.kind)||typeof b.done!=='boolean')return reply({error:'操作不适用。'},400);await db.prepare('UPDATE companion_records SET done=? WHERE id=? AND owner_id=?').bind(b.done?1:0,id,owner).run()}
      return await all();
    }
    const kind=clean(b.kind),title=clean(b.title,kind==='memo'?2000:120);
    if(!['packing','reminder','memo','meal','expense'].includes(kind)||!title||(existing&&existing.kind!==kind))return reply({error:'请填写有效的内容。'},400);
    const day=clean(b.day,10),slot=clean(b.slot,12),venue=clean(b.venue),address=clean(b.address,200),category=clean(b.category,20);
    if(['meal','expense'].includes(kind)&&(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day))||new Date(day).toISOString().slice(0,10)!==day))return reply({error:'请填写有效日期。'},400);
    if(kind==='meal'&&!['breakfast','lunch','dinner'].includes(slot))return reply({error:'请选择早餐、午餐或晚餐。'},400);
    let fen=0;
    if(kind==='expense'){
      const amount=typeof b.amount==='string'?b.amount.trim():'';
      if(!/^\d{1,7}(\.\d{1,2})?$/.test(amount))return reply({error:'金额请填写正数，最多两位小数。'},400);
      const [yuan,cents='']=amount.split('.');fen=Number(yuan)*100+Number(cents.padEnd(2,'0'));
      if(fen<=0||fen>999999999||!['交通','住宿','餐饮','门票','购物','其他'].includes(category))return reply({error:'请填写有效金额和支出分类。'},400);
    }
    const due=kind==='reminder'&&b.dueAt?clean(b.dueAt,40):null;
    if(due&&!Number.isFinite(Date.parse(due)))return reply({error:'提醒时间无效。'},400);
    if(id)await db.prepare('UPDATE companion_records SET title=?,day=?,slot=?,venue=?,address=?,category=?,amount_fen=?,due_at=? WHERE id=? AND owner_id=?').bind(title,day,slot,venue,address,category,fen,due,id,owner).run();
    else {
      const count=await db.prepare('SELECT count(*) AS n FROM companion_records WHERE owner_id=?').bind(owner).all();
      if(Number(count.results[0]?.n)>=3000)return reply({error:'记录已达3000条，请先整理旧记录。'},400);
      await db.prepare('INSERT INTO companion_records(id,owner_id,kind,day,slot,title,venue,address,category,amount_fen,done,due_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,0,?,?)').bind(crypto.randomUUID(),owner,kind,day,slot,title,venue,address,category,fen,due,new Date().toISOString()).run();
    }
    return await all();
  }catch{return reply({error:'暂时无法保存，请刷新后核对记录再试。'},503)}
}
