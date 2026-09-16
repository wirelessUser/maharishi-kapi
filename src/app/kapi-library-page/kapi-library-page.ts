import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';

export type GranthaCategory = 'All' | 'Jyotish' | 'Vastu Shastra' | 'Ayurveda & Marma' | 'Upanishad & Gita' | 'Samudrika';
export type GranthaFormat = 'All' | 'Palm-Leaf Manuscript' | 'Commentary Codex' | 'Audio Recitation';

export interface Grantha {
  id: string;
  catalogNumber: string;
  title: string;
  sanskritTitle: string;
  category: GranthaCategory;
  format: GranthaFormat;
  language: string;
  foliosOrPages: string;
  era: string;
  authorOrRishi: string;
  summary: string;
  verseSnippetDevanagari: string;
  verseSnippetTranslation: string;
  coverImage: string;
  featured?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-library-page',
  styleUrl: './kapi-library-page.css',
  templateUrl: './kapi-library-page.html',
})
export class LibraryPage {
  readonly categories: GranthaCategory[] = [
    'All',
    'Jyotish',
    'Vastu Shastra',
    'Ayurveda & Marma',
    'Upanishad & Gita',
    'Samudrika',
  ];

  readonly formats: GranthaFormat[] = [
    'All',
    'Palm-Leaf Manuscript',
    'Commentary Codex',
    'Audio Recitation',
  ];

  readonly selectedCategory = signal<GranthaCategory>('All');
  readonly selectedFormat = signal<GranthaFormat>('All');
  searchQuery = '';

  // Currently open grantha on the illuminated study desk
  readonly activeGrantha = signal<Grantha | null>(null);

  // Digital Patron Pass state
  patronName = '';
  patronEmail = '';
  patronIntent = '';
  readonly passRequested = signal<boolean>(false);

