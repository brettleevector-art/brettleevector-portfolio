export const completedProjects = [
  {
    id: "wildlight",
    number: "01",
    title: "WILDLIGHT — Environmental Audio Intelligence",
    eyebrow: "MACHINE LEARNING / AUDIO INTELLIGENCE",
    status: "Implemented research project",
    statusType: "completed",
    summary: "An experimental environmental sound-classification project built around ESC-50. It investigates how CNN architectures and augmentation strategies behave on short audio clips, using mel-spectrogram representations and a reproducible evaluation workflow.",
    repoUrl: "https://github.com/brettleevector-art/wildlight-audio-ml",
    demoUrl: null, // No public live demo URL confirmed; local Gradio interface
    dataset: "ESC-50 (2,000 five-second audio clips across 50 categories)",
    representation: "Log mel-spectrogram (shared audio preprocessing for training and inference)",
    highlights: [
      { label: "75.75%", detail: "Mean accuracy across 5 official folds" },
      { label: "3.48 pp", detail: "Population standard deviation" },
      { label: "50 classes", detail: "ESC-50 environmental categories" },
      { label: "5 folds", detail: "Standardized cross-validation protocol" }
    ],
    fiveFoldTable: [
      { fold: "Fold 1", accuracy: "71.50%" },
      { fold: "Fold 2", accuracy: "78.75%" },
      { fold: "Fold 3", accuracy: "73.00%" },
      { fold: "Fold 4", accuracy: "80.75%" },
      { fold: "Fold 5", accuracy: "74.75%" }
    ],
    fold5Comparison: [
      { model: "Baseline CNN", accuracy: "46.50%", note: "Trained from scratch on mel-spectrograms" },
      { model: "CNN + SpecAugment", accuracy: "37.50%", note: "Time/frequency masking on baseline" },
      { model: "ResNet18 (final checkpoint)", accuracy: "68.25%", note: "Pretrained adaptation to single channel" }
    ],
    evaluationIntegrityNote: "A separate ResNet18 checkpoint selected using the validation fold reached 76.75% on that same fold. This is diagnostic, not an unbiased comparison; it is not presented as the headline result or merged into the 5-fold cross-validation mean.",
    images: [
      {
        src: "/images/wildlight-five-fold-cv.png",
        alt: "ResNet18 five-fold cross-validation accuracy chart across official ESC-50 folds",
        caption: "Figure 1: ResNet18 five-fold cross-validation across official ESC-50 folds (mean 75.75%, σ = 3.48 pp)."
      },
      {
        src: "/images/wildlight-fold5-comparison.png",
        alt: "Fold-5 model comparison bar chart comparing Baseline CNN, CNN with SpecAugment, and ResNet18",
        caption: "Figure 2: Fold-5 architecture comparison. Baseline CNN (46.50%) vs CNN+SpecAugment (37.50%) vs ResNet18 final (68.25%)."
      }
    ],
    caseStudy: {
      problem: "Environmental sound classification involves complex, unstructured non-speech acoustic scenes (natural soundscapes, domestic noises, urban ambiences). Unlike speech or music, environmental audio lacks recurring phonetic grammar or harmonic tempo, requiring models to learn robust spectro-temporal patterns from small sample sets.",
      dataset: "Evaluated on ESC-50, a standardized benchmark consisting of 2,000 5-second environmental recordings partitioned into 50 balanced classes across 5 major categories (animals, natural soundscapes, human non-speech, interior/domestic sounds, exterior/urban sounds).",
      architecture: "Audio recordings are converted to single-channel log mel-spectrograms using shared, centralized preprocessing. Three distinct approaches were explored: (1) a baseline convolutional network trained from scratch, (2) the baseline CNN augmented with SpecAugment (frequency and time masking), and (3) a pretrained ResNet18 adapted for single-channel mel-spectrogram input.",
      protocol: "Evaluated strictly using the official 5-fold cross-validation split of ESC-50. Each fold serves as a completely held-out test set while training on the remaining four folds. Mean accuracy across all 5 folds was 75.75% with a population standard deviation of 3.48 percentage points.",
      integrity: "A validation-selected checkpoint reached 76.75% on Fold 5; however, because that checkpoint was selected using the validation fold itself, it is recorded strictly as diagnostic rather than an unbiased comparison. The reported primary fold-5 checkpoint achieved 68.25%, and the 5-fold mean remains 75.75%.",
      engineering: "Centralized preprocessing ensures consistent spectrogram transforms between training and inference. The project includes an inference prediction script and a local Gradio interface for uploading test recordings.",
      limitations: "ESC-50 is a curated, segmented dataset; real-world continuous environmental monitoring encounters variable clip lengths, polyphonic sound overlapping, and signal-to-noise ratio fluctuations not modeled here."
    }
  },
  {
    id: "iss-tracker",
    number: "02",
    title: "International Space Station Tracker",
    eyebrow: "SPACE / DATA SYSTEMS / APPLICATION",
    status: "Completed application project",
    statusType: "completed",
    summary: "A live world map showing the real-time position of the International Space Station, updated every 5 seconds, with its recent orbital trail and telemetry metrics. It reflects an interest in turning live-world data into a useful, interpretable interface.",
    repoUrl: "https://github.com/brettleevector-art/ISS-Tracker",
    demoUrl: "https://brettleevector-art.github.io/ISS-Tracker/",
    dataset: "Live telemetry from 'Where the ISS at?' REST API & Open Notify crew data",
    representation: "Interactive Leaflet.js map with split polylines & real-time telemetry panel",
    highlights: [
      { label: "5 sec", detail: "Live polling interval" },
      { label: "100 pts", detail: "Active orbital trail buffer" },
      { label: "~27,600 km/h", detail: "Orbital velocity tracking" },
      { label: "0 backend", detail: "Client-side architecture" }
    ],
    images: [
      {
        src: "/images/iss-tracker-preview.png",
        alt: "Screenshot of the ISS Live Tracker interface showing orbital trail across the world map",
        caption: "Figure 3: Live map plotting real-time position, orbital path, and telemetry stats."
      }
    ],
    features: [
      "Real-time coordinate plotting: Leaflet marker updated every 5 seconds via REST telemetry.",
      "Anti-meridian handling: Orbital path is split whenever longitude jumps by >180° to avoid streak artifacts across the map projection.",
      "Live telemetry telemetry panel: Altitude, orbital speed, coordinates, and timestamp.",
      "Resilient error recovery: Graceful retry handling prevents UI failure on API timeouts."
    ],
    caseStudy: {
      problem: "Visualizing fast-moving orbital objects on a 2D planar map projection introduces geometric edge cases—specifically anti-meridian crossings—and requires frequent client-side updates without degrading browser performance.",
      implementation: "Built with plain HTML, CSS, and Vanilla JavaScript using Leaflet. The browser polls the 'Where the ISS at?' API every 5 seconds. The marker is instantiated once and repositioned with `setLatLng()`. The orbital trail maintains an array of the last 100 coordinates (~8 minutes of flight), dynamically split into separate polyline segments when passing ±180° longitude.",
      telemetry: "Calculates instantaneous speed, altitude above Earth's surface, and coordinates. Handles network timeouts and rate-limiting gracefully with user-visible retry indicators.",
      limitations: "Relies on third-party public API availability. Crew listing queries an external secondary endpoint that may experience occasional downtime."
    }
  }
];
