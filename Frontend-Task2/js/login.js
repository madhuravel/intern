/**
 * Login Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) return;

    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const loginBtn = document.getElementById('loginBtn');
    
    // Check form validity on input changes
    const checkFormValidity = () => {
        let isValid = true;

        // Check Email
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            isValid = false;
            if (emailInput.value.trim()) setInputValidationClass(emailInput, false);
        } else {
            setInputValidationClass(emailInput, true);
        }

        // Check Password
        if (!passwordInput.value.trim()) {
            isValid = false;
            if(passwordInput.value.length > 0) setInputValidationClass(passwordInput, false);
        } else {
            setInputValidationClass(passwordInput, true);
        }

        // Enable/Disable submit button
        loginBtn.disabled = !isValid;
    };

    // Add input listeners
    emailInput.addEventListener('input', checkFormValidity);
    passwordInput.addEventListener('input', checkFormValidity);

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validation check
        if (loginBtn.disabled) return;

        // UI Loading State
        const btnText = loginBtn.querySelector('.btn-text');
        const spinner = document.getElementById('loginSpinner');
        
        btnText.classList.add('d-none');
        spinner.classList.remove('d-none');
        loginBtn.disabled = true;

        // Simulate API call for login
        setTimeout(() => {
            // Revert UI
            btnText.classList.remove('d-none');
            spinner.classList.add('d-none');
            loginBtn.disabled = false;
            
            // Assuming success, maybe redirect
            alert('Login successful! Welcome back.');
            window.location.href = 'index.html';
            
        }, 1500);
    });
});
