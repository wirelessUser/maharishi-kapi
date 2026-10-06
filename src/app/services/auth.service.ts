import { Injectable, computed, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id?: string;
  email: string;
  fullName?: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  user?: User;
  id?: string;
  email?: string;
  fullName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly API_URL = 'https://astrokapiapi-hkesbwh6fjddhtg5.centralindia-01.azurewebsites.net/api/auth';
  private readonly TOKEN_KEY = 'astro_jwt_token';
  private readonly USER_KEY = 'astro_user_info';
  private readonly CART_KEY = 'astro_cart_items';

  readonly currentUser = signal<User | null>(this.loadStoredUser());
  readonly isLoggedIn = computed(() => !!this.currentUser());

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, payload, {
      withCredentials: true
    });
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap((res) => {
        if (!this.isBrowser) return;

        const jwtToken = res.token || res.accessToken;
        if (jwtToken) {
          localStorage.setItem(this.TOKEN_KEY, jwtToken);
        }

        const user: User = res.user ?? {
          id: res.id,
          email: res.email ?? credentials.email,
          fullName: res.fullName ?? credentials.email.split('@')[0]
        };

        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }

  // ==========================================
  // FORGOT & RESET PASSWORD METHODS
  // ==========================================
forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.API_URL}/forgot-password`, { email }, {
    withCredentials: true
  });
}

resetPassword(payload: { email: string; token: string; newPassword: string }): Observable<any> {
  return this.http.post(`${this.API_URL}/reset-password`, {
    email: payload.email,
    token: payload.token, // 👈 Must be 'token' to match dto.Token
    newPassword: payload.newPassword
  }, {
    withCredentials: true
  });
}

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.CART_KEY);
    }

    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadStoredUser(): User | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}