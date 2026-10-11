import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// 3 levels up: auth.component -> auth -> pages -> app -> services
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  private readonly auth = inject(AuthService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly isLogin = signal<boolean>(true);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  fullName = '';
  phoneNumber = ''; // Added phone number property
  email = '';
  password = '';
  confirmPassword = '';

  toggleMode(loginMode: boolean): void {
    this.isLogin.set(loginMode);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.isLogin()) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  private handleLogin(): void {
    const cleanEmail = this.email.trim();
    if (!cleanEmail || !this.password) {
      this.errorMessage.set('Please enter both email and password.');
      return;
    }

    this.isLoading.set(true);
    this.auth.login({ email: cleanEmail, password: this.password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        const targetUrl = this.cart.count() > 0 ? '/cart' : '/my-orders';
        this.router.navigateByUrl(targetUrl);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.extractErrorMessage(err, 'Invalid email or password.'));
      }
    });
  }

  private handleRegister(): void {
    const cleanEmail = this.email.trim();
    const cleanName = this.fullName.trim();
    const cleanPhone = this.phoneNumber.trim();

    // Enforce phone number validation
    if (!cleanEmail || !this.password || !cleanPhone) {
      this.errorMessage.set('Please fill out all required fields, including your phone number.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);

    const payload = {
      displayName: cleanName || cleanEmail.split('@')[0],
      fullName: cleanName || cleanEmail.split('@')[0],
      email: cleanEmail,
      phoneNumber: cleanPhone, // Send phone number to backend
      password: this.password
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.auth.login({ email: cleanEmail, password: this.password }).subscribe({
          next: () => {
            this.isLoading.set(false);
            const targetUrl = this.cart.count() > 0 ? '/cart' : '/my-orders';
            this.router.navigateByUrl(targetUrl);
          },
          error: () => {
            this.isLoading.set(false);
            this.isLogin.set(true);
            this.successMessage.set('Account created successfully! Please sign in with your credentials.');
          }
        });
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.extractErrorMessage(err, 'Registration failed. Check password requirements.'));
      }
    });
  }

  private extractErrorMessage(err: any, fallback: string): string {
    if (!err) return fallback;

    if (err.error?.errors && typeof err.error.errors === 'object') {
      const messages: string[] = [];
      for (const key of Object.keys(err.error.errors)) {
        const errorArray = err.error.errors[key];
        if (Array.isArray(errorArray)) {
          messages.push(...errorArray);
        } else if (typeof errorArray === 'string') {
          messages.push(errorArray);
        }
      }
      if (messages.length > 0) return messages.join(' ');
    }

    if (typeof err.error === 'string') return err.error;
    if (typeof err.error?.message === 'string') return err.error.message;
    if (typeof err.error?.title === 'string') return err.error.title;
    if (typeof err.message === 'string') return err.message;

    return fallback;
  }
}