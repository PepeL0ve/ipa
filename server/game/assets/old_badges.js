/* ---------- Статусы рядом с ником: 047 — верификация пиарщика, 007 — бан. Выдаёт админ-бот, игра только показывает ---------- */
const SBS={},SBP=new Set(),SBV=new Set(),SBMAX=5,
hh=t=>String(t).replace(/[&<>\"']/g,c=>'&#'+c.charCodeAt(0)+';'),
sbH=(b,t,w)=>b==='pr'||b==='ban'?`<i class=\"sb\" data-b=\"${b}\" data-t=\"${(+t||0)|0}\" data-w=\"${esc(w||'')}\" data-n=\"${b==='ban'?'007':'047'}\" role=\"button\" aria-label=\"${b==='ban'?'Статус 007: бан':'Статус 047: пиарщик'}\"></i>`:'';
const IOB=window.IntersectionObserver?new IntersectionObserver(es=>{es.forEach(e=>{const el=e.target;if(e.isIntersecting){SBV.add(el);sbPlay(el)}else{SBV.delete(el);sbStop(el)}})},{rootMargin:'40px'}):null;
function hydB(r){(r||document).querySelectorAll('.sb[data-b]:not([data-h])').forEach(el=>{el.dataset.h=1;IOB?IOB.observe(el):sbPlay(el)})}
function clrB(r){(r||document).querySelectorAll('.sb[data-h]').forEach(el=>{if(IOB)IOB.unobserve(el);SBV.delete(el);sbStop(el)})}
function sbPlay(el){
  if(el._a||!el.isConnected)return;
  if(!window.lottie){el.classList.add('nf');if((el._w=(el._w||0)+1)<40)setTimeout(()=>sbPlay(el),700);return}   /* пока lottie не загрузилась — плашка 047/007, потом заменим анимацией */
  const c=el.dataset.b;if(!window.SBJ||!SBJ[c]){el.classList.add('nf');return}
  while(SBP.size>=SBMAX){const o=SBP.values().next().value;SBP.delete(o);try{o._a.pause()}catch(e){}}   /* лишние замирают на кадре, а не пропадают */
  try{SBS[c]=SBS[c]||JSON.stringify(SBJ[c]);
    el._a=lottie.loadAnimation({container:el,renderer:'canvas',loop:true,autoplay:true,animationData:JSON.parse(SBS[c]),rendererSettings:{preserveAspectRatio:'xMidYMid meet',clearCanvas:true,dpr:Math.min(px(),2)}});
    el._a.addEventListener('data_failed',()=>{sbStop(el);el.classList.add('nf')});SBP.add(el);el.classList.remove('nf')}
  catch(e){el._a=null;el.classList.add('nf')}}
function sbStop(el){if(!el)return;SBP.delete(el);if(el._a){try{el._a.destroy()}catch(e){}el._a=null;el.innerHTML=''}}
document.addEventListener('visibilitychange',()=>{SBP.forEach(e=>{try{document.hidden?e._a.pause():e._a.play()}catch(_){}})});
/* имя + статус в шапке и в профиле; пересоздаём только если что-то поменялось, чтобы анимация не моргала */
function nmSet(el,nm){if(!el)return;const b=S.sb||{},k=nm+'|'+(b.b||'')+'|'+(b.t||0)+'|'+(b.w||'');if(el._k===k)return;el._k=k;
  clrB(el);el.innerHTML=hh(nm)+sbH(b.b,b.t,b.w);hydB(el)}
/* свой статус: приходит с сервера в inbox и в ответе на бан */
function meUpd(j){const m=j.me||(j.e==='ban'?j:null);if(!m||typeof m.b!=='string')return;
  const n={b:m.b==='ban'||m.b==='pr'?m.b:'',t:+m.bt||0,w:String(m.bw||'').slice(0,120)},o=S.sb||{};
  if(o.b===n.b&&o.t===n.t&&o.w===n.w)return;S.sb=n;save();hdr();if(tab===1)rInv();if(n.b==='ban')toast('Аккаунт заблокирован: статус 007')}
/* подсказка рядом со значком */
let sbTm=0;
function sbHide(){const t=$('#sbt');if(t)t.remove();clearTimeout(sbTm)}
function sbTip(el){sbHide();const k=el.dataset.b,w=el.dataset.w||'',t=+el.dataset.t||0,ban=k==='ban',
  h=ban?'Статус 007 · бан':'Статус 047 · верификация пиарщика',
  p=ban?'Аккаунт заблокирован. Причина: '+(w||'не указана')+'.':'Подтверждённый пиарщик проекта Gram Gifts. Статус выдан администрацией.',
  d=t?(ban?'Дата блокировки: ':'Статус выдан: ')+new Date(t*1000).toLocaleDateString('ru-RU'):'';
  const e=document.createElement('div');e.id='sbt';e.className='sbt '+k;e._el=el;e.innerHTML=`<b>${h}</b><span>${esc(p)}</span>${d?`<small>${d}</small>`:''}<i class=\"ar\"></i>`;
  document.body.appendChild(e);
  const r=el.getBoundingClientRect(),W=e.offsetWidth,H=e.offsetHeight,vw=document.documentElement.clientWidth,cx=r.left+r.width/2;
  const x=Math.min(Math.max(8,cx-W/2),Math.max(8,vw-W-8));let y=r.bottom+10,up=0;
  if(y+H>innerHeight-8&&r.top-H-10>8){y=r.top-H-10;up=1}
  e.style.left=x+'px';e.style.top=y+'px';e.style.setProperty('--ax',Math.min(Math.max(16,cx-x),W-16)+'px');e.classList.toggle('up',!!up);
  requestAnimationFrame(()=>e.classList.add('on'));sbTm=setTimeout(sbHide,5500)}
function sbClick(e){const el=e.target.closest&&e.target.closest('.sb[data-b]');
  if(el){e.preventDefault();e.stopPropagation();const t=$('#sbt'),same=t&&t._el===el;sbHide();if(!same)sbTip(el);return true}
  if($('#sbt'))sbHide();return false}
document.addEventListener('scroll',sbHide,true);