import { Component } from '@angular/core';
import { SeoService, SITE_URL } from '../../services/seo.service';
import { HeroSection } from '../../components/hero-section/hero-section';
import { Generations } from '../../components/generations/generations';
import { Stats } from '../../components/stats/stats';
import { FeaturedCourses } from '../../components/featured-courses/featured-courses';
import { Legacy } from '../../components/legacy/legacy';
import { Roles } from '../../components/roles/roles';
import { Journey } from '../../components/journey/journey';
import { Immersive } from '../../components/immersive/immersive';
import { Consultation } from '../../components/consultation/consultation';
import { TrainedConsultants } from '../../components/trained-consultants/trained-consultants';
import { Stories } from '../../components/stories/stories';
import { Downloads } from '../../components/downloads/downloads';
import { Instagram } from '../../components/instagram/instagram';

@Component({
  imports: [HeroSection, Generations, Stats, FeaturedCourses, Legacy, Roles, Journey, Immersive, Consultation, TrainedConsultants, Stories, Downloads, Instagram],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'Maharishi Kapi Institute | Vedic Astrology, Vastu & Yogic Sciences',
      description: 'Learn Vedic Astrology, Numerology, Vastu, Palmistry, Tarot & Ayurveda from a 9-generation legacy with Acharya Alok Awasthi. Courses, 1-on-1 consultations, and spiritual retreats in Rishikesh.',
      path: '/',
      keywords: 'Vedic astrology institute, Jyotish courses, Vastu consultant, Acharya Alok Awasthi, Vedic numerology, astrology retreats Rishikesh',
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
      alternateName: 'Maharishi Kapi Institute',
      url: SITE_URL,
      logo: `${SITE_URL}/images/mk-logo.png`,
      image: `${SITE_URL}/images/founder-alok.jpg`,
      description: 'A 9-generation Vedic lineage institute offering courses, consultations, and retreats in Vedic Astrology, Vastu, Numerology, Palmistry, Tarot, and Yogic Sciences.',
      founder: {
        '@type': 'Person',
        name: 'Acharya Alok Awasthi',
      },
      address: [
        { '@type': 'PostalAddress', addressLocality: 'Rishikesh', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
        { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
        { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
        { '@type': 'PostalAddress', addressLocality: 'Riga', addressCountry: 'LV' },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-8791691675',
        email: 'maharishikapi@gmail.com',
        contactType: 'customer service',
      },
      sameAs: ['https://instagram.com/arka.connection', 'https://youtube.com/@arkaconnection', 'https://threads.net/@arka.connection'],
    });
  }
}
