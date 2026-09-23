import { Component } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

export interface Generation {
  key: string;
  ordinal: string;
  devanagariNumber: string;
  name: string;
  specialty: string;
  initials: string;
  shastricTitle: string;
  photo?: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  selector: 'app-generations',
  styleUrl: './generations.css',
  templateUrl: './generations.html',
})
export class Generations {
  readonly lineage: Generation[] = [
    {
      key: 'g1',
      ordinal: 'Generation I',
      devanagariNumber: '०१',
      name: 'Shri Krishna Saraswat',
      specialty: 'Darshanacharya & Classical Philosophy',
      initials: 'KS',
      shastricTitle: 'आदि प्रणेता • Founding Acharya',
    },
    {
      key: 'g2',
      ordinal: 'Generation II',
      devanagariNumber: '०२',
      name: 'Shri Kanhaiya Lal Saraswat',
      specialty: 'Pranic Energy Sciences & Panchakosha Healing',
      initials: 'KL',
      shastricTitle: 'प्राणविद्याविद् • Energy Healer',
    },
    {
      key: 'g3',
      ordinal: 'Generation III',
      devanagariNumber: '०३',
      name: 'Shri Bholanath Saraswat',
      specialty: 'Vedic Krishi & Planetary Agricultural Shastra',
      initials: 'BS',
      shastricTitle: 'ऋषि कृषि • Earth Harmonizer',
    },
    {
      key: 'g4',
      ordinal: 'Generation IV',
      devanagariNumber: '०४',
      name: 'Shri Durga Prasad Saraswat',
      specialty: 'Nyaya Philosophy, Dhanurveda & Marma Vidya',
      initials: 'DS',
      shastricTitle: 'मर्मज्ञ • Marma Master',
    },
    {
      key: 'g5',
      ordinal: 'Generation V',
      devanagariNumber: '०५',
      name: 'Dr. B. L. Sharma',
      specialty: 'Classical Ayurvedic Medicine & Nadi Pariksha',
      initials: 'BL',
      shastricTitle: 'आयुर्वेदाचार्य • Master Physician',
    },
    {
      key: 'g6',
      ordinal: 'Generation VI',
      devanagariNumber: '०६',
      name: 'Shri L. N. Sharma',
      specialty: 'Shastric Pedagogy & Gurukul Education',
      initials: 'LN',
      shastricTitle: 'विद्या वाचस्पति • Guru Preceptor',
    },
    {
      key: 'g7',
      ordinal: 'Generation VII',
      devanagariNumber: '०७',
      name: 'Acharya Alok Awasthi',
      specialty: 'Vedic Jyotish, Sthapatya Vastu & Yogic Sciences',
      initials: 'AA',
      shastricTitle: 'संस्थापक • Current Torchbearer',
      photo: 'https://storagemaharishikapicom.blob.core.windows.net/home-page/acharyalaoknaturebackground.png',
    },
  ];
}