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
 
  // 6 Sacred Pastel Themes (Saffron Dawn, Sacred Tulsi, Ethereal Lavender, Lotus Blossom, Solar Topaz, and Celestial Azure)
readonly cardThemes = [
  {
    bgGradient: 'bg-gradient-to-br from-[#fffbf5] via-[#fff7ed] to-[#fed7aa]/35',
    borderColor: 'border-[#fdba74]/60 hover:border-[#ea580c]/60',
    badgeClass: 'bg-[#fff7ed] text-[#c2410c] border-[#fdba74]',
    badgeText: 'Jyotish',
    iconBox: 'bg-white/90 text-[#ea580c] border-[#fed7aa]',
    divider: 'bg-[#ea580c]/35',
    accentText: 'text-[#c2410c]',
    tagText: 'text-[#9a3412]',
    shadow: 'shadow-[0_10px_25px_rgba(234,88,12,0.08)]'
  },
  {
    bgGradient: 'bg-gradient-to-br from-[#f6fcf8] via-[#f0fdf4] to-[#bbf7d0]/35',
    borderColor: 'border-[#86efac]/60 hover:border-[#16a34a]/60',
    badgeClass: 'bg-[#f0fdf4] text-[#15803d] border-[#86efac]',
    badgeText: 'Vaastu',
    iconBox: 'bg-white/90 text-[#16a34a] border-[#bbf7d0]',
    divider: 'bg-[#16a34a]/35',
    accentText: 'text-[#15803d]',
    tagText: 'text-[#14532d]',
    shadow: 'shadow-[0_10px_25px_rgba(22,163,74,0.08)]'
  },
  {
    bgGradient: 'bg-gradient-to-br from-[#faf8ff] via-[#f5f3ff] to-[#ddd6fe]/35',
    borderColor: 'border-[#c4b5fd]/60 hover:border-[#7c3aed]/60',
    badgeClass: 'bg-[#f5f3ff] text-[#6d28d9] border-[#c4b5fd]',
    badgeText: 'Numerology',
    iconBox: 'bg-white/90 text-[#7c3aed] border-[#ddd6fe]',
    divider: 'bg-[#7c3aed]/35',
    accentText: 'text-[#6d28d9]',
    tagText: 'text-[#4c1d95]',
    shadow: 'shadow-[0_10px_25px_rgba(124,58,237,0.08)]'
  },
  {
    bgGradient: 'bg-gradient-to-br from-[#fff7f9] via-[#fdf2f8] to-[#fbcfe8]/35',
    borderColor: 'border-[#f472b6]/60 hover:border-[#db2777]/60',
    badgeClass: 'bg-[#fdf2f8] text-[#be185d] border-[#f472b6]',
    badgeText: 'Harmony',
    iconBox: 'bg-white/90 text-[#db2777] border-[#fbcfe8]',
    divider: 'bg-[#db2777]/35',
    accentText: 'text-[#be185d]',
    tagText: 'text-[#831843]',
    shadow: 'shadow-[0_10px_25px_rgba(219,39,119,0.08)]'
  },
  {
    bgGradient: 'bg-gradient-to-br from-[#fffeea] via-[#fefce8] to-[#fef08a]/35',
    borderColor: 'border-[#fde047]/60 hover:border-[#ca8a04]/60',
    badgeClass: 'bg-[#fefce8] text-[#a16207] border-[#fde047]',
    badgeText: 'Prashna',
    iconBox: 'bg-white/90 text-[#ca8a04] border-[#fef08a]',
    divider: 'bg-[#ca8a04]/35',
    accentText: 'text-[#a16207]',
    tagText: 'text-[#713f12]',
    shadow: 'shadow-[0_10px_25px_rgba(202,138,4,0.08)]'
  },
  {
    bgGradient: 'bg-gradient-to-br from-[#f7fbff] via-[#eff6ff] to-[#bfdbfe]/35',
    borderColor: 'border-[#93c5fd]/60 hover:border-[#2563eb]/60',
    badgeClass: 'bg-[#eff6ff] text-[#1d4ed8] border-[#93c5fd]',
    badgeText: 'Remedies',
    iconBox: 'bg-white/90 text-[#2563eb] border-[#bfdbfe]',
    divider: 'bg-[#2563eb]/35',
    accentText: 'text-[#1d4ed8]',
    tagText: 'text-[#1e3a8a]',
    shadow: 'shadow-[0_10px_25px_rgba(37,99,235,0.08)]'
  }
];

getTheme(index: number) {
  return this.cardThemes[index % this.cardThemes.length];
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

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is included in a Vedic astrology consultation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A personalized one-on-one reading of your birth chart covering karmic patterns, planetary influences, timing for major decisions, and practical guidance for life strategy.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does a consultation session take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most consultation sessions range from 60–90 minutes depending on the depth of analysis. All sessions are recorded in full HD for your lifetime access.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are consultations available online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all consultations are conducted via secure video call. You receive a full HD recording, personalized remedies report, and lifetime access to your session.'
          }
        },
        {
          '@type': 'Question',
          name: 'What information do I need to provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Please provide your birth date, exact birth time (if known), and birth location. More accurate information yields more precise readings.'
          }
        }
      ]
    });
  }
}