import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService, SITE_URL } from '../../services/seo.service';

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
export interface PressArticle {
  id: string;
  publisher: 'Zee News' | 'Agniban' | 'Janta Se Rishta' | 'InKhabar';
  logoType: 'zeenews' | 'agniban' | 'jantaserishta' | 'inkhabar';
  editionTag: string;
  category: string;
  headline: string;
  author: string;
  topicTag: string;
  readTime: string;
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

  readonly appearances: PressArticle[] = [
  {
    id: 'p1',
    publisher: 'Zee News',
    logoType: 'zeenews',
    editionTag: 'विशेष चुनावी विश्लेषण',
    category: 'Electoral Astropolitics',
    headline: 'ज्‍योतिष के मुताबिक जानें किसके सिर सजेगा ताज? मतगणना से पहले जानें यूपी के नतीजे!',
    author: 'Acharya Alok Awasthi',
    topicTag: 'UP Elections 2022',
    readTime: '4 Min Read'
  },
  {
    id: 'p2',
    publisher: 'Zee News',
    logoType: 'zeenews',
    editionTag: 'ग्रहीय गोचर विश्लेषण',
    category: 'Shani Transit Shastra',
    headline: "13 दिन बाद 'अस्‍त' शनि बदलेंगे इन लोगों की किस्‍मत, देंगे तगड़ा लाभ और तरक्‍की",
    author: 'Acharya Alok Awasthi',
    topicTag: 'Saturn Combust Transit',
    readTime: '3 Min Read'
  },
  {
    id: 'p3',
    publisher: 'Zee News',
    logoType: 'zeenews',
    editionTag: 'दाम्पत्य एवं सम्बंध',
    category: 'Vedic Relationship Dynamics',
    headline: '2022 में रिश्‍तों के मामले में बहुत सावधान रहें इस राशि के लोग, बिखर सकती है जिंदगी',
    author: 'Acharya Alok Awasthi',
    topicTag: 'Kundali Matching & Venus',
    readTime: '5 Min Read'
  },
  {
    id: 'p4',
    publisher: 'Agniban',
    logoType: 'agniban',
    editionTag: 'अंक प्रज्ञा स्तम्भ',
    category: 'Ank Vidya & Health Audit',
    headline: 'होगा बड़ा धन लाभ या घेरेगी बीमारी? जन्‍म तारीख से जानें आपके लिए कैसा रहेगा फरवरी',
    author: 'Acharya Alok Awasthi',
    topicTag: 'Numerological Forecaster',
    readTime: '4 Min Read'
  },
  {
    id: 'p5',
    publisher: 'Janta Se Rishta',
    logoType: 'jantaserishta',
    editionTag: 'वार्षिक राशि गोचर',
    category: 'Rashi Transit Chronicle',
    headline: '2022: कन्‍या राशि वालों के लिए करियर में अच्‍छा रहेगा',
    author: 'Acharya Alok Awasthi',
    topicTag: 'Virgo Professional Horizon',
    readTime: '3 Min Read'
  },
  {
    id: 'p6',
    publisher: 'InKhabar',
    logoType: 'inkhabar',
    editionTag: 'वर्ण एवं मुहूर्त रहस्य',
    category: 'Color Shastra & Culture',
    headline: 'आलिया समेत इन एक्ट्रेसों ने नहीं पहना अपनी शादी में लाल लहंगा, जाने क्या है कारण',
    author: 'Acharya Alok Awasthi',
    topicTag: 'Sacred Hue Psychology',
    readTime: '4 Min Read'
  },
  {
    id: 'p7',
    publisher: 'Zee News',
    logoType: 'zeenews',
    editionTag: 'मौलिक पराशरीय सिद्धांत',
    category: 'Classical Parampara Doctrines',
    headline: 'हर व्‍यक्ति की होती हैं एक नहीं तीन राशियां, जानें कब आती है कौनसी काम',
    author: 'Acharya Alok Awasthi',
    topicTag: 'Sun, Moon & Lagna',
    readTime: '6 Min Read'
  },
  {
    id: 'p8',
    publisher: 'Zee News',
    logoType: 'zeenews',
    editionTag: 'मेदिनी वित्तीय समीक्षा',
    category: 'Mundane Economic Astrology',
    headline: 'मिडिल क्‍लास, निवेशकों, किचन को लग सकता बड़ा झटका, ज्‍योतिष की नजर से जानें बजट 2022',
    author: 'Acharya Alok Awasthi',
    topicTag: 'National Budget Forensics',
    readTime: '5 Min Read'
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

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'About Maharishi Kapi Institute | Acharya Alok Awasthi, 9-Generation Vedic Lineage',
      description: 'Meet Acharya Alok Awasthi — 25+ years of Vedic astrology, Vastu, and numerology expertise. 9-generation lineage, 12,000+ kundali audits, 1,200+ Vastu sanctifications, consulting 34+ countries.',
      path: '/about',
      keywords: 'Acharya Alok Awasthi, Vedic astrology expert, Vastu consultant, Jyotish lineage, medical astrology, spiritual mentor',
      image: `${SITE_URL}/images/founder-alok.jpg`
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'About Maharishi Kapi Institute',
        mainEntity: {
          '@type': 'Person',
          name: 'Acharya Alok Awasthi',
          image: `${SITE_URL}/images/founder-alok.jpg`,
          jobTitle: 'Founder & Lead Instructor, Maharishi Kapi Institute',
          description: '25+ years expertise in Vedic Astrology, Vastu, Numerology, Palmistry, and Yogic Sciences',
          affiliation: {
            '@type': 'EducationalOrganization',
            name: 'Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
            url: SITE_URL,
          },
          sameAs: ['https://instagram.com/arka.connection', 'https://youtube.com/@arkaconnection', 'https://threads.net/@arka.connection'],
          knowsAbout: ['Vedic Astrology', 'Vastu Shastra', 'Numerology', 'Palmistry', 'Ayurveda', 'Spiritual Sciences'],
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
        founder: {
          '@type': 'Person',
          name: 'Acharya Alok Awasthi',
        },
        foundingDate: '1990s',
        description: '9-generation Vedic lineage institute offering courses, consultations, and retreats',
        numberOfEmployees: '12000+',
        url: SITE_URL,
      }
    ]);
  }
}