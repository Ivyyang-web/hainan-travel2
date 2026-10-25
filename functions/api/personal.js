import {POST} from '../../lib/personal.js';
export async function onRequestPost({request,env}){
 if(!env.DB)return Response.json({error:'数据服务尚未连接。请完成 D1 数据库初始化与 DB 绑定后重试。'},{status:503,headers:{'Cache-Control':'no-store'}});
 return POST(request,env);
}
