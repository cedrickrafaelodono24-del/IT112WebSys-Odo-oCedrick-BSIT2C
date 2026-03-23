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

// ── GOOGLE MAPS CALLBACK ──
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: { lat: 14.5995, lng: 120.9842 }, // Manila, PH
    styles: [
      { elementType: 'geometry',        stylers: [{ color: '#1a1a1a' }] },
      { elementType: 'labels.text.fill',stylers: [{ color: '#555555' }] },
      { elementType: 'labels.text.stroke',stylers:[{ color: '#0a0a0a' }] },
      { featureType: 'road',            elementType: 'geometry',        stylers: [{ color: '#2a2a2a' }] },
      { featureType: 'road',            elementType: 'geometry.stroke', stylers: [{ color: '#1a1a1a' }] },
      { featureType: 'water',           elementType: 'geometry',        stylers: [{ color: '#0d0d0d' }] },
      { featureType: 'poi',             elementType: 'geometry',        stylers: [{ color: '#1c1c1c' }] },
      { featureType: 'administrative',  elementType: 'geometry.stroke', stylers: [{ color: '#cf2222' }] },
    ]
  });

  // Marker on Manila
  new google.maps.Marker({
    position: { lat: 14.5995, lng: 120.9842 },
    map,
    title: 'Manila, Philippines',
  });
}