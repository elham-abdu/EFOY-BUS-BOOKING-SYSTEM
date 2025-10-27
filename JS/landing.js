document.addEventListener("DOMContentLoaded", () => {
  // ===== Menu toggle =====
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // ===== Hero text animation =====
  const heroText = document.querySelector(".hero-text");
  setTimeout(() => {
    heroText.classList.add("show");
  }, 3000);

  // ===== How It Works carousel =====
  const track = document.querySelector(".how-track");
  const steps = document.querySelectorAll(".step");
  const totalSteps = steps.length;
  let currentIndex = 0;

  // Function to move the carousel
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Automatic slide every 3 seconds, stops at last slide
  let carouselInterval = setInterval(() => {
    if (currentIndex < totalSteps - 1) {
      currentIndex++;
      updateCarousel();
    } else {
      clearInterval(carouselInterval); // stops at last slide
    }
  }, 3000);

  // ===== Arrows =====
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  rightArrow.addEventListener("click", () => {
    if (currentIndex < totalSteps - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      item.classList.toggle("active");

      // Close other open FAQs
      faqItems.forEach(other => {
        if(other !== item) other.classList.remove("active");
      });
    });
  });
});
// Elements
const getStartedBtns = document.querySelectorAll('.btn-book, .btn-get-started');
const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth');

const signupForm = document.getElementById('signup-form');
const signupSteps = document.querySelectorAll('.signup-step');
let currentStep = 1;

const resendBtn = document.getElementById('resend-btn');

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
  document.querySelector(`.signup-step[data-step="${step}"]`).classList.remove('hidden');
}

// Resend Timer
let timer = 60;
function startResendTimer() {
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
    document.getElementById('sms-code').value = '123456';
  }, 3000);
}

// Optional: Tab switching between Login and Signup
document.getElementById('login-tab').addEventListener('click', () => {
  signupForm.classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-tab').classList.remove('active');
  document.getElementById('login-tab').classList.add('active');
});

document.getElementById('signup-tab').addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-tab').classList.add('active');
  document.getElementById('login-tab').classList.remove('active');
});
document.querySelector('.google-btn').addEventListener('click', () => {
  alert('Google Sign-In clicked (simulate OAuth login)');
});

document.querySelector('.facebook-btn').addEventListener('click', () => {
  alert('Facebook Sign-In clicked (simulate OAuth login)');
});

document.querySelector('.apple-btn').addEventListener('click', () => {
  alert('Apple Sign-In clicked (simulate OAuth login)');
});
// Signup: Next Buttons with validation
document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const stepDiv = btn.closest('.signup-step'); // current step container
    const inputs = stepDiv.querySelectorAll('input[required]'); // required inputs
    let allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.border = '2px solid red'; // highlight empty field
      } else {
        input.style.border = 'none'; // reset border
      }
    });

    if (allFilled) {
      currentStep++;
      showStep(currentStep);
      if (currentStep === 3) startResendTimer();
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  });
});
