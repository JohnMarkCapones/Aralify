/**
 * Lightweight sound effects using Web Audio API.
 * No external audio files — all sounds are synthesized.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private _muted = false;

  get muted() {
    return this._muted;
  }

  set muted(value: boolean) {
    this._muted = value;
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume = 0.25
  ) {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  /** Ascending two-note chime for correct answers */
  correct() {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Note 1: C5
    this.playTone(523, 0.15, "sine", 0.2);
    // Note 2: E5 (after 100ms)
    setTimeout(() => this.playTone(659, 0.2, "sine", 0.25), 100);
  }

  /** Descending two-note for wrong answers */
  wrong() {
    if (this._muted) return;
    this.playTone(330, 0.15, "triangle", 0.2);
    setTimeout(() => this.playTone(262, 0.25, "triangle", 0.2), 120);
  }

  /** Triple ascending chime for combo streaks (3+) */
  combo() {
    if (this._muted) return;
    this.playTone(523, 0.1, "sine", 0.15);
    setTimeout(() => this.playTone(659, 0.1, "sine", 0.2), 80);
    setTimeout(() => this.playTone(784, 0.2, "sine", 0.25), 160);
  }

  /** Low thud for losing a heart */
  heartLoss() {
    if (this._muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  }

  /** Game-over sad descending tone */
  gameOver() {
    if (this._muted) return;
    this.playTone(392, 0.2, "triangle", 0.2);
    setTimeout(() => this.playTone(330, 0.2, "triangle", 0.2), 200);
    setTimeout(() => this.playTone(262, 0.4, "triangle", 0.2), 400);
  }
}

export const sounds = new SoundManager();
