// Web Audio API Synthesizer for tactile UI sounds inspired by Bencho (bencho.dev/sounds)
// Zero external sound asset downloads, 0 KB bundle latency, 100% offline & instantaneous

let audioCtx = null;
let isMuted = false;
let noiseBuffer = null;

try {
  isMuted = localStorage.getItem("portfolio_sound_muted") === "true";
} catch (e) {
  void e;
  isMuted = false;
}

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch((err) => {
      void err;
    });
  }
  return audioCtx;
};

// Generates reusable pink-noise buffer for tactile mechanical clicks and paper textures
const getNoiseBuffer = (ctx) => {
  if (noiseBuffer && noiseBuffer.sampleRate === ctx.sampleRate) return noiseBuffer;
  const bufferSize = Math.floor(ctx.sampleRate * 0.5); // 0.5 sec
  noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Pink noise filter algorithm
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.09;
    b6 = white * 0.115926;
  }
  return noiseBuffer;
};

export const getSoundMuted = () => isMuted;

export const setSoundMuted = (muted) => {
  isMuted = Boolean(muted);
  try {
    localStorage.setItem("portfolio_sound_muted", String(isMuted));
  } catch (e) {
    void e;
  }
  return isMuted;
};

export const toggleSoundMuted = () => {
  return setSoundMuted(!isMuted);
};

// ============================================================================
// 1. BENCHO "MECH-TAP" / "MECH-TYPE" (Dual-Layer Mechanical Switch)
// Used for: Buttons, links, project filters, tab switches
// Features micro-pitch randomization (±4%) to avoid artificial robotic repetition
// ============================================================================
export const playMechTapSound = (volume = 0.08) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const jitter = 0.96 + Math.random() * 0.08; // Organic pitch jitter

  // Layer A: Micro-noise transient (simulates keycap friction & switch impact)
  try {
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3400 * jitter, now);
    filter.Q.setValueAtTime(2.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.75, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.015);
  } catch (e) {
    void e;
  }

  // Layer B: Resonant switch body pitch (descending snap)
  const osc = ctx.createOscillator();
  const toneGain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(780 * jitter, now);
  osc.frequency.exponentialRampToValueAtTime(280 * jitter, now + 0.032);

  toneGain.gain.setValueAtTime(volume, now);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(toneGain);
  toneGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
};

// Aliased as standard click
export const playClickSound = () => playMechTapSound(0.08);

// ============================================================================
// 2. BENCHO "PAPER-TAP" / "RUSTLE" (Architectural Blueprint & Sticky Note Contact)
// Used for: Handwritten margin annotations, sticky note opening & folding
// ============================================================================
export const playPaperTapSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Layer A: Soft textured paper friction
  try {
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2100, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
    filter.Q.setValueAtTime(1.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.065, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.05);
  } catch (e) {
    void e;
  }

  // Layer B: Subtle parchment low thump
  const osc = ctx.createOscillator();
  const thumpGain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(190, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.035);

  thumpGain.gain.setValueAtTime(0.04, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(thumpGain);
  thumpGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
};

export const playRustleSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  try {
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.06);
    filter.Q.setValueAtTime(1.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.07);
  } catch (e) {
    void e;
  }
};

// ============================================================================
// 3. BENCHO "MECH-TOGGLE" / "LEVER" (Dual-Stage Ratchet Latch)
// Used for: Theme toggle, Dev Mode toggle, switch inputs
// ============================================================================
export const playMechToggleSound = (isActivating = false) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Stage 1: Pre-latch micro detent
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.setValueAtTime(950, now);
  osc1.frequency.exponentialRampToValueAtTime(620, now + 0.012);

  gain1.gain.setValueAtTime(0.05, now);
  gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.015);

  // Stage 2: Main lever latch (delayed by 16ms)
  const t2 = now + 0.016;
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  osc2.type = "triangle";
  const startFreq = isActivating ? 460 : 720;
  const endFreq = isActivating ? 820 : 340;

  osc2.frequency.setValueAtTime(startFreq, t2);
  osc2.frequency.exponentialRampToValueAtTime(endFreq, t2 + 0.045);

  gain2.gain.setValueAtTime(0.065, t2);
  gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.045);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc2.start(t2);
  osc2.stop(t2 + 0.05);
};

export const playToggleSound = (isDark = false) => playMechToggleSound(isDark);

// ============================================================================
// 4. BENCHO "DETENT" / "TOCK" (Draftsman Precision Caliper Notch)
// Used for: Analytics 7-day velocity chart scrubbing, slider ticks, timeline points
// ============================================================================
export const playDetentTick = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1600, now);
  osc.frequency.exponentialRampToValueAtTime(850, now + 0.014);

  gain.gain.setValueAtTime(0.035, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.018);
};

export const playMeasureTick = () => playDetentTick();

// ============================================================================
// 5. BENCHO "BUBBLE-TAP" / "POP" (Expanding Cards & Opening Modals)
// ============================================================================
export const playBubblePopSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(390, now);
  osc.frequency.exponentialRampToValueAtTime(860, now + 0.055);

  gain.gain.setValueAtTime(0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
};

