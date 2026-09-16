import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ConsultationTier {
  id: string;
  title: string;
  sanskritTag: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  duration: string;
  summary: string;
  devanagariNum: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-consultation',
  styleUrl: './consultation.css',
  templateUrl: './consultation.html',
})
export class Consultation {
  readonly consultations: ConsultationTier[] = [
    {
      id: 'vedic-astrology',
      devanagariNum: '०१',
      title: 'Personalized Vedic Chart Reading',
      sanskritTag: 'कुण्डली दर्पण',
      category: 'Vedic Jyotish',
      image: 'https://mkvnstorage.blob.core.windows.net/acharyaalok/file_000000002c0c720b81210e444d2139ed.png',
      price: 90,
      originalPrice: 102,
      duration: '45 Mins • Private Video Session',
      summary: 'A deep-dive reading of your Janma Kundali, Dasha timing, and practical remedial gem/mantra prescriptions.',
    },
    {
      id: 'vastu-blueprint',
      devanagariNum: '०२',
      title: 'Commercial & Residential Vastu Blueprint™',
      sanskritTag: 'स्थापत्य वास्तु चक्र',
      category: 'Spatial Harmony',
      image: 'https://mkvnstorage.blob.core.windows.net/acharyaalok/file_000000002c0c720b81210e444d2139ed.png',
      price: 300,
      originalPrice: 500,
      duration: 'Comprehensive Remote Audit',
      summary: 'Non-demolition elemental balancing for home or workspace to eliminate geopathic stress and financial stagnation.',
    },
    {
      id: 'life-strategy',
      devanagariNum: '०३',
      title: 'Kapi Master Life Strategy Blueprint™',
      sanskritTag: 'महा जीवन प्रज्ञा',
      category: 'High-Stakes Advisory',
      image: 'https://mkvnstorage.blob.core.windows.net/acharyaalok/file_000000002c0c720b81210e444d2139ed.png',
      price: 160,
      originalPrice: 200,
      duration: '90 Mins • Multi-Session Strategy',
      summary: 'Our most comprehensive advisory — synthesizing horary astrology, numerology, and career/wealth roadmap planning.',
    },
  ];

 formatPrice(val: number): string {
    return '€' + val.toLocaleString('de-DE'); // Formats as €55, €1.250, etc.
  }
}