document.addEventListener("DOMContentLoaded", () => {
    const getStartedBtns = document.querySelectorAll('#get-started-btn, .btn-get-started');
    const authModal = document.getElementById('auth-modal');
    const closeAuth = document.getElementById('close-auth');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');

    // Show Auth Modal
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
        });
    });

    // Close modal
    closeAuth.addEventListener('click', () => authModal.classList.add('hidden'));
    authModal.addEventListener('click', e => { if (e.target === authModal) authModal.classList.add('hidden'); });

    // Toggle between login and signup tabs
    loginTab.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
    });

    signupTab.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
    });

    // ================= Signup Multi-Step =================
    const steps = signupForm.querySelectorAll('.signup-step');
    let currentStep = 0;

    const createError = (input, message) => {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.classList.add('error-message');
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
    };

    const clearError = (input) => {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.textContent = '';
        }
    };

    const validateStep = (step) => {
        const inputs = step.querySelectorAll('input[required]');
        let allValid = true;

        inputs.forEach(input => {
            const val = input.value.trim();
            clearError(input);

            if (!val) {
                createError(input, "Please fill out this field");
                allValid = false;
                return;
            }

            // Custom validations
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) {
                    createError(input, "Please enter a valid email");
                    allValid = false;
                }
            }

            if (input.type === 'tel') {
                const phoneRegex = /^(\+251|0)\d{9}$/; // Ethiopian format example
                if (!phoneRegex.test(val)) {
                    createError(input, "Phone must start with +251 or 0 and have 9 digits");
                    allValid = false;
                }
            }

            if (input.type === 'password') {
                if (val.length < 6) {
                    createError(input, "Password must be at least 6 characters");
                    allValid = false;
                }
            }

            if (input.placeholder === "Confirm Password") {
                const password = step.querySelector('input[type="password"]').value;
                if (val !== password) {
                    createError(input, "Passwords do not match");
                    allValid = false;
                }
            }

            if (input.id === "sms-code") {
                if (!/^\d{6}$/.test(val)) {
                    createError(input, "SMS code must be 6 digits");
                    allValid = false;
                }
            }

        });

        return allValid;
    };

    steps.forEach((step, index) => {
        const nextBtn = step.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (validateStep(step)) {
                    step.classList.add('hidden');
                    currentStep = index + 1;
                    if (steps[currentStep]) steps[currentStep].classList.remove('hidden');
                    authModal.scrollTop = 0;
                }
            });
        }
    });

    // SMS Resend Countdown
    const resendBtn = document.getElementById('resend-btn');
    if (resendBtn) {
        let countdown = 60;
        const startCountdown = () => {
            resendBtn.disabled = true;
            const interval = setInterval(() => {
                countdown--;
                resendBtn.textContent = `Resend Code (${countdown}s)`;
                if (countdown <= 0) {
                    clearInterval(interval);
                    resendBtn.textContent = 'Resend Code';
                    resendBtn.disabled = false;
                    countdown = 60;
                }
            }, 1000);
        };
        startCountdown();
        resendBtn.addEventListener('click', startCountdown);
    }

    // Final Step Submission
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const finalStep = steps[steps.length - 1];
        if (validateStep(finalStep)) {
            alert("Signup completed!"); // Replace with actual logic
            authModal.classList.add('hidden');
            signupForm.reset();
            steps.forEach((step, i) => step.classList.toggle('hidden', i !== 0));
            currentStep = 0;
        }
    });
});
