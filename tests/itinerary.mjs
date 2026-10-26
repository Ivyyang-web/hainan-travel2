import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const defaults={'#lunch':'heng','#sunset':'sky','#oct30-mode':'island','#xinglong-extra':'none','#haikou-west':'coast'};
const nodes=new Map();function el(k){if(!nodes.has(k))nodes.set(k,{value:defaults[k]||'',checked:false,innerHTML:'',textContent:'',hidden:false,dataset:{},style:{},classList:{toggle(){}},setAttribute(){},getAttribute(){return null},removeAttribute(){},scrollIntoView(){},showModal(){},close(){}});return nodes.get(k)}
const c={URLSearchParams,AbortController,Date,document:{querySelector:el,querySelectorAll:()=>[],head:{append(){}},createElement:()=>({})},localStorage:{getItem:()=>null,setItem(){}},setTimeout:()=>0,clearTimeout(){},window:{},location:{origin:'https://test.site'},fetch:async()=>({ok:true,json:async()=>({daily:{time:['2026-10-29','2026-10-30','2026-10-31','2026-11-01']}})})};vm.createContext(c);
for(const f of ['route-data.js','itinerary.js','scene-credits.js','app.js','weather.js'])vm.runInContext(fs.readFileSync('public/'+f,'utf8'),c);
const run=s=>vm.runInContext(s,c);const points=run('POINTS');const dates=run('DAY_INFO');assert.equal(dates.length,9);assert.equal(dates[0].date,'2026-10-29');assert.equal(dates[8].date,'2026-11-06');
function check(i){run(`day=${i}`);const steps=run('itinerary()');let end=0;for(const s of steps){assert(points[s.point],`missing ${s.point}`);if(s.from)assert(points[s.from]);if(s.to)assert(points[s.to]);const [start,finish]=s.time.split('–').map(t=>Number(t.slice(0,2))*60+Number(t.slice(3)));assert(start>=end,`${i} overlap at ${s.title}`);assert(finish>=start);end=finish;if(s.travel)assert(!points[s.from].offshore&&!points[s.to].offshore,'boat represented as road');}return steps;}
for(let i=0;i<9;i++)check(i);
let s=check(2);assert(!s.some(x=>x.boat));assert.deepEqual(Array.from(s.filter(x=>!x.travel&&['dadong','xiaodong','luhuitou','sybay'].includes(x.point)&&x.tag!=='午餐').map(x=>x.point)),['dadong','xiaodong','luhuitou','sybay']);
for(const opt of ['none','bali','moon']){el('#xinglong-extra').value=opt;s=check(4);assert.equal(s.find(x=>x.to==='fenshen').from,opt==='none'?'botanic':opt);assert(s.some(x=>x.point==='fenshen'&&x.tag==='午餐'));assert(s.some(x=>x.point==='jianghu'&&x.tag==='晚餐'));}
for(const option of ['coast','village','cdf']){el('#haikou-west').value=option;check(7)}
for(const sunset of ['sky','cloud'])for(const skip of [true,false]){el('#sunset').value=sunset;el('#skip-park').checked=skip;s=check(6);assert.equal(s.some(x=>x.point==='shibei'),!skip);}
run('day=1');s=run('itinerary()');assert.equal(s.filter(x=>x.boat).length,2);assert(s.some(x=>x.title.includes('提前排队返船')&&x.time.startsWith('11:00')));assert(s.find(x=>x.tag==='午餐').time==='12:40–13:20');el('#oct30-mode').value='direct';assert(!check(1).some(x=>x.boat));el('#oct30-mode').value='island';assert(s.some(x=>x.time==='14:00–16:00'&&x.point==='sycdf'));
assert.equal(run("route('systation','syhotel').includes('destination_region='+encodeURIComponent('三亚'))"),true);
assert(run("route('shenzhou','wnstay')").includes(encodeURIComponent('睿悦')));assert(run("route('east','hkstay')").includes(encodeURIComponent('文明中路2号')));run("stays.wnstay='石梅湾测试酒店 某路1号'");assert(run("route('shenzhou','wnstay')").includes(encodeURIComponent('石梅湾测试酒店')));
assert(run("place('sycdf')").includes(encodeURIComponent('三亚')));assert(run("place('book')").includes(encodeURIComponent('万宁')));
assert.equal(run("route('wuzhidock','wuzhi')"),'');assert(el('#weather-cards').innerHTML.includes('11月06日'));
run('chooseDay(8)');assert(el('#timeline').innerHTML.includes('10:00–12:10'));assert(el('#timeline').innerHTML.includes('07:45–08:30'));
console.log('PASS: 9 dates, all default/alternate time blocks non-overlapping, correct city navigation, confirmed/custom hotel routing, no road navigation to islands, event protected, airport buffers and 9-day weather cards.');

for(let i=0;i<8;i++){const steps=check(i);for(const [meal,lo,hi] of [['午餐',11,13],['晚餐',17,19]]){const found=steps.find(x=>x.tag.includes(meal));assert(found,`day ${i+1} missing ${meal}`);const hour=Number(found.time.slice(0,2));assert(hour>=lo&&hour<=hi,`day ${i+1} late ${meal}`)}}
run('day=0');const first=run('itinerary()');assert(first.findIndex(x=>x.tag==='午餐')<first.findIndex(x=>x.rail));assert(!first.some(x=>x.point==='tianya'||x.point==='tianyastreet'));run('day=1');const evening=run('itinerary()');assert(evening.findIndex(x=>x.point==='tianyastreet'&&!x.travel)<evening.findIndex(x=>x.point==='diadia'&&x.tag==='晚餐'));console.log('PASS: lunch before first train, dinner before night visit; eight touring days have explicit timely lunch/dinner.');

assert(!points.forest);assert.equal(run("route('xidock','xidao')"),'');assert(run("route('dadong','xiaodong')").includes(encodeURIComponent('小东海')));assert(!fs.readFileSync('public/index.html','utf8').includes('surf-option'));
const transfer=check(3);assert(transfer.some(x=>x.rail&&x.time==='08:40–09:16'));assert(transfer.some(x=>x.point==='wnstay'&&x.title.includes('寄存')));assert(transfer.some(x=>x.point==='hupo'&&x.tag==='午餐'));assert(transfer.some(x=>x.point==='wnvinegar'&&x.tag==='晚餐'));
const north=check(5);assert(north.some(x=>x.rail&&x.time.startsWith('19:44')));assert(north.findIndex(x=>x.tag==='晚餐')<north.findIndex(x=>x.rail));assert(!north.some(x=>/更衣|淋浴|体验课/.test(x.title)));
console.log('PASS: Oct31 four shore stops, Oct30 Tianya walk before named dinner, screenshot train to Shenzhou, named Wanning meals and 19:44 northbound train.');
