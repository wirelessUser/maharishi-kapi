import { Component, OnInit, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { COURSES, CourseDetail } from '../../data/courses';
import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';

declare var paypal: any;

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  selector: 'app-course-detail-page',
  templateUrl: './course-detail-page.html',
  styleUrl: './course-detail-page.css'
})
export class CourseDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly paymentService = inject(PaymentService);
  readonly cart = inject(CartService);

  // PayPal Sandbox Client ID
  private readonly PAYPAL_CLIENT_ID = 'BAAB26u5T2tIE66-Vf7U_zoKPCfM61wdMBbh2wBbiyyVggMWEoP0ohGoLpJtzVUFXTqsueQlM5QvJEnSQU';

  readonly course = signal<CourseDetail | null>(null);
  readonly related = signal<CourseDetail[]>([]);
  readonly expandedIndex = signal<number | null>(null);
  readonly openFaq = signal<number | null>(0);

  // State signals for modal & checkout
  readonly activeCheckoutCourse = signal<CourseDetail | null>(null);
  readonly isProcessingPayment = signal<boolean>(false);
  readonly paymentError = signal<string | null>(null);

  // State signal for completed order success popup
  readonly completedOrder = signal<{
    orderId: string;
    courseTitle: string;
    amount: number;
  } | null>(null);

  readonly faqs = [
    {
      question: 'When can I access the course material?',
      answer: 'Immediately after transaction completion, the course materials and portal credentials are automatically unlocked.'
    },
    {
      question: 'Is the certificate accredited?',
      answer: 'Yes, issued directly under the Maharishi Kapi Saraswat parampara.'
    },
    {
      question: 'What currency is used for payment?',
      answer: 'All transactions are securely handled in EUR (€) via PayPal.'
    }
  ];

  @ViewChild('paypalButtonContainer') set paypalContainer(element: ElementRef | undefined) {
    if (element && this.activeCheckoutCourse()) {
      this.renderPayPalButton(element.nativeElement, this.activeCheckoutCourse()!);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      const found = COURSES.find((item) => item.slug === slug) ?? null;
      this.course.set(found);

      if (found) {
        this.related.set(
          COURSES.filter((item) => item.category === found.category && item.slug !== found.slug).slice(0, 3)
        );
      }
    });
  }

  toggle(index: number): void {
    this.expandedIndex.update((current) => (current === index ? null : index));
  }

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }

  formatPrice(value: number): string {
    return `${value.toLocaleString('de-DE')} €`;
  }

  // Cart action
  toggleCart(c: CourseDetail): void {
    if (this.cart.isInCart(c.slug)) {
      this.cart.removeFromCart(c.slug);
    } else {
      this.cart.addToCart({
        id: c.slug,
        title: c.title,
        category: c.category,
        price: c.price,
        originalPrice: c.originalPrice,
        image: c.image
      });
    }
  }

  // Direct checkout modal actions
  async openCheckout(c: CourseDetail, event?: Event): Promise<void> {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.paymentError.set(null);
    this.isProcessingPayment.set(false);

    try {
      await this.paymentService.loadSdk(this.PAYPAL_CLIENT_ID, 'EUR');
    } catch {
      this.paymentError.set('Failed to load PayPal. Please refresh the page.');
    }

    this.activeCheckoutCourse.set(c);
  }

  closeCheckout(): void {
    if (this.isProcessingPayment()) return;
    this.activeCheckoutCourse.set(null);
    this.paymentError.set(null);
  }

  closeSuccessModal(): void {
    this.completedOrder.set(null);
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
          console.log('Sending order request for slug:', course.slug);
          const res = await firstValueFrom(
            this.paymentService.createOrder(course.slug, 'Course')
          );
          return res.orderId;
        } catch (err: any) {
          console.error('>>> EXACT REASON IT FAILED:', err);
          this.paymentError.set(err?.error?.message || err?.statusText || 'Could not initiate order.');
          throw err;
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
            this.completedOrder.set({
              orderId: captureRes.orderId,
              courseTitle: course.title,
              amount: course.price
            });
          } else {
            this.paymentError.set('Payment could not be completed.');
          }
        } catch (err) {
          console.error('Payment capture error:', err);
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