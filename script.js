const body = document.body;
const loader = document.getElementById("loader");
const year = document.getElementById("year");
const reveals = document.querySelectorAll(".reveal");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const cursorMain = document.getElementById("cursorMain");
const cursorTrail = document.getElementById("cursorTrail");
const mouseGlow = document.getElementById("mouseGlow");
const particleCanvas = document.getElementById("particleCanvas");
const heroContent = document.querySelector(".hero__content");
const magneticTargets = document.querySelectorAll(".magnetic");
const projectCards = document.querySelectorAll(".project-card");

body.classList.add("is-loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
    body.classList.remove("is-loading");
  }, 950);
});

year.textContent = new Date().getFullYear();

// Mobile nav toggle
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Fade-in on scroll using IntersectionObserver
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((element) => revealObserver.observe(element));

// Futuristic custom cursor and glow
let trailX = window.innerWidth / 2;
let trailY = window.innerHeight / 2;
let mouseX = trailX;
let mouseY = trailY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursorMain.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  mouseGlow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// Scroll progress and subtle hero parallax depth
window.addEventListener("scroll", () => {
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;

  const parallaxShift = Math.min(window.scrollY * 0.12, 40);
  heroContent.style.transform = `translateY(${parallaxShift}px)`;
});

const cursorTargets = document.querySelectorAll("a, button, .project-card, .skill-card");
cursorTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursorTrail.style.width = "52px";
    cursorTrail.style.height = "52px";
    cursorTrail.style.borderColor = "rgba(255, 79, 167, 0.85)";
  });
  target.addEventListener("mouseleave", () => {
    cursorTrail.style.width = "34px";
    cursorTrail.style.height = "34px";
    cursorTrail.style.borderColor = "rgba(31, 214, 255, 0.75)";
  });
});

// Magnetic hover effect for CTA-style elements
magneticTargets.forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    element.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translate(0, 0)";
  });
});

// Premium 3D tilt interaction for project cards
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

function animateCursorTrail() {
  trailX += (mouseX - trailX) * 0.2;
  trailY += (mouseY - trailY) * 0.2;
  cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
  requestAnimationFrame(animateCursorTrail);
}
animateCursorTrail();

// Floating particle background
const ctx = particleCanvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function createParticles() {
  const particleCount = Math.max(45, Math.floor(window.innerWidth * 0.07));
  particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    radius: Math.random() * 1.6 + 0.4,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.75 + 0.15,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > particleCanvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > particleCanvas.height) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(31, 214, 255, ${particle.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
