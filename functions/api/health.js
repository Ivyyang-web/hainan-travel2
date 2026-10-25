export async function onRequestGet({env}){
 if(!env.DB)return Response.json({ready:false,message:'尚未绑定 DB，请在 Cloudflare Pages 设置中绑定 D1 数据库并重新部署。'},{status:503});
 try{const r=await env.DB.prepare("SELECT COUNT(*) AS n FROM sqlite_master WHERE type='table' AND name IN ('companion_records','travel_memories','diary_photos')").all();const ready=Number(r.results[0]?.n)===3;return Response.json({ready,message:ready?'数据服务已就绪。':'请先在 D1 数据库控制台执行 schema.sql。'},{status:ready?200:503,headers:{'Cache-Control':'no-store'}})}catch{return Response.json({ready:false,message:'数据库暂不可用。'},{status:503})}
}
