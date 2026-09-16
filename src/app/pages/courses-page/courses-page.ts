import { Component } from '@angular/core';
import { Courses } from '../../components/courses/courses';
import { SeoService } from '../../services/seo.service';

@Component({
  imports: [Courses],
  selector: 'app-courses-page',
  styleUrl: './courses-page.css',
  templateUrl: './courses-page.html',
})
export class CoursesPage {
  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'Vedic Astrology, Numerology, Vastu & Wellness Courses',
      description: '24 professional certification courses in Vedic Astrology, Numerology, Tarot, Vastu, Palmistry, and Wellness — taught live by Acharya Alok Awasthi with lifetime access.',
      path: '/courses',
      keywords: 'Vedic astrology course, Jyotish certification, learn Vastu online, Vedic numerology course, palmistry course',
    });
  }
}
