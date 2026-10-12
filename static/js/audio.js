/**
 * AstroMind Procedural Sound Synthesizer
 * Built entirely with HTML5 Web Audio API. Zero external audio file dependencies.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientRunning = false;
    this.ambientNodes = [];
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Soft sci-fi UI hover blip
  playHover() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.05);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  // Futuristic click chime
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.08); // C6

      osc2.frequency.setValueAtTime(659.25, now); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.1);
      osc2.stop(now + 0.1);
    } catch (e) {}
  }

  // Spaceship Warp Jump / Interplanetary Transit Sound
  playWarpStart() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low sub rumble
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(55, now);
      sub.frequency.exponentialRampToValueAtTime(220, now + 1.2);
      subGain.gain.setValueAtTime(0.05, now);
      subGain.gain.linearRampToValueAtTime(0.2, now + 0.8);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      // Lowpass filter for smooth sweep
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(3500, now + 1.0);
      filter.Q.value = 4.0;

      sub.connect(filter);
      filter.connect(subGain);
      subGain.connect(this.masterGain);

      sub.start(now);
      sub.stop(now + 1.4);

      // High shimmering harmonics
      const shimmer = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(440, now);
      shimmer.frequency.exponentialRampToValueAtTime(1760, now + 1.2);
      shimmerGain.gain.setValueAtTime(0.01, now);
      shimmerGain.gain.linearRampToValueAtTime(0.08, now + 0.9);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      shimmer.connect(shimmerGain);
      shimmerGain.connect(this.masterGain);

      shimmer.start(now);
      shimmer.stop(now + 1.4);
    } catch (e) {}
  }

  // Warp Arrival Deceleration Sound
  playWarpArrival() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.9);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 0.9);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch (e) {}
  }

  // Quiz Correct Chime (Triumphant chord)
  playCorrect() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.45);
      });
    } catch (e) {}
  }

  // Quiz Incorrect Tone
  playWrong() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.3);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {}
  }

  // Continuous Subtle Ambient Cosmic Hum
  startAmbient() {
    if (this.ambientRunning || this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const ambGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.value = 55; // A1
      osc2.type = 'triangle';
      osc2.frequency.value = 82.4; // E2

      filter.type = 'lowpass';
      filter.frequency.value = 180;

      ambGain.gain.setValueAtTime(0.025, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(ambGain);
      ambGain.connect(this.masterGain);

      osc1.start();
      osc2.start();

      this.ambientNodes = [osc1, osc2, filter, ambGain];
      this.ambientRunning = true;
    } catch (e) {}
  }

  stopAmbient() {
    if (!this.ambientRunning) return;
    this.ambientNodes.forEach(n => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch (e) {}
    });
    this.ambientNodes = [];
    this.ambientRunning = false;
  }
}

// Global instance
const astroAudio = new SoundEngine();
