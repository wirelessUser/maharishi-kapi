import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

interface Service {
  title: string;
  description: string;
  icon: string;
  price: number | string; // Updated to allow both numbers and currency strings like '€80'
  originalPrice?: number;
  category: string;
  
  // Optional properties for consultations
  image?: string;
  duration?: string;
  tagline?: string;
  takeHome?: string;
  steps?: string[];

  // ---------------------------------------------------
  // New properties for Inner/Detail Page (Added these)
  // ---------------------------------------------------
  whatItIs?: string;
  helpsIf?: string[];
  goodToKnow?: string;
  timeline?: { time: string; title: string; desc: string }[];
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-services-page',
  styleUrl: './services-page.css',
  templateUrl: './services-page.html',
})
export class ServicesPage {
  // Active states
  readonly activeCardIndex = signal<number | null>(null);
  readonly activeCategory = signal<string>('All');

  // Filter Categories mimicking the course page
  readonly categories = ['All', 'Astrology', 'Vastu', 'Numerology', 'Wellness', 'Career', 'Harmony', 'Consultation'];

  toggleFlip(index: number): void {
    this.activeCardIndex.update((current) => (current === index ? null : index));
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
    this.activeCardIndex.set(null); // Reset flipped cards when filtering
  }

  formatTitle(title: string): string {
    return title.replace('™', '<span class="text-[10px] align-top text-black/40">™</span>');
  }

  //--------------- Consultation Services ---------------------------------

