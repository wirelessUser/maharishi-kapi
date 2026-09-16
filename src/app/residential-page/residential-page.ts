import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
export type ProgramCategory = 'All' | 'Jyotish' | 'Ayurveda & Marma' | 'Vastu' | 'Sadhana';

export interface ResidentialProgram {
  id: string;
  title: string;
  sanskritTitle: string;
  category: ProgramCategory;
  duration: string;
  dates: string;
  seatsTotal: number;
  seatsLeft: number;
  location: string;
  image: string;
  deck: string;
  highlights: string[];
  inclusions: string[];
  fee: number;
  featured?: boolean;
}

export interface DinacharyaSlot {
  time: string;
  pahar: string;
  activity: string;
  description: string;
  icon: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-residential-page',
  styleUrl: './residential-page.css',
  templateUrl: './residential-page.html',
})
export class ResidentialPage {
  readonly categories: ProgramCategory[] = ['All', 'Jyotish', 'Ayurveda & Marma', 'Vastu', 'Sadhana'];
  readonly selectedCategory = signal<ProgramCategory>('All');
  readonly selectedProgramForModal = signal<ResidentialProgram | null>(null);

  // Application Form State
  applicantName = '';
  applicantEmail = '';
  applicantPhone = '';
  applicantCity = '';
  selectedProgramId = 'ayur-marma-7d';
  seekerBackground = '';
  dietaryOrHealthNotes = '';
  readonly applicationSubmitted = signal<boolean>(false);

  // FAQ Accordion
  readonly openFaq = signal<number | null>(0);

  readonly dailyRoutine: DinacharyaSlot[] = [
    {
      time: '04:45 AM – 06:15 AM',
      pahar: 'ब्रह्म मुहूर्त • Brahma Muhurta',
      activity: 'Pranayama & Ganga Ghat Snana',
      description: 'Awakening before sunrise, silent Japa, guided Nadi Shodhana, and sacred waters dip at the ashram’s private Ganga Ghat.',
      icon: 'fa-sun',
    },
    {
      time: '06:30 AM – 08:00 AM',
      pahar: 'यज्ञ काल • Yajna Kala',
      activity: 'Daily Surya Agnihotra & Chanting',
      description: 'Participating in the traditional morning fire ritual using consecrated cow ghee, medicinal herbs, and Vedic Vedic Samhita mantras.',
      icon: 'fa-fire-flame-curved',
    },
    {
      time: '08:15 AM – 09:15 AM',
      pahar: 'सात्त्विक आहार • Sattvic Ahara',
      activity: 'Ayurvedic Rasayana Breakfast',
      description: 'Warm seasonal herbal decoctions, fresh seasonal fruits, soaked almonds, and farm-fresh grain porridges prepared under Ayurvedic rules.',
      icon: 'fa-bowl-food',
    },
    {
      time: '09:30 AM – 12:45 PM',
      pahar: 'शास्त्र अध्ययन • Shastra Adhyayana',
      activity: 'Direct Intensive with Acharya Alok',
      description: 'In-depth classical sutra analysis, manuscript chart reading, live client case studies, and non-linear predictive techniques.',
      icon: 'fa-book-open-reader',
    },
    {
      time: '01:00 PM – 03:30 PM',
      pahar: 'विश्राम एवं ध्यान • Vishrama',
      activity: 'Sattvic Lunch & Silent Contemplation',
      description: 'Wholesome Tridoshic meals followed by guided Yoga Nidra, library research of birch-bark manuscripts, or personal contemplation.',
      icon: 'fa-moon',
    },
    {
      time: '04:00 PM – 06:30 PM',
      pahar: 'क्रिया अभ्यास • Kriya Abhyasa',
      activity: 'Hands-on Clinical & Spatial Practicals',
      description: 'Pulse diagnosis (Nadi Pariksha), locating the 107 Marma junctions on peers, or spatial energy mapping with copper Vastu dowsing rods.',
      icon: 'fa-hand-holding-heart',
    },
    {
      time: '07:00 PM – 08:30 PM',
      pahar: 'गङ्गा आरती • Ganga Sandhya',
      activity: 'Riverbank Aarti & Guru Satsang',
      description: 'Consecrated evening lamps by the river, philosophical Q&A with the Acharya, and quietude beneath Himalayan stars.',
      icon: 'fa-om',
    },
  ];

