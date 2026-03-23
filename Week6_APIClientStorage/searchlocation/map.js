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

// ── ENTER KEY ──
document.getElementById('locationInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') searchLocation();
});

// ── SEARCH FUNCTION ──
function searchLocation() {
  const input  = document.getElementById('locationInput').value.trim();
  const status = document.getElementById('statusMessage');

  if (!input) {
    status.innerHTML = `<p class="status-hint">Please enter a location name first.</p>`;
    return;
  }

  // API is non-active — show styled error
  status.innerHTML = `
    <p class="status-error">
      ⚠ Error: The API is currently non-active.<br>
      Search for "<strong style="color:var(--text)">${input}</strong>" could not be completed.
    </p>
  `;
}