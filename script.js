/* ============================================================
   Muhammad Ali Saeed — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, ctx) => (ctx || document).querySelector(s);
  const $$ = (s, ctx) => [...(ctx || document).querySelectorAll(s)];

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  function applyMeta(theme) {
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f6f3' : '#0a0a0e');
  }
  applyMeta(root.getAttribute('data-theme'));
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      applyMeta(next);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scroll state, progress, scroll-spy ---------- */
  const nav = $('#nav');
  const progress = $('#scrollProgress');
  const navLinks = $$('.nav-links a');
  const sections = ['home', 'work', 'about', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }

    const pos = y + window.innerHeight * 0.35;
    let current = sections[0] && sections[0].id;
    for (const sec of sections) if (sec.offsetTop <= pos) current = sec.id;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = $('#navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$('.work-head, .project, .mcard, .exp-item, .skill-card, .about, .connect, .stat, .experience .section-title, .skills .section-title');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  const statEls = $$('.stat-num');
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    const dur = 1400; const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const sObs = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { countUp(e.target); sObs.unobserve(e.target); }
    }, { threshold: 0.6 });
    statEls.forEach(el => sObs.observe(el));
  } else {
    statEls.forEach(countUp);
  }

  /* ---------- Hero role rotator ---------- */
  const rotator = $('#rotator');
  if (rotator) {
    const words = ['Flutter', 'React', 'Node.js', 'Firebase', 'React Native'];
    const wordEl = rotator.querySelector('.rotator-word');
    if (reduceMotion) {
      wordEl.textContent = 'Flutter, React & Node';
    } else {
      let wi = 0, ci = 0, deleting = false;
      function type() {
        const word = words[wi];
        wordEl.textContent = word.slice(0, ci);
        if (!deleting && ci < word.length) { ci++; setTimeout(type, 90); }
        else if (!deleting && ci === word.length) { deleting = true; setTimeout(type, 1500); }
        else if (deleting && ci > 0) { ci--; setTimeout(type, 45); }
        else { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 280); }
      }
      type();
    }
  }

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    $$('[data-magnetic]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Certificate lightbox ---------- */
  const lightbox = $('#lightbox');
  if (lightbox) {
    const lbImg = $('#lightboxImg');
    const lbCap = $('#lightboxCap');
    const lbClose = $('#lightboxClose');
    let lastFocus = null;

    function openLightbox(href, title) {
      lastFocus = document.activeElement;
      lbImg.src = href;
      lbImg.alt = title || 'Certificate';
      lbCap.textContent = title || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function closeLightbox() {
      lightbox.hidden = true;
      lbImg.src = '';
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    $$('[data-lightbox]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(a.getAttribute('href'), a.dataset.title);
      });
    });
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
  }

  /* ---------- Ambient particle field ---------- */
  const canvas = $('#bgParticles');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [], w = 0, h = 0, mouseX = -1000, mouseY = -1000, rafId = null;

    function dotColor() {
      return root.getAttribute('data-theme') === 'light' ? '20, 20, 30' : '180, 180, 220';
    }
    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 26000), 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
    }
    function draw() {
      const rgb = dotColor();
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = mouseX - p.x, dy = mouseY - p.y, dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0) {
          const f = (150 - dist) / 150;
          p.x += (dx / dist) * f * 0.25; p.y += (dy / dist) * f * 0.25;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${0.12 + p.r * 0.05})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / 120) * 0.06})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouseX, a.y - mouseY);
        if (dm < 150) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - dm / 150) * 0.16})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouseX, mouseY); ctx.stroke();
        }
      }
      rafId = requestAnimationFrame(draw);
    }
    function start() { if (!rafId) rafId = requestAnimationFrame(draw); }
    function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    document.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });

    resize();
    start();
  }
})();
