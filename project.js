/* Renders a project case-study page from window.PROJECTS using ?id= */
(function () {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || window.PROJECT_ORDER[0];
  const p = window.PROJECTS[id];
  const root = document.getElementById("pp");

  if (!p) {
    root.innerHTML = '<div class="pp-wrap"><a class="pp-back" href="index.html#work">← Back to Projects</a>' +
      '<h1 class="pp-title">Project not found</h1></div>';
    return;
  }

  document.title = p.title + " — Muhammad Ali Saeed";

  const order = window.PROJECT_ORDER;
  const i = order.indexOf(id);
  const prev = order[(i - 1 + order.length) % order.length];
  const next = order[(i + 1) % order.length];
  const P = window.PROJECTS;

  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const deviceClass = p.type === "web" ? "browser" : "phone";
  const chrome = p.type === "web"
    ? '<span class="chrome"><i></i><i></i><i></i><b>' + esc(id.replace(/-/g, "")) + '.app</b></span>'
    : '<span class="notch"></span>';

  // Only render a button when there is a real destination (skip empty / "#" placeholders)
  const btn = (cls, href, label) => (href && href !== "#")
    ? '<a class="' + cls + '" href="' + href + '"' + (href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : '') + '>' + label + '</a>'
    : '';

  const metaItem = (icon, label, val) =>
    '<div class="pp-meta-item"><span class="pp-meta-ico">' + icon + '</span><div><span class="pp-meta-l">' +
    esc(label) + '</span><span class="pp-meta-v">' + esc(val) + '</span></div></div>';

  const html = `
  <div class="pp-wrap">
    <a class="pp-back" href="index.html#work">← Back to Projects</a>

    <!-- HERO -->
    <section class="pp-hero">
      <div class="pp-hero-text">
        <span class="pp-badge">★ ${esc(p.badge || "Project")}</span>
        <h1 class="pp-title">${esc(p.title)}</h1>
        <p class="pp-sub">${esc(p.subtitle)}</p>
        <p class="pp-desc">${esc(p.description)}</p>
        <div class="pp-tags">${p.tags.map(t => '<span class="pp-tag">' + esc(t) + '</span>').join("")}</div>
        <div class="pp-actions">
          ${btn("btn-dark", p.links.demo, "Live Demo ↗")}
          ${btn("btn-outline", p.links.github, "GitHub ⎘")}
          ${p.links.pdf ? btn("btn-outline", p.links.pdf, "Case Study PDF ⬇") : ""}
        </div>
      </div>
      <div class="pp-hero-media">
        <a class="device ${deviceClass}" style="background-image:linear-gradient(180deg,rgba(0,0,0,0) 60%,rgba(0,0,0,.18)),url('${p.hero}')">${chrome}</a>
      </div>
    </section>

    <!-- META BAR -->
    <section class="pp-metabar">
      ${metaItem("👤", "Role", p.meta.role)}
      ${metaItem("⏱", "Duration", p.meta.duration)}
      ${metaItem("🖥", "Platform", p.meta.platform)}
      ${metaItem("✓", "Status", p.meta.status)}
      ${metaItem("📅", "Release", p.meta.release)}
    </section>

    <!-- PROBLEM / SOLUTION -->
    <section class="pp-ps">
      <div class="pp-card pp-problem">
        <h3><span class="pp-dot red">◐</span> The Problem</h3>
        ${p.problem.map(t => "<p>" + esc(t) + "</p>").join("")}
      </div>
      <div class="pp-card pp-solution">
        <h3><span class="pp-dot green">✦</span> The Solution</h3>
        <p>${esc(p.solution.intro)}</p>
        <ul class="pp-checks">
          ${p.solution.points.map(t => '<li>' + esc(t) + '</li>').join("")}
        </ul>
      </div>
    </section>

    <!-- KEY FEATURES -->
    <section class="pp-block">
      <h2 class="pp-h2">Key Features</h2>
      <div class="pp-features">
        ${p.features.map(f => '<div class="pp-feature"><div class="pp-feature-ico">◆</div><h4>' +
          esc(f.t) + '</h4><p>' + esc(f.d) + '</p></div>').join("")}
      </div>
    </section>

    <!-- SCREENSHOTS -->
    <section class="pp-block">
      <h2 class="pp-h2">App Screenshots</h2>
      <div class="pp-shots ${p.type === 'web' ? 'pp-shots-web' : ''}">
        ${p.shots.map(s => '<figure class="pp-shot"><div class="pp-shot-img ' + deviceClass +
          '" style="background-image:url(\'' + s.img + '\')">' +
          (p.type === 'web' ? '<span class="chrome mini"><i></i><i></i><i></i></span>' : '<span class="notch"></span>') +
          '</div><figcaption>' + esc(s.label) + '</figcaption></figure>').join("")}
      </div>
    </section>

    <!-- TECH + HIGHLIGHTS -->
    <section class="pp-block pp-cols2">
      <div>
        <h2 class="pp-h2">Tech Stack</h2>
        <div class="pp-stack">${p.stack.map(t => '<span class="pp-chip">' + esc(t) + '</span>').join("")}</div>
      </div>
      <div>
        <h2 class="pp-h2">Highlights</h2>
        <ul class="pp-checks">${p.highlights.map(h => '<li>' + esc(h) + '</li>').join("")}</ul>
      </div>
    </section>

    <!-- CHALLENGES -->
    <section class="pp-block">
      <h2 class="pp-h2">Challenges &amp; Solutions</h2>
      <div class="pp-ps">
        ${p.challenges.map(ch => '<div class="pp-card"><span class="pp-pill red">Challenge</span><p class="pp-strong">' +
          esc(ch.c) + '</p><span class="pp-pill green">Solution</span><p>' + esc(ch.s) + '</p></div>').join("")}
      </div>
    </section>

    <!-- PROCESS + RESULTS -->
    <section class="pp-block pp-cols2 wide">
      <div>
        <h2 class="pp-h2">Development Process</h2>
        <ol class="pp-process">
          ${p.process.map((s, n) => '<li><span class="pp-step-n">' + (n + 1) + '</span>' + esc(s) + '</li>').join("")}
        </ol>
      </div>
      <div>
        <h2 class="pp-h2">Results</h2>
        <div class="pp-results">
          ${p.results.map(r => '<div class="pp-result"><b>' + esc(r.n) + '</b><span>' + esc(r.l) + '</span></div>').join("")}
        </div>
      </div>
    </section>

    <!-- PREV / NEXT -->
    <section class="pp-nav">
      <a class="pp-nav-item prev" href="project.html?id=${prev}">
        <span class="pp-nav-dir">← Previous Project</span>
        <span class="pp-nav-name">${esc(P[prev].title)}</span>
        <span class="pp-nav-sub">${esc(P[prev].subtitle)}</span>
      </a>
      <div class="pp-nav-cta">
        <p>Have a project in mind?</p>
        <a class="btn-dark" href="index.html#contact">Let's Talk →</a>
      </div>
      <a class="pp-nav-item next" href="project.html?id=${next}">
        <span class="pp-nav-dir">Next Project →</span>
        <span class="pp-nav-name">${esc(P[next].title)}</span>
        <span class="pp-nav-sub">${esc(P[next].subtitle)}</span>
      </a>
    </section>
  </div>`;

  root.innerHTML = html;
})();
