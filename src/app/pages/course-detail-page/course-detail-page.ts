import { Component, computed, effect, signal, inject, PLATFORM_ID } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CourseDetail, getCourseBySlug, getRelatedCourses } from '../../data/courses';
import { SeoService, SITE_URL } from '../../services/seo.service';

interface Faq {
  question: string;
  answer: string;
}

@Component({
  standalone: true,
  imports: [RouterLink,DecimalPipe],
  selector: 'app-course-detail-page',
  styleUrl: './course-detail-page.css',
  templateUrl: './course-detail-page.html',
})
export class CourseDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID); // Platform ID इंजेक्ट करें
isExpanded?: boolean; // यह लाइन जोड़ें
  readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') || params.get('id') || '')),
    { initialValue: '' }
  );

  readonly course = computed(() => getCourseBySlug(this.slug()));
  readonly related = computed(() => getRelatedCourses(this.slug()));
  readonly openFaq = signal<number | null>(0);

  readonly faqs: Faq[] = [
    {
      question: 'Do I need any prior knowledge to enrol?',
      answer: 'Only if the course itself lists a prerequisite above. Most Level 1 / foundational courses start from first principles and assume nothing.',
    },
    {
      question: 'Is the certification recognised?',
      answer: 'Yes — certificates are issued by the Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences on completion.',
    },
    {
      question: 'What if I miss a live class?',
      answer: 'Sessions are recorded and added to your course dashboard, so you can catch up at your own pace with lifetime access.',
    },
    {
      question: 'Can I get a refund if the course isn’t right for me?',
      answer: 'No',
    },
  ];

  constructor() {
    effect(() => {
      const c = this.course();
      if (!c) return;

      // 1. Meta & Title Update (SSR safe होना चाहिए)
      this.seo.setPageSeo({
        title: c.title,
        description: c.tagline,
        path: `/courses/${c.slug}`,
        image: c.image,
        type: 'product',
        keywords: `${c.title}, ${c.category} course, ${c.level} Vedic ${c.category}`,
      });

      // 2. यदि SeoService सीधे DOM मैनिपुलेशन (Direct Script injection) करता है, 
      // तो उसे केवल ब्राउज़र में चलाएं या SeoService में DOCUMENT Token का प्रयोग करें।
      if (isPlatformBrowser(this.platformId)) {
        this.injectJsonLd(c);
      }
    });
  }

  private injectJsonLd(c: CourseDetail): void {
    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: c.title,
        description: c.description,
        image: c.image,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
          sameAs: SITE_URL,
        },
        educationalLevel: c.level,
        inLanguage: c.language,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: c.format,
          courseWorkload: c.duration,
        },
        offers: {
          '@type': 'Offer',
          price: c.price,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/courses/${c.slug}`,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ]);
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  formatPrice(value: number): string {
    return `${value.toLocaleString('de-DE')} €`;
  }


  // विकल्प 1: यदि आप डेटा लोड करते समय टॉगल प्रॉपर्टी सेट करना चाहते हैं
toggleModule(module: any) {
    module.isExpanded = !module.isExpanded;
}

// विकल्प 2: या सेट (Set) / सिग्नल (Signal) के माध्यम से सिलेक्टेड इंडेक्स ट्रैक कर सकते हैं
expandedIndex = signal<number | null>(null);

toggle(index: number) {
    this.expandedIndex.update(i => i === index ? null : index);
}
}