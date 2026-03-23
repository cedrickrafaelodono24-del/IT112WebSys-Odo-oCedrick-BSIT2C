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
document.getElementById('username').addEventListener('keydown', e => {
  if (e.key === 'Enter') saveData();
});

// ── STORAGE FUNCTIONS ──
function updateStatus() {
  const status = document.getElementById('storageStatus');
  const name   = localStorage.getItem('userName');
  if (name) {
    status.textContent = 'Data saved';
    status.classList.add('has-data');
  } else {
    status.textContent = 'No data saved';
    status.classList.remove('has-data');
  }
}

function loadData() {
  const name    = localStorage.getItem('userName');
  const display = document.getElementById('display');
  if (name) {
    display.textContent = name;
    display.classList.remove('empty');
  } else {
    display.textContent = '--';
    display.classList.add('empty');
  }
  updateStatus();
}

function saveData() {
  const name = document.getElementById('username').value.trim();
  if (!name) return;
  localStorage.setItem('userName', name);
  loadData();
}

function clearData() {
  localStorage.removeItem('userName');
  document.getElementById('username').value = '';
  loadData();
}

// Load on page start
loadData();