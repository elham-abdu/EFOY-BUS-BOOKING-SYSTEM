   
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
                    });
                });

                // Close modal
                closeAuth.addEventListener('click', () => authModal.classList.add('hidden'));
            }

            // ===== Signup Form =====
            const signupForm = document.getElementById('signup-form');
            const signupSteps = document.querySelectorAll('.signup-step');
            let currentStep = 1;

            const resendBtn = document.getElementById('resend-btn');

            if (signupForm && signupSteps.length > 0) {
                // Signup: Next Buttons
                document.querySelectorAll('.next-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        currentStep++;
                        showStep(currentStep);
                        if(currentStep === 3) startResendTimer();
                    });
                });

                function showStep(step) {
                    signupSteps.forEach(s => s.classList.add('hidden'));
                    const currentStepElement = document.querySelector(`.signup-step[data-step="${step}"]`);
                    if (currentStepElement) {
                        currentStepElement.classList.remove('hidden');
                    }
                }

                // Resend Timer
                let timer = 60;
                function startResendTimer() {
                    if (!resendBtn) return;
                    
                    resendBtn.disabled = true;
                    timer = 60;
                    const interval = setInterval(() => {
                        resendBtn.textContent = `Resend Code (${timer}s)`;
                        timer--;
                        if(timer < 0) {
                            clearInterval(interval);
                            resendBtn.disabled = false;
                            resendBtn.textContent = 'Resend Code';
                        }
                    }, 1000);

                    // Simulate auto-fill SMS code after 3 seconds
                    setTimeout(() => {
                        const smsCode = document.getElementById('sms-code');
                        if (smsCode) {
                            smsCode.value = '123456';
                        }
                    }, 3000);
                }

                // Optional: Tab switching between Login and Signup
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
                    });
                }
            }
        });
