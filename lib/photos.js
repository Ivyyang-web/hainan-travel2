

export async function GET(request        ,env    ){
 const key=new URL(request.url).pathname.split('/').pop()||'';
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/.test(key))return new Response('Not found',{status:404});
 try{const photo=await env.BUCKET?.get(key);if(!photo)return new Response('Not found',{status:404});return new Response(photo.body,{headers:{'Content-Type':key.endsWith('.jpg')?'image/jpeg':key.endsWith('.png')?'image/png':'image/webp','X-Content-Type-Options':'nosniff','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; sandbox"}})}catch{return new Response('Unavailable',{status:503})}
}
