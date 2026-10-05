import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

declare var paypal: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: `
    <div class="checkout-container">
      <h3>Complete your Purchase</h3>
      <div #paypalButtonContainer></div>
      @if (loading) {
        <p>Processing transaction, please wait...</p>
      }
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypalButtonContainer', { static: true }) paypalContainer!: ElementRef;
  
  loading = false;
  selectedItemId = 'course-angular-advanced';
  selectedItemType = 'Course';

  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    await this.loadPayPalSdk('YOUR_SANDBOX_CLIENT_ID', 'USD');
    this.renderPayPalButtons();
  }

  loadPayPalSdk(clientId: string, currency: string): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('paypal-sdk-script')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'paypal-sdk-script';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  renderPayPalButtons() {
    paypal.Buttons({
      // 1. Called when user clicks PayPal button
      createOrder: async () => {
        const res: any = await firstValueFrom(
          this.http.post('/api/payments/create-paypal-order', {
            itemId: this.selectedItemId,
            itemType: this.selectedItemType
          })
        );
        return res.orderId; // Passes PayPal Order ID into the SDK popup
      },

      // 2. Called when user approves transaction inside popup
      onApprove: async (data: any) => {
        this.loading = true;
        try {
          const captureRes: any = await firstValueFrom(
            this.http.post('/api/payments/capture-paypal-order', {
              payPalOrderId: data.orderID
            })
          );

          if (captureRes.status === 'COMPLETED') {
            this.router.navigate(['/order-success', captureRes.orderId]);
          }
        } catch (err) {
          alert('Payment capture failed. Please contact support.');
        } finally {
          this.loading = false;
        }
      },

      onError: (err: any) => {
        console.error('PayPal Checkout error:', err);
      }
    }).render(this.paypalContainer.nativeElement);
  }
}