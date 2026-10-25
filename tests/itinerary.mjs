import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const defaults={'#lunch':'heng','#sunset':'sky','#sanya-mode':'forest','#xinglong-extra':'none','#haikou-west':'coast'};
const nodes=new Map();function el(k){if(!nodes.has(k))nodes.set(k,{value:defaults[k]||'',checked:false,innerHTML:'',textContent:'',hidden:false,dataset:{},style:{},classList:{toggle(){}},setAttribute(){},getAttribute(){return null},removeAttribute(){},scrollIntoView(){},showModal(){},close(){}});return nodes.get(k)}
const c={URLSearchParams,AbortController,Date,document:{querySelector:el,querySelectorAll:()=>[],head:{append(){}},createElement:()=>({})},localStorage:{getItem:()=>null,setItem(){}},setTimeout:()=>0,clearTimeout(){},window:{},location:{origin:'https://test.site'},fetch:async()=>({ok:true,json:async()=>({daily:{time:['2026-10-29','2026-10-30','2026-10-31','2026-11-01']}})})};vm.createContext(c);
for(const f of ['route-data.js','itinerary.js','app.js','weather.js'])vm.runInContext(fs.readFileSync('public/'+f,'utf8'),c);
const run=s=>vm.runInContext(s,c);const points=run('POINTS');const dates=run('DAY_INFO');assert.equal(dates.length,9);assert.equal(dates[0].date,'2026-10-29');assert.equal(dates[8].date,'2026-11-06');
function check(i){run(`day=${i}`);const steps=run('itinerary()');let end=0;for(const s of steps){assert(points[s.point],`missing ${s.point}`);if(s.from)assert(points[s.from]);if(s.to)assert(points[s.to]);const [start,finish]=s.time.split('–').map(t=>Number(t.slice(0,2))*60+Number(t.slice(3)));assert(start>=end,`${i} overlap at ${s.title}`);assert(finish>=start);end=finish;if(s.travel)assert(!points[s.from].offshore&&!points[s.to].offshore,'boat represented as road');}return steps;}
for(let i=0;i<9;i++)check(i);
el('#sanya-mode').value='island';let s=check(2);assert.equal(s.filter(x=>x.boat).length,2);assert(!s.some(x=>x.point==='forest'));el('#sanya-mode').value='forest';el('#dadong-option').checked=true;assert(check(2).some(x=>x.point==='dadong'));
for(const opt of ['none','bali','moon']){el('#xinglong-extra').value=opt;s=check(4);const lunchLeg=s.find(x=>x.to==='xinglong');assert.equal(lunchLeg.from,opt==='none'?'botanic':opt);}
for(const option of ['coast','village','cdf']){el('#haikou-west').value=option;check(7)}
for(const sunset of ['sky','cloud'])for(const skip of [true,false]){el('#sunset').value=sunset;el('#skip-park').checked=skip;s=check(6);assert.equal(s.some(x=>x.point==='shibei'),!skip);}
run('day=1');s=run('itinerary()');assert(!s.some(x=>x.boat));assert(s.some(x=>x.time==='14:00–16:00'&&x.point==='sycdf'));
assert.equal(run("route('systation','syhotel').includes('destination_region='+encodeURIComponent('三亚'))"),true);
assert(run("route('shenzhou','wnstay')").includes(encodeURIComponent('睿悦')));assert(run("route('east','hkstay')").includes(encodeURIComponent('文明中路2号')));run("stays.wnstay='石梅湾测试酒店 某路1号'");assert(run("route('shenzhou','wnstay')").includes(encodeURIComponent('石梅湾测试酒店')));
assert(run("place('sycdf')").includes(encodeURIComponent('三亚')));assert(run("place('book')").includes(encodeURIComponent('万宁')));
assert.equal(run("route('wuzhidock','wuzhi')"),'');assert(el('#weather-cards').innerHTML.includes('11月06日'));
run('chooseDay(8)');assert(el('#timeline').innerHTML.includes('10:00–12:10'));assert(el('#timeline').innerHTML.includes('07:45–08:30'));
console.log('PASS: 9 dates, all default/alternate time blocks non-overlapping, correct city navigation, confirmed/custom hotel routing, no road navigation to islands, event protected, airport buffers and 9-day weather cards.');
