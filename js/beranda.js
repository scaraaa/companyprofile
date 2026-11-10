// Khusus Beranda: efek mengetik + hitung angka statistik
const ketik=['Hair Spa','Creambath','Facial','Smoothing & Rebonding','Makeup Wedding','Manicure & Nail Art'];
let w=0,c=0,hapus=false;const typed=document.querySelector('#putri_typed');
(function type(){
  const t=ketik[w];typed.textContent=t.slice(0,c);
  if(!hapus&&c++===t.length){hapus=true;return setTimeout(type,1300)}
  if(hapus&&--c<0){hapus=false;c=0;w=(w+1)%ketik.length}
  setTimeout(type,hapus?45:90);
})();

const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  const b=e.target,t=+b.dataset.target;let n=0;const step=Math.ceil(t/60);
  const id=setInterval(()=>{n=Math.min(n+step,t);b.textContent=n;if(n>=t)clearInterval(id)},25);cio.unobserve(b)}),{threshold:.6});
document.querySelectorAll('[data-target]').forEach(b=>cio.observe(b));
