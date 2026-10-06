// products.data.ts
export interface Product {
  slug: string;
  title: string;
  sanskritTag: string;
  category: 'Rosary & Malas' | 'Aromatics & Dhoop' | 'Havan Essentials' | 'Vastu & Sacred Artifacts' | 'Sacred Books';
  badge: string;
  image: string;
  price: number;
  originalPrice: number;
  specifications: string;
  summary: string;
}

export const PRODUCTS: Product[] = [
  // ================= 1. ROSARIES & MALAS (रुद्राक्ष व माला) =================
  {
    slug: 'panchamukhi-rudraksha-mala',
    title: '5-Mukhi Nepali Rudraksha Japa Mala',
    sanskritTag: 'रुद्राक्ष',
    category: 'Rosary & Malas',
    badge: 'Lab Certified',
    image: 'https://storagemaharishikapicom.blob.core.windows.net/products-page-1/rudraksh.png',
    price: 1850,
    originalPrice: 2400,
    specifications: '108+1 Beads • 8 mm • Nepali Origin',
    summary: 'Authentic 5-faced Rudraksha seeds hand-knotted with silk thread and tassels for daily mantra japa and mental equilibrium.'
  },
  {
    slug: 'ek-mukhi-rudraksha-certified',
    title: 'Rare 1-Mukhi Kaju Rudraksha with Silver Capping',
    sanskritTag: 'शिव बीज',
    category: 'Rosary & Malas',
    badge: 'Govt. Lab Certified',
    image: 'https://storagemaharishikapicom.blob.core.windows.net/products-page-1/1_mukhi_rudrakhs-removebg-preview.png',
    price: 14500,
    originalPrice: 18000,
    specifications: 'Single Seed • 925 Pure Silver Capped',
    summary: 'Sacred one-faced bead associated with supreme consciousness, encased in hallmarked sterling silver for spiritual protection.'
  },
  {
    slug: 'pure-sphatik-quartz-mala',
    title: 'Natural Sphatik (Himalayan Quartz) Japa Mala',
    sanskritTag: 'स्फटिक',
    category: 'Rosary & Malas',
    badge: 'Natural Gemstone',
    image: 'https://images.unsplash.com/photo-1587301669864-4e3a47ff78a4?auto=format&fit=crop&w=600&q=80',
    price: 2950,
    originalPrice: 3800,
    specifications: '108 Beads • Diamond Cut 7 mm',
    summary: 'Cooling, natural quartz crystal beads ideal for chanting Saraswati, Lakshmi, and Gayatri mantras.'
  },
  {
    slug: 'vrindavan-tulsi-kanthi-mala',
    title: 'Handcrafted Vrindavan 3-Fold Tulsi Kanthi Mala',
    sanskritTag: 'तुलसी',
    category: 'Rosary & Malas',
    badge: 'Organic Sacred Wood',
    image: 'https://images.unsplash.com/photo-1550993077-47b2c58908f9?auto=format&fit=crop&w=600&q=80',
    price: 650,
    originalPrice: 900,
    specifications: '3 Rounds • Traditional Barrel Bead',
    summary: 'Pure Vrindavan holy basil stem beads worn around the neck for spiritual purification, digestive harmony, and devotion.'
  },
  {
    slug: 'red-sandalwood-rakta-chandan-mala',
    title: 'Red Sandalwood (Rakta Chandan) 108 Bead Mala',
    sanskritTag: 'रक्त चन्दन',
    category: 'Rosary & Malas',
    badge: 'Naturally Fragrant',
    image: 'https://images.unsplash.com/photo-1507675971488-8128ee2a991b?auto=format&fit=crop&w=600&q=80',
    price: 1450,
    originalPrice: 1950,
    specifications: '108 Beads • 8 mm Unpolished Core',
    summary: 'Natural red sandalwood beads sacred to the Divine Mother and Mars planetary pacification, hand-strung with traditional knotting.'
  },
  {
    slug: 'kamal-gatta-lotus-seed-mala',
    title: 'Kamal Gatta (Black Lotus Seed) Sadhana Mala',
    sanskritTag: 'कमलगट्टा',
    category: 'Rosary & Malas',
    badge: 'Lakshmi Sadhana',
    image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&w=600&q=80',
    price: 850,
    originalPrice: 1200,
    specifications: '108 Seeds • Natural Dried Seeds',
    summary: 'Wild dried lotus seeds traditionally utilized for invoking prosperity, removing financial blockages, and Shri Vidya sadhana.'
  },

  // ================= 2. AROMATICS & DHOOP (सुगन्ध, कपूर व धूप) =================
  {
    slug: 'pure-bhimseni-camphor-jar',
    title: 'Pure Bhimseni Desi Camphor (भीमसेनी कपूर)',
    sanskritTag: 'कर्पूर',
    category: 'Aromatics & Dhoop',
    badge: '100% Edible & Pure',
    image: 'https://images.unsplash.com/photo-1611078746358-1f19d268d839?auto=format&fit=crop&w=600&q=80',
    price: 780,
    originalPrice: 990,
    specifications: '250 g Airtight Jar • Raw Crystals',
    summary: 'Unadulterated pine-derived Bhimseni kapoor flakes that burn residue-free, clearing atmospheric negative vibrations and respiratory tract.'
  },
  {
    slug: 'vedic-guggul-loban-dhoop-batti',
    title: 'Handmade Organic Guggul & Loban Dhoop Cones',
    sanskritTag: 'गुग्गुल धूप',
    category: 'Aromatics & Dhoop',
    badge: 'Charcoal Free',
    image: 'https://images.unsplash.com/photo-1542451000-8356a6405781?auto=format&fit=crop&w=600&q=80',
    price: 450,
    originalPrice: 600,
    specifications: '40 Cones • Natural Resins & Cow Dung',
    summary: 'Crafted from forest-harvested Shuddh Guggul, frankincense (loban), and native cow ghee. Produces an authentic temple sanctuary fragrance.'
  },
  {
    slug: 'mysore-sandalwood-chandan-rubbing-stone',
    title: 'Pure Mysore Sandalwood Block with Stone Rubbing Slab',
    sanskritTag: 'श्रीखण्ड चन्दन',
    category: 'Aromatics & Dhoop',
    badge: 'Forest Certified Grade',
    image: 'https://images.unsplash.com/photo-1628157790317-06dae2fb1bd4?auto=format&fit=crop&w=600&q=80',
    price: 2400,
    originalPrice: 3200,
    specifications: '75 g Solid Heartwood + Granite Silbata',
    summary: 'Authentic Santalum album heartwood with a traditional granite rubbing plate for daily pure tilak and deity abhishek.'
  },
  {
    slug: 'traditional-kesar-ashtagandha-paste',
    title: 'Shahi Kesar Ashtagandha Tilak Paste',
    sanskritTag: 'अष्टगन्ध',
    category: 'Aromatics & Dhoop',
    badge: '8 Herb Formula',
    image: 'https://images.unsplash.com/photo-1617882236081-36ba95bbbb5a?auto=format&fit=crop&w=600&q=80',
    price: 360,
    originalPrice: 480,
    specifications: '100 g Sealed Brass Tub',
    summary: 'Traditional blend of saffron, camphor, sandalwood, and Himalayan herbs formulated for Ajna chakra activation and cool focus.'
  },
  {
    slug: 'cow-ghee-diya-wicks',
    title: 'Desi Cow Bilona Ghee Diya Wicks (Pack of 100)',
    sanskritTag: 'घृत दीप',
    category: 'Aromatics & Dhoop',
    badge: 'Ready to Light',
    image: 'https://images.unsplash.com/photo-1596781254334-03295cdaecbc?auto=format&fit=crop&w=600&q=80',
    price: 490,
    originalPrice: 650,
    specifications: '100 Solidified Wicks • 30 Min Burn Time',
    summary: 'Prepared from hand-churned A2 cow bilona ghee and pure organic cotton wicks with mild camphor aroma for sacred daily twilight Aarti.'
  },
  {
    slug: 'forest-sambrani-loban-cups',
    title: 'Hawan Cup Dhoop with Pure Loban & Benzoin Resins',
    sanskritTag: 'लोबान कप',
    category: 'Aromatics & Dhoop',
    badge: 'Natural Air Purifier',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80',
    price: 380,
    originalPrice: 500,
    specifications: 'Pack of 12 Cups with Fiber Stand',
    summary: 'Ready-to-burn miniature havan sambrani cups formulated from dried neem leaves, resin, and cow dung for home purification.'
  },

  // ================= 3. HAVAN & YAGYA ESSENTIALS (हवन व यज्ञ सामग्री) =================
  {
    slug: 'shuddh-51-herb-havan-samagri',
    title: 'Maha Yagya 51-Medicinal Herb Havan Samagri',
    sanskritTag: 'यज्ञ सामग्री',
    category: 'Havan Essentials',
    badge: 'Shastric Proportion',
    image: 'https://images.unsplash.com/photo-1582650058253-605a968bd0a2?auto=format&fit=crop&w=600&q=80',
    price: 750,
    originalPrice: 950,
    specifications: '1 kg Kraft Bag • Coarse Cut Herbs',
    summary: 'Contains Jatamansi, Agar-Tagar, Nagarmotha, Shatavari, Guggal, and black sesame in traditional proportions for potent sacrificial homams.'
  },
  {
    slug: 'traditional-brass-havan-kund-set',
    title: 'Pure Brass Heavy Havan Kund with Sruk-Sruva Ladles',
    sanskritTag: 'हवन कुण्ड',
    category: 'Havan Essentials',
    badge: 'Solid Brass 1.8 kg',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    price: 3850,
    originalPrice: 5200,
    specifications: '9x9 Inches Pyramid • Complete 3 pc Set',
    summary: 'Accurately proportioned stepped pyramid copper-brass havan kund designed to generate maximum thermal convection during oblation.'
  },
  {
    slug: 'navagraha-samidha-wood-bundle',
    title: 'Consecrated Navagraha Samidha Herb Wood Sticks',
    sanskritTag: 'समिधा',
    category: 'Havan Essentials',
    badge: '9 Planetary Woods',
    image: 'https://images.unsplash.com/photo-1613994326574-8aa471d80b62?auto=format&fit=crop&w=600&q=80',
    price: 550,
    originalPrice: 700,
    specifications: '9 Bundles (Palash, Khadir, Shami, etc.)',
    summary: 'Authentic sacrificial twigs gathered in accordance with astrological guidelines for Navagraha Shanti and specific planetary homams.'
  },
  {
    slug: 'agnihotra-cow-dung-cakes',
    title: 'Sun-Dried Agnihotra Cow Dung Cakes (उपले)',
    sanskritTag: 'गोमय',
    category: 'Havan Essentials',
    badge: 'Desi Indigenous Breed',
    image: 'https://images.unsplash.com/photo-1626296185868-d784a9e1e127?auto=format&fit=crop&w=600&q=80',
    price: 320,
    originalPrice: 450,
    specifications: 'Pack of 25 Discs • Chemical-Free',
    summary: 'Carefully cured discs from free-range indigenous Indian cows, producing pure therapeutic smoke during dawn and dusk Agnihotra.'
  },
  {
    slug: 'black-sesame-barley-yava-yagya-mix',
    title: 'Sacred Kala Til (Black Sesame) & Yava (Barley) Mix',
    sanskritTag: 'तिल व यव',
    category: 'Havan Essentials',
    badge: 'Cleaned & Sorted',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    price: 290,
    originalPrice: 380,
    specifications: '500 g Pouch • Double Sifted',
    summary: 'High-oil black sesame and polished golden barley for Pitru Tarpan and Vedic Homa oblations.'
  },
  {
    slug: 'pure-gangajal-gangotri-brass-kalash',
    title: 'Consecrated Gangotri Gangajal in Sealed Brass Kalash',
    sanskritTag: 'गङ्गाजल',
    category: 'Havan Essentials',
    badge: 'Origin Sourced',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80',
    price: 650,
    originalPrice: 850,
    specifications: '500 ml Sealed Brass Vessel',
    summary: 'Untouched holy water collected directly from the high-altitude Himalayan source for Abhishek, Kalash Sthapana, and ritual sanctification.'
  },

  // ================= 4. VASTU & SACRED ARTIFACTS (वास्तु व ऊर्जा उत्पाद) =================
  {
    slug: 'meru-prushtha-shree-yantra-brass',
    title: 'Meru Prushtha 3D Shree Yantra (Solid Brass)',
    sanskritTag: 'श्री यन्त्र',
    category: 'Vastu & Sacred Artifacts',
    badge: 'Prana Pratishtha Consecrated',
    image: 'https://images.unsplash.com/photo-1589315024227-2c97696e5725?auto=format&fit=crop&w=600&q=80',
    price: 5200,
    originalPrice: 7000,
    specifications: '3.5 x 3.5 x 3.5 Inches • 850 g Solid Brass',
    summary: 'Mathematically exact 3D stepped sacred geometry representing cosmic creation; balances North-East Ishanya Vastu defects.'
  },
  {
    slug: 'natural-gomati-chakra-silver-capped',
    title: 'Natural Gomati Chakra Set of 11 (Silver Plated)',
    sanskritTag: 'गोमती चक्र',
    category: 'Vastu & Sacred Artifacts',
    badge: 'River Sourced Shells',
    image: 'https://images.unsplash.com/photo-1620021666060-63ce2f9a7aa9?auto=format&fit=crop&w=600&q=80',
    price: 1150,
    originalPrice: 1600,
    specifications: '11 Selected Natural Shells in Velvet Box',
    summary: 'Rare spiraled calcium formations from the Gomati river symbolizing the Sudarshana Chakra; placed in cash vaults for steady prosperity.'
  },
  {
    slug: 'natural-dakshinavarti-blowing-shankh',
    title: 'Natural Non-Blowing Dakshinavarti Lakshmi Shankh',
    sanskritTag: 'दक्षिणावर्ती शंख',
    category: 'Vastu & Sacred Artifacts',
    badge: 'Natural White Conch',
    image: 'https://images.unsplash.com/photo-1605389658514-6b801a2f9011?auto=format&fit=crop&w=600&q=80',
    price: 4900,
    originalPrice: 6500,
    specifications: '5.5 Inches Length • Natural Sea Conch',
    summary: 'Right-spiraled conch shell associated with divine grace and fortune, meant for bathing Saligram Shila or resting on a silver turtle stand.'
  },
  {
    slug: 'parad-mercury-shivling',
    title: 'Shuddh Parad (Purified Mercury) Shivling',
    sanskritTag: 'पारद शिवलिंग',
    category: 'Vastu & Sacred Artifacts',
    badge: 'Sanskarit Solid Parad',
    image: 'https://images.unsplash.com/photo-1622308644420-a6813cbbfec1?auto=format&fit=crop&w=600&q=80',
    price: 7800,
    originalPrice: 9900,
    specifications: '150 g Solidified Mercury • Lab Tested',
    summary: 'Solidified through classical Ayurvedic mercury purification processes (Ashtadasha Samskara); revered for immense calm and meditative stillness.'
  },
  {
    slug: 'brass-vastu-energy-pyramid',
    title: 'Multi-Tier Brass Vastu Energy Grid Pyramid (9x9)',
    sanskritTag: 'वास्तु पिरामिड',
    category: 'Vastu & Sacred Artifacts',
    badge: 'Directional Corrector',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    price: 2600,
    originalPrice: 3400,
    specifications: '4.5 x 4.5 Inches • 81 Brass Micro-Pyramids',
    summary: 'Engineered brass energy matrix that rectifies directional flaws and structural cuts without requiring physical renovation.'
  },
  {
    slug: 'himalayan-rock-salt-lamp-brass',
    title: 'Himalayan Pink Rock Salt Ionizing Lamp with Brass Stand',
    sanskritTag: 'सैन्धव लवण',
    category: 'Vastu & Sacred Artifacts',
    badge: 'Natural Geo-Crystal',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
    price: 1850,
    originalPrice: 2400,
    specifications: '3-4 kg Natural Cut • Brass Base with Dimmer',
    summary: 'Emits gentle negative ions and a warm amber hue to clear electromagnetic stress and stale Chi in bedrooms and home offices.'
  },

  // ================= 5. SACRED BOOKS & CLASSICAL GRANTHAS (पवित्र ग्रन्थ) =================
  {
    slug: 'shrimad-bhagavad-gita-deluxe',
    title: 'Srimad Bhagavad Gita — Archival Sanskrit & Commentary',
    sanskritTag: 'श्रीमद्भगवद्गीता',
    category: 'Sacred Books',
    badge: 'Cloth-Bound Hardcover',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    price: 1650,
    originalPrice: 2200,
    specifications: '700 Pages • Gold Foil Edges • Sanskrit & English',
    summary: 'Complete 18 chapters with word-for-word grammatical breakdown, traditional Advaita commentary, and archival acid-free bond paper.'
  },
  {
    slug: 'patanjali-yoga-sutras-commentary',
    title: 'The Yoga Sutras of Patanjali — Complete Shastric Bhashya',
    sanskritTag: 'योग सूत्र',
    category: 'Sacred Books',
    badge: 'Collector Edition',
    image: 'https://images.unsplash.com/photo-1506784926709-22f1ec395907?auto=format&fit=crop&w=600&q=80',
    price: 1450,
    originalPrice: 1950,
    specifications: '480 Pages • Deluxe Hardcover • Vyasa Bhashya',
    summary: 'The ultimate guide to Raja Yoga, mental modifications (Chitta Vritti), and Samadhi with authentic classical commentaries.'
  },
  {
    slug: 'brihat-parashara-hora-shastra',
    title: 'Brihat Parashara Hora Shastra (Set of 2 Volumes)',
    sanskritTag: 'पाराशर होरा',
    category: 'Sacred Books',
    badge: 'Vedic Astrology Classic',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=600&q=80',
    price: 3200,
    originalPrice: 4200,
    specifications: '2 Hardbound Volumes • 1400 Pages Comprehensive',
    summary: 'The foundational scripture of Vedic Jyotisha detailing chart synthesis, planetary dignities, dashas, and traditional remedies.'
  },
  {
    slug: 'charaka-samhita-principles',
    title: 'Charaka Samhita — Fundamentals of Classical Ayurveda',
    sanskritTag: 'चरक संहिता',
    category: 'Sacred Books',
    badge: 'Sanskrit & Translation',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
    price: 2850,
    originalPrice: 3600,
    specifications: 'Sutra Sthana Focus • 920 Pages • Gold Ribbon',
    summary: 'The primary classical Ayurvedic text detailing Tridosha constitution, daily seasonal regimens (Dinacharya/Ritucharya), and longevity.'
  },
  {
    slug: 'vastu-ratnakara-treatise',
    title: 'Vastu Ratnakara — Classical Architectural Manual',
    sanskritTag: 'वास्तु रत्नाकर',
    category: 'Sacred Books',
    badge: 'Illustrated Edition',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    price: 1950,
    originalPrice: 2500,
    specifications: '520 Pages • Architectural Plates & Diagrams',
    summary: 'Traditional treatise explaining spatial orientation, temple acoustics, home layouts, and Vastu Purusha Mandala geometry.'
  },
  {
    slug: 'soundarya-lahari-diagrams-folio',
    title: 'Soundarya Lahari — Hymns, Yantra Diagrams & Sadhana',
    sanskritTag: 'सौन्दर्यलहरी',
    category: 'Sacred Books',
    badge: 'Color Yantra Folio',
    image: 'https://images.unsplash.com/photo-1617882236081-36ba95bbbb5a?auto=format&fit=crop&w=600&q=80',
    price: 2200,
    originalPrice: 2900,
    specifications: 'Large Folio Edition • 100 Illustrated Yantras',
    summary: 'Adi Shankaracharya’s sublime 100 verses to the Supreme Goddess along with precise geometric drawings for contemplative meditation.'
  }
];