export const playPopSound = () => playBubblePopSound();

// ============================================================================
// 6. BENCHO "CLOSE" / "EXHALE" (Dismissing Dialogs & Modals)
// ============================================================================
export const playCloseSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(680, now);
  osc.frequency.exponentialRampToValueAtTime(240, now + 0.045);

  gain.gain.setValueAtTime(0.055, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};

// ============================================================================
// 7. BENCHO "MECH-SUCCESS" / "CHORD" (Blueprint Ascending Chime)
// Used for: Click-to-copy code confirmation, contact form success
// Plays rich triad (C6, E6, G6) with bell decay
// ============================================================================
export const playMechSuccessChime = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const chords = [
    { freq: 1046.5, delay: 0.0 },   // C6
    { freq: 1318.51, delay: 0.045 }, // E6
    { freq: 1567.98, delay: 0.09 },  // G6
  ];

  chords.forEach(({ freq, delay }) => {
    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.045, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.18);
  });
};

export const playCopySuccessChime = () => playMechSuccessChime();

// ============================================================================
// 8. BENCHO "WHISK" / "WISP" (Soft Aerodynamic Air Sweep)
// Used for: Subtle hover feedback or card transitions
// ============================================================================
export const playWhiskSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  try {
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(2600, now);
    filter.frequency.exponentialRampToValueAtTime(5400, now + 0.06);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.07);
  } catch (e) {
    void e;
  }
};

// ============================================================================
// 9. DEV MODE LOCK-ON & SWEEP
// ============================================================================
export const playInspectSnap = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(480, now);
  osc.frequency.exponentialRampToValueAtTime(1120, now + 0.07);

  gain.gain.setValueAtTime(0.075, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
};

export const playDevModeToggleSound = (active = true) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  const startFreq = active ? 340 : 860;
  const endFreq = active ? 860 : 340;

  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.09);

  gain.gain.setValueAtTime(0.07, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
};

// ============================================================================
// 10. DITHERED 404: FIREBALL EMBER CRACKLE & REFORM CHIME
// ============================================================================
let lastCrackleTime = 0;
export const playEmberCrackleSound = () => {
  if (isMuted) return;
  const nowMs = performance.now();
  if (nowMs - lastCrackleTime < 45) return; // allows smooth continuous sizzle
  lastCrackleTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  try {
    // 1. Resonant flame whoosh (low-mid body)
    const roarNoise = ctx.createBufferSource();
    roarNoise.buffer = getNoiseBuffer(ctx);

    const roarFilter = ctx.createBiquadFilter();
    roarFilter.type = "bandpass";
    const centerFreq = 380 + Math.random() * 260;
    roarFilter.frequency.setValueAtTime(centerFreq, now);
    roarFilter.Q.setValueAtTime(1.8, now);

    const roarGain = ctx.createGain();
    roarGain.gain.setValueAtTime(0.08, now);
    roarGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    roarNoise.connect(roarFilter);
    roarFilter.connect(roarGain);
    roarGain.connect(ctx.destination);

    roarNoise.start(now);
    roarNoise.stop(now + 0.085);

    // 2. High sizzle / ember hiss (highpass noise burst)
    const sizzleNoise = ctx.createBufferSource();
    sizzleNoise.buffer = getNoiseBuffer(ctx);

    const sizzleFilter = ctx.createBiquadFilter();
    sizzleFilter.type = "highpass";
    sizzleFilter.frequency.setValueAtTime(2200 + Math.random() * 1200, now);

    const sizzleGain = ctx.createGain();
    sizzleGain.gain.setValueAtTime(0.065, now);
    sizzleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    sizzleNoise.connect(sizzleFilter);
    sizzleFilter.connect(sizzleGain);
    sizzleGain.connect(ctx.destination);

    sizzleNoise.start(now);
    sizzleNoise.stop(now + 0.065);

    // 3. Popping ember spark (micro acoustic pop)
    if (Math.random() < 0.4) {
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();

      popOsc.type = "sine";
      const startFreq = 880 + Math.random() * 600;
      popOsc.frequency.setValueAtTime(startFreq, now);
      popOsc.frequency.exponentialRampToValueAtTime(140, now + 0.025);

      popGain.gain.setValueAtTime(0.05, now);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      popOsc.connect(popGain);
      popGain.connect(ctx.destination);

      popOsc.start(now);
      popOsc.stop(now + 0.03);
    }
  } catch (e) {
    void e;
  }
};

export const playReformSnapSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Mechanical reform reverse sweep
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(240, now);
  osc.frequency.exponentialRampToValueAtTime(820, now + 0.12);

  gain.gain.setValueAtTime(0.075, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);

  // Soft crystalline confirmation chime
  [587.33, 880.0, 1174.66].forEach((freq, idx) => {
    const start = now + 0.07 + idx * 0.035;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq, start);

    gain2.gain.setValueAtTime(0.04, start);
    gain2.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(start);
    osc2.stop(start + 0.19);
  });
};

