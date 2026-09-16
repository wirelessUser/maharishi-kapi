export type Category = 
  | 'Astrology' | 'Numerology' | 'Tarot' | 'Vastu' | 'Palmistry' 
  | 'Wellness' | 'Timing & Muhurta' | 'Specialization' 
  | 'Foundational Jyotish' | 'Intermediate Jyotish' 
  | 'Professional Jyotish' | 'Advanced Jyotish' | 'Research & Mastery';

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface CourseDetail {
  slug: string;              // Restored!
  title: string;
  sanskritTag?: string;
  category: Category;
  level: string;             // Restored!
  image: string;
  price: number;
  originalPrice: number;     // Restored!
  tagline: string;           // Restored!
  description: string;       // Restored!
  duration: string;
  format: string;            // Restored!
  language: string;
  prerequisites: string;     // Restored!
  whoFor: string[];          // Restored!
  modules: CourseModule[];
  included: string[];        // Restored!
  certification: string;
}

// =========================================================================
// THE MASTER COURSE DATABASE
// =========================================================================
export const COURSES: CourseDetail[] = [
  // =========================================================
  // 1. VEDIC ASTROLOGY
  // =========================================================
 {
    slug: 'astrology-level-1',
    title: 'Vedic Astrology Foundations – Level 1',
    sanskritTag: 'कुण्डली विज्ञान',
    category: 'Astrology',
    level: 'Beginner',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Vedic%20Astrology%20Foundations%20%E2%80%93%20Level%201.png',
    price: 145,
    originalPrice: 220,
    tagline: 'Read your first birth chart with confidence — zero prior knowledge needed.',
    description: 'This course introduces the core building blocks of astrology—planets, signs, houses, and horoscope structure—enabling students to read and understand birth charts with confidence. We focus on conceptual clarity, planetary psychology, and basic predictive understanding, making it suitable for personal growth or as a professional foundation.',
    duration: '18 Hours (Spread over 10 Days)',
    format: 'Available Online & Offline',
    language: 'Taught in Hindi & English',
    prerequisites: 'No prior knowledge of astrology is required.',
    whoFor: [
      'Absolute beginners wanting a clean and non-overwhelming learning experience',
      'Seekers looking to use astrology as a tool for self-awareness and healing',
      'Healers, counselors, and yoga professionals seeking holistic integration'
    ],
    included: [
      'Comprehensive PDF Guide included',
      'Practical chart observation and interpretation exercises',
      'Certificate provided upon successful completion'
    ],
    certification: 'Certified by Arka Connection Institute of Astrology & Vedic Sciences, Bharat',
    modules: [
      { 
        title: 'Module 1: Introduction to Vedic Astrology', 
        topics: [
          'Understanding Jyotish Shastra as a Vedanga (limb of Vedic knowledge).', 
          'The interplay of Karma, Destiny, and Free Will.',
          'The scope and purpose of astrology in modern life.'
        ] 
      },
      { 
        title: 'Module 2: Structure of a Horoscope', 
        topics: [
          'Anatomy of a Birth Chart (Kundli).', 
          'The Zodiac system and chart layouts.',
          'The Lagna (Ascendant) and its pivotal importance.',
          'Understanding chart directions and placements.'
        ] 
      },
      { 
        title: 'Module 3: The Navagrahas (Nine Planets)', 
        topics: [
          'Deep dive into Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn.', 
          'Rahu and Ketu: The influence of the Shadow Planets.',
          'Natural significations (Karakas) and planetary psychology.'
        ] 
      },
      { 
        title: 'Module 4: The 12 Zodiac Signs (Rashis)', 
        topics: [
          'Nature, elements, and qualities of the signs.', 
          'Categorization: Movable, Fixed, and Dual signs.',
          'Strengths, weaknesses, and behavioral tendencies.',
          'The relationship between planets and their signs.'
        ] 
      },
      { 
        title: 'Module 5: The 12 Houses (Bhavas)', 
        topics: [
          'Life areas governed by each house (Health, Career, Finance, Marriage, etc.).', 
          'Classification of houses and their impact on planetary results.'
        ] 
      },
      { 
        title: 'Module 6: Planetary Strength & Weakness', 
        topics: [
          'Concepts of Exaltation and Debilitation.', 
          'Dignity: Own sign, Friendly sign, and Enemy sign.',
          'How planetary dignity impacts life results.'
        ] 
      },
      { 
        title: 'Module 7: Benefics, Malefics & Planetary Relationships', 
        topics: [
          'Natural vs. Functional benefic and malefic planets.', 
          'Planetary friendship (Maitri): Friends, enemies, and neutrals.',
          'Role of relationships in assessing overall chart strength.'
        ] 
      },
      { 
        title: 'Module 8: Bhavat Bhavam Principle', 
        topics: [
          'The concept of “house-to-house” relationships.', 
          'Understanding derived house influences (e.g., the 5th from the 5th).',
          'Practical application in complex chart interpretation.'
        ] 
      },
      { 
        title: 'Module 9: Introduction to Horoscope Casting', 
        topics: [
          'Accurate birth details and chart preparation.', 
          'Understanding planetary positions and degrees.',
          'Step-by-step guide to basic chart reading and self-analysis.'
        ] 
      },
      { 
        title: 'Module 10: Foundation of Predictive Thinking', 
        topics: [
          'Synthesis: Connecting Planet + Sign + House.', 
          'How to avoid common beginner mistakes in interpretation.'
        ] 
      },
      { 
        title: 'Module 11: Practice & Ethical Guidance', 
        topics: [
          'Practical chart observation and interpretation exercises.', 
          'The ethical responsibility and code of conduct for an astrologer.',
          'Limitations and the “Right Use” of astrological knowledge.'
        ] 
      }
    ]
  },
  {
    slug: 'astrology-level-2',
    title: 'Vedic Astrology Intermediate – Level 2',
    sanskritTag: 'मध्यम ज्योतिष',
    category: 'Astrology',
    level: 'Intermediate',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Predictive%20Astrology%20Mastery%20%E2%80%93%20Level%202.png',
    price: 245,
    originalPrice: 320,
    tagline: 'Deepen your understanding of horoscope interpretation and predictive astrology.',
    description: 'Building upon foundational knowledge, this level introduces house lord analysis, Yogas, advanced planetary strength concepts, and practical prediction techniques. It equips students to interpret real charts with confidence.',
    duration: '40 Hours (20 Days)',
    format: 'Live Online & Offline',
    language: 'Hindi & English',
    prerequisites: 'Completion of Level 1 or prior working knowledge of planets, signs, and houses.',
    whoFor: ['Level 1 graduates ready to go deeper', 'Students building toward professional consultation', 'Practitioners who want confident yoga identification'],
    included: ['Advanced PDF Guide', 'Online & offline instruction options', 'Professional certificate'],
    certification: 'Professional Certificate provided',
   modules: [
      { 
        title: 'Module 1: Planetary Strength & Maraka Concepts', 
        topics: [
          'Digbala: Directional strength of planets.', 
          'Maraka Planets: Understanding life-event influences and longevity markers.',
          'Assessing the overall effectiveness of a planet in a chart.'
        ] 
      },
      { 
        title: 'Module 2: Karak Bhav Nasham', 
        topics: [
          'Understanding planetary significators (Karakas).', 
          'Identifying when significations weaken or conflict.',
          'Practical implications in real-life predictions.'
        ] 
      },
      { 
        title: 'Module 3: Planetary Placement in Houses', 
        topics: [
          'In-depth effects of planets across all twelve houses.', 
          'Detailed interpretation of Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn.',
          'The karmic role and impact of Rahu and Ketu in house placements.'
        ] 
      },
      { 
        title: 'Module 4: House Lord Placement Analysis', 
        topics: [
          '1st to 12th house lords placed in all twelve houses.', 
          'Mapping life-area outcomes through lordship dynamics.'
        ] 
      },
      { 
        title: 'Module 5: Yoga Identification (Part 1)', 
        topics: [
          'Recognition and results of: Kartari, Amala Kirti, Parvat, Kahala, Chamar.',
          'Understanding Shankh, Bheri, Mridang, Srinath, and Dharma Karma Adhipati Yoga.'
        ] 
      },
      { 
        title: 'Module 6: Advanced Yogas & Raj Yogas', 
        topics: [
          'Panch Mahapurush Yogas: Five Great Person combinations.', 
          'Raj Yogas: Combinations for success and authority.',
          'Vipareet Raj Yogas: Success through challenges.',
          'Neech Bhang Raj Yogas: Cancellation of debilitation.'
        ] 
      },
      { 
        title: 'Module 7: Shani Sade Sati', 
        topics: [
          'The astronomical concept and phases of Sade Sati.', 
          'Psychological impact and life-event patterns.',
          'Predictive understanding and timing of Saturn’s transit.'
        ] 
      },
      { 
        title: 'Module 8: Sarp Dosha', 
        topics: [
          'Identification of Sarp Dosha in a horoscope.', 
          'Effects on life, lineage, and relationships.',
          'Interpretive understanding for counseling.'
        ] 
      }
    ]
  },
{
    slug: 'astrology-level-3',
    title: 'Professional Jyotish Consultant – Level 3',
    sanskritTag: 'ज्योतिषाचार्य',
    category: 'Astrology',
    level: 'Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Professional%20Jyotish%20Consultant%20%E2%80%93%20Level%203.png',
    price: 345,
    originalPrice: 420,
    tagline: 'Master professional prediction techniques and conduct real-life consultations.',
    description: 'This course is the pinnacle of our Jyotish program, designed for students who wish to master professional prediction techniques and conduct real-life consultations with confidence, precision, and grace. It shifts focus toward the "When" and "How" of astrology—mastering Dashas, Transits, Divisional Charts, and Remedial measures to transform knowledgeable students into competent, ethical professionals.',
    duration: '40 Hours (Spread over 20 Days)',
    format: 'Available Online & Offline',
    language: 'Hindi & English',
    prerequisites: 'Completion of Level 2 or a strong working knowledge of chart interpretation.',
    whoFor: [
      'Serious students preparing to take on real clients',
      'Practitioners wanting to build confidence through mock-consultation experience',
      'Aspiring professional astrologers seeking mastery over timing techniques'
    ],
    included: [
      'Professional-grade PDF Guide included',
      'Mock consultation practice',
      'Anonymized real-life case study analysis'
    ],
    certification: 'Certified Advanced Vedic Astrology Practitioner',
    modules: [
      { 
        title: 'Module 1: Dasha System & Predictive Timing', 
        topics: [
          'Mastering the Vimshottari Dasha system (Planetary periods).', 
          'Interpreting Mahadasha and Antardasha layers.',
          'Pinpointing the timing of major life events.',
          'Advanced predictive application of planetary sequences.'
        ] 
      },
      { 
        title: 'Module 2: Transit (Gochara) Analysis', 
        topics: [
          'The significance of planetary transits in real-time.', 
          'How moving planets activate the natal chart.',
          'The “Double Transit” theory (Jupiter and Saturn).',
          'Synthesizing Dashas with Transits for precise event-based prediction.'
        ] 
      },
      { 
        title: 'Module 3: Divisional Charts (Varga System)', 
        topics: [
          'The importance of Varga charts in micro-analysis.', 
          'D9 Navamsa: Deep dive into marriage, dharma, and planetary strength.',
          'D10 Dashamsha: Analyzing professional success and career trajectory.',
          'Methods for synthesizing divisional charts with the main D1 (Rashi) chart.'
        ] 
      },
      { 
        title: 'Module 4: Education & Academic Achievement', 
        topics: [
          'Academic Excellence & Higher Education.', 
          'Professional Qualifications.',
          'Educational Challenges.',
          'Overseas Education.'
        ] 
      },
      { 
        title: 'Module 5: Wealth & Finance Astrology', 
        topics: [
          'Wealth Creation & Financial Stability.', 
          'Business Success & Investments.',
          'Financial Losses & Bankruptcy Patterns.',
          'Prosperity Yogas.'
        ] 
      },
      { 
        title: 'Module 6: Career & Professional Astrology', 
        topics: [
          'Identifying primary career indicators.', 
          'Planetary combinations for jobs, business, and government service.',
          'Analyzing career shifts, promotions, and professional setbacks.',
          'Timing career growth and industry changes.'
        ] 
      },
      { 
        title: 'Module 7: Marriage & Relationship Astrology', 
        topics: [
          'Timing the arrival of a life partner.', 
          'Analyzing spouse characteristics and relationship patterns.',
          'Professional compatibility (Synastry) analysis.',
          'Navigating challenges and identifying spiritual growth in relationships.'
        ] 
      },
      { 
        title: 'Module 8: Foreign Travel & Settlement', 
        topics: [
          'Foreign Travel & Higher Studies Abroad.', 
          'Overseas Employment & Immigration.',
          'Permanent Settlement & International Business.'
        ] 
      },
      { 
        title: 'Module 9: Progeny: Children & Family-Planning', 
        topics: [
          'Childbirth and Delay in Progeny.', 
          'Family Expansion.',
          'Parent–Child Dynamics.'
        ] 
      },
      { 
        title: 'Module 10: Astrological Remedies', 
        topics: [
          'The science and philosophy of Vedic remedies.', 
          'Mantras, Gemstones, Yantras, and Seva (charity).',
          'Remedies tailored to specific Dashas and Transits.',
          'Ethical guidelines for recommending remedies in a consultation.'
        ] 
      },
      { 
        title: 'Module 11: Advanced Yogas & Special Combinations', 
        topics: [
          'Assessing the functional strength of Raj Yogas.', 
          'Mastering the nuances of Neech Bhang and Vipareet Raj Yogas.',
          'Practical interpretation of rare planetary alignments.'
        ] 
      },
      { 
        title: 'Module 12: Professional Practice & Case Studies', 
        topics: [
          'A step-by-step framework for professional chart analysis.', 
          'Analyzing real-life case studies (Anonymized).',
          'Mock consultation practice to build student confidence.',
          'Q&A and doubt clarification for complex charts.'
        ] 
      }
    ]
  },

  // =========================================================
  // 2. PRASHNA & NAKSHATRA SPECIALIZATIONS
  // =========================================================
 {
    slug: 'prashna-astrology',
    title: 'Vedic Prashna Astrology — Mastering Horary Prediction',
    sanskritTag: 'प्रश्न ज्योतिष',
    category: 'Astrology',
    level: 'Professional',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Vedic%20Prashna%20Astrology%20%E2%80%93%20Mastering%20the%20Classical%20Science%20of%20Horary%20Prediction.png',
    price: 260,
    originalPrice: 350,
    tagline: 'Learn the art of answering life’s most important questions—one chart, one question, one moment at a time.',
    description: 'Not every client knows their exact birth date, birth time or place, yet the most important questions in life cannot always wait. For thousands of years, Prashna Jyotish (Horary Astrology) has provided a powerful solution. Instead of relying upon birth details, Prashna Astrology analyses the horoscope cast for the exact moment a sincere question is asked, allowing the astrologer to assess the likely outcome, timing and direction of the matter. This comprehensive programme offers a structured study of Classical Prashari Prashna Astrology, combining traditional principles with practical consultation techniques, enabling students to confidently analyse real-life situations through the timeless wisdom of Vedic Astrology.',
    duration: 'Approximately 60–70 Hours (24 Live Interactive Sessions)',
    format: 'Live Interactive Online',
    language: 'English & Hindi',
    prerequisites: 'Existing knowledge of Vedic astrology is assumed.',
    whoFor: [
      'Conduct Consultations Without Birth Details: Master the classical science of answering questions when a reliable birth chart is unavailable.',
      'Strengthen Your Predictive Skills: Develop a structured approach to analysing real-life situations through Prashna.',
      'Learn Authentic Classical Principles: Study the foundations of Prashari Prashna as described in the traditional Jyotish literature.',
      'Apply Astrology to Everyday Life: Gain confidence in answering practical questions related to career, relationships, health, finance, travel and many other life events.',
      'Build Professional Consultation Skills: Learn how to analyse, interpret and communicate Prashna charts responsibly and ethically.'
    ],
    included: [
      '24 Live Interactive Sessions',
      'Approximately 60–70 Hours of Professional Training',
      'Classical Prashari Prashna Methodology',
      'Real Consultation Case Studies & Live Chart Demonstrations',
      'Guided Practical Exercises & Assignments',
      'Downloadable Study Notes & Worksheets',
      'Final Assessment & Lifetime Access to Session Recordings',
      'Professional Certification'
    ],
    certification: 'Certified Vedic Prashna Astrologer — Professional Certification in Prashari Prashna Jyotish Issued by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1 – Foundations of Vedic Prashna Astrology',
        topics: [
          'History and evolution of Prashna Jyotish',
          'Philosophy of Horary Astrology',
          'Types of Prashna',
          'Eligibility of the astrologer and querent',
          'Ethics of Prashna consultation',
          'Casting the Prashna chart',
          'Validity of a question',
          'Importance of time and sincerity'
        ]
      },
      {
        title: 'Module 2 – Principles of Chart Interpretation',
        topics: [
          'Relevant houses',
          'Planetary significators',
          'Functional benefics and malefics',
          'Planetary dignity and strength',
          'House strength',
          'Aspects and Yogas',
          'Moon in Prashna',
          'Nakshatra considerations',
          'Supporting and obstructing influences'
        ]
      },
      {
        title: 'Module 3 – Event Timing in Prashna',
        topics: [
          'Event promise',
          'Planetary activation',
          'Transit principles',
          'Immediate vs delayed outcomes',
          'Judging probability',
          'Timing techniques',
          'Positive and negative indicators'
        ]
      },
      {
        title: 'Practical Applications: Education & Academic Success',
        topics: [
          'School and higher education',
          'Educational interruptions',
          'Lack of interest in studies',
          'Foreign education',
          'Scholarships',
          'Competitive examinations',
          'Interviews',
          'Academic success',
          'Awards and recognition'
        ]
      },
      {
        title: 'Practical Applications: Career, Profession & Business',
        topics: [
          'Career direction',
          'Employment opportunities',
          'Job changes',
          'Promotions',
          'Transfers',
          'Government and private employment',
          'Business growth',
          'Partnerships',
          'Foreign employment',
          'Daily business prospects',
          'Professional recognition'
        ]
      },
      {
        title: 'Practical Applications: Marriage, Love & Relationships',
        topics: [
          'Marriage timing',
          'Love and arranged marriage',
          'Compatibility',
          'Marriage proposals',
          'Delayed marriage',
          'Separation',
          'Divorce',
          'Remarriage',
          'Reconciliation',
          'Foreign marriage',
          'Relationship harmony'
        ]
      },
      {
        title: 'Practical Applications: Children & Family',
        topics: [
          'Childbirth',
          'Fertility',
          'Pregnancy',
          'Miscarriage tendencies',
          'Adoption',
          'Twins',
          'Number of children',
          'Children’s future',
          'Family relationships'
        ]
      },
      {
        title: 'Practical Applications: Health & Well-being',
        topics: [
          'Health concerns',
          'Recovery periods',
          'Surgery',
          'Hospitalisation',
          'Accidents',
          'Chronic illness',
          'Longevity indicators',
          'Preventive health timing',
          'This course teaches astrological analysis and is not a substitute for professional medical advice.'
        ]
      },
      {
        title: 'Practical Applications: Finance, Wealth & Assets',
        topics: [
          'Wealth creation',
          'Financial growth',
          'Loans and debt',
          'Investments',
          'Insurance',
          'Inheritance',
          'Recovery of blocked money',
          'Rental income',
          'Asset accumulation'
        ]
      },
      {
        title: 'Practical Applications: Property & Vehicles',
        topics: [
          'Purchase and sale of property',
          'Construction',
          'Commercial property',
          'Home loans',
          'Rental income',
          'Change of residence',
          'Vehicle purchase',
          'Luxury and commercial vehicles',
          'Theft and recovery'
        ]
      },
      {
        title: 'Practical Applications: Travel & Foreign Matters',
        topics: [
          'Domestic travel',
          'International travel',
          'Visa approval',
          'Foreign settlement',
          'Overseas education',
          'Employment abroad',
          'Return to homeland',
          'Relocation',
          'Pilgrimages'
        ]
      },
      {
        title: 'Practical Applications: Litigation & Legal Matters',
        topics: [
          'Court cases',
          'Appeals',
          'Bail',
          'Legal disputes',
          'Government proceedings',
          'Tax matters',
          'Settlements',
          'Administrative matters',
          'Astrological guidance does not replace professional legal advice.'
        ]
      },
      {
        title: 'Special Prashna Applications',
        topics: [
          'Lost or stolen property',
          'Missing persons',
          'Missing animals',
          'Political questions',
          'News and rumours',
          'Immediate decision-making',
          'Rare and unusual consultation scenarios'
        ]
      },
      {
        title: 'Practical Training',
        topics: [
          'Live Prashna chart analysis',
          'Classical case studies',
          'Practical consultation exercises',
          'Guided assignments',
          'Interactive discussions',
          'Faculty feedback sessions',
          'Final practical assessment'
        ]
      }
    ]
  },
{
    slug: 'nakshatra-vidya',
    title: 'Nakshatra Vidya – The Lunar Mansions of Vedic Astrology',
    sanskritTag: 'नक्षत्र विद्या',
    category: 'Astrology',
    level: 'Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Nakshatra%20Vidya%20%E2%80%93%20The%20Lunar%20Mansions%20of%20Vedic%20Astrology.png',
    price: 295,
    originalPrice: 380,
    tagline: 'Discover the Soul of Vedic Astrology',
    description: 'While zodiac signs reveal the broader framework of a horoscope, Nakshatras (Lunar Mansions) uncover the subtle dimensions of personality, karma, psychology, destiny, and spiritual evolution. They represent one of the oldest and most profound systems within Vedic Astrology, offering insights that often remain hidden when interpreting signs and houses alone. The Nakshatra Vidya – The Lunar Mansions of Vedic Astrology program at Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences is a comprehensive professional study of the 27 Nakshatras and the Abhijit Nakshatra, covering their mythology, deities, symbolism, padas, planetary influences, predictive applications, compatibility, remedial measures, and spiritual significance.',
    duration: 'Comprehensive Professional Modules',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'Designed for serious students and practising astrologers. A working foundation in Vedic astrology is assumed.',
    whoFor: [
      'Serious students and practising astrologers',
      'Practitioners applying Nakshatras in personality analysis and predictive astrology',
      'Astrologers seeking mastery in relationship compatibility and Muhurta',
      'Consultants integrating remedial sciences and spiritual counselling'
    ],
    included: [
      'Horoscope Analysis & Case Studies',
      'Nakshatra-Based Personality Assessment & Pada Interpretation',
      'Planetary Placement & Compatibility Analysis',
      'Muhurta Selection & Remedial Measures Training',
      'Interactive Discussions, Guided Assignments & Faculty Mentoring',
      'Certificate in Nakshatra Vidya upon completion'
    ],
    certification: 'Certificate in Nakshatra Vidya – The Lunar Mansions of Vedic Astrology from Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1 – Foundations of Nakshatra Vidya',
        topics: [
          'What are Nakshatras?',
          'The Lunar Zodiac',
          'Division of the Zodiac into 27 Nakshatras',
          'Abhijit Nakshatra',
          'Astronomical Basis of Nakshatras',
          'Nakshatra Lords',
          'Nakshatra Chakras',
          'Classification of Nakshatras',
          'Fixed, Movable, Fierce & Gentle Nakshatras',
          'Practical Importance in Horoscope Interpretation'
        ]
      },
      {
        title: 'Module 2 – The Inner Science of Every Nakshatra',
        topics: [
          'Presiding Deity (Nakshatra Devata)',
          'Planetary Lord',
          'Symbol',
          'Shakti (Innate Power)',
          'Guna (Sattva, Rajas & Tamas)',
          'Gana (Deva, Manushya & Rakshasa)',
          'Yoni',
          'Nadi',
          'Varna',
          'Element (Mahabhuta)',
          'Gender',
          'Direction',
          'Motivation (Dharma, Artha, Kama & Moksha)',
          'Tree & Sacred Plant',
          'Animal Symbolism',
          'Physical Characteristics',
          'Psychological Nature',
          'Personality Traits',
          'Strengths & Challenges',
          'Spiritual Lessons',
          'Career Tendencies',
          'Health Tendencies',
          'Relationship Patterns',
          'Karmic Themes',
          'Traditional Remedies'
        ]
      },
      {
        title: 'Module 3 – The Four Padas of Every Nakshatra',
        topics: [
          'Meaning of Padas',
          'Navamsha Connection',
          'Pada Characteristics',
          'Psychological Expression',
          'Planetary Behaviour',
          'Predictive Significance',
          'Practical Horoscope Interpretation'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 1',
        topics: [
          'Ashwini',
          'Bharani',
          'Krittika',
          'Rohini'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 2',
        topics: [
          'Mrigashira',
          'Ardra',
          'Punarvasu',
          'Pushya'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 3',
        topics: [
          'Ashlesha',
          'Magha',
          'Purva Phalguni'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 4',
        topics: [
          'Uttara Phalguni',
          'Hasta',
          'Chitra',
          'Swati'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 5',
        topics: [
          'Vishakha',
          'Anuradha',
          'Jyeshtha',
          'Moola'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 6',
        topics: [
          'Purva Ashadha',
          'Uttara Ashadha',
          'Shravana'
        ]
      },
      {
        title: 'Modules 4–10 – Detailed Study: Group 7 & Abhijit',
        topics: [
          'Dhanishtha',
          'Shatabhisha',
          'Purva Bhadrapada',
          'Uttara Bhadrapada',
          'Revati',
          'Abhijit'
        ]
      },
      {
        title: 'Module 11 – Planetary Placement in Nakshatras',
        topics: [
          'Sun in the 27 Nakshatras',
          'Moon in the 27 Nakshatras',
          'Mars in the 27 Nakshatras',
          'Mercury in the 27 Nakshatras',
          'Jupiter in the 27 Nakshatras',
          'Venus in the 27 Nakshatras',
          'Saturn in the 27 Nakshatras',
          'Effects of planetary placement in different Nakshatra Padas',
          'Influence on personality, relationships, profession, health, and spiritual evolution'
        ]
      },
      {
        title: 'Module 12 – Advanced Applications of Nakshatra Vidya',
        topics: [
          'Nakshatras in Predictive Astrology',
          'Nakshatra Dasha Principles',
          'Nakshatra Transit Analysis',
          'Marriage Compatibility through Nakshatras',
          'Muhurta Selection',
          'Medical Astrology through Nakshatras',
          'Career Analysis',
          'Spiritual Evolution',
          'Past-Life Karmic Indications',
          'Timing Important Life Events',
          'Practical Horoscope Analysis'
        ]
      },
      {
        title: 'Module 13 – Nakshatra Remedies & Spiritual Practices',
        topics: [
          'Nakshatra Devata Worship',
          'Mantras',
          'Meditation Practices',
          'Charity (Dana)',
          'Fasting',
          'Gemstones',
          'Rudraksha',
          'Sacred Trees & Plants',
          'Yajna & Homa',
          'Lifestyle Recommendations',
          'Ethical Application of Remedies'
        ]
      },
      {
        title: 'Practical Training',
        topics: [
          'Horoscope Analysis',
          'Nakshatra-Based Personality Assessment',
          'Pada Interpretation',
          'Planetary Placement Analysis',
          'Compatibility Analysis',
          'Muhurta Selection',
          'Real-Life Case Studies',
          'Interactive Discussions',
          'Guided Assignments',
          'Faculty Mentoring'
        ]
      }
    ]
  },

  // =========================================================
  // 3. NUMEROLOGY MASTERY
  // =========================================================
 {
    slug: 'numerology-level-1',
    title: 'Predictive Numerology Essentials — Level 1',
    sanskritTag: 'अङ्क ज्योतिष',
    category: 'Numerology',
    level: 'Beginner',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Predictive%20Numerology%20Essentials%20%E2%80%93%20Level%201.png',
    price: 150,
    originalPrice: 200,
    tagline: 'Understand how numbers influence human life, behavior, destiny, and decision-making.',
    description: 'Predictive Numerology Essentials Course is designed for those who wish to understand how numbers influence human life, behavior, destiny, and decision-making. This course builds a strong foundation in numerology calculations, number psychology, karmic patterns, and practical real-world applications. By the end of this course, students will be able to independently calculate, interpret, and apply numerology for personal guidance and basic professional consultations.',
    duration: '10 Hours (Spread over 5 Days)',
    format: 'Available Online & Offline',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Anyone wishing to understand how numbers influence human life, behavior, destiny, and decision-making.',
      'Students wanting to independently calculate, interpret, and apply numerology for personal guidance.',
      'Practitioners of Yoga, Marma, or Acupressure wanting deep insight into a client’s energetic makeup to make healing sessions targeted and effective.'
    ],
    included: [
      'Comprehensive PDF Guide included',
      'Hands-on Numerology chart preparation',
      'Real-life case studies and famous personalities analysis',
      'Practice exercises designed to build interpretive confidence',
      'Certificate provided upon completion'
    ],
    certification: 'Certificate provided upon completion, Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1: Foundations of Numerology',
        topics: [
          'What is Numerology and its Vedic roots.',
          'How numbers influence human life and destiny.',
          'The science of number vibrations and their impact on the subconscious.'
        ]
      },
      {
        title: 'Module 2: Numbers 1 to 9 – Nature, Behavior & Core Psychology',
        topics: [
          'Detailed meaning and nature of each primary number (1–9).',
          'Personality traits, behavioral patterns, and psychological archetypes.',
          'Identifying the inherent strengths and challenges of each number.'
        ]
      },
      {
        title: 'Module 3: Core Numerology Numbers',
        topics: [
          'Maturity Number: Understanding your life’s direction.',
          'Root Number: The foundation of your personality.',
          'Personality Number: How the world perceives you.',
          'Calculation methods and step-by-step interpretation techniques.'
        ]
      },
      {
        title: 'Module 4: Karmic Numbers & Past-Life Patterns',
        topics: [
          'Karmic Lessons: Identifying what we are here to learn.',
          'Karmic Debt: Understanding numbers that carry past-life baggage.',
          'Decoding behavioral patterns rooted in past-life lessons.'
        ]
      },
      {
        title: 'Module 5: Relationship & Compatibility Numerology',
        topics: [
          'Matching numbers for emotional and spiritual alignment.',
          'Analyzing relationship strengths and potential conflict points.',
          'Using numerology to improve communication and harmony.'
        ]
      },
      {
        title: 'Module 6: Name Numerology',
        topics: [
          'Techniques for Name Number calculation.',
          'The subtle effects of spelling changes on life vibration.',
          'How to choose names that bring balance, success, and prosperity.'
        ]
      },
      {
        title: 'Module 7: Practical Applications of Numerology',
        topics: [
          'Daily Life: Analyzing Mobile, Vehicle, and House numbers.',
          'Finance: Bank account number analysis.',
          'Business: Selecting auspicious business and company names.'
        ]
      },
      {
        title: 'Module 8: A3 Curve & Life Milestones',
        topics: [
          'Mapping major life phases and turning points.',
          'Understanding cycles of success and identifying challenging periods.',
          'Predicting milestones using the A3 Curve methodology.'
        ]
      },
      {
        title: 'Module 9: Practice & Case Studies',
        topics: [
          'Hands-on Numerology chart preparation.',
          'Analyzing real-life case studies and famous personalities.',
          'Practice exercises designed to build interpretive confidence.'
        ]
      },
      {
        title: 'Module 10: Professional Practice & Ethics',
        topics: [
          'Structuring a professional numerology consultation.',
          'How to communicate findings effectively and empathetically.',
          'Ethical guidelines and the practitioner’s responsibility.'
        ]
      }
    ]
  },
 {
    slug: 'numerology-level-2',
    title: 'Advanced Vedic Numerology — Level 2',
    sanskritTag: 'प्रगत अङ्क ज्योतिष',
    category: 'Numerology',
    level: 'Intermediate',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Advanced%20Vedic%20Numerology%20%E2%80%93%20Level%202.png',
    price: 190,
    originalPrice: 250,
    tagline: 'Master prediction, timing analysis, and detailed chart interpretation.',
    description: 'Vedic Numerology Mastery is an advanced predictive course designed for students who already possess foundational knowledge and wish to progress into professional-level prediction, timing analysis, and detailed chart interpretation. This level focuses on advanced calculations, Master Numbers, predictive techniques using Dasha (periods), and specialized branches like Corporate and Health Numerology. We empower you to conduct accurate, ethical, and confident consultations for both individuals and organizations.',
    duration: '20 Hours (Spread over 9 Days)',
    format: 'Available Online & Offline',
    language: 'English',
    prerequisites: 'Completion of Level 1 or foundational knowledge of Numerology.',
    whoFor: [
      'Students with foundational knowledge ready for professional-level prediction and timing analysis.',
      'Consultants seeking to advise individuals and organizations on corporate and health numerology.',
      'Practitioners wanting to master predictive techniques using the Numerological Dasha system.'
    ],
    included: [
      'Advanced Mastery PDF included',
      'Hands-on practice with complex, real-life numerology charts',
      'Interactive Q&A sessions to refine consultative voice',
      'Professional Certificate provided'
    ],
    certification: 'Professional Certificate provided, Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1: Advanced Numerology Calculations',
        topics: [
          'Mastery of complex calculation methods.',
          'Analyzing the interaction and “collision” of different numbers.',
          'Deeper psychological and spiritual interpretation techniques.'
        ]
      },
      {
        title: 'Module 2: Master Numbers & Higher Purpose',
        topics: [
          'In-depth study of Master Numbers: 11, 22, and 33.',
          'Understanding the intense challenges and spiritual responsibilities of these vibrations.',
          'Aligning master number energy with a person’s ultimate life purpose.'
        ]
      },
      {
        title: 'Module 3: Detailed Numerology Chart Analysis',
        topics: [
          'Creating 360-degree complete numerology profiles.',
          'Synthesizing multiple numbers to find a cohesive life story.',
          'Interpreting the overall trajectory of an individual’s life path.'
        ]
      },
      {
        title: 'Module 4: Predictive Numerology & Timing',
        topics: [
          'Advanced timing techniques: When will events happen?',
          'Predicting major life events using the Numerological Dasha (Period) system.',
          'Career, relationship, and life-cycle phase analysis.'
        ]
      },
      {
        title: 'Module 5: Health & Career Numerology',
        topics: [
          'Health: Identifying physical and mental health tendencies through numbers.',
          'Career: Guiding individuals toward their most fulfilling professional paths.'
        ]
      },
      {
        title: 'Module 6: Corporate & Business Numerology',
        topics: [
          'Numerology for brand names, logos, and business identity.',
          'Selecting auspicious company incorporation dates.',
          'Analyzing partnership compatibility and leadership roles within an organization.',
          'Identifying the best cycles for business expansion and investment.'
        ]
      },
      {
        title: 'Module 7: Career Prediction & Professional Growth',
        topics: [
          'Identifying specific industries and professions suited to core numbers.',
          'Predicting career “highs,” transitions, and shift periods.',
          'Analyzing financial growth and stability patterns.',
          'Indicators of professional success and public recognition.'
        ]
      },
      {
        title: 'Module 8: Philosophy & Awareness',
        topics: [
          'The spiritual and mythological significance of numbers.',
          'Integrating meditation and awareness practices into your consultation.',
          'Understanding the “Soul” of each number.'
        ]
      },
      {
        title: 'Module 9: Advanced Practice & Case Studies',
        topics: [
          'Hands-on practice with complex, real-life numerology charts.',
          'Analyzing the numbers of successful corporations and global leaders.',
          'Interactive Q&A sessions to refine your consultative voice.'
        ]
      }
    ]
  },

