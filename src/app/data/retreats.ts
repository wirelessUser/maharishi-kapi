export interface RetreatStop {
  name: string;
  description: string;
}

export interface RetreatPractice {
  name: string;
  description: string;
  icon: string;
}

export interface ItineraryDay {
  days: string;
  date: string;
  title: string;
}

export interface RetreatFeature {
  icon: string;
  label: string;
}

export interface PricingTier {
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
}

export interface RetreatFaq {
  question: string;
  answer: string;
}

export interface RetreatTestimonial {
  name: string;
  location: string;
  quote: string;
}

export interface Retreat {
  slug: string;
  status: 'upcoming' | 'past';
  tagline: string;
  title: string;
  subtitle: string;
  summary: string;
  dateRange: string;
  duration: string;
  location: string;
  elevation?: string;
  heroImage: string;
  cardImage: string;
  priceFrom: number;
  seatsTotal: number;
  seatsLeft: number;
  rating: number;

  journeyIntro: string;
  journeyQuote: string;
  journeyImage: string;

  forYou: string[];
  notForYou: string[];
  outcomes: string[];

  routeTitle: string;
  route: RetreatStop[];

  practices: RetreatPractice[];

  gallery: string[];

  itinerary: ItineraryDay[];
  itineraryImage: string;
  itineraryCaption: string;

  requirements: string[];
  included: RetreatFeature[];

  pricing: PricingTier[];
  faqs: RetreatFaq[];
  testimonials: RetreatTestimonial[];
}

