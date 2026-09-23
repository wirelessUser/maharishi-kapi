import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ZodiacSignMeta {
  glyph: string;
  name: string;
  sanskrit: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-hero-section',
  styleUrl: './hero-section.css',
  templateUrl: './hero-section.html',
})
export class HeroSection {
  readonly zodiacSigns: ZodiacSignMeta[] = [
    { glyph: '♈︎', name: 'Aries', sanskrit: 'मेष' },
    { glyph: '♉︎', name: 'Taurus', sanskrit: 'वृषभ' },
    { glyph: '♊︎', name: 'Gemini', sanskrit: 'मिथुन' },
    { glyph: '♋︎', name: 'Cancer', sanskrit: 'कर्क' },
    { glyph: '♌︎', name: 'Leo', sanskrit: 'सिंह' },
    { glyph: '♍︎', name: 'Virgo', sanskrit: 'कन्या' },
    { glyph: '♎︎', name: 'Libra', sanskrit: 'तुला' },
    { glyph: '♏︎', name: 'Scorpio', sanskrit: 'वृश्चिक' },
    { glyph: '♐︎', name: 'Sagittarius', sanskrit: 'धनु' },
    { glyph: '♑︎', name: 'Capricorn', sanskrit: 'मकर' },
    { glyph: '♒︎', name: 'Aquarius', sanskrit: 'कुम्भ' },
    { glyph: '♓︎', name: 'Pisces', sanskrit: 'मीन' },
  ];

  readonly isCalibrating = signal<boolean>(false);
  readonly showShockwave = signal<boolean>(false);
  readonly wheelRotation = signal<number>(0);
  readonly selectedSign = signal<ZodiacSignMeta | null>(null);

  private audioCtx?: AudioContext;

  calibrateAstrolabe(): void {
    if (this.isCalibrating()) return;

    // 🔔 1. Play Sacred Brass Temple Bell & Singing Bowl
    this.playSacredBellChime();

    this.isCalibrating.set(true);
    this.showShockwave.set(true);

    // Select an auspicious alignment sign
    const targetIndex = Math.floor(Math.random() * this.zodiacSigns.length);
    const chosenSign = this.zodiacSigns[targetIndex];

    // Compute rotation: 2 complete spins (720deg) + angular offset
    const extraSpins = 720 + (targetIndex * 30);
    this.wheelRotation.update((prev) => prev + extraSpins);

    // Fade out shockwave ripple
    setTimeout(() => {
      this.showShockwave.set(false);
    }, 750);

    // Conclude calibration sequence and display aligned Rashi
    setTimeout(() => {
      this.selectedSign.set(chosenSign);
      this.isCalibrating.set(false);
      // ✨ Play soft harmonic alignment chime
      this.playAlignmentDing();
    }, 2200);
  }

  // 🔔 Synthesizes a deep Tibetan singing bowl & temple bell (528 Hz Solfeggio resonance)
  private playSacredBellChime(): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;

      // 1. Gentle celestial air rush (Astrolabe takeoff whoosh)
      const sweepOsc = this.audioCtx.createOscillator();
      const sweepGain = this.audioCtx.createGain();
      sweepOsc.type = 'sine';
      sweepOsc.frequency.setValueAtTime(180, now);
      sweepOsc.frequency.exponentialRampToValueAtTime(680, now + 0.35);

      sweepGain.gain.setValueAtTime(0.08, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      sweepOsc.connect(sweepGain);
      sweepGain.connect(this.audioCtx.destination);
      sweepOsc.start(now);
      sweepOsc.stop(now + 0.4);

      // 2. Brass Bell & Singing Bowl Resonance (528 Hz Harmonic series)
      const frequencies = [528, 1056, 1584, 2112];
      const gains = [0.25, 0.12, 0.05, 0.02];

      frequencies.forEach((freq, i) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.04);

        gain.gain.setValueAtTime(gains[i], now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + 0.04);
        osc.stop(now + 2.9);
      });
    } catch {
      // Gracefully handles browser audio policy
    }
  }

  // ✨ Soft brass chime ding when the dial aligns
  private playAlignmentDing(): void {
    try {
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1056, now); // C6 resonance

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Gracefully handles browser audio policy
    }
  }
}