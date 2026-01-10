// Fashion tailoring demo script
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

    submitBtn.textContent = "Scheduling...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Appointment Booked!";
      submitBtn.style.background = "linear-gradient(45deg, #ffd700, #ffb347)";

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
      }, 3000);
    }, 2000);
  });

  // Collection card hover effects
  const collectionCards = document.querySelectorAll(".collection-card");
  collectionCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Testimonial carousel effect
  const testimonials = document.querySelectorAll(".testimonial");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      if (i === index) {
        testimonial.style.opacity = "1";
        testimonial.style.transform = "translateY(0)";
      } else {
        testimonial.style.opacity = "0.5";
        testimonial.style.transform = "translateY(20px)";
      }
    });
  }

  // Initialize testimonials
  testimonials.forEach((testimonial, i) => {
    testimonial.style.transition = "all 0.5s ease";
    if (i !== 0) {
      testimonial.style.opacity = "0.5";
      testimonial.style.transform = "translateY(20px)";
    }
  });

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 4000);

  // Process step animation
  const processSteps = document.querySelectorAll(".process-step");
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "slideInLeft 0.8s ease-out forwards";
      }
    });
  }, observerOptions);

  processSteps.forEach((step, index) => {
    step.style.opacity = "0";
    step.style.transform = "translateX(-50px)";
    step.style.animationDelay = `${index * 0.2}s`;
    observer.observe(step);
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .garment {
            animation: gentleFloat 6s ease-in-out infinite;
        }

        .garment-1 {
            animation-delay: 0s;
        }

        .garment-2 {
            animation-delay: 2s;
        }

        .garment-3 {
            animation-delay: 4s;
        }

        @keyframes gentleFloat {
            0%, 100% { transform: translateY(0) rotate(var(--rotation)); }
            50% { transform: translateY(-10px) rotate(var(--rotation)); }
        }
    `;
  document.head.appendChild(style);

  // Set custom properties for rotation
  document.documentElement.style.setProperty("--rotation-1", "-5deg");
  document.documentElement.style.setProperty("--rotation-2", "8deg");
  document.documentElement.style.setProperty("--rotation-3", "-3deg");

  // Elegant scroll effect for header
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Fabric texture animation
  const fabricTextures = document.querySelectorAll(".fabric-texture");
  fabricTextures.forEach((texture) => {
    texture.addEventListener("mouseenter", function () {
      this.style.animation = "fabricShimmer 1s ease-in-out";
    });

    texture.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });

  // Add fabric shimmer animation
  const shimmerStyle = document.createElement("style");
  shimmerStyle.textContent = `
        @keyframes fabricShimmer {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        }
    `;
  document.head.appendChild(shimmerStyle);
});
