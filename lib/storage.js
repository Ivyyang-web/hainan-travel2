// Small-trip photo storage in D1; an optional R2 BUCKET binding can replace it.
// 500 photos x 512 KiB < 250 MiB, leaving room under a Free D1 database's 500 MB limit.
export function withPhotoStorage(env){
 if(env.BUCKET||!env.DB)return env;
 const db=env.DB;
 return {...env,BUCKET:{
  async put(key,bytes){
   if(bytes.byteLength>512*1024)throw Error('Photo too large');
   const result=await db.prepare('INSERT INTO diary_photos(key,bytes) SELECT ?,? WHERE (SELECT COUNT(*) FROM diary_photos)<500').bind(key,bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)).run();
   if(!result.meta?.changes)throw Error('Photo limit reached');
  },
  async get(key){const result=await db.prepare('SELECT bytes FROM diary_photos WHERE key=?').bind(key).all();const row=result.results[0];return row?{body:new Uint8Array(row.bytes)}:null},
  async delete(key){await db.prepare('DELETE FROM diary_photos WHERE key=?').bind(key).run()}
 }};
}
