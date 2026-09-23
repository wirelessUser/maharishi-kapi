import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
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
export class TrainedConsultants implements AfterViewInit, OnDestroy {
  @ViewChild('track') track!: ElementRef<HTMLDivElement>;
  @ViewChildren('cardElement') cardElements!: QueryList<ElementRef>;

  private observer: IntersectionObserver | null = null;

  readonly consultants: CertifiedConsultant[] = [
    {
      key: 'Tjasa',
      devanagariNum: '०1',
      name: 'Tjasa Rus',
      sanskritTag: 'स्थापत्य विशारद',
      specialization: 'Architect & Sthapatya Vastu Master',
      photo: 'https://mkvnstorage.blob.core.windows.net/trainedconsultaint/architect_portrait_4k.jpg',
      experience: '10+ Years in Practice',
      location: 'Austria, EU',
    },
    {
      key: 'Ritika',
      devanagariNum: '०2',
      name: 'Ritika Talwar',
      sanskritTag: 'सामुद्रिक एवं हस्तरेखा',
      specialization: 'Vedic Palmistry & Face Reading Expert',
      photo: 'https://mkvnstorage.blob.core.windows.net/trainedconsultaint/image-3.png',
      experience: '6+ Years in Practice',
      location: 'New Delhi, India',
    },
    {
      key: 'Supriya',
      devanagariNum: '०3',
      name: 'Supriya Upadhyay',
      sanskritTag: 'कर्म एवं अर्थ प्रज्ञा',
      specialization: 'Career, Wealth & Dasha Strategist',
      photo: 'https://mkvnstorage.blob.core.windows.net/trainedconsultaint/Priya%20Upadhyay.png',
      experience: '11+ Years in Practice',
      location: 'Rishikesh, India',
    },
    {
      key: 'Kimiya',
      devanagariNum: '०4',
      name: 'Dr. Kimaya G. Chogale',
      sanskritTag: 'आयुर्वेद',
      specialization: 'Ayurveda Consultant | Women’s Health & Psychosomatic Wellness',
      photo: 'https://mkvnstorage.blob.core.windows.net/trainedconsultaint/ayurvedic_doctor_sage_web.jpg',
      experience: '10+ Years in Practice',
      location: 'Mumbai & Rishikesh, India',
    }
  ];

  ngAfterViewInit(): void {
    // 1. Try to initialize immediately
    this.initObserver();

    // 2. Subscribe to changes to guarantee initialization once the @for loop renders the DOM
    this.cardElements.changes.subscribe(() => {
      this.initObserver();
    });
  }

  private initObserver(): void {
    if (!this.cardElements || this.cardElements.length === 0) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver((entries) => {
      let delay = 0; // Local delay counter to stagger cards that enter at the same time
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          
          delay += 150; // Stagger each card by 150ms
          this.observer?.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1, // Trigger when 10% of the card is visible 
      rootMargin: '50px' // Start triggering slightly before it enters the viewport
    });

    this.cardElements.forEach(card => {
      this.observer?.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scroll(direction: 1 | -1): void {
    const el = this.track?.nativeElement;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.75), behavior: 'smooth' });
  }
}// Commete added