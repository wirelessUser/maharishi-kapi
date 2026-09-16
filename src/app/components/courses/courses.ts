import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

// IMPORT YOUR MASTER DATA!
import { COURSES, Category, CourseDetail } from '../../data/courses';

type CategoryFilter = 'All' | Category;

interface Faq {
  question: string;
  answer: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-courses',
  styleUrl: './courses.css',
  templateUrl: './courses.html',
})
export class Courses {
  readonly categories: CategoryFilter[] = ['All', 'Astrology', 'Numerology', 'Tarot', 'Vastu', 'Palmistry', 'Wellness'];
  readonly selectedCategory = signal<CategoryFilter>('All');
  readonly openFaq = signal<number | null>(0); // Initialize first FAQ as open

  // Automatically pulls all 24+ courses from your master data file!
  readonly courses: CourseDetail[] = COURSES;

  readonly faqs: Faq[] = [
    {
      question: 'Do I need any prior knowledge of astrology or Vastu?',
      answer: 'No. Level 1 courses start from first principles and assume zero prior knowledge. Level 2/3 courses list their prerequisite in the description.',
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
      answer: 'No, we do not offer refunds. ',
    },
  ];

  readonly filteredCourses = computed(() => {
    const category = this.selectedCategory();
    return category === 'All' ? this.courses : this.courses.filter((course) => course.category === category);
  });

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  // Formatting Price to Euros (€)
  formatPrice(value: number): string {
    return `${value.toLocaleString('de-DE')} €`;
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'Vedic Astrology, Numerology, Vastu & Wellness Courses',
      description: '24 professional certification courses in Vedic Astrology, Numerology, Tarot, Vastu, Palmistry, and Wellness — taught live by Acharya Alok Awasthi with lifetime access.',
      path: '/courses',
      keywords: 'Vedic astrology course, Jyotish certification, learn Vastu online, Vedic numerology course, palmistry course',
    });
  }
}