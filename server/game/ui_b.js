/* ═════════ ПЕРЕДАЧА ═════════ */
let FLS=null;
const frow=(u,a,id)=>`<div class="fri"><button class="fb" data-a="${a}" data-id="${id??''}" data-un="${esc(u.un)}">${favH(u)}<span class="fn"><b>${nmH(u)}</b><small class="${u.on?'on':''}">@${esc(u.un)} · ${ago(u.ago)}</small></span></button></div>`;
async function xferSheet(id){const g=S.inv.find(x=>x.id===id);if(!g)return;if(S.lv<S.xf.lvl){toast(`Передача открывается с ${S.xf.lvl} уровня`);return}
 sheet(`<div class="sl"><h2>Передать подарок</h2><div class="pin">${ico('user',26)}<input id="xq" placeholder="Поиск по @нику" autocomplete="off" autocapitalize="off"></div><div id="xl"></div></div>`);
 const fr=await go('flist');FLS=fr.f||[];
 const paint=(rows,head)=>{const x=$('#xl');if(!x)return;x.innerHTML=(head?`<h3 style="margin:20px 2px 8px">${head}</h3>`:'<div style="height:12px"></div>')+(rows.length?rows.map(u=>frow(u,'xto',id)).join(''):`<div class="emp" style="padding:24px 8px">${head?'Пока нет друзей. Найдите игрока по @нику выше или добавьте друзей на вкладке «Друзья».':'Никого не нашли'}</div>`)};
 paint(FLS,'Друзья');let t=0;const q=$('#xq');if(q)q.oninput=e=>{clearTimeout(t);const v=e.target.value.trim();if(v.length<2){paint(FLS,'Друзья');return}t=setTimeout(async()=>{const r=await go('fsearch',{q:v});paint(r.r||[],'')},350)}}
function xferConfirm(id,un){const g=S.inv.find(x=>x.id===id),u=(FLS||[]).find(x=>x.un===un)||{name:un,av:0},fee=S.xf.fee;
 sheet(`<div style="display:flex;align-items:center;justify-content:center;gap:16px;margin:4px 0 6px"><div style="width:84px">${gcH(g,'sm')}</div>${ico('chev',22)}${favH(u,' lg')}</div>
 <h3 style="text-align:center;margin:6px 4px 4px;font-size:18px">Передать ${esc(g.n)} #${N(g.num)} новому владельцу — <b>${esc(u.name)}</b>${fee?` — за ${fee} Gram`:''}?</h3>
 <div class="it" style="margin:8px 0"><div><b>Модель</b><span>${esc(g.md)}</span></div><div><b>Фон</b><span>${esc(g.bg)}</span></div><div><b>Узор</b><span>${esc(g.pt)}</span></div><div><b>Ценность</b><span style="color:#ffc933">~${gram(g.val)}</span></div></div>
 <div class="fac"><button class="bt" data-a="close">Назад</button><button class="bt p" data-a="xdo" data-id="${id}" data-un="${esc(un)}">Передать${fee?` · ${fee} Gram`:''}</button></div>`,{mb:true,top:true})}
