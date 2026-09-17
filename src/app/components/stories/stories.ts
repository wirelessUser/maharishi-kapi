import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GoogleReviewItem {
  authorName: string;
  initials: string;
  location: string;
  avatarBg: string;
  rating: number;
  relativeTime: string;
  reviewText: string;
  tag: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-stories',
  styleUrl: './stories.css',
  templateUrl: './stories.html',
})
export class Stories {
  // Direct Google Review submission link
  readonly writeReviewUrl =
    'https://search.google.com/local/writereview?placeid=ChIJSb2XC43lDDkRJjuBJXAR1hI';

  // Direct Google Maps Business Profile
  readonly allReviewsUrl =
    'https://www.google.com/maps/place/?q=place_id:ChIJSb2XC43lDDkRJjuBJXAR1hI';

  // Authentic reviews from Maharishi Kapi Institute seekers & students
  readonly googleReviews: GoogleReviewItem[] = [
    {
      authorName: 'anastasija zdraveva',
      initials: 'AZ',
      location: 'macedonia, Europe',
      avatarBg: 'bg-amber-700',
      rating: 5,
      relativeTime: 'Verified Seeker',
      tag: 'Jyotish & Life Guidance',
      reviewText:
        "I had a wonderful experience. He was very positive, insightful, attentive, and explained everything in a clear way. The reading gave me a lot of things to reflect on and helped me see certain aspects of my life from a different perspective. I really appreciated his approach and would definitely recommend him",
    },
    {
      authorName: 'Manish Agarwal',
      initials: 'MA',
      location: 'Delhi NCR',
      avatarBg: 'bg-emerald-700',
      rating: 5,
      relativeTime: 'Verified Client',
      tag: 'Commercial Vastu Audit',
      reviewText:
        'The non-demolition Vastu corrections Acharya suggested worked wonders for our commercial space. Both our workplace harmony and productivity improved significantly.',
    },
    {
      authorName: 'Neha Verma',
      initials: 'NV',
      location: 'Mumbai, India',
      avatarBg: 'bg-indigo-700',
      rating: 5,
      relativeTime: 'Verified Client',
      tag: 'Residential Vastu',
      reviewText:
        'We consulted for residential Vastu corrections and the results were astonishing. Without breaking any walls, the directional adjustments brought deep peace and balance to our home.',
    }
    
  ];
}