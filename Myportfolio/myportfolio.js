// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

// ── THEME TOGGLE ──
// ── THEME — load saved preference ──
if (localStorage.getItem('zedd-theme') === 'light') {
  document.body.classList.add('light');
  document.getElementById('ti').textContent = '●';
}

document.getElementById('tb').addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  document.getElementById('ti').textContent = isLight ? '●' : '◐';
  localStorage.setItem('zedd-theme', isLight ? 'light' : 'dark');
});

// ── FULLSTACK PANELS ──
// W06 and W07 both use .fs-panel. Each is scoped by data-panel
// so they auto-cycle and click independently without interfering.

['w06', 'w07'].forEach(panelId => {
  const items  = [...document.querySelectorAll(`.fs-item[data-panel="${panelId}"]`)];
  const slides = [...document.querySelectorAll(`.fs-slide[data-panel="${panelId}"]`)];
  if (!items.length || !slides.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.idx);
      items.forEach(i  => i.classList.remove('active'));
      slides.forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      const target = slides.find(s => parseInt(s.dataset.idx) === idx);
      if (target) target.classList.add('active');
    });
  });

  let cur = 0;
  setInterval(() => {
    cur = (cur + 1) % items.length;
    items.forEach(i  => i.classList.remove('active'));
    slides.forEach(s => s.classList.remove('active'));
    if (items[cur])  items[cur].classList.add('active');
    if (slides[cur]) slides[cur].classList.add('active');
  }, 3000);
});

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rev').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
  ro.observe(el);
});