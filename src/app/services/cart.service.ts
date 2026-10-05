import { Injectable, computed, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);

  private readonly API_URL = 'https://localhost:7084/api/cart';
  private readonly STORAGE_KEY = 'astro_cart_items';

  readonly items = signal<CartItem[]>(this.loadCart());

  readonly count = computed(() => this.items().length);
  readonly totalAmount = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0)
  );

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor() {
    // Automatically reacts whenever the user logs in or out
    effect(() => {
      const user = this.auth.currentUser();

      if (this.isBrowser) {
        if (user) {
          // Student just logged in: sync local items to DB, then fetch fresh DB state
          this.syncLocalCartToDbAndFetch();
        } else {
          // Student logged out: wipe in-memory state
          this.items.set([]);
          localStorage.removeItem(this.STORAGE_KEY);
        }
      }
    }, { allowSignalWrites: true });
  }

  private getRequestOptions() {
    const token = this.auth.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return {
      headers,
      withCredentials: true
    };
  }

  /**
   * Syncs guest cart items to the database, then fetches full list
   */
  private syncLocalCartToDbAndFetch(): void {
    const localItems = this.loadCart();

    if (localItems.length > 0) {
      // Push each locally added course to the backend
      localItems.forEach(item => {
        this.http.post(`${this.API_URL}/add`, { courseId: item.id }, this.getRequestOptions()).subscribe({
          error: (err) => console.warn('Could not sync item to DB:', item.id, err)
        });
      });
    }

    // Fetch the updated cart from the database
    this.fetchCartFromDatabase();
  }

  fetchCartFromDatabase(): void {
    if (!this.auth.isLoggedIn()) return;

    this.http.get<any[]>(this.API_URL, this.getRequestOptions()).subscribe({
      next: (dbItems) => {
        if (!dbItems) return;

        const mappedItems: CartItem[] = dbItems.map((item) => ({
          id: item.id,
          title: item.name || item.title || item.id,
          category: item.category || 'Vedic Studies',
          price: item.price,
          image: item.image || ''
        }));

        this.items.set(mappedItems);
        this.saveCart(mappedItems);
      },
      error: (err) => {
        console.error('Failed to load cart from DB at ' + this.API_URL, err);
      }
    });
  }

  addToCart(item: CartItem): boolean {
    const current = this.items();
    if (current.some((c) => c.id === item.id)) {
      return false;
    }

    const updated = [...current, item];
    this.items.set(updated);
    this.saveCart(updated);

    // Save to database if student is logged in
    if (this.auth.isLoggedIn()) {
      this.http.post(`${this.API_URL}/add`, { courseId: item.id }, this.getRequestOptions()).subscribe({
        error: (err) => console.error('Error saving cart item to DB:', err)
      });
    }

    return true;
  }

  removeFromCart(id: string): void {
    const updated = this.items().filter((item) => item.id !== id);
    this.items.set(updated);
    this.saveCart(updated);

    if (this.auth.isLoggedIn()) {
      this.http.delete(`${this.API_URL}/${id}`, this.getRequestOptions()).subscribe({
        error: (err) => console.error('Error removing cart item from DB:', err)
      });
    }
  }

  clearCart(): void {
    this.items.set([]);
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
    }

    if (this.auth.isLoggedIn()) {
      this.http.delete(`${this.API_URL}/clear`, this.getRequestOptions()).subscribe({
        error: (err) => console.error('Error clearing DB cart:', err)
      });
    }
  }

  isInCart(id: string): boolean {
    return this.items().some((item) => item.id === id);
  }

  private loadCart(): CartItem[] {
    if (!this.isBrowser) return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveCart(items: CartItem[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}