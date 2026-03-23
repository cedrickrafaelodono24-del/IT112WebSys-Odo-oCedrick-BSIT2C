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
}, { threshold: 0.08 });

document.querySelectorAll('.rev').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
  ro.observe(el);
});

// ── USER MANAGER ──
const userForm   = document.getElementById('userForm');
const userList   = document.getElementById('userList');
const userEmpty  = document.getElementById('userEmpty');
const userCount  = document.getElementById('userCount');
const msg        = document.getElementById('msg');

let users = [];

function updateCount() {
  userCount.textContent = users.length + (users.length === 1 ? ' user' : ' users');
}

function renderUsers() {
  // remove all items except the empty placeholder
  [...userList.querySelectorAll('.user-item')].forEach(el => el.remove());

  if (users.length === 0) {
    userEmpty.style.display = '';
    updateCount();
    return;
  }

  userEmpty.style.display = 'none';

  users.forEach((user, idx) => {
    const item = document.createElement('div');
    item.className = 'user-item';

    const info = document.createElement('div');
    info.className = 'user-info';

    const name = document.createElement('div');
    name.className = 'user-name';
    name.textContent = user.name;

    const email = document.createElement('div');
    email.className = 'user-email';
    email.textContent = user.email;

    info.appendChild(name);
    info.appendChild(email);

    const age = document.createElement('div');
    age.className = 'user-age';
    age.textContent = user.age ? user.age : '—';

    const del = document.createElement('button');
    del.className = 'user-delete';
    del.textContent = '×';
    del.setAttribute('aria-label', 'Remove user');
    del.addEventListener('click', () => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(16px)';
      item.style.transition = 'opacity .25s, transform .25s';
      setTimeout(() => {
        users.splice(idx, 1);
        renderUsers();
      }, 250);
    });

    item.appendChild(info);
    item.appendChild(age);
    item.appendChild(del);
    userList.appendChild(item);
  });

  updateCount();
}

function showMsg(text, type) {
  msg.textContent = text;
  msg.className = 'form-msg ' + type;
  setTimeout(() => { msg.className = 'form-msg'; msg.textContent = ''; }, 3500);
}

// Try to fetch from backend; fall back to local if server not running
async function loadUsers() {
  try {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error();
    users = await res.json();
    renderUsers();
  } catch {
    // Backend not running — use local array (still shows UI correctly)
    renderUsers();
  }
}

if (userForm) {
  userForm.addEventListener('submit', async e => {
    e.preventDefault();

    const name  = userForm.querySelector('#name').value.trim();
    const email = userForm.querySelector('#email').value.trim();
    const age   = userForm.querySelector('#age').value.trim();

    if (!name || !email) return;

    const newUser = { name, email, age: age ? parseInt(age) : null };

    // Try POST to backend; fall back to local push
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      users.push(saved);
    } catch {
      // Backend not running — add locally
      users.push({ ...newUser, id: Date.now() });
    }

    renderUsers();
    userForm.reset();
    showMsg('User saved successfully! ✦', 'success');
  });
}

// Initial load
loadUsers();