/**
 * Common Validation and UI Features
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const body = document.body;

    // Check localStorage for theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.hasAttribute('data-theme')) {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                darkModeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                darkModeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            }
        });
    }

    // 2. Show/Hide Password Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });
});

/**
 * Validates an email address.
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validates password strength based on requirements:
 * Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
 * @param {string} password 
 * @returns {object} { isValid: boolean, score: number (0-100) }
 */
function validatePassword(password) {
    let score = 0;
    let isValid = true;
    
    // Constraints checks
    const hasMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasMinLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        isValid = false;
    }

    // Calculate score for meter
    if (password.length >= 8) score += 20;
    if (password.length > 12) score += 10;
    if (hasUpper) score += 20;
    if (hasLower) score += 20;
    if (hasNumber) score += 15;
    if (hasSpecial) score += 15;

    return { isValid, score };
}

/**
 * Sets validation class on a bootstrap input field
 * @param {HTMLElement} input 
 * @param {boolean} isValid 
 */
function setInputValidationClass(input, isValid) {
    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}
