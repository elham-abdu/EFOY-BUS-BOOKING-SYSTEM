document.addEventListener("DOMContentLoaded", () => {
    // ===== Menu toggle =====
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // ===== Hero text animation =====
    const heroText = document.querySelector(".hero-text");
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add("show");
        }, 3000);
    }

    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            
            if (question) {
                question.addEventListener("click", () => {
                    // Close other open FAQs
                    faqItems.forEach(other => {
                        if (other !== item && other.classList.contains("active")) {
                            other.classList.remove("active");
                        }
                    });
                    
                    // Toggle current FAQ
                    item.classList.toggle("active");
                });
            }
        });
    }

    // ===== Auth Modal =====
    const getStartedBtns = document.querySelectorAll('.btn-book, .btn-get-started');
    const authModal = document.getElementById('auth-modal');
    const closeAuth = document.getElementById('close-auth');

    if (getStartedBtns.length > 0 && authModal && closeAuth) {
        // Open modal
        getStartedBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                authModal.classList.remove('hidden');
                showStep(1);
                resetForm(); // Reset form when opening modal
            });
        });

        // Close modal
        closeAuth.addEventListener('click', () => {
            authModal.classList.add('hidden');
            resetForm(); // Reset form when closing modal
        });

        // Close modal when clicking outside
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.add('hidden');
                resetForm();
            }
        });
    }

    // ===== Form Validation System =====
    const signupForm = document.getElementById('signup-form');
    const signupSteps = document.querySelectorAll('.signup-step');
    let currentStep = 1;

    // Add error message elements to HTML structure
    function initializeErrorElements() {
        const inputs = document.querySelectorAll('#signup-form input[required]');
        inputs.forEach(input => {
            // Create error message element if it doesn't exist
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.cssText = 'color: #ff6b6b; font-size: 12px; margin-top: 5px; display: none;';
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
        });
    }

    // Initialize error elements when modal opens
    function initializeForm() {
        initializeErrorElements();
        setupRealTimeValidation();
    }

    // Real-time validation - clear errors when user types
    function setupRealTimeValidation() {
        const inputs = document.querySelectorAll('#signup-form input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }

    // Clear error for specific input
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.style.display = 'none';
        }
        input.style.borderColor = '';
    }

    // Show error for specific input
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        input.style.borderColor = '#ff6b6b';
    }

    // Clear all errors in current step
    function clearAllErrors(stepElement) {
        const errors = stepElement.querySelectorAll('.error-message');
        errors.forEach(error => error.style.display = 'none');
        
        const inputs = stepElement.querySelectorAll('input');
        inputs.forEach(input => input.style.borderColor = '');
    }

    // Validate individual field
    function validateField(input) {
        const value = input.value.trim();
        const type = input.type;

        if (!value) {
            return { isValid: false, message: 'This field is required' };
        }

        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return { isValid: false, message: 'Please enter a valid email address' };
                }
                break;
            
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                const cleanPhone = value.replace(/\D/g, '');
                if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
                    return { isValid: false, message: 'Please enter a valid phone number' };
                }
                break;
            
            case 'password':
                if (value.length < 6) {
                    return { isValid: false, message: 'Password must be at least 6 characters' };
                }
                break;
        }

        return { isValid: true };
    }

    // Validate password match in step 2
    function validatePasswordMatch() {
        const passwordInputs = document.querySelectorAll('[data-step="2"] input[type="password"]');
        const password = passwordInputs[0].value;
        const confirmPassword = passwordInputs[1].value;

        if (password !== confirmPassword) {
            showError(passwordInputs[1], 'Passwords do not match');
            return false;
        }
        return true;
    }

    // Validate current step
    function validateStep(step) {
        const currentStepElement = document.querySelector(`.signup-step[data-step="${step}"]`);
        let isValid = true;

        // Clear previous errors
        clearAllErrors(currentStepElement);

        // Validate all required inputs in current step
        const inputs = currentStepElement.querySelectorAll('input[required]');
        inputs.forEach(input => {
            const validation = validateField(input);
            if (!validation.isValid) {
                showError(input, validation.message);
                isValid = false;
            }
        });

        // Special validation for step 2 (password match)
        if (step === 2 && isValid) {
            if (!validatePasswordMatch()) {
                isValid = false;
            }
        }

        return isValid;
    }

    // Show specific step
    function showStep(step) {
        signupSteps.forEach(s => s.classList.add('hidden'));
        const currentStepElement = document.querySelector(`.signup-step[data-step="${step}"]`);
        if (currentStepElement) {
            currentStepElement.classList.remove('hidden');
        }
        currentStep = step;
    }

    // Reset form to initial state
    function resetForm() {
        currentStep = 1;
        showStep(1);
        
        // Clear all inputs and errors
        const inputs = document.querySelectorAll('#signup-form input');
        inputs.forEach(input => {
            input.value = '';
            clearError(input);
        });
        
        // Reset SMS timer if active
        if (resendTimer) {
            clearInterval(resendTimer);
            const resendBtn = document.getElementById('resend-btn');
            if (resendBtn) {
                resendBtn.disabled = false;
                resendBtn.textContent = 'Resend Code';
            }
        }
    }

    // ===== Signup Form Event Listeners =====
    if (signupForm && signupSteps.length > 0) {
        // Initialize form when modal might open
        initializeForm();

        // Next button handlers
        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const step = parseInt(e.target.closest('.signup-step').dataset.step);
                if (validateStep(step)) {
                    currentStep++;
                    showStep(currentStep);
                    
                    // Start SMS timer when reaching step 3
                    if (currentStep === 3) {
                        startResendTimer();
                        // Auto-fill demo code after 2 seconds
                        setTimeout(() => {
                            const smsCode = document.getElementById('sms-code');
                            if (smsCode) {
                                smsCode.value = '123456';
                            }
                        }, 2000);
                    }
                }
            });
        });

        // Form submission (Finish button)
        const finishBtn = document.getElementById('finish-btn');
        if (finishBtn) {
            finishBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // Validate the SMS code first
                if (validateStep(3)) {
                    // Form is valid - proceed with submission
                    alert('Account created successfully!');
                    authModal.classList.add('hidden');
                    resetForm();
                    // Redirect to home page
                    window.location.href = 'Home.html';
                }
            });
        }
    }

    // ===== SMS Resend Timer =====
    let resendTimer;
    function startResendTimer() {
        const resendBtn = document.getElementById('resend-btn');
        if (!resendBtn) return;

        let timeLeft = 60;
        resendBtn.disabled = true;
        
        resendTimer = setInterval(() => {
            resendBtn.textContent = `Resend Code (${timeLeft}s)`;
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(resendTimer);
                resendBtn.disabled = false;
                resendBtn.textContent = 'Resend Code';
            }
        }, 1000);

        // Resend button click handler
        resendBtn.onclick = function() {
            if (!resendBtn.disabled) {
                startResendTimer();
                // Simulate sending new code
                setTimeout(() => {
                    const smsCode = document.getElementById('sms-code');
                    if (smsCode) {
                        smsCode.value = '123456';
                    }
                }, 1000);
            }
        };
    }

    // ===== Tab Switching =====
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    
    if (loginTab && signupTab) {
        loginTab.addEventListener('click', () => {
            if (signupForm) signupForm.classList.add('hidden');
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.classList.remove('hidden');
            signupTab.classList.remove('active');
            loginTab.classList.add('active');
        });
        
        signupTab.addEventListener('click', () => {
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.classList.add('hidden');
            if (signupForm) signupForm.classList.remove('hidden');
            loginTab.classList.remove('active');
            signupTab.classList.add('active');
            initializeForm(); // Re-initialize form when switching to signup
        });
    }

    // ===== Login Form Validation =====
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = loginForm.querySelectorAll('input[required]');
            let isValid = true;

            // Clear previous errors
            inputs.forEach(input => input.style.borderColor = '');

            // Validate inputs
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                }
            });

            if (isValid) {
                // Login successful - redirect to home page
                alert('Login successful!');
                authModal.classList.add('hidden');
                loginForm.reset();
                window.location.href = 'HTML/Home.html';
            } else {
                alert('Please fill in all required fields');
            }
        });
    }
});