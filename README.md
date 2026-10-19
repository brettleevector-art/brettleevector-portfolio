# Brettlee Sojan — Portfolio Website

> Dark, premium, minimal personal portfolio website communicating work across **AI, Data, Machine Learning, Audio Systems, and Workflow Automation**.

Built from [`PORTFOLIO_BUILD_SPEC.md`](./PORTFOLIO_BUILD_SPEC.md) as the source of truth, emphasizing:
- **Scientific rigor** in machine learning experiments (`WILDLIGHT`)
- **Systems thinking** in workflow automation (`WhatsApp → LinkedIn`, `GTM Automation`, `AI Research Assistant`)
- **Creative taste** in sound design and audio technology (`Genesis`, multitrack audio engineering)

---

## Architecture & Technology Stack

- **Core:** Semantic HTML5, Vanilla CSS with custom properties (CSS variables), modern ES Modules JavaScript.
- **Tooling:** Vite for ultra-fast local development (HMR) and optimized, zero-dependency production builds.
- **Design System:**
  - Graphite / near-black palette (`#0B0C0D`, `#121516`, `#161A1B`)
  - Warm off-white reading text (`#E8E8E2`) and muted grey metadata (`#9A9E9C`)
  - Hairline borders (`#252A2B`) and subtle SVG background grain
  - Single restrained accent: desaturated mineral steel blue-grey (`#8298A3`)
  - Typography: Inter (display and body copy) paired with JetBrains Mono (labels, tables, indices)
  - Mathematical Mel-spectrogram waveform canvas in the Hero section
  - WCAG AA compliant contrast ratios and `@media (prefers-reduced-motion: reduce)` support
- **No Heavy Framework Overhead:** Zero client-side hydration delays, fast page loads, pure native DOM.

---

## Project Structure

```text
Portfolio_Work1/
├── index.html                   # Semantic HTML5 entry page with meta/OG tags
├── package.json                 # Scripts: dev, build, preview
├── vercel.json                  # Zero-config Vercel build output definition
├── PORTFOLIO_BUILD_SPEC.md      # Master specification and source of truth
├── public/
│   ├── favicon.svg              # Bespoke monogram mark
│   └── images/
│       ├── wildlight-five-fold-cv.png       # Verified ESC-50 5-fold cross-validation figure
│       ├── wildlight-fold5-comparison.png   # Verified Fold-5 architecture comparison figure
│       └── iss-tracker-preview.png          # Verified ISS Tracker interface screenshot
└── src/
    ├── data/
    │   ├── projects.js          # Verified data for WILDLIGHT and ISS Tracker
    │   ├── lab.js               # Genesis, WhatsApp->LinkedIn, GTM, AI Research Assistant
    │   ├── experience.js        # B.Sc. Mathematics, tutoring, music production
    │   └── capabilities.js      # Grouped capabilities & 3 core working principles
    ├── scripts/
    │   ├── main.js              # Interactivity: drawer, ISS ticker, Genesis sliders, copy email
    │   └── waveform.js          # Mathematical harmonic audio waveform visualizer
    └── styles/
        ├── main.css             # Tokens, typography, reset, buttons, status pills
        ├── components.css       # Header, hero, cards, tables, pipelines, footer
        └── modal.css            # Accessible slide-out technical case-study drawer
```

---

## Local Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Local Preview
```bash
npm run build
npm run preview
```
The optimized production build will be generated in `dist/` and served locally.

---

## Deploying to Vercel

This repository is pre-configured for **Vercel** with zero extra setup:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio website implementation"
   git remote add origin https://github.com/brettleevector-art/brettleevector-portfolio.git
   git push -u origin main
   ```
2. **Import into Vercel:**
   - Log in to [vercel.com](https://vercel.com).
   - Click **Add New** → **Project**.
   - Select the GitHub repository.
   - Vercel will automatically detect `vite` via `vercel.json` (`buildCommand: "npm run build"`, `outputDirectory: "dist"`).
   - Click **Deploy**.

---

## Verified Project Details

- **WILDLIGHT — Environmental Audio Intelligence:**
  - Evaluated on ESC-50 (2,000 5-second audio clips across 50 categories).
  - Mean accuracy across 5 official folds: **75.75%** (σ = 3.48 pp).
  - Fold-5 architecture comparison: Baseline CNN (46.50%), CNN+SpecAugment (37.50%), ResNet18 (68.25%).
  - Diagnostic note: 76.75% validation-selected checkpoint is explicitly labeled as diagnostic, not unbiased.
  - Repository: [github.com/brettleevector-art/wildlight-audio-ml](https://github.com/brettleevector-art/wildlight-audio-ml)
- **International Space Station Tracker:**
  - Real-time Leaflet map polling every 5s, anti-meridian (±180°) trail splitting, live telemetry panel.
  - Live Demo: [brettleevector-art.github.io/ISS-Tracker/](https://brettleevector-art.github.io/ISS-Tracker/)
  - Repository: [github.com/brettleevector-art/ISS-Tracker](https://github.com/brettleevector-art/ISS-Tracker)
- **In-Progress Explorations:**
  - Genesis (Creative AI / Sound Design): [Concept repository](https://github.com/brettleevector-art/Genesis-model-landing-page)
  - WhatsApp → LinkedIn Content Workflow (n8n automation with mandatory human review)
  - GTM Automation Systems (Repeatable data handoffs and orchestration)
  - AI Research Assistant (n8n research pipeline with Jina Reader & Jina Search)
