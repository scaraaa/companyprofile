// Khusus Kontak: FAQ accordion (satu jawaban terbuka dalam satu waktu)
const butir=document.querySelectorAll('.putri_faq_item');
butir.forEach(it=>it.querySelector('.putri_q').onclick=()=>{
  const buka=it.classList.contains('putri_open');
  butir.forEach(x=>x.classList.remove('putri_open'));
  if(!buka)it.classList.add('putri_open');
});
if(butir[0])butir[0].classList.add('putri_open');
