import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface FeaturedCourse {
  id: string;
  title: string;
  sanskritTag: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-featured-courses',
  styleUrl: './featured-courses.css',
  templateUrl: './featured-courses.html',
})
export class FeaturedCourses {
  readonly courses: FeaturedCourse[] = [
    {
      id: 'astro-1',
      title: 'Vedic Astrology Foundations — Level 1',
      sanskritTag: 'पाराशरी ज्योतिष',
      category: 'Astrology',
      image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Vedic%20Astrology%20Foundations%20%E2%80%93%20Level%201.png',
      price: 145,
      originalPrice: 220,
      duration: '12 Weeks • Live & Self-Paced',
      rating: '4.9 (1.2k+ Sadhaks)',
    },
    {
      id: 'vastu-consultant',
      title: 'Kapi Vastu Consultant™ Certification',
      sanskritTag: 'स्थापत्य वेद',
      category: 'Vastu Shastra',
      image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Vastu%20Consultant%E2%84%A2.jpg',
      price: 410,
      originalPrice: 500,
      duration: '16 Weeks • On-Site Audits',
      rating: '5.0 (860+ Sadhaks)',
    },
    {
      id: 'kapi-shakti',
      title: "Kapi Shakti — Women's Hormonal & AyurJyotish Wellness",
      sanskritTag: 'शक्ति एवं आयुर्वेद',
      category: 'Wellness & Marma',
      image: 'https://mkvnstorage.blob.core.windows.net/courseimages/Kapi%20Shakti%20%E2%80%93%20The%20Complete%20System%20of%20Women%E2%80%99s%20Health,%20Hormonal%20Wellness%20&%20Conscious%20Living.png',
      price: 399,
      originalPrice: 500,
      duration: '8 Weeks • Daily Rituals',
      rating: '4.95 (940+ Sadhaks)',
    },
  ];

 formatPrice(value: number): string {
  return '€' + value.toLocaleString('de-DE');
}
}