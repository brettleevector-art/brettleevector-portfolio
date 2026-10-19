/**
 * Waveform & Spectrogram Technical Canvas Visualizer
 * Mathematically renders harmonic frequency curves and Mel-bin energy traces.
 * Styled in a restrained monochrome steel palette with no neon or garish glow.
 */

export function initHeroWaveform(canvasId = "hero-waveform") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  let mouseX = width * 0.5;
  let mouseY = height * 0.5;
  let isHovered = false;
  let animFrameId = null;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Spectrogram / Waveform generation parameters
  let time = 0;
  const numHarmonics = 4;
  const sampleRateLabel = "44.1 kHz";
  const nyquistLabel = "22.05 kHz";
  const numGridLines = 5;

  function resize() {
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resize);
  resize();

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovered = true;
  });

  canvas.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  function drawGrid() {
    ctx.strokeStyle = "rgba(37, 42, 43, 0.7)";
    ctx.lineWidth = 1;

    // Horizontal frequency reference lines
    for (let i = 1; i <= numGridLines; i++) {
      const y = (height / (numGridLines + 1)) * i;
      ctx.beginPath();
      ctx.moveTo(35, y);
      ctx.lineTo(width - 15, y);
      ctx.stroke();

      // Axis labels
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(101, 105, 104, 0.7)";
      ctx.fillText(`${(numGridLines - i + 1) * 4}k`, 8, y + 3);
    }

    // Baseline axis
    ctx.strokeStyle = "rgba(130, 152, 163, 0.25)";
    ctx.beginPath();
    ctx.moveTo(35, height * 0.5);
    ctx.lineTo(width - 15, height * 0.5);
    ctx.stroke();
  }

  function render(timestamp) {
    if (!prefersReducedMotion) {
      time += 0.02;
    }

    ctx.clearRect(0, 0, width, height);
    drawGrid();

    const centerY = height * 0.5;
    const targetAmplitude = isHovered ? Math.max(20, Math.min(65, (mouseY / height) * 80)) : 38;
    const waveLength = isHovered ? Math.max(0.008, (mouseX / width) * 0.025) : 0.015;

    // Render 4 harmonic layers resembling mel-spectrogram filter responses
    for (let h = 0; h < numHarmonics; h++) {
      const freqMultiplier = 1 + h * 0.85;
      const alpha = 0.15 + (h / numHarmonics) * 0.55;
      const lineWidth = h === numHarmonics - 1 ? 1.75 : 1;

      ctx.beginPath();
      if (h === numHarmonics - 1) {
        ctx.strokeStyle = `rgba(232, 232, 226, ${alpha})`; // Primary off-white trace
      } else {
        ctx.strokeStyle = `rgba(130, 152, 163, ${alpha})`; // Subdued steel blue
      }
      ctx.lineWidth = lineWidth;

      for (let x = 35; x <= width - 15; x += 2) {
        const normalizedX = (x - 35) / (width - 50);
        // Envelope damping at edges (Hann-like windowing)
        const windowEnvelope = Math.sin(normalizedX * Math.PI);

        // Multi-frequency wave synthesis
        const yOffset =
          Math.sin(x * waveLength * freqMultiplier + time * (1 + h * 0.3)) *
            targetAmplitude *
            windowEnvelope +
          Math.cos(x * waveLength * 0.5 - time * 0.8) * (targetAmplitude * 0.35) * windowEnvelope;

        const y = centerY + yOffset * (1 - h * 0.18);

        if (x === 35) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    // Plotted coordinate point
    const probeX = isHovered ? mouseX : width * 0.62;
    const normX = Math.max(0, Math.min(1, (probeX - 35) / (width - 50)));
    const probeY =
      centerY +
      Math.sin(probeX * waveLength * (1 + (numHarmonics - 1) * 0.85) + time * 1.9) *
        targetAmplitude *
        Math.sin(normX * Math.PI);

    if (probeX >= 35 && probeX <= width - 15) {
      // Small coordinate crosshair & marker
      ctx.strokeStyle = "rgba(130, 152, 163, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(probeX, 10);
      ctx.lineTo(probeX, height - 10);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#E8E8E2";
      ctx.beginPath();
      ctx.arc(probeX, probeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Coordinate tooltip text
      ctx.font = "9px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(232, 232, 226, 0.85)";
      const freqAtProbe = Math.round(normX * 22050);
      ctx.fillText(`f: ${freqAtProbe} Hz`, Math.min(probeX + 8, width - 85), Math.max(probeY - 8, 20));
    }

    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(render);
    }
  }

  animFrameId = requestAnimationFrame(render);

  return () => {
    window.removeEventListener("resize", resize);
    if (animFrameId) cancelAnimationFrame(animFrameId);
  };
}
