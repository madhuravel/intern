# Login & Registration UI

Task 2 deliverable for the ApexPlanet Full Stack Web Development Internship
(Interactive UI & Frontend Development, Days 13–24).

## Stack
- HTML5 + Bootstrap 5 (grid, form components)
- Custom CSS matching the Task 1 dark terminal theme
- Vanilla JavaScript: validation, password match, show/hide toggle, debounced AJAX check
- A small dummy PHP endpoint (`php/check-user.php`) for the AJAX demo

## Structure
```
task2-login-ui/
├── index.html
├── login.html
├── register.html
├── css/style.css
├── js/
│   ├── components.js   # reusable navbar/footer, injected via JS
│   └── auth.js         # validation, password toggle, AJAX check
├── php/check-user.php  # dummy "is this email taken" endpoint
└── README.md
```

## Features implemented
- Responsive, mobile-first login & registration forms
- Client-side validation: required fields, email format, password length (8+)
- Real-time password match check on the confirm-password field
- Show/Hide password toggle buttons
- Reusable Navbar & Footer components (shared JS, not duplicated markup)
- AJAX email-availability check (debounced) hitting a dummy PHP endpoint —
  this is the pattern Task 3 will extend with a real MySQL lookup

## Running it
Opening `login.html` / `register.html` directly (file://) works for everything
**except** the AJAX check, since that needs a PHP server. To test the full thing:

1. Copy this folder into your XAMPP/WAMP `htdocs` directory
2. Start Apache
3. Visit `http://localhost/task2-login-ui/register.html`
4. Type `test@example.com` into the email field — you should see "already registered"
5. Type any other address — you should see "available"

## Before you submit
- Personalize the copy in `register.html` / `login.html` if you'd like
- Record your 3–5 min demo: show responsive resizing, form validation errors,
  password toggle, password-match check, and the AJAX call in the Network tab

## Commit suggestions (for a real history, not one big commit)
```
git add index.html && git commit -m "Add landing page"
git add login.html && git commit -m "Add login page markup"
git add register.html && git commit -m "Add registration page markup"
git add css/style.css && git commit -m "Add dark theme styles for auth pages"
git add js/components.js && git commit -m "Add reusable navbar/footer components"
git add js/auth.js && git commit -m "Add form validation and password match logic"
git add js/auth.js && git commit -m "Add show/hide password toggle"
git add js/auth.js php/check-user.php && git commit -m "Add AJAX email availability check"
git add . && git commit -m "Responsive tweaks and polish"
```
