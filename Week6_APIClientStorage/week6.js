// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

// ── THEME — load saved preference ──
if (localStorage.getItem('zedd-theme') === 'light') {
  document.body.classList.add('light');
  const ti = document.getElementById('themeIcon');
  if (ti) ti.textContent = '●';
}

// ── THEME TOGGLE ──
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeIcon.textContent = document.body.classList.contains('light') ? '●' : '◐';
    localStorage.setItem('zedd-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.rev').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
  ro.observe(el);
});

// ── STAGGERED ACTIVITY CARDS ──
const actCards = [...document.querySelectorAll('.act-card')];

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = actCards.indexOf(e.target);
      setTimeout(() => e.target.classList.add('on'), idx * 80);
      cardObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

actCards.forEach(card => {
  card.classList.add('rev');
  cardObserver.observe(card);
});