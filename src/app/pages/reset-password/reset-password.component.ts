import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main class="min-h-screen bg-[#faf8f5] flex items-center justify-center py-16 px-4">
      <div class="w-full max-w-md bg-white rounded-3xl border border-[#e8dac5] p-8 sm:p-10 shadow-sm">

        <!-- Header -->
        <div class="text-center mb-6">
          <div class="w-12 h-12 rounded-2xl bg-[#fbf3e8] border border-amber-300 text-[#8c5324] flex items-center justify-center text-xl mx-auto mb-3 shadow-xs">
            <i class="fa-solid fa-key"></i>
          </div>
          <h1 class="text-2xl sm:text-3xl font-serif font-black text-[#3a2717]">Reset Password</h1>
          <p class="text-xs text-[#7d6756] mt-2 font-sans">
            Paste the security token from your email and enter your new password below.
          </p>
        </div>

        @if (isSuccess()) {
          <!-- Success State -->
          <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
            <div class="text-emerald-600 text-3xl">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h3 class="font-serif font-bold text-sm text-emerald-900">Password Reset Successful!</h3>
            <p class="text-xs text-emerald-700 leading-relaxed">
              Your password has been successfully updated. You can now sign in with your new credentials.
            </p>
            <a routerLink="/login" 
               class="inline-block w-full py-3 bg-[#8c5324] hover:bg-[#d97706] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-xs">
              Go to Sign In
            </a>
          </div>
        } @else {
          <!-- Reset Form -->
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            
            @if (errorMessage()) {
              <div class="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <!-- 1. Email Address -->
            <div>
              <label class="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c5324] mb-1.5">
                Email Address
              </label>
              <input type="email"
                     name="email"
                     [ngModel]="email()"
                     (ngModelChange)="email.set($event)"
                     placeholder="student@example.com"
                     required
                     class="w-full px-4 py-3 bg-[#fdfbf7] rounded-xl border border-[#e8dac5] text-xs text-[#3a2717] focus:outline-none focus:border-[#8c5324] transition-colors" />
            </div>

            <!-- 2. Paste Reset Token Field -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c5324]">
                  Reset Token / Code
                </label>
                <span class="text-[10px] text-[#7d6756] font-mono">(Copied from email)</span>
              </div>
              <textarea
                     name="token"
                     rows="3"
                     [ngModel]="token()"
                     (ngModelChange)="token.set($event)"
                     placeholder="Paste the reset token here..."
                     required
                     class="w-full px-4 py-3 bg-[#fdfbf7] rounded-xl border border-[#e8dac5] text-xs font-mono text-[#3a2717] focus:outline-none focus:border-[#8c5324] transition-colors break-all resize-none"></textarea>
            </div>

            <!-- 3. New Password -->
            <div>
              <label class="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c5324] mb-1.5">
                New Password
              </label>
              <input type="password"
                     name="newPassword"
                     [ngModel]="newPassword()"
                     (ngModelChange)="newPassword.set($event)"
                     placeholder="Minimum 6 characters"
                     required
                     class="w-full px-4 py-3 bg-[#fdfbf7] rounded-xl border border-[#e8dac5] text-xs text-[#3a2717] focus:outline-none focus:border-[#8c5324] transition-colors" />
            </div>

            <!-- 4. Confirm Password -->
            <div>
              <label class="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c5324] mb-1.5">
                Confirm Password
              </label>
              <input type="password"
                     name="confirmPassword"
                     [ngModel]="confirmPassword()"
                     (ngModelChange)="confirmPassword.set($event)"
                     placeholder="Re-enter new password"
                     required
                     class="w-full px-4 py-3 bg-[#fdfbf7] rounded-xl border border-[#e8dac5] text-xs text-[#3a2717] focus:outline-none focus:border-[#8c5324] transition-colors" />
            </div>

            <!-- Submit Button -->
            <button type="submit"
                    [disabled]="isLoading() || !email() || !token() || !newPassword() || !confirmPassword()"
                    class="w-full mt-2 py-3.5 bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#b45309] disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
              @if (isLoading()) {
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Updating Password...</span>
              } @else {
                <span>Update Password</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              }
            </button>

            <div class="text-center pt-3 border-t border-[#f0e4d4]">
              <a routerLink="/login" class="text-xs font-mono text-[#8c5324] hover:underline">
                ← Back to Login
              </a>
            </div>

          </form>
        }

      </div>
    </main>
  `
})
export class ResetPasswordComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);

  readonly email = signal<string>('');
  readonly token = signal<string>('');
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');

  readonly isLoading = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  ngOnInit(): void {
    // If the user arrived via a link with query params, auto-fill them:
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email.set(params['email']);
      }
      const incomingToken = params['token'] || params['code'];
      if (incomingToken) {
        this.token.set(incomingToken);
      }
    });
  }

  onSubmit(): void {
    if (this.newPassword() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    if (this.newPassword().length < 6) {
      this.errorMessage.set('Password must be at least 6 characters.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.resetPassword({
      email: this.email().trim(),
      token: this.token().trim(),
      newPassword: this.newPassword()
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isSuccess.set(true);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        const backendError = err?.error?.message 
          || (typeof err?.error === 'string' ? err.error : null)
          || 'Password reset failed. The token may have expired or is invalid.';
        this.errorMessage.set(backendError);
      }
    });
  }
}