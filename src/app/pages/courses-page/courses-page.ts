import { Component, computed, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs'; // <-- Fixes TS2304 Cannot find name 'firstValueFrom'
import { SeoService } from '../../services/seo.service';
import { PaymentService } from '../../services/payment.service';
import { COURSES, Category, CourseDetail } from '../../data/courses';

type CategoryFilter = 'All' | Category;

interface Faq {
  question: string;
  answer: string;
}

declare var paypal: any;

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-courses-page',
  styleUrl: './courses-page.css',
  templateUrl: './courses-page.html',
})
export class CoursesPage { // <-- Fixes TS2305: Module has no exported member 'CoursesPage'
  private readonly seo = inject(SeoService);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);

  private readonly PAYPAL_CLIENT_ID = 'BAAE51YJ8cK9cnb841N2XrLTEr5zN3L6ZW4cDjZDdeWbaRG1ELTR1Qxvx8K1Tng9zg1VlX81TZKh00wBYw';

  readonly categories: CategoryFilter[] = ['All', 'Astrology', 'Numerology', 'Tarot', 'Vastu', 'Palmistry', 'Wellness'];
  readonly selectedCategory = signal<CategoryFilter>('All');
  readonly openFaq = signal<number | null>(0);
  readonly courses: CourseDetail[] = COURSES;

  readonly activeCheckoutCourse = signal<CourseDetail | null>(null);
  readonly isProcessingPayment = signal<boolean>(false);
  readonly paymentError = signal<string | null>(null);

  @ViewChild('paypalButtonContainer') set paypalContainer(element: ElementRef | undefined) {
    if (element && this.activeCheckoutCourse()) {
      this.renderPayPalButton(element.nativeElement, this.activeCheckoutCourse()!);
    }
  }

  readonly filteredCourses = computed(() => {
    const category = this.selectedCategory();
    return category === 'All' ? this.courses : this.courses.filter((course) => course.category === category);
  });

  constructor() {
    this.seo.setPageSeo({
      title: 'Vedic Astrology, Numerology, Vastu & Wellness Courses',
      description: '24 professional certification courses in Vedic Astrology, Numerology, Tarot, Vastu, Palmistry, and Wellness.',
      path: '/courses',
      keywords: 'Vedic astrology course, Jyotish certification, learn Vastu online',
    });
  }

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  formatPrice(value: number): string {
    return `${value.toLocaleString('de-DE')} €`;
  }

  async openCheckout(course: CourseDetail, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    this.paymentError.set(null);
    this.activeCheckoutCourse.set(course);

    await this.paymentService.loadSdk(this.PAYPAL_CLIENT_ID, 'EUR');
  }

  closeCheckout(): void {
    if (this.isProcessingPayment()) return;
    this.activeCheckoutCourse.set(null);
    this.paymentError.set(null);
  }

  private renderPayPalButton(container: HTMLElement, course: CourseDetail): void {
    container.innerHTML = '';

    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'pill',
        label: 'pay'
      },
      createOrder: async () => {
        try {
          this.paymentError.set(null);
          const res = await firstValueFrom(
            this.paymentService.createOrder(course.slug, 'Course')
          );
          return res.orderId;
        } catch {
          this.paymentError.set('Could not initiate order. Please try again.');
          throw new Error('Order creation failed');
        }
      },
      onApprove: async (data: any) => {
        this.isProcessingPayment.set(true);
        try {
          const captureRes = await firstValueFrom(
            this.paymentService.captureOrder(data.orderID)
          );

          if (captureRes.status === 'COMPLETED') {
            this.activeCheckoutCourse.set(null);
            this.router.navigate(['/order-success', captureRes.orderId]);
          } else {
            this.paymentError.set('Payment could not be completed.');
          }
        } catch {
          this.paymentError.set('An error occurred during payment verification.');
        } finally {
          this.isProcessingPayment.set(false);
        }
      },
      onCancel: () => {
        this.paymentError.set('Transaction was cancelled.');
      },
      onError: (err: any) => {
        console.error('PayPal Error:', err);
        this.paymentError.set('Payment gateway encountered an error.');
      }
    }).render(container);
  }
}