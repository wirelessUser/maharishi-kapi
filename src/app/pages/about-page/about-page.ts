import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MasterRole {
  id: string;
  roleNumber: string;
  title: string;
  sanskritBadge: string;
  domain: string;
  icon: string;
  tagline: string;
  scope: string;
  methodology: string[];
  photoUrl: string;       // Dedicated Photo field
  photoCaption: string;
  cardBg: string;
  borderColor: string;
  pillBg: string;
  pillTextColor: string;
}

interface AppearanceItem {
  id: string;
  category: 'PREMIER INSTITUTE' | 'NATIONAL MEDIA' | 'DAILY PRESS';
  name: string;
  badgeBg: string;
  badgeTextColor: string;
  subtitle: string;
  headline: string;
  description: string;
  icon: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-about-page',
  styleUrl: './about-page.css',
  templateUrl: './about-page.html',
})
export class AboutPage {
  // Active selected role for interactive Chamber
  readonly activeRoleId = signal<string>('medical-jyotish');

  // Active lineage tab
  readonly activeLineageTab = signal<'parampara' | 'tapasya' | 'ethics'>('parampara');

  // Authority Statistics
  readonly stats = [
    { num: '25+', label: 'Years of Tapasya', sub: 'Saraswat Guru Lineage' },
    { num: '12,000+', label: 'Kundali Audits', sub: 'Parashari & AyurJyotish' },
    { num: '1,200+', label: 'Vastu Sanctifications', sub: '100% Non-Demolition' },
    { num: '34+', label: 'Countries Guided', sub: 'Seekers, CEOs & Diplomats' },
  ];

