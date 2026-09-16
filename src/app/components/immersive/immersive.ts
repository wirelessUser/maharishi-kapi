import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AppScreen {
  id: string;
  title: string;
  sanskritTitle: string;
  tag: string;
  headline: string;
  description: string;
  image: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-immersive',
  styleUrl: './immersive.css',
  templateUrl: './immersive.html',
})
export class Immersive {
  readonly appScreens: AppScreen[] = [
    {
      id: 'home-matrix',
      title: 'Vedic Matrix Dashboard',
      sanskritTitle: '',
      tag: '',
      headline: '',
      description: '',
      image: 'https://mkvnstorage.blob.core.windows.net/app/1_Home_Page.png',
    },
    {
      id: 'birth-grid',
      title: 'Sacred Numero Grid',
      sanskritTitle: 'अङ्क चक्र',
      tag: 'Sacred Geometry',
      headline: 'Master Your Life Path',
      description: 'Interactive 3x3 Kapi Numero chart configuration calculated from exact date of birth to reveal active planetary energies.',
      image: 'https://mkvnstorage.blob.core.windows.net/app/2_Numerology.png',
    },
    {
      id: 'ashtakvarga',
      title: 'Ashtakvarga Engine',
      sanskritTitle: 'अष्टकवर्ग चक्र',
      tag: 'Predictive Jyotish',
      headline: 'Starlit Future Insights',
      description: 'Sarvashtakvarga (SAV) and Bhinna Ashtakvarga (BAV) computations for precision transit and strength auditing.',
      image: 'https://mkvnstorage.blob.core.windows.net/app/3_Vedic_Astrology.png',
    },
    {
      id: 'vaastu-compass',
      title: 'Live Vaastu Compass',
      sanskritTitle: 'दिक् सूचक यन्त्र',
      tag: 'Real-Time Sensor',
      headline: 'Align Your Surroundings',
      description: 'Digital 16-zone precision compass with live azimuth tracking to evaluate energy flows instantly across rooms.',
      image: 'https://mkvnstorage.blob.core.windows.net/app/4_Vaastu_Compass.png',
    },
    {
      id: 'sector-analysis',
      title: 'Sector & Deity Analysis',
      sanskritTitle: 'पद देवता विन्यास',
      tag: 'Spatial Shastra',
      headline: 'Optimize Every Quadrant',
      description: 'Samarangana Sutradhara geometry mapping Soma, Kubera, and elemental zones for prosperity and balance.',
      image: 'https://mkvnstorage.blob.core.windows.net/app/5_Vaastu_Sector_Analysis.png',
    },
    {
      id: 'floor-grid',
      title: '3x3 Site Mandala Grid',
      sanskritTitle: 'वास्तु पुरुष मण्डल',
      tag: 'Architectural Grid',
      headline: 'Precision Grid Mapping',
      description: 'Align sacred floor-plan geometry against cardinal headings, mapping Indra, Yama, Varuna, and the central Brahmasthan.',
      image: 'https://mkvnstorage.blob.core.windows.net/app/6_Floor_Grid.png',
    },
  ];

  // Active highlighted screen on the smartphone mockup
  readonly activeScreen = signal<AppScreen>(this.appScreens[0]);

  selectScreen(screen: AppScreen): void {
    this.activeScreen.set(screen);
  }
}