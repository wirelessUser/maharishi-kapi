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
  token: any;
  email?: string;
  fullName?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  // Matches AccountController
  private readonly API_URL = 'https://localhost:7084/api/account';
  private readonly TOKEN_KEY = 'astro_jwt_token';
  private readonly USER_KEY = 'astro_user_info';

  readonly currentUser = signal<User | null>(this.loadStoredUser());
  readonly isLoggedIn = computed(() => !!this.currentUser());

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Register
  register(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, payload);
  }

  // Login
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        // Extracts the token whether returned as a plain string or an object with jwtToken
        const rawToken = typeof res.token === 'string' ? res.token : res.token?.jwtToken;

        if (rawToken && this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, rawToken);

          const user: User = {
            email: res.email ?? credentials.email,
            fullName: res.fullName ?? credentials.email.split('@')[0]
          };

          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  // Logout
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
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

  // Inside src/app/services/auth.service.ts

forgotPassword(email: string): Observable<any> {
  // Adjust URL to match your backend endpoint (e.g. /forgot-password or /forgotPassword)
  return this.http.post(`${this.API_URL}/forgot-password`, { email }, {
    withCredentials: true
  });
}

resetPassword(payload: { email: string; resetCode: string; newPassword: string }): Observable<any> {
  // Adjust URL to match your backend endpoint (e.g. /reset-password or /resetPassword)
  return this.http.post(`${this.API_URL}/reset-password`, payload, {
    withCredentials: true
  });
}
}