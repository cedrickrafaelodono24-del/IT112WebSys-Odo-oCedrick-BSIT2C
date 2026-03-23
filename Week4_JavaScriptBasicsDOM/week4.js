// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 60);
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
    const isLight = document.body.classList.contains('light');
    themeIcon.textContent = isLight ? '●' : '◐';
  });
}

// ── MODAL HELPERS ──
const modalOverlay = document.getElementById('modalOverlay');
const modalMessage = document.getElementById('modalMessage');
const closeModal   = document.getElementById('closeModal');

function showModal(msg) {
  modalMessage.textContent = msg;
  modalOverlay.classList.add('show');
}

function hideModal() {
  modalOverlay.classList.remove('show');
}

if (closeModal)   closeModal.addEventListener('click', hideModal);
if (modalOverlay) modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) hideModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideModal();
});

// ── TASK MANAGER ──
const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addTask');
const taskList  = document.getElementById('taskList');
const taskEmpty = document.getElementById('taskEmpty');

function updateEmpty() {
  if (taskList.children.length === 0) {
    taskEmpty.classList.remove('hidden');
  } else {
    taskEmpty.classList.add('hidden');
  }
}

function addTask() {
  const val = taskInput.value.trim();
  if (!val) {
    taskInput.focus();
    return;
  }

  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = val;

  const del = document.createElement('button');
  del.className = 'task-del';
  del.textContent = '×';
  del.setAttribute('aria-label', 'Delete task');

  // Click task text = toggle done
  span.addEventListener('click', () => li.classList.toggle('done'));

  // Click delete button = remove task
  del.addEventListener('click', e => {
    e.stopPropagation();
    li.style.opacity = '0';
    li.style.transform = 'translateX(20px)';
    li.style.transition = 'opacity .25s, transform .25s';
    setTimeout(() => {
      li.remove();
      updateEmpty();
    }, 250);
  });

  li.appendChild(span);
  li.appendChild(del);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
  updateEmpty();
}

if (addBtn) addBtn.addEventListener('click', addTask);
if (taskInput) {
  taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });
}

updateEmpty();

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const email   = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (!email || !message) return;

    showModal(`Thanks for reaching out! We received your message and will reply to ${email} shortly.`);
    contactForm.reset();
  });
}