async function xferDo(id,un){const r=await go('xfer',{gid:id,to:un});if(r.e==='lvl'){toast('Нужен '+r.need+' уровень');return}if(fail(r))return;closeAll();toast('Подарок передан → '+(r.sent.name||un));confetti(40);render()}
/* ═════════ ПОДЕЛИТЬСЯ ═════════ */
async function shareG(g){const c=document.createElement('canvas');c.width=c.height=1080;const x=c.getContext('2d'),q=SC.get(g.s+'-'+g.num)||pal(g.s);
 const gr=x.createRadialGradient(540,430,60,540,540,900);gr.addColorStop(0,q[0]);gr.addColorStop(1,'#000');x.fillStyle=gr;x.fillRect(0,0,1080,1080);
 try{const im=await new Promise((ok,no)=>{const i=new Image();i.crossOrigin='anonymous';i.onload=()=>ok(i);i.onerror=no;i.src=keyU(g.s+'-'+g.num,'large.jpg')});x.save();x.beginPath();x.arc(540,420,330,0,7);x.clip();x.drawImage(im,210,90,660,660);x.restore()}catch(er){x.font='300px sans-serif';x.textAlign='center';x.fillText('🎁',540,520)}
 x.fillStyle='#fff';x.textAlign='center';x.font='800 78px system-ui,sans-serif';x.fillText(`${g.n} #${N(g.num)}`,540,850);x.font='600 46px system-ui,sans-serif';x.fillStyle='#ffffffcc';x.fillText(`${TN(g.tier)}`,540,920);x.fillText(`Оценка ${gram(g.val).replace('\u00A0',' ')}`,540,985);x.font='700 34px system-ui';x.fillText('GRAM GIFTS',540,1045);
 const txt=`Мне выпал ${g.n} #${N(g.num)} (${TN(g.tier)}) в Gram Gifts! Оценка ${fm(g.val)} Gram`;let png=null;try{png=c.toDataURL('image/png').split(',')[1]}catch(er){}
 if(png&&GA&&GA.share&&GA.share(png,txt))return;if(navigator.share){try{const bl=await new Promise(r=>c.toBlob(r,'image/png'));await navigator.share({text:txt,files:[new File([bl],'gift.png',{type:'image/png'})]});return}catch(er){if(er&&er.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(txt);toast('Текст скопирован')}catch(er){toast(txt)}}
/* ═════════ ИЗГОТОВЛЕНИЕ ═════════ */
let CR={ids:[],q:null,sh:null};
async function craftOpen(id){const g=S.inv.find(x=>x.id===id);if(!g)return;if(g.cr){toast('Изготовленный подарок нельзя использовать для изготовления повторно');return}
 topSheet()&&topSheet().close();CR={ids:[id],q:null};CR.sh=sheet('<div class="sl" style="padding-bottom:4px"><h2 style="margin:0;font-size:24px">Изготовление подарка</h2></div><div id="cb"></div>',{onclose:()=>{CR.sh=null;render()}});await craftQ()}
async function craftQ(){if(!CR.sh)return;CR.q=CR.ids.length?await go('craftq',{ids:CR.ids}):null;if(CR.q&&CR.q.e){fail(CR.q);CR.q=null}craftPaint()}
function craftPaint(){const cb=$('#cb');if(!cb)return;const q=CR.q,gs=CR.ids.map(i=>S.inv.find(g=>g.id===i)).filter(Boolean),first=gs[0],P=q?q.p:0;
 const slots=['s0','s1','s2','s3'].map((p,i)=>{const g=gs[i];return g?`<div class="slot f ${p}">${gcH(g,'sm')}<span class="pc">${q?q.each[i]:''}%</span><button class="rm" data-a="crm" data-id="${g.id}">${ico('x',13)}</button></div>`:`<button class="slot ${p}" data-a="cadd">${ico('plus',28)}</button>`}).join('');
 const R=2*Math.PI*62,bgt=q&&Object.entries(q.bgc).sort((a,b)=>b[1]-a[1])[0],ptt=q&&Object.entries(q.ptc).sort((a,b)=>b[1]-a[1])[0];
 cb.innerHTML=`<div class="cz">${slots}<div class="ring"><svg class="rg" viewBox="0 0 140 140"><circle cx="70" cy="70" r="62" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="6"/><circle cx="70" cy="70" r="62" fill="none" stroke="#6ea6ff" stroke-width="6" stroke-linecap="round" stroke-dasharray="${R*P/100*.78} ${R}" transform="rotate(130 70 70)" style="transition:stroke-dasharray .5s"/></svg><div>${ico('anvil',32)}<div class="pr2">${P?fm(P)+'%':'—'}</div></div></div></div>
 <p class="lg2" style="text-align:center;font-size:14px">${first?`Добавьте до 4 подарков, чтобы изготовить<br><b style="color:#fff">${esc(first.n)} #${N(first.num)}</b>`:'Выберите подарок'}.<br>В случае неудачи эти подарки пропадут.</p>
 ${q?`<div class="chips"><div class="chip"><i style="background:linear-gradient(135deg,${(CAT.bg[bgt[0]]||['#555'])[0]},${(CAT.bg[bgt[0]]||['','#222'])[1]})"></i>${bgt[1]}%</div><div class="chip"><i>${CAT.pt[ptt[0]]||'⭐'}</i>${ptt[1]}%</div></div><button class="mi" data-a="cmod" style="width:calc(100% - 28px);margin:0 14px 10px;background:rgba(255,255,255,.08);box-shadow:var(--rim);padding:14px 16px"><span style="text-align:center">Модели, которые можно получить</span>${ico('chev',18)}</button>`:''}
 <div style="position:relative"><button class="crb" data-a="cgo" ${gs.length&&q?'':'disabled'}>Изготовить подарок<small>Вероятность успеха ${fm(P)}%</small>${Array.from({length:12},(_,i)=>`<i style="--dx:${Math.round(Math.cos(i*.52)*(70+rnd(70)))}px;--dy:${Math.round(Math.sin(i*.52)*(34+rnd(40)))}px;animation-delay:${(i*.18).toFixed(2)}s"></i>`).join('')}</button></div><div style="height:16px"></div>`}
function craftPick(){const first=S.inv.find(g=>g.id===CR.ids[0]);const lst=S.inv.filter(g=>!CR.ids.includes(g.id)&&(!first||g.s===first.s));
 CR.pick=sheet(`<div class="sl"><h2>Добавить подарок</h2>${lst.length?`<p style="margin:0 0 12px">Подходят подарки той же коллекции. Изготовленные (crafted) использовать нельзя.</p><div class="pg" style="padding:0">${lst.map(g=>g.cr?`<div style="opacity:.35">${tile(g,'',g.id,['crafted','cr'])}</div>`:tile(g,'cpick',g.id)).join('')}</div>`:`<div class="emp"><b style="display:block;color:#fff">Нет подходящих подарков</b>Нужны ещё подарки из коллекции «${first?esc(first.n):''}».</div>`}</div>`,{top:true})}
async function craftGo(){const ids=[...CR.ids],gs=ids.map(i=>S.inv.find(g=>g.id===i)),P=CR.q.p,b=$('#cb');
 b.innerHTML=`<div class="forge"><div class="an2">⚒️</div>${gs.map((g,i)=>`<div class="orb" style="--a:${i*360/gs.length}deg">${gcH(g,'sm')}</div>`).join('')}</div><div class="res"><h2>Изготовление…</h2><div style="color:var(--mut)">Вероятность успеха ${fm(P)}%</div></div>`;
 const[r]=await Promise.all([go('craft',{ids}),sleep(2600)]);if(r.e){fail(r);craftPaint();return}CR.ids=[];CR.q=null;
 if(r.res){confetti(180);b.innerHTML=`<div class="res">${gcH(r.res)}<h2>${esc(r.res.n)} #${N(r.res.num)}</h2><div style="color:var(--mut);margin-bottom:6px">Новая модель: <b style="color:#fff">${esc(r.res.md)}</b> · ${{uncommon:'необычная',rare:'редкая',epic:'эпическая',legendary:'легендарная'}[r.res.crr]}</div><div style="color:var(--mut);font-size:13px;margin-bottom:6px">Оценка ~${gram(r.res.val)}. Изготовленный подарок нельзя изготавливать повторно.</div></div><button class="go w" data-a="cagain" style="margin-bottom:16px">Изготовить ещё</button>`}
 else b.innerHTML=`<div class="res"><div style="font-size:84px;margin:26px 0 4px">🔥</div><h2 class="fail">Неудачная попытка</h2><div style="color:var(--mut);margin-bottom:14px">Попытка изготовления не удалась.<br>Подарков утрачено: ${r.lost}.</div></div><button class="go o" data-a="cagain" style="margin-bottom:16px">Изготовить ещё</button>`}
async function craftModels(){const q=CR.q,r=await go('trait',{s:q.s});if(fail(r))return;let tab=0;const sh=sheet('',{top:true});
 const paint=()=>{const body=tab===0?`<p class="lg2" style="margin:0 14px 12px">В этой коллекции ${r.cm.length} моделей, которые можно изготовить.</p><div class="tl2">${r.cm.map(m=>`<div><span class="em">${{legendary:'👑',epic:'💎',rare:'✨',uncommon:'🌿'}[m.r]}</span><b>${esc(m.n)}</b><small style="color:${{legendary:TC[4],epic:TC[3],rare:TC[2],uncommon:TC[1]}[m.r]}">${{legendary:'легендарный',epic:'эпический',rare:'редкий',uncommon:'необычный'}[m.r]}</small></div>`).join('')}</div>`
  :tab===1?`<div class="tl2">${r.bgl.map(([n,w])=>{const c=CAT.bg[n]||['#555','#222'];return`<div style="padding:0;overflow:hidden"><div style="height:44px;background:linear-gradient(135deg,${c[0]},${c[1]})"></div><div style="padding:8px 4px"><b>${esc(n)}</b><small>${w}%</small></div></div>`}).join('')}</div>`
  :`<div class="tl2">${r.ptl.map(([n,w])=>`<div><span class="em">${CAT.pt[n]||'⭐'}</span><b>${esc(n)}</b><small>${w}%</small></div>`).join('')}</div>`;
  sh.set(`<div class="sl" style="padding-bottom:8px"><h2 style="margin:0 0 12px">Что можно получить</h2></div><div class="sg in">${['Модели','Фоны','Узоры'].map((n,i)=>`<button data-tab="${i}" class="${tab===i?'on':''}">${n}</button>`).join('')}</div>${body}`);sh.el.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{tab=+b.dataset.tab;paint()})};paint()}
/* ═════════ РЫНОК ═════════ */
let MK={s:'',sort:'new',d:null};
async function rMkt(){const v=$('#v2');v.innerHTML=`<div class="sub">Индекс рынка ×${S.M.toFixed(2)}. Он влияет на оценку подарков; цены на рынке игроков ставят сами игроки.</div><div id="mb"><div class="emp">Загрузка…</div></div>`;
 const r=MK.d=await go('browse',{s:MK.s,sort:MK.sort});if(TAB!==2||!r.all)return;mktPaint()}
const lrow=(l,mine)=>`<div class="ci" style="--c:${TC[l.g.tier]}">${gcH(l.g,'sm')}<div class="col"><b>${esc(l.g.n)} #${N(l.g.num)}</b><div class="ft">${esc(TN(l.g.tier))} · ${esc(l.g.md)}<br>${mine?'Ваше объявление':'Продавец: '+esc(l.by)+sbH(l.b,l.bt,l.bw)}</div></div><button class="bt p" data-a="${mine?'myl':'lst'}" data-id="${l.id}">${mine?'Снять':'Купить'}<br>${gram(l.price)}</button></div>`;
function mktPaint(){const r=MK.d,b=$('#mb');if(!r||!b)return;const cs=[...CAT.cols].sort((a,c)=>a[1].localeCompare(c[1]));
 b.innerHTML=`<h3>Мои объявления</h3>${r.mine.length?r.mine.map(l=>lrow(l,1)).join(''):'<div class="emp" style="padding:18px 10px">Пусто. На складе нажмите «Продать» → «Выставить на рынок».</div>'}
 <h3>Объявления игроков</h3><div class="sg">${[['new','Новые'],['low','Дешёвые'],['high','Дорогие']].map(([k,n])=>`<button data-a="msort" data-k="${k}" class="${MK.sort===k?'on':''}">${n}</button>`).join('')}</div>
 <select class="sel" id="mf" style="margin-bottom:12px"><option value="">Все коллекции</option>${cs.map(c=>`<option value="${c[0]}" ${MK.s===c[0]?'selected':''}>${esc(c[1])}</option>`).join('')}</select>
 ${r.all.length?r.all.map(l=>lrow(l,0)).join(''):'<div class="emp" style="padding:18px 10px">Пока никто ничего не продаёт.</div>'}<button class="bt" style="width:100%;margin-top:6px" data-a="mref">Обновить</button>`;
 const f=$('#mf');if(f)f.onchange=()=>{MK.s=f.value;rMkt()}}
function buySheet(lid){const l=MK.d.all.find(x=>x.id===lid);if(!l)return;const g=l.g;
 sheet(`<div style="display:flex;gap:14px;align-items:center;margin-bottom:6px"><div style="width:96px;flex:none">${gcH(g,'sm')}</div><div><b style="font-size:18px">${esc(g.n)} #${N(g.num)}</b><div style="color:var(--mut);font-size:13px;margin-top:3px">${esc(TN(g.tier))} · ${esc(g.md)}<br>Продавец: ${esc(l.by)}${sbH(l.b,l.bt,l.bw)}</div></div></div>
 <div class="it" style="margin:8px 0"><div><b>Фон</b><span>${esc(g.bg)}<i class="pc2">${g.bgw}%</i></span></div><div><b>Узор</b><span>${esc(g.pt)}<i class="pc2">${g.ptw}%</i></span></div><div><b>Оценка</b><span style="color:#ffc933">~${gram(g.val)}</span></div></div>
 <div class="fac"><button class="bt" data-a="close">Назад</button><button class="bt p" data-a="buy" data-id="${l.id}" data-p="${l.price}" ${S.bal<l.price?'disabled':''}>Купить · ${gram(l.price)}</button></div>`,{mb:true})}
async function buy(lid,p){const r=await go('buy',{id:lid,price:p});if(r.e==='lvl'){toast('Рынок открывается со 2 уровня');return}if(fail(r)){if(r.e==='gone'||r.e==='price'){closeAll();rMkt()}return}toast('Куплено: '+r.bought.n+' #'+N(r.bought.num));confetti(60);closeAll();rMkt()}
/* ═════════ ПРОКАЧКА ═════════ */
function rUp(){$('#v3').innerHTML=`<div class="sub">Улучшения действуют сразу и сохраняются.</div>`+Object.keys(UPN).map(k=>`<div class="up"><div><b>${UPN[k][0]} · ур. ${S.up[k]}/5</b><div>${UPN[k][1]}</div></div><button class="bt" data-a="up" data-k="${k}" ${S.uc[k]==null||S.bal<S.uc[k]?'disabled':''}>${S.uc[k]==null?'Макс.':gram(S.uc[k])}</button></div>`).join('')}
/* ═════════ ДРУЗЬЯ и БОНУСЫ ═════════ */
let FR=null;
async function rFr(){const v=$('#v5');v.innerHTML=`<div class="sg">${['Друзья','Поиск','Бонусы'].map((n,i)=>`<button data-a="fseg" data-i="${i}" class="${FT===i?'on':''}">${n}</button>`).join('')}</div><div id="fb"><div class="emp">Загрузка…</div></div>`;
 if(FT===2){bonPaint();return}
 if(FT===1){srchPaint();return}
 FR=await go('flist');FRQ=(FR.in||[]).length;hdr();frPaint()}
function frPaint(){const b=$('#fb');if(!b||!FR)return;
 if(!S.un){b.innerHTML=`<div class="up"><div><b>Создайте юзернейм</b><div>Без него вас не смогут найти и добавить в друзья</div></div><button class="bt p" data-a="reg">Создать</button></div>`;return}
 b.innerHTML=(FR.in.length?`<h3>Заявки в друзья</h3>${FR.in.map(u=>`<div class="fri"><button class="fb" data-a="prof" data-un="${esc(u.un)}">${favH(u)}<span class="fn"><b>${nmH(u)}</b><small>@${esc(u.un)}</small></span></button><div class="fac"><button class="bt p" data-a="fyes" data-un="${esc(u.un)}">Принять</button><button class="bt" data-a="fno" data-un="${esc(u.un)}">Отклонить</button></div></div>`).join('')}`:'')+`<h3>Друзья · ${FR.f.length}</h3>`+(FR.f.length?FR.f.map(u=>frow(u,'prof')).join(''):'<div class="emp">Пока никого. Найдите друга по @нику на вкладке «Поиск».</div>')}
function srchPaint(){const b=$('#fb');b.innerHTML=`<div class="pin" style="margin-bottom:12px">${ico('user',26)}<input id="fq" placeholder="Найти игрока по @нику" autocomplete="off" autocapitalize="off"></div><div id="fr2"></div>`;let t=0;
 $('#fq').oninput=e=>{clearTimeout(t);const q=e.target.value.trim();if(q.length<2){$('#fr2').innerHTML='';return}t=setTimeout(async()=>{const r=await go('fsearch',{q});$('#fr2').innerHTML=r.r.length?r.r.map(u=>`<div class="fri"><button class="fb" data-a="prof" data-un="${esc(u.un)}">${favH(u)}<span class="fn"><b>${nmH(u)}</b><small class="${u.on?'on':''}">@${esc(u.un)} · ${ago(u.ago)} · ур. ${u.lv}</small></span></button>${u.rel===0?`<button class="bt p" data-a="fadd" data-un="${esc(u.un)}">Добавить</button>`:u.rel===2?'<small style="color:var(--mut)">заявка</small>':u.rel===3?`<button class="bt p" data-a="fadd" data-un="${esc(u.un)}">Принять</button>`:''}</div>`).join(''):'<div class="emp">Никого не нашли</div>'},350)}}
function bonPaint(){const b=$('#fb');
 b.innerHTML=`<div class="up"><div><b>Ежедневный бонус</b><div>${S.dly.ok?`+${fm(S.dly.b)} Gram · серия ${S.dly.sk}`:'Уже получен, приходите завтра'}</div></div><button class="bt ${S.dly.ok?'p':''}" data-a="dly" ${S.dly.ok?'':'disabled'}>Забрать</button></div>
 <div class="up"><div><b>Колесо удачи</b><div>${S.wh.ok?'Бесплатное вращение раз в 3 часа':'Следующее через '+Math.ceil(S.wh.left/60)+' мин'}</div></div><button class="bt ${S.wh.ok?'p':''}" data-a="wheel" ${S.wh.ok?'':'disabled'}>Крутить</button></div>
 <div class="up"><div><b>Бустер удачи</b><div>${S.bst?'Осталось '+S.bst+' круток с бустером':'×1,6 к шансу редких находок на 10 круток'}</div></div><button class="bt" data-a="bst" ${S.bal<1600?'disabled':''}>${gram(1600)}</button></div>
 <h3>Задания на сегодня</h3>${S.q.map((q,i)=>`<div class="up"><div style="flex:1;min-width:0"><b>${esc(q.x)}</b><div>${fm(q.c)} / ${fm(q.n)} · награда ${gram(q.r)}</div><span class="tm"><u style="width:${Math.min(100,q.c/q.n*100)}%;display:block"></u></span></div>${q.g?'<small style="color:#3ddc84;font-weight:700">получено</small>':`<button class="bt ${q.c>=q.n?'p':''}" data-a="qc" data-i="${i}" ${q.c>=q.n?'':'disabled'}>Забрать</button>`}</div>`).join('')}`}
async function profile(un){const r=await go('fprof',{un});if(fail(r))return;const gs=r.g||[];
 const sh=sheet(`<div class="sx" style="padding:14px"><div class="sht"><span></span><b>Профиль</b><button class="ib" data-a="close">${ico('x',20)}</button></div><div class="fp">${favH(r,' lg')}<div class="fpn">${nmH(r)}${r.w?`<img class="wi" style="width:22px;height:22px;border-radius:7px;vertical-align:-4px;margin-left:7px" src="${keyU(r.w.s+'-'+r.w.num,'small.jpg')}" referrerpolicy="no-referrer" alt="">`:''}</div><div class="fps${r.on?' on':''}">@${esc(r.un)} · ур. ${r.lv} · ${ago(r.ago)}</div></div>
 ${r.self?'':`<div class="fac">${r.rel===1?`<button class="bt" data-a="fdel" data-un="${esc(r.un)}">Удалить из друзей</button>`:r.rel===2?'<button class="bt" disabled>Заявка отправлена</button>':`<button class="bt p" data-a="fadd" data-un="${esc(r.un)}">${r.rel===3?'Принять заявку':'Добавить в друзья'}</button>`}</div>`}
 <div class="st" style="margin:14px 0"><div>Прокруток<b>${N(r.sp)}</b></div><div>Подарков<b>${gs.length}</b></div></div>${gs.length?`<div class="pg" style="padding:0">${gs.map(g=>tile(g,'pg',g.id,g.cr?['crafted','cr']:null)).join('')}</div>`:'<div class="emp">Витрина пуста</div>'}</div>`,{});sh.gifts=gs}
/* ═════════ вывод, код, уведомления ═════════ */
function wdSheet(){let n=1;const max=Math.max(1,Math.min(S.wd.maxq,Math.floor(S.bal/S.wd.cake)));const tg=localStorage.gg_tg||'';
 const sh=sheet(`<div class="sl"><h2>Вывод в торты</h2><div class="wdi"><i>${ico('cake',24)}</i><div><b>${gram(S.wd.cake)} = 1 торт Telegram</b><br><span>Доступно с ${S.wd.lvl} уровня, через 3 дня после регистрации и после 150 прокруток. Заявку обработает администратор, Gram списываются сразу.</span></div></div>
 <div class="pin"><span class="at">@</span><input id="wtg" value="${esc(tg.replace('@',''))}" placeholder="ваш Telegram username" autocapitalize="off" autocomplete="off"></div>
 <div class="wdq" style="margin-top:16px"><button class="ib" data-a="wdm">−</button><div><b id="wn">1</b> торт<small id="wc">${gram(S.wd.cake)}</small></div><button class="ib" data-a="wdp">+</button></div><button class="go gd" id="wdok" ${S.lv<S.wd.lvl||S.bal<S.wd.cake?'disabled':''}>${S.lv<S.wd.lvl?'С '+S.wd.lvl+' уровня':'Заказать'}</button></div>`);
 const upd=()=>{$('#wn').textContent=n;$('#wc').textContent=gram(n*S.wd.cake)};
 sh.el.querySelector('[data-a=wdm]').onclick=()=>{n=Math.max(1,n-1);upd()};sh.el.querySelector('[data-a=wdp]').onclick=()=>{n=Math.min(max,n+1);upd()};
 $('#wdok').onclick=async()=>{const v=$('#wtg').value.trim();if(!v)return toast(ERR.tg);localStorage.gg_tg=v;const r=await go('wd',{rid:rhex(16),tg:v,n});if(r.e==='lvl')return toast('Нужен '+r.need+' уровень');if(fail(r))return;sh.close();closeAll();toast('Заявка отправлена администратору');render()}}
function codeSheet(){const c=CREDS.pid+CREDS.tok;sheet(`<div class="sl"><h2>Код аккаунта</h2><p style="margin:0">Любой, у кого есть этот код, получит доступ к вашему аккаунту. Никому его не показывайте.</p><textarea class="clt" rows="3" readonly>${c}</textarea><button class="go" data-a="cpc">Копировать</button></div>`)}
async function bell(){UNR=0;hdr();const r=await go('hist');sheet(`<div class="sx" style="padding:14px"><div class="sht"><span></span><b>Уведомления</b><button class="ib" data-a="close">${ico('x',20)}</button></div>${r.m&&r.m.length?r.m.map(m=>`<div class="up" style="gap:12px"><span style="font-size:24px">${{fr:'👋',sold:'💰',xfer:'🎁',grant:'🪙'}[m.k]||'🔔'}</span><div style="flex:1"><b style="font-size:14px">${esc(m.text||'')}</b><div>${new Date(m.t*1000).toLocaleString('ru-RU',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div></div></div>`).join(''):'<div class="emp"><b style="display:block;color:#fff">Пока тихо</b>Здесь появятся покупки ваших NFT, заявки в друзья и переданные подарки.</div>'}</div>`)}
async function poll(){if(!SID&&!(await login()))return;const r=await go('inbox');if(!r.m||!r.m.length)return;let ref=0;
 r.m.forEach(m=>{if(m.text){toast(m.text);UNR++;if(m.k==='fr'&&/хочет добавить/.test(m.text))FRQ++;if(document.hidden&&window.Notification&&Notification.permission==='granted')try{new Notification('Gram Gifts',{body:m.text})}catch(e){}}if(['sold','xfer','gift','grant','item'].includes(m.k))ref=1});
 if(ref)await go('me');render()}
/* ═════════ действия ═════════ */
const ACT={close:()=>{const s=topSheet();s&&s.close()},bell,menu,stats:statsSheet,ach:achSheet,avp:avPick,
 avset:async e=>{if(S.ai){await go('avimg',{d:''});S.ai='';S.as=''}await go('av',{av:+e.dataset.i});S.av=+e.dataset.i;closeAll();render()},
 avdel:async()=>{const r=await go('avimg',{d:''});if(!fail(r)){S.ai='';S.as='';toast('Фото убрано');closeAll();render()}},
 spin,keep:()=>decide('keep'),dsell:()=>decide('sell'),shareP:()=>S.pend&&shareG(S.pend),dly:()=>bonus('dly'),wheel:()=>bonus('wheel'),plus:()=>{FT=2;view(5)},
 bst:()=>{if(S.bal<1600)return toast(ERR.money);sheet(`<h3 style="margin:0">Бустер удачи</h3><p style="color:var(--mut);margin:0">×1,6 к шансу редких находок на 10 прокруток за ${gram(1600)}.</p><div class="fac"><button class="bt" data-a="close">Отмена</button><button class="bt p" data-a="bstok">Купить</button></div>`,{mb:true})},
 bstok:async()=>{closeAll();const r=await go('bst');if(!fail(r)){toast('Бустер активирован');render()}},
 qc:async e=>{const r=await go('qclaim',{i:+e.dataset.i});if(!fail(r)){toast('Награда: '+gram(r.got));render()}},
 sall:async()=>{const r=await go('sellall');if(!fail(r)){toast(r.n?`Продано ${r.n} подарков за ${gram(r.got)}`:'Обычных подарков нет');render()}},
 g:e=>openGift(+e.dataset.id),xfer:e=>xferSheet(+e.dataset.id),xto:e=>xferConfirm(+e.dataset.id,e.dataset.un),xdo:e=>xferDo(+e.dataset.id,e.dataset.un),
 wear:e=>wear(+e.dataset.id),sellm:e=>sellSheet(+e.dataset.id),sellnow:e=>sellNow(+e.dataset.id),list:e=>listIt(+e.dataset.id),share:e=>{const g=S.inv.find(x=>x.id===+e.dataset.id);g&&shareG(g)},
 craft:e=>craftOpen(+e.dataset.id),cadd:craftPick,crm:async e=>{CR.ids=CR.ids.filter(i=>i!==+e.dataset.id);await craftQ()},
 cpick:async e=>{CR.ids.push(+e.dataset.id);CR.pick&&CR.pick.close();await craftQ()},cgo:craftGo,cmod:craftModels,
 cagain:()=>{CR.ids=[];CR.q=null;if($('#cb')){craftPaint();if(S.inv.some(g=>!g.cr))craftPick()}},
 msort:e=>{MK.sort=e.dataset.k;rMkt()},mref:()=>rMkt(),lst:e=>buySheet(+e.dataset.id),buy:e=>buy(+e.dataset.id,+e.dataset.p),
 myl:e=>sheet(`<h3 style="margin:0">Снять с продажи?</h3><div class="fac"><button class="bt" data-a="close">Назад</button><button class="bt p" data-a="unl" data-id="${e.dataset.id}">Снять</button></div>`,{mb:true}),
 unl:async e=>{closeAll();const r=await go('cancel',{id:+e.dataset.id});if(!fail(r)){toast('Подарок вернулся на склад');rMkt()}},
 up:async e=>{const r=await go('up',{k:e.dataset.k});if(!fail(r)){toast('Улучшено');render()}},
 fseg:e=>{FT=+e.dataset.i;rFr()},
 reg:()=>ask('Юзернейм','',async v=>{const r=await go('reg',{un:v});if(!fail(r)){toast('Ник сохранён');render()}},'например, alex_gifts','@'),
 prof:e=>profile(e.dataset.un),pg:e=>{const s=topSheet();const g=s&&s.gifts&&s.gifts.find(x=>x.id===+e.dataset.id);if(g)openGift(g,true)},
 fadd:async e=>{const r=await go('freq',{un:e.dataset.un});if(!fail(r)){toast(r.rel===1?'Вы теперь друзья':'Заявка отправлена');closeAll();rFr()}},
 fyes:async e=>{const r=await go('fresp',{un:e.dataset.un,ok:1});if(!fail(r)){toast('Друг добавлен');rFr()}},fno:async e=>{await go('fresp',{un:e.dataset.un,ok:0});rFr()},
 fdel:async e=>{const r=await go('fdel',{un:e.dataset.un});if(!fail(r)){closeAll();rFr()}},
 nick:()=>ask('Новое имя',S.name,async v=>{const r=await go('nick',{name:v});if(!fail(r))render()}),
 wd:()=>{closeAll();wdSheet()},code:()=>{closeAll();codeSheet()},
 cpc:async()=>{try{await navigator.clipboard.writeText(CREDS.pid+CREDS.tok);toast('Скопировано')}catch(e){const t=$('.clt');t&&t.select();toast('Выделите и скопируйте вручную')}},
 rot:()=>{closeAll();sheet(`<h3 style="margin:0">Сменить код?</h3><p style="color:var(--mut);margin:0">Старый код перестанет работать на всех устройствах. Используйте, если код кому-то попал в руки.</p><div class="fac"><button class="bt" data-a="close">Отмена</button><button class="bt p" data-a="rotok">Сменить</button></div>`,{mb:true})},
 rotok:async()=>{closeAll();const r=await go('rot');if(r.tok){CREDS.tok=r.tok;SID=r.sid;SK=r.sk;saveCreds();if(GA&&GA.creds)try{GA.creds(CREDS.pid,CREDS.tok)}catch(e){}toast('Код обновлён');codeSheet()}},
 out:()=>{closeAll();sheet(`<h3 style="margin:0">Выйти из аккаунта?</h3><p style="color:var(--mut);margin:0">Без кода аккаунта вернуться не получится. Сначала сохраните его.</p><div class="fac"><button class="bt" data-a="close">Отмена</button><button class="bt p" style="background:#ff5d5d;color:#fff" data-a="outok">Выйти</button></div>`,{mb:true})},
 outok:()=>{localStorage.removeItem('gg_c');location.reload()}};
document.addEventListener('click',e=>{initAudio();if(sbClick(e))return;const n=e.target.closest('[data-t]');if(n&&(n.closest('nav')||n.id==='hav')){view(+n.dataset.t);return}
 const t=e.target.closest('[data-a]');if(t){const f=ACT[t.dataset.a];if(f){e.preventDefault();f(t)}return}
 if(e.target.closest('#plate')&&TAB===0&&state==='idle'&&!S.pend&&S.name)spin()});
/* ═════════ запуск ═════════ */
const saveCreds=()=>localStorage.setItem('gg_c',JSON.stringify({pid:CREDS.pid,tok:CREDS.tok}));
function welcome(){const w=$('#wel');w.hidden=false;w.innerHTML=`<div class="sl"><div class="logo"></div><h2>Gram Gifts</h2><p style="margin:-8px 4px 20px">Находите NFT-подарки Telegram, меняйтесь ими с друзьями, изготавливайте редкие модели.</p><div class="pin">${ico('user',26)}<input id="wn" placeholder="Как вас зовут?" maxlength="20" autocomplete="off"></div><button class="go" id="ws">Начать играть</button><button class="lq" id="wl">У меня уже есть аккаунт</button></div>`;
 $('#ws').onclick=async()=>{const b=$('#ws');b.disabled=true;b.textContent='Создаём аккаунт…';const[c,ch]=await call('chal',{},false);if(!ch||!ch.c){b.disabled=false;b.textContent='Начать играть';return toast(ERR.net)}
  let x=0;for(;;x++){const h=sha256(U8(ch.c+x.toString(16)));let z=ch.b,i=0,ok=true;while(z>=8){if(h[i++]){ok=false;break}z-=8}if(ok&&z>0&&(h[i]>>(8-z))!==0)ok=false;if(ok)break;if(x%1500===0)await sleep(0)}
  const[c2,j]=await call('hello',{c:ch.c,t:ch.t,x:x.toString(16),name:$('#wn').value.trim()||'Игрок'},false);if(!j||!j.pid){b.disabled=false;b.textContent='Начать играть';return toast(ERR[j&&j.e]||ERR.net)}
  CREDS={pid:j.pid,tok:j.tok};saveCreds();SID=j.sid;SK=j.sk;start()};
 $('#wl').onclick=()=>ask('Код аккаунта','',async v=>{v=v.replace(/\s/g,'').toLowerCase();if(!/^[0-9a-f]{64}$/.test(v))return toast('Код — это 64 символа 0-9 и a-f');CREDS={pid:v.slice(0,32),tok:v.slice(32)};if(await login()){saveCreds();start()}else toast('Код не подошёл')},'64 символа')}
function legacySave(){try{const j=JSON.parse(localStorage.getItem('nft1'));return j&&j.pid&&j.tok?j:null}catch(e){return null}}
async function start(){let r=await go('me');if(r.e)return fail(r);
 if(CREDS.mig){const o=legacySave();if(o&&Array.isArray(o.inv)){const it=o.inv.map(g=>({c:g.c,id:g.id,K:g.K||0,val:g.val,f:g.f||[]}));const m=await go('legacy',{inv:it});if(m.imported!==undefined)toast(`Перенесено подарков из старой версии: ${m.imported}`);else await go('legacy',{inv:[]})}else await go('legacy',{inv:[]});CREDS.mig=0;await go('me')}
 if(GA&&GA.flags)try{const f=JSON.parse(GA.flags());if(f&&f.length)go('ig',{f})}catch(e){}
 $('#wel').hidden=true;plateIdle();view(0);hydB();setInterval(poll,25000);document.addEventListener('visibilitychange',async()=>{if(!document.hidden&&SID){await go('me');render()}})}
function netScreen(){const L=LASTERR,w=$('#wel'),i=(L.i||'').toLowerCase(),ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||!!window.Capacitor,u=L.u||API()||'(адрес не задан)';
 let hint='Проверьте интернет и адрес сервера ниже.';
 if(/pin/.test(i))hint='Сертификат сервера не совпадает с PIN, зашитым в приложение. Возьмите PIN из конца вывода setup.sh (или очистите поле PIN, если у вас домен с обычным сертификатом).';
 else if(/self.signed|unable_to_verify|cert|depth_zero|ssl|tls/.test(i))hint='Сервер использует самоподписанный сертификат. '+(ios?'iPhone такие сертификаты не принимает — нужен домен с обычным HTTPS (например, бесплатный на duckdns.org).':'Укажите PIN сервера ниже.');
 else if(ios&&/failed to fetch|load failed|network/.test(i))hint='iPhone не смог подключиться. Чаще всего причина — самоподписанный сертификат: для iPhone нужен домен с обычным HTTPS (например, бесплатный на duckdns.org).';
 else if(/econnrefused|enotfound|etimedout|econnreset|timeout|failed to fetch|network|load failed|не задан/.test(i))hint='Сервер недоступен: проверьте адрес, что сервер запущен и порт 443 открыт.';
 w.hidden=false;w.innerHTML=`<div class="sl"><h2>Нет связи</h2><p>${esc(hint)}</p><p style="font-size:12.5px;opacity:.7;word-break:break-all">Адрес: ${esc(u)}<br>Причина: ${esc(L.i||'—')} ${L.c?'(код '+L.c+')':''}</p>
 <div class="pin">${ico('info',24)}<input id="na" value="${esc(API())}" placeholder="https://адрес-сервера" autocapitalize="off" autocomplete="off"></div>${GA&&GA.cfg?`<div class="pin" style="margin-top:8px">${ico('key',24)}<input id="np" placeholder="PIN сертификата (если есть)" autocapitalize="off" autocomplete="off"></div>`:''}
 <button class="go" id="nsv">Сохранить и повторить</button><button class="lq" onclick="location.reload()">Просто повторить</button></div>`;
 $('#nsv').onclick=()=>{const a=$('#na').value.trim().replace(/\/+$/,'');if(!/^https?:\/\/[^\s/]+(:\d+)?$/.test(a))return toast('Адрес должен быть вида https://домен или https://IP');
  try{localStorage.setItem('gg_api',a)}catch(e){}if(GA&&GA.cfg)GA.cfg(a,($('#np')||{value:''}).value.trim());setTimeout(()=>location.reload(),300)}}
(async function boot(){try{
 if(GA&&!GA.api2){$('#wel').hidden=false;$('#wel').innerHTML='<div class="sl"><h2>Обновите приложение</h2><p>Эта версия игры требует новую версию приложения Gram Gifts.</p></div>';return}
 const[c,cat]=await call('catalog',{},false);if(!cat||!cat.cols){netScreen();return}
 CAT=cat;let st=null;try{st=JSON.parse(localStorage.getItem('gg_c'))}catch(e){}
 if(!st){const o=legacySave();if(o)st={pid:o.pid,tok:o.tok}}
 if(!st)return welcome();CREDS=st;if(!(await login())){if($('#wel').hidden)welcome();return}saveCreds();start()}catch(e){console.error(e);$('#wel').hidden=false;$('#wel').innerHTML='<div class="sl"><h2>Ошибка запуска</h2><p>'+esc(e.message)+'</p></div>'}})();
