import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';

export type Category = 'Astrology' | 'Vastu' | 'Ayurveda' | 'Numerology' | 'Culture';
export type CategoryFilter = 'All' | Category;

export interface Article {
  slug: string;
  title: string;
  deck: string;
  category: Category;
  image: string;
  author: string;
  authorPhoto: string;
  date: string;
  readTime: string;
  featured?: boolean;
  pullQuote?: string;
  issueVol?: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  selector: 'app-blog-page',
  styleUrl: './blog-page.css',
  templateUrl: './blog-page.html',
})
export class BlogPage {
  readonly categories: CategoryFilter[] = ['All', 'Astrology', 'Vastu', 'Ayurveda', 'Numerology', 'Culture'];
  readonly selectedCategory = signal<CategoryFilter>('All');

  // Currently open article in the top interactive magazine reader spread
  readonly activeSpreadIndex = signal<number>(0);
  readonly isFlipping = signal<boolean>(false);

  // Newsletter state
  emailInput = '';
  readonly subscribed = signal<boolean>(false);

  readonly articles: Article[] = [
    {
      slug: 'saturn-returns',
      title: 'Saturn Returns: What Your 29th Year Is Really Trying to Teach You',
      deck: "Every 29 years Saturn comes home to the sign it occupied at your birth — and demands you finally grow up. Here's how to read the lesson instead of just surviving it.",
      category: 'Astrology',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80',
      author: 'Acharya Alok',
      authorPhoto: 'https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=100&q=80',
      date: 'Sept 2, 2026',
      readTime: '8 min read',
      featured: true,
      pullQuote: 'Saturn does not delay your blessings out of cruelty; he delays them until your ego is too humble to squander them.',
      issueVol: 'Vol. IX · Cover Issue',
    },
    {
      slug: 'kitchen-facing-east',
      title: 'Why Your Kitchen Faces East (and What Happens When It Doesn’t)',
      deck: 'Classical Vastu ties the kitchen to Agni, the fire element. A misplaced stove is one of the most common — and most fixable — energy leaks in Indian homes.',
      category: 'Vastu',
      image: 'https://images.unsplash.com/photo-1538460120076-604b93a2ce88?auto=format&fit=crop&w=1000&q=80',
      author: 'Riitu Dua',
      authorPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
      date: 'Aug 28, 2026',
      readTime: '5 min read',
      pullQuote: 'Agni in the North-East burns the peace of the household; Agni in the South-East fuels physical health and wealth.',
      issueVol: 'Vol. IX · Dispatch 11',
    },
    {
      slug: 'ashwagandha-vs-brahmi',
      title: 'Ashwagandha vs. Brahmi: Choosing the Right Herb for Your Dosha',
      deck: 'Both are Ayurvedic staples, but they calm very different kinds of restlessness. A dosha-first guide before you reach for either bottle.',
      category: 'Ayurveda',
      image: 'https://images.unsplash.com/photo-1730977806288-96b82f795008?auto=format&fit=crop&w=1000&q=80',
      author: 'Shobha Desai',
      authorPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      date: 'Aug 24, 2026',
      readTime: '6 min read',
      pullQuote: 'Ashwagandha grounds restless Vata currents in the earth; Brahmi cools the burning Pitta intellect in the heavens.',
      issueVol: 'Vol. IX · Dispatch 10',
    },
    {
      slug: 'number-nine-numerology',
      title: 'The Number 9 in Vedic Numerology: Endings That Are Actually Beginnings',
      deck: 'Ruled by Mars, feared by some, chased by entrepreneurs — the 9 is the most misread number in the system. Here is what it actually governs.',
      category: 'Numerology',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
      author: 'Shweta Gupta',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      date: 'Aug 19, 2026',
      readTime: '4 min read',
      pullQuote: 'Nine synthesizes all single digits before it and resets the cycle to the pure potential of zero.',
      issueVol: 'Vol. IX · Dispatch 09',
    },
    {
      slug: 'navamsa-chart',
      title: "Reading the Navamsa Chart: Astrology's Hidden Second Map",
      deck: 'Your birth chart shows the terrain. The Navamsa (D9) shows the destination — especially in marriage and dharma. Most beginners never open it.',
      category: 'Astrology',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80',
      author: 'Acharya Alok',
      authorPhoto: 'https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=100&q=80',
      date: 'Aug 14, 2026',
      readTime: '9 min read',
      pullQuote: 'The Rashi chart is the seed planted in the soil; the Navamsa is the fruit the tree bears in the second half of life.',
      issueVol: 'Vol. IX · Dispatch 08',
    },
    {
      slug: 'diwali-new-moon',
      title: "Why Diwali Falls on a New Moon — And Other Lunar Coincidences That Aren't",
      deck: 'Nearly every major Hindu festival is anchored to a precise lunar phase. That is not tradition for its own sake — it is a 5,000-year-old calendar still doing its job.',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1621787084849-ed98731b3071?auto=format&fit=crop&w=1000&q=80',
      author: 'Acharya Alok',
      authorPhoto: 'https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=100&q=80',
      date: 'Aug 9, 2026',
      readTime: '7 min read',
      pullQuote: 'Light is never more sacred than when consecrated against the deep, quiet darkness of the Amavasya night.',
      issueVol: 'Vol. IX · Dispatch 07',
    },
    {
      slug: 'marma-points-101',
      title: "Marma Points 101: The Body's 107 Doorways to Healing",
      deck: 'Ayurveda mapped these vital junctions long before acupuncture reached the West. A working guide to the seven points you can safely learn to press today.',
      category: 'Ayurveda',
      image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1000&q=80',
      author: 'Riitu Dua',
      authorPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
      date: 'Aug 3, 2026',
      readTime: '6 min read',
      pullQuote: 'Where subtle Prana stagnates, physical pain takes root; gentle touch on Adhipati Marma restores systemic flow.',
      issueVol: 'Vol. IX · Dispatch 06',
    },
    {
      slug: 'mercury-retrograde',
      title: "Mercury Retrograde Isn't the Villain — Here's What It's Actually For",
      deck: 'Three times a year the internet panics. Classical Jyotish reads the same transit very differently: as a scheduled audit, not a curse.',
      category: 'Astrology',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
      author: 'Shweta Gupta',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      date: 'Jul 29, 2026',
      readTime: '5 min read',
      pullQuote: 'Vakri Budha is not a breakdown—it is the universe commanding you to reflect twice before speaking once.',
      issueVol: 'Vol. IX · Dispatch 05',
    },
    {
      slug: 'name-number-vs-birth-number',
      title: 'Your Name Number vs. Your Birth Number: Which One Actually Runs Your Life?',
      deck: 'One is fixed at birth, the other changes every time you sign a form differently. Numerologists disagree — here is how to weigh both.',
      category: 'Numerology',
      image: 'https://images.unsplash.com/photo-1518288774671-b94e8088c2f5?auto=format&fit=crop&w=1000&q=80',
      author: 'Shobha Desai',
      authorPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      date: 'Jul 22, 2026',
      readTime: '5 min read',
      pullQuote: 'The Mulank is the destiny hardware you were born with; the Namank is the frequency code you project into the world.',
      issueVol: 'Vol. IX · Dispatch 04',
    },
    {
      slug: 'rishikesh-havan',
      title: 'Inside a Rishikesh Havan: What Fire Rituals Are Really Doing',
      deck: "It looks like ceremony. It's also aerosol chemistry, breathwork, and a 40-minute forced meditation you didn't sign up for — in the best way.",
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1529733772151-bab41484710a?auto=format&fit=crop&w=1000&q=80',
      author: 'Acharya Alok',
      authorPhoto: 'https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=100&q=80',
      date: 'Jul 15, 2026',
      readTime: '6 min read',
      pullQuote: 'Sacred Ghee and samidha cast into consecrated flames purify both the external space and the internal nervous system.',
      issueVol: 'Vol. IX · Dispatch 03',
    },
    {
      slug: 'nine-gemstones',
      title: 'The Nine Planets, Nine Gemstones: A Practical Guide to Ratna Shastra',
      deck: "Before you buy a Blue Sapphire because a reel told you to — here is which planet it strengthens, who it can backfire on, and how to test it first.",
      category: 'Astrology',
      image: 'https://images.unsplash.com/photo-1554554497-0095c34db3ec?auto=format&fit=crop&w=1000&q=80',
      author: 'Acharya Alok',
      authorPhoto: 'https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?auto=format&fit=crop&w=100&q=80',
      date: 'Jul 8, 2026',
      readTime: '10 min read',
      pullQuote: 'A gemstone acts as a planetary optical lens. Never amplify a malefic ray without a sattvic protective shield.',
      issueVol: 'Vol. IX · Dispatch 02',
    },
    {
      slug: 'vastu-bedroom-audit',
      title: "The Five Directions: A Beginner's Vastu Audit for Your Bedroom",
      deck: 'Bed placement, mirror position, and one surprisingly common mistake with the door — a 15-minute self-audit before you call a consultant.',
      category: 'Vastu',
      image: 'https://images.unsplash.com/photo-1723879683308-0c8542c02ee4?auto=format&fit=crop&w=1000&q=80',
      author: 'Riitu Dua',
      authorPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
      date: 'Jul 1, 2026',
      readTime: '4 min read',
      pullQuote: 'Align your head to the South or East; synchronizing with the Earth’s natural geomagnetic field restores REM sleep.',
      issueVol: 'Vol. IX · Dispatch 01',
    },
  ];

