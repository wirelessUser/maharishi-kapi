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
      authorName: 'Erinda Zhupani',
      initials: 'EZ',
      location: 'Delhi NCR',
      avatarBg: 'bg-emerald-700',
      rating: 5,
      relativeTime: 'Jyotish & Life Guidance',
      tag: 'Jyotish & Life Guidance',
      reviewText:
        'I had a wonderful experience with Alok and as an astrologer, philosopher, and spiritual guide. He is highly educated, deeply intuitive, and, most importantly, a person of great integrity.Even though I am also a student of these sciences, I was genuinely impressed by how accurate and insightful his readings were. Many people can be good at giving readings, but not everyone is equally good at offering the right remedies and practical guidance......',
    },
    {
      authorName: 'Ritika T Nijhawan',
      initials: 'RN',
      location: 'DELHI, India',
      avatarBg: 'bg-indigo-700',
      rating: 5,
      relativeTime: 'Verified Client',
      tag: 'Jyotish & Life Guidance',
      reviewText:
        'A very positive and enlightening Acharya ji explained everything clearly and made the session feel personal and meaningful.He listened  me totally and gave me right direction for my future...I came away feeling hopeful and motivated.',
    }
    
  ];
}