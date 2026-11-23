// Web Audio API Synthesizer for tactile UI sounds
let audioCtx = null;
let isMuted = false;

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

// 1. Tactile Mechanical Keyclick / Tap (Buttons, links, navigation)
export const playClickSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(820, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.035);

  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
};

// 2. High-Tech Pop (Opening modal, expanding cards)
export const playPopSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(420, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.065);

  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.07);
};

// 3. Dismiss / Close (Closing modals, dialogs)
export const playCloseSound = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(620, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.045);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
};

// 4. Toggle Switch (Theme switch, filters)
export const playToggleSound = (isDark = false) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  const startFreq = isDark ? 420 : 720;
  const endFreq = isDark ? 760 : 360;

  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
};

// 5. Caliper Measurement Tick (Hovering elements in Dev Mode)
export const playMeasureTick = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.015);

  gain.gain.setValueAtTime(0.025, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.02);
};

// 6. Inspect Lock-on Snap (Clicking element to inspect in Dev Mode)
export const playInspectSnap = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.09);
};

// 7. Success Chime (Copying Tailwind / JSX code)
export const playCopySuccessChime = () => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  [523.25, 659.25, 783.99].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = ctx.currentTime + idx * 0.04;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.04, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.13);
  });
};

// 8. Dev Mode Activation / Deactivation Sweep
export const playDevModeToggleSound = (active = true) => {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  const startFreq = active ? 360 : 840;
  const endFreq = active ? 840 : 360;

  osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.09);

  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
};
