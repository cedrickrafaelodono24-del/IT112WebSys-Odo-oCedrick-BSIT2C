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
  el.style.transitionDelay = (i * 0.06) + 's';
  ro.observe(el);
});

// ── COPY CODE BUTTON ──
const copyBtn = document.getElementById('copyBtn');

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const code = [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '    <title>Lab 1 Test</title>',
      '</head>',
      '<body>',
      '    <h1>Hello, Web Technologies!</h1>',
      '    <p>This is a test file created using Visual Studio Code.</p>',
      '</body>',
      '</html>'
    ].join('\n');

    navigator.clipboard.writeText(code).then(() => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // fallback if clipboard API not available (e.g. file://)
      copyBtn.textContent = 'Done!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });
  });
}