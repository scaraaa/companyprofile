// Khusus Testimoni: slider otomatis
const slides=document.querySelectorAll('.putri_slide'),dots=document.querySelector('#putri_dots');let idx=0,timer;
slides.forEach((_,i)=>{const d=document.createElement('i');d.onclick=()=>go(i);dots.appendChild(d)});
function go(i){idx=(i+slides.length)%slides.length;
  slides.forEach((s,k)=>s.classList.toggle('putri_show',k===idx));
  [...dots.children].forEach((d,k)=>d.classList.toggle('putri_act',k===idx));
  clearInterval(timer);timer=setInterval(()=>go(idx+1),5000);}
document.querySelector('#putri_prev').onclick=()=>go(idx-1);
document.querySelector('#putri_next').onclick=()=>go(idx+1);go(0);
