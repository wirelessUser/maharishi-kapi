import { Component, computed, effect, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RETREATS, getRetreatBySlug } from '../../data/retreats';
import { SeoService, SITE_URL } from '../../services/seo.service';

@Component({
  imports: [RouterLink],
  selector: 'app-retreat-detail-page',
  styleUrl: './retreat-detail-page.css',
  templateUrl: './retreat-detail-page.html',
})
export class RetreatDetailPage {
  readonly slug = input<string>('');
  readonly retreat = computed(() => getRetreatBySlug(this.slug()));
  readonly openFaq = signal<number | null>(0);

  readonly seatsPercent = computed(() => {
    const r = this.retreat();
    if (!r || r.seatsTotal === 0) return 0;
    return Math.round((r.seatsLeft / r.seatsTotal) * 100);
  });

  readonly related = computed(() => {
    const current = this.retreat();
    if (!current) return [];
    return RETREATS.filter((retreat) => retreat.slug !== current.slug).slice(0, 2);
  });

  constructor(private readonly seo: SeoService) {
    effect(() => {
      const r = this.retreat();
      if (!r) return;

      this.seo.setPageSeo({
        title: `${r.title} — ${r.location}`,
        description: r.summary,
        path: `/retreats/${r.slug}`,
        image: r.heroImage,
        type: 'product',
        keywords: `${r.title}, retreat ${r.location}, Vedic retreat, ${r.duration} retreat`,
      });

      this.seo.setJsonLd([
        {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: r.title,
          description: r.summary,
          image: r.heroImage,
          touristType: 'Spiritual seekers',
          itinerary: {
            '@type': 'ItemList',
            itemListElement: r.route.map((stop, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: stop.name,
              description: stop.description,
            })),
          },
          offers: {
            '@type': 'Offer',
            price: r.priceFrom,
            priceCurrency: 'USD',
            availability: r.status === 'upcoming' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            url: `${SITE_URL}/retreats/${r.slug}`,
          },
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Maharishi Kapi Institute of Vedic Astrology & Yogic Sciences',
            sameAs: SITE_URL,
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: r.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ]);
    });
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  formatPrice(value: number): string {
    return '$' + value.toLocaleString('en-US');
  }
}
