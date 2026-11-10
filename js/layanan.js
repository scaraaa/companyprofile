// Khusus Layanan: filter kategori + indikator geser (bisa dibuka lewat #rambut, #wajah, #makeup, #kuku)
const box=document.querySelector('#putri_tabs'),ind=document.querySelector('.putri_ind');
const tabs=document.querySelectorAll('.putri_tab'),grup=document.querySelectorAll('.putri_group');
function geser(){
  const a=box.querySelector('.putri_active');
  ind.style.width=a.offsetWidth+'px';ind.style.height=a.offsetHeight+'px';
  ind.style.transform='translate('+a.offsetLeft+'px,'+a.offsetTop+'px)';
}
function pilih(f,animasi){
  tabs.forEach(t=>t.classList.toggle('putri_active',t.dataset.f===f));
  grup.forEach(g=>{
    const tampil=f==='all'||g.dataset.c===f;
    g.classList.toggle('putri_hide',!tampil);
    if(tampil&&animasi){g.classList.remove('putri_swap');void g.offsetWidth;g.classList.add('putri_swap')}
  });
  geser();
}
tabs.forEach(t=>t.onclick=()=>pilih(t.dataset.f,true));
const h=location.hash.slice(1);
if(h&&[...tabs].some(t=>t.dataset.f===h))pilih(h,false);else geser();
addEventListener('resize',geser);addEventListener('load',geser);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(geser);
