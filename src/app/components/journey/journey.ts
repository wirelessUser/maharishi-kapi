import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface JourneyPath {
  id: string;
  devanagariNum: string;
  sanskritTag: string;
  prompt: string;
  title: string;
  subtitle: string;
  deck: string;
  image: string;
  targetRoute: string;
  routeLabel: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-journey',
  styleUrl: './journey.css',
  templateUrl: './journey.html',
})
export class Journey {
  readonly scrollTrack = viewChild<ElementRef<HTMLDivElement>>('scrollTrack');

  readonly paths: JourneyPath[] = [
    {
      id: 'spiritual',
      devanagariNum: '०१',
      sanskritTag: 'अध्यात्म जागृति',
      prompt: "I am seeking",
      title: 'Spiritual',
      subtitle: 'Awakening',
      deck: 'Dissolve mental fatigue and cultivate deep inner stillness through classical Chitta Shuddhi, Ganga meditation, and Bhagavad Gita contemplation.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
      targetRoute: '/retreats',
      routeLabel: 'Explore Retreats',
    },
    {
      id: 'astrology',
      devanagariNum: '०२',
      sanskritTag: 'ज्योतिष रहस्य',
      prompt: "I am looking to",
      title: 'Master',
      subtitle: 'Astrology',
      deck: 'Decode the celestial mechanics of destiny, transits, and karmic timing with certified Saraswat lineage masterclasses from first principles.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      targetRoute: '/courses',
      routeLabel: 'Explore Courses',
    },
    {
      id: 'transition',
      devanagariNum: '०३',
      sanskritTag: 'कर्म परिवर्तन',
      prompt: "I am navigating a",
      title: 'Transition',
      subtitle: 'in Life',
      deck: 'Clarity for high-stakes career crossroads, Saturn returns, or sudden life upheaval through private one-on-one astrological roadmap strategy.',
      image: '/images/founder-alok.jpg',
      targetRoute: '/services',
      routeLabel: 'Book 1-on-1 Session',
    },
    {
      id: 'healing',
      devanagariNum: '०४',
      sanskritTag: 'आयुर्वेद एवं मर्म',
      prompt: "I am looking to",
      title: 'Heal My',
      subtitle: 'Body & Prana',
      deck: 'Restore biological vitality and unlock subtle energetic blockages through Tridosha pulse diagnosis, herbal Dinacharya, and 107 Marma therapy.',
      image: 'https://images.unsplash.com/photo-1518288774671-b94e8088c2f5?auto=format&fit=crop&w=800&q=80',
      targetRoute: '/residential',
      routeLabel: 'Join Clinical Residency',
    },
    {
      id: 'relationships',
      devanagariNum: '०५',
      sanskritTag: 'सम्बन्ध एवं धर्म',
      prompt: "I am looking for",
      title: 'Conscious',
      subtitle: 'Harmony & Love',
      deck: 'Harmonize partnerships and discover auspicious marital timing through profound Navamsha (D9) psychological compatibility and Guna Milan.',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
      targetRoute: '/services',
      routeLabel: 'Matchmaking Guidance',
    },
  ];

  readonly selectedPathId = signal<string>(this.paths[1].id);

  selectPath(id: string): void {
    this.selectedPathId.set(id);
  }

  get selectedPath(): JourneyPath {
    return this.paths.find((p) => p.id === this.selectedPathId()) ?? this.paths[0];
  }

  scrollLeft(): void {
    const el = this.scrollTrack()?.nativeElement;
    if (el) {
      el.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    const el = this.scrollTrack()?.nativeElement;
    if (el) {
      el.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }
}