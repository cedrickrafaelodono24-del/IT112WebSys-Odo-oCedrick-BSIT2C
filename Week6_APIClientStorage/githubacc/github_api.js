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

// ── ENTER KEY on search ──
document.getElementById('username').addEventListener('keydown', e => {
  if (e.key === 'Enter') getUser();
});

// ── GITHUB API ──
function getUser() {
  const username = document.getElementById('username').value.trim();
  const resultContainer = document.getElementById('userResult');

  if (!username) return;

  // Loading state
  resultContainer.innerHTML = `
    <div class="loader">
      <div class="loader-dot"></div>
      <div class="loader-dot"></div>
      <div class="loader-dot"></div>
      <span>Fetching user data...</span>
    </div>
  `;

  const userUrl  = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`;

  Promise.all([
    fetch(userUrl).then(res => {
      if (!res.ok) throw new Error('User not found');
      return res.json();
    }),
    fetch(reposUrl).then(res => res.json())
  ])
  .then(([user, repos]) => {

    // Build repos HTML
    let reposHtml = '';
    if (repos.length > 0) {
      reposHtml = repos.map(repo => `
        <a href="${repo.html_url}" target="_blank" class="repo-item">
          <div class="repo-name">${repo.name}</div>
          <div class="repo-desc">${repo.description || 'No description provided.'}</div>
          <div class="repo-meta">
            <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
            <span class="repo-stat">🍴 ${repo.forks_count}</span>
          </div>
        </a>
      `).join('');
    } else {
      reposHtml = `<p style="font-family:var(--fm);font-size:12px;color:var(--muted);">No public repositories found.</p>`;
    }

    resultContainer.innerHTML = `
      <div class="result-card">

        <div class="result-profile">
          <img class="result-avatar" src="${user.avatar_url}" alt="${user.login}">
          <div class="result-info">
            <div class="result-name">${user.name || user.login}</div>
            <div class="result-login">@${user.login}</div>
            ${user.bio ? `<div class="result-bio">${user.bio}</div>` : ''}
            ${user.location ? `<div class="result-location">📍 ${user.location}</div>` : ''}
          </div>
        </div>

        <div class="result-stats">
          <div class="stat-box">
            <div class="stat-num">${user.public_repos}</div>
            <div class="stat-label">Repos</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${user.followers}</div>
            <div class="stat-label">Followers</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">${user.following}</div>
            <div class="stat-label">Following</div>
          </div>
        </div>

        <div class="result-repos">
          <div class="repos-title">Top 5 Recent Repositories</div>
          <div class="repo-list">${reposHtml}</div>
        </div>

        <a href="${user.html_url}" target="_blank" class="result-view-btn">
          <span>View Full Profile on GitHub →</span>
        </a>

      </div>
    `;
  })
  .catch(err => {
    resultContainer.innerHTML = `
      <div class="error-msg">
        ⚠ ${err.message}
      </div>
    `;
  });
}