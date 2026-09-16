import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

interface Service {
  title: string;
  description: string;
  icon: string;
  price: number;
  originalPrice: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-services-page',
  styleUrl: './services-page.css',
  templateUrl: './services-page.html',
})
export class ServicesPage {
  // Signal holds only one active index, or null if all are closed
  readonly activeCardIndex = signal<number | null>(null);

  toggleFlip(index: number): void {
    // If the clicked card is already active, close it. Otherwise, open it.
    this.activeCardIndex.update((current) => (current === index ? null : index));
  }

  formatTitle(title: string): string {
    return title.replace('™', '<span class="text-[10px] align-top text-white/70">™</span>');
  }

  // NEW PALETTE: Rich, sophisticated Vedic jewel and earth tones instead of just saffron/gold.
  readonly themes = [
    {
      // Tulsi / Forest Green
      bgGradient: 'bg-gradient-to-br from-[#2f5243] via-[#213e31] to-[#14291f]',
      badgeText: 'FLAGSHIP',
      badgeClass: 'text-emerald-200 border-emerald-300/30 bg-white/10',
      bottomTextClass: 'text-emerald-100/80'
    },
    {
      // Midnight Indigo / Neela
      bgGradient: 'bg-gradient-to-br from-[#294261] via-[#1c2e47] to-[#101c2e]',
      badgeText: 'MOST POPULAR',
      badgeClass: 'text-blue-200 border-blue-300/30 bg-white/10',
      bottomTextClass: 'text-blue-100/80'
    },
    {
      // Madder Root / Deep Rose
      bgGradient: 'bg-gradient-to-br from-[#8a3346] via-[#6d2433] to-[#4a1520]',
      badgeText: 'VIP GURU',
      badgeClass: 'text-rose-200 border-rose-300/30 bg-white/10',
      bottomTextClass: 'text-rose-100/80'
    },
    {
      // Muted Peacock Teal
      bgGradient: 'bg-gradient-to-br from-[#2c5f63] via-[#1d4447] to-[#122e30]',
      badgeText: 'WELLNESS',
      badgeClass: 'text-teal-200 border-teal-300/30 bg-white/10',
      bottomTextClass: 'text-teal-100/80'
    },
    {
      // Muted Earth / Clay (Sophisticated Terracotta, not bright orange)
      bgGradient: 'bg-gradient-to-br from-[#8e4a3b] via-[#6d3529] to-[#4d2219]',
      badgeText: 'STRATEGY',
      badgeClass: 'text-orange-200 border-orange-300/30 bg-white/10',
      bottomTextClass: 'text-orange-100/80'
    },
    {
      // Rich Fig / Warm Plum
      bgGradient: 'bg-gradient-to-br from-[#6b354d] via-[#4f2437] to-[#361624]',
      badgeText: 'HARMONY',
      badgeClass: 'text-pink-200 border-pink-300/30 bg-white/10',
      bottomTextClass: 'text-pink-100/80'
    }
  ];

  getTheme(index: number) {
    return this.themes[index % this.themes.length];
  }

  readonly services: Service[] = [
    {
      title: 'Personalized Vedic Astrology Consultation',
      description: 'A one-on-one reading of your birth chart — karmic patterns, timing, and practical guidance.',
      icon: 'fa-moon',
      price: 90,
      originalPrice: 99,
    },
    {
      title: 'Comprehensive Life Analysis™',
      description: 'A complete, in-depth review of your chart across career, relationships, health, and finances.',
      icon: 'fa-scroll',
      price: 180,
      originalPrice: 250,
    },
    {
      title: 'Kapi Master Life Strategy™',
      description: "Our most complete offering — a multi-session strategy blueprint for your life's biggest decisions.",
      icon: 'fa-crown',
      price: 299,
      originalPrice: 399,
    },
    {
      title: 'Kapi Annual Life Blueprint™',
      description: 'A year-ahead forecast across the key areas of your life, planet by planet, month by month.',
      icon: 'fa-calendar-days',
      price: 199,
      originalPrice: 225,
    },
    {
      title: 'Commercial Vastu Blueprint™ (Online)',
      description: 'Remote Vastu correction for offices and commercial spaces — no demolition required.',
      icon: 'fa-building',
      price: 399,
      originalPrice: 499,
    },
    {
      title: 'Commercial Vastu Blueprint™ — On-Site',
      description: 'An in-person Vastu audit and correction plan for your office, shop, or commercial property.',
      icon: 'fa-house-chimney',
      price: 599,
      originalPrice: 699,
    },
    {
      title: 'Kapi Vedic Numerology Blueprint™',
      description: 'Your birth number, name number, and compatibility — decoded and applied to real decisions.',
      icon: 'fa-hashtag',
      price: 199,
      originalPrice: 225,
    },
    {
      title: 'Kapi Samudrika Blueprint™',
      description: 'Classical Vedic palmistry and face reading, read together for a fuller picture of character and destiny.',
      icon: 'fa-hand',
      price: 199,
      originalPrice: 225,
    },
    {
      title: 'Kapi AyurJyotish Health Blueprint™',
      description: "Your astrological chart read through an Ayurvedic lens — dosha, vulnerabilities, and daily routine.",
      icon: 'fa-leaf',
      price: 249,
      originalPrice: 300,
    },
    {
      title: 'Marriage Timing & Matchmaking Guidance™',
      description: 'Compatibility analysis (Guna Milan) and auspicious timing guidance for marriage.',
      icon: 'fa-heart',
      price: 149,
      originalPrice: 199,
    },
    {
      title: 'Conception & Pregnancy Astrology Guidance™',
      description: 'Astrological guidance and auspicious timing support through conception and pregnancy.',
      icon: 'fa-baby',
      price: 299,
      originalPrice: 399,
    },
    {
      title: 'Education & Academic Success Guidance™',
      description: "Chart-based guidance on subject choice, exam timing, and a child's academic path.",
      icon: 'fa-graduation-cap',
      price: 149,
      originalPrice: 199,
    },
    {
      title: 'Financial Prosperity & Investment Guidance™',
      description: 'Astrological timing and guidance for major financial decisions and investments.',
      icon: 'fa-sack-dollar',
      price: 249,
      originalPrice: 399,
    },
    {
      title: 'Loan, Debt & Financial Recovery Guidance™',
      description: 'Remedial guidance and timing support for recovering from debt and financial setbacks.',
      icon: 'fa-hand-holding-dollar',
      price: 249,
      originalPrice: 300,
    },
    {
      title: 'Kapi Legal Strategy Blueprint™',
      description: 'Astrological insight and timing guidance to support ongoing legal matters.',
      icon: 'fa-scale-balanced',
      price: 399,
      originalPrice: 499,
    },
    {
      title: 'Kapi Global Mobility Blueprint™',
      description: 'Guidance on the most auspicious timing and direction for relocation or travel abroad.',
      icon: 'fa-plane',
      price: 249,
      originalPrice: 299,
    },
  ];

formatPrice(value: number): string {
  return '€' + value.toLocaleString('de-DE');
}

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: '1-on-1 Vedic Consultations | Maharishi Kapi Institute',
      description: "Personal, fixed-price consultations with Acharya Alok Awasthi — Vedic astrology, Vastu, numerology, and life-strategy blueprints, delivered online.",
      path: '/services',
      keywords: 'Vedic astrology consultation, online Vastu consultation, birth chart reading, numerology consultation',
    });
  }
}