import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

interface TickerItem {
  type: 'stat' | 'logo';
  key: string;
  value?: string;
  label?: string;
  sanskritTag?: string;
  img?: string;
  alt?: string;
  dark?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  selector: 'app-stats',
  styleUrl: './stats.css',
  templateUrl: './stats.html',
})
export class Stats {
  readonly tickerItems: TickerItem[] = [
    {
      type: 'stat',
      key: 'generations',
      value: '9',
      label: 'Generations of Lineage',
      sanskritTag: 'नव पीढ़ी परम्परा',
    },
    {
      type: 'logo',
      key: 'inkhbar',
      img: '/images/inkhbar-logo.png',
      alt: 'InKhabar National Media',
    },
    {
      type: 'stat',
      key: 'courses',
      value: '24',
      label: 'Master Curricula',
      sanskritTag: 'विद्या पीठ',
    },
    {
      type: 'logo',
      key: 'agniban',
      img: '/images/agniban-logo.jpg',
      alt: 'Dainik Agniban Press',
    },
    {
      type: 'stat',
      key: 'seekers',
      value: '10,240+',
      label: 'Global Sadhaks Blessed',
      sanskritTag: 'साधक कल्याण',
    },
    {
      type: 'logo',
      key: 'ims',
      img: '/images/ims-logo.webp',
      alt: 'IMS Ghaziabad Academic Partner',
      dark: true,
    },
  ];
}