  readonly featuredArticle = this.articles.find((article) => article.featured)!;

  readonly trending = [this.articles[0], this.articles[4], this.articles[7], this.articles[10], this.articles[5]];

  readonly filteredArticles = computed(() => {
    const category = this.selectedCategory();
    const rest = this.articles.filter((article) => !article.featured);
    return category === 'All' ? rest : rest.filter((article) => article.category === category);
  });

  // All selectable articles for the top magazine spread reader
  readonly allSelectableArticles = computed(() => {
    const category = this.selectedCategory();
    return category === 'All' ? this.articles : this.articles.filter((a) => a.category === category);
  });

  readonly currentSpreadArticle = computed(() => {
    const list = this.allSelectableArticles();
    const idx = this.activeSpreadIndex();
    return list[idx % list.length] ?? this.articles[0];
  });

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
    this.activeSpreadIndex.set(0);
  }

  nextSpread(): void {
    const list = this.allSelectableArticles();
    this.triggerFlip(() => {
      this.activeSpreadIndex.update((curr) => (curr + 1) % list.length);
    });
  }

  prevSpread(): void {
    const list = this.allSelectableArticles();
    this.triggerFlip(() => {
      this.activeSpreadIndex.update((curr) => (curr - 1 + list.length) % list.length);
    });
  }

  // Opens any selected article in the top magazine reading spread & smoothly scrolls up
  openArticleInMagazine(article: Article): void {
    const list = this.allSelectableArticles();
    const targetIdx = list.findIndex((a) => a.slug === article.slug);
    if (targetIdx !== -1) {
      this.triggerFlip(() => {
        this.activeSpreadIndex.set(targetIdx);
      });
      // Smooth scroll back up to the open magazine reader
      const reader = document.getElementById('magazine-desk-view');
      reader?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private triggerFlip(callback: () => void): void {
    this.isFlipping.set(true);
    setTimeout(() => {
      callback();
      setTimeout(() => this.isFlipping.set(false), 260);
    }, 180);
  }

  subscribe(event: Event): void {
    event.preventDefault();
    if (this.emailInput.trim()) {
      this.subscribed.set(true);
      setTimeout(() => this.subscribed.set(false), 4000);
      this.emailInput = '';
    }
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'The Maharishi Kapi Journal | Vedic Magazine & Editorial',
      description: 'Read Vedic astrology, Vastu, Ayurveda, numerology, and culture in an authentic interactive magazine format.',
      path: '/blog',
      keywords: 'Vedic astrology magazine, Vastu editorial, Ayurveda journal, numerology articles',
    });
  }
}