import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';

declare var paypal: any;

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  readonly cart = inject(CartService);
  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router);

  private readonly PAYPAL_CLIENT_ID = 'BAAB26u5T2tIE66-Vf7U_zoKPCfM61wdMBbh2wBbiyyVggMWEoP0ohGoLpJtzVUFXTqsueQlM5QvJEnSQU';

  readonly isProcessing = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  @ViewChild('cartPaypalContainer') set paypalContainer(el: ElementRef | undefined) {
    if (el && this.cart.count() > 0) {
      this.initPayPal(el.nativeElement);
    }
  }

  formatPrice(val: number): string {
    return `${val.toLocaleString('de-DE')} €`;
  }

  private async initPayPal(container: HTMLElement): Promise<void> {
    await this.paymentService.loadSdk(this.PAYPAL_CLIENT_ID, 'EUR');
    container.innerHTML = '';

    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' },
      createOrder: async () => {
        try {
          this.errorMessage.set(null);
          const itemIds = this.cart.items().map(i => i.id);
          const res = await firstValueFrom(this.paymentService.createCartOrder(itemIds));
          return res.orderId;
        } catch (err: any) {
          this.errorMessage.set(err?.error?.message || 'Could not initiate cart checkout.');
          throw err;
        }
      },
      onApprove: async (data: any) => {
        this.isProcessing.set(true);
        try {
          const captureRes = await firstValueFrom(this.paymentService.captureOrder(data.orderID));
          if (captureRes.status === 'COMPLETED') {
            this.cart.clearCart();
            this.router.navigate(['/my-orders']);
          } else {
            this.errorMessage.set('Payment could not be captured.');
          }
        } catch {
          this.errorMessage.set('Payment verification failed.');
        } finally {
          this.isProcessing.set(false);
        }
      }
    }).render(container);
  }
}