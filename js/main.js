// Fitur bersama (dipakai semua halaman) - Putri Ayu Salon
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const halus=matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches;

// Navbar: efek scroll, progress bar, tombol ke atas
const header=$('#putri_header'),prog=$('#putri_progress'),topBtn=$('#putri_top');
const halamanDalam=document.body.classList.contains('putri_inner');
function onScroll(){
  const y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;
  prog.style.width=(h>0?y/h*100:0)+'%';
  header.classList.toggle('putri_scrolled',halamanDalam||y>40);
  topBtn.classList.toggle('putri_vis',y>500);
}
window.addEventListener('scroll',onScroll);onScroll();
topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// Menu mobile (hamburger)
const nav=$('#putri_nav'),burger=$('#putri_burger');
burger.onclick=()=>{nav.classList.toggle('putri_open');burger.classList.toggle('putri_x',nav.classList.contains('putri_open'))};

// Judul muncul per kata
$$('.putri_title').forEach(t=>{
  if(t.children.length)return;
  t.innerHTML=t.textContent.trim().split(/\s+/).map((w,i)=>'<span class="putri_w"><span style="transition-delay:'+(i*80)+'ms">'+w.replace(/&/g,'&amp;')+'</span></span>').join(' ');
});

// Animasi muncul saat di-scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target;el.classList.add('putri_in');io.unobserve(el);
  if(el.style.transitionDelay)setTimeout(()=>el.style.transitionDelay='',1500);
}),{threshold:.15});
$$('.putri_reveal').forEach((el,i)=>{el.style.transitionDelay=(i%3)*.12+'s';io.observe(el)});
$$('.putri_title').forEach(t=>io.observe(t));

if(halus){
  // Cahaya lembut mengikuti kursor
  const glow=document.createElement('div');glow.className='putri_glow';document.body.appendChild(glow);
  let gx=0,gy=0,tx=0,ty=0;
  addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;glow.style.opacity=1});
  document.addEventListener('mouseleave',()=>glow.style.opacity=0);
  (function loop(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;glow.style.transform='translate('+gx+'px,'+gy+'px)';requestAnimationFrame(loop)})();

  // Kartu miring 3D mengikuti kursor
  $$('.putri_tilt').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--ry',(x*9)+'deg');el.style.setProperty('--rx',(-y*9)+'deg');el.style.setProperty('--ty','-8px');
    });
    el.addEventListener('pointerleave',()=>['--rx','--ry','--ty'].forEach(v=>el.style.removeProperty(v)));
  });

  // Parallax halus di hero
  const hero=$('.putri_hero');
  if(hero){
    const ps=hero.querySelectorAll('[data-d]');
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      ps.forEach(p=>{const d=+p.dataset.d;p.style.translate=(x*d)+'px '+(y*d)+'px'});
    });
    hero.addEventListener('pointerleave',()=>ps.forEach(p=>p.style.translate=''));
  }
}
