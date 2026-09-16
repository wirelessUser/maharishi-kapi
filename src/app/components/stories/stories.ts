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
  // Direct Google Review link using your Place ID
  readonly googleReviewsUrl =
    'https://search.google.com/local/writereview?placeid=ChIJSb2XC43lDDkRJjuBJXAR1hI';

  readonly allReviewsUrl =
    'https://www.google.com/maps/place/?q=place_id:ChIJSb2XC43lDDkRJjuBJXAR1hI';

  readonly googleReviews: GoogleReviewItem[] = [
    {
      authorName: 'Rohan Deshmukh',
      initials: 'RD',
      location: 'Tapovan, Rishikesh',
      avatarBg: 'bg-emerald-700',
      rating: 5,
      relativeTime: '2 weeks ago',
      tag: 'Kundali Consultation',
      reviewText:
        'Visiting Maharishi Kapi in Tapovan was deeply transformative. Acharya Alok’s mathematical precision in Parashari Jyotish and clear remedies provided actionable guidance without superstition.',
    },
    {
      authorName: 'Siddharth Mehra',
      initials: 'SM',
      location: 'Delhi NCR',
      avatarBg: 'bg-amber-700',
      rating: 5,
      relativeTime: 'a month ago',
      tag: 'Vastu Shastra',
      reviewText:
        'Outstanding guidance on non-demolition residential Vastu. The elemental zone corrections made an immediate, tangible difference to the peace and focus in our home.',
    },
    {
      authorName: 'Ananya Iyer',
      initials: 'AI',
      location: 'Bengaluru',
      avatarBg: 'bg-indigo-700',
      rating: 5,
      relativeTime: '2 months ago',
      tag: 'AyurJyotish Guidance',
      reviewText:
        'The depth of knowledge in biological AyurJyotish is exceptional. The chronological dasha predictions matched my physical health transitions with rare accuracy.',
    },
  ];
}