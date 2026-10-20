/* ---------- Звук ---------- */
let A,Mg,NB;
function initAudio(){if(A){if(A.state==='suspended')A.resume();return}try{A=new(window.AudioContext||window.webkitAudioContext)();Mg=A.createGain();Mg.gain.value=.8;Mg.connect(A.destination);NB=A.createBuffer(1,A.sampleRate*.2,A.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}catch(e){A=null}}
function tone(type,f,t0,dur,vol,f2){const o=A.createOscillator(),g=A.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);g.gain.setValueAtTime(vol,t0);g.gain.exponentialRampToValueAtTime(.0005,t0+dur);o.connect(g).connect(Mg);o.start(t0);o.stop(t0+dur+.02)}
function clack(t,vol=.22,dur=.03){if(!A)return;const n=A.currentTime,s=A.createBufferSource(),g=A.createGain(),f=A.createBiquadFilter();s.buffer=NB;f.type='bandpass';f.frequency.value=2600-1500*t;f.Q.value=1.2;g.gain.setValueAtTime(vol,n);g.gain.exponentialRampToValueAtTime(.001,n+dur);s.connect(f).connect(g).connect(Mg);s.start(n,Math.random()*.1);s.stop(n+dur+.01)}
const stopSnd=()=>{if(!A)return;clack(.9,.5,.09);tone('sine',170,A.currentTime,.22,.4,45)};
const tick=k=>{if(A)tone('square',700+k*900+Math.random()*90,A.currentTime,.04,.03)};
const ding=t=>{if(!A)return;const n=A.currentTime;tone('sine',420+t*110,n,.35,.12);tone('triangle',840+t*220,n,.25,.05)};
const coin=()=>{if(!A)return;const n=A.currentTime;tone('square',988,n,.09,.05);tone('square',1319,n+.08,.22,.05)};
function chord(){if(!A)return;const n=A.currentTime,f=A.createBiquadFilter();f.type='lowpass';f.Q.value=3;f.frequency.setValueAtTime(180,n);f.frequency.exponentialRampToValueAtTime(1600,n+1.4);f.connect(Mg);[55,82.4,110,164.8,220,329.6].forEach((hz,i)=>{const o=A.createOscillator(),g=A.createGain();o.type=i%2?'triangle':'sawtooth';o.frequency.value=hz;g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(.09,n+.5);g.gain.exponentialRampToValueAtTime(.001,n+3.4);o.connect(g).connect(f);o.start(n);o.stop(n+3.5)})}