  readonly granthas: Grantha[] = [
    {
      id: 'bphs-vol-1',
      catalogNumber: 'MS-JY-108',
      title: 'Brihat Parashara Hora Shastra (Vol. I & II)',
      sanskritTitle: 'बृहत्पाराशरहोराशास्त्रम्',
      category: 'Jyotish',
      format: 'Commentary Codex',
      language: 'Sanskrit • Hindi • English',
      foliosOrPages: '840 Pages • 71 Adhyayas',
      era: 'Classical Vedic Era (Sage Parashara)',
      authorOrRishi: 'Maharishi Parashara • Annotated by Acharya Alok',
      summary: 'The foundational masterwork of Vedic astrology. Covers planet characters, sixteen divisional charts (Shodashvarga), planetary states (Avasthas), and Vimshottari timing systems.',
      verseSnippetDevanagari: 'यत्प्रसादादहं वेद्मि भूतभव्यभवज्जनुः। तं वन्दे वरदं शान्तं सूर्यनारायणं विभुम्॥',
      verseSnippetTranslation: 'By whose grace I comprehend the past, present, and future incarnations of living beings—unto that tranquil, boon-bestowing, omnipresent Lord Surya Narayana, I offer my prostrations.',
      coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
      featured: true,
    },
    {
      id: 'charaka-sutra',
      catalogNumber: 'MS-AY-204',
      title: 'Charaka Samhita: Sutra Sthana',
      sanskritTitle: 'चरकसंहिता • सूत्रस्थानम्',
      category: 'Ayurveda & Marma',
      format: 'Palm-Leaf Manuscript',
      language: 'Vedic Sanskrit',
      foliosOrPages: '320 Palm Folios',
      era: 'Circa 800 BCE Archetype',
      authorOrRishi: 'Acharya Charaka & Agnivesha',
      summary: 'The philosophical and practical pillars of Ayurveda. Lays down the Tridosha balance, seasonal lifestyle rules (Ritucharya), and the biological constitution of consciousness.',
      verseSnippetDevanagari: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्। मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते॥',
      verseSnippetTranslation: 'That sacred treatise wherein is declared what is wholesome and unwholesome, pleasant and painful for living, alongside longevity and its measure—that is venerated as Ayurveda.',
      coverImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'mayamatam-vastu',
      catalogNumber: 'MS-VS-042',
      title: 'Mayamatam: Treatise of Sacred Architecture',
      sanskritTitle: 'मयमतम् • वास्तुशास्त्रम्',
      category: 'Vastu Shastra',
      format: 'Commentary Codex',
      language: 'Sanskrit with English Commentary',
      foliosOrPages: '460 Pages',
      era: 'Chola Dynasty Recension',
      authorOrRishi: 'Rishi Maya • Sthapatya Lineage',
      summary: 'Comprehensive canonical guide to the orientation, soil diagnosis, door placement, and temple geometry based on the 45 deities of the Vastu Purusha Mandala.',
      verseSnippetDevanagari: 'वास्तुपुरुष नमस्तेऽस्तु भूशय्याभिरत प्रभो। मद्गृहं धनधान्यादिसमृद्धं कुरु सर्वदा॥',
      verseSnippetTranslation: 'Obeisance unto Thee, O Vastu Purusha, Lord resting peacefully upon the earthen bed. Bestow upon this dwelling everlasting abundance of vitality, wisdom, and peace.',
      coverImage: 'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'surya-siddhanta',
      catalogNumber: 'MS-JY-012',
      title: 'Surya Siddhanta: Science of Cosmic Motion',
      sanskritTitle: 'सूर्यसिद्धान्तः',
      category: 'Jyotish',
      format: 'Palm-Leaf Manuscript',
      language: 'Archaic Sanskrit',
      foliosOrPages: '218 Birch-Bark Folios',
      era: 'Treta-Dvapara Solar Tradition',
      authorOrRishi: 'Surya-Sun Avatar to Asura Maya',
      summary: 'The astronomical mathematical foundation of the Hindu calendar (Panchanga). Details sidereal planetary speeds, solar/lunar eclipses, and cosmic cycles (Yugas).',
      verseSnippetDevanagari: 'अचिन्त्याव्यक्तरूपाय निर्गुणाय गुणात्मने। समस्तजगदाधारमूर्तये ब्रह्मणे नमः॥',
      verseSnippetTranslation: 'Salutations to the Supreme Consciousness, beyond conceptual thought, unmanifest yet assuming all divine qualities, the eternal foundation of all rotating worlds.',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'sushruta-marma',
      catalogNumber: 'MS-AY-117',
      title: 'Sushruta Samhita: Sharira Sthana & The 107 Marmas',
      sanskritTitle: 'सुश्रुतसंहिता • शरीरस्थानम्',
      category: 'Ayurveda & Marma',
      format: 'Commentary Codex',
      language: 'Sanskrit • Hindi',
      foliosOrPages: '380 Pages',
      era: 'Kashi School of Surgery',
      authorOrRishi: 'Acharya Sushruta • Dhanvantari Parampara',
      summary: 'The precise anatomical and energetic mapping of all 107 Marma junctions in the human body—categorized by vulnerability, Pranic consequence, and curative pressure points.',
      verseSnippetDevanagari: 'मर्माणि नाम मांससिरास्नाय्वस्थिसन्धीनां सन्निपाताः, तेषु स्वभावत एव विशषेण प्राणास्तिष्ठन्ति॥',
      verseSnippetTranslation: 'Marmas are the sacred confluence points of muscle, blood vessels, ligaments, bones, and joints. Within them, Prana naturally and intensely resides.',
      coverImage: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'bhagavad-gita-chitta',
      catalogNumber: 'MS-UG-301',
      title: 'Srimad Bhagavad Gita: The Science of Chitta Shuddhi',
      sanskritTitle: 'श्रीमद्भगवद्गीता • योगमनोविज्ञानम्',
      category: 'Upanishad & Gita',
      format: 'Audio Recitation',
      language: 'Vedic Chanting with Commentary',
      foliosOrPages: '18 Chapters • 14 Hours Audio',
      era: 'Kurukshetra • Vyasa Parampara',
      authorOrRishi: 'Bhagavan Sri Krishna • Vedavyasa',
      summary: 'A psychological and meditative journey through the 700 verses, decoding Arjuna’s despondency (Vishada) as the doorway to self-mastery and non-attached action (Nishkama Karma).',
      verseSnippetDevanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      verseSnippetTranslation: 'Your authority extends only to dedicated action, never to its speculative fruits. Be neither motivated by results nor attached to inertia.',
      coverImage: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'samudrika-shastra',
      catalogNumber: 'MS-SM-009',
      title: 'Samudrika Tilakam: The Geometry of Face and Hands',
      sanskritTitle: 'सामुद्रिक तिलकम् • हस्तरेखाशास्त्रम्',
      category: 'Samudrika',
      format: 'Palm-Leaf Manuscript',
      language: 'Sanskrit with Woodcut Plates',
      foliosOrPages: '180 Palm Leaves',
      era: '14th Century Himalayan Recension',
      authorOrRishi: 'Sage Samudra & Narada Tradition',
      summary: 'Classical hand line topography, mounts of the planets on the palm, fingernail markings, forehead radiance (Lalat Rekha), and somatic indicators of karmic timing.',
      verseSnippetDevanagari: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
      verseSnippetTranslation: 'At the tip of the hands resides Lakshmi; in the center rests Saraswati; at the base abides Govinda. Hence, gaze upon your hands each sacred morning.',
      coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'mandukya-karika',
      catalogNumber: 'MS-UG-012',
      title: 'Mandukya Upanishad & Gaudapada Karika',
      sanskritTitle: 'माण्डूक्योपनिषद् • गौडपादकारिका',
      category: 'Upanishad & Gita',
      format: 'Commentary Codex',
      language: 'Sanskrit & English',
      foliosOrPages: '290 Pages',
      era: 'Advaita Lineage',
      authorOrRishi: 'Gaudapadacharya & Adi Shankara',
      summary: 'The shortest Upanishad exploring the four states of consciousness (Waking, Dreaming, Deep Sleep, and Turiya) through the phonetic anatomy of the sacred syllable Om (A-U-M).',
      verseSnippetDevanagari: 'सर्वं ह्येतद् ब्रह्म अयमात्मा ब्रह्म सोऽयमात्मा चतुष्पात्॥',
      verseSnippetTranslation: 'All this cosmos is indeed Brahman. This Atman is Brahman. This very Atman possesses four states of conscious awareness.',
      coverImage: 'https://images.unsplash.com/photo-1518288774671-b94e8088c2f5?auto=format&fit=crop&w=900&q=80',
    },
  ];

