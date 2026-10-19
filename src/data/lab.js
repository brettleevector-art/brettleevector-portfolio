export const labExperiments = [
  {
    id: "genesis",
    number: "03",
    title: "Genesis: Prompt-Based Sound Design",
    category: "Creative AI / Sound Design / Audio Technology",
    status: "IN DEVELOPMENT",
    statusType: "development",
    tagline: "PROMPT → SOUND DESIGN",
    summary: "An exploration of prompt-based sound design: a creative tool direction for translating human descriptions into structured sound-design workflows. The goal is to explore how language, sound, and controllable creative systems can work together.",
    explorationPillars: [
      "Natural-language intent and sonic outcomes",
      "Audio-tool interaction and creative workflow design",
      "Sound design taste, spectral editing, and generative synthesis",
      "Practical creative interface rather than a generic AI wrapper"
    ],
    statusDisclaimer: "Active exploration — not presented as a finished product or trained audio model.",
    repoUrl: "https://github.com/brettleevector-art/Genesis-model-landing-page",
    conceptUrl: "https://brettleevector-art.github.io/Genesis-model-landing-page/",
    ctaLabel: "Concept repository ↗",
    conceptLabel: "Concept preview ↗",
    parameters: [
      { name: "Spectral Dispersion", value: "0.78", unit: "rad" },
      { name: "Resonant Filter Cutoff", value: "2.4", unit: "kHz" },
      { name: "Prompt Conditioning", value: "0.92", unit: "wt" },
      { name: "Harmonic Texture", value: "Dense", unit: "mode" }
    ]
  },
  {
    id: "whatsapp-linkedin",
    number: "04",
    title: "WhatsApp → LinkedIn Content Workflow",
    category: "n8n / Workflow Automation / Content Systems",
    status: "IN DEVELOPMENT",
    statusType: "development",
    tagline: "VOICE/TEXT INTAKE → STRUCTURED DRAFT → HUMAN REVIEW",
    summary: "A workflow concept designed to reduce the friction between an informal voice or text idea in WhatsApp and a structured, publish-ready LinkedIn draft. Investigates message intake, formatting rules, and human-in-the-loop review.",
    explorationPillars: [
      "Unstructured mobile idea capture via WhatsApp messaging",
      "n8n webhook listener and context formatting",
      "Template-guided draft synthesis with tone boundaries",
      "Mandatory human approval gate before publication"
    ],
    statusDisclaimer: "In active development. All publishing requires explicit human review and approval; autonomous posting is intentionally avoided.",
    workflowSteps: [
      { step: "01", name: "WhatsApp Input", desc: "Voice note or text concept captured on mobile" },
      { step: "02", name: "n8n Ingestion", desc: "Webhook triggers parsing, transcription & clean context extraction" },
      { step: "03", name: "Structured Draft", desc: "Formats hook, argument structure, and professional tone" },
      { step: "04", name: "Human Review", desc: "Editorial gate: approve, revise, or discard before publishing" }
    ],
    ctaLabel: "Workflow in development"
  },
  {
    id: "gtm-automation",
    number: "05",
    title: "GTM Automation Systems",
    category: "GTM Systems / n8n / Process Automation",
    status: "IN DEVELOPMENT",
    statusType: "development",
    tagline: "RECEPTIVE INTAKE → DATA ENRICHMENT → AUDITABLE HANDOFFS",
    summary: "Experiments in designing repeatable go-to-market operational workflows: connecting inbound signals, automated data hygiene, enrichment routines, and routing rules so that pipeline operations remain consistent and auditable.",
    explorationPillars: [
      "Workflow orchestration and error-recovery patterns",
      "Structured data handoffs without manual copy-paste",
      "Multi-source enrichment and account verification",
      "Operational visibility and audit trails for team handoffs"
    ],
    statusDisclaimer: "Architectural research and testing. Focuses on systems resilience, schema mapping, and process logic.",
    pipelineNodes: [
      { name: "Signal Intake", role: "Form, webhook or event payload capture" },
      { name: "Hygiene & Validation", role: "Schema check, email sanitization, de-duplication" },
      { name: "Enrichment", role: "Query company profile, tech stack & domain metadata" },
      { name: "Routing & Notification", role: "Priority scoring and alert dispatch to relevant channel" }
    ],
    ctaLabel: "Automation experiments"
  },
  {
    id: "ai-research-assistant",
    number: "06",
    title: "AI Research Assistant",
    category: "n8n / AI Research / Information Systems",
    status: "WORKFLOW PROTOTYPE",
    statusType: "prototype",
    tagline: "RSS → SOURCE EXTRACTION → EVIDENCE SEARCH → GROUNDED BRIEF",
    summary: "An n8n research workflow that monitors article feeds, retrieves primary source text, searches for corroborating evidence, and packages the verified material into a structured intelligence brief with explicit citations.",
    explorationPillars: [
      "TechCrunch AI RSS feed monitoring and article deduplication",
      "Direct content extraction via Jina Reader to preserve clean markdown",
      "Corroborating search queries executed through Jina Search",
      "Evidence clustering with source grounding and citation links",
      "Structured report compilation highlighting verified points vs unconfirmed claims"
    ],
    statusDisclaimer: "Workflow prototype. Prioritizes source grounding and evidence retrieval; does not claim autonomous verification of objective truth without source review.",
    pipelineSteps: [
      { step: "01", title: "Feed Monitor", tech: "RSS Intake", detail: "Scans TechCrunch AI RSS feed on schedule" },
      { step: "02", title: "Content Parser", tech: "Jina Reader", detail: "Extracts full article text without page bloat" },
      { step: "03", title: "Evidence Search", tech: "Jina Search", detail: "Queries corroborating papers, announcements & sources" },
      { step: "04", title: "Grounding Review", tech: "Evidence Pairing", detail: "Matches extracted claims with verified source URLs" },
      { step: "05", title: "Structured Brief", tech: "Report Output", detail: "Outputs formatted research memo with citations" }
    ],
    ctaLabel: "Workflow prototype"
  }
];
