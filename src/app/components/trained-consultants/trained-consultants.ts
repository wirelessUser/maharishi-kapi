import { Component, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface CertifiedConsultant {
  key: string;
  devanagariNum: string;
  name: string;
  sanskritTag: string;
  specialization: string;
  photo: string;
  experience: string;
  location: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-trained-consultants',
  styleUrl: './trained-consultants.css',
  templateUrl: './trained-consultants.html',
})
export class TrainedConsultants {
  readonly track = viewChild<ElementRef<HTMLDivElement>>('track');

  readonly consultants: CertifiedConsultant[] = [
    {
      key: 'Tjasa',
      devanagariNum: '०१',
      name: 'Tjasa Rus',
      sanskritTag: 'स्थापत्य विशारद',
      specialization: 'Architect & Sthapatya Vastu Master',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      experience: '10+ Years in Practice',
      location: 'Austria, EU',
    },
    {
      key: 'Ritika',
      devanagariNum: '०२',
      name: 'Ritika Talwar',
      sanskritTag: 'सामुद्रिक एवं हस्तरेखा',
      specialization: 'Vedic Palmistry & Face Reading Expert',
      photo: 'https://mkvnstorage.blob.core.windows.net/trainedconsultaint/image-3.png',
      experience: '6+ Years in Practice',
      location: 'New Delhi, India',
    },
    {
      key: 'Supriya',
      devanagariNum: '०३',
      name: 'Supriya Upadhyay',
      sanskritTag: 'कर्म एवं अर्थ प्रज्ञा',
      specialization: 'Career, Wealth & Dasha Strategist',
      photo: 'https://mkvnstorage.blob.core.windows.net/trainedconsultaint/image-4.png',
      experience: '11+ Years in Practice',
      location: 'Rishikesh, India',
    },
  ];

  scroll(direction: 1 | -1): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.75), behavior: 'smooth' });
  }
}