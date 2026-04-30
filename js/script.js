// --- Page navigation ---
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById(id);
  if (t) { t.classList.add('active'); window.scrollTo({top:0,behavior:'instant'}); }
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const isProj = ['referral','tech','merch','summit','avianca','claro'].includes(id);
  if (id === 'home' || isProj) document.getElementById('nav-home').classList.add('active');
  else if (id === 'about') document.getElementById('nav-about').classList.add('active');
  // Show FAB only on project pages
  const fab = document.getElementById('fab-back');
  if (fab) fab.classList.toggle('visible', isProj);
}

// --- Fix CV brands crop after image loads ---
window.addEventListener('load', () => {
  const img = document.getElementById('cv-brands-img');
  if (!img) return;
  function applyCrop() {
    // The brands section is roughly the bottom 28% of the CV image
    const wrap = img.parentElement;
    const naturalRatio = img.naturalHeight / img.naturalWidth;
    const renderedW = wrap.clientWidth;
    const naturalH = renderedW * naturalRatio;
    // show bottom 30% of image
    const showH = naturalH * 0.30;
    wrap.style.height = showH + 'px';
    wrap.style.overflow = 'hidden';
    wrap.style.position = 'relative';
    img.style.position = 'absolute';
    img.style.bottom = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.clipPath = 'none';
  }
  if (img.complete) applyCrop();
  else img.addEventListener('load', applyCrop);
});

// --- Smooth scroll-within-browser-mockups (drag) ---
document.querySelectorAll('.browser-scroll-area').forEach(el => {
  let isDown = false, startY = 0, startScroll = 0;
  el.addEventListener('mousedown', e => {
    isDown = true; startY = e.clientY; startScroll = el.scrollTop;
    el.style.cursor = 'grabbing'; el.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    el.scrollTop = startScroll - (e.clientY - startY);
  });
  document.addEventListener('mouseup', () => {
    isDown = false; el.style.cursor = 'ns-resize'; el.style.userSelect = '';
  });
});
