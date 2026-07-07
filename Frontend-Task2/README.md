# AuthApp - Responsive Login & Registration Template

## Project Description
A complete, responsive, and modern Login and Registration web application template built with HTML5, CSS3, Bootstrap 5, and JavaScript. It features advanced client-side form validation, an AJAX username availability checker, dark mode, password strength metering, and a beautiful glassmorphism UI design.

## Technologies Used
- HTML5
- CSS3 (Custom variables, animations, glassmorphism)
- Bootstrap 5 (Responsive grid, components)
- JavaScript (Vanilla JS for validation, DOM manipulation, Fetch API)
- PHP (Simple dummy backend for AJAX checking)
- Google Fonts (Poppins)
- Bootstrap Icons

## Features
- **Responsive Design**: Mobile-first layout using Bootstrap 5 grid.
- **Glassmorphism UI**: Modern transparent, frosted glass styled cards.
- **Dark Mode**: Integrated dark/light theme toggle saved in local storage.
- **Real-time Form Validation**:
  - Email format validation.
  - Comprehensive password rules (min 8 chars, upper, lower, number, special).
  - Password strength meter.
  - Password matching.
- **AJAX Username Checker**: Checks if a username is available in real-time via Fetch API and a dummy PHP script.
- **Interactive UI Elements**: Show/Hide password toggle, animated buttons, loading spinners on submit.
- **Success Modal**: Animated modal popup upon successful registration.
- **Reusable Components**: Consistent navbar, footer, and form layouts.

## Folder Structure
```
Frontend-Task2/
│
├── index.html               # Landing page
├── login.html               # Login page
├── register.html            # Registration page
├── css/
│   ├── style.css            # Main custom styling and glassmorphism
│   ├── responsive.css       # Media queries
│
├── js/
│   ├── validation.js        # Common validation functions and theme toggle
│   ├── login.js             # Login form specific logic
│   ├── register.js          # Registration logic and AJAX calls
│
├── php/
│   └── check_username.php   # Dummy API endpoint for checking usernames
│
├── README.md                # Documentation
```

## Screenshots
*(Add screenshots here)*
- Desktop Login
- Mobile Register
- Dark Mode View

## Installation Steps
1. Clone or download the repository.
2. Ensure you have a local web server running (like XAMPP, WAMP, or PHP Built-in Server) if you want to test the AJAX PHP feature.
   - Using PHP built-in server: Open terminal in `Frontend-Task2/` and run `php -S localhost:8000`.
3. Open `http://localhost:8000/index.html` in your browser.
4. Try typing "admin" or "test" in the registration username field to see the AJAX "Already Exists" message.
