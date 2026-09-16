import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Testimonial {
  devanagariNum: string;
  name: string;
  location: string;
  discipline: string;
  sanskritTag: string;
  photo: string;
  quote: string;
  rating: number;
  consultationType: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-stories',
  styleUrl: './stories.css',
  templateUrl: './stories.html',
})
export class Stories {
  readonly testimonials: Testimonial[] = [
    {
      devanagariNum: '०१',
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      discipline: 'Vedic Kundali Consultation',
      sanskritTag: 'मार्गदर्शन एवं स्पष्टता',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
      quote: "Acharya Alok's reading went far beyond typical predictions. He identified the exact karmic Dasha blockages causing my career stagnation and gave simple, non-superstitious remedies that restored clarity within 40 days.",
      rating: 5,
      consultationType: '1-on-1 Video Session',
    },
    {
      devanagariNum: '०२',
      name: 'Neha Verma',
      location: 'London, United Kingdom',
      discipline: 'Non-Demolition Vastu Audit',
      sanskritTag: 'स्थान ऊर्जा शुद्धि',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
      quote: 'We consulted for our heritage townhouse where sleep disorders and financial stress had persisted for years. Acharya ji corrected the elemental zones using brass staples and directional remedies without a single wall broken.',
      rating: 5,
      consultationType: 'Commercial & Home Vastu',
    },
    {
      devanagariNum: '०३',
      name: 'Amit Khanna',
      location: 'New Delhi, India',
      discipline: 'Samudrika Shastra & Palmistry',
      sanskritTag: 'हस्तरेखा एवं अंक प्रज्ञा',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80',
      quote: "His profound mastery of classical Samudrika and palm lines is rare in the modern world. Every milestone he mapped on my Mount of Jupiter manifested with chronological precision. A genuine Saraswat master.",
      rating: 5,
      consultationType: 'Master Life Strategy',
    },
  ];
}