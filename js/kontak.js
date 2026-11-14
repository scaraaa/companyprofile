// Khusus Kontak: dropdown layanan (bisa di-scroll) + validasi form pesan
const dd=$('#putri_dd'),btn=$('#putri_dd_btn'),list=$('#putri_dd_list'),txt=$('#putri_dd_txt'),val=$('#putri_pilih');
const KOSONG='-- Pilih layanan / paket --';
function setVal(v){
  val.value=v;txt.textContent=v||KOSONG;dd.classList.toggle('putri_filled',!!v);btn.classList.remove('putri_err');
  list.querySelectorAll('.putri_dd_o').forEach(o=>o.classList.toggle('putri_sel',o.dataset.v===v));
}
function buka(b){
  const o=b===undefined?!dd.classList.contains('putri_open'):b;
  dd.classList.toggle('putri_open',o);btn.setAttribute('aria-expanded',o);
  if(o){
    const r=btn.getBoundingClientRect();
    dd.classList.toggle('putri_up',innerHeight-r.bottom<300&&r.top>300);
    const s=list.querySelector('.putri_sel');list.scrollTop=s?Math.max(0,s.offsetTop-70):0;
  }
}
btn.addEventListener('click',()=>buka());
list.addEventListener('click',e=>{const o=e.target.closest('.putri_dd_o');if(o){setVal(o.dataset.v);buka(false)}});
document.addEventListener('click',e=>{if(!dd.contains(e.target))buka(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')buka(false)});

// Isi otomatis dari ?paket=...
const param=new URLSearchParams(location.search).get('paket');
if(param){const o=[...list.querySelectorAll('.putri_dd_o')].find(x=>x.dataset.v===param);if(o)setVal(param)}

$('#putri_form').addEventListener('submit',e=>{
  e.preventDefault();
  const nama=$('#putri_nama'),em=$('#putri_email'),ps=$('#putri_pesan'),msg=$('#putri_msg');
  let ok=true;[nama,em,ps].forEach(i=>i.classList.remove('putri_err'));btn.classList.remove('putri_err');
  const salah=i=>{i.classList.add('putri_err');ok=false};
  if(nama.value.trim().length<3)salah(nama);
  if(!/^\S+@\S+\.\S+$/.test(em.value))salah(em);
  if(!val.value)salah(btn);
  if(ps.value.trim().length<5)salah(ps);
  msg.className='putri_msg '+(ok?'putri_ok':'putri_bad');
  if(ok){
    const teks='Halo Putri Ayu Salon,\n\nNama: '+nama.value.trim()+'\nEmail: '+em.value.trim()+'\nLayanan/Paket: '+val.value+'\n\nPesan:\n'+ps.value.trim();
    location.href='mailto:putriayusalon@gmail.com?subject='+encodeURIComponent('Pesan dari '+nama.value.trim())+'&body='+encodeURIComponent(teks);
    msg.textContent='Terima kasih, '+nama.value.trim()+'! Aplikasi email kamu akan terbuka, tinggal tekan kirim.';e.target.reset();setVal('');} 
  else msg.textContent='Mohon lengkapi semua kolom dengan benar ya.';
});
