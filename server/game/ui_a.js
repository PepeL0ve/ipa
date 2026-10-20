/* ═════════ ИНТЕРФЕЙС: дизайн прежней версии (стекло, баннер, пилюля навигации) ═════════ */
Object.assign(ICO,{anvil:'<path d="M3 5h12a4 4 0 01-4 4h-1l1 4h3v3H6v-3h3l1-4H8a5 5 0 01-5-4zM15 5h6v2h-5"/>',send:'<path d="M12 3l9 9-9 9M21 12H3"/>',crown:'<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',tag:'<path d="M20 12l-8 8-9-9V3h8zM7.5 7.5h.01"/>',plus:'<path d="M12 5v14M5 12h14"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',out:'<path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/>'});
const ic=(n,z)=>ico(n,z);
Object.assign(ERR,{young:'Вывод откроется через несколько дней после регистрации',play:'Для вывода нужно больше играть: прокрутите кейсы ещё',review:'Вывод временно недоступен — обратитесь к администратору'});
const TC=['#9aa0aa','#3ddc84','#3d9bff','#b45cff','#ffc933'];
const NFT='https://nft.fragment.com/gift/',THUMB=s=>'https://fragment.com/file/gifts/'+s+'/thumb.webp';
const colOf=s=>(CAT.cols.find(c=>c[0]===s)||[s,s,0,1,0]);
const pal=s=>{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))%360;return['hsl('+h+',38%,34%)','hsl('+h+',42%,14%)']};
const TN=t=>(CAT&&CAT.tn[t])||'';
const AVI=i=>AVS[(i||0)%AVS.length];
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2700)}
function evs(a){a.forEach(e=>{if(e.k==='lvl'){toast(`Уровень ${e.l}! Бонус ${fm(e.b)}`);ding(4);confetti(50)}else if(e.k==='ach')toast(`Достижение: ${e.n} · +${fm(e.r)}`);else if(e.k==='job')toast(`Подработка: +${fm(e.r)} Gram`)})}
let FX=null;function confetti(n=120){const c=$('#cf'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const cols=['#4a8cff','#ffc933','#ff5db1','#3ddc84','#b45cff'],P=Array.from({length:n},()=>({x:c.width/2,y:c.height*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,s:4+Math.random()*6,c:cols[rnd(5)],r:Math.random()*6,vr:(Math.random()-.5)*.4}));
 cancelAnimationFrame(FX);let t=0;(function f(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()});if(++t<110)FX=requestAnimationFrame(f);else x.clearRect(0,0,c.width,c.height)})()}
const ago=a=>a<0?'давно':a<120?'в сети':a<3600?`был(а) ${Math.round(a/60)} мин назад`:a<86400?`был(а) ${Math.round(a/3600)} ч назад`:`был(а) ${Math.round(a/86400)} дн назад`;
const sellP=v=>Math.round(v*S.M*(1+.05*S.up.t)*.8*10)/10;
const lvB=L=>`<i class="lvb${L>99?' d3':L>9?' d2':''}"><svg viewBox="0 0 26 28"><path d="M13 2L23.5 8V20L13 26L2.5 20V8Z"/></svg><b>${L}</b></i>`;
/* ── листы ── */
let SHS=[];
function sheet(html,o={}){const w=document.createElement('div');w.className='mo2'+(o.top?' top':'');const s=document.createElement('div');s.className=o.mb?'mb':'sheet'+(o.cls?' '+o.cls:'');s.innerHTML=html;w.append(s);document.body.append(w);
 const r={el:s,w,close(){if(r.dead)return;r.dead=1;SHS=SHS.filter(x=>x!==r);w.remove();o.onclose&&o.onclose()},set(h){s.innerHTML=h}};
 w.addEventListener('click',e=>{if(e.target===w)r.close()});SHS.push(r);return r}
