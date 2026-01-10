// Simple demo script for Web3 site
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

  // Wallet connection simulation
  const walletButtons = document.querySelectorAll(".wallet-btn");
  walletButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert(`Connecting to ${this.textContent}... (Demo only)`);
      this.textContent = "Connected!";
      this.style.background = "linear-gradient(45deg, #00ff80, #0080ff)";
      setTimeout(() => {
        this.textContent = this.textContent.replace("Connected!", "MetaMask");
      }, 2000);
    });
  });

  // Add some particle effect
  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 5000);
  }

  setInterval(createParticle, 2000);

  // Add CSS for particles
  const style = document.createElement("style");
  style.textContent = `
        .particle {
            position: absolute;
            top: -10px;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            animation: fall linear infinite;
            pointer-events: none;
        }
        @keyframes fall {
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
});
