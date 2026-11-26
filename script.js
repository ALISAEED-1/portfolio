/* ============================================================
   Muhammad Ali Saeed — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const PROJECTS = window.PROJECTS || {};
  const ORDER = window.PROJECT_ORDER || Object.keys(PROJECTS);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const io = (cb, opts) => ('IntersectionObserver' in window ? new IntersectionObserver(cb, opts) : null);

  document.documentElement.classList.add('js');
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ---------- Nav: scrolled state, progress, active link ---------- */
  const nav = $('#nav');
  const navLinks = $$('.nav-links a');
  const progress = $('#progress');
  const sections = $$('main .section');
  const navAlias = { snapshot: 'home' };

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    const mark = y + window.innerHeight * 0.4;
    let current = 'home';
    for (const s of sections) if (s.offsetTop <= mark) current = s.id;
    current = navAlias[current] || current;
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  /* ---------- Theme toggle — circular reveal from the button ---------- */
  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  const themeMeta = $('meta[name="theme-color"]');
  function applyTheme(theme) {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    themeMeta.setAttribute('content', theme === 'dark' ? '#0c0d11' : '#f8f8f5');
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('mas-theme', theme); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent('themechange'));
  }
  themeBtn.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduceMotion) { applyTheme(next); return; }
    const r = themeBtn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    let applied = false;
    const vt = document.startViewTransition(() => { applied = true; applyTheme(next); });
    vt.ready.then(() => {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
    // A tab that isn't rendering never runs the transition callback; switch directly instead.
    setTimeout(() => {
      if (applied) return;
      applied = true;
      vt.skipTransition();
      applyTheme(next);
    }, 300);
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = $('#navToggle');
  const navList = $('#navLinks');
  function setMenu(open) {
    navList.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  navToggle.addEventListener('click', () => setMenu(!navList.classList.contains('open')));
  navLinks.forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Reveal on scroll (staggered per parent) ---------- */
  const revealEls = $$('.reveal');
  const groups = new Map();
  revealEls.forEach((el) => {
    const list = groups.get(el.parentElement) || [];
    list.push(el);
    groups.set(el.parentElement, list);
  });
  groups.forEach((list) => list.forEach((el, i) => { el.style.transitionDelay = Math.min(i * 70, 420) + 'ms'; }));
  $$('.srow').forEach((row) => $$('.sk', row).forEach((sk, i) => sk.style.setProperty('--i', i)));
  const revealObs = !reduceMotion && io((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  if (revealObs) revealEls.forEach((el) => revealObs.observe(el));
  else revealEls.forEach((el) => el.classList.add('in'));

  /* ---------- One-shot "in" for drawn lines (process + timeline) ---------- */
  ['#steps', '#timeline'].forEach((sel) => {
    const el = $(sel);
    if (!el) return;
    const o = io((entries) => { if (entries[0].isIntersecting) { el.classList.add('in'); o.disconnect(); } }, { threshold: 0.3 });
    o ? o.observe(el) : el.classList.add('in');
  });

  /* ---------- Count-up stats ---------- */
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const fmt = (v) => v.toFixed(decimals) + suffix;
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / 1500, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const countObs = io((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); countObs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  if (countObs) $$('[data-count]').forEach((el) => countObs.observe(el));

  /* ============================================================
     BUTTON MOTION — ripple on press, magnetic pull on hover
     ============================================================ */
  document.addEventListener('pointerdown', (e) => {
    const host = e.target.closest('.fx');
    if (!host || reduceMotion) return;
    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (e.clientX - r.left - size / 2) + 'px';
    dot.style.top = (e.clientY - r.top - size / 2) + 'px';
    host.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  });

  if (finePointer && !reduceMotion) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transition = 'transform .15s ease-out';
        el.style.transform = 'translate(' + x * 0.22 + 'px,' + y * 0.32 + 'px)';
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)';
        el.style.transform = '';
      });
    });
  }

  /* ============================================================
     HERO — scrambling problem word + synced "Problem → Solved" ticket
     ============================================================ */
  const STORIES = [
    { word: 'scattered plans', id: 'event-management', problem: 'Group plans get lost in endless chat threads.', title: 'Event Management', solved: 'shared calendar, voting & filters' },
    { word: 'a noisy feed', id: 'newzler', problem: 'News apps show everything — except what you care about.', title: 'Newzler', solved: 'a feed ranked by your own topics' },
    { word: 'a shop with no app', id: 'karyana-store', problem: 'Local grocers have no simple way to sell online.', title: 'Karyana Store', solved: 'catalog, bulk orders & checkout' },
    { word: 'leaky money maths', id: 'finora', problem: 'Finance apps quietly miscount money — and break offline.', title: 'Finora', solved: 'integer-safe money, atomic writes, 326 tests' },
    { word: 'double charges', id: 'nova-cinema', problem: 'A double-tap or a late webhook charges twice — or locks out a payer.', title: 'Nova Cinema', solved: 'idempotent checkout & signed webhooks' }
  ];
  const scrambleEl = $('#scramble');
  const ticket = $('#ticket');
  const tProblem = $('#tProblem');
  const tSolved = $('#tSolved');
  const ticketFill = $('#ticketFill');
  const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#%&*/?<>';
  const CYCLE = 4600;
  let storyIndex = 0;
  let cycleTimer = null;
  let heroVisible = true;

  function scrambleTo(el, text) {
    el.classList.remove('solved');
    if (reduceMotion) { el.textContent = text; el.classList.add('solved'); return; }
    const start = performance.now();
    (function frame(now) {
      const p = Math.min((now - start) / 1000, 1);
      const settled = Math.floor(p * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        out += i < settled || text[i] === ' ' ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else { el.textContent = text; el.classList.add('solved'); }
    })(start);
  }
  function runFill() {
    if (reduceMotion) return;
    ticketFill.style.transition = 'none';
    ticketFill.style.width = '0%';
    void ticketFill.offsetWidth;
    ticketFill.style.transition = 'width ' + CYCLE + 'ms linear';
    ticketFill.style.width = '100%';
  }
  function showStory(i) {
    const story = STORIES[i];
    scrambleTo(scrambleEl, story.word);
    ticket.classList.add('swap');
    setTimeout(() => {
      tProblem.textContent = story.problem;
      tSolved.innerHTML = '<b>' + esc(story.title) + '</b> — ' + esc(story.solved);
      ticket.classList.remove('swap');
    }, 320);
    runFill();
  }
  function startCycle() {
    if (cycleTimer || !heroVisible || document.hidden) return;
    runFill();
    cycleTimer = setInterval(() => {
      storyIndex = (storyIndex + 1) % STORIES.length;
      showStory(storyIndex);
    }, CYCLE);
  }
  function stopCycle() {
    clearInterval(cycleTimer);
    cycleTimer = null;
    ticketFill.style.transition = 'none';
    ticketFill.style.width = '0%';
  }
  scrambleTo(scrambleEl, STORIES[0].word);
  ticket.addEventListener('click', () => openCase(STORIES[storyIndex].id, ticket));
  const heroObs = io((entries) => { heroVisible = entries[0].isIntersecting; heroVisible ? startCycle() : stopCycle(); }, { threshold: 0.25 });
  heroObs ? heroObs.observe($('#home')) : startCycle();
  document.addEventListener('visibilitychange', () => (document.hidden ? stopCycle() : startCycle()));

  /* ============================================================
     WORK — interactive app stage
     ============================================================ */
  const APPS = [
    {
      id: 'finora', name: 'Finora', tag: 'Flutter · Firebase', mode: 'art',
      art: 'linear-gradient(150deg,#f4fbf7 0%,#cfe9dd 50%,#2f9a7c 100%)',
      screens: ['projects/shots/finora-1.webp', 'projects/shots/finora-2.webp', 'projects/shots/finora-3.webp'],
      problem: 'Finance apps quietly miscount money.', solution: 'Integer-safe money, atomic writes and offline reminders — 25k lines of Dart, 326 tests.',
      chips: ['Receipt OCR on-device', 'Atomic money writes', 'Signed release build']
    },
    {
      id: 'event-management', name: 'Event Management', tag: 'Flutter · Firebase',
      art: 'linear-gradient(150deg,#1a1a22 0%,#3d1527 50%,#9a2240 100%)', dark: true,
      screens: ['projects/shots/event-2.jpg', 'projects/shots/event-4.jpg', 'projects/shots/event-3.jpg', 'projects/shots/event-1.jpg'],
      problem: 'Group plans get lost in chat threads.', solution: 'One shared calendar with live votes, filters and an admin dashboard.',
      chips: ['Month & list views', 'Live votes & favourites', 'Admin dashboard']
    },
    {
      id: 'you2art', name: 'You2Art', tag: 'Flutter · Supabase',
      art: 'linear-gradient(150deg,#fbf6ee 0%,#ead8c0 50%,#b9824f 100%)',
      screens: ['projects/shots/you2art-1.jpg', 'projects/shots/you2art-2.jpg', 'projects/shots/you2art-3.jpg'],
      problem: 'Talent and productions struggle to find each other.', solution: 'Casting calls, talent search and real-time chat — with phone-OTP sign-in.',
      chips: ['Phone OTP login', 'Casting calls', 'Real-time chat']
    },
    {
      id: 'newzler', name: 'Newzler', tag: 'Flutter · News API',
      art: 'linear-gradient(150deg,#f6f1ff 0%,#cfc6fb 48%,#6f7ff0 100%)',
      screens: ['projects/shots/newzler-1.jpg', 'projects/shots/newzler-2.jpg', 'projects/shots/newzler-4.jpg'],
      problem: 'News apps show everything at once.', solution: 'A feed ranked by your topics, in your language.',
      chips: ['Personalised feed', 'In-app video', 'Language preferences']
    },
    {
      id: 'karyana-store', name: 'Karyana Store', tag: 'Flutter · Firebase',
      art: 'linear-gradient(150deg,#fff0f2 0%,#f7b6c0 48%,#dd4c66 100%)',
      screens: ['projects/shots/karyana-2.jpg', 'projects/shots/karyana-1.jpg', 'projects/shots/karyana-4.jpg', 'projects/shots/karyana-3.jpg'],
      problem: 'Local grocers can’t sell online.', solution: 'Catalog, bulk orders and real-time stock — priced in PKR.',
      chips: ['Category catalog', 'Bulk ordering', 'Real-time inventory']
    },
    {
      id: 'agri-expert', name: 'Agri Expert', tag: 'Flutter · Supabase',
      art: 'linear-gradient(150deg,#f1f8ec 0%,#c4e2b2 48%,#5e9f47 100%)',
      screens: ['projects/shots/agri-2.jpg', 'projects/shots/agri-3.jpg', 'projects/shots/agri-4.jpg', 'projects/shots/agri-1.jpg'],
      problem: 'Farmers pay middlemen and wait for advice.', solution: 'Ask experts directly, watch training videos and chat — in Urdu too.',
      chips: ['Expert Q&A with photos', 'Training videos', 'Urdu support']
    },
    {
      id: 'nova-cinema', name: 'Nova Cinema', tag: 'Flutter · Node.js', mode: 'art', frame: true,
      art: 'linear-gradient(150deg,#121217 0%,#2a0d13 52%,#7d1426 100%)', dark: true,
      screens: ['projects/shots/nova-art-1.jpg', 'projects/shots/nova-art-2.jpg', 'projects/shots/nova-art-3.jpg'],
      problem: 'Payments that charge twice or lock out a payer.', solution: 'A streaming app with its own payments backend: idempotent checkout and signed webhooks.',
      chips: ['Plans & 48h rentals', '5 currencies', 'Video player & watchlist']
    }
  ];

  const appTabs = $('#appTabs');
  const stage = $('#stage');
  const stageInfo = $('#stageInfo');
  const stageDots = $('#stageDots');
  const phL = $('.ph-l img', stage);
  const phR = $('.ph-r img', stage);
  const scrs = $$('.ph-c .scr', stage);
  const arts = $$('.art-stack .art', stage);
  const SCREEN_MS = 2600;
  let appIndex = 0;
  let screenIndex = 0;
  let scrOn = 0;
  let stageTimer = null;
  let stageVisible = false;
  let autoplay = true;

  APPS.forEach((a, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'app-tab fx';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'stage');
    b.style.setProperty('--art', a.art);
    b.innerHTML =
      '<span class="app-ico"><img src="' + esc(a.screens[0]) + '" alt="" /></span>' +
      '<span><small>0' + (i + 1) + ' · ' + esc(a.tag) + '</small><b>' + esc(a.name) + '</b></span>' +
      '<span class="go" aria-hidden="true">→</span><span class="tab-bar"><i></i></span>';
    b.addEventListener('click', () => { autoplay = false; selectApp(i); });
    appTabs.appendChild(b);
  });

  function infoHTML(a, i) {
    const ps = (a.problem ? '<div class="p"><span>Problem</span><p><s>' + esc(a.problem) + '</s></p></div>' : '') +
      '<div class="s"><span>' + (a.problem ? 'Solved' : 'In short') + '</span><p>' + esc(a.solution) + '</p></div>';
    const action = PROJECTS[a.id]
      ? '<button type="button" class="btn btn-dark btn-sm fx" data-case="' + esc(a.id) + '">Open case file <span class="arr" aria-hidden="true">→</span></button><span class="si-note">Problem, fix &amp; bugs I hit</span>'
      : '<a class="btn btn-ghost btn-sm fx" href="' + esc(a.screens[0]) + '" data-lightbox-dyn data-title="' + esc(a.name) + '"><span class="roll"><span data-text="View screen">View screen</span></span> <span class="arr" aria-hidden="true">↗</span></a>';
    return '<p class="si-k">0' + (i + 1) + ' · ' + esc(a.tag) + '</p>' +
      '<h3 class="si-title">' + esc(a.name) + '</h3>' +
      '<div class="si-ps">' + ps + '</div>' +
      '<div class="si-chips">' + a.chips.map((c) => '<span class="chip">' + esc(c) + '</span>').join('') + '</div>' +
      '<div class="si-actions">' + action + '</div>';
  }

  function setScreen(i, instant) {
    const a = APPS[appIndex];
    screenIndex = i;
    const set = a.mode === 'art' ? arts : scrs;
    const next = set[instant ? scrOn : 1 - scrOn];
    next.src = a.screens[i];
    next.alt = a.name + ' — ' + (a.mode === 'art' ? 'artwork ' : 'screen ') + (i + 1);
    if (!instant) {
      set[scrOn].classList.remove('on');
      next.classList.add('on');
      scrOn = 1 - scrOn;
    }
    $$('i', stageDots).forEach((d, j) => d.classList.toggle('on', j === i));
    const bar = $('.app-tab[aria-selected="true"] .tab-bar i', appTabs);
    if (bar) bar.style.width = ((i + 1) / a.screens.length) * 100 + '%';
  }

  function selectApp(i) {
    const firstPaint = !stage.dataset.ready;
    appIndex = i;
    $$('.app-tab', appTabs).forEach((t, j) => {
      t.setAttribute('aria-selected', String(j === i));
      t.tabIndex = j === i ? 0 : -1;
      $('.tab-bar i', t).style.width = '0%';
    });
    const a = APPS[i];
    const apply = () => {
      stage.style.setProperty('--art', a.art);
      stage.classList.toggle('single', a.screens.length < 2);
      stage.classList.toggle('art-mode', a.mode === 'art');
      stage.classList.toggle('art-framed', !!a.frame);
      stage.classList.toggle('light-dots', !a.dark);
      phL.src = a.screens[1 % a.screens.length];
      phR.src = a.screens[(a.screens.length - 1) % a.screens.length];
      scrs.concat(arts).forEach((s) => s.classList.remove('on'));
      scrOn = 0;
      (a.mode === 'art' ? arts : scrs)[0].classList.add('on');
      stageDots.innerHTML = a.screens.map(() => '<i></i>').join('');
      stageInfo.innerHTML = infoHTML(a, i);
      setScreen(0, true);
      stage.classList.remove('switching');
    };
    restartStageTimer();
    if (firstPaint || reduceMotion) { apply(); stage.dataset.ready = '1'; return; }
    stage.classList.add('switching');
    setTimeout(apply, 380);
  }

  function tickStage() {
    const a = APPS[appIndex];
    if (screenIndex < a.screens.length - 1) setScreen(screenIndex + 1);
    else if (autoplay) selectApp((appIndex + 1) % APPS.length);
    else setScreen(0);
  }
  function restartStageTimer() {
    clearInterval(stageTimer);
    stageTimer = null;
    if (stageVisible && !reduceMotion && !document.hidden) stageTimer = setInterval(tickStage, SCREEN_MS);
  }

  appTabs.addEventListener('keydown', (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    autoplay = false;
    const n = (appIndex + keys[e.key] + APPS.length) % APPS.length;
    selectApp(n);
    $$('.app-tab', appTabs)[n].focus();
  });
  stage.addEventListener('pointerenter', () => { clearInterval(stageTimer); stageTimer = null; });
  stage.addEventListener('pointerleave', restartStageTimer);
  stage.addEventListener('click', (e) => {
    const dyn = e.target.closest('[data-lightbox-dyn]');
    if (dyn) { e.preventDefault(); openLightbox(dyn.getAttribute('href'), dyn.dataset.title); }
  });
  const stageObs = io((entries) => { stageVisible = entries[0].isIntersecting; restartStageTimer(); }, { threshold: 0.35 });
  if (stageObs) stageObs.observe(stage);
  document.addEventListener('visibilitychange', restartStageTimer);
  selectApp(0);

  /* ============================================================
     HOW I SOLVE — messy notes → solved board
     ============================================================ */
  const PROBLEMS = [
    {
      q: 'I have an idea, but no app yet.',
      diag: 'Ideas stall when the first version tries to do everything.',
      steps: [
        ['Find the one flow', 'a user must finish to get value — and cut the rest for v1.'],
        ['Build it in Flutter', 'on Firebase, with sign-in, data and real-time sync done properly.'],
        ['Hand you a working build', 'so real people can test it before you spend more.']
      ],
      proof: { case: 'event-management', t: 'Event Management', d: 'From scattered group chats to a shared calendar with voting — built solo in 6 weeks.' }
    },
    {
      q: 'I need Android and iOS on one budget.',
      diag: 'Two native apps means two codebases, two bills and two sets of bugs.',
      steps: [
        ['One Flutter codebase', 'that runs natively on Android and iOS.'],
        ['Logic written once', 'with clean state management, so every fix lands on both platforms.'],
        ['Tested on real devices', 'for each platform’s quirks — keyboards, notches, permissions.']
      ],
      proof: { case: 'newzler', t: 'Newzler', d: 'One Flutter codebase for Android and iOS — personalised feed, in-app video and search.' },
      also: { cert: 'certificates/flutter-course.jpg', label: 'Flutter App Development certificate' }
    },
    {
      q: 'My app feels slow and heavy.',
      diag: 'Most slowness comes from loading too much, too early.',
      steps: [
        ['Profile first', '— find where frames drop and what loads at startup.'],
        ['Load less, later', '— paginate lists, cache images, lazy-load what’s off-screen.'],
        ['Re-test on a mid-range phone', '— not just a flagship, so it’s fast for real users.']
      ],
      proof: { case: 'karyana-store', t: 'Karyana Store', d: 'Cached product images and paginated the catalog so browsing stays snappy.' },
      also: { case: 'newzler', label: 'Newzler — smooth 60fps image-heavy feed' }
    },
    {
      q: 'My app must never lose or miscount data.',
      diag: 'The worst bugs don’t crash — they quietly save the wrong number.',
      steps: [
        ['Model it safely', '— integer money, user-scoped data, rules that deny by default.'],
        ['Make writes atomic', '— everything that moves money lands in one batch, or not at all.'],
        ['Test what fails quietly', '— dates, currencies and release-only builds, not just the happy path.']
      ],
      proof: { case: 'finora', t: 'Finora', d: '25k lines of Dart and 326 tests — including three bugs that only existed in release builds.' }
    },
    {
      q: 'I need payments that never double-charge.',
      diag: 'Payments fail in quiet ways: a double-tap, a retry, a webhook that arrives late.',
      steps: [
        ['Keep cards out of the app', '— a hosted checkout handles them; the server decides who paid.'],
        ['Make every charge idempotent', '— a retried or double-tapped request can never charge twice.'],
        ['Trust only verified events', '— signed webhooks, duplicates ignored, a status check as a safety net.']
      ],
      proof: { case: 'nova-cinema', t: 'Nova Cinema + nova-pay', d: 'A Flutter streaming app with its own payments backend — plans, rentals and renewals in 5 currencies.' }
    },
    {
      q: 'I want to sell products online.',
      diag: 'A store app is won or lost at the cart.',
      steps: [
        ['A clear catalog', '— categories, search and honest prices with stock info.'],
        ['A flexible cart', '— single and bulk orders, checkout in a few taps.'],
        ['Reasons to return', '— favourites and quick re-order, so buyers never search twice.']
      ],
      proof: { case: 'karyana-store', t: 'Karyana Store', d: 'A neighbourhood grocery online: categories, bulk orders and checkout in PKR.' }
    },
    {
      q: 'I don’t know what my users actually do.',
      diag: 'Without data, every new feature is a guess.',
      steps: [
        ['Agree the 3–5 questions', 'the data has to answer.'],
        ['Track the right events', 'and model them cleanly in Firestore or SQL.'],
        ['Turn them into a dashboard', 'you’ll actually read every week.']
      ],
      proof: { pdf: 'certificates/google-data-analytics.pdf', t: 'Google Data Analytics', d: 'Professional Certificate — preparing, analysing and visualising data with SQL, Python and Tableau.' }
    }
  ];

  const THUMBS = { newzler: 'projects/shots/newzler-2.jpg' };
  const ico = (d) => '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  const BULB = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2.2h5c.1-1 .5-1.7 1.1-2.2A6 6 0 0 0 12 3z"/></svg>';
  const STEP_ICONS = [
    ico('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    ico('<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>'),
    ico('<rect x="6" y="2" width="12" height="20" rx="3"/><path d="m9 12 2 2 4-4"/>')
  ];
  const solverList = $('#solverList');
  const solverPanel = $('#solverPanel');

  function proofThumb(p) {
    if (p.case) return '<img src="' + esc(THUMBS[p.case] || PROJECTS[p.case].hero) + '" alt="" />';
    return '<svg width="30" height="30"><use href="#g-logo"/></svg>';
  }

  function renderProblem(i) {
    const p = PROBLEMS[i];
    $$('.note', solverList).forEach((b, j) => {
      b.setAttribute('aria-selected', String(j === i));
      b.tabIndex = j === i ? 0 : -1;
      $('.mark', b).textContent = j === i ? '✓' : '?';
    });
    solverPanel.setAttribute('aria-labelledby', 'prob-' + i);

    let also = '';
    if (p.also && p.also.case) also = '<p class="also">Also: <a href="#" data-case="' + esc(p.also.case) + '">' + esc(p.also.label) + '</a></p>';
    if (p.also && p.also.cert) also = '<p class="also">Also: <a href="' + esc(p.also.cert) + '" data-also-cert>' + esc(p.also.label) + '</a></p>';

    solverPanel.innerHTML =
      '<div class="bd-top">' +
        '<div class="bd-problem"><span class="bd-qmark" aria-hidden="true">?</span><span class="lbl red">The problem</span><p class="board-q">“<span>' + esc(p.q) + '</span>”</p></div>' +
        '<svg class="bd-arrow" viewBox="0 0 120 24" aria-hidden="true"><path d="M2 12h108" /><path d="M100 4l10 8-10 8" /></svg>' +
        '<div class="bd-diag"><span class="lbl lbl-ico">' + BULB + 'Diagnosis</span><p class="board-diag">' + esc(p.diag) + '</p></div>' +
      '</div>' +
      '<span class="lbl bd-how">How I’d solve it</span>' +
      '<div class="flow-wrap"><span class="flow-track" aria-hidden="true"><i></i></span><span class="flow-dot" aria-hidden="true"></span>' +
      '<ol class="flow">' + p.steps.map((s, k) =>
        '<li class="node"><span class="node-ico">' + STEP_ICONS[k] + '<span class="node-badge" aria-hidden="true">' + (k + 1) + '</span></span>' +
        '<span class="node-k">Step 0' + (k + 1) + '</span><b>' + esc(s[0]) + '</b><p>' + esc(s[1]) + '</p></li>').join('') + '</ol></div>' +
      '<button type="button" class="proof" data-proof>' +
        '<span class="proof-img">' + proofThumb(p.proof) + '</span>' +
        '<span class="proof-text"><span class="lbl green">Done before</span><b>' + esc(p.proof.t) + '</b>' + esc(p.proof.d) + '</span>' +
        '<span class="stamp" aria-hidden="true">Solved ✓</span>' +
        '<span class="proof-go">' + (p.proof.case ? 'Open case file' : 'View certificate') + ' <span class="arr" aria-hidden="true">→</span></span>' +
      '</button>' + also;

    $('[data-proof]', solverPanel).addEventListener('click', (e) => {
      if (p.proof.case) openCase(p.proof.case, e.currentTarget);
      else window.open(p.proof.pdf, '_blank', 'noopener');
    });
    const alsoCert = $('[data-also-cert]', solverPanel);
    if (alsoCert) alsoCert.addEventListener('click', (e) => { e.preventDefault(); openLightbox(p.also.cert, p.also.label); });
    startFlow();
  }

  /* Live sequence: the line fills and the dot slides into each step, then the proof lights up. */
  let flowTimer = null;
  let flowPlace = null;
  let boardVisible = true;
  function startFlow() {
    clearInterval(flowTimer);
    flowTimer = null;
    const wrap = $('.flow-wrap', solverPanel);
    const nodes = $$('.node', wrap);
    const track = $('.flow-track', wrap);
    const fill = $('i', track);
    const dot = $('.flow-dot', wrap);
    const proof = $('.proof', solverPanel);
    const centers = () => nodes.map((n) => {
      const t = $('.node-ico', n);
      return { x: n.offsetLeft + t.offsetLeft + t.offsetWidth / 2, y: n.offsetTop + t.offsetTop + t.offsetHeight / 2 };
    });
    let step = 0;
    flowPlace = () => {
      const c = centers();
      const first = c[0];
      const last = c[c.length - 1];
      const target = c[Math.min(step, c.length - 1)];
      const vertical = Math.abs(c[1].y - first.y) > 10;
      track.classList.toggle('v', vertical);
      track.style.left = first.x + 'px';
      track.style.top = first.y + 'px';
      track.style.width = vertical ? '2px' : (last.x - first.x) + 'px';
      track.style.height = vertical ? (last.y - first.y) + 'px' : '2px';
      fill.style.width = vertical ? '100%' : (target.x - first.x) + 'px';
      fill.style.height = vertical ? (target.y - first.y) + 'px' : '100%';
      dot.style.transform = 'translate(' + (target.x - 6) + 'px,' + (target.y - 6) + 'px)';
      wrap.dataset.step = Math.min(step, nodes.length - 1);
      nodes.forEach((n, i) => {
        n.classList.toggle('active', i === step);
        n.classList.toggle('done', i < step);
        n.classList.toggle('todo', i > step);
      });
      proof.classList.toggle('lit', step >= nodes.length);
    };
    if (reduceMotion) { step = nodes.length; flowPlace(); return; }
    flowPlace();
    let tick = 0;
    flowTimer = setInterval(() => {
      if (!boardVisible || document.hidden) return;
      tick = (tick + 1) % (nodes.length + 2);
      step = Math.min(tick, nodes.length);
      flowPlace();
    }, 1500);
  }
  window.addEventListener('resize', () => { if (flowPlace) flowPlace(); });
  const boardObs = io((entries) => { boardVisible = entries[0].isIntersecting; }, { threshold: 0.3 });
  if (boardObs) boardObs.observe(solverPanel);

  PROBLEMS.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'note fx';
    b.id = 'prob-' + i;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'solverPanel');
    b.innerHTML = '<span class="mark" aria-hidden="true">?</span><span>' + esc(p.q) + '</span>';
    b.addEventListener('click', () => renderProblem(i));
    solverList.appendChild(b);
  });
  solverList.addEventListener('keydown', (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const tabs = $$('.note', solverList);
    const next = (tabs.indexOf(document.activeElement) + keys[e.key] + tabs.length) % tabs.length;
    renderProblem(next);
    tabs[next].focus();
  });
  renderProblem(0);

  /* ============================================================
     CASE FILE DRAWER
     ============================================================ */
  const drawer = $('#drawer');
  const drawerPanel = $('.drawer-panel', drawer);
  const drawerBody = $('#drawerBody');
  let drawerReturn = null;
  let currentCase = null;

  function caseHTML(id) {
    const p = PROJECTS[id];
    const i = ORDER.indexOf(id);
    const prev = ORDER[(i - 1 + ORDER.length) % ORDER.length];
    const next = ORDER[(i + 1) % ORDER.length];
    const m = p.meta || {};
    const metaList = p.metaList || [['Role', m.role], ['Duration', m.duration], ['Platform', m.platform], ['Status', m.status]];
    const block = (title, list, render, cls) => (list && list.length)
      ? '<div class="cf-block"><h3 class="cf-h">' + title + '</h3><div class="' + cls + '">' + list.map(render).join('') + '</div></div>' : '';
    const gh = (p.github ? '<a class="btn btn-ghost btn-sm fx" href="' + esc(p.github) + '" target="_blank" rel="noopener"><span class="roll"><span data-text="Code on GitHub">Code on GitHub</span></span> <span class="arr" aria-hidden="true">↗</span></a>' : '') +
      (p.github2 ? '<a class="btn btn-ghost btn-sm fx" href="' + esc(p.github2.url) + '" target="_blank" rel="noopener"><span class="roll"><span data-text="' + esc(p.github2.label) + '">' + esc(p.github2.label) + '</span></span> <span class="arr" aria-hidden="true">↗</span></a>' : '');
    return (
      '<p class="cf-sub">' + esc(p.subtitle) + '</p>' +
      '<h2 class="cf-title" id="caseTitle">' + esc(p.title) + '</h2>' +
      '<p class="cf-desc">' + esc(p.description) + '</p>' +
      '<div class="cf-tags">' + (p.tags || []).map((t) => '<span class="chip">' + esc(t) + '</span>').join('') + '</div>' +
      (gh ? '<div class="cf-links">' + gh + '</div>' : '') +
      '<div class="cf-meta">' + metaList.map((r) => '<div><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>').join('') + '</div>' +
      '<div class="cf-block"><h3 class="cf-h">The problem → the fix</h3><div class="cf-ps">' +
        '<div class="cf-card problem"><h4>Problem</h4>' + (p.problem || []).map((x) => '<p>' + esc(x) + '</p>').join('') + '</div>' +
        '<div class="cf-card solution"><h4>Solution</h4><p>' + esc((p.solution || {}).intro) + '</p><ul>' +
          ((p.solution || {}).points || []).map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul></div>' +
      '</div></div>' +
      block(p.artShots ? 'Artwork' : 'Screens', p.shots, (s) => '<button type="button" class="cf-shot' + (p.artShots ? ' art' : '') + '" data-shot="' + esc(s.img) + '" data-title="' + esc(p.title + ' — ' + s.label) + '">' +
          '<span class="frame"><img src="' + esc(s.img) + '" alt="' + esc(p.title + ' — ' + s.label) + '" loading="lazy" /></span><small>' + esc(s.label) + '</small></button>', 'cf-shots' + (p.artShots ? ' art' : '')) +
      ((p.challenges || []).length ? '<div class="cf-block"><h3 class="cf-h">Bugs I hit — and how I fixed them</h3><div class="cf-bugs">' +
        p.challenges.map((c) => '<div class="cf-bug"><div><span>Hard part</span>' + esc(c.c) + '</div><div><span>Fix</span>' + esc(c.s) + '</div></div>').join('') +
      '</div></div>' : '') +
      '<div class="cf-block"><h3 class="cf-h">What it does</h3><div class="cf-feat">' +
        (p.features || []).map((f) => '<div><b>' + esc(f.t) + '</b><p>' + esc(f.d) + '</p></div>').join('') +
      '</div></div>' +
      block('By the numbers', p.results, (r) => '<div><b>' + esc(r.n) + '</b><span>' + esc(r.l) + '</span></div>', 'cf-results') +
      '<div class="cf-block"><h3 class="cf-h">Built with</h3><div class="cf-tags">' +
        (p.stack || []).map((t) => '<span class="chip">' + esc(t) + '</span>').join('') +
      '</div><p style="margin-top:22px"><a class="btn btn-dark btn-sm fx" href="#contact" data-close>Have a similar problem? Let’s talk <span class="arr" aria-hidden="true">→</span></a></p></div>' +
      '<div class="cf-nav">' +
        '<button type="button" data-goto="' + esc(prev) + '"><small>← Previous</small>' + esc(PROJECTS[prev].title) + '</button>' +
        '<button type="button" data-goto="' + esc(next) + '"><small>Next →</small>' + esc(PROJECTS[next].title) + '</button>' +
      '</div>'
    );
  }

  function setCaseParam(id) {
    try {
      const url = new URL(window.location.href);
      if (id) url.searchParams.set('case', id); else url.searchParams.delete('case');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) { /* file:// or old browser */ }
  }

  function openCase(id, from) {
    if (!PROJECTS[id]) return;
    if (!currentCase) drawerReturn = from || document.activeElement;
    currentCase = id;
    drawerBody.innerHTML = caseHTML(id);
    drawerPanel.scrollTop = 0;
    if (drawer.hidden) {
      drawer.hidden = false;
      document.body.style.overflow = 'hidden';
      void drawer.offsetWidth;
      drawer.classList.add('open');
    }
    drawerPanel.focus({ preventScroll: true });
    setCaseParam(id);
  }

  function closeCase() {
    if (!currentCase) return;
    currentCase = null;
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    setCaseParam(null);
    setTimeout(() => { if (!currentCase) drawer.hidden = true; }, reduceMotion ? 0 : 450);
    if (drawerReturn && drawerReturn.focus) drawerReturn.focus({ preventScroll: true });
  }

  document.addEventListener('click', (e) => {
    const caseBtn = e.target.closest('[data-case]');
    if (caseBtn) { e.preventDefault(); openCase(caseBtn.dataset.case, caseBtn); return; }
    if (drawer.hidden) return;
    const go = e.target.closest('[data-goto]');
    if (go) { openCase(go.dataset.goto); return; }
    const shot = e.target.closest('[data-shot]');
    if (shot) { openLightbox(shot.dataset.shot, shot.dataset.title); return; }
    if (e.target.closest('[data-close]')) closeCase();
  });

  drawer.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled]), [tabindex="0"]', drawerPanel).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  /* ---------- Lightbox ---------- */
  const lightbox = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCap = $('#lbCap');
  const lbClose = $('#lbClose');
  let lbReturn = null;

  function openLightbox(src, title) {
    lbReturn = document.activeElement;
    lbImg.src = src;
    lbImg.alt = title || '';
    lbCap.textContent = title || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lbImg.removeAttribute('src');
    if (!currentCase) document.body.style.overflow = '';
    if (lbReturn && lbReturn.focus) lbReturn.focus({ preventScroll: true });
  }
  $$('[data-lightbox]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(a.getAttribute('href'), a.dataset.title);
  }));
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!lightbox.hidden) closeLightbox();
    else if (currentCase) closeCase();
    else if (navList.classList.contains('open')) setMenu(false);
  });

  /* ---------- Contact: problem form → email, copy email ---------- */
  const form = $('#problemForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ta = $('#problemText');
    const text = ta.value.trim();
    if (!text) { ta.focus(); toast('Tell me the hard part first ✍️'); return; }
    const btn = $('.send-btn', form);
    btn.classList.remove('sent');
    void btn.offsetWidth;
    btn.classList.add('sent');
    const subject = 'Project inquiry — via your portfolio';
    const body = 'Hi Ali,\n\nThe hard part:\n' + text + '\n\n';
    setTimeout(() => {
      window.location.href = 'mailto:alisaeed795555@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }, reduceMotion ? 0 : 450);
  });
  const copyBtn = $('#copyEmail');
  copyBtn.addEventListener('click', () => {
    const value = copyBtn.dataset.copy;
    const done = () => {
      copyBtn.textContent = 'Copied ✓';
      copyBtn.classList.add('done');
      toast('Email copied');
      setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('done'); }, 1800);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(value).then(done, () => toast(value));
    else toast(value);
  });

  /* ---------- Deep link: ?case=id ---------- */
  try {
    const deep = new URLSearchParams(window.location.search).get('case');
    if (deep && PROJECTS[deep]) setTimeout(() => openCase(deep), 300);
  } catch (e) { /* ignore */ }

  /* ============================================================
     BACKGROUND — "connect the dots" field
     ============================================================ */
  const canvas = $('#bgDots');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const readDot = () => getComputedStyle(document.documentElement).getPropertyValue('--dot-rgb').trim() || '79, 95, 214';
    let RGB = readDot();
    document.addEventListener('themechange', () => { RGB = readDot(); if (reduceMotion) draw(false); });
    let w = 0, h = 0, dots = [], raf = null;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 22000), 80);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.7
      }));
      if (reduceMotion) draw(false);
    }

    function draw(move) {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (move) {
          d.x += d.vx; d.y += d.vy;
          if (d.x < 0 || d.x > w) d.vx *= -1;
          if (d.y < 0 || d.y > h) d.vy *= -1;
          const dx = mouse.x - d.x, dy = mouse.y - d.y, dist = Math.hypot(dx, dy);
          if (dist < 170 && dist > 1) { d.x += (dx / dist) * 0.35; d.y += (dy / dist) * 0.35; }
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + RGB + ', ' + (0.16 + d.r * 0.06) + ')';
        ctx.fill();
      }
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = 'rgba(' + RGB + ', ' + (1 - d / 130) * 0.1 + ')';
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 170) {
          ctx.strokeStyle = 'rgba(' + RGB + ', ' + (1 - dm / 170) * 0.28 + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }

    function loop() { draw(true); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && !reduceMotion) raf = requestAnimationFrame(loop); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener('pointerleave', () => { mouse.x = -9999; mouse.y = -9999; });
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    resize();
    start();
  }
})();
