// Web Audio API based Procedural Devotional Ambience & Temple Bell Sound Engine
// Zero external network dependencies, guaranteed to work across all modern browsers on user interaction.

class AudioService {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.droneGain = null;
    this.droneOscillators = [];
    this.isMuted = false;
    this.melodyTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  getAudioStreamDestination() {
    this.init();
    if (this.ctx) {
      if (!this.streamDest) {
        this.streamDest = this.ctx.createMediaStreamDestination();
        this.masterGain.connect(this.streamDest);
      }
      return this.streamDest.stream;
    }
    return null;
  }

  startAmbience() {
    this.init();
    if (!this.ctx || this.isPlaying) return;

    this.isPlaying = true;

    // Create soft warm ambient drone (Sa-Pa Indian Classical Tanpura / Shrutibox feel: C#3 138.6Hz, G#3 207.65Hz, C#4 277.18Hz)
    const baseFreqs = [138.59, 207.65, 277.18, 415.3];
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    // Smooth fade in
    this.droneGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);
    this.droneGain.connect(this.masterGain);

    this.droneOscillators = baseFreqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      const filter = this.ctx.createBiquadFilter();

      // Warm low-pass warmth filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650 + idx * 80, this.ctx.currentTime);

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.8, this.ctx.currentTime);

      // Subtle slow vibrato for tanpura shimmer
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.2 + idx * 0.05;
      lfoGain.gain.value = 0.6;
      lfo.connect(osc.frequency);
      lfo.start();

      if (panner) {
        panner.pan.value = (idx % 2 === 0 ? -0.4 : 0.4);
        osc.connect(filter);
        filter.connect(panner);
        panner.connect(this.droneGain);
      } else {
        osc.connect(filter);
        filter.connect(this.droneGain);
      }

      osc.start();
      return { osc, lfo };
    });

    // Start subtle meditative melodic flute/santoor notes
    this.startMelodicChimes();
  }

  startMelodicChimes() {
    // Gentle Raag Bhupali notes (Sa, Re, Ga, Pa, Dha) in C#
    const ragaNotes = [277.18, 311.13, 349.23, 415.3, 466.16, 554.37, 622.25];
    
    const playNextNote = () => {
      if (!this.isPlaying) return;
      const note = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];
      this.playSoftNote(note, 2.5);
      const delay = 3500 + Math.random() * 4500;
      this.melodyTimer = setTimeout(playNextNote, delay);
    };

    this.melodyTimer = setTimeout(playNextNote, 2000);
  }

  playSoftNote(freq, duration = 2.0) {
    if (!this.ctx || !this.isPlaying || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  // Play realistic brass temple bell chime
  playTempleBell(pitchMultiplier = 1.0) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // Bell harmonic partial frequencies
      const partials = [
        { f: 587.33 * pitchMultiplier, gain: 0.35, decay: 3.5 }, // Fundamental (D5)
        { f: 1174.66 * pitchMultiplier, gain: 0.22, decay: 2.8 }, // Octave
        { f: 1761.99 * pitchMultiplier, gain: 0.15, decay: 2.0 }, // Tierce
        { f: 2349.32 * pitchMultiplier, gain: 0.08, decay: 1.4 }, // Quint
        { f: 3120.0 * pitchMultiplier, gain: 0.04, decay: 0.8 },  // Shimmer
      ];

      partials.forEach(p => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.f, now);

        gain.gain.setValueAtTime(p.gain * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });
    } catch (e) {
      console.warn("Bell sound error:", e);
    }
  }

  // Play a soft devotional conch / shankh sound on Ganpati reveal
  playDevotionalChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    this.playTempleBell(1.0);
    setTimeout(() => this.playTempleBell(1.25), 250);
    setTimeout(() => this.playTempleBell(1.5), 500);
  }

  stopAmbience() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.droneOscillators.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch {
            // ignore
          }
        });
        this.droneOscillators = [];
      }, 1100);
    }
  }

  toggleAudio() {
    if (this.isPlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      this.playTempleBell(1.2);
      return true;
    }
  }
}

export const audioService = new AudioService();