const topSheet=()=>SHS[SHS.length-1],closeAll=()=>[...SHS].forEach(s=>s.close());
/* ── карточка подарка и анимации (как в старой игре) ── */
const gcH=(g,c='')=>`<div class="gc ${c}${g.k?' k'+g.k:''}${g.cr?' cr':''}" data-s="${g.s}-${g.num}" data-c="${g.s}" data-gid="${g.id}"><i class="gb"></i><img class="gp" alt="" decoding="async" referrerpolicy="no-referrer"><div class="gl"></div><div class="gt"><b>${esc(g.n)}</b><span>#${N(g.num)}</span></div></div>`;
const tile=(g,a,id,rib,pp)=>`<button class="pt${rib?' on':''}" data-a="${a}" data-id="${id}">${gcH(g,'sm')}${rib?`<i class="rb ${rib[1]}">${rib[0]}</i>`:''}${pp?`<span class="pp">${pp}</span>`:''}</button>`;
const LC=new Map(),LZ=new Map(),SC=new Map(),AN=new Set(),VIS=new Set(),GI={};let LB=0,HT=0,HW=0;window.__gi=(i,d)=>{const f=GI[i];if(f){delete GI[i];f(d)}};
const MAXA=(navigator.deviceMemory&&navigator.deviceMemory<=3)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)?2:3;
const keyU=(k,e)=>NFT+k+'.'+e;const big=el=>el.id==='plate'||!!el.closest('.gh');
function sample(im){const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');x.drawImage(im,0,0,8,8);const d=x.getImageData(0,0,8,8).data,cs=[0,28,224,252].map(o=>[d[o],d[o+1],d[o+2]]),e=[0,1,2].map(k=>Math.round(cs.reduce((a,v)=>a+v[k],0)/4)),m=e.map(v=>Math.min(255,Math.round(v+(255-v)*.2)));return['rgb('+m+')','rgb('+e+')']}
function applyC(el,q){el.style.setProperty('--g1',q[0]);el.style.setProperty('--g2',q[1]);el.classList.add('smp')}
function poster(el){const s=el.dataset.s,c=el.dataset.c,img=el.querySelector('.gp');if(!img)return;img.onload=img.onerror=null;
 if(el.dataset.ns){img.className='gp th';img.onload=()=>{HOK=true};img.src=THUMB(c);return}
 img.className='gp';const g=SC.get(s);if(g)applyC(el,g);else{const p=pal(c);el.style.setProperty('--g1',p[0]);el.style.setProperty('--g2',p[1])}
 let t=0;img.onload=()=>{HOK=true;OKS.add(s);if(!g&&img.crossOrigin){let q;try{q=sample(img)}catch(e){}if(q){SC.set(s,q);applyC(el,q)}}};
 img.onerror=()=>{if(!t&&img.crossOrigin){t=1;img.removeAttribute('crossorigin');img.src=keyU(s,'medium.jpg')+'#n'}else{img.onerror=null;img.className='gp th';img.src=THUMB(c);miss(el)}};
 img.crossOrigin='anonymous';img.src=keyU(s,'medium.jpg')}
function viaApp(u){return new Promise(res=>{if(!(GA&&GA.img))return res('');const i=++CI;GI[i]=d=>{try{const b=atob(String(d).split(',')[1]||'');res(new TextDecoder().decode(Uint8Array.from(b,c=>c.charCodeAt(0))))}catch(e){res('')}};GA.img(i,u)})}
function ljson(k){let p=LC.get(k);if(p){LC.delete(k);LC.set(k,p);return p}const u=keyU(k,'lottie.json');
 p=fetch(u).then(r=>{if(!r.ok)throw 0;return r.text()}).catch(()=>viaApp(u)).then(t=>{if(!t)throw 0;LZ.set(k,t.length);LB+=t.length;for(const x of LC.keys()){if(LB<=6e6||x===k)break;LC.delete(x);LB-=LZ.get(x)||0;LZ.delete(x)}return t});
 LC.set(k,p);p.catch(()=>{LC.delete(k);LZ.delete(k)});return p}
async function play(el){if(el._a||el._p||el._f||!el.isConnected)return;if(!window.lottie){if(++HW<25)setTimeout(()=>play(el),700);return}
 const k=el.dataset.s,box=el.querySelector('.gl');if(!k||!box)return;el._p=1;
 try{const t=await ljson(k);el._p=0;if(!el.isConnected||el._a||el.dataset.s!==k||(!big(el)&&!VIS.has(el)))return;
  if(!big(el))while([...AN].filter(e=>!big(e)).length>=MAXA){const o=[...AN].find(e=>!big(e));if(!o)break;stop(o)}
  const a=lottie.loadAnimation({container:box,renderer:'canvas',loop:true,autoplay:true,animationData:JSON.parse(t),rendererSettings:{preserveAspectRatio:'xMidYMid meet',clearCanvas:true,progressiveLoad:true,dpr:Math.min(window.devicePixelRatio||1,big(el)?2.5:1.5)}});
  el._a=a;AN.add(el);a.addEventListener('DOMLoaded',()=>{if(el._a===a)el.classList.add('an')});a.addEventListener('data_failed',()=>{el._f=1;stop(el)})}
 catch(e){el._p=0;el._f=1}}
function stop(el){if(!el)return;if(el._a){try{el._a.destroy()}catch(e){}el._a=null}AN.delete(el);el.classList.remove('an')}
const IO='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{const el=e.target;if(e.isIntersecting){VIS.add(el);play(el)}else{VIS.delete(el);stop(el)}}),{rootMargin:'60px'}):null;
function hydrate(){document.querySelectorAll('.gc[data-s]:not([data-h])').forEach(el=>{if(el.id==='plate')return;el.dataset.h=1;poster(el);if(IO)IO.observe(el);else{VIS.add(el);play(el)}});
 AN.forEach(el=>{if(!el.isConnected)stop(el)});VIS.forEach(el=>{if(!el.isConnected)VIS.delete(el)})}
new MutationObserver(()=>{clearTimeout(HT);HT=setTimeout(hydrate,50)}).observe(document.body,{childList:true,subtree:true});
/* ── шапка, вкладки ── */
let TAB=0,UNR=0,FRQ=0,FT=0;
function setAvEl(el,ai,av){if(!el)return;if(ai){el.style.backgroundImage=`url(${ai})`;el.style.backgroundSize='cover';el.style.backgroundPosition='center';el.innerHTML=''}else{el.style.backgroundImage='';el.innerHTML=AVI(av)}}
const favH=(u,x='')=>`<span class="fav${x}"${u.as||u.ai?` style="background:url(${u.ai||u.as}) center/cover"`:''}>${u.as||u.ai?'':AVI(u.av)}<i class="sd${u.on?' on':''}"></i>${u.w?`<img class="ws" src="${keyU(u.w.s+'-'+u.w.num,'small.jpg')}" referrerpolicy="no-referrer" alt="">`:''}</span>`;
const nmH=u=>esc(u.name)+sbH(u.b,u.bt,u.bw);
function cnt(el,to,dur=450,snd){cancelAnimationFrame(el._r);const f0=el._v||0,s=performance.now();let lt=0;
 (function f(n){const k=Math.min(1,(n-s)/dur),e=1-Math.pow(1-k,3);el._v=f0+(to-f0)*e;if(el.id==='bal')el.innerHTML=fm(el._v)+'<small>Gram</small>';else el.textContent=gram(el._v);
  if(k<1){if(snd&&n-lt>55){tick(k);lt=n}el._r=requestAnimationFrame(f)}})(s)}
function hdr(){if(!S.name)return;const w=S.inv&&S.inv.find(g=>g.id===S.worn),sb=S.sb||{},nm=$('#hn'),k=S.name+'|'+(w?w.s+w.num:'')+'|'+(sb.b||'')+(sb.bt||0);
 if(nm._k!==k){nm._k=k;clrB(nm);nm.innerHTML=hh(S.name)+(w?`<img class="wi" src="${keyU(w.s+'-'+w.num,'small.jpg')}" referrerpolicy="no-referrer" alt="">`:'')+sbH(sb.b,sb.bt,sb.bw);hydB(nm)}
 const a=$('#hav');setAvEl(a,S.ai,S.av);a.style.setProperty('--ac',TC[S.st.bt]);cnt($('#bal'),S.bal,400);const up=S.M>=(S.mh[S.mh.length-2]??1);
 $('#mk').innerHTML=`<span style="color:${up?'#3ddc84':'#ff6b6b'}">Рынок ×${S.M.toFixed(2)} ${ico(up?'up':'down',10)}</span>`;
 const n=$('#bellN');n.hidden=!UNR;n.textContent=UNR;$('nav button[data-t="5"]').classList.toggle('dot',FRQ>0)}
function view(t){TAB=t;$('#app').className='t'+t;$$('main .v').forEach(v=>v.hidden=v.id!=='v'+t);$$('nav button[data-t]').forEach(b=>b.classList.toggle('on',+b.dataset.t===t));
 const np=$('nav .np'),i=[0,2,3,5].indexOf(t);np.classList.toggle('noth',i<0);if(i>=0)np.style.setProperty('--i',i);
 hdr();({0:rGame,1:rProf,2:rMkt,3:rUp,5:rFr}[t]||rGame)();const v=$('#v'+t);if(v)v.scrollTop=0}
const render=()=>{hdr();({0:rGame,1:rProf,2:rMkt,3:rUp,5:rFr}[TAB]||rGame)()};
function banned(j){$('#wel').hidden=false;$('#wel').innerHTML=`<div class="sl"><h2>Аккаунт заблокирован</h2><p>Причина: ${esc(j.reason||'нарушение правил')}.<br>Если это ошибка — напишите администратору.</p></div>`}
/* ═════════ ИГРА: прокрутка и оценка — как в прежней версии ═════════ */
let state='idle',cur=-1,curC=null,PLATE=0;
const plateEl=()=>$('#plate'),modsEl=()=>$('#mods'),prEl=()=>$('#pr');
function setTier(t,k){cur=t;document.documentElement.style.setProperty('--c',TC[t]);document.body.classList.toggle('leg',t===4);$('#pw').classList.toggle('gold',k===1);$('#bd').textContent=TN(t);$$('#pills i').forEach((p,i)=>p.classList.toggle('on',i<=t))}
const bump=()=>{const w=$('#pw');w.classList.remove('b');void w.offsetWidth;w.classList.add('b')};
function mod(txt,tier,cls=''){const d=document.createElement('div');d.className='mod '+cls;d.style.setProperty('--c',TC[tier]);d.textContent=txt;modsEl().appendChild(d)}
function setCard(n,fin){const el=plateEl(),g=el.querySelector('.gp'),K=n.K??n.k??0;stop(el);el.className='gc'+(K?' k'+K:'');el.style.removeProperty('--g1');el.style.removeProperty('--g2');
 $('#gtn').textContent=n.n;$('#gti').textContent='#'+N(n.num);curC=n.s;g.onload=g.onerror=null;g.removeAttribute('crossorigin');el.dataset.c=n.s;el._f=0;el._p=0;
 if(!fin){delete el.dataset.s;delete el.dataset.h;el.dataset.ns=1;poster(el);return}
 delete el.dataset.ns;el.dataset.s=n.s+'-'+n.num;el.dataset.h=1;poster(el);play(el)}
const pool=()=>CAT.cols.filter(c=>c[3]);
const randCard=()=>{const c=pool()[rnd(pool().length)];return{s:c[0],n:c[1],num:1+rnd(999),K:0}};
function plateIdle(){state='idle';const c=colOf('plushpepe');setCard({s:c[0],n:c[1],num:1,K:0},false);const p=plateEl();p.style.filter='none';p.style.transform='';PLATE=0;setTier(0);const pr=prEl();pr.textContent='— Gram';pr._v=0;modsEl().classList.remove('out');modsEl().innerHTML='<div class="mod hint">Нажмите «Крутить» или коснитесь экрана — выпадет случайный подарок</div>'}
function addMini(c,x,y,r){const m=document.createElement('div');m.className='mini';m.style.backgroundImage=`url(${THUMB(c)})`;m.style.transform=`translate(${x}px,${y}px) rotate(${r}deg) rotateX(24deg)`;const st=$('#stack');st.appendChild(m);while(st.children.length>9)st.firstChild.remove()}
function fly(c){if(TAB!==0)return;const a=plateEl().getBoundingClientRect(),st=$('#stack'),s=st.getBoundingClientRect(),n=st.children.length,rx=rnd(17)-8,ry=-Math.min(n,8)*3+rnd(5)-2,rr=rnd(25)-12,m=document.createElement('div');
 m.className='mini fm';m.style.backgroundImage=`url(${THUMB(c)})`;m.style.left=a.left+a.width/2-22+'px';m.style.top=a.top+a.height/2-22+'px';m.style.transform='translate(0,0) rotate(0deg) scale(3.4)';document.body.appendChild(m);void m.offsetWidth;
 m.style.transition='transform .34s cubic-bezier(.4,0,.2,1)';m.style.transform=`translate(${s.left-a.left-a.width/2+rx}px,${s.top-a.top-a.height/2+ry}px) rotate(${rr}deg) scale(1)`;setTimeout(()=>{m.remove();addMini(c,rx,ry,rr)},350)}
/* ── проверка, что у выпавшего подарка есть картинка на Fragment; если нет — сервер подбирает другой номер того же класса ── */
const OKS=new Set(),BADS=new Set(),FIXED=new Set();let HOK=false,CORS=true;
function probe(u,ms,cors){return new Promise(r=>{const i=new Image();let d=0;const f=v=>{if(d)return;d=1;clearTimeout(t);i.onload=i.onerror=null;r(v)},t=setTimeout(()=>f(null),ms||5000);i.onload=()=>f(true);i.onerror=()=>f(false);if(cors)i.crossOrigin='anonymous';i.src=u})}
async function exists(s,num){const k=s+'-'+num;if(OKS.has(k))return true;if(BADS.has(k))return false;const u=keyU(k,'medium.jpg');let r=await probe(u,5000,CORS);
 if(r===false&&CORS){r=await probe(u,5000,false);if(r===true)CORS=false}
 if(r===true){OKS.add(k);HOK=true;return true}if(r===false&&HOK&&navigator.onLine!==false){BADS.add(k);return false}return true}
async function vfyG(g){for(let t=0;t<6&&!(await exists(g.s,g.num));t++){const f=await go('fixid',{gid:g.id});if(f.e)break;g=f.pend||g}return g}
function miss(el){const k=el.dataset.s;if(!HOK||navigator.onLine===false||el.dataset.ns||!k)return;const gid=+el.dataset.gid;if(!gid||FIXED.has(gid)||!S.inv||!S.inv.find(x=>x.id===gid))return;
 FIXED.add(gid);BADS.add(k);go('fixid',{gid}).then(r=>{if(!r.e){FIXED.delete(gid);if(!document.hidden)render()}})}
async function spin(){if(state!=='idle')return;if(S.pend){rGame();return}
 initAudio();state='spin';const gb=$('#gb');gb.disabled=true;gb.textContent='Крутим…';$('#dly').hidden=true;modsEl().classList.add('out');const pr=prEl();pr.textContent='— Gram';pr._v=0;cancelAnimationFrame(pr._r);cur=-1;setTier(0);$('#stack').innerHTML='';$('#deck').classList.add('on');
 const r=await go('spin');
 if(r.e){fail(r);state='idle';$('#deck').classList.remove('on');plateIdle();rGame();return}
 let fin=r.pend;const vp=Promise.race([vfyG(r.pend),sleep(7000)]).then(g=>{fin=(g&&g.id?g:null)||S.pend||r.pend});
 const NS=22;let i=0;curC=null;
 const step=async()=>{const last=i===NS-1,t=i/(NS-1),delay=50+300*t*t*t,sp=Math.max(0,1-delay/220);
  if(last)await vp;if(curC)fly(curC);setCard(last?fin:randCard(),last);const pl=plateEl();
  pl.style.filter=last?'none':`blur(${(2.4*sp).toFixed(1)}px)`;pl.style.transform=last?'':`scale(${(1+.06*sp).toFixed(3)})`;
  clack(t);i++;if(!last)setTimeout(step,delay);else settle(fin)};
 step()}
const stepsOf=g=>g.stp&&g.stp.length?g.stp:[['Флор коллекции «'+g.n+'»',g.val,g.tier]].concat((g.f||[]).map(t=>[t,g.val,g.tier]));
async function settle(g){stopSnd();bump();await sleep(900);$('#deck').classList.remove('on');const mo=modsEl();mo.innerHTML='';mo.classList.remove('out');state='eval';
 const st=stepsOf(g),pr=prEl();setTier(0);
 for(const s of st){setTier(s[2],g.k);mod(s[0],s[2]);bump();ding(s[2]);cnt(pr,s[1],600,1);await sleep(600+rnd(200))}
 if(st.length===1)mod('Особенностей не найдено',0,'none');
 if(g.tier>=3)confetti(g.tier===4?160:80);PLATE=g.id;state='decide';rGame();hdr()}
function restoreRes(g){const st=stepsOf(g);setCard(g,true);setTier(g.tier,g.k);const pr=prEl();pr._v=g.val;pr.textContent=gram(g.val);const mo=modsEl();mo.classList.remove('out');mo.innerHTML='';st.slice(1).forEach(s=>mod(s[0],s[2]));if(st.length===1)mod('Особенностей не найдено',0,'none');PLATE=g.id;state='decide'}
function rGame(){const p=S.pend,gb=$('#gb'),dl=$('#dly'),ac=$('#acts');if(state==='spin'||state==='eval')return;
 if(p&&state==='idle')restoreRes(p);else if(!p&&state==='decide'){state='idle';plateIdle()}else if(!p&&!plateEl().dataset.c)plateIdle();
 const dec=state==='decide';dl.hidden=!S.dly.ok||dec;if(S.dly.ok)dl.textContent=`Ежедневный бонус +${fm(S.dly.b)} Gram · серия ${S.dly.sk}`;
 gb.hidden=dec;gb.disabled=false;gb.innerHTML=`Крутить — ${gram(S.spc)}`+(S.bst>0?` · ${ico('clover',16)}${S.bst}`:'');ac.hidden=!dec;
 if(dec&&p)ac.innerHTML=`<button class="bt p" data-a="dsell">Продать<br>${gram(sellP(p.val))}</button><button class="bt" data-a="keep">В склад</button><button class="bt" data-a="shareP" aria-label="Поделиться" style="flex:none;width:58px;padding:0;display:grid;place-items:center">${ico('share',22)}</button>`}
async function decide(a){const g=S.pend;if(!g||state!=='decide')return;const r=await go('decide',{a});if(fail(r))return;if(a==='sell'){coin();toast('Продано за '+gram(sellP(g.val)))}else toast('Добавлено на склад');state='idle';plateIdle();rGame();hdr()}
async function bonus(k){const r=await go(k);if(fail(r))return;if(k==='dly'){coin();toast('Бонус дня: +'+gram(r.got))}
 if(k==='wheel'){const w=r.wr,t={gram1:'Gram',gram2:'Gram',gram3:'Gram',jack:'Джекпот! Gram',boost:'круток с бустером удачи',xp:'опыта'}[w.k];ding(w.k==='jack'?4:2);toast(`Колесо: +${fm(w.v)} ${t}`);if(w.k==='jack')confetti(150)}render()}
/* ═════════ ПРОФИЛЬ И СКЛАД ═════════ */
const UPN={l:['Связи','+25% к шансу редких находок'],t:['Торговля','+5% к цене всех продаж'],s:['Склад','+8 мест в инвентаре'],d:['Скидка','−6% к цене прокрутки']};
function rProf(){const L=S.lv,v=$('#v1'),n=S.inv.length;
 v.innerHTML=`<div class="pav"><button class="dots" data-a="menu" aria-label="Меню">${ico('dots',20)}</button><button class="av pa" data-a="avp" aria-label="Аватар"></button><div class="pnm"><button class="pnb" data-a="nick">${nmH({name:S.name,...(S.sb||{})})}</button><div class="pls">${lvB(L)}<span>${S.un?'@'+esc(S.un):'в сети'}</span></div><div class="xp pxp"><i style="width:${Math.min(100,(S.xp-S.xl)/(S.xn-S.xl)*100)}%"></i></div></div></div>
 <div class="row" style="justify-content:space-between;padding:0 4px"><div class="sub" style="margin:0">Склад: ${n} из ${S.cap}</div>${n?`<button class="bt sm2" data-a="sall">Продать обычные</button>`:''}</div>
 ${n?`<div class="pg">${S.inv.map(g=>tile(g,'g',g.id,S.worn===g.id?['Надет','wn']:g.cr?['crafted','cr']:null)).join('')}</div>`:`<div class="emp">${ico('gift',56)}<br>Подарков пока нет</div>`}`;setAvEl(v.querySelector('.pa'),S.ai,S.av)}
function openGift(id,ro){const g=ro?id:S.inv.find(x=>x.id===id);if(!g)return;const c=colOf(g.s),worn=!ro&&S.worn===g.id;
 return sheet(`<div class="tr2"><button class="ib" data-a="close" aria-label="Закрыть">${ico('x',20)}</button>${ro?'':`<div class="r"><button class="ib" data-a="craft" data-id="${g.id}" aria-label="Изготовление" ${g.cr?'data-lock="1"':''} style="${g.cr?'opacity:.45':''}">${ico('anvil',21)}</button><button class="ib" data-a="share" data-id="${g.id}" aria-label="Поделиться">${ico('share',21)}</button></div>`}</div>
 <div class="gh">${gcH(g)}</div><div class="gn">${esc(g.n)} <span>#${N(g.num)}</span></div><div class="gm" style="color:${TC[g.tier]}">${esc(TN(g.tier))}${g.cr?' · изготовлен':''}</div>
 ${ro?'':`<div class="abs"><button class="ab" data-a="xfer" data-id="${g.id}">${ico('send',26)}Передать</button><button class="ab" data-a="wear" data-id="${g.id}" ${worn?'style="background:#229ff3"':''}>${ico('crown',26)}${worn?'Снять':'Носить'}</button><button class="ab" data-a="sellm" data-id="${g.id}">${ico('tag',26)}Продать</button></div>`}
 <div class="it"><div><b>Владелец</b><span class="bl">${ro?'игрок':esc(S.name)+sbH((S.sb||{}).b,(S.sb||{}).bt,(S.sb||{}).bw)}</span></div><div><b>Модель</b><span>${esc(g.md)}${g.mdw?`<i class="pc2">${g.mdw}%</i>`:`<i class="pc2">${{uncommon:'необычный',rare:'редкий',epic:'эпический',legendary:'легендарный'}[g.crr]||''}</i>`}</span></div><div><b>Узор</b><span>${esc(g.pt)}<i class="pc2">${g.ptw}%</i></span></div><div><b>Фон</b><span>${esc(g.bg)}<i class="pc2">${g.bgw}%</i></span></div><div><b>Тираж</b><span>${N(c[4]||0)}</span></div><div><b>Ценность</b><span style="color:#ffc933">~${gram(g.val)}</span></div></div>
 ${g.f.length?`<div class="ftl">${g.f.map(f=>`<span>${esc(f)}</span>`).join('')}</div>`:''}`,{cls:'gsh'})}
function sellSheet(id){const g=S.inv.find(x=>x.id===id);if(!g)return;const q=sellP(g.val),lo=Math.max(1,Math.round(g.val*.2*10)/10),hi=Math.round(g.val*5);
 sheet(`<div class="sl"><h2>Продать подарок</h2><p style="margin:0 0 14px">${esc(g.n)} #${N(g.num)} · оценка ${gram(g.val)}</p><button class="go gd" style="width:100%;margin:0" data-a="sellnow" data-id="${id}">Продать сразу · ${gram(q)}</button>
 <h3 style="margin:22px 2px 10px">Выставить на рынок</h3><div class="pin">${ico('tag',26)}<input id="pr2" type="number" inputmode="decimal" value="${Math.round(g.val*1.15)}" min="${lo}" max="${hi}"><small>Gram</small></div><p>Цена от ${fm(lo)} до ${fm(hi)} Gram. Комиссия рынка 5%.${S.lv<2?'<br>Рынок открывается со 2 уровня.':''}</p><button class="go" data-a="list" data-id="${id}">Выставить на рынок</button></div>`)}
async function sellNow(id){const r=await go('sell',{gid:id});if(fail(r))return;toast('Продано за '+gram(r.got));closeAll();render()}
async function listIt(id){const p=parseFloat($('#pr2').value),r=await go('list',{gid:id,price:p});if(r.e==='range'){toast(`Цена должна быть от ${fm(r.lo)} до ${fm(r.hi)} Gram`);return}if(fail(r))return;toast('Подарок выставлен на рынок');closeAll();render()}
async function wear(id){const worn=S.worn===id,r=await go('wear',worn?{off:1,gid:0}:{gid:id});if(fail(r))return;toast(worn?'Подарок снят':'Подарок надет — он виден рядом с вашим ником');topSheet()&&topSheet().close();render()}
function menu(){const n=Object.keys(S.ach).length,mi=(k,i,t,e,a,dn)=>`<button class="mi${dn?' dn':''}" data-a="${a}"><i style="--k:${k}">${ico(i,20)}</i><span>${t}</span>${e?`<em>${e}</em>`:''}${ico('chev',18)}</button>`;
 sheet(`<div class="sx" style="padding:14px 14px 8px"><div class="sht"><span></span><b>Меню</b><button class="ib" data-a="close">${ico('x',20)}</button></div>${mi('#4a8cff','chart','Статистика','','stats')}${mi('#ffb21f','trophy','Достижения',n+'/'+ACH.length,'ach')}${mi('#ff7a59','cake','Вывод в торты','','wd')}${mi('#7a7f8a','key','Код аккаунта','','code')}${mi('#7a7f8a','info','Сменить код','','rot')}${mi('#6b3030','out','Выйти','','out',1)}</div>`)}
function statsSheet(){const st=S.stat||{},s=S.st,c=(a,b,col)=>`<div>${a}<b${col?` style="color:${col}"`:''}>${b}</b></div>`;
 sheet(`<div class="sx" style="padding:14px"><div class="sht"><button class="ib" data-a="close">${ico('back',20)}</button><b>Статистика</b><span></span></div><h3 style="margin:8px 4px 10px">Игроки сейчас</h3><div class="st">${c('Онлайн',N(st.on||0),'#3ddc84')}${c('Всего игроков',N(st.total||0))}${c('За 24 часа',N(st.day||0))}${c('Прокруток сегодня',N(st.sp||0))}${c('Подарков в игре',N(st.gifts||0))}${c('На рынке',N(st.mk||0))}</div><h3 style="margin:18px 4px 10px">Ваша игра</h3><div class="st">${c('Прокруток',N(s.sp))}${c('Лучшая находка',TN(s.bt),TC[s.bt])}${c('Заработано',gram(s.earn))}${c('Изготовлено',N(s.cf||0))}${c('Заданий',N(S.qd))}${c('Уровень',S.lv)}</div></div>`)}
function achSheet(){sheet(`<div class="sx" style="padding:14px"><div class="sht"><button class="ib" data-a="close">${ico('back',20)}</button><b>Достижения</b><span></span></div>${ACH.map(a=>`<div class="acr${S.ach[a[0]]?' done':''}">${ico(S.ach[a[0]]?'trophy':'lock',22)}<div><b>${a[1]}</b><div class="mu sm" style="color:var(--mut);font-size:12px">${a[2]}</div></div></div>`).join('')}</div>`)}
const ACH=[['a0','Первый шаг','10 прокруток'],['a1','Азартный','100 прокруток'],['a2','Находка','Редкий подарок или выше'],['a3','Золотая жила','Легендарный подарок'],['a4','Коллекционер','10 подарков на складе'],['a5','Миллионер','Баланс 120 000 Gram'],['a6','Ветеран','Достичь 5 уровня'],['a7','Мастер квестов','Выполнить 10 заданий'],['a8','Постоянство','Серия входов 5 дней'],['a9','Золото','Найти золотую рамку'],['a10','Все рамки','Золотая, чёрная, синяя и красная'],['a11','Красная рамка','Найти красную рамку'],['a12','Первый друг','Добавить друга'],['a13','Душа компании','5 друзей'],['a14','Мастер','Изготовить первый подарок'],['a15','Модник','Надеть подарок']];
async function avUpload(file){try{const im=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=URL.createObjectURL(file)});
 const mk=(sz,q)=>{const c=document.createElement('canvas');c.width=c.height=sz;const x=c.getContext('2d'),s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,sz,sz);return c.toDataURL('image/jpeg',q)};
 let q=.8,d=mk(128,q);while(d.length>13500&&q>.25){q-=.1;d=mk(128,q)}let q2=.72,s=mk(48,q2);while(s.length>4300&&q2>.25){q2-=.1;s=mk(48,q2)}
 const r=await go('avimg',{d,s});if(fail(r))return;S.ai=d;S.as=s;toast('Аватарка обновлена');closeAll();render()}catch(e){toast('Не удалось загрузить фото')}}