{
    slug: 'numerology-level-3',
    title: 'The Master Numerologist: Strategic Life Designer — Level 3',
    sanskritTag: 'अङ्क विशारद',
    category: 'Numerology',
    level: 'Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/The%20Master%20Numerologist%20%20Strategic%20Life%20designer%20%E2%80%93%20Level%203.png',
    price: 280,
    originalPrice: 380,
    tagline: 'Master deep predictive accuracy, long-term life mapping, and transformational healing techniques.',
    description: 'The Master Numerologist : Strategic Life designer – Level 3 Program is the highest level of education at Arka Connection. This course is curated for serious practitioners, consultants, and spiritual professionals who wish to master deep predictive accuracy, long-term life mapping, and transformational healing techniques. Level 3 moves beyond simple prediction into Life Design. You will learn to navigate complex destiny conflicts, psychological blocks, and multi-layered karmic timelines with the authority of an elite specialist.',
    duration: '30 Hours (12–14 Days)',
    format: 'Available Online & Offline',
    language: 'English',
    prerequisites: 'Completion of Level 2 or advanced professional standing in Numerology.',
    whoFor: [
      'Serious practitioners, consultants, and spiritual professionals.',
      'Students wanting to master deep predictive accuracy and long-term life mapping.',
      'Practitioners seeking to learn transformational healing techniques and Life Design.',
      'Healers, teachers, and influencers managing public image and ethical authority.'
    ],
    included: [
      'Mastery & Specialization curriculum',
      'Live consultation simulations and high-pressure scenario training',
      'Elite Case Studies & Real-Life Simulations',
      'Teaching, writing & mentorship frameworks',
      'Elite Life-Design Specialist Certification'
    ],
    certification: 'Elite Life-Design Specialist Certification',
    modules: [
      {
        title: 'Module 1: Supreme Numerology Synthesis',
        topics: [
          'Integration of Core, Compound, Master, and Karmic numbers.',
          'Resolving conflicts between dominant and suppressed vibrations.',
          '“Pattern Recognition”: Reading the hidden layers of a chart.'
        ]
      },
      {
        title: 'Module 2: Advanced Dasha Cycles & Destiny Mapping',
        topics: [
          'Mapping 10–30 year long-term life trajectories.',
          'Identifying “Destiny Acceleration” vs. “Resistance” phases.',
          'Recognizing irreversible karmic turning points.'
        ]
      },
      {
        title: 'Module 3: Crisis, Trauma & Psychological Numerology',
        topics: [
          'Decoding the numerology of emotional blocks and childhood wounds.',
          'Identifying numbers linked to anxiety, addictions, and inner conflict.',
          'Healing Science: Awareness strategies, color therapy, and habit alignment.'
        ]
      },
      {
        title: 'Module 4: Karmic Healing & Life Correction',
        topics: [
          'Advanced strategies for resolving deep Karmic Debt.',
          'Moving beyond surface remedies: Behavioral corrections and rituals.',
          'Guiding clients out of repetitive “Life Loops.”'
        ]
      },
      {
        title: 'Module 5: Soul Purpose & Life Mission',
        topics: [
          'Identifying “Soul Contracts” through number combinations.',
          'Decoding a client’s life mission beyond just their career.',
          'Aligning daily profession with spiritual Dharma.'
        ]
      },
      {
        title: 'Module 6: Leadership, Power & Influence',
        topics: [
          'The numerology of authority: Managing fame and public image.',
          'Public vibration for healers, teachers, and influencers.',
          'Managing the ethical responsibility of power.'
        ]
      },
      {
        title: 'Module 7: High-Level Corporate & Global Numerology',
        topics: [
          'Strategic numerology for multinational business and global expansion.',
          'Timing for mergers, acquisitions, and restructuring.',
          'Global cycles: Numerology of brands and governments.'
        ]
      },
      {
        title: 'Module 8: Teaching, Writing & Mentorship Training',
        topics: [
          'How to design and teach your own numerology workshops.',
          'Building authority as an expert, author, or mentor.',
          'Ethical mentorship: Turning practitioners into torchbearers.'
        ]
      },
      {
        title: 'Module 9: Elite Case Studies & Real-Life Simulations',
        topics: [
          'Deep dives into complex charts (Success, Failure, Loss, and Transformation).',
          'Live consultation simulations and handling high-pressure client scenarios.',
          'Building the confidence to consult under uncertainty.'
        ]
      },
      {
        title: 'Module 10: Spiritual Ethics & Responsibility',
        topics: [
          'The philosophy of Free Will vs. Destiny.',
          'Conscious consulting: Avoiding fear-based predictions.',
          'Maintaining karmic accountability as an advanced practitioner.'
        ]
      }
    ]
  },

  // =========================================================
  // 4. TAROT
  // =========================================================
 {
    slug: 'kapi-tarot',
    title: 'The Kapi Tarot System™',
    sanskritTag: 'टैरो प्रज्ञा',
    category: 'Tarot',
    level: 'Beginner to Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/The%20Kapi%20Tarot%20System%E2%84%A2%20Program.png',
    price: 260,
    originalPrice: 320,
    tagline: 'Mastering Tarot Consultation, Symbolic Interpretation & Conscious Guidance',
    description: 'Anyone can memorise Tarot card meanings. Professional Tarot consultants understand people. They recognise emotional patterns, life transitions, relationship dynamics, career crossroads, unconscious beliefs and hidden opportunities. Most importantly, they help clients gain clarity—not dependency. The Kapi Tarot System™ is a comprehensive professional certification designed to transform beginners and experienced practitioners into confident, ethical and insightful Tarot consultants. Developed by Acharya Alok Awasthi, this programme combines classical Tarot, symbolic interpretation, archetypal psychology, consultation methodology, Vedic wisdom and practical coaching skills into one structured learning system.',
    duration: '90+ Hours (36 Live Interactive Sessions)',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'None. Complete pathway from foundation to mastery.',
    whoFor: [
      'Aspiring professional Tarot consultants seeking ethical and structured training.',
      'Coaches, healers, and counsellors wanting to integrate Tarot into their practice.',
      'Individuals wishing to deepen their understanding of human behaviour, conscious living, and archetypal psychology.'
    ],
    included: [
      '36 Live Interactive Sessions (90+ Hours of Founder-Led Training)',
      'Live Demonstrations & Case Study Library',
      'Guided Reading Practice & Faculty Feedback Sessions',
      'Comprehensive Learning Manual & Workbook',
      'Tarot Reflection Journal',
      'Professional Consultation Templates',
      'Reading Portfolio Development',
      'Lifetime Access to Session Recordings',
      'Portfolio-Based Assessment & Professional Certification'
    ],
    certification: 'Certified Kapi Tarot Acharya™ — Professional Certification in Tarot Consultation & Symbolic Interpretation Issued by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1 – Foundations of Tarot',
        topics: [
          'History and evolution of Tarot',
          'Philosophy of Tarot',
          'Destiny and free will',
          'Ethics of consultation',
          'Intuition versus observation',
          'Scope and limitations of Tarot'
        ]
      },
      {
        title: 'Module 2 – The Language of Symbols',
        topics: [
          'Archetypes',
          'Symbolism',
          'Colours',
          'Numbers',
          'Elements',
          'Mythological themes',
          'Sacred imagery',
          'Symbolic storytelling'
        ]
      },
      {
        title: 'Module 3 – The Journey of the Major Arcana',
        topics: [
          'Study the complete transformational journey of the 22 Major Arcana as stages of human growth, consciousness and life experience.'
        ]
      },
      {
        title: 'Module 4 – Mastering the Minor Arcana',
        topics: [
          'Wands – Purpose, ambition and creativity',
          'Cups – Emotions and relationships',
          'Swords – Thoughts, communication and conflict',
          'Pentacles – Career, wealth and material life'
        ]
      },
      {
        title: 'Module 5 – Professional Reading Techniques',
        topics: [
          'Card combinations',
          'Multi-card interpretation',
          'Story-based reading',
          'Clarifier cards',
          'Professional spreads',
          'Decision-making layouts',
          'Relationship readings',
          'Career readings',
          'Annual guidance spreads'
        ]
      },
      {
        title: 'Module 6 – Consultation Psychology & Communication',
        topics: [
          'Building rapport',
          'Active listening',
          'Asking effective questions',
          'Understanding emotional patterns',
          'Professional boundaries',
          'Responsible communication',
          'Consultation ethics',
          'Delivering guidance with confidence'
        ]
      },
      {
        title: 'Module 7 – Tarot for Life Guidance',
        topics: [
          'Relationships & compatibility',
          'Career & business decisions',
          'Financial planning',
          'Family dynamics',
          'Personal growth',
          'Life transitions',
          'Confidence building',
          'Decision-making',
          'Spiritual exploration',
          'Purpose and direction'
        ]
      },
      {
        title: 'Module 8 – Tarot & Vedic Wisdom',
        topics: [
          'Tarot & Astrology',
          'Tarot & Numerology',
          'Planetary symbolism',
          'Meditation',
          'Mantras',
          'Ethical spiritual guidance',
          'Holistic consultation'
        ]
      },
      {
        title: 'Module 9 – Tarot for Personal Transformation',
        topics: [
          'Shadow work',
          'Self-reflection',
          'Journaling',
          'Emotional awareness',
          'Values clarification',
          'Personal development',
          'Conscious living'
        ]
      },
      {
        title: 'Module 10 – Building a Professional Practice',
        topics: [
          'Consultation workflow',
          'Online and offline consultations',
          'Client documentation',
          'Consultation reports',
          'Professional ethics',
          'Pricing your services',
          'Building long-term client trust',
          'Creating a sustainable practice'
        ]
      },
      {
        title: 'Module 11 – Guided Practicum',
        topics: [
          'Live demonstrations',
          'Guided readings',
          'Faculty-reviewed practice',
          'Case discussions',
          'Interactive learning',
          'Consultation simulations',
          'Professional feedback'
        ]
      },
      {
        title: 'Module 12 – Master Assessment & Certification',
        topics: [
          'Practical consultations',
          'Case analysis',
          'Reading portfolio',
          'Final assessment',
          'Individual feedback',
          'Professional certification'
        ]
      }
    ]
  },

  // =========================================================
  // 5. VASTU SHASTRA
  // =========================================================
{
    slug: 'vastu-consultant',
    title: 'Kapi Vastu Consultant™',
    sanskritTag: 'वास्तु सलाहकार',
    category: 'Vastu',
    level: 'Foundational Professional',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Vastu%20Consultant%E2%84%A2.jpg',
    price: 410,
    originalPrice: 500,
    tagline: 'Mastering Vedic Vastu for Homes, Properties & Conscious Living',
    description: 'Kapi Vastu Consultant™ is a comprehensive professional programme designed to establish a strong foundation in the principles, philosophy and practical application of Vastu Shastra. The programme combines classical Vastu concepts with a systematic consultation methodology, enabling students to understand land, directions, elements, spatial zones, Vastu Purusha Mandala and architectural planning and apply these principles to real-world residential and basic commercial spaces. Rather than encouraging students to memorise isolated rules, the programme teaches them how to observe, analyse, prioritise and communicate Vastu recommendations professionally.',
    duration: 'Structured Theory + Practical',
    format: 'Live Online & Offline',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Vastu Shastra Fundamentals – Understand the origin, philosophy, principles and practical purpose of Vastu Shastra.',
      'Pancha Mahabhuta – Study the five elements—Prithvi, Jala, Agni, Vayu and Akasha—and their relationship with space and human life.',
      'Directions & Energy Zones – Understand cardinal and intercardinal directions, their characteristics and their role in spatial planning.',
      'Vastu Purusha Mandala – Learn the fundamental Vastu grid and its application in analysing plots, buildings and individual spaces.',
      'Site & Plot Analysis – Evaluate plot shape, orientation, slope, roads, surroundings, open spaces and other important site characteristics.',
      'Residential Vastu – Analyse entrances, bedrooms, kitchens, living spaces, bathrooms, staircases, study areas, prayer spaces and other residential zones.',
      'Basic Commercial Vastu – Understand the foundational Vastu principles applicable to offices, shops, studios, clinics and small business spaces.',
      'Vastu Defects & Corrections – Learn how to identify significant spatial imbalances and develop practical, proportionate correction strategies.',
      'Professional Consultation – Learn how to conduct a Vastu consultation systematically—from client briefing and site assessment to recommendations and report preparation.'
    ],
    included: [
      'Theoretical instruction & comprehensive learning materials',
      'Real-world case studies & floor-plan analysis exercises',
      'The Kapi Vastu Consultation Method™ training',
      'Pancha Mahabhuta mapping and directional assessment assignments',
      'Final practical assessment',
      'Professional Certification'
    ],
    certification: 'Kapi Vastu Consultant™ Professional Certification by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'MODULE 1 — Foundations of Vastu Shastra',
        topics: [
          'Understanding the Vedic Science of Space',
          'Meaning and definition of Vastu',
          'Origin and historical development of Vastu Shastra',
          'Vastu within the Vedic knowledge tradition',
          'Purpose and philosophy of Vastu',
          'Relationship between Vastu and architecture',
          'Relationship between humans, nature and built environments',
          'Traditional Vastu principles',
          'Classical vs contemporary approaches',
          'Common misconceptions about Vastu',
          'Scope and limitations of Vastu consultancy',
          'Learning Objective: Develop a clear conceptual understanding of what Vastu is, what it is intended to accomplish and how it should be approached responsibly.'
        ]
      },
      {
        title: 'MODULE 2 — Pancha Mahabhuta',
        topics: [
          'The Five Elements & Spatial Harmony',
          'Prithvi — Earth',
          'Jala — Water',
          'Agni — Fire',
          'Vayu — Air',
          'Akasha — Ether/Space',
          'Qualities of the five elements',
          'Elemental relationships',
          'Elemental balance and imbalance',
          'Elements and directions',
          'Elements and spatial functions',
          'Elemental influence within built environments',
          'Recognising elemental characteristics within a property',
          'Practical Exercise: Pancha Mahabhuta Mapping of a Property'
        ]
      },
      {
        title: 'MODULE 3 — Directions & Spatial Orientation',
        topics: [
          'Understanding the Vastu Compass',
          'Cardinal directions and Intercardinal directions',
          'North, South, East, West',
          'Northeast, Southeast, Southwest, Northwest',
          'Centre / Brahmasthana',
          'Directional characteristics and Directional functionality',
          'Elemental associations',
          'Understanding orientation: Magnetic direction vs architectural orientation',
          'Using a compass for Vastu assessment',
          'Practical Exercise: Prepare a complete directional map of a property.'
        ]
      },
      {
        title: 'MODULE 4 — Vastu Purusha Mandala',
        topics: [
          'The Sacred Planning Grid',
          'Concept of Vastu Purusha and Symbolism of Vastu Purusha',
          'Vastu Purusha Mandala structure',
          'Basic grid divisions',
          'Padas and spatial divisions',
          'Centre and peripheral zones',
          'Brahmasthana',
          'Relationship between Mandala and architecture',
          'Applying the Mandala to a plot',
          'Applying the Mandala to a building',
          'Practical Exercise: Overlay and interpret a Vastu Purusha Mandala on sample floor plans.'
        ]
      },
      {
        title: 'MODULE 5 — Land & Plot Vastu',
        topics: [
          'Understanding the Property Before the Building',
          'Importance of site selection',
          'Plot orientation',
          'Plot shape: Square plots, Rectangular plots, Irregular plots',
          'Extensions and reductions, Cut corners',
          'Plot proportions, Land slope, Levels and elevation',
          'Roads surrounding the property and Entry roads',
          'Open spaces, Adjacent buildings, Natural surroundings, Water bodies',
          'External environmental factors',
          'Practical Exercise: Complete a Basic Plot Vastu Assessment.'
        ]
      },
      {
        title: 'MODULE 6 — Spatial Zoning & Functional Placement',
        topics: [
          'Understanding How Space Should Be Used',
          'Directional zones and Elemental zones',
          'Heavy and light zones',
          'Open and closed areas',
          'Active and passive spaces',
          'Movement and circulation',
          'Functional zoning: Appropriate vs Inappropriate spatial functions',
          'Weight distribution and Light distribution',
          'Basic principles of spatial balance',
          'Practical Exercise: Create a functional Vastu zoning plan for a residential property.'
        ]
      },
      {
        title: 'MODULE 7 — Residential Vastu',
        topics: [
          'Vastu for Homes & Living Spaces',
          'Main Entrance: Importance, direction, basic placement, door positioning, door alignment, and surroundings',
          'Major Residential Spaces: Living room, Master bedroom, Children’s bedroom, Guest bedroom',
          'Functional Spaces: Kitchen, Dining area, Study room, Puja/meditation space',
          'Utilities: Bathrooms, Toilets, Staircases, Balconies, Windows, Storage, Utility areas',
          'Additional Considerations: Sleeping orientation, Cooking orientation, Basic furniture placement',
          'Environmental Factors: Natural light, Ventilation, Open spaces, Internal circulation',
          'Practical Exercise: Complete Residential Floor-Plan Analysis'
        ]
      },
      {
        title: 'MODULE 8 — Apartment & Urban Residential Vastu',
        topics: [
          'Modern properties require a separate analytical approach.',
          'Apartment Vastu fundamentals and High-rise living',
          'Entrance analysis and Individual apartment orientation',
          'Floor-level considerations and Balcony placement',
          'Kitchen and bedroom analysis in flats',
          'Common areas, Lift and staircase considerations, Shared building spaces',
          'Limitations of apartment-level corrections',
          'Practical correction strategies for rented properties',
          'Case Study: Analyse a modern apartment floor plan.'
        ]
      },
      {
        title: 'MODULE 9 — Basic Commercial Vastu',
        topics: [
          'Introduction to Vastu for Business Spaces (Offices, Shops, Studios, Small Clinics, Consultation rooms)',
          'Reception areas, Workstations, Owner/management area, Storage',
          'Customer movement, Cash and transaction areas',
          'Basic entrance principles and Employee seating',
          'Productivity-oriented spatial planning',
          'Basic business-space assessment',
          'Practical Exercise: Analyse a small commercial floor plan.'
        ]
      },
      {
        title: 'MODULE 10 — Understanding Vastu Defects',
        topics: [
          'From Rule-Based Thinking to Professional Analysis',
          'What is a Vastu defect? Major vs minor concerns; Structural vs functional concerns',
          'Directional imbalance and Elemental imbalance',
          'Zone-related concerns, Entrance-related concerns, Brahmasthana concerns',
          'Plot-related concerns and External environmental concerns',
          'Severity and prioritisation',
          'Avoiding unnecessary fear-based interpretations',
          'Kapi Principle: A Vastu deviation should be evaluated in context—not every deviation should automatically be treated as a major defect.'
        ]
      },
      {
        title: 'MODULE 11 — Vastu Corrections & Remedial Principles',
        topics: [
          'Correcting Space with Intelligence: Correction vs remedy',
          'Structural correction vs Functional correction',
          'Spatial redistribution and Elemental balancing',
          'Light and ventilation, Colour principles, Natural materials',
          'Decluttering, Furniture and weight management',
          'Symbolic corrections and Non-structural corrections',
          'Practical corrections for rented properties',
          'Prioritising corrections and Cost-conscious remedial planning',
          'Important: Advanced Vastu Devata remedies, Numero Vastu, Astro-Vastu and advanced remedial systems are intentionally reserved for subsequent Kapi Vastu programmes.'
        ]
      },
      {
        title: 'MODULE 12 — Vastu & Conscious Living',
        topics: [
          'Integrating Vastu into Everyday Life',
          'Vastu and lifestyle; Conscious use of space',
          'Cleanliness and order',
          'Natural light and Air circulation',
          'Sleeping environment, Working environment, Study environment',
          'Meditation environment, Food and kitchen environment, Personal space',
          'Relationship between behaviour and environment',
          'Creating harmonious living spaces'
        ]
      },
      {
        title: 'MODULE 13 — The Kapi Vastu Consultation Method™',
        topics: [
          'From Observation to Professional Recommendation',
          'Step 1 — Client Briefing: Understand the client’s concerns, objectives and property history.',
          'Step 2 — Property Documentation: Collect floor plans, dimensions, photographs, orientation and relevant information.',
          'Step 3 — Orientation: Establish the accurate directional framework.',
          'Step 4 — Site Analysis: Evaluate the plot, surroundings, access and external environment.',
          'Step 5 — Mandala Mapping: Apply the appropriate Vastu grid.',
          'Step 6 — Zone Analysis: Evaluate major directional and elemental zones.',
          'Step 7 — Functional Analysis: Assess the placement and use of rooms and activities.',
          'Step 8 — Defect Identification: Identify significant deviations and imbalances.',
          'Step 9 — Prioritisation: Separate critical observations from secondary recommendations.',
          'Step 10 — Correction Strategy: Develop practical and proportionate recommendations.',
          'Step 11 — Client Communication: Explain findings clearly without creating unnecessary fear.',
          'Step 12 — Professional Report: Prepare a structured Vastu consultation report.'
        ]
      },
      {
        title: 'MODULE 14 — Practical Case Studies',
        topics: [
          'Case Study 1: Residential Plot',
          'Case Study 2: Independent House',
          'Case Study 3: Urban Apartment',
          'Case Study 4: Small Office',
          'Case Study 5: Retail / Commercial Space',
          'Case Study 6: Vastu-Deficient Floor Plan',
          'Practise Sequence: Observation → Analysis → Prioritisation → Recommendation → Report'
        ]
      },
      {
        title: 'MODULE 15 — Professional Vastu Practice',
        topics: [
          'Becoming a Responsible Vastu Consultant',
          'Client communication, Consultation etiquette, Professional boundaries',
          'Ethical Vastu practice: Avoiding fear-based consultation, Communicating uncertainty, Managing client expectations',
          'Documentation, Confidentiality, Consultation reports',
          'Basic consultation pricing principles',
          'Follow-up consultations and Building professional credibility',
          'Case documentation and Developing a Vastu consultancy practice'
        ]
      },
      {
        title: 'FINAL PRACTICAL ASSESSMENT',
        topics: [
          'Analyse a plot and establish orientation',
          'Apply the Vastu Purusha Mandala and analyse elemental/directional zones',
          'Evaluate a residential floor plan and basic commercial property',
          'Identify significant Vastu concerns and prioritise recommendations',
          'Develop practical corrections',
          'Conduct a structured consultation and prepare a professional Vastu report'
        ]
      }
    ]
  },

  {
    slug: 'vastu-devta',
    title: 'Kapi Vastu Devta™',
    sanskritTag: 'वास्तु देवता विज्ञान',
    category: 'Vastu',
    level: 'Advanced Specialist',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Vastu%20Devta%E2%84%A2.jpg',
    price: 260,
    originalPrice: 350,
    tagline: 'Mastering Vastu Devatas, Sacred Energy Fields & Numero Vastu',
    description: 'Kapi Vastu Devta™ is an advanced specialist programme dedicated to the deeper energetic dimensions of Vastu Shastra. While Kapi Vastu Consultant™ establishes the fundamentals of Vastu analysis and professional consultation, this programme takes students deeper into the Vastu Purusha Mandala, Vastu Devatas, directional forces, subtle spatial fields and Numero Vastu. Students learn to look beyond the physical placement of rooms and directions and develop a more refined understanding of the energetic intelligence of space. The programme combines traditional Vastu concepts with a structured analytical methodology developed for practical contemporary application.',
    duration: '15-Module Specialist Program',
    format: 'Online Interactive',
    language: 'English',
    prerequisites: 'Kapi Vastu Consultant™ or equivalent foundation.',
    whoFor: [
      'Vastu Devatas – Understand the Devatas associated with the Vastu Purusha Mandala and their symbolic and functional significance.',
      'Advanced Mandala Analysis – Move from basic grid application to deeper analysis of Mandala divisions, Padas and spatial fields.',
      'Directional & Zone Energetics – Study the qualitative characteristics of different spatial zones and their relationship with the larger Vastu framework.',
      'Sacred Spatial Intelligence – Explore the relationship between architecture, consciousness, elemental forces and sacred spatial principles.',
      'Numero Vastu – Learn how numbers associated with properties, residences and businesses can be studied alongside Vastu principles.',
      'Integrated Vastu Analysis – Develop a structured methodology combining Vastu Mandala + Devata principles + spatial energetics + Numero Vastu.'
    ],
    included: [
      'Mandala mapping exercises and Devata identification workshops',
      'Directional analysis, zone interpretation, and property case studies',
      'Numero Vastu calculations for house and business numbers',
      'Integrated floor-plan assessments & guided consultation simulations',
      'Professional report preparation training & faculty feedback',
      'Final practical assessment & Professional Certification'
    ],
    certification: 'Kapi Vastu Devta™ Certified Vastu Devta & Numero Vastu Specialist — Professional Certification by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'MODULE 1 — The Deeper Philosophy of Vastu',
        topics: [
          'From Physical Architecture to Sacred Space',
          'Vastu as a sacred spatial science',
          'Relationship between Vastu and consciousness',
          'Space as an energetic field',
          'Vastu and the relationship between nature and human habitation',
          'Physical, functional and subtle dimensions of space',
          'The concept of harmony in Vedic architecture',
          'Sacred geometry and spatial order',
          'Relationship between form, direction and energy',
          'Vastu as a system of spatial intelligence',
          'Traditional Vastu perspectives on harmonious environments',
          'Learning Objective: Develop a deeper philosophical framework for understanding why spatial organisation matters within the Vastu tradition.'
        ]
      },
      {
        title: 'MODULE 2 — Advanced Vastu Purusha Mandala',
        topics: [
          'The Sacred Grid as an Energetic Map',
          'Advanced understanding of the Vastu Purusha Mandala',
          'Structure and symbolism of the Mandala',
          'Mandala divisions',
          'Padas and spatial fields',
          'Central and peripheral zones',
          'Brahmasthana',
          'Directional sectors',
          'Devata locations within the Mandala',
          'Relationship between Mandala and architecture',
          'Reading the Mandala as a spatial map',
          'Applying the Mandala to different property configurations',
          'Interpreting spatial occupation and activation',
          'Practical Exercise: Advanced Vastu Purusha Mandala Mapping'
        ]
      },
      {
        title: 'MODULE 3 — Vastu Devatas',
        topics: [
          'The Deities & Forces of the Vastu Mandala',
          'Concept of Vastu Devatas',
          'Meaning and purpose of Devata placement',
          'Devata-based interpretation of space',
          'Directional Devatas and Zone-specific Devatas',
          'Major Devatas of the Vastu Purusha Mandala',
          'Symbolism associated with individual Devatas',
          'Functional qualities attributed to different Devata zones',
          'Relationships between Devatas and spatial functions',
          'Devata influence within the Vastu framework',
          'Understanding Devata placement in traditional Vastu planning',
          'Applying Devata principles to property analysis',
          'Practical Exercise: Create a complete Devata Map of a sample property.'
        ]
      },
      {
        title: 'MODULE 4 — Directional Devatas & Spatial Forces',
        topics: [
          'Understanding the Intelligence of the Directions',
          'Direction and Devata relationships',
          'Directional characteristics',
          'Elemental relationships',
          'Spatial functions',
          'Directional strengths and weaknesses',
          'Zone activation and Zone disturbance',
          'Interrelationship between neighbouring zones',
          'Directional transitions',
          'Centre-to-periphery relationships',
          'Understanding spatial balance through Devata principles',
          'Practical Application: Students analyse how different functions interact with their corresponding directional and Devata zones.'
        ]
      },
      {
        title: 'MODULE 5 — Devata-Based Vastu Analysis',
        topics: [
          'From Floor Plan to Energetic Interpretation',
          'Analytical Framework: 1. Establish Orientation',
          '2. Prepare the Vastu Mandala',
          '3. Identify Padas',
          '4. Map the Devatas',
          '5. Identify Occupied Zones',
          '6. Analyse Spatial Functions',
          '7. Identify Significant Zone Disturbances',
          '8. Evaluate Relationships Between Zones',
          '9. Prioritise Observations',
          '10. Develop Appropriate Recommendations',
          'Practical Exercise: Complete a Devata-based analysis of a residential floor plan.'
        ]
      },
      {
        title: 'MODULE 6 — Brahmasthana & Central Spatial Intelligence',
        topics: [
          'Understanding the Heart of the Vastu Field',
          'Concept of Brahmasthana',
          'Central space in Vastu',
          'Importance of openness',
          'Weight and obstruction',
          'Movement and circulation',
          'Light and ventilation',
          'Central spatial balance',
          'Relationship between centre and directional zones',
          'Brahmasthana in traditional architecture',
          'Brahmasthana in modern buildings',
          'Apartments and constrained central spaces',
          'Practical assessment methodology'
        ]
      },
      {
        title: 'MODULE 7 — Energy Fields & Spatial Dynamics',
        topics: [
          'Understanding Subtle Spatial Relationships',
          'Concept of spatial energy fields',
          'Directional interaction',
          'Elemental interaction',
          'Zone relationships',
          'Spatial pressure and openness',
          'Heavy vs light zones',
          'Active vs passive zones',
          'Movement through space',
          'Central and peripheral dynamics',
          'Environmental influences: Natural light, air, water, fire and other features',
          'Identifying spatial disharmony',
          'Kapi Approach: Interpreting energetic concepts within a structured Vastu framework rather than through vague or unsupported claims.'
        ]
      },
      {
        title: 'MODULE 8 — Advanced Zone Interpretation',
        topics: [
          'Understanding Space Beyond Simple Directional Rules',
          'Zone characteristics',
          'Functional compatibility and Elemental compatibility',
          'Devata relationships',
          'Occupation of zones',
          'Excessive activation vs Insufficient activation',
          'Heavy construction and Open areas',
          'Water placement and Fire-related functions',
          'Storage and weight distribution',
          'Movement and circulation',
          'Zone interaction and Priority-based interpretation',
          'Practical Exercise: Advanced Zone Compatibility Analysis'
        ]
      },
      {
        title: 'MODULE 9 — Numero Vastu Fundamentals',
        topics: [
          'The Relationship Between Numbers & Space',
          'Introduction to the numerical dimension of Vastu',
          'What is Numero Vastu?',
          'Philosophical basis of number and spatial symbolism',
          'Numbers and vibrational interpretation',
          'Relationship between numbers and Vastu',
          'Basic numerological principles relevant to property analysis',
          'Number systems used in Numero Vastu',
          'Numerical compatibility',
          'Number and direction relationships',
          'Number and property relationships'
        ]
      },
      {
        title: 'MODULE 10 — Property & House Number Analysis',
        topics: [
          'Reading the Numerical Identity of a Property',
          'House numbers, Apartment numbers, Plot numbers',
          'Property identification numbers, Building numbers, Floor numbers, Unit numbers',
          'Numerical reduction',
          'Compound numbers and Repeating numbers',
          'Number combinations',
          'Positive and challenging numerical patterns',
          'Interpreting numbers in context',
          'Practical Exercise: Complete a Numero Vastu assessment of residential properties.'
        ]
      },
      {
        title: 'MODULE 11 — Business Numero Vastu',
        topics: [
          'Numbers for Commercial Spaces',
          'Business premises numbers, Office numbers, Shop numbers, Unit numbers',
          'Commercial property numbers',
          'Number and business activity',
          'Number and business identity',
          'Number compatibility and Name-to-number relationships',
          'Founder/owner and business-number considerations',
          'Basic number selection principles',
          'Practical Numero Vastu analysis',
          'Practical Exercise: Analyse numerical compatibility for a sample business property.'
        ]
      },
      {
        title: 'MODULE 12 — Name, Number & Space',
        topics: [
          'Integrating Numerology with Vastu',
          'Name vibration, Property number, Business number, Individual number',
          'Basic compatibility principles',
          'Name and property compatibility',
          'Business name and premises compatibility',
          'Numerical harmony and Identifying conflicting numerical patterns',
          'Developing an integrated interpretation',
          'Important Principle: Numero Vastu should be used as an additional analytical layer, not as a replacement for physical Vastu assessment.'
        ]
      },
      {
        title: 'MODULE 13 — Integrated Kapi Vastu Devta Method™',
        topics: [
          'Vastu + Devata + Numero Vastu',
          'Layer 1 — Physical Space: Plot, structure, orientation and architectural configuration.',
          'Layer 2 — Vastu Mandala: Zones, Padas and spatial divisions.',
          'Layer 3 — Devata: Devata placement and zone-specific interpretation.',
          'Layer 4 — Elemental Dynamics: Pancha Mahabhuta relationships.',
          'Layer 5 — Numerical Layer: House, property, business and relevant numbers.',
          'Layer 6 — Integrated Interpretation: Bringing layers together without allowing one factor to dominate.',
          'Layer 7 — Recommendation: Developing proportionate and practical recommendations.'
        ]
      },
      {
        title: 'MODULE 14 — Advanced Case Studies',
        topics: [
          'Case Study 1: Residential Property & Devata Mapping',
          'Case Study 2: Irregular Residential Plot',
          'Case Study 3: Apartment & Restricted Spatial Configuration',
          'Case Study 4: Office & Business Number Analysis',
          'Case Study 5: Retail Property & Numero Vastu',
          'Case Study 6: Integrated Vastu + Devata + Numero Vastu Case',
          'Case Study 7: Complex Property with Multiple Spatial Imbalances',
          'Practise Sequence: Map → Analyse → Interpret → Prioritise → Recommend → Document'
        ]
      },
      {
        title: 'MODULE 15 — Professional Specialist Consultation',
        topics: [
          'Applying Devata & Numero Vastu Responsibly',
          'Conducting an advanced Vastu interview and collecting relevant property information',
          'Preparing Mandala maps and Devata mapping',
          'Numerical data collection and integrating multiple analytical layers',
          'Presenting specialist observations and communicating traditional concepts responsibly',
          'Avoiding fear-based interpretations and avoiding exaggerated claims',
          'Distinguishing observation from interpretation',
          'Preparing an integrated consultation report',
          'Professional ethics, client confidentiality, and scope/limitations of specialist Vastu consultancy'
        ]
      },
      {
        title: 'FINAL PRACTICAL ASSESSMENT',
        topics: [
          '1. Vastu Purusha Mandala: Correctly map the property.',
          '2. Devata Analysis: Identify and interpret relevant Devata zones.',
          '3. Spatial Analysis: Evaluate major functions and their relationship with the Mandala.',
          '4. Energy-Field Interpretation: Identify significant spatial imbalances within the taught framework.',
          '5. Numero Vastu: Analyse relevant property or business numbers.',
          '6. Integrated Assessment: Bring the different analytical layers together.',
          '7. Professional Recommendation: Present clear, proportionate and practical recommendations.',
          '8. Consultation Report: Prepare a structured professional report.'
        ]
      }
    ]
  },

  {
    slug: 'vastu-master',
    title: 'Kapi Vastu Master Practitioner™',
    sanskritTag: 'वास्तु महर्षि',
    category: 'Vastu',
    level: 'Capstone / Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Vastu%20Master%20Practitioner%E2%84%A2.jpg',
    price: 360,
    originalPrice: 450,
    tagline: 'Advanced Multi-Domain Vastu Consultancy & Strategic Advisory',
    description: 'Kapi Vastu Master Practitioner™ is the highest and most comprehensive programme in the Kapi Vastu professional education pathway. Designed for practitioners who have completed Kapi Vastu Consultant™ and Kapi Vastu Devta™, this capstone programme focuses on the application of Vastu principles to complex properties, commercial environments, industrial facilities, institutions, hospitality spaces, wellness environments and large-scale developments. The programme moves beyond basic Vastu diagnosis and specialist Devata analysis into strategic consultancy. Students learn how to assess complex environments, prioritise multiple Vastu considerations, develop practical intervention strategies, communicate recommendations to clients and work on professional projects with greater confidence and structure.',
    duration: '17-Module Capstone Program',
    format: 'Theoretical + Practical',
    language: 'English',
    prerequisites: 'Completion of Kapi Vastu Consultant™ and Kapi Vastu Devta™.',
    whoFor: [
      'Advanced Residential Vastu: Complex homes, apartments, villas, irregular plots and challenging configurations.',
      'Commercial Vastu: Offices, retail spaces, restaurants, hotels, clinics and wellness businesses.',
      'Industrial Vastu: Factories, manufacturing facilities, warehouses, machinery layouts and industrial sites.',
      'Institutional Vastu: Hospitals, educational institutions, corporate campuses, spiritual centres and large facilities.',
      'Astro-Vastu: Integrating Vastu analysis with planetary and horoscope-based considerations.',
      'Advanced Remedial Strategy: Developing proportionate, practical and context-sensitive interventions.',
      'Strategic Vastu Consultancy: Working with complex client requirements and developing professional advisory reports.',
      'Large-Scale Vastu Projects: Understanding the methodology required for campuses, developments and multi-building environments.'
    ],
    included: [
      'Live case analysis and floor-plan interpretation exercises',
      'Multi-domain casework: Commercial, Industrial, Institutional, Hospitality, and Wellness',
      'Astro-Vastu and advanced Numero Vastu integration training',
      'Remedial strategy development and minimal-intervention frameworks',
      'Consultation simulations, professional report writing, and presentation practice',
      'Capstone project mentoring and individual faculty feedback',
      'Written and practical final evaluations with project defense',
      'Professional Certification'
    ],
    certification: 'Kapi Vastu Master Practitioner™ Certified Advanced Vastu Master Practitioner — Professional Certification by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'MODULE 1 — Master Practitioner Framework',
        topics: [
          'From Vastu Consultant to Strategic Advisor',
          'Evolution of Vastu consultancy',
          'Difference between consultant and Master Practitioner',
          'Multi-layered Vastu analysis and analytical hierarchy',
          'Identifying primary vs secondary concerns',
          'Prioritising Vastu observations',
          'Working with conflicting Vastu factors',
          'Balancing traditional principles with modern requirements',
          'Functional considerations in Vastu',
          'Client objectives and spatial requirements',
          'Professional decision-making',
          'Developing a consistent consultation methodology',
          'Master Practitioner Principle: Do not analyse a property through one isolated rule. Analyse the system as a whole.'
        ]
      },
      {
        title: 'MODULE 2 — Advanced Site & Plot Analysis',
        topics: [
          'Reading the Land Before the Building',
          'Advanced plot analysis and orientation',
          'Plot geometry: Regular and irregular plots, extensions and cut-outs',
          'Sloping sites, levels and contours',
          'Road placement, approaches and access',
          'Surrounding structures and adjacent properties',
          'Natural environmental influences: Water bodies, open spaces, landscape considerations',
          'Site selection principles and development potential',
          'Advanced site assessment methodology',
          'Practical Exercise: Complete a full site and plot feasibility assessment.'
        ]
      },
      {
        title: 'MODULE 3 — Advanced Residential Vastu',
        topics: [
          'Complex Homes & Challenging Configurations',
          'Independent houses, villas, apartments, duplexes, multi-storey residences',
          'Irregular floor plans, split-level homes, basement considerations, rooftop spaces',
          'Multiple entrances, internal circulation, staircases',
          'Bedrooms, kitchens, bathrooms, study spaces, pooja and meditation areas',
          'Home offices, garages and parking',
          'Modern architectural constraints',
          'Advanced Casework: Analyzing residential properties where multiple Vastu considerations conflict with practical architectural requirements.'
        ]
      },
      {
        title: 'MODULE 4 — Commercial Vastu',
        topics: [
          'Vastu for Business & Customer-Oriented Spaces',
          'Offices: Reception, leadership spaces, employee areas, meeting rooms, finance departments, records/storage, circulation',
          'Retail: Entrance, display areas, customer movement, billing counters, storage, staff areas',
          'Restaurants & Cafés: Entrance, kitchen, dining areas, service flow, cash counter, storage, utilities',
          'Clinics & Professional Practices: Reception, consultation rooms, treatment spaces, waiting areas, administration, storage',
          'Hotels & Hospitality: Main entrance, lobby, guest rooms, restaurants, kitchens, service areas, administrative spaces, back-of-house planning'
        ]
      },
      {
        title: 'MODULE 5 — Industrial Vastu',
        topics: [
          'Vastu for Factories, Manufacturing & Industrial Systems',
          'Industrial Site Planning: Factory site selection, plot orientation, access/movement, loading/unloading, internal circulation, open/restricted zones',
          'Manufacturing Areas: Production zones, machinery placement, heavy equipment, assembly areas, processing areas, operational flow',
          'Supporting Infrastructure: Warehouses, raw-material storage, finished-goods storage, administrative blocks, worker facilities, utilities, maintenance areas',
          'Fire & High-Energy Zones: Heat-generating equipment, electrical infrastructure, boilers and furnaces, fire-related areas, high-risk operational zones',
          'Strategic Objective: Understand how Vastu principles can be considered alongside safety, engineering, workflow, compliance and operational realities.'
        ]
      },
      {
        title: 'MODULE 6 — Institutional Vastu',
        topics: [
          'Large & Multi-Functional Environments',
          'Educational institutions: Schools, universities, training centres',
          'Healthcare: Hospitals and healthcare facilities',
          'Campuses: Corporate campuses, government buildings, research facilities',
          'Spiritual & Wellness: Spiritual institutions, retreat centres, wellness centres',
          'Institutional Planning: Main entrance, administration, public areas, staff areas, residential areas, service zones, circulation, open spaces, central areas, functional zoning',
          'Advanced Principle: Understanding hierarchy, circulation, functional zoning and operational requirements over mechanical residential rules.'
        ]
      },
      {
        title: 'MODULE 7 — Hospitality, Wellness & Healing Spaces',
        topics: [
          'Designing Environments for Rest, Recovery & Conscious Living',
          'Hotels, retreat centres, yoga centres, meditation spaces',
          'Ayurveda centres, Panchakarma facilities, wellness clinics, spa environments, healing rooms, therapy spaces, residential retreats',
          'Wellness-Space Principles: Reception and arrival experience, treatment areas, meditation spaces, yoga halls, rest areas',
          'Environmental Elements: Water features, natural light, ventilation, landscape, quiet zones, movement and circulation',
          'Practical Exercise: Develop a Vastu strategy for a wellness or retreat facility.'
        ]
      },
      {
        title: 'MODULE 8 — Astro-Vastu',
        topics: [
          'Integrating Jyotisha with Spatial Analysis',
          'Philosophy of Astro-Vastu and relationship between individual and environment',
          'Planetary symbolism and spatial principles',
          'Horoscope-based spatial analysis: Ascendant and directional considerations',
          'Planetary influences, house-specific considerations, property and life-area relationships',
          'Individualised Vastu interpretation',
          'When Astro-Vastu is appropriate vs. limitations of horoscope-based Vastu recommendations',
          'Integrating Astro-Vastu without replacing core Vastu analysis',
          'Practical Case Study: Develop an integrated Astro-Vastu assessment using a birth chart and property plan.'
        ]
      },
      {
        title: 'MODULE 9 — Advanced Numero Vastu',
        topics: [
          'Numbers, Property & Strategic Compatibility',
          'Advanced property-number analysis and business-number analysis',
          'Name and property compatibility, business name and premises',
          'Owner and business compatibility',
          'Numerical selection principles: Apartment and unit numbers, floor numbers, office numbers, commercial property numbers',
          'Number selection for new developments',
          'Integrating numerical analysis with Vastu while avoiding over-reliance on numerical factors',
          'Practical Exercise: Complete an integrated Vastu + Numero Vastu business assessment.'
        ]
      },
      {
        title: 'MODULE 10 — Advanced Vastu Remedial Science',
        topics: [
          'From Diagnosis to Intervention: Observation → Diagnosis → Priority → Intervention → Evaluation',
          'Remedial Categories: Architectural corrections, functional corrections, spatial reorganisation',
          'Elemental balancing, environmental modifications, colour considerations, lighting, landscape, movement/circulation',
          'Symbolic interventions, traditional Vastu remedies, Devata-oriented considerations',
          'Appropriate use of Vastu tools and objects',
          'Remedial hierarchy and minimal-intervention philosophy',
          'Critical Principle: A remedy should address an identified issue; remedies should not be prescribed simply because they are available.'
        ]
      },
      {
        title: 'MODULE 11 — Vastu for Large-Scale Developments',
        topics: [
          'Master Planning & Multi-Building Environments',
          'Residential developments, apartment complexes, townships, corporate campuses, educational campuses, hospital campuses, retreat centres, industrial estates, mixed-use developments',
          'Planning Considerations: Overall orientation, master site grid, entry and exit, internal roads, functional zoning, open spaces, landscape, water systems, utilities',
          'Building hierarchy, central spaces, movement patterns, multiple structures, relationship between buildings',
          'Practical Exercise: Prepare a conceptual Vastu framework for a multi-building development.'
        ]
      },
      {
        title: 'MODULE 12 — Vastu & Modern Architecture',
        topics: [
          'Applying Traditional Principles to Contemporary Buildings',
          'Glass structures, steel structures, high-rise buildings, apartments, compact urban homes, open-plan offices, underground spaces, mixed-use buildings',
          'Modern HVAC systems, mechanical ventilation, smart buildings, contemporary materials',
          'Artificial lighting, limited natural ventilation, adaptive reuse',
          'Master Practitioner Skill: Preserving the principle behind a traditional Vastu concept while working within modern architectural constraints.'
        ]
      },
      {
        title: 'MODULE 13 — Vastu & Environmental Design',
        topics: [
          'Space, Nature & Human Experience',
          'Natural light, ventilation, thermal comfort',
          'Landscape, vegetation, water, noise, privacy, movement, views, open space',
          'Environmental context and human experience',
          'Conscious architectural planning',
          'Connecting Vastu thinking with broader principles of environmental and human-centred design.'
        ]
      },
      {
        title: 'MODULE 14 — Advanced Project Diagnosis',
        topics: [
          'The Master Practitioner Diagnostic System (Steps 1 to 14)',
          'STEP 1: Understand client objective | STEP 2: Collect site and architectural information',
          'STEP 3: Establish orientation/site framework | STEP 4: Map Vastu Purusha Mandala',
          'STEP 5: Analyse functional zoning | STEP 6: Evaluate directional/elemental relationships',
          'STEP 7: Apply Devata analysis | STEP 8: Evaluate numerical considerations',
          'STEP 9: Apply Astro-Vastu where relevant | STEP 10: Identify major and minor concerns',
          'STEP 11: Prioritise interventions | STEP 12: Develop practical recommendations',
          'STEP 13: Prepare professional report | STEP 14: Present recommendations to client'
        ]
      },
      {
        title: 'MODULE 15 — Advanced Vastu Consultancy & Strategic Advisory',
        topics: [
          'Working as a Professional Master Practitioner',
          'Client discovery, consultation structure, project briefing, site visits',
          'Architectural collaboration: Working with architects, engineers, builders, developers, and business owners',
          'Institutional consultations and corporate advisory',
          'Presenting technical observations and explaining traditional principles',
          'Handling client objections and managing expectations',
          'Professional boundaries, documentation, confidentiality, consultation agreements, scope of work, professional fees, project-based consultancy, follow-up assessments'
        ]
      },
      {
        title: 'MODULE 16 — Advanced Case Studies',
        topics: [
          'Case Study 1: Complex Residential Property',
          'Case Study 2: Luxury Villa & Irregular Plot',
          'Case Study 3: Commercial Office',
          'Case Study 4: Hotel & Hospitality Property',
          'Case Study 5: Hospital / Healthcare Facility',
          'Case Study 6: Educational Institution',
          'Case Study 7: Factory & Manufacturing Facility',
          'Case Study 8: Warehouse & Logistics Facility',
          'Case Study 9: Wellness & Retreat Centre',
          'Case Study 10: Large Multi-Building Development',
          'Master Methodology: Survey → Map → Diagnose → Prioritise → Strategise → Recommend → Document → Present'
        ]
      },
      {
        title: 'MODULE 17 — MASTER PRACTITIONER CAPSTONE PROJECT',
        topics: [
          'Complete Professional Vastu Consultancy Requirements:',
          '1. Client Brief & 2. Site/Property Documentation',
          '3. Orientation & Site Analysis & 4. Vastu Purusha Mandala',
          '5. Functional Zoning Analysis & 6. Directional/Elemental Analysis',
          '7. Devata Analysis & 8. Numero Vastu Analysis',
          '9. Astro-Vastu Analysis (where applicable)',
          '10. Identification of Primary Concerns & 11. Remedial Strategy',
          '12. Prioritised Recommendations & 13. Professional Vastu Report',
          '14. Client Presentation & 15. Final Faculty Review'
        ]
      }
    ]
  },

  // =========================================================
  // 6. SPECIALIZATIONS (TIMING, MEDICAL, RESEARCH)
  // =========================================================

  {
    slug: 'panchapakshi-shastra',
    title: 'Panchapakshi Shastra (Science of Timing)',
    sanskritTag: 'पञ्चपक्षी शास्त्र',
    category: 'Astrology',
    level: 'Foundational to Intermediate',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Panchapakshi%20Shastra%20%E2%80%93%20The%20Vedic%20Science%20of%20Timing%20&%20Decision-Making.png',
    price: 185,
    originalPrice: 250,
    tagline: 'Discover the traditional science of choosing the right time through the activities of five symbolic birds.',
    description: 'Panchapakshi Shastra is a specialised traditional system used to study the changing strength of time through the activities of five symbolic birds: Vulture, Owl, Crow, Cock, and Peacock. The word Panchapakshi combines Pancha, meaning five, and Pakshi, meaning bird. The system associates individuals and time periods with these five birds, where each bird continuously moves through five activities—Ruling, Eating, Walking, Sleeping, and Dying—with every activity carrying a different degree of strength and effectiveness. This comprehensive course introduces students to the foundations, calculations, timing principles, and practical applications of this distinctive system for travel, health enquiries, compatibility, horary questions, and daily decision-making.',
    duration: 'Comprehensive Modules',
    format: 'Live Interactive Online',
    language: 'Hindi & English',
    prerequisites: 'None.',
    whoFor: [
      'Astrology students wanting a practical timing toolkit',
      'Practitioners who advise on travel or key decisions',
      'Anyone drawn to traditional Vedic timing and observation'
    ],
    included: [
      'Live Interactive Online Classes on Zoom & Access to Class Recordings',
      'Comprehensive Course PPT & Panchapakshi Calculation Tables',
      'Birth-Bird Determination Charts & Shukla/Krishna Paksha Reference Material',
      'Practical Case Studies & Guided Assignments',
      'Certificate of Completion & Academic/Faculty Support'
    ],
    certification: 'Certificate in Panchapakshi Shastra — The Vedic Science of Timing & Decision-Making Issued by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1 – Foundations of Panchapakshi Shastra',
        topics: [
          'Meaning of Panchapakshi',
          'Traditional Basis of Panchapakshi Shastra',
          'Philosophy Behind the Five-Bird System',
          'Relationship with Nakshatras',
          'Relationship with the Lunar Cycle',
          'Role of Shukla Paksha and Krishna Paksha',
          'Panchapakshi as a System of Timing',
          'Scope and Limitations of the Method'
        ]
      },
      {
        title: 'Module 2 – The Five Birds of Panchapakshi',
        topics: [
          'Detailed study of: Vulture, Owl, Crow, Cock, Peacock',
          'Fundamental Nature & Symbolic Significance',
          'Behavioural Characteristics, Strengths and Weaknesses',
          'Functional Role & Relationship with Time',
          'Practical Importance in Interpretation'
        ]
      },
      {
        title: 'Module 3 – The Five Activities of Panchapakshi',
        topics: [
          'Ruling, Eating, Walking, Sleeping, Dying',
          'Meaning of Each Activity & Relative Strength of Activities',
          'Favourable and Unfavourable Conditions',
          'Active and Passive States',
          'Interpretation of Strong and Weak Periods',
          'Practical Use in Decision-Making'
        ]
      },
      {
        title: 'Module 4 – Functions, Characteristics and Features',
        topics: [
          'Functions of Panchapakshi & Characteristics of Each Bird',
          'Features of the Panchapakshi System',
          'Relationship Between Bird and Activity',
          'Natural Strength of Different Activities',
          'Functional Strength During Different Periods',
          'Interaction Between Birds & Interpretation of Dominant and Weak States'
        ]
      },
      {
        title: 'Module 5 – Panchapakshi During Shukla Paksha',
        topics: [
          'Meaning of Shukla Paksha (Waxing phase of the Moon)',
          'Panchapakshi Sequence in Shukla Paksha',
          'Day and Night Considerations & Activity Cycles',
          'Strength of Different Birds & Practical Calculation',
          'Interpretation of Favourable Periods'
        ]
      },
      {
        title: 'Module 6 – Panchapakshi During Krishna Paksha',
        topics: [
          'Meaning of Krishna Paksha (Waning phase of the Moon)',
          'Panchapakshi Sequence in Krishna Paksha',
          'Day and Night Calculations & Changes in Bird Activities',
          'Comparative Strength & Practical Calculation',
          'Interpretation and Application'
        ]
      },
      {
        title: 'Module 7 – Timing and Strength of Activities',
        topics: [
          'Division of Day and Night & Duration of Activities',
          'Activity Timings & Strength of Panchapakshi',
          'Primary and Sub-Activities',
          'Strong, Moderate and Weak Periods',
          'Selection of Supportive Time & Avoidance of Weak Periods',
          'Practical Timing Exercises'
        ]
      },
      {
        title: 'Module 8 – Determination of the Birth Bird',
        topics: [
          'Role of Birth Nakshatra & Nakshatra Classification',
          'Shukla and Krishna Paksha Considerations',
          'Determination of Janma Pakshi (Birth Bird)',
          'Personal Bird Characteristics',
          'Relationship Between Birth Bird and Daily Activities',
          'Supportive and Challenging Periods',
          'Practical Birth-Bird Calculations'
        ]
      },
      {
        title: 'Module 9 – Travel and Important Movements',
        topics: [
          'Timing a Journey & Beginning Important Travel',
          'Short and Long-Distance Travel',
          'Business-Related Travel',
          'Evaluating the Strength of the Birth Bird',
          'Supportive and Weak Activity Periods',
          'Practical Travel Case Studies'
        ]
      },
      {
        title: 'Module 10 – Health and Disease-Related Enquiries',
        topics: [
          'Evaluating a Health Enquiry & Strength of the Native’s Bird',
          'Active and Inactive Periods',
          'Timing Supportive Actions',
          'Indications of Strength and Weakness',
          'Horary Considerations & Ethical Interpretation of Health Questions',
          'Disclaimer: Taught as a traditional astrological framework and not as a substitute for medical diagnosis or treatment.'
        ]
      },
      {
        title: 'Module 11 – Panchapakshi and Horary Astrology',
        topics: [
          'Introduction to Horary Application & Time of the Query',
          'Bird Active at the Time of Question',
          'Activity of the Birth Bird & Strength of the Relevant Period',
          'Positive and Negative Indications',
          'Assessing the Likely Direction of an Enquiry',
          'Practical Horary Examples'
        ]
      },
      {
        title: 'Module 12 – Nakshatra and Query Analysis',
        topics: [
          'Nakshatra at the Time of Query & Birth Nakshatra of the Querent',
          'Nature of the Question & Relationship Between Query and Bird',
          'Activity-Based Interpretation',
          'Combining Nakshatra and Panchapakshi',
          'Practical Question Analysis'
        ]
      },
      {
        title: 'Module 13 – Compatibility and Matching',
        topics: [
          'Identification of the Birds of Two Individuals',
          'Natural Relationship Between Birds',
          'Friendly and Challenging Combinations',
          'Comparative Strength & Relationship Dynamics',
          'Marriage Matching & Professional/Business Compatibility',
          'Practical Matching Exercises'
        ]
      },
      {
        title: 'Module 14 – Applied Panchapakshi Shastra',
        topics: [
          'Starting Important Work & Business Decisions',
          'Meetings and Negotiations & Travel',
          'Relationship Discussions & Horary Questions',
          'Health-Related Enquiries & Compatibility Assessment',
          'Daily Activity Planning & Selection of Supportive Periods',
          'Thoughtful application rather than relying on isolated tables or mechanical calculation'
        ]
      }
    ]
  },
 
  {
    slug: 'medical-astrology',
    title: 'Medical Astrology (Health & Horoscope)',
    sanskritTag: 'आयुर्ज्योतिष',
    category: 'Astrology',
    level: 'Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Medical%20Astrology%20(Medical%20Jyotish).png',
    price: 245,
    originalPrice: 320,
    tagline: 'Understand health, constitutional tendencies, and vulnerabilities through classical Vedic Astrology.',
    description: 'Medical Astrology is one of the most fascinating and specialized branches of Jyotish. It explores the relationship between planetary influences, constitutional tendencies, and potential health vulnerabilities as described in classical Vedic astrology. Designed for astrologers, Ayurveda practitioners, yoga therapists, wellness professionals, and advanced students of Jyotish who wish to deepen their understanding of the astrological factors associated with health and well-being. This course emphasizes a preventive and educational approach, helping students identify constitutional patterns, periods of vulnerability, and supportive remedial measures while recognising that astrology complements—but does not replace—professional medical care.',
    duration: 'Live Interactive Study',
    format: 'Live Online',
    language: 'Hindi & English',
    prerequisites: 'Foundational Vedic astrology knowledge is assumed.',
    whoFor: [
      'Practicing astrologers wanting a health specialization',
      'Ayurveda practitioners and yoga therapists',
      'Wellness professionals and advanced students of Jyotish'
    ],
    included: [
      'Live Interactive Online Classes (Zoom) & Lifetime Access to Class Recordings',
      'Comprehensive PPT Study Material & Practical Health Analysis Worksheets',
      'Real Horoscope Case Studies & Guided Assignments',
      'Certificate in Medical Astrology (Medical Jyotish) upon successful completion',
      'Ongoing Faculty Support'
    ],
    certification: 'Certificate in Medical Astrology (Medical Jyotish) from Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Module 1 – Foundations of Medical Astrology',
        topics: [
          'Philosophy of Medical Astrology',
          'Health and the Horoscope',
          'Role of the Ascendant (Lagna)',
          'Importance of the 6th, 8th & 12th Houses',
          'Planetary Significations Related to Health',
          'Disease-Causing Yogas',
          'Timing Health Events',
          'Preventive Astrological Assessment'
        ]
      },
      {
        title: 'Module 2 – Divisional Charts for Health Analysis',
        topics: [
          'Drekkana (D3) interpretation',
          'Shashtamsha (D6) interpretation',
          'Calculation & Interpretation',
          'Practical Applications',
          'Integrating Divisional Charts with the Birth Horoscope'
        ]
      },
      {
        title: 'Module 3 – Cardiovascular Health in Astrology',
        topics: [
          'Heart-Related Planetary Combinations',
          'Relevant Houses & Significations',
          'Planetary Afflictions',
          'Timing Vulnerable Periods',
          'Case Studies'
        ]
      },
      {
        title: 'Module 4 – Endocrine & Metabolic Conditions',
        topics: [
          'Diabetes',
          'Obesity',
          'Hormonal Imbalances',
          'Planetary Indicators',
          'Practical Horoscope Analysis'
        ]
      },
      {
        title: 'Module 5 – Skin & Dermatological Conditions',
        topics: [
          'Skin Disorders',
          'Allergic Tendencies',
          'Planetary Influences',
          'Relevant Houses',
          'Practical Examples'
        ]
      },
      {
        title: 'Module 6 – Neurological Disorders',
        topics: [
          'Parkinson’s Disease',
          'Nervous System Indicators',
          'Planetary Combinations',
          'Timing of Health Events',
          'Practical Case Studies'
        ]
      },
      {
        title: 'Module 7 – Cancer & Serious Illnesses',
        topics: [
          'Cancer-Related Indications',
          'Chronic Disease Patterns',
          'Afflictions & Protective Factors',
          'Dasha & Transit Analysis',
          'Ethical Interpretation'
        ]
      },
      {
        title: 'Module 8 – Urinary & Renal Health',
        topics: [
          'Urinary Tract Conditions',
          'Kidney-Related Indicators',
          'Planetary Influences',
          'Practical Horoscope Assessment'
        ]
      },
      {
        title: 'Module 9 – Hereditary & Genetic Tendencies',
        topics: [
          'Genetic Predispositions',
          'Family Health Patterns',
          'Karmic Indicators',
          'Planetary Combinations',
          'Practical Interpretation'
        ]
      },
      {
        title: 'Practical Training',
        topics: [
          'Real Horoscope Analysis',
          'Health-Oriented Case Studies',
          'Divisional Chart Interpretation',
          'Dasha & Transit Analysis',
          'Guided Classroom Discussions',
          'Practical Assignments',
          'Faculty-Led Analysis Sessions'
        ]
      }
    ]
  },
  {
    slug: 'research-fellowship',
    title: 'Vedic Astrology Research Fellowship',
    sanskritTag: 'ज्योतिष अनुसन्धान',
    category: 'Astrology',
    level: 'Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Vedic%20Astrology%20Research%20Fellowship.png',
    price: 495,
    originalPrice: 600,
    tagline: 'Develop the Mind of a Researcher. Interpret Like a Master Astrologer.',
    description: 'The Vedic Astrology Research Fellowship is the highest level of practical training offered by the Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences. Unlike conventional courses that focus primarily on theory, this fellowship is dedicated to large-scale horoscope research, comparative analysis, and evidence-based learning. Students work with an extensive collection of real-life birth charts across diverse life situations, learning how to identify repeating planetary patterns, evaluate predictive techniques, and refine their analytical skills through guided research.',
    duration: 'Ongoing Academic & Research Sessions',
    format: 'Live Interactive Online Research Sessions',
    language: 'English & Hindi',
    prerequisites: 'Solid grounding in birth chart interpretation and foundational Jyotish principles.',
    whoFor: [
      'Analyse hundreds of real-life horoscopes.',
      'Compare multiple charts to identify recurring astrological patterns.',
      'Test predictive principles against practical case studies.',
      'Strengthen analytical and research skills.',
      'Develop confidence in professional horoscope interpretation.',
      'Learn to approach astrology with both classical knowledge and observational discipline.'
    ],
    included: [
      'Live Interactive Online Research Sessions',
      'Lifetime Access to Class Recordings',
      'Comprehensive PPT Study Material',
      'Extensive Horoscope Case Library',
      'Practical Research Assignments',
      'Faculty Mentorship',
      'Certificate of Completion',
      'Continuous Academic Support'
    ],
    certification: 'Certificate in Vedic Astrology Research from Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
    modules: [
      {
        title: 'Areas of Research: Marriage & Relationships',
        topics: [
          'Marriage Timing',
          'Delayed Marriage',
          'Love Marriage',
          'Arranged Marriage',
          'Compatibility Patterns',
          'Divorce & Separation',
          'Relationship Challenges',
          'Case Comparisons'
        ]
      },
      {
        title: 'Areas of Research: Wealth & Finance',
        topics: [
          'Wealth Creation',
          'Financial Stability',
          'Business Success',
          'Investments',
          'Financial Losses',
          'Bankruptcy Patterns',
          'Prosperity Yogas'
        ]
      },
      {
        title: 'Areas of Research: Career & Profession',
        topics: [
          'Employment',
          'Entrepreneurship',
          'Promotions',
          'Career Changes',
          'Government Service',
          'Leadership Positions',
          'Professional Success'
        ]
      },
      {
        title: 'Areas of Research: Education & Academic Achievement',
        topics: [
          'Academic Excellence',
          'Higher Education',
          'Research Careers',
          'Professional Qualifications',
          'Educational Challenges',
          'Overseas Education'
        ]
      },
      {
        title: 'Areas of Research: Children & Family',
        topics: [
          'Childbirth',
          'Delay in Progeny',
          'Family Expansion',
          'Parent–Child Dynamics',
          'Practical Case Studies'
        ]
      },
      {
        title: 'Areas of Research: Foreign Travel & Settlement',
        topics: [
          'Foreign Travel',
          'Higher Studies Abroad',
          'Overseas Employment',
          'Immigration',
          'Permanent Settlement',
          'International Business'
        ]
      },
      {
        title: 'Areas of Research: Politics & Public Life',
        topics: [
          'Political Leaders',
          'Administrators',
          'Public Personalities',
          'Leadership Roles',
          'Positions of Authority'
        ]
      },
      {
        title: 'Areas of Research: Legal Matters',
        topics: [
          'Court Cases',
          'Litigation',
          'Property Disputes',
          'Criminal Matters',
          'Legal Settlements',
          'Resolution of Conflicts'
        ]
      },
      {
        title: 'Research Methodology',
        topics: [
          'Comparative Horoscope Analysis',
          'Pattern Recognition',
          'Classical Rule Verification',
          'Multi-Chart Comparison',
          'Dasha & Transit Correlation',
          'Statistical Observation',
          'Research Documentation',
          'Faculty-Guided Discussion'
        ]
      },
      {
        title: 'Practical Training & Case Studies',
        topics: [
          'Live Chart Analysis',
          'Group Discussions',
          'Prediction Workshops',
          'Comparative Research Sessions',
          'Practical Assignments',
          'Independent Research Projects',
          'Faculty Feedback & Mentoring'
        ]
      },
      {
        title: 'Learning Methodology',
        topics: [
          'Large-Scale Horoscope Analysis',
          'Comparative Research',
          'Interactive Discussions',
          'Practical Observation',
          'Guided Interpretation',
          'Faculty Mentorship',
          'Ethical Research Practices'
        ]
      }
    ]
  },

  // =========================================================
  // 7. PALMISTRY & FACE READING (SAMUDRIKA SHASTRA)
  // =========================================================
  
  // =========================================================
  // 8. WELLNESS, SOUND & AYURVEDA
  // =========================================================

  {
    slug: 'kapi-shakti',
    title: "Kapi Shakti — Women's Hormonal Wellness & Conscious Living",
    sanskritTag: 'नारी शक्ति एवं आयुर्वेद',
    category: 'Wellness',
    level: 'Professional',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Shakti%20%E2%80%93%20The%20Complete%20System%20of%20Women%E2%80%99s%20Health,%20Hormonal%20Wellness%20&%20Conscious%20Living.png',
    price: 399,
    originalPrice: 500,
    tagline: "A complete system for women's hormonal health, cycles, and conscious living.",
    description: `Course Overview
A woman’s health is influenced by far more than physical well-being alone. Hormonal rhythms, nutrition, movement, emotional resilience, sleep, relationships, stress, lifestyle, and self-awareness work together to shape her vitality throughout every stage of life.
Kapi Shakti is a comprehensive professional certification that empowers women to understand their bodies, honour their natural biological rhythms, and cultivate lifelong wellness through an integrative approach rooted in Ayurveda, Yoga, nutrition, lifestyle medicine, mindfulness, and modern wellness education.
Rather than addressing isolated concerns, this program presents women’s wellness as a complete system. Participants develop a deep understanding of hormonal health, menstrual wellness, nutrition, emotional resilience, preventive health, healthy ageing, conscious living, and professional wellness coaching.
Whether you wish to improve your own health, support your family, or build a professional career in women’s wellness, Kapi Shakti provides a structured roadmap for lifelong health, personal growth, and conscious leadership.

Why Choose Kapi Shakti?
Understand Women’s Health Holistically: Explore the relationship between hormones, physiology, nutrition, emotions, movement, sleep, lifestyle, and long-term well-being.
Integrate Ancient Wisdom with Modern Science: Study Ayurveda and Yoga alongside contemporary knowledge of physiology, nutrition, preventive wellness, and healthy living.
Support Every Stage of Womanhood: Understand the changing needs of women from adolescence through reproductive years, perimenopause, menopause, and healthy ageing.
Build Practical Lifestyle Skills: Learn daily routines, nutrition planning, movement, breathwork, stress management, sleep optimisation, and sustainable self-care practices.
Become a Women’s Wellness Coach: Develop communication, observation, assessment, and coaching skills to ethically guide women through lifestyle education and wellness planning.
Learn Through Practical Experience: Participate in guided practices, workshops, case studies, reflection journals, wellness assessments, and supervised practical sessions.

The Kapi Shakti Wellness Framework
Learn → Observe → Balance → Strengthen → Guide → Empower
This framework enables participants to understand women’s health, recognise wellness patterns, apply evidence-informed lifestyle principles, develop resilience and leadership, guide others ethically, and inspire lifelong well-being.
Nurture Your Health. Honour Your Strength. Live with Shakti.
Kapi Shakti is more than a certification—it is a complete educational system for understanding women’s holistic health, empowering women to live healthier, more conscious lives while developing the knowledge and confidence to educate, inspire, and guide others through ethical wellness coaching.

Learning Outcomes
Upon successful completion, participants will be able to:
- Understand women’s health from a holistic and preventive perspective.
- Explain the relationship between hormones, nutrition, emotions, movement, lifestyle, and long-term well-being.
- Apply Ayurvedic and Yogic principles to support healthy daily living.
- Develop practical nutrition and lifestyle recommendations.
- Promote emotional resilience, healthy relationships, and conscious living.
- Understand women’s health needs across every stage of life.
- Design personalised wellness plans and educational programmes.
- Conduct ethical women’s wellness consultations within professional boundaries.
- Facilitate workshops, wellness circles, and community education initiatives.
- Continue lifelong learning as a responsible women’s wellness professional.`,
    duration: '72–80 Hours (24 Live Sessions)',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Women seeking personal wellness improvement', 
      'Those supporting family members’ wellness', 
      "Aspiring women's wellness coaches"
    ],
    included: [
      '24 Live Interactive Sessions',
      '72–80 Hours of Professional Training',
      'Guided Yoga & Breathwork Practices',
      'Women’s Wellness Assessment Tools',
      'Nutrition & Lifestyle Planning Templates',
      'Practical Workshops & Case Studies',
      'Portfolio-Based Assessment',
      'Professional Certification',
      'Lifetime Access to Recorded Sessions',
      'Lifetime Learning Community'
    ],
    certification: "Certified Kapi Women’s Wellness Coach - Professional Certification in Women’s Holistic Health & Wellness Coaching.",
    modules: [
      { 
        title: 'Module 1: Foundations of Women’s Holistic Health', 
        topics: [
          'Session 1 – Understanding Women’s Health',
          'Foundations of women’s holistic health',
          'Female anatomy and physiology (overview)',
          'Female endocrine system',
          'Mind-body connection',
          'Circadian rhythms and body awareness',
          'Preventive wellness principles',
          'Lifelong health habits',
          'Ethics and scope of wellness coaching',
          'Session 2 – Hormones, Menstrual Health & Female Biology',
          'Hormonal foundations',
          'Menstrual cycle awareness',
          'Ovulation and fertility awareness (educational)',
          'Menstrual tracking',
          'PMS awareness',
          'Hormonal changes across life stages',
          'Lifestyle factors influencing hormonal health',
          'Awareness of common hormonal conditions (educational)'
        ] 
      },
      { 
        title: 'Module 2: Ayurveda for Women’s Wellness', 
        topics: [
          'Session 3 – Ayurvedic Constitution & Women’s Health',
          'Panchamahabhuta',
          'Tridosha theory',
          'Female Prakriti and Vikriti',
          'Agni and digestion',
          'Ama and metabolic balance',
          'Ojas and vitality',
          'Personal constitution assessment',
          'Ayurvedic wellness planning',
          'Session 4 – Daily Routine & Seasonal Wellness',
          'Dinacharya',
          'Ritucharya',
          'Menstrual self-care',
          'Sleep hygiene',
          'Rest and recovery',
          'Digital wellness',
          'Stress reduction',
          'Sustainable wellness routines'
        ] 
      },
      { 
        title: 'Module 3: Nutrition & Lifestyle Medicine', 
        topics: [
          'Session 5 – Women’s Nutrition Throughout Life',
          'Women’s nutritional requirements',
          'Macronutrients and micronutrients',
          'Iron, calcium, protein and healthy fats',
          'Gut health',
          'Anti-inflammatory nutrition',
          'Emotional eating awareness',
          'Meal timing',
          'Nutrition across different life stages',
          'Session 6 – Lifestyle, Sleep & Preventive Wellness',
          'Lifestyle medicine principles',
          'Stress physiology',
          'Sleep optimisation',
          'Physical activity',
          'Sunlight and circadian health',
          'Preventive lifestyle habits',
          'Healthy ageing foundations',
          'Personal wellness planning'
        ] 
      },
      { 
        title: 'Module 4: Yoga, Movement & Women’s Physical Well-being', 
        topics: [
          'Session 7 – Yoga for Women’s Health',
          'Yoga through different life stages',
          'Menstrual phase-appropriate practice',
          'Pelvic floor awareness',
          'Mobility and flexibility',
          'Posture and spinal health',
          'Restorative Yoga',
          'Yoga Nidra (Introduction)',
          'Safe adaptations',
          'Session 8 – Breathwork, Relaxation & Energy Management',
          'Breath awareness',
          'Introduction to Pranayama',
          'Breath and the nervous system',
          'Relaxation techniques',
          'Emotional grounding',
          'Energy management',
          'Guided relaxation',
          'Daily breathwork practice'
        ] 
      },
      { 
        title: 'Module 5: Emotional Well-being & Mental Resilience', 
        topics: [
          'Session 9 – Emotional Intelligence',
          'Emotional awareness',
          'Emotional regulation',
          'Self-esteem',
          'Self-compassion',
          'Confidence',
          'Resilience',
          'Healthy coping strategies',
          'Positive psychology',
          'Session 10 – Stress Management & Mental Well-being',
          'Burnout awareness',
          'Managing overthinking',
          'Mindfulness',
          'Journaling',
          'Relaxation practices',
          'Work-life integration',
          'Emotional resilience',
          'Mental wellness routines'
        ] 
      },
      { 
        title: 'Module 6: Women’s Identity, Relationships & Conscious Living', 
        topics: [
          'Session 11 – Healthy Relationships',
          'Relationship awareness',
          'Communication',
          'Attachment styles (introductory)',
          'Emotional boundaries',
          'Assertiveness',
          'Respect and consent',
          'Family dynamics',
          'Conflict resolution',
          'Session 12 – Self-Leadership & Conscious Living',
          'Self-awareness',
          'Values-based living',
          'Purpose',
          'Decision-making',
          'Confidence',
          'Gratitude',
          'Time and energy management',
          'Mindful living'
        ] 
      },
      { 
        title: 'Module 7: Women’s Health Across Life Stages', 
        topics: [
          'Session 13 – Wellness Through Every Stage of Womanhood',
          'Adolescence',
          'Reproductive years',
          'Pregnancy wellness awareness',
          'Postpartum wellness awareness',
          'Perimenopause',
          'Menopause',
          'Healthy ageing',
          'Lifestyle adaptation across life stages',
          'Session 14 – Hormonal Wellness & Preventive Health',
          'Bone health',
          'Heart health awareness',
          'Pelvic health',
          'Breast health awareness',
          'Metabolic wellness',
          'Preventive health literacy',
          'Healthy ageing strategies',
          'Knowing when to seek medical care'
        ] 
      },
      { 
        title: 'Module 8: Leadership, Personal Growth & Life Skills', 
        topics: [
          'Session 15 – Women’s Leadership',
          'Leadership mindset',
          'Confidence',
          'Public speaking',
          'Communication',
          'Negotiation',
          'Productivity',
          'Decision-making',
          'Personal excellence',
          'Session 16 – Career & Life Planning',
          'Career development',
          'Financial literacy fundamentals',
          'Entrepreneurship awareness',
          'Goal setting',
          'Professional communication',
          'Time management',
          'Work-life integration',
          'Lifelong learning'
        ] 
      },
      { 
        title: 'Module 9: Women’s Wellness Coaching', 
        topics: [
          'Session 17 – Foundations of Women’s Wellness Coaching',
          'Wellness coaching principles',
          'Lifestyle assessment',
          'Active listening',
          'Motivational communication',
          'Behaviour change support',
          'Goal setting',
          'Accountability',
          'Sustainable habit formation',
          'Session 18 – Ethics & Professional Practice',
          'Professional ethics',
          'Scope of practice',
          'Confidentiality',
          'Documentation',
          'Cultural sensitivity',
          'Referral guidelines',
          'Interdisciplinary collaboration',
          'Evidence-informed wellness education'
        ] 
      },
      { 
        title: 'Module 10: Professional Women’s Wellness Practice', 
        topics: [
          'Session 19 – Designing Women’s Wellness Programs',
          'Individual wellness plans',
          'Group programs',
          'Wellness circles',
          'Community education',
          'Workshop planning',
          'Outcome measurement',
          'Lifestyle interventions',
          'Long-term wellness roadmaps',
          'Session 20 – Practice Development',
          'Consultation workflow',
          'Client records',
          'Programme design',
          'Group facilitation',
          'Community engagement',
          'Retreat planning',
          'Professional communication',
          'Sustainable practice management'
        ] 
      },
      { 
        title: 'Module 11: Practical Integration & Case Studies', 
        topics: [
          'Session 21 – Applied Women’s Wellness',
          'Lifestyle assessment',
          'Nutrition planning',
          'Hormonal wellness planning',
          'Yoga integration',
          'Stress management',
          'Case discussions',
          'Practical demonstrations',
          'Reflective practice',
          'Session 22 – Guided Practicum',
          'Wellness consultations',
          'Coaching simulations',
          'Group facilitation',
          'Case presentations',
          'Ethical decision-making',
          'Feedback and supervision',
          'Professional confidence',
          'Best practices'
        ] 
      },
      { 
        title: 'Module 12: Professional Mastery & Certification', 
        topics: [
          'Session 23 – Integrating Holistic Women’s Wellness',
          'Integrating Ayurveda, Yoga, Nutrition and Lifestyle Medicine',
          'Personalised wellness journeys',
          'Community leadership',
          'Women’s wellness education',
          'Continuous professional development',
          'Portfolio preparation',
          'Research and reflective practice',
          'Future learning pathways',
          'Session 24 – Final Assessment & Certification',
          'Practical Assessment',
          'Lifestyle assessment',
          'Wellness consultation',
          'Communication assessment',
          'Case analysis',
          'Ethical decision-making',
          'Professional Portfolio',
          'Personal wellness journal',
          'Lifestyle assessment project',
          'Women’s wellness programme',
          'Reflective portfolio',
          'Three documented case studies',
          'Final Evaluation',
          'Practical assessment',
          'Written assessment',
          'Individual feedback',
          'Professional development roadmap',
          'Certification'
        ] 
      }
    ]
  },
 {
    slug: 'kapi-sound-therapy',
    title: 'Kapi Sacred Sound Therapy — Mantra & Nada Yoga',
    sanskritTag: 'नाद ब्रह्म',
    category: 'Wellness',
    level: 'Intermediate to Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Sacred%20Sound%20Therapy%20%E2%80%93%20Mantra%20Therapy%20&%20Nada%20Yoga%20Programme.png',
    price: 399,
    originalPrice: 500,
    tagline: 'Healing through mantra, sacred sound, and the yogic science of Nada Yoga.',
    description: `Master the Timeless Science of Sacred Sound for Meditation, Inner Transformation & Holistic Well-being
A Flagship Certification Programme by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences

Duration: 6 Months
Format: Live Online Classes • Lifetime Access to Recordings • Practical Training • Professional Certification

Discover the Transformative Power of Sacred Sound
Long before modern wellness practices emerged, the Vedic sages recognised Sacred Sound (Nāda) as one of the most profound tools for cultivating mental clarity, emotional balance, meditation and spiritual growth.
The Kapi Sacred Sound Therapy™ programme brings together the timeless wisdom of Nada Yoga, Vedic Mantras, Sanskrit Sound Science and traditional contemplative practices into a structured learning journey for modern students.
Whether your goal is personal transformation or integrating Sacred Sound into your Yoga, meditation or wellness practice, this programme provides the knowledge, discipline and confidence to do so with authenticity and responsibility.

Why Choose Kapi Sacred Sound Therapy™?
Unlike conventional sound healing courses, this flagship programme combines:
- Authentic Vedic Knowledge
- Nada Yoga & Sanskrit Sound Science
- Structured Learning Methodology
- Guided Mantra Meditation
- Practical Application
- Real-Life Case Studies
- Ethical Professional Training
- Personal Mentorship by Acharya Alok Awasthi
- Professional Certification

The Kapi Sacred Sound Method™
Our exclusive learning framework transforms knowledge into experience through six progressive stages:
1. Listen: Understand the science of vibration, Nāda and consciousness.
2. Pronounce: Master correct Sanskrit pronunciation and mantra recitation.
3. Resonate: Experience the connection between sound, breath and awareness.
4. Meditate: Develop a disciplined Sacred Sound meditation practice.
5. Apply: Integrate Sacred Sound into personal well-being and holistic wellness.
6. Guide: Confidently and ethically apply Sacred Sound in professional settings.

Practical Learning Experience
This programme combines theory with guided practice through:
Live Interactive Classes, Guided Chanting Practice, Pronunciation Correction, Meditation Sessions, Practical Exercises, Reflection Assignments, Real-Life Case Studies, Question & Answer Sessions, Faculty Feedback, and Guided Self-Practice.

Who Will You Become?
By the end of this programme, you will be able to:
- Understand the traditional science of Sacred Sound and Nada Yoga.
- Develop a disciplined mantra meditation practice.
- Chant with greater confidence and correct pronunciation.
- Integrate Sacred Sound into Yoga, meditation and wellness programmes.
- Design structured and ethical Sacred Sound sessions.
- Share authentic Vedic knowledge with clarity, confidence and responsibility.

Begin Your Journey
This is more than a certification.
It is a disciplined journey into one of humanity’s oldest sciences of inner transformation—where sound becomes meditation, meditation becomes awareness, and awareness becomes a way of life.
Listen Deeply. Practise Sincerely. Transform Naturally.
Enrol in Kapi Sacred Sound Therapy™ and experience the timeless wisdom of Sacred Sound through a structured, authentic and transformative learning journey.`,
    duration: '6 Months (30+ Hrs Live, 120+ Hrs Guided)',
    format: 'Live Online + Lifetime Access',
    language: 'English & Sanskrit Terminology',
    prerequisites: 'None.',
    whoFor: [
      'Those seeking personal transformation through sound',
      'Yoga & meditation teachers adding mantra work',
      'Wellness practitioners building a sound-therapy practice'
    ],
    included: [
      '30+ Hours of Live Interactive Training',
      '120+ Hours of Guided Audio & Video Learning',
      'Lifetime Access to Recordings',
      'Guided Practice Resources',
      'Practical Assignments & Case Studies',
      'Professional Certification',
      'Continued Learning Support'
    ],
    certification: 'Certified Kapi Sacred Sound Therapy Practitioner (Professional Certification by Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences)',
    modules: [
      { 
        title: 'Phase I: Understanding Sacred Sound', 
        topics: [
          'Nada Yoga & the Philosophy of Sound',
          'Science of Sound & Vibration',
          'Sanskrit Phonetics & Pronunciation',
          'History & Philosophy of Mantras',
          'Types of Mantras',
          'Bija Mantras',
          'Psychology of Sound',
          'The Power of Intention'
        ] 
      },
      { 
        title: 'Phase II: Experiencing Sacred Sound', 
        topics: [
          'Guided Mantra Meditation',
          'Breath & Sound Integration',
          'Emotional Balance Through Sacred Sound',
          'Chakra-Based Sound Practices',
          'Daily Sacred Sound Rituals',
          'Protective & Cleansing Mantras',
          'Focus, Relaxation & Mindful Living',
          'Practical Applications'
        ] 
      },
      { 
        title: 'Phase III: Applying Sacred Sound', 
        topics: [
          'Personalised Mantra Selection',
          'Structuring Sacred Sound Sessions',
          'Guided Meditation Techniques',
          'Ethics & Professional Responsibility',
          'Practical Case Studies',
          'Live Demonstrations',
          'Consultation Skills',
          'Building a Professional Practice'
        ] 
      }
    ]
  },
 {
    slug: 'kapi-ayurveda',
    title: 'Kapi Ayurveda — The Complete System of Ayurvedic Living',
    sanskritTag: 'आयुर्वेद जीवन दर्शन',
    category: 'Wellness',
    level: 'Professional',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Ayurveda%20%E2%80%93%20The%20Complete%20System%20of%20Ayurvedic%20Living%20&%20Holistic%20Wellness.png',
    price: 399,
    originalPrice: 500,
    tagline: 'Doshas, daily routine, and herbs — for a complete Ayurvedic lifestyle.',
    description: `Course Overview
Ayurveda, the timeless Science of Life, is one of the world’s oldest holistic systems of health and well-being. Rooted in the wisdom of the Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya, Ayurveda teaches that true health is achieved through harmony between the body, mind, senses, environment, and consciousness.
Kapi Ayurveda is a comprehensive professional certification that provides a systematic understanding of Ayurvedic philosophy, constitutional analysis, nutrition, lifestyle, preventive wellness, classical assessment principles, and holistic living. Rather than focusing on disease treatment, this program emphasizes preserving health, restoring balance, and cultivating long-term well-being through individualized lifestyle guidance.
Students will gain a strong foundation in classical Ayurvedic concepts while developing the practical skills required to conduct ethical Ayurvedic wellness consultations and design personalized lifestyle recommendations.

Why Choose Kapi Ayurveda?
Authentic Classical Foundation: Study Ayurveda through the principles of the Charaka Samhita, Sushruta Samhita and Ashtanga Hridaya.
Learn Systematically: Progress from philosophy and constitutional science to nutrition, lifestyle planning, wellness assessment and professional consultation.
Holistic Approach: Integrate Ayurveda with Yoga, Meditation and complementary Vedic wellness practices.
Professional Development: Learn structured consultation methods, ethical practice and personalized wellness planning.
Practical Learning: Develop confidence through assignments, case discussions, lifestyle planning and practical assessments.

Learning Outcomes
Upon successful completion, participants will be able to:
- Understand the classical foundations and philosophy of Ayurveda.
- Assess Prakriti and recognise common patterns of imbalance.
- Explain the role of Doshas, Dhatus, Malas, Agni, Ama, Ojas and Srotas.
- Apply Ayurvedic dietary and lifestyle principles responsibly.
- Design personalised wellness plans based on constitutional assessment.
- Conduct ethical Ayurvedic wellness consultations within appropriate professional boundaries.
- Integrate Ayurveda with Yoga, Meditation and complementary Vedic wellness practices.
- Promote preventive health and conscious living through authentic Ayurvedic principles.

Live in Harmony. Restore Balance. Guide with Wisdom.
Kapi Ayurveda empowers you to understand the timeless principles of Ayurveda and apply them responsibly through personalized lifestyle guidance, preventive wellness, and conscious living. Build a strong foundation in authentic Ayurvedic wisdom while developing the confidence to support others on their journey toward balanced and holistic well-being.`,
    duration: '60–70 Hours (24 Live Sessions)',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Those seeking certified Ayurvedic wellness consultancy',
      'Anyone wanting holistic health principles',
      'Wellness practitioners adding Ayurveda'
    ],
    included: [
      '24 Live Interactive Sessions',
      '60–70 Hours of Professional Training',
      'Practical Workshops',
      'Assessment Templates',
      'Diet & Lifestyle Planning Resources',
      'Case Study Discussions',
      'Portfolio-Based Assessment',
      'Professional Certification',
      'Lifetime Access to Recorded Sessions',
      'Lifetime Learning Community'
    ],
    certification: 'Certified Kapi Ayurvedic Wellness Consultant - Professional Certification in Ayurvedic Wellness, Lifestyle Consultation & Conscious Living .',
    modules: [
      { 
        title: 'Module 1: Foundations of Ayurveda', 
        topics: [
          'Session 1 – Philosophy of Ayurveda',
          'History and evolution of Ayurveda',
          'Objectives of Ayurveda',
          'Panchamahabhuta (Five Elements)',
          'Tridosha Siddhanta',
          'Health and disease from an Ayurvedic perspective',
          'Ethics of Ayurvedic wellness practice',
          'Session 2 – Understanding Human Constitution',
          'Prakriti and Vikriti',
          'Vata, Pitta and Kapha in depth',
          'Physical, physiological and psychological characteristics',
          'Single, dual and balanced constitutions',
          'Constitutional assessment principles',
          'Individual diversity in Ayurveda'
        ] 
      },
      { 
        title: 'Module 2: Ayurvedic Physiology', 
        topics: [
          'Session 3 – The Functional Body',
          'Sapta Dhatus',
          'Upadhatus (Introduction)',
          'Three Malas',
          'Ojas',
          'Tejas',
          'Prana',
          'Functional balance of the body',
          'Session 4 – Agni, Ama & Srotas',
          'Types of Agni',
          'Digestive and tissue metabolism',
          'Formation of Ama',
          'Srotas (Body Channels)',
          'Early recognition of imbalance',
          'Foundations of Shatkriyakala (Stages of Disease Development)'
        ] 
      },
      { 
        title: 'Module 3: Ayurvedic Nutrition', 
        topics: [
          'Session 5 – Food as Medicine',
          'Ahara according to Ayurveda',
          'Six Tastes (Rasa)',
          'Guna, Virya, Vipaka and Prabhava',
          'Food combinations',
          'Quantity and timing of meals',
          'Mindful eating principles',
          'Session 6 – Personalised Nutrition',
          'Dosha-specific nutrition',
          'Seasonal diet planning',
          'Digestive support',
          'Kitchen herbs and spices',
          'Sattvic, Rajasic and Tamasic foods',
          'Creating individualized dietary recommendations'
        ] 
      },
      { 
        title: 'Module 4: Lifestyle & Preventive Wellness', 
        topics: [
          'Session 7 – Dinacharya',
          'Daily routine',
          'Morning practices',
          'Sleep and recovery',
          'Personal hygiene',
          'Exercise and movement',
          'Mental well-being through routine',
          'Session 8 – Ritucharya',
          'Seasonal adaptation',
          'Environmental influences',
          'Lifestyle modifications',
          'Building immunity',
          'Preventive wellness',
          'Healthy ageing principles'
        ] 
      },
      { 
        title: 'Module 5: Mind & Emotional Wellness', 
        topics: [
          'Session 9 – Ayurvedic Psychology',
          'Manas in Ayurveda',
          'Sattva, Rajas and Tamas',
          'Emotional patterns and Doshas',
          'Prajnaparadha',
          'Self-awareness',
          'Mental balance through lifestyle',
          'Session 10 – Conscious Living',
          'Stress management through Ayurveda',
          'Meditation and breath awareness',
          'Daily habits for emotional balance',
          'Building resilience',
          'Cultivating harmony between body and mind'
        ] 
      },
      { 
        title: 'Module 6: Classical Assessment', 
        topics: [
          'Session 11 – Ayurvedic Examination',
          'Trividha Pariksha',
          'Ashtavidha Pariksha (Introduction)',
          'Dashavidha Pariksha (Introduction)',
          'Darshana',
          'Sparshana',
          'Prashna',
          'Session 12 – Observational Assessment',
          'Constitutional observation',
          'Tongue observation',
          'Pulse awareness (introductory concepts)',
          'Eye, skin and nail observation',
          'Wellness assessment',
          'Professional boundaries and limitations'
        ] 
      },
      { 
        title: 'Module 7: Herbs & Traditional Wellness', 
        topics: [
          'Session 13 – Dravyaguna Fundamentals',
          'Principles of Dravyaguna',
          'Classification of herbs',
          'Rasa, Guna, Virya and Vipaka',
          'Household herbs',
          'Culinary spices for wellness',
          'Safe traditional applications',
          'Session 14 – External Therapies',
          'Abhyanga',
          'Self-care oil massage',
          'Swedana overview',
          'Basic Marma awareness',
          'Panchakarma philosophy',
          'Appropriate scope and limitations'
        ] 
      },
      { 
        title: 'Module 8: Lifestyle Consultation', 
        topics: [
          'Session 15 – Designing Wellness Plans',
          'Constitutional analysis',
          'Lifestyle planning',
          'Diet recommendations',
          'Daily routine',
          'Seasonal adjustments',
          'Progress monitoring',
          'Session 16 – Case-Based Learning',
          'Practical case discussions',
          'Lifestyle planning',
          'Client communication',
          'Documentation',
          'Ethical decision-making'
        ] 
      },
      { 
        title: 'Module 9: Integrative Vedic Wellness', 
        topics: [
          'Session 17 – Ayurveda & Yoga',
          'Yogic lifestyle',
          'Asana principles',
          'Pranayama',
          'Meditation',
          'Daily integration',
          'Session 18 – Ayurveda & Complementary Vedic Sciences',
          'Ayurveda and Jyotish',
          'Ayurveda and Vastu',
          'Ayurveda and Face Reading',
          'Ayurveda and Palmistry',
          'Holistic wellness framework',
          'Interdisciplinary applications'
        ] 
      },
      { 
        title: 'Module 10: Professional Consultation', 
        topics: [
          'Session 19 – Consultation Skills',
          'Active listening',
          'Intake assessment',
          'Goal setting',
          'Motivating lifestyle change',
          'Follow-up planning',
          'Record keeping',
          'Session 20 – Ethics & Scope of Practice',
          'Professional ethics',
          'Informed consent',
          'Confidentiality',
          'Referral to qualified healthcare professionals',
          'Legal and professional responsibilities',
          'Maintaining appropriate practice boundaries'
        ] 
      },
      { 
        title: 'Module 11: Applied Ayurveda', 
        topics: [
          'Session 21 – Wellness Across Life Stages',
          'Children’s wellness principles',
          'Adult lifestyle',
          'Healthy ageing',
          'Family wellness',
          'Workplace wellness',
          'Community education',
          'Session 22 – Program Design',
          'Individual wellness consultations',
          'Group education',
          'Workshops',
          'Corporate wellness',
          'Community outreach',
          'Building long-term wellness programs'
        ] 
      },
      { 
        title: 'Module 12: Professional Masterclass', 
        topics: [
          'Session 23 – Practical Workshops',
          'Prakriti assessment',
          'Lifestyle analysis',
          'Wellness planning',
          'Group discussions',
          'Case presentations',
          'Feedback sessions',
          'Session 24 – Final Assessment & Certification',
          'Practical Assessment',
          'Constitutional assessment',
          'Lifestyle consultation',
          'Wellness planning',
          'Communication skills',
          'Ethical decision-making',
          'Portfolio Submission',
          'Personal Dinacharya journal',
          'Prakriti assessment reports',
          'Seasonal wellness plan',
          'Three documented case studies',
          'Lifestyle consultation project',
          'Certification',
          'Practical evaluation',
          'Written assessment',
          'Individual feedback',
          'Professional development guidance',
          'Certification ceremony'
        ] 
      }
    ]
  },

  // =========================================================
  // 9. NLP & NEURO-LINGUISTIC PROGRAMMING
  // =========================================================
  {
    slug: 'kapi-nlp',
    title: 'Kapi NLP — Neuro-Linguistic Programming & Transformation',
    sanskritTag: 'मनोविज्ञान एवं संवाद',
    category: 'Wellness',
    level: 'Intermediate to Advanced',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20NLP%20%E2%80%93%20The%20Complete%20System%20of%20Neuro-Linguistic%20Programming%20&%20Human%20Transformation.png',
    price: 399,
    originalPrice: 500,
    tagline: 'Practical NLP tools for personal change, layered with Vedic psychology.',
    description: `Course Overview
Communication shapes relationships. Thoughts shape behaviour. Beliefs shape destiny.
Neuro-Linguistic Programming (NLP) is one of the world’s most influential models for understanding how people think, communicate, learn, make decisions, develop habits, and create lasting behavioural change. Rather than teaching isolated techniques, NLP explores the relationship between neurological processes, language, perception, emotions, and behaviour.
Kapi NLP is a comprehensive professional certification designed to provide a systematic understanding of communication psychology, behavioural excellence, coaching methodology, leadership development, and personal transformation. The program combines internationally recognised NLP principles with modern behavioural science and practical coaching frameworks to develop effective communicators, educators, leaders, coaches, trainers, and consultants.
Throughout the program, participants will learn how people process information, build beliefs, develop habits, make decisions, communicate effectively, and create sustainable behavioural change. Equal emphasis is placed on ethical practice, professional communication, leadership, and responsible coaching.
Whether you are a coach, educator, entrepreneur, HR professional, corporate trainer, wellness practitioner, leader, or lifelong learner, Kapi NLP provides the knowledge, practical skills, and professional confidence to facilitate meaningful personal and professional transformation.

Why Choose Kapi NLP?
Master the Complete NLP Framework: Develop a systematic understanding of Neuro-Linguistic Programming rather than learning isolated techniques.
Understand Human Behaviour: Explore how beliefs, emotions, values, habits, language, perception, and decision-making shape human behaviour.
Develop Exceptional Communication: Master rapport, active listening, questioning, negotiation, public speaking, leadership communication, and behavioural influence.
Become a Professional Coach: Learn structured coaching methodologies and internationally recognised coaching frameworks for personal and professional development.
Leadership & Professional Excellence: Apply NLP across leadership, education, business, sales, workplace communication, coaching, and lifelong learning.
Practical Learning Experience: Develop confidence through demonstrations, supervised coaching practice, role plays, reflection journals, assignments, behavioural analysis, and real-world case studies.

Learning Outcomes
Upon successful completion, participants will be able to:
- Understand the principles and models of Neuro-Linguistic Programming.
- Analyse communication styles, beliefs, values, identity, behavioural preferences, and decision-making patterns.
- Build meaningful rapport and communicate with clarity, empathy, and influence.
- Apply NLP techniques responsibly to support learning, behavioural flexibility, leadership, and personal development.
- Conduct structured coaching sessions using internationally recognised coaching frameworks.
- Apply NLP across leadership, education, business, sales, workplace communication, and coaching.
- Design coaching programs, workshops, and behavioural development interventions.
- Build a professional coaching practice founded on ethics, reflective practice, and continuous learning.

Communicate with Clarity. Influence with Integrity. Transform with Purpose.
Kapi NLP is more than an NLP certification—it is a comprehensive professional system for understanding human communication, behaviour, learning, leadership, and personal transformation. Through structured learning, supervised practice, ethical coaching, and continuous self-development, participants gain the competence and confidence to create meaningful change in individuals, teams, and organisations.`,
    duration: '60–70 Hours (24 Live Sessions)',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Coaches, educators, and corporate trainers',
      'HR professionals and entrepreneurs',
      'Wellness practitioners wanting NLP tools'
    ],
    included: [
      '24 Live Interactive Sessions',
      '60–70 Hours of Professional Training',
      'Practical Role Plays & Coaching Practicum',
      'Downloadable Worksheets & Coaching Templates',
      'Behavioural Assessment Frameworks',
      'Case Study Discussions',
      'Portfolio-Based Assessment',
      'Professional Certification',
      'Lifetime Access to Recorded Sessions',
      'Lifetime Learning Community'
    ],
    certification: 'Certified Kapi NLP Practitioner - Professional Certification in Communication Psychology, Behavioural Excellence & Transformational Coaching.',
    modules: [
      { 
        title: 'Module 1: Foundations of NLP', 
        topics: [
          'Session 1 – Introduction to NLP',
          'History and evolution of Neuro-Linguistic Programming',
          'Principles and philosophy of NLP',
          'The NLP Communication Model',
          'Internal Representation Systems',
          'Understanding Perception & Subjective Reality',
          'Ethics, Scope & Responsible Application',
          'Session 2 – Brain, Learning & Human Behaviour',
          'Attention & Perception',
          'Learning Psychology',
          'Memory Systems',
          'Habit Formation',
          'Introduction to Neuroplasticity',
          'Cognitive Filters',
          'Cognitive Biases & Decision-Making',
          'Behavioural Flexibility'
        ] 
      },
      { 
        title: 'Module 2: Communication Psychology', 
        topics: [
          'Session 3 – Building Rapport & Human Connection',
          'Rapport Building',
          'Calibration',
          'Active Listening',
          'Matching & Mirroring',
          'Observational Skills',
          'Building Trust & Influence',
          'Non-Verbal Communication',
          'Emotional Awareness in Communication',
          'Session 4 – Precision Communication',
          'Meta Model',
          'Language Patterns',
          'Powerful Questioning',
          'Clarifying Assumptions',
          'Reducing Misunderstandings',
          'Communication Barriers',
          'Precision Thinking',
          'Constructive Dialogue'
        ] 
      },
      { 
        title: 'Module 3: Behavioural Psychology', 
        topics: [
          'Session 5 – Beliefs, Values & Identity',
          'Belief Systems',
          'Values Hierarchy',
          'Identity Formation',
          'Motivation',
          'Personal Meaning',
          'Behavioural Patterns',
          'Limiting Beliefs',
          'Building Empowering Beliefs',
          'Session 6 – Decision Making & Behavioural Preferences',
          'Decision-Making Psychology',
          'NLP Meta Programs',
          'Internal vs External Reference',
          'Toward vs Away Motivation',
          'Options vs Procedures',
          'Matcher vs Mismatcher',
          'Global vs Detail Processing',
          'People vs Task Orientation',
          'Behavioural Profiling Fundamentals'
        ] 
      },
      { 
        title: 'Module 4: Emotional Intelligence', 
        topics: [
          'Session 7 – Emotional Intelligence & State Management',
          'Emotional Awareness & Self-Regulation',
          'Anchoring Positive Resource States',
          'Building Confidence & Resilience',
          'Managing Stress & Performance Pressure',
          'Emotional Flexibility',
          'Peak Performance Psychology',
          'State Management for Professional Success',
          'Session 8 – Behavioural Change & Personal Transformation',
          'Principles of Behavioural Change',
          'Swish Pattern',
          'Reframing',
          'Parts Integration',
          'Timeline Concepts',
          'Future Pacing',
          'Breaking Unproductive Habits',
          'Goal Achievement Strategies'
        ] 
      },
      { 
        title: 'Module 5: Advanced Communication', 
        topics: [
          'Session 9 – The Milton Model',
          'Conversational Language Patterns',
          'Storytelling',
          'Metaphors',
          'Ethical Suggestion Patterns',
          'Influence Without Manipulation',
          'Coaching Conversations',
          'Session 10 – Leadership Communication & Public Speaking',
          'Leadership Communication',
          'Executive Presence',
          'Public Speaking',
          'Voice & Delivery',
          'Audience Engagement',
          'Difficult Conversations',
          'Negotiation',
          'High-Performance Team Communication'
        ] 
      },
      { 
        title: 'Module 6: Learning Psychology & Modelling', 
        topics: [
          'Session 11 – Accelerated Learning & Human Performance',
          'Learning Psychology',
          'Accelerated Learning',
          'Skill Acquisition',
          'Mental Rehearsal',
          'Memory Enhancement',
          'Creativity',
          'Deliberate Practice',
          'Performance Optimisation',
          'Session 12 – Modelling Excellence',
          'Principles of Modelling',
          'Identifying Expert Strategies',
          'Excellence Modelling',
          'Success Pattern Analysis',
          'Decision Strategies',
          'High-Performance Habits',
          'Continuous Improvement',
          'Personal Excellence Framework'
        ] 
      },
      { 
        title: 'Module 7: Coaching Psychology', 
        topics: [
          'Session 13 – Foundations of Professional Coaching',
          'Coaching vs Mentoring vs Consulting',
          'Psychology of Behavioural Change',
          'Coaching Mindset',
          'Psychological Safety',
          'Active Listening',
          'Powerful Questions',
          'Goal Setting',
          'Accountability',
          'Session 14 – Professional Coaching Frameworks',
          'GROW Model',
          'CLEAR Model',
          'Solution-Focused Coaching',
          'Structuring Coaching Sessions',
          'Progress Measurement',
          'Feedback Techniques',
          'Documentation',
          'Ethical Coaching & Referral Principles'
        ] 
      },
      { 
        title: 'Module 8: Professional Applications', 
        topics: [
          'Session 15 – Leadership, Business & Corporate Communication',
          'Leadership Psychology',
          'Executive Communication',
          'High-Performance Teams',
          'Employee Motivation',
          'Workplace Communication',
          'Conflict Resolution',
          'Organisational Change',
          'Corporate Training',
          'Session 16 – Sales, Negotiation & Influence Psychology',
          'Consumer Decision Psychology',
          'Trust Building',
          'Ethical Sales Communication',
          'Client Needs Analysis',
          'Handling Objections',
          'Negotiation Strategies',
          'Presentation Skills',
          'Long-Term Relationship Building'
        ] 
      },
      { 
        title: 'Module 9: Building a Professional Practice', 
        topics: [
          'Session 17 – Professional Ethics & Responsible Practice',
          'Ethics in NLP',
          'Influence vs Manipulation',
          'Informed Consent',
          'Confidentiality',
          'Cultural Awareness',
          'Professional Conduct',
          'Scope & Limitations',
          'Referral to Appropriate Professionals',
          'Session 18 – Research, Reflection & Continuous Development',
          'Observation & Behavioural Analysis',
          'Reflective Practice',
          'Case Documentation',
          'Building Case Studies',
          'Measuring Progress',
          'Professional Supervision',
          'Continuous Skill Development',
          'Personal Development Planning',
          'Session 19 – Designing Coaching & Training Programs',
          'One-to-One Coaching Programs',
          'Group Coaching',
          'Workshops & Seminars',
          'Corporate Training Programs',
          'Educational Programs',
          'Long-Term Client Development',
          'Measuring Outcomes',
          'Program Evaluation',
          'Session 20 – Practice Development & Professional Branding',
          'Consultation Workflow',
          'Client Onboarding',
          'Session Planning',
          'Documentation Systems',
          'Personal Branding',
          'Marketing Fundamentals',
          'Building a Sustainable Practice',
          'Career Pathways',
          'Session 21 – Supervised Coaching Practice',
          'Live Coaching Demonstrations',
          'Rapport Assessment',
          'Behavioural Analysis',
          'Communication Evaluation',
          'Individual Feedback',
          'Skill Refinement',
          'Professional Confidence',
          'Session 22 – Advanced Coaching Practicum',
          'Coaching Case Presentations',
          'Group Facilitation',
          'Challenging Coaching Scenarios',
          'Communication Exercises',
          'Peer Review',
          'Reflective Supervision',
          'Best Practices',
          'Session 23 – Professional Integration',
          'Integrating NLP Models',
          'Designing Personal Coaching Frameworks',
          'Portfolio Development',
          'Business Planning',
          'Continuing Professional Development',
          'Building Long-Term Excellence',
          'Session 24 – Final Assessment & Certification',
          'Practical Assessment',
          'Coaching Demonstration',
          'Communication Assessment',
          'Behavioural Analysis',
          'Ethical Decision-Making',
          'Leadership Communication',
          'Professional Portfolio',
          'Reflection Journal',
          'Coaching Framework',
          'Behavioural Change Project',
          'Communication Analysis',
          'Three Documented Coaching Case Studies',
          'Final Evaluation',
          'Practical Assessment',
          'Written Assessment',
          'Individual Feedback',
          'Professional Development Roadmap',
          'Certification'
        ] 
      }
    ]
  },{
    slug: 'kapi-emotional-wellness',
    title: 'Kapi Emotional Wellness — Mind Management & Conscious Living',
    sanskritTag: 'भावनात्मक स्वास्थ्य',
    category: 'Wellness',
    level: 'Professional',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Emotional%20Wellness%20%E2%80%93%20Understanding%20the%20Human%20Through%20the%20Mind.png',
    price: 399,
    originalPrice: 500,
    tagline: 'A holistic system of emotional wellness rooted in Vedic wisdom and NLP.',
    description: `Course Overview
The quality of our lives is deeply influenced by the quality of our thoughts, emotions, beliefs, and responses. Stress, emotional overwhelm, negative thinking, and unhealthy behavioural patterns often arise not only from external circumstances but also from the way the mind interprets and responds to life.
Kapi Emotional Wellness is a comprehensive professional certification that combines the wisdom of Yoga, Ayurveda, Neuro-Linguistic Programming (NLP), mindfulness, Marma awareness, and Vedic philosophy into a practical framework for emotional well-being and conscious living.
Rather than offering medical or psychological treatment, this program teaches evidence-informed self-development practices and traditional Vedic approaches that help participants cultivate self-awareness, emotional resilience, mental clarity, healthy habits, and effective communication. Students also learn how to facilitate ethical, non-clinical emotional wellness sessions within appropriate professional boundaries.
Whether you are a coach, yoga teacher, wellness practitioner, educator, counsellor, HR professional, or someone seeking personal transformation, this course provides a structured pathway towards understanding the mind and living with greater balance, purpose, and inner stability.

Why Choose This Course?
- Learn a holistic system of emotional wellness rooted in Vedic wisdom.
- Understand the relationship between thoughts, emotions, behaviour, and lifestyle.
- Develop practical skills for stress management and emotional resilience.
- Learn foundational NLP tools for communication and mindset development.
- Integrate Yoga, Pranayama, Meditation, Marma awareness, and mindful living.
- Build professional skills for ethical emotional wellness coaching.

Learning Outcomes
By the end of this program, participants will be able to:
- Understand the relationship between thoughts, emotions and behaviour.
- Apply practical mind management techniques for personal well-being.
- Use foundational NLP tools to improve communication and mindset.
- Practise Yoga, Pranayama, Meditation and Marma awareness for emotional balance.
- Build emotional resilience and healthy daily habits.
- Facilitate ethical, non-clinical emotional wellness conversations.
- Design personalised wellness plans that integrate Vedic lifestyle principles.
- Conduct structured emotional wellness sessions within appropriate professional boundaries.

Transform the Mind. Enrich the Life.
Discover a practical and holistic approach to emotional well-being by integrating timeless Vedic wisdom with modern mind-management techniques. Learn to cultivate greater self-awareness, resilience, and purposeful living while helping others do the same through ethical, compassionate guidance.`,
    duration: '45–50 Hours (18 Live Sessions)',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Coaches, yoga teachers, and wellness practitioners',
      'Educators, counsellors, and HR professionals',
      'Anyone seeking personal transformation'
    ],
    included: [
      '18 Live Interactive Sessions',
      'Guided Practices & Worksheets',
      'Practical Assignments',
      'Case Discussions',
      'Lifetime Access to Recordings',
      'Professional Certification',
      'Ongoing Learning Community'
    ],
    certification: 'Certified Kapi Emotional Wellness Practitioner - Professional Certification in Emotional Wellness, Mind Management & Conscious Living.',
    modules: [
      { 
        title: 'Module 1: Foundations of Emotional Wellness', 
        topics: [
          'Session 1 – Understanding the Human Mind',
          'Nature of the conscious and subconscious mind',
          'Thoughts, emotions and behaviour',
          'Stress and emotional resilience',
          'Mind–body connection',
          'Foundations of conscious living',
          'Professional ethics and scope of practice',
          'Session 2 – Emotional Awareness',
          'Understanding core emotions',
          'Emotional triggers',
          'Emotional regulation',
          'Self-awareness practices',
          'Building emotional resilience',
          'Reflective observation'
        ] 
      },
      { 
        title: 'Module 2: Mind Management', 
        topics: [
          'Session 3 – Thought Patterns & Belief Systems',
          'Formation of beliefs',
          'Limiting and empowering beliefs',
          'Habit loops',
          'Cognitive patterns',
          'Self-talk',
          'Mindset development',
          'Session 4 – Foundations of NLP',
          'Principles of NLP',
          'Rapport building',
          'Representational systems',
          'Outcome thinking',
          'Reframing perspectives',
          'Practical communication skills'
        ] 
      },
      { 
        title: 'Module 3: Personal Transformation', 
        topics: [
          'Session 5 – Emotional State Management',
          'Anchoring positive emotional states',
          'Visualisation',
          'Resource activation',
          'Relaxation techniques',
          'Managing emotional overwhelm',
          'Developing psychological flexibility',
          'Session 6 – Subconscious Reconditioning',
          'Habit transformation',
          'Mental rehearsal',
          'Constructive affirmations',
          'Guided imagery',
          'Journaling for self-reflection',
          'Personal growth planning'
        ] 
      },
      { 
        title: 'Module 4: Vedic Mind–Body Practices', 
        topics: [
          'Session 7 – Yoga for Emotional Balance',
          'Yogic philosophy for daily life',
          'Gentle asana practices',
          'Breath-body awareness',
          'Relaxation techniques',
          'Restorative movement',
          'Session 8 – Pranayama, Meditation & Marma Awareness',
          'Breath regulation',
          'Foundational meditation practices',
          'Mindfulness',
          'Introduction to Marma awareness',
          'Self-care techniques',
          'Nervous system regulation'
        ] 
      },
      { 
        title: 'Module 5: Emotional Intelligence', 
        topics: [
          'Session 9 – Understanding Behaviour',
          'Personality tendencies',
          'Emotional intelligence',
          'Communication styles',
          'Listening skills',
          'Decision-making',
          'Self-management',
          'Session 10 – Relationships & Healthy Boundaries',
          'Relationship dynamics',
          'Emotional boundaries',
          'Assertive communication',
          'Conflict resolution',
          'Empathy',
          'Trust building'
        ] 
      },
      { 
        title: 'Module 6: Spiritual Psychology', 
        topics: [
          'Session 11 – Samskaras & Personal Growth',
          'Samskaras and conditioning',
          'Values and purpose',
          'Gratitude',
          'Forgiveness',
          'Self-compassion',
          'Conscious living',
          'Session 12 – Meditation for Inner Clarity',
          'Guided meditation',
          'Self-inquiry',
          'Reflective practices',
          'Mindful awareness',
          'Building daily spiritual discipline',
          'Inner balance'
        ] 
      },
      { 
        title: 'Module 7: Professional Wellness Facilitation', 
        topics: [
          'Session 13 – Guiding Emotional Wellness',
          'Active listening',
          'Asking meaningful questions',
          'Supporting personal growth',
          'Goal setting',
          'Ethical facilitation',
          'Referral boundaries',
          'Session 14 – Designing Wellness Plans',
          'Lifestyle assessment',
          'Habit development',
          'Wellness routines',
          'Personalised action plans',
          'Progress tracking',
          'Motivation strategies'
        ] 
      },
      { 
        title: 'Module 8: Integrated Holistic Living', 
        topics: [
          'Session 15 – Integrating Vedic Sciences',
          'Emotional wellness and Yoga',
          'Ayurveda and daily routines',
          'Mindfulness in everyday life',
          'Lifestyle optimisation',
          'Integrating multiple wellness practices',
          'Session 16 – Conscious Living Framework',
          'Daily routines',
          'Sleep hygiene',
          'Digital wellness',
          'Nature connection',
          'Food–mind relationship',
          'Sustainable well-being practices'
        ] 
      },
      { 
        title: 'Module 9: Professional Practice', 
        topics: [
          'Session 17 – Building Your Wellness Practice',
          'Consultation structure',
          'Session planning',
          'Documentation',
          'Professional communication',
          'Ethics',
          'Practice development',
          'Session 18 – Practical Masterclass & Certification',
          'Guided wellness sessions',
          'Case discussions',
          'Practical demonstrations',
          'Communication practice',
          'Final assessment',
          'Certification'
        ] 
      }
    ]
  },{
    slug: 'kapi-dhyana',
    title: 'Kapi Dhyana — The Science of Meditation & Conscious Living',
    sanskritTag: 'ध्यान',
    category: 'Wellness',
    level: 'Professional',
    image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Dhyana%20%E2%80%93%20The%20Complete%20System%20of%20Dhyana,%20Yogic%20Psychology%20&%20Conscious%20Living.png',
    price: 399,
    originalPrice: 500,
    tagline: 'A complete system of inner development, yogic psychology, and conscious living.',
    description: `Course Overview
Meditation is not merely a technique for relaxation—it is a systematic science of understanding the mind, refining awareness, and awakening higher consciousness. In the Yogic tradition, Dhyana represents the culmination of disciplined living, mental purification, and sustained inner awareness. It is the bridge between concentration (Dharana) and the direct experience of profound stillness and clarity.
Kapi Dhyana is a comprehensive professional certification designed to present meditation as a complete system of inner development rather than a collection of isolated practices. Rooted in the wisdom of the Yoga Sutras of Patanjali, Bhagavad Gita, Upanishads, and classical Yogic traditions, this program integrates philosophy, psychology, breathwork, mantra, mindfulness, conscious living, and professional facilitation into one structured learning journey.
Students will understand not only how to meditate, but also why meditation works, how the mind functions, how emotions influence awareness, and how Yogic principles can be applied in everyday life. The course also develops the knowledge and confidence required to ethically guide individuals and groups in meditation practices while respecting appropriate professional boundaries.
Whether your goal is personal transformation, professional teaching, wellness coaching, or spiritual growth, Kapi Dhyana provides a complete roadmap for cultivating clarity, resilience, compassion, and conscious living.

Why Choose Kapi Dhyana?
Authentic Yogic Foundation: Study meditation through the timeless wisdom of the Yoga Sutras, Bhagavad Gita, Upanishads, and classical Yogic traditions.
Understand the Science of the Mind: Learn how thoughts, emotions, habits, and awareness interact through the lens of Yogic Psychology.
Beyond Meditation Techniques: Develop a complete understanding of breath, awareness, concentration, mantra, mindfulness, and conscious living.
Professional Teaching Skills: Gain the confidence to guide individuals and groups through structured meditation sessions with clarity, responsibility, and ethical practice.
Practical & Transformative: Integrate meditation into daily life for improved focus, emotional balance, resilience, and self-awareness.

The Kapi Dhyana Learning Framework
Every participant progresses through a structured journey:
Understand — Learn the philosophy and psychology of meditation.
Observe — Develop awareness of the mind, breath and behavioural patterns.
Practise — Cultivate discipline through authentic Yogic meditation techniques.
Integrate — Apply meditation and conscious living in everyday life.
Facilitate — Guide individuals and groups with clarity, confidence and compassion.
Transform — Continue lifelong personal growth while supporting the well-being of others through ethical practice.

Learning Outcomes
Upon successful completion of this program, participants will be able to:
- Understand the philosophical foundations of Dhyana through the Yoga Sutras, Bhagavad Gita and Upanishads.
- Explain the principles of Yogic Psychology, including Manas, Buddhi, Chitta, Ahamkara, Samskaras, Gunas and Kleshas.
- Apply foundational Pranayama and breath-awareness practices safely and appropriately.
- Practise Dharana, Dhyana, Mantra Meditation, Mindfulness and other classical meditation approaches with confidence.
- Integrate meditation into daily life through conscious habits and Yogic lifestyle principles.
- Develop emotional balance through self-awareness, contemplative practice and reflective living.
- Design structured meditation practices and learning journeys for individuals and groups.
- Facilitate meditation sessions ethically, professionally and with sensitivity to participant needs.
- Recognise professional boundaries and know when referral to qualified healthcare or mental health professionals is appropriate.
- Build a sustainable meditation teaching and wellness practice grounded in authentic Yogic wisdom.

Still the Mind. Awaken Awareness. Live Consciously.
Kapi Dhyana is more than a meditation course—it is a comprehensive system for understanding the mind, cultivating awareness, and integrating timeless Yogic wisdom into modern life. Through disciplined practice, philosophical insight, and ethical facilitation, this program prepares you to walk the path of conscious living while inspiring others to do the same`,
    duration: '45–50 Hours (18 Live Sessions)',
    format: 'Live Interactive Online',
    language: 'English',
    prerequisites: 'None.',
    whoFor: [
      'Those seeking personal transformation and spiritual growth',
      'Professional teachers and wellness coaches',
      'Anyone wanting to facilitate meditation ethically and responsibly'
    ],
    included: [
      '18 Live Interactive Sessions',
      '45–50 Hours of Professional Training',
      'Guided Meditation Practice Library',
      'Comprehensive Course Manual',
      'Reflection Journal Templates',
      'Practical Teaching Experience',
      'Portfolio-Based Assessment',
      'Professional Certification',
      'Lifetime Access to Recorded Sessions',
      'Lifetime Learning Community'
    ],
    certification: 'Certified Kapi Dhyana Facilitator - Professional Certification in Dhyana, Yogic Psychology & Conscious Living',
    modules: [
      { 
        title: 'Module 1: Foundations of Dhyana', 
        topics: [
          'Session 1 – The Philosophy of Meditation',
          'Evolution of meditation across Yogic traditions',
          'Meaning of Dhyana in the Eight Limbs of Yoga',
          'Purpose of meditation beyond relaxation',
          'Consciousness and self-awareness',
          'Common misconceptions about meditation',
          'Ethics, discipline and the qualities of a sincere practitioner',
          'Session 2 – Understanding the Human Mind',
          'The Antahkarana: Manas, Buddhi, Chitta & Ahamkara',
          'Chitta Vritti (mental modifications)',
          'Samskaras and Vasanas',
          'The Three Gunas',
          'The Five Kleshas',
          'Abhyasa (consistent practice) and Vairagya (detachment)',
          'Introduction to attention, habit formation, and neuroplasticity from a modern scientific perspective'
        ] 
      },
      { 
        title: 'Module 2: Preparing the Mind for Meditation', 
        topics: [
          'Session 3 – The Role of Yama, Niyama & Lifestyle',
          'Meditation as a way of life',
          'Foundations of Yama and Niyama',
          'Developing inner discipline',
          'Lifestyle choices that support meditation',
          'Digital awareness and sensory balance',
          'Dinacharya for mental clarity',
          'Session 4 – Breath Awareness & Foundational Pranayama',
          'Breath as the bridge between body and mind',
          'Foundations of Pranayama',
          'Breath awareness practices',
          'Nadi Shodhana',
          'Bhramari',
          'Ujjayi (introductory)',
          'Breath and emotional regulation',
          'Safety principles and appropriate practice guidelines'
        ] 
      },
      { 
        title: 'Module 3: From Pratyahara to Dhyana', 
        topics: [
          'Session 5 – Pratyahara & Dharana',
          'Understanding Pratyahara (withdrawal and regulation of the senses)',
          'Managing external and internal distractions',
          'Developing one-pointed attention',
          'Trataka',
          'Object-based concentration',
          'Breath-focused concentration',
          'Preparing the mind for meditation',
          'Session 6 – Entering Dhyana',
          'Transition from Dharana to Dhyana',
          'Witness consciousness (Sakshi Bhava)',
          'Silent awareness',
          'Natural meditation',
          'Common obstacles in meditation',
          'Restlessness, sleepiness, doubt and expectation',
          'Establishing a sustainable daily meditation practice'
        ] 
      },
      { 
        title: 'Module 4: Mantra, Sound & the Science of Meditation', 
        topics: [
          'Session 7 – The Science of Mantra',
          'Meaning and purpose of Mantra in the Vedic tradition',
          'Nada Yoga – The Yoga of Sacred Sound',
          'How sound influences attention, emotion, and mental steadiness',
          'Vaikhari, Upanshu, Manasika & Ajapa Japa',
          'Universal mantras and their appropriate use',
          'Pronunciation, rhythm, intention, and discipline in mantra practice',
          'Developing a personal mantra meditation routine',
          'Session 8 – Exploring Meditation Traditions',
          'Gain a practical understanding of the major meditation pathways within the Yogic tradition and their appropriate applications.',
          'Breath Meditation',
          'Mantra Meditation',
          'Mindfulness Meditation',
          'Witness Meditation (Sakshi Bhava)',
          'Trataka Meditation',
          'Loving-Kindness (Maitri Bhavana)',
          'Nada (Sound) Meditation',
          'Walking Meditation',
          'Yoga Nidra (Introduction)',
          'Bhakti-based Contemplation',
          'Self-Inquiry (Atma Vichara)',
          'Choosing the right meditation according to individual temperament and goals'
        ] 
      },
      { 
        title: 'Module 5: Mindfulness & Conscious Living', 
        topics: [
          'Session 9 – Mindfulness Beyond the Meditation Cushion',
          'Understanding mindfulness from a Yogic perspective',
          'Cultivating present-moment awareness',
          'Mindful communication and listening',
          'Mindful eating and conscious consumption',
          'Digital mindfulness and attention management',
          'Integrating awareness into work, relationships, and daily activities',
          'Developing consistency in practice',
          'Session 10 – Yogic Lifestyle for Inner Balance',
          'Dinacharya and daily discipline',
          'Sleep hygiene and mental restoration',
          'Food, digestion, and mental clarity',
          'Nature as a support for meditation',
          'Simplicity, balance, and conscious living',
          'Creating a sustainable lifestyle that supports long-term meditation practice'
        ] 
      },
      { 
        title: 'Module 6: Yogic Psychology & Inner Transformation', 
        topics: [
          'Session 11 – Understanding Emotional Patterns',
          'Observing emotions without suppression or reaction',
          'Emotional awareness and self-regulation',
          'The influence of Samskaras on emotional behaviour',
          'Cultivating compassion, gratitude, forgiveness, and acceptance',
          'Building resilience through self-observation',
          'Responding consciously rather than reacting impulsively',
          'Meditation as a tool for inner stability and personal growth',
          'Session 12 – Meditation, Vedanta & Higher Awareness',
          'Explore the deeper philosophical foundations that give meditation its ultimate purpose.',
          'Teachings from the Bhagavad Gita',
          'Equanimity (Samatvam)',
          'Karma Yoga and detached action',
          'Dhyana Yoga',
          'The qualities of a Sthitaprajna (one of steady wisdom)',
          'Maintaining inner balance amidst success and failure',
          'Teachings from the Upanishads',
          'Nature of the Self (Atman)',
          'Witness Consciousness',
          'Unity of individual consciousness and universal reality',
          'Silence as a means of inner knowledge',
          'Meditation as Self-discovery rather than escape',
          'Integrating Philosophy into Daily Life',
          'Living with awareness',
          'Purpose-driven living',
          'Self-inquiry and reflection',
          'Developing a lifelong meditation practice',
          'Balancing spiritual growth with worldly responsibilities'
        ] 
      },
      { 
        title: 'Module 7: Teaching the Science of Meditation', 
        topics: [
          'Session 13 – Foundations of Meditation Facilitation',
          'Learn how to confidently and ethically guide meditation for individuals and groups.',
          'The role and responsibilities of a meditation facilitator',
          'Structuring effective meditation sessions',
          'Preparing participants for practice',
          'Voice modulation, pacing, silence and guided awareness',
          'Creating a safe, supportive and inclusive environment',
          'Observation skills and adapting practices to participant needs',
          'Professional ethics, consent and facilitator boundaries',
          'Session 14 – Group Facilitation & Retreat Design',
          'Develop the skills required to facilitate meaningful group experiences.',
          'Planning and conducting group meditation sessions',
          'Designing half-day, one-day and introductory retreat programs',
          'Managing group dynamics and participation',
          'Creating a calm and focused practice environment',
          'Supporting participants through common meditation challenges',
          'Conflict management and compassionate communication',
          'Best practices for online and in-person facilitation'
        ] 
      },
      { 
        title: 'Module 8: Applied Meditation & Conscious Living', 
        topics: [
          'Session 15 – Meditation Across Different Life Contexts',
          'Learn how meditation can be adapted for different audiences and settings.',
          'Meditation for students and learners',
          'Meditation for professionals and workplace well-being',
          'Meditation for families and caregivers',
          'Meditation for older adults',
          'Meditation in educational and community settings',
          'Adapting practices for different experience levels',
          'Cultural sensitivity and inclusive teaching',
          'Session 16 – Designing Transformative Meditation Programs',
          'Build complete meditation-based learning experiences.',
          'Designing structured meditation courses',
          'Writing guided meditation scripts',
          'Sequencing practices for progressive learning',
          'Creating daily, weekly and long-term practice plans',
          'Tracking participant progress',
          'Reflection journals and self-assessment tools',
          'Encouraging long-term practice and discipline'
        ] 
      },
      { 
        title: 'Module 9: Professional Practice & Certification', 
        topics: [
          'Session 17 – Building a Professional Meditation Practice',
          'Transform your knowledge into a responsible and sustainable professional practice.',
          'Structuring one-to-one and group sessions',
          'Consultation and participant intake',
          'Documentation and progress records',
          'Professional ethics and safeguarding',
          'Recognising the limits of meditation instruction',
          'When and how to refer participants to appropriate healthcare or mental health professionals',
          'Building workshops, courses and community programs',
          'Personal branding and professional development',
          'Session 18 – Practical Masterclass & Final Assessment',
          'Demonstrate your knowledge through supervised practice and reflection.',
          'Practical Assessment',
          'Guided meditation facilitation',
          'Individual teaching demonstration',
          'Group facilitation exercise',
          'Voice and instruction assessment',
          'Meditation observation skills',
          'Handling participant questions appropriately',
          'Portfolio Submission',
          'Personal meditation journal',
          'Guided meditation script',
          'Session plan',
          'Reflective essay on Yogic Psychology',
          'Case reflection and observation notes',
          'Final Certification',
          'Practical evaluation',
          'Individual feedback',
          'Professional development roadmap',
          'Certification ceremony'
        ] 
      }
    ]
  }
];

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

export function getCourseBySlug(slug: string): CourseDetail | undefined {
  return COURSES.find((course) => course.slug === slug);
}

export function getRelatedCourses(slug: string, limit = 3): CourseDetail[] {
  const current = getCourseBySlug(slug);
  if (!current) return [];
  return COURSES.filter(
    (course) => course.slug !== slug && course.category === current.category
  ).slice(0, limit);
}