import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var paypal: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly http = inject(HttpClient);
  private sdkLoaded = false;

  // 1. Point this directly to your running .NET API port:
  // Replace 7xxx with your actual .NET port from launchSettings.json
  private readonly API_BASE_URL = 'https://localhost:7084/api/payments';

  loadSdk(clientId: string, currency: string = 'EUR'): Promise<void> {
    if (this.sdkLoaded || (window as any).paypal) {
      this.sdkLoaded = true;
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.id = 'paypal-jssdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}&intent=capture`;
      script.onload = () => {
        this.sdkLoaded = true;
        resolve();
      };
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  createOrder(itemId: string, itemType: string = 'Course'): Observable<{ orderId: string }> {
    // 2. Uses the full .NET API URL:
    return this.http.post<{ orderId: string }>(`${this.API_BASE_URL}/create-paypal-order`, {
      itemId,
      itemType
    });
  }
createCartOrder(itemIds: string[]): Observable<{ orderId: string }> {
  return this.http.post<{ orderId: string }>('https://localhost:7084/api/payments/create-cart-paypal-order', {
    itemIds
  });
}
  captureOrder(payPalOrderId: string): Observable<{ status: string; orderId: string }> {
    // 3. Uses the full .NET API URL:
    return this.http.post<{ status: string; orderId: string }>(`${this.API_BASE_URL}/capture-paypal-order`, {
      payPalOrderId
    });
  }
}