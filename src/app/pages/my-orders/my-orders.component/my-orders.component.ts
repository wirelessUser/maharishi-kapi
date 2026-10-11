import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

export interface PurchasedItem {
  id: string;
  name: string;
  price: number;
}

export interface MyOrder {
  orderId?: string;
  internalId?: string;
  gatewayOrderId?: string;
  itemId?: string;
  amount: number;
  status: string;
  date?: string;
  createdAt?: string;
  items?: PurchasedItem[];
}

@Component({
  standalone: true,
  selector: 'app-my-orders',
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <main class="min-h-screen bg-[#faf8f5] py-16 px-4">
      <div class="container mx-auto max-w-4xl">
        <h1 class="text-3xl sm:text-4xl font-serif font-black text-[#3a2717] mb-2">My Enrolled Courses & Orders</h1>
        <p class="text-xs text-[#7d6756] mb-8 font-mono">Your consecrated learning path & purchase history</p>

        @if (isLoading()) {
          <div class="py-20 text-center flex flex-col items-center gap-3">
            <div class="w-8 h-8 border-3 border-[#8c5324] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-xs font-mono text-[#8c5324] tracking-wider uppercase">Loading your enrollments...</p>
          </div>
        } @else if (orders().length === 0) {
          <div class="bg-white rounded-3xl p-10 text-center border border-[#e8dac5]">
            <p class="text-[#7d6756] text-sm mb-4">You have not completed any enrollments yet.</p>
            <a routerLink="/courses" class="bg-[#8c5324] text-white text-xs px-6 py-2.5 rounded-full font-mono uppercase font-bold">Browse Catalog</a>
          </div>
        } @else {
          <div class="space-y-6">
            @for (order of orders(); track (order.orderId || order.internalId)) {
              <div class="bg-white rounded-2xl p-6 border border-[#e8dac5]">
                
                <!-- Order Header -->
                <div class="flex flex-wrap justify-between items-center border-b border-[#f0e4d4] pb-4 mb-4 gap-2">
                  <div>
                    <span class="text-[10px] text-[#7d6756] font-mono block">
                      Order #{{ (order.orderId || order.internalId || 'N/A').substring(0, 8) }}
                    </span>
                    <span class="text-xs font-semibold text-[#3a2717]">
                      {{ (order.date || order.createdAt) | date:'mediumDate' }}
                    </span>
                  </div>
                  <div class="text-right">
                    <span class="px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-full"
                          [class.bg-emerald-100]="order.status === 'COMPLETED'"
                          [class.text-emerald-700]="order.status === 'COMPLETED'"
                          [class.bg-amber-100]="order.status === 'PENDING'"
                          [class.text-amber-700]="order.status === 'PENDING'">
                      {{ order.status }}
                    </span>
                    <span class="block text-sm font-bold text-[#8c5324] font-serif mt-1">{{ order.amount }} €</span>
                  </div>
                </div>

                <!-- Enrolled Course(s) List -->
                <div class="space-y-2.5">
                  @if (order.items && order.items.length > 0) {
                    @for (item of order.items; track item.id) {
                      <div class="flex justify-between items-center text-sm py-2.5 px-3.5 bg-[#fdfbf7] rounded-xl border border-[#f0e4d4]">
                        <div>
                          <span class="font-serif font-bold text-[#3a2717] block">{{ item.name }}</span>
                          <span class="text-[10px] text-[#8c5324] font-mono">Ref: {{ item.id }}</span>
                        </div>
                        <a [routerLink]="['/courses', item.id]" class="text-xs text-[#8c5324] font-mono font-bold hover:underline cursor-pointer">
                          Access Course →
                        </a>
                      </div>
                    }
                  } @else {
                    <div class="flex justify-between items-center text-sm py-2.5 px-3.5 bg-[#fdfbf7] rounded-xl border border-[#f0e4d4]">
                      <div>
                        <span class="font-serif font-bold text-[#3a2717] block">{{ order.itemId }}</span>
                      </div>
                      <a [routerLink]="['/courses', order.itemId]" class="text-xs text-[#8c5324] font-mono font-bold hover:underline cursor-pointer">
                        Access Course →
                      </a>
                    </div>
                  }
                </div>

              </div>
            }
          </div>
        }
      </div>
    </main>
  `
})
export class MyOrdersComponent implements OnInit {
  private readonly http = inject(HttpClient);
  readonly orders = signal<MyOrder[]>([]);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    // withCredentials ensures the AstroAuthToken cookie is sent
    this.http.get<MyOrder[]>('https://localhost:7084/api/payments/my-orders', {
      withCredentials: true
    }).subscribe({
      next: (res) => {
        this.orders.set(res ?? []);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Failed to load orders:', err);
        this.isLoading.set(false);
      }
    });
  }
}