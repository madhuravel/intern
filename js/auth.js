document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initLoginForm();
  initRegisterForm();
  initUsernameAvailabilityCheck();
});

/* ---------- Show / Hide password toggle ---------- */
function initPasswordToggles() {
  document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.textContent = isHidden ? 'Hide' : 'Show';
    });
  });
}

/* ---------- Login form validation ---------- */
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    valid = validateEmail(email) && valid;
    valid = validateRequired(password, 'Password is required.') && valid;

    if (valid) {
      // Frontend-only demo: in Task 3 this posts to PHP for real auth.
      showFormMessage(form, 'Looks good — this is a frontend-only demo (no backend yet).', 'available');
    }
  });
}

/* ---------- Register form validation ---------- */
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  const password = document.getElementById('registerPassword');
  const confirm = document.getElementById('registerConfirmPassword');

  confirm.addEventListener('input', () => checkPasswordMatch(password, confirm));
  password.addEventListener('input', () => checkPasswordMatch(password, confirm));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');

    valid = validateRequired(name, 'Name is required.') && valid;
    valid = validateEmail(email) && valid;
    valid = validatePasswordStrength(password) && valid;
    valid = checkPasswordMatch(password, confirm) && valid;

    if (valid) {
      showFormMessage(form, 'Looks good — this is a frontend-only demo (no backend yet).', 'available');
    }
  });
}

function checkPasswordMatch(password, confirm) {
  if (!confirm.value) {
    setFieldState(confirm, null);
    return false;
  }
  const matches = password.value === confirm.value;
  setFieldState(confirm, matches, matches ? '' : 'Passwords do not match.');
  return matches;
}

function validatePasswordStrength(input) {
  const ok = input.value.length >= 8;
  setFieldState(input, ok, ok ? '' : 'Password must be at least 8 characters.');
  return ok;
}

function validateEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ok = re.test(input.value.trim());
  setFieldState(input, ok, ok ? '' : 'Enter a valid email address.');
  return ok;
}

function validateRequired(input, message) {
  const ok = input.value.trim().length > 0;
  setFieldState(input, ok, ok ? '' : message);
  return ok;
}

function setFieldState(input, isValid, message = '') {
  const feedback = input.parentElement.parentElement.querySelector('.invalid-feedback')
    || input.parentElement.querySelector('.invalid-feedback');

  input.classList.remove('is-valid', 'is-invalid');
  if (isValid === null) return;

  input.classList.add(isValid ? 'is-valid' : 'is-invalid');
  if (feedback) feedback.textContent = message;
}

function showFormMessage(form, text, kind) {
  let el = form.querySelector('.form-result');
  if (!el) {
    el = document.createElement('p');
    el.className = 'form-result ajax-status';
    form.appendChild(el);
  }
  el.textContent = text;
  el.className = `form-result ajax-status ${kind}`;
}

/* ---------- AJAX: dummy username/email availability check ----------
   Calls php/check-user.php without reloading the page. Requires a PHP
   server (e.g. XAMPP) to actually respond — on file:// this will fail
   silently, which is expected in a static preview. */
function initUsernameAvailabilityCheck() {
  const email = document.getElementById('registerEmail');
  if (!email) return;

  const status = document.createElement('div');
  status.className = 'ajax-status';
  email.closest('.mb-3').appendChild(status);

  let debounceTimer;
  email.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const value = email.value.trim();
    if (!value) { status.textContent = ''; return; }

    status.textContent = 'Checking availability...';
    status.className = 'ajax-status checking';

    debounceTimer = setTimeout(() => checkEmailAvailability(value, status), 500);
  });
}

async function checkEmailAvailability(email, status) {
  try {
    const res = await fetch(`php/check-user.php?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.taken) {
      status.textContent = 'That email is already registered.';
      status.className = 'ajax-status taken';
    } else {
      status.textContent = 'Email is available.';
      status.className = 'ajax-status available';
    }
  } catch (err) {
    // Expected when opened directly as a file:// page without a PHP server.
    status.textContent = '(AJAX check needs a PHP server — see README)';
    status.className = 'ajax-status checking';
  }
}