function avPick(){sheet(`<div class="sx" style="padding:14px"><div class="sht"><span></span><b>Аватар</b><button class="ib" data-a="close">${ico('x',20)}</button></div>
 <label class="go" style="display:flex;margin:0 0 10px;cursor:pointer">Загрузить своё фото<input id="avf" type="file" accept="image/*" hidden></label>${S.ai?`<button class="go g" data-a="avdel" style="margin:0 0 12px">Убрать своё фото</button>`:''}
 <div class="grid" style="grid-template-columns:repeat(4,1fr)">${AVS.map((a,i)=>`<button data-a="avset" data-i="${i}" style="aspect-ratio:1;border-radius:16px;border:0;background:rgba(255,255,255,.08)">${a}</button>`).join('')}</div></div>`);
 const f=$('#avf');if(f)f.onchange=e=>{const x=e.target.files[0];if(x)avUpload(x)}}
function ask(title,val,ok,ph,pre){const s=sheet(`<div class="sl"><h2>${title}</h2><div class="pin">${pre?`<span class="at">${pre}</span>`:''}<input id="dq" value="${esc(val||'')}" placeholder="${esc(ph||'')}" maxlength="64" autocomplete="off" autocapitalize="off"></div><button class="go" id="dok">Готово</button></div>`);
 $('#dok').onclick=async()=>{const v=$('#dq').value.trim();s.close();await ok(v)};setTimeout(()=>{const i=$('#dq');i&&i.focus()},250);return s}
