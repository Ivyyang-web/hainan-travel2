import{readFileSync,readdirSync,existsSync}from'node:fs';import{join}from'node:path';
for(const path of ['public/index.html','public/my/index.html','public/_routes.json','schema.sql'])if(!existsSync(path))throw Error('Missing '+path);
for(const page of ['public/index.html','public/my/index.html']){const html=readFileSync(page,'utf8');for(const m of html.matchAll(/(?:src|href)="(\/[\w./-]+)"/g)){if(m[1].startsWith('/api/'))continue;if(!existsSync('public'+m[1])&&!existsSync('public'+m[1]+'/index.html'))throw Error('Missing asset '+m[1])}if(html.includes('appgprj_'))throw Error('Internal Site metadata leaked')}
JSON.parse(readFileSync('public/_routes.json'));JSON.parse(readFileSync('public/scenes/credits.json'));console.log('Static assets, routes, credits and clean export verified.');
