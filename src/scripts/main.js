import { completedProjects } from "../data/projects.js";
import { labExperiments } from "../data/lab.js";
import { education, experience, languages } from "../data/experience.js";
import { capabilitiesGroups, corePrinciples } from "../data/capabilities.js";
import { initHeroWaveform } from "./waveform.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Hero Waveform
  initHeroWaveform("hero-waveform");

  // 2. Navigation & Mobile Menu
  setupNavigation();

  // 3. Render Dynamic Content
  renderSelectedWork();
  renderCurrentLab();
  renderPrinciples();
  renderAboutCapabilities();
  renderContactInfo();

  // 4. Case Study Drawer
  setupCaseStudyDrawer();

  // 5. ISS Live Telemetry Ticker
  setupISSTelemetryTicker();

  // 6. Interactive Genesis Sliders
  setupGenesisControls();

  // 7. Clipboard Utilities
  setupClipboardCopy();

  // 8. Footer Year
  const yearElem = document.getElementById("footer-year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});

/* --------------------------------------------------------------------------
   Navigation Setup & Active Section Tracking
   -------------------------------------------------------------------------- */
function setupNavigation() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mobileMenu = document.querySelector(".mobile-nav-menu");

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("open");
    });

    // Close mobile menu on anchor click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
      });
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
        mobileToggle.focus();
      }
    });
  }

  // Scrollspy with IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* --------------------------------------------------------------------------
   Render Selected Work (Completed Projects)
   -------------------------------------------------------------------------- */
function renderSelectedWork() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = completedProjects
    .map((p) => {
      if (p.id === "wildlight") {
        return createWildlightCard(p);
      } else if (p.id === "iss-tracker") {
        return createISSCard(p);
      }
      return "";
    })
    .join("");
}

