import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SacredCodex {
  id: string;
  devanagariNum: string;
  title: string;
  sanskritTitle: string;
  subtitle: string;
  category: string;
  pages: string;
  fileSize: string;
  shlokaSnippet: string;
  downloadUrl: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-downloads',
  styleUrl: './downloads.css',
  templateUrl: './downloads.html',
})
export class Downloads {
  readonly codices: SacredCodex[] = [
    {
      id: 'ananda-lahari',
      devanagariNum: '०१',
      title: 'Aanand Lahari',
      sanskritTitle: 'आनन्द लहरी',
      subtitle: 'Wave of Divine Bliss • Adi Shankara',
      category: 'Devi Shastra',
      pages: '12 Pages',
      fileSize: '2.8 MB',
      shlokaSnippet: 'भवानि स्तोतुं त्वां प्रभवति चतुर्भिर्न वदनैः...',
      downloadUrl: '#',
    },
    {
      id: 'achyutashtakam',
      devanagariNum: '०२',
      title: 'Achyutashtakam',
      sanskritTitle: 'अच्युताष्टकम्',
      subtitle: 'Eight Verses to the Infallible Divine',
      category: 'Vishnu Stuti',
      pages: '8 Pages',
      fileSize: '1.9 MB',
      shlokaSnippet: 'अच्युतं केशवं रामनारायणं कृष्णदामोदरं...',
      downloadUrl: '#',
    },
    {
      id: 'ardhanarishwara',
      devanagariNum: '०३',
      title: 'Ardhanarishwara Ashtakam',
      sanskritTitle: 'अर्धनारीश्वराष्टकम्',
      subtitle: 'The Sacred Union of Shiva & Shakti',
      category: 'Tattva Samhita',
      pages: '10 Pages',
      fileSize: '2.4 MB',
      shlokaSnippet: 'चाम्पेयगौरार्धशरीरकायै कर्पूरगौरार्धशरीरकाय...',
      downloadUrl: '#',
    },
    {
      id: 'bhaja-govindam',
      devanagariNum: '०४',
      title: 'Bhaja Govindam',
      sanskritTitle: 'भज गोविन्दम् (मोहमुद्गरः)',
      subtitle: 'Hammering Delusions of the Mind',
      category: 'Advaita Vedanta',
      pages: '16 Pages',
      fileSize: '3.6 MB',
      shlokaSnippet: 'भज गोविन्दं भज गोविन्दं गोविन्दं भज मूढमते...',
      downloadUrl: '#',
    },
  ];
}