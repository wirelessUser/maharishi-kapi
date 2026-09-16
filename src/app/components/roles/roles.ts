import { Component, ElementRef, HostListener, afterNextRender, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Role {
  key: string;
  devanagariNum: string;
  icon: string;
  title: string;
  specialization: string;
  desc: string;
  image: string;
  pressLogos?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-roles',
  styleUrl: './roles.css',
  templateUrl: './roles.html',
})
export class Roles {
  readonly roles: Role[] = [
    {
      key: 'astrologer',
      devanagariNum: '०१',
     icon: 'fa-dharmachakra', // Sacred Vedic Wheel / Kaalchakra (8-spoke celestial cycle)
      title: 'Vedic Astrologer',
      specialization: 'Predictive & Nadi Jyotish',
      desc: 'Rooted in an unbroken 9-generation Saraswat lineage, decoding intricate karmic blueprints and Dasha timings for 10,000+ global seekers.',
      image: 'https://drive.google.com/drive/u/1/folders/1CGiq3rPyYy_wTq0dZ_YHCGHPOMoNQTXs',
    },
    {
      key: 'vastu',
      devanagariNum: '०२',
      icon: 'fa-compass',
      title: 'Sthapatya Vastu Master',
      specialization: 'Commercial & Residential Vastu',
      desc: 'Harmonizes dwellings, factories, and tech headquarters with classical Shastric remedies — pure bio-energetic alignment without demolition.',
      image: '/images/founder-alok-nature.jpg',
    },
    {
      key: 'numerology',
      devanagariNum: '०३',
      icon: 'fa-hand',
      title: 'Numerology & Palmistry',
      specialization: 'Ank Vidya & Samudrika Shastra',
      desc: 'Decodes fate through birth frequencies and hand line topography, offering precise, grounded guidance rooted in the ancient Samudra tradition.',
      image: '/images/founder-alok-group.jpg',
    },
    {
      key: 'healer',
      devanagariNum: '०४',
      icon: 'fa-hand-holding-heart',
      title: 'Panchakosha Energy Healer',
      specialization: 'Subtle Body Prana & Marma Yoga',
      desc: 'Trained in classical Marma therapy and Panchakosha Energy Yoga, unlocking the 107 vital energy doorways to heal the subtle sheath alongside the mind.',
      image: '/images/founder-alok.jpg',
    },
    {
      key: 'gita',
      devanagariNum: '०५',
      icon: 'fa-om',
      title: 'Bhagavad Gita Preceptor',
      specialization: 'Chitta Shuddhi & Gita Psychology',
      desc: 'Translates the 700 verses of the Gita into practical tools for emotional equilibrium, executive leadership, and conscious non-attached action.',
      image: '/images/founder-alok-nature.jpg',
    },
    {
      key: 'ayurjyotish',
      devanagariNum: '०६',
      icon: 'fa-leaf',
      title: 'AyurJyotish Health Guide',
      specialization: 'Medical Astrology & Dosha Blueprint',
      desc: 'Synthesizes planetary afflictions with Charaka biological doshas to identify latent bodily vulnerabilities and prescribe natural herbal Dinacharya.',
      image: '/images/founder-alok-group.jpg',
    },
    {
      key: 'matchmaking',
      devanagariNum: '०७',
      icon: 'fa-heart',
      title: 'Dharma & Marriage Counselor',
      specialization: 'Ashtakoota & Guna Milan Synthesis',
      desc: 'Evaluates marital harmony beyond superficial scorecards, analyzing Navamsha (D9) longevity, emotional temperament, and auspicious Muhurta timing.',
      image: '/images/founder-alok.jpg',
    },
    {
      key: 'finance',
      devanagariNum: '०८',
      icon: 'fa-sack-dollar',
      title: 'Corporate Financial Strategist',
      specialization: 'Wealth Houses & Investment Cycles',
      desc: 'Calculates corporate launch dates, capital deployment cycles, and financial prosperity windows using planetary transits and Sarvatobhadra Chakra.',
      image: '/images/founder-alok-nature.jpg',
    },
    {
      key: 'career',
      devanagariNum: '०९',
      icon: 'fa-scale-balanced',
      title: 'Career & High-Stakes Strategist',
      specialization: 'Dashamsha (D10) & Legal Counsel',
      desc: 'Applies astrological foresight to corporate restructuring, public career pivots, disputes, and high-stakes executive negotiations.',
      image: '/images/founder-alok-group.jpg',
    },
    {
      key: 'speaker',
      devanagariNum: '१०',
      icon: 'fa-microphone',
      title: 'Keynote Speaker & Author',
      specialization: 'National Broadcast Media & Satsang',
      desc: 'A sought-after cultural voice and keynote mentor, bridging ancient Vedic metaphysics with modern life on national media networks.',
      image: '/images/founder-alok.jpg',
      pressLogos: true,
    },
  ];

  readonly viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');
  readonly track = viewChild<ElementRef<HTMLDivElement>>('track');

  readonly currentIndex = signal(0);
  private readonly stepPx = signal(0);
  private readonly maxOffsetPx = signal(0);

  constructor() {
    afterNextRender(() => this.measure());
  }

  @HostListener('window:resize')
  onResize() {
    this.measure();
  }

  goTo(i: number) {
    const n = this.roles.length;
    this.currentIndex.set(((i % n) + n) % n);
  }

  next() {
    this.goTo(this.currentIndex() + 1);
  }

  prev() {
    this.goTo(this.currentIndex() - 1);
  }

  trackTransform(): string {
    const raw = this.currentIndex() * this.stepPx();
    const clamped = Math.min(raw, this.maxOffsetPx());
    return `translateX(-${clamped}px)`;
  }

  private measure() {
    const trackEl = this.track()?.nativeElement;
    const viewportEl = this.viewport()?.nativeElement;
    const cardEl = trackEl?.firstElementChild as HTMLElement | undefined;
    if (!trackEl || !viewportEl || !cardEl) return;

    const gap = parseFloat(getComputedStyle(trackEl).columnGap || '0') || 0;
    const cardWidth = cardEl.getBoundingClientRect().width;
    const n = this.roles.length;

    this.stepPx.set(cardWidth + gap);
    const totalWidth = n * cardWidth + (n - 1) * gap;
    const viewportWidth = viewportEl.getBoundingClientRect().width;
    this.maxOffsetPx.set(Math.max(0, totalWidth - viewportWidth));
  }
}