  readonly programs: ResidentialProgram[] = [
    {
      id: 'ayur-marma-7d',
      title: 'Himalayan AyurJyotish & 107 Marma Clinical Residency',
      sanskritTitle: 'आयुर्ज्योतिष एवं मर्म चिकित्सा शिविर',
      category: 'Ayurveda & Marma',
      duration: '7 Days / 6 Nights',
      dates: 'October 18 – 24, 2026',
      seatsTotal: 16,
      seatsLeft: 4,
      location: 'Rishikesh Ganga Ashram, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      deck: 'A closed-door masterclass on identifying biological root karma through the birth chart and clearing subtle blockages through hands-on Marma pressure therapy.',
      highlights: [
        'Master the exact anatomical locations of all 107 Marma vital points',
        'Direct pulse diagnosis (Tridosha Nadi Pariksha) under Acharya Alok',
        'Preparation of consecrated herbal tailams (medicated oils) in our Rasashala',
        'Daily morning Ganga Agnihotra Havan for nervous system grounding',
      ],
      inclusions: [
        'Private Himalayan Ganga-view stone Kutir with en-suite bath',
        'Three sattvic organic Ayurvedic meals daily + herbal Rasayanas',
        'Complete physician-grade bronze Kansa wand & Marma clinical kit',
        'Government-recognized Parampara Certification of Completion',
      ],
      fee: 48000,
      featured: true,
    },
    {
      id: 'predictive-jyotish-10d',
      title: 'Intensive Parashari & Nadi Predictive Jyotish Boot-Camp',
      sanskritTitle: 'पाराशरी एवं नाड़ी ज्योतिष आवासीय साधना',
      category: 'Jyotish',
      duration: '10 Days / 9 Nights',
      dates: 'November 8 – 17, 2026',
      seatsTotal: 14,
      seatsLeft: 3,
      location: 'Rishikesh Ganga Ashram, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      deck: 'Break through predictive roadblocks. Synthesize Vimshottari, Yogini, and Gochara transits across 100+ real birth charts in full Gurukul immersion.',
      highlights: [
        'Deconstruct 100+ real-world anonymized consultation charts with Acharya Alok',
        'Navamsha (D9) and Dashamsha (D10) surgical timing mastery',
        'Rectification of unknown birth times using ancient Bhrigu methods',
        'Manuscript reading sessions from the Institute’s archival palm-leaf collection',
      ],
      inclusions: [
        'Riverside Kutir lodging with dedicated study desk & library pass',
        'Daily sattvic meals, morning cow milk from our sanctuary, and herbal teas',
        'Bound leather-embossed course codex with classical Shloka commentaries',
        'Lifetime invitation to the private Saraswat Senior Astrologer Sangha',
      ],
      fee: 64000,
    },
    {
      id: 'sthapatya-vastu-7d',
      title: 'Sthapatya Vastu & Earth Energy Mapping Residency',
      sanskritTitle: 'स्थापत्य वेद एवं भूमि ऊर्जा प्रत्यक्ष शिविर',
      category: 'Vastu',
      duration: '7 Days / 6 Nights',
      dates: 'December 2 – 8, 2026',
      seatsTotal: 12,
      seatsLeft: 5,
      location: 'Rishikesh Sanctum & Heritage Sites, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?auto=format&fit=crop&w=1200&q=80',
      deck: 'Learn on-site spatial diagnosis. Experience non-demolition energy alignment, geo-pathic stress harmonization, and sacred Vedic architecture firsthand.',
      highlights: [
        'Live on-site field audits across ancient Himalayan temples and modern villas',
        'Practical usage of Lecher Antenna, magnetic sensors, and brass dowsing rods',
        'Remediation protocols utilizing metal wire staples, gems, and brass pyramids',
        'The 45 Devtas of the Vastu Purusha Mandala decoded for modern blueprints',
      ],
      inclusions: [
        'Private room in the Vedic Heritage wing with river balcony',
        'All field-trip transport to heritage temple architectural audit sites',
        'Full professional brass Vastu brass auditing kit with directional compass',
        'Official Kapi Certified Vastu Practitioner Accreditation',
      ],
      fee: 52000,
    },
    {
      id: 'gita-chitta-14d',
      title: 'Chitta Shuddhi & Gita Psychology Winter Sadhana',
      sanskritTitle: 'चित्त शुद्धि एवं श्रीमद्भगवद्गीता साधना',
      category: 'Sadhana',
      duration: '14 Days / 13 Nights',
      dates: 'January 4 – 17, 2027',
      seatsTotal: 12,
      seatsLeft: 2,
      location: 'Rishikesh Ganga Ashram, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
      deck: 'A deep psychological retreat based on the 18 chapters of the Bhagavad Gita and Patanjali Yoga Sutras for seekers navigating burnout or life transitions.',
      highlights: [
        'Silent contemplation periods (Mauna Vrata) alongside sacred riverbanks',
        'Verse-by-verse psycho-spiritual deconstruction of Gita chapters 2, 6, and 12',
        'Daily Panchakosha subtle body cleansing through Nada Yoga sound baths',
        'One-on-one personal spiritual roadmap consultation with Acharya Alok',
      ],
      inclusions: [
        'Secluded stone cottage near the bamboo forest grove of the Ashram',
        'Tridosha-customized herbal detox diet designed by on-site Vaidya',
        'Pure organic white cotton Khadi meditation robes and silk asana mat',
        'Consecrated brass Japa Mala and daily havan offerings',
      ],
      fee: 75000,
    },
  ];

  readonly featuredProgram = this.programs.find((p) => p.featured) ?? this.programs[0];

  readonly filteredPrograms = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'All' ? this.programs : this.programs.filter((p) => p.category === cat);
  });

  selectCategory(category: ProgramCategory): void {
    this.selectedCategory.set(category);
  }

  openApplicationFor(program: ResidentialProgram): void {
    this.selectedProgramId = program.id;
    const formSection = document.getElementById('application-desk');
    formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  submitApplication(event: Event): void {
    event.preventDefault();
    if (this.applicantName && this.applicantEmail && this.applicantPhone) {
      this.applicationSubmitted.set(true);
      setTimeout(() => {
        // Keeps state confirmed for the user
      }, 500);
    }
  }

  toggleFaq(index: number): void {
    this.openFaq.update((curr) => (curr === index ? null : index));
  }

  formatCurrency(val: number): string {
    return '₹' + val.toLocaleString('en-IN');
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'Residential Gurukul Learning Programs in Rishikesh | Maharishi Kapi Institute',
      description: 'Intensive residential Vedic immersions in Rishikesh on AyurJyotish, Marma clinical therapy, Parashari astrology, and Sthapatya Vastu with Acharya Alok Awasthi.',
      path: '/residential',
      keywords: 'Vedic residential retreat Rishikesh, Gurukul learning India, Marma training residential, Vedic astrology retreat, learn Vastu in person',
    });
  }
}