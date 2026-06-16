// ============ Mouse tracking ============
let mouseX = -1000, mouseY = -1000;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
document.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });

// ============ Subtle particle field (light theme) ============
const canvas = document.getElementById('bgParticles');
const ctx = canvas.getContext('2d');
const dpr = Math.min(window.devicePixelRatio || 1, 2);

let particles = [];
let w = 0, h = 0;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Lower density for a calm, minimal feel
  const count = Math.floor((w * h) / 26000);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() * 1.4 + 0.6,
  }));
}
resize();
window.addEventListener('resize', resize);

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    // Gentle drift toward cursor
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 150 && dist > 0) {
      const force = (150 - dist) / 150;
      p.x += (dx / dist) * force * 0.25;
      p.y += (dy / dist) * force * 0.25;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(22,22,26,${0.10 + p.r * 0.05})`;
    ctx.fill();
  }

  // Soft links between near particles + to cursor
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < 120) {
        ctx.strokeStyle = `rgba(22,22,26,${(1 - d / 120) * 0.05})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    const dxm = a.x - mouseX, dym = a.y - mouseY;
    const dm = Math.hypot(dxm, dym);
    if (dm < 150) {
      ctx.strokeStyle = `rgba(22,22,26,${(1 - dm / 150) * 0.14})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouseX, mouseY); ctx.stroke();
    }
  }

  requestAnimationFrame(draw);
}
draw();

// ============ Reveal on scroll ============
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.hero-text, .hero-image, .work-head, .project, .exp-item, .skill-col, .about, .connect, .experience .section-title, .skills .section-title')
  .forEach(el => observer.observe(el));

// ============ Nav: scroll state + scroll-spy ============
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav-links a')];
const sections = ['home', 'work', 'about', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

window.addEventListener('scroll', () => {
  if (window.scrollY > 24) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  // scroll-spy
  const pos = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0]?.id;
  for (const sec of sections) {
    if (sec.offsetTop <= pos) current = sec.id;
  }
  navLinks.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`)
  );
});

// ============ Mobile menu ============
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => nav.classList.toggle('open'));
navLinks.forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ============ Footer year ============
document.getElementById('year').textContent = new Date().getFullYear();
