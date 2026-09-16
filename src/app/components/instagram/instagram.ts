import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Video {
  key: string;
  title: string;
  category: string;
  duration: string;
  thumb: string;
  url: string;
}

export interface Reel {
  key: string;
  titleHindi: string;
  subtitleHindi: string;
  category: string;
  url: string;
  image?: string; // Optional: automatically fetched from url if not provided!
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-instagram',
  styleUrl: './instagram.css',
  templateUrl: './instagram.html',
})
export class Instagram implements OnInit {
  readonly youtubeChannelUrl = 'https://www.youtube.com/@maharishikapi/videos';
  readonly instagramUrl = 'https://www.instagram.com/reel/DRASAf0ksjD/?stkn=cHFmemZ6OTY5OTA0';

  // Map to store dynamically fetched thumbnail URLs
  readonly dynamicThumbnails = signal<Record<string, string>>({});

  readonly videos: Video[] = [
    {
      key: 'meditation',
      title: 'Panch-Kosha & Panch-tattva Theory in applied #numerology #rishikesh',
      category: 'ध्यान • Meditation',
      duration: '5:12',
      thumb: 'https://i.ytimg.com/an_webp/jC85u6ZumsE/mqdefault_6s.webp?du=3000&sqp=CJ_gpNUG&rs=AOn4CLCdFn8YameOzPAbDpTmo8liI_yvhg',
      url: 'https://www.youtube.com/watch?v=jC85u6ZumsE',
    },
    {
      key: 'astrology',
      title: 'Husband, Wife, and the Other | Who is the Karaka for whom in a Horoscope?',
      category: 'ज्योतिष • Astrology',
      duration: '14:30',
      thumb: 'https://i.ytimg.com/vi/GuuJ0YCJLC4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDV4lz-S-evn4inHynURa4cO8RxdQ',
      url: 'https://www.youtube.com/watch?v=GuuJ0YCJLC4',
    },
    {
      key: 'satsang',
      title: 'Mere Ram Sabke Ram: The Ultimate Devotion Song 2024 | Jai Shree Ram',
      category: '• Vedic Geet',
      duration: '32:08',
      thumb: 'https://i.ytimg.com/vi/jySc9AQz70c/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGEgZShDMA8=&rs=AOn4CLAzPp7oHyR1keZ-g5j5lnsUB3yG_g',
      url: 'https://www.youtube.com/watch?v=jySc9AQz70c',
    },
    {
      key: 'vastu',
      title: 'Number 1 in Predictive Numerology | Traits, Challenges & Soul Purpose',
      category: '• Numerology',
      duration: '9:47',
      thumb: 'https://i.ytimg.com/vi/SsuAf6XjmzQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBTHffqEBDnYqqtqpSrMYxDI7RgJw',
      url: 'https://www.youtube.com/watch?v=SsuAf6XjmzQ',
    },
  ];

  // You can now simply paste Instagram Reel URLs without providing any image URL!
  readonly reels: Reel[] = [
    {
      key: 'meditation-reel',
      titleHindi: '',
      subtitleHindi: '',
      category: 'Review',
      url: 'https://www.instagram.com/acharya_alok_awasthi/reel/DRCSegNCYpB/',
    },
    {
      key: 'vastu-reel',
      titleHindi: '',
      subtitleHindi: '',
      category: 'Product',
      url: 'https://www.instagram.com/acharya_alok_awasthi/reel/DZkq6S7p13H/',
    },
    {
      key: 'karma-reel',
      titleHindi: '',
      subtitleHindi: '',
      category: 'Alok vani',
      url: 'https://www.instagram.com/acharya_alok_awasthi/reel/DYJKZ2_JnwD/',
    },
    {
      key: 'culture-reel',
      titleHindi: '',
      subtitleHindi: '',
      category: 'Review',
      url: 'https://www.instagram.com/acharya_alok_awasthi/reel/DRASAf0ksjD/',
    },
  ];

  ngOnInit(): void {
    this.autoFetchInstagramThumbnails();
  }

  /**
   * Extracts the unique Instagram Shortcode from Reels, Posts, or TV URLs.
   * Handles formats like:
   *  - /reel/DRCSegNCYpB/
   *  - /acharya_alok_awasthi/reel/DRCSegNCYpB/
   *  - /p/DRCSegNCYpB/
   */
  getInstagramShortcode(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
    return match ? match[1] : null;
  }

  /**
   * Returns the best available thumbnail:
   * 1. Dynamic fetched OpenGraph image if already resolved.
   * 2. Direct Instagram Media endpoint using the extracted shortcode.
   * 3. Fallback ashram image if URL is invalid.
   */
  getReelThumbnail(reel: Reel): string {
    // 1. Check if metadata API already resolved this reel's thumbnail
    if (this.dynamicThumbnails()[reel.key]) {
      return this.dynamicThumbnails()[reel.key];
    }

    // 2. If a manual valid static image URL was provided (not an instagram webpage)
    if (reel.image && !reel.image.includes('instagram.com/')) {
      return reel.image;
    }

    // 3. Extract shortcode from the reel URL
    const code = this.getInstagramShortcode(reel.url) || this.getInstagramShortcode(reel.image || '');
    if (code) {
      return `https://www.instagram.com/p/${code}/media/?size=l`;
    }

    // 4. Fallback serene image
    return 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80';
  }

  /**
   * Background worker that queries public OpenGraph metadata for exact CDN covers.
   */
  private async autoFetchInstagramThumbnails(): Promise<void> {
    for (const reel of this.reels) {
      const code = this.getInstagramShortcode(reel.url);
      if (!code) continue;

      try {
        const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(reel.url)}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const coverUrl = data?.data?.image?.url;
          if (coverUrl) {
            this.dynamicThumbnails.update((current) => ({
              ...current,
              [reel.key]: coverUrl,
            }));
          }
        }
      } catch {
        // Direct media endpoint or handleImageError will continue smoothly
      }
    }
  }

  /**
   * Fallback error handler triggered if an image fails to load.
   */
  handleImageError(event: Event, reel: Reel): void {
    const imgEl = event.target as HTMLImageElement;
    const code = this.getInstagramShortcode(reel.url);

    if (code && !imgEl.src.includes('microlink.io')) {
      imgEl.src = `https://api.microlink.io?url=${encodeURIComponent(reel.url)}&embed=image.url`;
    } else {
      imgEl.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80';
    }
  }
}