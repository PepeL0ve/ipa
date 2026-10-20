'use strict';
/* ───────── утилиты ───────── */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fm=n=>{n=Math.round(n*10)/10;return Math.abs(n)<100?String(n).replace('.',','):String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'\u00A0')};
const gram=n=>fm(n)+'\u00A0Gram',N=n=>Number(n).toLocaleString('en-US');
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),rnd=n=>Math.floor(Math.random()*n);
const ERR={money:'Не хватает Gram',full:'Склад полон — освободите место',fast:'Слишком быстро, подождите секунду',pend:'Сначала решите судьбу выпавшего подарка',gone:'Подарок уже недоступен',
lvl:'Нужен более высокий уровень',limit:'Достигнут лимит',range:'Цена вне допустимого диапазона',price:'Цена изменилась, обновите список',own:'Это ваше объявление',net:'Нет связи с сервером',
self:'Нельзя самому себе',taken:'Этот @ник уже занят',bad:'Некорректные данные',wait:'Ещё рано',slow:'Слишком много запросов',crafted:'Изготовленные подарки нельзя изготавливать повторно',mix:'Нужны подарки одной коллекции',nouser:'Сначала задайте @ник в профиле',tg:'Укажите ваш Telegram @username',many:'С этого адреса создано слишком много аккаунтов'};
/* ───────── SHA-256 / HMAC (для подписи запросов) ───────── */
const K256=(()=>{const k=[];for(let n=2;k.length<64;n++){let p=1;for(let d=2;d*d<=n;d++)if(n%d==0){p=0;break}if(p)k.push(Math.floor((Math.cbrt(n)%1)*4294967296)>>>0)}return k})();
const H256=(()=>{const k=[];for(let n=2;k.length<8;n++){let p=1;for(let d=2;d*d<=n;d++)if(n%d==0){p=0;break}if(p)k.push(Math.floor((Math.sqrt(n)%1)*4294967296)>>>0)}return k})();
const ror=(x,n)=>(x>>>n)|(x<<(32-n));
function sha256(m){const l=m.length,bl=((l+9+63)>>6)<<6,b=new Uint8Array(bl);b.set(m);b[l]=128;const dv=new DataView(b.buffer);dv.setUint32(bl-4,(l*8)>>>0);dv.setUint32(bl-8,Math.floor(l/536870912));
 let h=H256.slice();const w=new Uint32Array(64);
 for(let o=0;o<bl;o+=64){for(let i=0;i<16;i++)w[i]=dv.getUint32(o+i*4);
  for(let i=16;i<64;i++){const a=w[i-15],c=w[i-2];w[i]=(w[i-16]+(ror(a,7)^ror(a,18)^(a>>>3))+w[i-7]+(ror(c,17)^ror(c,19)^(c>>>10)))|0}
  let [a,b2,c,d,e,f,g,hh]=h;
  for(let i=0;i<64;i++){const t1=(hh+(ror(e,6)^ror(e,11)^ror(e,25))+((e&f)^(~e&g))+K256[i]+w[i])|0,t2=((ror(a,2)^ror(a,13)^ror(a,22))+((a&b2)^(a&c)^(b2&c)))|0;hh=g;g=f;f=e;e=(d+t1)|0;d=c;c=b2;b2=a;a=(t1+t2)|0}
  h=[h[0]+a|0,h[1]+b2|0,h[2]+c|0,h[3]+d|0,h[4]+e|0,h[5]+f|0,h[6]+g|0,h[7]+hh|0]}
 const out=new Uint8Array(32),ov=new DataView(out.buffer);h.forEach((x,i)=>ov.setUint32(i*4,x>>>0));return out}
const hex=u=>[...u].map(x=>x.toString(16).padStart(2,'0')).join(''),unhex=s=>new Uint8Array(s.match(/../g).map(x=>parseInt(x,16))),U8=s=>new TextEncoder().encode(s);
function hmac(key,msg){const k=new Uint8Array(64);k.set(key);const i=k.map(x=>x^54),o=k.map(x=>x^92),a=new Uint8Array(64+msg.length);a.set(i);a.set(msg,64);const ih=sha256(a),b=new Uint8Array(96);b.set(o);b.set(ih,64);return sha256(b)}
const rhex=n=>hex(crypto.getRandomValues(new Uint8Array(n)));
/* ───────── сеть ───────── */
const GA=window.GramApp||null;let SID=null,SK=null,CLK=0,CREDS=null;const CB={};let CI=0;
window.__gr=(i,c,t)=>{const f=CB[i];if(f){delete CB[i];f(c,t)}};
const API=()=>{try{return localStorage.getItem('gg_api')||window.GRAM_API||''}catch(e){return window.GRAM_API||''}};
let LASTERR={c:0,i:'',u:''};
function transport(path,body,hdr){return new Promise(res=>{const to=setTimeout(()=>{LASTERR={c:0,i:'timeout',u:API()};res([0,null])},20000);
 const done=(c,t)=>{clearTimeout(to);let j=null;try{j=JSON.parse(t)}catch(e){}if(c===0)LASTERR={c:0,i:String(t||'нет ответа').slice(0,90),u:API()};else if(!j)LASTERR={c,i:'сервер ответил не так, как ждали (код '+c+')',u:API()};res([c,j])};
 if(GA&&GA.api2){const i=++CI;CB[i]=done;GA.api2(i,path,body,JSON.stringify(hdr))}
 else fetch(API()+path,{method:'POST',headers:Object.assign({'Content-Type':'application/json'},hdr),body}).then(async r=>done(r.status,await r.text()),e=>done(0,String(e&&e.message||'fetch')))})}
function call(op,b,sign=true){const path='/api/v1/m/'+op,body=JSON.stringify(b||{}),hdr={};
 if(sign&&SID){const ts=String(Math.floor(Date.now()/1000)+CLK),n=rhex(16);hdr['X-Sid']=SID;hdr['X-Ts']=ts;hdr['X-Nonce']=n;
  hdr['X-Sign']=hex(hmac(unhex(SK),U8(['POST',path,ts,n,hex(sha256(U8(body)))].join('\n'))))}
 return transport(path,body,hdr)}
let S={},CAT=null;
async function login(){if(!CREDS)return false;const[c,j]=await call('login',{pid:CREDS.pid,tok:CREDS.tok},false);
 if(c===200&&j&&j.sid){SID=j.sid;SK=j.sk;CREDS.mig=j.mig;if(GA&&GA.creds)try{GA.creds(CREDS.pid,CREDS.tok)}catch(e){}return true}
 if(j&&j.e==='ban'){banned(j)}return false}
async function go(op,b){let[c,j]=await call(op,b);
 if(j&&j.e==='sess'&&await login())[c,j]=await call(op,b);
 else if(j&&j.e==='time'){CLK=j.t-Math.floor(Date.now()/1000);[c,j]=await call(op,b)}
 if(!j)return{e:'net'};if(j.e==='ban'){banned(j);return j}
 if(j.inv&&j.bal!==undefined){S=Object.assign(S,j);hdr()}
 else if(j.bal!==undefined&&op==='inbox'){S.bal=j.bal;hdr()}
 if(j.ev)evs(j.ev);return j}
function fail(r){if(r&&r.e){toast(ERR[r.e]||('Ошибка: '+r.e),'bad');return true}return false}
