import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RETREATS } from '../../data/retreats';
import { SeoService } from '../../services/seo.service';

interface GeneralFaq {
  question: string;
  answer: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-retreats-page',
  styleUrl: './retreats-page.css',
  templateUrl: './retreats-page.html',
})
export class RetreatsPage {
  readonly retreats = RETREATS;
  readonly upcoming = RETREATS.filter((retreat) => retreat.status === 'upcoming');
  readonly past = RETREATS.filter((retreat) => retreat.status === 'past');

  readonly allTestimonials = RETREATS.flatMap((retreat) =>
    retreat.testimonials.map((testimonial) => ({ ...testimonial, retreatTitle: retreat.title }))
  );

  readonly openFaq = signal<number | null>(0);

  // Tracks which 3D retreat brochure is actively unfolded (one at a time)
  readonly activeUpcomingBrochure = signal<number | null>(null);
  readonly activePastBrochure = signal<number | null>(null);

  readonly faqs: GeneralFaq[] = [
    {
      question: 'Do I need prior meditation or yoga experience?',
      answer: 'No. Every retreat is designed to welcome first-timers alongside experienced practitioners — daily practices are taught from first principles, with modifications offered where needed.',
    },
    {
      question: 'How many people join each retreat?',
      answer: 'Batches are kept intentionally small — typically 15–25 seekers — so Acharya Alok Awasthi can give real, personal attention rather than run a tour.',
    },
    {
      question: 'What is the cancellation & refund policy?',
      answer: 'A 50% deposit reserves your seat. deposits are non-refundable but transferable to a future batch.',
    },
    {
      question: 'Can I join solo, or do I need to come with someone?',
      answer: 'Most seekers join solo — the retreat structure and small-group format naturally build community, and solo travellers often report the deepest experiences.',
    },
    {
      question: 'Will I have phone / internet access during the retreat?',
      answer: 'Limited. We encourage a digital detox during sadhana hours, but WiFi is available at the accommodation each evening for essential check-ins home.',
    },
  ];

  toggleUpcomingBrochure(index: number): void {
    this.activeUpcomingBrochure.update((curr) => (curr === index ? null : index));
  }

  togglePastBrochure(index: number): void {
    this.activePastBrochure.update((curr) => (curr === index ? null : index));
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  formatPrice(value: number): string {
    return '$' + value.toLocaleString('en-US');
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'Spiritual & Vedic Retreats in Rishikesh | Maharishi Kapi Institute',
      description: 'Small-batch Vedic astrology and yogic sadhana retreats in the Himalayas with Acharya Alok Awasthi — meditation, chart readings, and immersive Vedic practice.',
      path: '/retreats',
      keywords: 'spiritual retreat India, Rishikesh yoga retreat, Vedic astrology retreat, meditation retreat Himalayas',
    });

    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }
}