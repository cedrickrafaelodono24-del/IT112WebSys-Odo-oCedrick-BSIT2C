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
document.getElementById('city').addEventListener('keydown', e => {
  if (e.key === 'Enter') getWeather();
});

// ── WEATHER API ──
function getWeather() {
  const city   = document.getElementById('city').value.trim();
  const result = document.getElementById('weatherResult');

  if (!city) return;

  // Loading state
  result.innerHTML = `
    <div class="loader">
      <div class="loader-dot"></div>
      <div class="loader-dot"></div>
      <div class="loader-dot"></div>
      <span>Fetching weather data...</span>
    </div>
  `;

  const apiKey = '80fcd7c696753203e11f05f997ee8128';
  const url    = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('City not found');
      return res.json();
    })
    .then(data => {
      const temp     = Math.round(data.main.temp);
      const feels    = Math.round(data.main.feels_like);
      const humidity = data.main.humidity;
      const wind     = data.wind.speed;
      const icon     = data.weather[0].icon;
      const desc     = data.weather[0].description;
      const name     = data.name;
      const country  = data.sys.country;

      result.innerHTML = `
        <div class="weather-data">
          <div class="weather-location">${name}</div>
          <div class="weather-country">${country}</div>
          <div class="weather-main">
            <img class="weather-icon"
              src="https://openweathermap.org/img/wn/${icon}@2x.png"
              alt="${desc}">
            <div>
              <div class="weather-temp">${temp}°C</div>
              <div class="weather-desc">${desc}</div>
            </div>
          </div>
          <div class="weather-stats">
            <div class="weather-stat">
              <div class="stat-val">${feels}°</div>
              <div class="stat-key">Feels Like</div>
            </div>
            <div class="weather-stat">
              <div class="stat-val">${humidity}%</div>
              <div class="stat-key">Humidity</div>
            </div>
            <div class="weather-stat">
              <div class="stat-val">${wind}</div>
              <div class="stat-key">Wind m/s</div>
            </div>
          </div>
        </div>
      `;
    })
    .catch(err => {
      result.innerHTML = `
        <div class="weather-error">
          ⚠ ${err.message}. Please check the city name and try again.
        </div>
      `;
    });
}