function createWildlightCard(p) {
  return `
    <article class="project-card" id="project-${p.id}">
      <header class="project-card-header">
        <div class="project-card-meta">
          <span class="project-number">${p.number}</span>
          <span class="eyebrow">${p.eyebrow}</span>
        </div>
        <div class="status-pill status-${p.statusType}">
          <span class="status-dot"></span>
          <span>${p.status}</span>
        </div>
      </header>

      <h3 class="project-card-title">${p.title}</h3>
      <p class="project-card-summary">${p.summary}</p>

      <!-- Key Metrics Strip -->
      <div class="metrics-strip">
        ${p.highlights
          .map(
            (h) => `
          <div class="metric-item">
            <span class="metric-value">${h.label}</span>
            <span class="metric-label">${h.detail}</span>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Evaluation Data Tables -->
      <div class="evaluation-layout">
        <!-- Table 1: 5-Fold Cross Validation -->
        <div class="eval-table-card">
          <div class="eval-table-header">
            <span class="eval-table-title">ResNet18 5-Fold Evaluation</span>
            <span class="eval-table-note">Official ESC-50 Folds</span>
          </div>
          <table class="eval-table" aria-label="ResNet18 5-Fold Cross Validation Accuracy">
            <thead>
              <tr>
                <th scope="col">Validation Fold</th>
                <th scope="col">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              ${p.fiveFoldTable
                .map(
                  (f) => `
                <tr>
                  <td>${f.fold}</td>
                  <td>${f.accuracy}</td>
                </tr>
              `
                )
                .join("")}
              <tr class="highlight-row">
                <td>Mean across five folds</td>
                <td>75.75%</td>
              </tr>
              <tr>
                <td>Population standard deviation</td>
                <td>3.48 pp</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table 2: Fold-5 Architecture Comparison -->
        <div class="eval-table-card">
          <div class="eval-table-header">
            <span class="eval-table-title">Fold-5 Architecture Comparison</span>
            <span class="eval-table-note">Fold-5 only</span>
          </div>
          <table class="eval-table" aria-label="Fold-5 architecture comparison">
            <thead>
              <tr>
                <th scope="col">Model Approach</th>
                <th scope="col">Val Accuracy</th>
              </tr>
            </thead>
            <tbody>
              ${p.fold5Comparison
                .map(
                  (m) => `
                <tr>
                  <td>
                    <div>${m.model}</div>
                    <small style="color: var(--text-tertiary); font-size: 0.6875rem;">${m.note}</small>
                  </td>
                  <td>${m.accuracy}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <p style="margin-top: 0.85rem; font-size: 0.75rem; color: var(--text-tertiary); line-height: 1.45;">
            * Single fold-5 evaluation only; not directly comparable to the 5-fold cross-validation mean.
          </p>
        </div>
      </div>

      <!-- Evaluation Integrity Note -->
      <div class="eval-integrity-note">
        <span class="eval-integrity-icon" aria-hidden="true">[i]</span>
        <div>
          <strong>Evaluation Integrity Note:</strong> ${p.evaluationIntegrityNote}
        </div>
      </div>

      <!-- Real Figures -->
      <div class="project-images-grid">
        ${p.images
          .map(
            (img) => `
          <figure class="project-figure">
            <img src="${img.src}" alt="${img.alt}" loading="lazy" />
            <figcaption class="project-caption">${img.caption}</figcaption>
          </figure>
        `
          )
          .join("")}
      </div>

      <!-- Actions -->
      <footer class="project-actions">
        <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          Explore Repository ↗
        </a>
        <button type="button" class="btn btn-secondary open-case-study" data-project-id="${p.id}">
          Inspect Full Methodology & Evaluation
        </button>
      </footer>
    </article>
  `;
}

function createISSCard(p) {
  return `
    <article class="project-card" id="project-${p.id}">
      <header class="project-card-header">
        <div class="project-card-meta">
          <span class="project-number">${p.number}</span>
          <span class="eyebrow">${p.eyebrow}</span>
        </div>
        <div class="status-pill status-${p.statusType}">
          <span class="status-dot"></span>
          <span>${p.status}</span>
        </div>
      </header>

      <h3 class="project-card-title">${p.title}</h3>
      <p class="project-card-summary">${p.summary}</p>

      <!-- Key Metrics Strip -->
      <div class="metrics-strip">
        ${p.highlights
          .map(
            (h) => `
          <div class="metric-item">
            <span class="metric-value">${h.label}</span>
            <span class="metric-label">${h.detail}</span>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Live Telemetry Simulation Panel + Project Details -->
      <div class="iss-telemetry-grid">
        <div class="iss-data-card">
          <div>
            <div class="eval-table-header">
              <span class="eval-table-title">Live Telemetry Feed</span>
              <span class="eval-table-note" id="iss-poll-counter">Polling: 5s</span>
            </div>
            <div class="telemetry-row">
              <div class="telemetry-block">
                <span class="telemetry-key">Latitude</span>
                <span class="telemetry-val" id="iss-lat">-14.2851°</span>
              </div>
              <div class="telemetry-block">
                <span class="telemetry-key">Longitude</span>
                <span class="telemetry-val" id="iss-lon">-112.5402°</span>
              </div>
              <div class="telemetry-block">
                <span class="telemetry-key">Altitude</span>
                <span class="telemetry-val" id="iss-alt">418.2 km</span>
              </div>
              <div class="telemetry-block">
                <span class="telemetry-key">Velocity</span>
                <span class="telemetry-val" id="iss-vel">27,580 km/h</span>
              </div>
            </div>
          </div>
          <div class="iss-trail-note">
            <strong>Anti-Meridian Handling:</strong> Longitude jumps greater than 180° automatically split the orbital line segment into independent polyline paths, preventing planar projection streak artifacts.
          </div>
        </div>

        <!-- Real Screenshot -->
        <figure class="project-figure">
          <img src="${p.images[0].src}" alt="${p.images[0].alt}" loading="lazy" />
          <figcaption class="project-caption">${p.images[0].caption}</figcaption>
        </figure>
      </div>

      <!-- Actions -->
      <footer class="project-actions">
        <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          View Live Demo ↗
        </a>
        <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          Explore Repository ↗
        </a>
        <button type="button" class="btn btn-link-accent open-case-study" data-project-id="${p.id}">
          Inspect Architecture ↗
        </button>
      </footer>
    </article>
  `;
}

/* --------------------------------------------------------------------------
   Render Current Lab (In-Progress Experiments)
   -------------------------------------------------------------------------- */
function renderCurrentLab() {
  const container = document.getElementById("lab-container");
  if (!container) return;

  container.innerHTML = labExperiments
    .map((exp) => {
      let visualContent = "";

      if (exp.id === "genesis") {
        visualContent = `
          <div class="genesis-param-box">
            <div class="genesis-param-row">
              <span class="genesis-param-label">Spectral Dispersion</span>
              <span class="genesis-param-val" id="val-dispersion">0.78 rad</span>
            </div>
            <input type="range" class="param-slider" id="slider-dispersion" min="0" max="1" step="0.01" value="0.78" aria-label="Spectral dispersion slider" />

            <div class="genesis-param-row" style="margin-top: 0.6rem;">
              <span class="genesis-param-label">Resonant Filter Cutoff</span>
              <span class="genesis-param-val" id="val-cutoff">2.4 kHz</span>
            </div>
            <input type="range" class="param-slider" id="slider-cutoff" min="0.5" max="12" step="0.1" value="2.4" aria-label="Resonant filter cutoff slider" />

            <div class="genesis-param-row" style="margin-top: 0.6rem;">
              <span class="genesis-param-label">Prompt Conditioning Weight</span>
              <span class="genesis-param-val" id="val-weight">0.92</span>
            </div>
            <input type="range" class="param-slider" id="slider-weight" min="0" max="1" step="0.01" value="0.92" aria-label="Prompt conditioning weight slider" />
          </div>
        `;
      } else if (exp.id === "whatsapp-linkedin") {
        visualContent = `
          <div class="workflow-pipeline">
            ${exp.workflowSteps
              .map(
                (ws) => `
              <div class="pipeline-node">
                <div class="node-bullet ${ws.step === "04" ? "highlight" : ""}">${ws.step}</div>
                <div class="node-content">
                  <span class="node-title">${ws.name}</span>
                  <span class="node-desc">${ws.desc}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `;
      } else if (exp.id === "gtm-automation") {
        visualContent = `
          <div class="workflow-pipeline">
            ${exp.pipelineNodes
              .map(
                (node, i) => `
              <div class="pipeline-node">
                <div class="node-bullet">${i + 1}</div>
                <div class="node-content">
                  <span class="node-title">${node.name}</span>
                  <span class="node-desc">${node.role}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `;
      } else if (exp.id === "ai-research-assistant") {
        visualContent = `
          <div class="workflow-pipeline">
            ${exp.pipelineSteps
              .map(
                (step) => `
              <div class="pipeline-node">
                <div class="node-bullet ${step.step === "04" ? "highlight" : ""}">${step.step}</div>
                <div class="node-content">
                  <span class="node-title">${step.title} <small style="color:var(--accent);">(${step.tech})</small></span>
                  <span class="node-desc">${step.detail}</span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `;
      }

      return `
        <article class="lab-card">
          <div class="lab-card-header">
            <span class="eyebrow">${exp.category}</span>
            <span class="status-pill status-${exp.statusType}">
              <span class="status-dot"></span>
              <span>${exp.status}</span>
            </span>
          </div>

          <span class="lab-tagline">${exp.tagline}</span>
          <h3 class="lab-card-title">${exp.title}</h3>
          <p class="lab-card-desc">${exp.summary}</p>

          ${visualContent}

          <p class="lab-disclaimer">
            <strong>Scope:</strong> ${exp.statusDisclaimer}
          </p>

          <footer class="lab-card-footer">
            ${
              exp.repoUrl
                ? `<a href="${exp.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-link-accent">${exp.ctaLabel}</a>`
                : `<span class="eyebrow-muted">${exp.ctaLabel}</span>`
            }
            ${
              exp.conceptUrl
                ? `<a href="${exp.conceptUrl}" target="_blank" rel="noopener noreferrer" class="btn-link">${exp.conceptLabel}</a>`
                : ""
            }
          </footer>
        </article>
      `;
    })
    .join("");
}

/* --------------------------------------------------------------------------
   Render Principles (How I Like to Work)
   -------------------------------------------------------------------------- */
function renderPrinciples() {
  const container = document.getElementById("principles-container");
  if (!container) return;

  container.innerHTML = corePrinciples
    .map(
      (p) => `
      <div class="principle-card">
        <span class="principle-num">${p.number}</span>
        <span class="eyebrow">${p.eyebrow}</span>
        <h3 class="principle-title">${p.title}</h3>
        <p class="principle-body">${p.statement}</p>
      </div>
    `
    )
    .join("");
}

/* --------------------------------------------------------------------------
   Render About & Capabilities
   -------------------------------------------------------------------------- */
function renderAboutCapabilities() {
  // Education & Experience
  const bioContainer = document.getElementById("bio-panels");
  if (bioContainer) {
    bioContainer.innerHTML = `
      <div class="bio-card">
        <h4 class="bio-card-title">Academic Foundation</h4>
        <div class="degree-title">${education.degree}</div>
        <div class="degree-inst">${education.institution} (${education.affiliate})</div>
        <p class="degree-desc">${education.focus}</p>
        <p class="degree-desc" style="margin-top: 0.5rem; color: var(--text-secondary);">${education.significance}</p>
      </div>

      <div class="bio-card">
        <h4 class="bio-card-title">Background & Practice</h4>
        <div class="exp-list">
          ${experience
            .map(
              (e) => `
            <div class="exp-item">
              <div class="exp-header">
                <span class="exp-role">${e.role}</span>
                <span class="exp-period">${e.period}</span>
              </div>
              <span class="exp-org">${e.organization} · ${e.type}</span>
              <ul class="exp-bullets">
                ${e.responsibilities.map((r) => `<li class="exp-bullet">${r}</li>`).join("")}
              </ul>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="bio-card">
        <h4 class="bio-card-title">Working Languages</h4>
        <div class="lang-chips">
          ${languages
            .map(
              (l) => `
            <span class="lang-chip">${l.language} <small style="color:var(--text-tertiary);">(${l.proficiency})</small></span>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  // Capabilities Grid
  const capContainer = document.getElementById("capabilities-grid");
  if (capContainer) {
    capContainer.innerHTML = capabilitiesGroups
      .map(
        (g) => `
        <div class="capability-card">
          <span class="capability-eyebrow">${g.eyebrow}</span>
          <h4 class="capability-title">${g.category}</h4>
          <p class="capability-desc">${g.description}</p>
          <ul class="skills-list">
            ${g.skills.map((s) => `<li class="skill-tag">${s}</li>`).join("")}
          </ul>
        </div>
      `
      )
      .join("");
  }
}

/* --------------------------------------------------------------------------
   Render Contact Info
   -------------------------------------------------------------------------- */
function renderContactInfo() {
  const container = document.getElementById("contact-channels");
  if (!container) return;

  container.innerHTML = `
    <div class="contact-card">
      <span class="contact-label">Electronic Mail</span>
      <a href="mailto:brettleevector@gmail.com" class="contact-value">brettleevector@gmail.com</a>
      <span class="contact-meta">Direct inquiries, project collaboration & evaluations</span>
      <button type="button" class="copy-email-btn" data-email="brettleevector@gmail.com" id="copy-email-trigger">
        <span class="copy-icon">📋</span>
        <span class="copy-text">Copy email address</span>
      </button>
    </div>

    <div class="contact-card">
      <span class="contact-label">Messaging / WhatsApp</span>
      <a href="https://wa.me/917012214856" target="_blank" rel="noopener noreferrer" class="contact-value">+91 7012214856</a>
      <span class="contact-meta">Direct message or voice discussion via WhatsApp</span>
      <a href="https://wa.me/917012214856" target="_blank" rel="noopener noreferrer" class="btn-link-accent" style="margin-top: auto;">Open WhatsApp chat ↗</a>
    </div>

    <div class="contact-card">
      <span class="contact-label">Professional Profile</span>
      <a href="https://www.linkedin.com/in/brettleevector/" target="_blank" rel="noopener noreferrer" class="contact-value">linkedin.com/in/brettleevector</a>
      <span class="contact-meta">Career history, network & academic verification</span>
      <a href="https://www.linkedin.com/in/brettleevector/" target="_blank" rel="noopener noreferrer" class="btn-link-accent" style="margin-top: auto;">View LinkedIn ↗</a>
    </div>

    <div class="contact-card">
      <span class="contact-label">Code Repositories</span>
      <a href="https://github.com/brettleevector-art" target="_blank" rel="noopener noreferrer" class="contact-value">github.com/brettleevector-art</a>
      <span class="contact-meta">Open-source code, experiment commits & notebooks</span>
      <a href="https://github.com/brettleevector-art" target="_blank" rel="noopener noreferrer" class="btn-link-accent" style="margin-top: auto;">View GitHub ↗</a>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   Case Study Drawer Setup
   -------------------------------------------------------------------------- */
function setupCaseStudyDrawer() {
  const backdrop = document.getElementById("case-study-backdrop");
  const closeBtn = document.getElementById("case-study-close");
  const titleElem = document.getElementById("case-study-title");
  const eyebrowElem = document.getElementById("case-study-eyebrow");
  const bodyElem = document.getElementById("case-study-body");
  const repoLink = document.getElementById("case-study-repo-link");

  let lastActiveElement = null;

  function openDrawer(projectId) {
    const project = completedProjects.find((p) => p.id === projectId);
    if (!project) return;

    lastActiveElement = document.activeElement;

    eyebrowElem.textContent = project.eyebrow;
    titleElem.textContent = project.title;
    repoLink.href = project.repoUrl;

    if (projectId === "wildlight") {
      const cs = project.caseStudy;
      bodyElem.innerHTML = `
        <div class="case-section">
          <h4 class="case-section-title">01 <span>/</span> Problem & Acoustic Domain</h4>
          <p class="case-section-p">${cs.problem}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">02 <span>/</span> Dataset & Spectrogram Representation</h4>
          <p class="case-section-p">${cs.dataset}</p>
          <p class="case-section-p">Raw audio signals are converted into single-channel log mel-spectrograms. The spectrogram transforms 1D temporal pressure waves into 2D time-frequency representations suited for convolutional neural networks.</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">03 <span>/</span> Architecture & Augmentation Experiments</h4>
          <p class="case-section-p">${cs.architecture}</p>
          <ul class="case-list">
            <li><strong>Baseline CNN:</strong> Custom convolutional architecture trained from scratch.</li>
            <li><strong>CNN + SpecAugment:</strong> Evaluated frequency and time masking augmentations to test regularization on small sample batches.</li>
            <li><strong>Adapted ResNet18:</strong> Replaced the first layer of torchvision ResNet18 with a single-channel kernel to accept mel-spectrogram tensors.</li>
          </ul>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">04 <span>/</span> Evaluation Protocol & Five-Fold Cross-Validation</h4>
          <p class="case-section-p">${cs.protocol}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">05 <span>/</span> Diagnostic Integrity vs. Unbiased Comparison</h4>
          <p class="case-section-p">${cs.integrity}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">06 <span>/</span> Engineering & Inference Pipeline</h4>
          <p class="case-section-p">${cs.engineering}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">07 <span>/</span> Limitations & What Results Do Not Prove</h4>
          <p class="case-section-p">${cs.limitations}</p>
        </div>
      `;
    } else if (projectId === "iss-tracker") {
      const cs = project.caseStudy;
      bodyElem.innerHTML = `
        <div class="case-section">
          <h4 class="case-section-title">01 <span>/</span> Problem & Geospatial Projection</h4>
          <p class="case-section-p">${cs.problem}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">02 <span>/</span> Client-Side Architecture</h4>
          <p class="case-section-p">${cs.implementation}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">03 <span>/</span> Telemetry & Anti-Meridian Logic</h4>
          <p class="case-section-p">${cs.telemetry}</p>
          <ul class="case-list">
            <li>Tracks velocity (~27,600 km/h) and altitude (~420 km) in real time.</li>
            <li>Detects longitude discontinuities (|Δlon| > 180°) and starts a new Leaflet polyline segment.</li>
            <li>Limits array buffer to 100 historical points to prevent client memory bloat.</li>
          </ul>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">04 <span>/</span> Failure Modes & Constraints</h4>
          <p class="case-section-p">${cs.limitations}</p>
        </div>
      `;
    }

    backdrop.classList.add("active");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeDrawer() {
    backdrop.classList.remove("active");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }

  // Open drawer event delegation
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-case-study");
    if (btn) {
      const projectId = btn.getAttribute("data-project-id");
      openDrawer(projectId);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeDrawer();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   ISS Live Telemetry Poller
   -------------------------------------------------------------------------- */
function setupISSTelemetryTicker() {
  let counter = 5;
  const counterElem = document.getElementById("iss-poll-counter");
  const latElem = document.getElementById("iss-lat");
  const lonElem = document.getElementById("iss-lon");
  const altElem = document.getElementById("iss-alt");
  const velElem = document.getElementById("iss-vel");

  async function fetchTelemetry() {
    try {
      const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      if (res.ok) {
        const data = await res.json();
        if (latElem) latElem.textContent = `${data.latitude.toFixed(4)}°`;
        if (lonElem) lonElem.textContent = `${data.longitude.toFixed(4)}°`;
        if (altElem) altElem.textContent = `${data.altitude.toFixed(1)} km`;
        if (velElem) velElem.textContent = `${Math.round(data.velocity).toLocaleString()} km/h`;
      }
    } catch {
      // Offline fallback with realistic simulated orbital shift
      if (latElem && lonElem) {
        const currentLat = parseFloat(latElem.textContent) || -14.28;
        const currentLon = parseFloat(lonElem.textContent) || -112.54;
        const newLat = (currentLat + 0.12).toFixed(4);
        const newLon = (((currentLon + 0.35 + 180) % 360) - 180).toFixed(4);
        latElem.textContent = `${newLat}°`;
        lonElem.textContent = `${newLon}°`;
      }
    }
  }

  // Initial fetch
  fetchTelemetry();

  setInterval(() => {
    counter -= 1;
    if (counter <= 0) {
      counter = 5;
      fetchTelemetry();
    }
    if (counterElem) {
      counterElem.textContent = `Polling: ${counter}s`;
    }
  }, 1000);
}

/* --------------------------------------------------------------------------
   Interactive Genesis Sound Design Sliders
   -------------------------------------------------------------------------- */
function setupGenesisControls() {
  const dispersionSlider = document.getElementById("slider-dispersion");
  const cutoffSlider = document.getElementById("slider-cutoff");
  const weightSlider = document.getElementById("slider-weight");

  const valDispersion = document.getElementById("val-dispersion");
  const valCutoff = document.getElementById("val-cutoff");
  const valWeight = document.getElementById("val-weight");

  if (dispersionSlider && valDispersion) {
    dispersionSlider.addEventListener("input", (e) => {
      valDispersion.textContent = `${e.target.value} rad`;
    });
  }

  if (cutoffSlider && valCutoff) {
    cutoffSlider.addEventListener("input", (e) => {
      valCutoff.textContent = `${parseFloat(e.target.value).toFixed(1)} kHz`;
    });
  }

  if (weightSlider && valWeight) {
    weightSlider.addEventListener("input", (e) => {
      valWeight.textContent = e.target.value;
    });
  }
}

/* --------------------------------------------------------------------------
   Clipboard Copy Utilities
   -------------------------------------------------------------------------- */
function setupClipboardCopy() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("#copy-email-trigger");
    if (!btn) return;

    const email = btn.getAttribute("data-email");
    const copyText = btn.querySelector(".copy-text");
    const copyIcon = btn.querySelector(".copy-icon");

    try {
      await navigator.clipboard.writeText(email);
      if (copyText) copyText.textContent = "Copied to clipboard ✓";
      if (copyIcon) copyIcon.textContent = "✓";
      btn.style.borderColor = "var(--accent)";
      btn.style.color = "var(--text-main)";

      setTimeout(() => {
        if (copyText) copyText.textContent = "Copy email address";
        if (copyIcon) copyIcon.textContent = "📋";
        btn.style.borderColor = "";
        btn.style.color = "";
      }, 2500);
    } catch {
      // Fallback
      prompt("Copy email address:", email);
    }
  });
}
