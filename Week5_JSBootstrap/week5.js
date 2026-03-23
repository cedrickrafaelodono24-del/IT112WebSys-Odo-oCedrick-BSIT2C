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

// ── HERO CAROUSEL ──
const slides    = [...document.querySelectorAll('.carousel-slide')];
const dotsWrap  = document.getElementById('carouselDots');
const prevBtn   = document.getElementById('carouselPrev');
const nextBtn   = document.getElementById('carouselNext');
let   current   = 0;
let   autoTimer = null;

// Build dots
slides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'cdot' + (i === 0 ? ' on' : '');
  d.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(d);
});

function goTo(idx) {
  slides[current].classList.remove('active');
  dotsWrap.querySelectorAll('.cdot')[current].classList.remove('on');
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add('active');
  dotsWrap.querySelectorAll('.cdot')[current].classList.add('on');
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
nextBtn.addEventListener('click', () => { next(); resetAuto(); });

function startAuto() {
  autoTimer = setInterval(next, 4500);
}
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}
startAuto();

// Pause on hover
document.getElementById('heroCarousel').addEventListener('mouseenter', () => clearInterval(autoTimer));
document.getElementById('heroCarousel').addEventListener('mouseleave', startAuto);

// Touch swipe
let touchStartX = 0;
document.getElementById('heroCarousel').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('heroCarousel').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (dx < -50) { next(); resetAuto(); }
  if (dx >  50) { prev(); resetAuto(); }
}, { passive: true });

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