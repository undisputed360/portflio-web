// Cybersecurity demo script
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Form submission handling
  const contactForm = document.querySelector(".contact-form form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background = "linear-gradient(45deg, #00ff88, #007bff)";

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 2000);
    }, 1500);
  });

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Animated counter for stats
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent =
        Math.floor(current) + (element.textContent.includes("%") ? "%" : "+");
    }, 20);
  }

  // Trigger counter animation when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stats = entry.target.querySelectorAll(".stat-number");
        stats.forEach((stat) => {
          const target = parseInt(stat.textContent.replace(/[^\d]/g, ""));
          animateCounter(stat, target);
        });
        observer.unobserve(entry.target);
      }
    });
  });

  const heroSection = document.querySelector(".hero");
  observer.observe(heroSection);

  // Security breach simulation (visual effect)
  function createSecurityAlert() {
    const alert = document.createElement("div");
    alert.className = "security-alert";
    alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Threat Detected & Neutralized</span>
            </div>
        `;
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

  // Random security alerts
  setInterval(() => {
    if (Math.random() < 0.3) {
      // 30% chance every 10 seconds
      createSecurityAlert();
    }
  }, 10000);

  // Add CSS for alerts
  const alertStyle = document.createElement("style");
  alertStyle.textContent = `
        .security-alert {
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b35, #f7931e);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
            z-index: 10000;
            animation: alertSlideIn 0.5s ease-out;
            font-weight: bold;
        }

        .alert-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .alert-content i {
            font-size: 1.2rem;
        }

        @keyframes alertSlideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
  document.head.appendChild(alertStyle);

  // Matrix rain effect (subtle)
  function createMatrixRain() {
    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.opacity = "0.05";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 35);
  }

  // Only create matrix effect on desktop
  if (window.innerWidth > 768) {
    createMatrixRain();
  }
});