  readonly featuredGrantha = this.granthas.find((g) => g.featured) ?? this.granthas[0];

  readonly filteredGranthas = computed(() => {
    const cat = this.selectedCategory();
    const fmt = this.selectedFormat();
    const query = this.searchQuery.trim().toLowerCase();

    return this.granthas.filter((g) => {
      const matchCat = cat === 'All' || g.category === cat;
      const matchFmt = fmt === 'All' || g.format === fmt;
      const matchQuery =
        !query ||
        g.title.toLowerCase().includes(query) ||
        g.sanskritTitle.toLowerCase().includes(query) ||
        g.catalogNumber.toLowerCase().includes(query) ||
        g.authorOrRishi.toLowerCase().includes(query);

      return matchCat && matchFmt && matchQuery;
    });
  });

  selectCategory(cat: GranthaCategory): void {
    this.selectedCategory.set(cat);
  }

  selectFormat(fmt: GranthaFormat): void {
    this.selectedFormat.set(fmt);
  }

  inspectGrantha(grantha: Grantha): void {
    this.activeGrantha.set(grantha);
    const readerDesk = document.getElementById('illuminated-reader-desk');
    readerDesk?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  closeReaderDesk(): void {
    this.activeGrantha.set(null);
  }

  requestPatronPass(event: Event): void {
    event.preventDefault();
    if (this.patronName && this.patronEmail) {
      this.passRequested.set(true);
      setTimeout(() => {
        this.patronName = '';
        this.patronEmail = '';
        this.patronIntent = '';
      }, 4000);
    }
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'The Kapi Granthaghar | Archival Vedic Library & Rare Manuscripts',
      description: 'Explore the consecrated library of the Maharishi Kapi Institute: ancient palm-leaf manuscripts, classical Jyotish codices, Charaka Samhita, and Sthapatya Vastu treatises.',
      path: '/library',
      keywords: 'Vedic library, ancient astrology manuscripts, Brihat Parashara Hora Shastra, Charaka Samhita, Palm leaf manuscripts India, Granthaghar',
    });
  }
}