  // The 5 Master Roles with Dedicated Photo Integration
  readonly masterRoles: MasterRole[] = [
    {
      id: 'medical-jyotish',
      roleNumber: '01',
      title: 'Vedic Jyotish & Medical Astrologer',
      sanskritBadge: 'आयुर्ज्योतिष एवं होरा शास्त्र',
      domain: 'AyurJyotish & Health Diagnostics',
      icon: 'fa-heart-pulse',
      tagline: 'Predictive Horoscopy, Planetary Energy Anatomy & Tridosha Health Timelines',
      scope: 'Synthesizes Brihat Parashara Hora Shastra with Charaka Samhita medical principles. Evaluates the 6th, 8th, and 12th houses alongside D30 Trimsamsha divisional charts to detect biological vulnerabilities, metabolic imbalances, and calculate optimal windows for treatment.',
      methodology: [
        'Biological vulnerability mapping via D1 Natal & D30 charts',
        'Early-stage detection of karmic health blockages',
        'Bespoke Sattvic remedies: planetary Yantras and herbs'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Acharya Alok analyzing classical horoscopic charts',
      cardBg: 'bg-[#fffdfa]',
      borderColor: 'border-[#e6dac7]',
      pillBg: 'bg-[#f5ede2]',
      pillTextColor: 'text-[#8b4513]'
    },
    {
      id: 'vastu-consultant',
      roleNumber: '02',
      title: 'Sthapatya Vastu Consultant',
      sanskritBadge: 'स्थापत्य वेद एवं वास्तु शास्त्र',
      domain: 'Spatial Energy & Non-Demolition Vastu',
      icon: 'fa-compass',
      tagline: '100% Non-Demolition Elemental Balance for Residences & Commercial Spaces',
      scope: 'Harmonizes spatial energy grids without structural breakdown. Evaluates the 16 directional zones, 32 Entrances, 45 Devatas, geo-pathic stress lines, and Brahmasthan balance to eliminate business stagnation, legal friction, and cash-flow blocks.',
      methodology: [
        'Geo-magnetic & geo-pathic radiation audit of commercial properties',
        'Panch-Tattva (5 Elements) balance via copper wire and brass strips',
        'Executive cabin and factory machinery micro-zoning'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Spatial energy mapping and directional alignment',
      cardBg: 'bg-[#fffdfa]',
      borderColor: 'border-[#e6dac7]',
      pillBg: 'bg-[#f5ede2]',
      pillTextColor: 'text-[#8b4513]'
    },
    {
      id: 'vedic-numerologist',
      roleNumber: '03',
      title: 'Vedic Numerologist & Vibrational Architect',
      sanskritBadge: 'सांख्य शास्त्र एवं ध्वनि कम्पन',
      domain: 'Ank Vidya & Harmonic Frequencies',
      icon: 'fa-hashtag',
      tagline: 'Harmonizing Root Numbers and Maturity Vibrations (Bhagyank)',
      scope: 'Applies ancient Vedic Ank Vidya to decode name resonances, date-of-birth matrices, and corporate titles. Corrects discordant letter frequencies to optimize business partnerships, legal signatures, and career progression.',
      methodology: [
        'Name spelling correction to eliminate planetary-numeric friction',
        'Corporate brand names, logo geometry, and Muhurat tuning',
        'Harmonizing mobile numbers and financial accounts'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1518288774671-b94e8088c2f5?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Vedic number resonance calibration',
      cardBg: 'bg-[#fffdfa]',
      borderColor: 'border-[#e6dac7]',
      pillBg: 'bg-[#f5ede2]',
      pillTextColor: 'text-[#8b4513]'
    },
    {
      id: 'vedic-psychologist',
      roleNumber: '04',
      title: 'Vedic Somatic Therapist & Spiritual Mentor',
      sanskritBadge: 'चित्त वृत्ति निरोध एवं मानस योग',
      domain: 'Mental Wellness & Consciousness',
      icon: 'fa-brain',
      tagline: 'Keynote Speaker at Prestigious Academic Institutes on Mental Wellness',
      scope: 'Applies Bhagavad Gita psychology and Upanishadic Panchakosha healing to modern anxiety, emotional exhaustion, and executive burnout. Restores harmony between emotional and intuitive layers through conscious self-inquiry.',
      methodology: [
        'Guest lecturer on mental wellness at top universities (IMS Ghaziabad)',
        'Nada Yoga sacred sound vibration and pranic recalibration',
        'Subconscious trauma release and emotional detox'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Guiding seekers through meditative consciousness regulation',
      cardBg: 'bg-[#fffdfa]',
      borderColor: 'border-[#e6dac7]',
      pillBg: 'bg-[#f5ede2]',
      pillTextColor: 'text-[#8b4513]'
    },
    {
      id: 'corporate-research',
      roleNumber: '05',
      title: 'Corporate Mentor & Research Guide',
      sanskritBadge: 'अनुसंधान निर्देशक एवं नेतृत्व मार्गदर्शक',
      domain: 'Executive Strategy & Empirical Research',
      icon: 'fa-landmark',
      tagline: 'Macro Planetary Guidance for Boardrooms & Guiding Research Scholars',
      scope: 'Advises C-suite executives, diplomats, and entrepreneurs using planetary transit analysis fused with Gita leadership ethos. Heads the Maharishi Kapi Research Fellowship, guiding scholars in empirical chart studies.',
      methodology: [
        '5-Year corporate macro-cycle forecasting and acquisition timing',
        'Director of the Vedic Astrology Research Fellowship',
        'Boardroom mediation rooted in Dharmic leadership'
      ],
      photoUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
      photoCaption: 'Executive advisory session bridging strategy with cosmic cycles',
      cardBg: 'bg-[#fffdfa]',
      borderColor: 'border-[#e6dac7]',
      pillBg: 'bg-[#f5ede2]',
      pillTextColor: 'text-[#8b4513]'
    }
  ];

  // Press & Public Appearances (Institutes + Media Houses)
  readonly appearances: AppearanceItem[] = [
    {
      id: 'ims',
      category: 'PREMIER INSTITUTE',
      name: 'IMS Ghaziabad',
      badgeBg: 'bg-[#fceddc]',
      badgeTextColor: 'text-[#874312]',
      subtitle: 'Premier Management & Technology Institute',
      headline: 'Guest Lecture on Mental Wellness & Vedic Psychology in Executive Life',
      description: 'Invited by academic leadership to deliver masterclasses for MBA scholars, faculty, and corporate executives on overcoming cognitive burnout, Chitta Shuddhi, and conscious leadership.',
      icon: 'fa-graduation-cap'
    },
    {
      id: 'gl-bajaj',
      category: 'PREMIER INSTITUTE',
      name: 'GL Bajaj Institute',
      badgeBg: 'bg-[#fceddc]',
      badgeTextColor: 'text-[#874312]',
      subtitle: 'GL Bajaj Institute of Technology & Management',
      headline: 'Keynote Address on Mind Mastery & Overcoming Academic Pressure',
      description: 'Addressed engineering researchers, students, and department heads on applying ancient Yogic psychology, breathwork, and emotional equilibrium in high-stress tech environments.',
      icon: 'fa-university'
    },
    {
      id: 'zee-news',
      category: 'NATIONAL MEDIA',
      name: 'Zee News',
      badgeBg: 'bg-[#f5ede2]',
      badgeTextColor: 'text-[#8c5324]',
      subtitle: 'National Television & Digital Media Network',
      headline: 'Authored Expert Columns on Astrological Cycles & Planetary Eclipses',
      description: 'Regularly featured for authoritative Shastric analysis, decoding celestial transitions, planetary alignments, and their psycho-social impact on viewers nationwide.',
      icon: 'fa-newspaper'
    },
    {
      id: 'inkhabar',
      category: 'NATIONAL MEDIA',
      name: 'InKhabar',
      badgeBg: 'bg-[#f5ede2]',
      badgeTextColor: 'text-[#8c5324]',
      subtitle: 'Leading National Digital News Portal',
      headline: 'Featured Interviews on Non-Demolition Vastu for Commercial Growth',
      description: 'In-depth broadcasts and exposés explaining how subtle elemental shifts (Panch-Tattva) harmonize troubled commercial properties without breaking a single brick.',
      icon: 'fa-tv'
    },
    {
      id: 'agnibaan',
      category: 'DAILY PRESS',
      name: 'Agnibaan',
      badgeBg: 'bg-[#faf3e8]',
      badgeTextColor: 'text-[#a66224]',
      subtitle: 'Renowned Hindi National Daily Newspaper',
      headline: 'Comprehensive Editorials on Planetary Transits & Vedic Remedies',
      description: 'Published insightful columns guiding the public on authentic Parashari remedies, breaking common astrological superstitions, and accurate Muhurat timing.',
      icon: 'fa-file-lines'
    },
    {
      id: 'janta-se-rishta',
      category: 'DAILY PRESS',
      name: 'Janta Se Rishta',
      badgeBg: 'bg-[#faf3e8]',
      badgeTextColor: 'text-[#a66224]',
      subtitle: 'Prominent National Hindi News Daily',
      headline: 'Special Features on Spiritual Mentorship & Conscious Living',
      description: 'Profiled Acharya Alok’s journey and his mission to make Vedic sciences practical, compassionate, and empowering for families and students across the nation.',
      icon: 'fa-bullhorn'
    }
  ];

  readonly activeRole = computed(() => {
    return this.masterRoles.find(r => r.id === this.activeRoleId()) ?? this.masterRoles[0];
  });

  selectRole(id: string): void {
    this.activeRoleId.set(id);
  }

  selectLineageTab(tab: 'parampara' | 'tapasya' | 'ethics'): void {
    this.activeLineageTab.set(tab);
  }
}