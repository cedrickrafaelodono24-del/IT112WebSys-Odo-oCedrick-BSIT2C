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

// ── OPTION BUTTON HELPERS ──
function setActiveOpt(groupId, val) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.pref-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.val === val);
  });
}

function selectPref(type, val) {
  const groupId = type === 'theme' ? 'themeOptions' : 'languageOptions';
  setActiveOpt(groupId, val);

  // Live-apply theme when theme option is clicked
  if (type === 'theme') {
    if (val === 'light') {
      document.body.classList.add('light');
      themeIcon.textContent = '●';
    } else {
      document.body.classList.remove('light');
      themeIcon.textContent = '◐';
    }
  }

  // Mark as unsaved
  const status = document.getElementById('prefStatus');
  status.textContent = 'Unsaved';
  status.classList.remove('saved');
}

function getSelectedOpt(groupId) {
  const active = document.querySelector(`#${groupId} .pref-opt.active`);
  return active ? active.dataset.val : null;
}

// ── SAVE PREFERENCES ──
function savePreferences() {
  const theme    = getSelectedOpt('themeOptions')    || 'dark';
  const language = getSelectedOpt('languageOptions') || 'en';

  localStorage.setItem('theme',    theme);
  localStorage.setItem('language', language);

  // Update status pill
  const status = document.getElementById('prefStatus');
  status.textContent = 'Saved';
  status.classList.add('saved');

  // Show success message
  const msg = document.getElementById('message');
  msg.textContent = 'Preferences saved successfully ✦';
  msg.classList.add('show');
  setTimeout(() => msg.classList.remove('show'), 2500);

  // Update summary display
  updateSummary(theme, language);
}

function updateSummary(theme, language) {
  const themeLabels    = { dark: 'Dark', light: 'Light' };
  const langLabels     = { en: 'English', es: 'Spanish' };
  document.getElementById('savedThemeDisplay').textContent = themeLabels[theme]    || theme;
  document.getElementById('savedLangDisplay').textContent  = langLabels[language]  || language;
}

// ── APPLY PREFERENCES ON LOAD ──
function applyPreferences() {
  const savedTheme = localStorage.getItem('theme')    || 'dark';
  const savedLang  = localStorage.getItem('language') || 'en';

  // Apply theme to body
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    if (themeIcon) themeIcon.textContent = '●';
  } else {
    document.body.classList.remove('light');
    if (themeIcon) themeIcon.textContent = '◐';
  }

  // Sync option buttons
  setActiveOpt('themeOptions',    savedTheme);
  setActiveOpt('languageOptions', savedLang);

  // Update status + summary if data exists
  if (localStorage.getItem('theme')) {
    const status = document.getElementById('prefStatus');
    status.textContent = 'Saved';
    status.classList.add('saved');
    updateSummary(savedTheme, savedLang);
  }
}

applyPreferences();