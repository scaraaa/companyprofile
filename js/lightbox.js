// Popup gambar besar (Galeri & Sertifikat) dengan tombol sebelumnya / berikutnya
const modal=document.querySelector('#putri_modal'),big=document.querySelector('#putri_modal_img'),cap=document.querySelector('#putri_modal_txt');
const items=[...document.querySelectorAll('.putri_zoom')];let now=0;
function tampil(i){
  now=(i+items.length)%items.length;
  const img=items[now].querySelector('img');
  big.src=img.src;big.alt=img.alt;cap.textContent=items[now].dataset.t;
  modal.classList.add('putri_open');
}
items.forEach((g,i)=>g.onclick=()=>tampil(i));
document.querySelector('#putri_lb_prev').onclick=e=>{e.stopPropagation();tampil(now-1)};
document.querySelector('#putri_lb_next').onclick=e=>{e.stopPropagation();tampil(now+1)};
modal.onclick=e=>{if(e.target!==big)modal.classList.remove('putri_open')};
document.addEventListener('keydown',e=>{
  if(!modal.classList.contains('putri_open'))return;
  if(e.key==='Escape')modal.classList.remove('putri_open');
  if(e.key==='ArrowLeft')tampil(now-1);
  if(e.key==='ArrowRight')tampil(now+1);
});
