/**
 * Registration Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (!registerForm) return;

    const nameInput = document.getElementById('regName');
    const usernameInput = document.getElementById('regUsername');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const registerBtn = document.getElementById('registerBtn');
    
    const passwordStrengthBar = document.getElementById('passwordStrength');
    const usernameStatus = document.getElementById('usernameStatus');
    
    let isUsernameAvailable = false;

    // AJAX Username Check
    let debounceTimer;
    usernameInput.addEventListener('blur', () => {
        const username = usernameInput.value.trim();
        if (!username) {
            usernameStatus.classList.add('d-none');
            setInputValidationClass(usernameInput, false);
            checkFormValidity();
            return;
        }

        // Show checking status visually
        usernameStatus.textContent = 'Checking availability...';
        usernameStatus.className = 'form-text small mt-1 text-muted d-block';

        // Call our dummy PHP script
        fetch(`php/check_username.php?username=${encodeURIComponent(username)}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'available') {
                    isUsernameAvailable = true;
                    usernameStatus.innerHTML = '<i class="bi bi-check-circle me-1"></i> Username Available';
                    usernameStatus.className = 'form-text small mt-1 text-success d-block';
                    setInputValidationClass(usernameInput, true);
                } else {
                    isUsernameAvailable = false;
                    usernameStatus.innerHTML = '<i class="bi bi-x-circle me-1"></i> Username Already Exists';
                    usernameStatus.className = 'form-text small mt-1 text-danger d-block';
                    setInputValidationClass(usernameInput, false);
                }
                checkFormValidity();
            })
            .catch(error => {
                console.error('Error checking username:', error);
                usernameStatus.textContent = 'Error checking username.';
                usernameStatus.className = 'form-text small mt-1 text-danger d-block';
            });
    });

    usernameInput.addEventListener('input', () => {
        // Reset status while typing
        isUsernameAvailable = false;
        usernameStatus.classList.add('d-none');
        usernameInput.classList.remove('is-valid', 'is-invalid');
        checkFormValidity();
    });

    // Handle Password Strength
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        const result = validatePassword(password);
        
        // Update bar width
        passwordStrengthBar.style.width = `${result.score}%`;
        
        // Update bar color
        passwordStrengthBar.classList.remove('bg-danger', 'bg-warning', 'bg-success');
        if (result.score < 40) {
            passwordStrengthBar.classList.add('bg-danger');
        } else if (result.score < 80) {
            passwordStrengthBar.classList.add('bg-warning');
        } else {
            passwordStrengthBar.classList.add('bg-success');
        }

        // Check if confirm password matches if it's already filled
        if (confirmPasswordInput.value) {
            if (password === confirmPasswordInput.value) {
                setInputValidationClass(confirmPasswordInput, true);
            } else {
                setInputValidationClass(confirmPasswordInput, false);
            }
        }
        
        if(password.length > 0) {
             setInputValidationClass(passwordInput, result.isValid);
        } else {
             passwordInput.classList.remove('is-valid', 'is-invalid');
        }

        checkFormValidity();
    });

    // Check form validity on inputs
    const checkFormValidity = () => {
        let isValid = true;

        // Name
        if (!nameInput.value.trim()) {
            isValid = false;
            if(nameInput.value.length > 0) setInputValidationClass(nameInput, false);
        } else {
            setInputValidationClass(nameInput, true);
        }

        // Username
        if (!isUsernameAvailable) {
            isValid = false;
        }

        // Email
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            isValid = false;
            if(emailInput.value.trim()) setInputValidationClass(emailInput, false);
        } else {
            setInputValidationClass(emailInput, true);
        }

        // Password
        const pwdCheck = validatePassword(passwordInput.value);
        if (!pwdCheck.isValid) {
            isValid = false;
        }

        // Confirm Password
        if (!confirmPasswordInput.value.trim() || confirmPasswordInput.value !== passwordInput.value) {
            isValid = false;
            if(confirmPasswordInput.value.trim()) setInputValidationClass(confirmPasswordInput, false);
        } else {
            setInputValidationClass(confirmPasswordInput, true);
        }

        // Enable/Disable button
        registerBtn.disabled = !isValid;
    };

    // Add listeners
    nameInput.addEventListener('input', checkFormValidity);
    emailInput.addEventListener('input', checkFormValidity);
    confirmPasswordInput.addEventListener('input', () => {
        if(confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length > 0) {
            setInputValidationClass(confirmPasswordInput, true);
        } else if (confirmPasswordInput.value.length > 0) {
            setInputValidationClass(confirmPasswordInput, false);
        }
        checkFormValidity();
    });

    // Form Submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (registerBtn.disabled) return;

        // UI Loading State
        const btnText = registerBtn.querySelector('.btn-text');
        const spinner = document.getElementById('registerSpinner');
        
        btnText.classList.add('d-none');
        spinner.classList.remove('d-none');
        registerBtn.disabled = true;

        // Simulate API call for registration
        setTimeout(() => {
            // Revert UI
            btnText.classList.remove('d-none');
            spinner.classList.add('d-none');
            registerBtn.disabled = false;
            
            // Show Success Modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            
            // Reset form
            registerForm.reset();
            passwordStrengthBar.style.width = '0%';
            usernameStatus.classList.add('d-none');
            const inputs = registerForm.querySelectorAll('.form-control');
            inputs.forEach(input => input.classList.remove('is-valid', 'is-invalid'));
            
        }, 1500);
    });
});