  readonly consultationServices: Service[] = [
    {
      title: 'Inner Child Work',
      category: 'Consultation',
      duration: '60 MIN',
      price: '€80',
      icon: 'fa-child-reaching',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Inner_child_work.jpeg',
      tagline: 'Meet the younger you, and give them what they needed.',
      description: 'Gently explore the younger parts of yourself, understand emotional triggers, and build a more compassionate inner response.',
      whatItIs: 'The “inner child” is a simple name for the feelings, needs and beliefs we formed when we were small and still carry today. When something in adult life touches an old wound — criticism, being left out, not being heard — the reaction often comes from that younger self, not from the adult in the room. Inner child work helps you recognise that part of you and offer it the understanding it needed then.',
      helpsIf: [
        'your reactions sometimes feel bigger and older than the moment',
        'you push yourself hard and still feel “not enough”',
        'you find it easier to care for others than to let yourself be cared for'
      ],
      takeHome: 'An audio recording of the guided journey and a short written practice note.',
      goodToKnow: 'You decide what you share. We work gently and at your pace, and we never dig for painful memories.',
      timeline: [
        { time: '15 min', title: 'Conversation', desc: 'We look at one recent situation where your reaction surprised you, and the feeling underneath it.' },
        { time: '30 min', title: 'Guided journey', desc: 'In the deep calm of Yoga Nidra you meet your younger self in a safe inner place and offer what was missing: comfort, permission or protection.' },
        { time: '15 min', title: 'Integration', desc: 'We put the experience into words: a few phrases of self-support and a five-minute daily practice.' }
      ],
      steps: [
        '15 min · Conversation: Look at one recent situation & the feeling underneath',
        '30 min · Guided Journey: Meet your younger self in deep Yoga Nidra',
        '15 min · Integration: Phrases of self-support & a 5-min daily practice'
      ]
    },
    {
      title: 'Life Pattern Mapping',
      category: 'Consultation',
      duration: '60 MIN',
      price: '€80',
      icon: 'fa-compass-drafting',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Life_Pattern_Mapping.jpeg',
      tagline: 'Why does the same story keep repeating?',
      description: 'Understand the patterns repeating in your work, relationships, or choices, and create a grounded plan for change.',
      whatItIs: 'Most of us live a few patterns again and again: the same kind of conflict, the same kind of partner, the same way of overworking. A pattern is not a flaw; it was once a solution that worked. In this session we make one pattern visible, understand what it once protected, and choose a new response.',
      helpsIf: [
        'the same situation keeps returning in work, relationships or money',
        'you see the pattern clearly, but still fall into it',
        'you want to understand your strengths as well as your blind spots'
      ],
      takeHome: 'Your pattern map and a 40-day practice plan.',
      goodToKnow: 'The chart is optional. If you would like it included, send your date of birth beforehand (and time and place of birth for a Vedic chart).',
      timeline: [
        { time: '10 min', title: 'Choosing the pattern', desc: 'You describe what keeps repeating, in your own words.' },
        { time: '25 min', title: 'Mapping it', desc: 'Step by step: the trigger, the feeling, the old strategy and the result it brings now. If you wish, your Vedic astrology or Kapi Numerology chart is read as a mirror of your natural tendencies.' },
        { time: '15 min', title: 'A new response', desc: 'We turn it into a simple “when this happens, I will do this” plan.' },
        { time: '10 min', title: 'Anchoring', desc: 'A short Yoga Nidra fixes the new response in a calm state.' }
      ],
      steps: [
        '10 min · Choosing the Pattern: Describe what keeps repeating',
        '25 min · Mapping It: Trigger, feeling, old strategy & optional Vedic/Numerology chart',
        '15 min · A New Response & 10 min · Anchoring in Yoga Nidra'
      ]
    },
    {
      title: 'Yoga Nidra Deep Reset',
      category: 'Consultation',
      duration: '60 MIN',
      price: '€80',
      icon: 'fa-spa',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Yoga_Nidra_Deep_Reset.jpeg',
      tagline: 'Rest so deep that the mind can begin again.',
      description: 'Experience profound guided rest that calms the nervous system, restores clarity, and helps the mind begin again.',
      whatItIs: 'Yoga Nidra, “yogic sleep”, is a guided practice from the classical yoga tradition. You lie down with your eyes closed and simply listen. The body rests very deeply while awareness stays gently awake, somewhere between waking and sleep. Many people describe it as the deepest rest they have felt in years.',
      helpsIf: [
        'your mind keeps running long after the working day ends',
        'evenings feel restless and mornings feel heavy',
        'you want a reliable way to switch off without a screen'
      ],
      takeHome: 'A personal recording of about 30 minutes, with your own sankalpa.',
      goodToKnow: 'Nothing needs to be learned in advance. If you drift into sleep, that is fine; the recording lets you practise again.',
      timeline: [
        { time: '10 min', title: 'Conversation', desc: 'How you rest and switch off, and the personal resolve (sankalpa) you would like to plant.' },
        { time: '40 min', title: 'Guided Yoga Nidra', desc: 'Settling, breath awareness, a journey of attention through the body, gentle visualisation and your sankalpa.' },
        { time: '10 min', title: 'Return', desc: 'A slow return, a few words about your experience, and how to practise at home.' }
      ],
      steps: [
        '10 min · Conversation: How you rest & your personal resolve (sankalpa)',
        '40 min · Guided Yoga Nidra: Breath awareness, body scan & visualisation',
        '10 min · Return: Slow return & how to practise at home'
      ]
    },
    {
      title: 'Self-Hypnosis and Mind Reprogramming',
      category: 'Consultation',
      duration: '60 MIN',
      price: '€80',
      icon: 'fa-brain',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Self_Hypnosis_and_Mind_Programming.jpeg',
      tagline: 'Learn to speak to your mind in its own language.',
      description: 'Learn a practical self-hypnosis method to shift limiting beliefs, change unhelpful habits, and build calm confidence.',
      whatItIs: 'Self-hypnosis is a natural state of focused relaxation, close to the moments just before sleep, in which the mind is more open to clear, positive suggestions. In this session you learn to enter that state by yourself and use it to replace an old belief or habit with a new one. Nothing is done to you: you learn a skill you keep for life.',
      helpsIf: [
        'an old belief about yourself no longer fits who you are',
        'you want to change a habit that willpower alone has not shifted',
        'you want calm confidence before presentations or difficult conversations'
      ],
      takeHome: 'A personal audio recording and your written suggestions.',
      goodToKnow: 'You stay aware and in control throughout, and you cannot be made to do anything you do not want to do.',
      timeline: [
        { time: '15 min', title: 'Choosing the change', desc: 'We turn the change you want into short, positive suggestions in your own words.' },
        { time: '30 min', title: 'Guided practice', desc: 'Relaxation, deepening, your suggestions and a gentle return; then you try it yourself, with guidance.' },
        { time: '15 min', title: 'Recording and plan', desc: 'We record your suggestions and plan a 10-minute daily practice for the next 40 days.' }
      ],
      steps: [
        '15 min · Choosing the Change: Turn your goal into positive suggestions',
        '30 min · Guided Practice: Relaxation, deepening & guided self-practice',
        '15 min · Recording & Plan: Record suggestions & 40-day 10-min practice plan'
      ]
    },
    {
      title: 'Stress and Pressure Reset',
      category: 'Consultation',
      duration: '60 MIN',
      price: '€80',
      icon: 'fa-wind',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Stress_and_pressure_Reset.jpeg',
      tagline: 'For the mind that never clocks off.',
      description: 'Release built-up pressure through breathwork, Marma self-relaxation, and Ayurvedic rhythm guidance.',
      whatItIs: 'A practical mind–body session drawing on yoga, Ayurveda and Marma. It works on three levels: the breath, the quickest way to change how you feel; the body, through gentle self-applied Marma points; and your daily rhythm of sleep, meals and screens, which Ayurveda sees as the foundation of a steady mind.',
      helpsIf: [
        'your days are full of responsibility and your body feels it',
        'you are always available and rarely present',
        'you want a short daily routine that actually fits your diary'
      ],
      takeHome: 'A one-page routine card and an audio guide to the breathing practices.',
      goodToKnow: 'The practices are gentle and need no special clothing or equipment.',
      timeline: [
        { time: '10 min', title: 'Your day', desc: 'Where the pressure builds, and when you could pause.' },
        { time: '20 min', title: 'Breathwork', desc: 'Three simple techniques: the long exhale, alternate-nostril breathing (nadi shodhana) and the humming breath (bhramari).' },
        { time: '15 min', title: 'Marma for self-relaxation', desc: 'A few points you can use at your desk or before sleep, with light touch.' },
        { time: '15 min', title: 'Your rhythm', desc: 'An Ayurvedic daily rhythm and a 10-minute routine for mornings and evenings.' }
      ],
      steps: [
        '10 min · Your Day & 20 min · Breathwork (Long exhale, Nadi Shodhana, Bhramari)',
        '15 min · Marma for Self-Relaxation: Gentle points for desk or sleep',
        '15 min · Your Rhythm: Ayurvedic 10-min morning & evening routine'
      ]
    },
    {
      title: 'Life Transitions and Clarity',
      category: 'Consultation',
      duration: '60 MIN',
      price: '€80',
      icon: 'fa-hourglass-half',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Life_Transitions_and_Clarity.jpeg',
      tagline: 'For the moments between one chapter and the next.',
      description: 'Find calm direction during change with reflective guidance, chart-based insight, and clear next steps.',
      whatItIs: 'A move abroad, a new role, the end of a relationship or retirement can unsettle even very capable people: the old routines no longer hold and the new ones are not yet built. This session gives you a calm space to think, with the Vedic view of time — the seasons of your chart — as a lens on the phase you are in.',
      helpsIf: [
        'you are facing a move, a new role, a career change or the end of a chapter',
        'a big decision is waiting and your mind keeps circling',
        'you want to understand the season you are in'
      ],
      takeHome: 'A written summary of your season and your next steps.',
      goodToKnow: 'Send your date of birth beforehand (and time and place of birth for a Vedic chart). The chart offers perspective, not predictions; the decisions stay yours.',
      timeline: [
        { time: '15 min', title: 'The transition', desc: 'In your words: what you want, and what you fear.' },
        { time: '20 min', title: 'Your season', desc: 'What your chart’s present phase supports and what it asks of you.' },
        { time: '15 min', title: 'Clarity', desc: 'Your options, your values and the next three concrete steps.' },
        { time: '10 min', title: 'A resolve', desc: 'A short Yoga Nidra with a sankalpa for the new chapter.' }
      ],
      steps: [
        '15 min · The Transition: What you want and what you fear',
        '20 min · Your Season: What your chart’s present phase supports',
        '15 min · Clarity (Next 3 steps) & 10 min · Yoga Nidra resolve'
      ]
    },
    {
      title: 'Past Life Regression Journey',
      category: 'Consultation',
      duration: '90 MIN',
      price: '€120',
      icon: 'fa-infinity',
      image: 'https://storagemaharishikapicom.blob.core.windows.net/consultations-services/Past_life_Regression_journey.jpeg',
      tagline: 'Some patterns feel older than this life.',
      description: 'Enter a deeply relaxed guided journey to explore symbolic or past-life impressions and their meaning for your life today.',
      whatItIs: 'In a deeply relaxed, guided state, similar to Yoga Nidra, you are invited to let images and impressions arise of another time and another life. Some people understand them as memories of a past life; others as symbols from the deeper mind, like a vivid and meaningful dream. Either way, the experience often throws fresh light on a pattern you live today. In the yogic tradition such deep impressions are called samskaras, and this journey is a way of meeting them.',
      helpsIf: [
        'a fear, a pull or a relationship pattern seems to have no explanation in this life',
        'you feel drawn to a place, a culture or an era without knowing why',
        'you would like to explore the yogic teaching of samskara and karma through experience, not only ideas'
      ],
      takeHome: 'An audio recording of your journey, if you wish, and written integration notes.',
      goodToKnow: 'You do not need to believe in reincarnation, and we make no claim to prove past lives. The session is not used to search for memories of events in this life. If you have never experienced deep guided relaxation, a Yoga Nidra session first is a gentle preparation.',
      timeline: [
        { time: '20 min', title: 'Conversation', desc: 'Your intention and questions, and what you would like to understand.' },
        { time: '10 min', title: 'Relaxation', desc: 'Breath and body settling into a deep, calm state.' },
        { time: '40 min', title: 'The journey', desc: 'Guided step by step, you describe whatever you notice: places, people, feelings. You stay aware and can pause or open your eyes at any moment.' },
        { time: '20 min', title: 'Return and integration', desc: 'A gentle return, then together we look at what the journey means for your life now, and choose one practice to carry it forward.' }
      ],
      steps: [
        '20 min · Conversation: Your intention & questions + 10 min · Relaxation',
        '40 min · The Journey: Guided step-by-step exploration of impressions',
        '20 min · Return & Integration: Meaning for your life now & practice'
      ]
    }
  ];
  // 6 Sacred Pastel Themes
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
    ...this.consultationServices,
    { title: 'Personalized Vedic Astrology Consultation', description: 'A one-on-one reading of your birth chart — karmic patterns, timing, and practical guidance.', icon: 'fa-moon', price: 90, originalPrice: 99, category: 'Astrology' },
    { title: 'Comprehensive Life Analysis™', description: 'A complete, in-depth review of your chart across career, relationships, health, and finances.', icon: 'fa-scroll', price: 180, originalPrice: 250, category: 'Astrology' },
    { title: 'Kapi Master Life Strategy™', description: "Our most complete offering — a multi-session strategy blueprint for your life's biggest decisions.", icon: 'fa-crown', price: 299, originalPrice: 399, category: 'Astrology' },
    { title: 'Kapi Annual Life Blueprint™', description: 'A year-ahead forecast across the key areas of your life, planet by planet, month by month.', icon: 'fa-calendar-days', price: 199, originalPrice: 225, category: 'Astrology' },
    { title: 'Commercial Vastu Blueprint™ (Online)', description: 'Remote Vastu correction for offices and commercial spaces — no demolition required.', icon: 'fa-building', price: 399, originalPrice: 499, category: 'Vastu' },
    { title: 'Commercial Vastu Blueprint™ — On-Site', description: 'An in-person Vastu audit and correction plan for your office, shop, or commercial property.', icon: 'fa-house-chimney', price: 599, originalPrice: 699, category: 'Vastu' },
    { title: 'Kapi Vedic Numerology Blueprint™', description: 'Your birth number, name number, and compatibility — decoded and applied to real decisions.', icon: 'fa-hashtag', price: 199, originalPrice: 225, category: 'Numerology' },
    { title: 'Kapi Samudrika Blueprint™', description: 'Classical Vedic palmistry and face reading, read together for a fuller picture of character and destiny.', icon: 'fa-hand', price: 199, originalPrice: 225, category: 'Wellness' },
    { title: 'Kapi AyurJyotish Health Blueprint™', description: "Your astrological chart read through an Ayurvedic lens — dosha, vulnerabilities, and daily routine.", icon: 'fa-leaf', price: 249, originalPrice: 300, category: 'Wellness' },
    { title: 'Marriage Timing & Matchmaking Guidance™', description: 'Compatibility analysis (Guna Milan) and auspicious timing guidance for marriage.', icon: 'fa-heart', price: 149, originalPrice: 199, category: 'Harmony' },
    { title: 'Conception & Pregnancy Astrology Guidance™', description: 'Astrological guidance and auspicious timing support through conception and pregnancy.', icon: 'fa-baby', price: 299, originalPrice: 399, category: 'Harmony' },
    { title: 'Education & Academic Success Guidance™', description: "Chart-based guidance on subject choice, exam timing, and a child's academic path.", icon: 'fa-graduation-cap', price: 149, originalPrice: 199, category: 'Career' },
    { title: 'Financial Prosperity & Investment Guidance™', description: 'Astrological timing and guidance for major financial decisions and investments.', icon: 'fa-sack-dollar', price: 249, originalPrice: 399, category: 'Career' },
    { title: 'Loan, Debt & Financial Recovery Guidance™', description: 'Remedial guidance and timing support for recovering from debt and financial setbacks.', icon: 'fa-hand-holding-dollar', price: 249, originalPrice: 300, category: 'Career' },
    { title: 'Kapi Legal Strategy Blueprint™', description: 'Astrological insight and timing guidance to support ongoing legal matters.', icon: 'fa-scale-balanced', price: 399, originalPrice: 499, category: 'Astrology' },
    { title: 'Kapi Global Mobility Blueprint™', description: 'Guidance on the most auspicious timing and direction for relocation or travel abroad.', icon: 'fa-plane', price: 249, originalPrice: 299, category: 'Astrology' }
  ];

  readonly filteredServices = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') return this.services;
    return this.services.filter(s => s.category === cat);
  });

  formatPrice(value: number | string): string {
    if (typeof value === 'string') {
      return value;
    }
    return '€' + value.toLocaleString('de-DE');
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: '1-on-1 Vedic Consultations | Maharishi Kapi Institute',
      description: "Personal, fixed-price consultations with Acharya Alok Awasthi — Vedic astrology, Vastu, numerology, and life-strategy blueprints.",
      path: '/services',
      keywords: 'Vedic astrology consultation, online Vastu consultation, birth chart reading, numerology',
    });
  }
}