export const RETREATS: Retreat[] = [
  {
    slug: 'himalayan-sadhana-retreat',
    status: 'upcoming',
    tagline: 'Spiritual Retreat · Himalayas · India',
    title: 'Himalayan Sadhana Retreat',
    subtitle: 'Rishikesh to Gaumukh–Tapovan Pilgrimage',
    summary: '13 days of sadhana, silence, meditation, trekking and inner transformation in the sacred Himalayas.',
    dateRange: '26 Sep – 07 Oct 2026',
    duration: '13 Days',
    location: 'Tapovan',
    elevation: '4,463 m / 14,640 ft',
    heroImage: 'https://images.unsplash.com/photo-1607836046730-3317bd58a31b?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1607836046730-3317bd58a31b?auto=format&fit=crop&w=800&q=80',
    priceFrom: 999,
    seatsTotal: 20,
    seatsLeft: 6,
    rating: 4.9,

    journeyIntro: 'This is a sacred journey — a path of self-discovery, where the mountains, the river, and your own inner silence become your greatest teachers. It is not about escaping life, but about reconnecting with your true self.',
    journeyQuote: 'The Himalayas don’t just change your view — they change your inner landscape.',
    journeyImage: 'https://images.unsplash.com/photo-1612642282127-2972f8bc9b7f?auto=format&fit=crop&w=900&q=80',

    forYou: [
      'You feel called to silence but rarely give yourself permission for it',
      'You want to learn meditation and Kriya from a living lineage, not an app',
      'You can walk 6–8 hours a day and sit with discomfort without needing to fix it',
      'You are ready to unplug completely for two weeks',
    ],
    notForYou: [
      'You need daily connectivity for work or family reasons',
      'You are looking for a leisure holiday with sightseeing and free time',
    ],
    outcomes: [
      'A daily meditation and pranayama practice you can sustain long after you leave',
      'A felt experience of Mauna (silence) and what it actually reveals about your mind',
      'Direct transmission of Kriya & Kundalini Sadhana from Acharya Alok Awasthi',
      'A reset nervous system — most seekers report sleeping and digesting better within days',
      'A community of fellow seekers who understand exactly what you went through',
    ],

    routeTitle: 'From Rishikesh to Tapovan',
    route: [
      { name: 'Rishikesh', description: 'The journey begins' },
      { name: 'Uttarkashi', description: 'Into the mountains' },
      { name: 'Gangotri', description: 'Sacred source' },
      { name: 'Gaumukh', description: 'The origin of the Ganga' },
      { name: 'Tapovan', description: '4,463 m / 14,640 ft' },
    ],

    practices: [
      { name: 'Mauna', description: 'Silence & inner listening', icon: 'fa-hand' },
      { name: 'Meditation', description: 'Calm the mind', icon: 'fa-om' },
      { name: 'Kriya & Kundalini Sadhana', description: 'Awaken your energy', icon: 'fa-bolt' },
      { name: 'Devotion to Ma Ganga', description: 'Connect with the divine', icon: 'fa-water' },
      { name: 'Vedic Self-Inquiry', description: 'Return to your true self', icon: 'fa-eye' },
    ],

    gallery: [
      'https://images.unsplash.com/photo-1607836046730-3317bd58a31b?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1612642282127-2972f8bc9b7f?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1737377454208-e3694ce15fea?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1635050554106-5834bc2777dd?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1678296489068-3c311c2e1299?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1709377087022-268122adf6cc?auto=format&fit=crop&w=700&q=80',
    ],

    itinerary: [
      { days: 'Day 1 – 2', date: 'Sep 26', title: 'Arrival & Opening Ceremony' },
      { days: 'Day 3 – 4', date: 'Sep 27', title: 'Preparation, Purification & Healing' },
      { days: 'Day 5 – 6', date: 'Sep 28', title: 'Uttarkashi' },
      { days: 'Day 7 – 8', date: 'Sep 29 – 30', title: 'Gangotri' },
      { days: 'Day 9', date: 'Oct 1', title: 'Trek to Gaumukh' },
      { days: 'Day 10', date: 'Oct 2', title: 'Tapovan' },
      { days: 'Day 11', date: 'Oct 3', title: 'Return to Gangotri' },
      { days: 'Day 12 – 13', date: 'Oct 4 – 5', title: 'Integration, Silence & Sadhana' },
      { days: 'Day 14', date: 'Oct 6', title: 'Return to Ashram' },
      { days: 'Day 15', date: 'Oct 7', title: 'Closing Ceremony & Departure' },
    ],
    itineraryImage: 'https://images.unsplash.com/photo-1737377454208-e3694ce15fea?auto=format&fit=crop&w=800&q=80',
    itineraryCaption: 'Gaumukh — where the Ganga begins',

    requirements: [
      'Good / intermediate fitness level required',
      '6–8 hours walking per day on mountainous terrain',
      'Acclimatisation time built in for high altitude',
      'Simple guesthouse / tent accommodation during trek',
      'Ashram stay in Rishikesh (comfortable, basic)',
    ],
    included: [
      { icon: 'fa-mountain-sun', label: 'Himalayan Sadhana' },
      { icon: 'fa-person', label: 'Silent Meditation' },
      { icon: 'fa-bolt', label: 'Kriya & Kundalini Sadhana' },
      { icon: 'fa-water', label: 'Ganga Worship' },
      { icon: 'fa-leaf', label: 'Ayurvedic Healing Immersion' },
      { icon: 'fa-person-hiking', label: 'Trekking to Gaumukh & Tapovan' },
      { icon: 'fa-house', label: 'Ashram Living Discipline' },
      { icon: 'fa-bowl-rice', label: 'Vegetarian Meals & Accommodation' },
    ],

    pricing: [
      { name: 'Shared Room', price: 999, popular: true, features: ['Shared accommodation', 'All meals (sattvic)', 'Guided practices & trekking', 'Full program support'] },
      { name: 'Private Room', price: 1499, features: ['Private accommodation', 'All meals (sattvic)', 'Guided practices & trekking', 'Full program support'] },
    ],
    faqs: [
      { question: 'What is included in the retreat?', answer: 'All accommodation, sattvic vegetarian meals, guided sadhana, trekking to Gaumukh and Tapovan, and full program support from arrival to departure.' },
      { question: 'What is the fitness level required?', answer: 'A good/intermediate fitness level is needed — expect 6–8 hours of walking per day on mountainous terrain, with built-in acclimatisation time.' },
      { question: 'Who should I pack?', answer: 'Layered warm clothing, sturdy trekking shoes, a good sleeping bag rated for sub-zero temperatures, and a refillable water bottle. A full packing list is sent after booking.' },
      { question: 'How do I reach Rishikesh?', answer: 'Fly into Dehradun (Jolly Grant Airport) or take a train to Haridwar — both are about an hour from Rishikesh by road. We can help arrange the pickup.' },
      { question: 'What makes Gaumukh–Tapovan special?', answer: 'Gaumukh is the source glacier of the Ganga, and Tapovan is a high-altitude meadow long used by yogis for deep meditation — few pilgrimage routes combine both this closely.' },
    ],
    testimonials: [
      { name: 'Priya S.', location: 'India', quote: 'I appreciated being immersed in yogic practices every day. The teachers were knowledgeable and supportive, and the environment was peaceful and inspiring.' },
      { name: 'Rahul M.', location: 'India', quote: 'It was really a life-changing retreat. It helped me find clarity and a deeper connection with myself.' },
      { name: 'Karan V.', location: 'Mumbai', quote: "I've done meditation apps for years. Nothing prepared me for what silence actually feels like on day 6. This retreat gave me something no app ever could." },
    ],
  },

  {
    slug: 'kerala-ayurveda-retreat',
    status: 'past',
    tagline: 'Spiritual Retreat · Kerala · India',
    title: 'Kerala Ayurveda Retreat',
    subtitle: 'Backwaters, Ayurveda & Panchakosha Healing',
    summary: 'A transformational 12-day retreat blending Ayurvedic detox, Panchakosha energy healing, and the stillness of the Kerala backwaters — designed especially for our international community.',
    dateRange: '23 Nov – 04 Dec 2025',
    duration: '12 Days',
    location: 'Alleppey Backwaters',
    heroImage: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=80',
    priceFrom: 1099,
    seatsTotal: 18,
    seatsLeft: 0,
    rating: 4.8,

    journeyIntro: 'Kerala moves at the pace of water. This retreat slows you down to meet it — Ayurvedic routine by day, backwater stillness by evening, and the Panchakosha framework to heal body, breath, mind, intellect and spirit as one system.',
    journeyQuote: 'Healing is not an event. It is a rhythm you return to.',
    journeyImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80',

    forYou: [
      'You are carrying stress in your body and know it — chronic fatigue, poor sleep, tension',
      'You want a gentle reset, not a physically demanding trek',
      'You are curious about Ayurveda beyond a single spa treatment',
      'You want daily one-on-one time with an Ayurvedic assessment, not a generic package',
    ],
    notForYou: [
      'You want an intense physical challenge or adventure trekking',
      'You are not open to dietary restrictions during the program',
    ],
    outcomes: [
      'A personal Ayurvedic dosha assessment and a routine you can keep at home',
      'Direct experience of Panchakosha energy work across all five layers of self',
      'Marma point techniques you can use on yourself for ongoing relief',
      'Measurably better sleep and digestion by the end of the program',
      'A slower relationship with time that outlasts the retreat itself',
    ],

    routeTitle: 'From Kochi to the Backwaters',
    route: [
      { name: 'Kochi', description: 'The journey begins' },
      { name: 'Munnar', description: 'Into the tea hills' },
      { name: 'Thekkady', description: 'Forest & spice country' },
      { name: 'Alleppey', description: 'The backwaters' },
      { name: 'Kovalam', description: 'Closing by the sea' },
    ],

    practices: [
      { name: 'Panchakosha Energy Yoga', description: 'Heal across five layers', icon: 'fa-layer-group' },
      { name: 'Ayurvedic Panchakarma', description: 'Deep seasonal detox', icon: 'fa-leaf' },
      { name: 'Backwater Meditation', description: 'Stillness on water', icon: 'fa-water' },
      { name: 'Marma Point Therapy', description: 'Release blocked energy', icon: 'fa-hand-dots' },
      { name: 'Yogic Nidra', description: 'Conscious deep rest', icon: 'fa-moon' },
    ],

    gallery: [
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1633145284780-c8fda4f11464?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1704365159747-1f7b8913044f?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=700&q=80',
    ],

    itinerary: [
      { days: 'Day 1 – 2', date: 'Nov 23', title: 'Arrival in Kochi & Orientation' },
      { days: 'Day 3 – 4', date: 'Nov 25', title: 'Ayurvedic Assessment & Munnar' },
      { days: 'Day 5 – 6', date: 'Nov 27', title: 'Thekkady — Forest Immersion' },
      { days: 'Day 7 – 9', date: 'Nov 29', title: 'Alleppey Backwaters — Panchakarma' },
      { days: 'Day 10', date: 'Dec 2', title: 'Marma Therapy Intensive' },
      { days: 'Day 11 – 12', date: 'Dec 3 – 4', title: 'Kovalam — Integration & Closing' },
    ],
    itineraryImage: 'https://images.unsplash.com/photo-1633145284780-c8fda4f11464?auto=format&fit=crop&w=800&q=80',
    itineraryCaption: 'Alleppey — the heart of the backwaters',

    requirements: [
      'Suitable for all fitness levels',
      'Daily Ayurvedic treatments (2–3 hours)',
      'Simple, sattvic vegetarian diet throughout',
      'Houseboat stay for 2 nights on the backwaters',
      'Resort accommodation for the remaining nights',
    ],
    included: [
      { icon: 'fa-leaf', label: 'Ayurvedic Panchakarma' },
      { icon: 'fa-layer-group', label: 'Panchakosha Energy Yoga' },
      { icon: 'fa-water', label: 'Backwater Houseboat Stay' },
      { icon: 'fa-hand-dots', label: 'Marma Point Therapy' },
      { icon: 'fa-moon', label: 'Daily Yogic Nidra' },
      { icon: 'fa-bowl-rice', label: 'Sattvic Meals & Accommodation' },
    ],

    pricing: [
      { name: 'Shared Room', price: 1099, popular: true, features: ['Shared accommodation', 'All meals (sattvic)', 'Daily Ayurvedic treatments', 'Full program support'] },
      { name: 'Private Room', price: 1599, features: ['Private accommodation', 'All meals (sattvic)', 'Daily Ayurvedic treatments', 'Full program support'] },
    ],
    faqs: [
      { question: 'Was this retreat suitable for beginners?', answer: 'Yes — this was designed for all fitness and experience levels, with an emphasis on rest and gentle healing rather than physical exertion.' },
      { question: 'What was included?', answer: 'Accommodation, sattvic meals, daily Ayurvedic treatments, a 2-night houseboat stay, and all guided practices.' },
      { question: 'Will this retreat run again?', answer: 'Yes — Kerala retreats run seasonally. Reach out to be notified when the next batch opens for booking.' },
    ],
    testimonials: [
      { name: 'Sneha K.', location: 'International Community', quote: 'The Panchakosha framework finally made sense to me once I lived it, not just studied it. The backwaters did half the healing on their own.' },
      { name: 'Meera P.', location: 'UK', quote: 'I came in exhausted and skeptical of Ayurveda. I left with an actual daily routine I still follow eight months later.' },
    ],
  },

  {
    slug: 'divine-india-retreat',
    status: 'upcoming',
    tagline: 'Spiritual Retreat · Pan-India · Temple Trails',
    title: 'Divine India Retreat',
    subtitle: 'A Temple Trails Journey Across Sacred India',
    summary: 'A transformational 12-day spiritual wellness journey led by Acharya Alok Awasthi — balancing energy, deepening Vedic understanding, and awakening the inner self across India’s most sacred temple cities.',
    dateRange: '15 – 26 Nov 2026',
    duration: '12 Days',
    location: 'Varanasi to Rishikesh',
    heroImage: 'https://images.unsplash.com/photo-1621787084849-ed98731b3071?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1621787084849-ed98731b3071?auto=format&fit=crop&w=800&q=80',
    priceFrom: 1199,
    seatsTotal: 22,
    seatsLeft: 11,
    rating: 4.9,

    journeyIntro: 'Some places don’t just hold history — they hold a frequency. This retreat moves through India’s most sacred temple cities, each one chosen for the specific energy it carries, closing where the Ganga first meets the plains: Rishikesh.',
    journeyQuote: 'A temple is not a destination. It is an instrument, tuned over centuries.',
    journeyImage: 'https://images.unsplash.com/photo-1554554497-0095c34db3ec?auto=format&fit=crop&w=900&q=80',

    forYou: [
      'You are drawn to India\'s temples but want to understand what you\'re witnessing, not just photograph it',
      'You want Satsang and discourse with Acharya Alok, not a guided-tour commentary',
      'You are comfortable with intercity travel and early morning ceremonies',
      'You want a pilgrimage that closes with integration, not just a checklist of sites',
    ],
    notForYou: [
      'You are looking for a slow, single-location retreat',
      'You are not comfortable with modest dress requirements at religious sites',
    ],
    outcomes: [
      'A working understanding of temple ritual, Vedic chanting, and Havan — not just observation',
      'Personal Satsang time with Acharya Alok Awasthi across five sacred cities',
      'A felt sense of the "frequency" long associated with each temple, explained through Vedic philosophy',
      'A closing integration in Rishikesh that turns pilgrimage into a lived practice',
    ],

    routeTitle: 'From Varanasi to Rishikesh',
    route: [
      { name: 'Varanasi', description: 'The eternal city' },
      { name: 'Ayodhya', description: 'Birthplace of Rama' },
      { name: 'Prayagraj', description: 'The sacred confluence' },
      { name: 'Ujjain', description: 'Seat of Mahakaleshwar' },
      { name: 'Rishikesh', description: 'Where the journey closes' },
    ],

    practices: [
      { name: 'Temple Darshan & Ritual', description: 'Ancient worship, understood', icon: 'fa-place-of-worship' },
      { name: 'Ganga Aarti', description: 'Fire offering to the river', icon: 'fa-fire' },
      { name: 'Vedic Chanting', description: 'Sound as sadhana', icon: 'fa-om' },
      { name: 'Havan', description: 'Sacred fire ceremony', icon: 'fa-fire-flame-curved' },
      { name: 'Satsang & Discourse', description: 'Wisdom in community', icon: 'fa-hands-praying' },
    ],

    gallery: [
      'https://images.unsplash.com/photo-1621787084849-ed98731b3071?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1554554497-0095c34db3ec?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1529733772151-bab41484710a?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1566915682737-3e97a7eed93b?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1575925368237-5c5689ec4cf3?auto=format&fit=crop&w=700&q=80',
    ],

    itinerary: [
      { days: 'Day 1 – 2', date: 'Nov 15', title: 'Arrival in Varanasi & Ganga Aarti' },
      { days: 'Day 3 – 4', date: 'Nov 17', title: 'Varanasi Temple Trails & Satsang' },
      { days: 'Day 5', date: 'Nov 19', title: 'Ayodhya' },
      { days: 'Day 6 – 7', date: 'Nov 20', title: 'Prayagraj — The Sacred Confluence' },
      { days: 'Day 8 – 9', date: 'Nov 22', title: 'Ujjain — Mahakaleshwar' },
      { days: 'Day 10 – 11', date: 'Nov 24', title: 'Rishikesh — Integration & Sadhana' },
      { days: 'Day 12', date: 'Nov 26', title: 'Closing Ceremony & Departure' },
    ],
    itineraryImage: 'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?auto=format&fit=crop&w=800&q=80',
    itineraryCaption: 'One of the sacred temple stops along the trail',

    requirements: [
      'Suitable for all fitness levels',
      'Significant travel between cities (train & road)',
      'Early morning temple visits and ceremonies',
      'Modest dress required at all temple sites',
      'Hotel accommodation throughout',
    ],
    included: [
      { icon: 'fa-place-of-worship', label: 'Guided Temple Darshan' },
      { icon: 'fa-fire', label: 'Ganga Aarti Ceremony' },
      { icon: 'fa-om', label: 'Daily Vedic Chanting' },
      { icon: 'fa-fire-flame-curved', label: 'Havan Fire Ceremony' },
      { icon: 'fa-hands-praying', label: 'Satsang with Acharya Alok' },
      { icon: 'fa-bowl-rice', label: 'Meals & Hotel Accommodation' },
    ],

    pricing: [
      { name: 'Shared Room', price: 1199, popular: true, features: ['Shared accommodation', 'All meals', 'Guided temple trails', 'Full program support'] },
      { name: 'Private Room', price: 1699, features: ['Private accommodation', 'All meals', 'Guided temple trails', 'Full program support'] },
    ],
    faqs: [
      { question: 'How much travel is involved?', answer: 'This retreat moves across five cities by train and road. Travel days are built into the itinerary and are part of the experience, not just transit.' },
      { question: 'Is there a dress code?', answer: 'Yes — modest, temple-appropriate clothing is required at all sacred sites. A guide is sent after booking.' },
      { question: 'Who leads this retreat?', answer: 'Acharya Alok Awasthi personally leads the Satsang and discourse sessions throughout the journey.' },
    ],
    testimonials: [
      { name: 'Manish A.', location: 'Delhi', quote: 'I have visited most of these temples before as a tourist. Seeing them again through this retreat was a completely different experience.' },
      { name: 'Devika R.', location: 'Bengaluru', quote: 'The Satsang sessions each evening were worth the trip alone. I finally understood rituals I had performed my whole life without knowing why.' },
    ],
  },
];

export function getRetreatBySlug(slug: string): Retreat | undefined {
  return RETREATS.find((retreat) => retreat.slug === slug);
}
