import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface LineagePillar {
  devanagari: string;
  label: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-legacy',
  styleUrl: './legacy.css',
  templateUrl: './legacy.html',
})
export class Legacy {
  readonly lineagePillars: LineagePillar[] = [
    { devanagari: 'ज्योतिष', label: 'Vedic Jyotish' },
    { devanagari: 'वास्तु', label: 'Sthapatya Vastu' },
    { devanagari: 'आयुर्वेद', label: 'Ayurveda & Marma' },
    { devanagari: 'साधना', label: 'Chitta Shuddhi' },
  ];
}