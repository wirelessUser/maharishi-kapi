import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main class="min-h-screen bg-[#faf8f5] flex items-center justify-center py-16 px-4">
      <div class="w-full max-w-md bg-white rounded-3xl border border-[#e8dac5] p-8 sm:p-10 shadow-sm">
        
        <!-- Header -->
        <div class="text-center mb-6">
          <div class="w-12 h-12 rounded-2xl bg-[#fbf3e8] border border-amber-300 text-[#8c5324] flex items-center justify-center text-xl mx-auto mb-3 shadow-2xs">
            <i class="fa-solid" [class.fa-key]="step() !== 'completed'" [class.fa-circle-check]="step() === 'completed'"></i>
          </div>

          <h1 class="text-2xl sm:text-3xl font-serif font-black text-[#3a2717]">
            {{ step() === 'request' ? 'Forgot Password' : (step() === 'reset' ? 'Enter Reset Token' : 'Password Updated') }}
          </h1>

          <p class="text-xs text-[#7d6756] mt-2 font-sans">
            @if (step() === 'request') {
              Enter your registered email address and we'll send you a security token to reset your password.
            } @else if (step() === 'reset') {
              We sent a security token to <strong class="text-[#3a2717] font-mono">{{ email() }}</strong>. Paste it below to set your new password.
            } @else {
              Your password has been changed successfully. You can now sign in with your new password.
            }
          </p>
        </div>

        <!-- Global Error Banner -->
        @if (errorMessage()) {
          <div class="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>{{ errorMessage() }}</span>
          </div>
        }

        <!-- ========================================== -->
        <!-- STEP 1: REQUEST TOKEN VIA EMAIL            -->
        <!-- ========================================== -->
        @if (step() === 'request') {
          <form (ngSubmit)="onRequestToken()" class="space-y-4">
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

            <button type="submit"
                    [disabled]="isLoading() || !email()"
                    class="w-full mt-2 py-3.5 bg-[#8c5324] hover:bg-[#d97706] disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
              @if (isLoading()) {
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Security Token...</span>
              } @else {
                <span>Send Security Token</span>
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

        <!-- ========================================== -->
        <!-- STEP 2: PASTE TOKEN & SET NEW PASSWORD     -->
        <!-- ========================================== -->
        @else if (step() === 'reset') {
          <form (ngSubmit)="onResetPassword()" class="space-y-4">
            
            <!-- Paste Token Field -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c5324]">
                  Reset Token / Security Code
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

            <!-- New Password -->
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

            <!-- Confirm Password -->
            <div>
              <label class="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c5324] mb-1.5">
                Confirm New Password
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
                    [disabled]="isLoading() || !token() || !newPassword() || !confirmPassword()"
                    class="w-full mt-2 py-3.5 bg-gradient-to-r from-[#d97706] via-[#ea580c] to-[#b45309] disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
              @if (isLoading()) {
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Updating Password...</span>
              } @else {
                <span>Update Password</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              }
            </button>

            <!-- Back / Resend Link -->
            <div class="flex justify-between items-center pt-3 border-t border-[#f0e4d4] text-[11px] font-mono">
              <button type="button" (click)="step.set('request')" class="text-[#7d6756] hover:underline cursor-pointer">
                ← Re-enter Email
              </button>
              <a routerLink="/login" class="text-[#8c5324] hover:underline">
                Back to Login
              </a>
            </div>

          </form>
        }

        <!-- ========================================== -->
        <!-- STEP 3: SUCCESS STATE                      -->
        <!-- ========================================== -->
        @else {
          <div class="space-y-4 pt-2">
            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center text-xs text-emerald-800 leading-relaxed">
              Your password has been changed. You can now log into your account using your new credentials.
            </div>

            <a routerLink="/login" 
               class="inline-block w-full py-3.5 bg-[#8c5324] hover:bg-[#d97706] text-white text-center text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer">
              Proceed to Sign In →
            </a>
          </div>
        }

      </div>
    </main>
  `
})
export class ForgotPasswordComponent {
  private readonly auth = inject(AuthService);

  readonly step = signal<'request' | 'reset' | 'completed'>('request');
  readonly email = signal<string>('');
  readonly token = signal<string>('');
  readonly newPassword = signal<string>('');
  readonly confirmPassword = signal<string>('');

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string>('');

  // 1. Submit email to receive token
  onRequestToken(): void {
    if (!this.email()) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.forgotPassword(this.email().trim()).subscribe({
      next: () => {
        this.isLoading.set(false);
        // Switch immediately to the paste token and new password step
        this.step.set('reset');
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(err?.error?.message || err?.error || 'Unable to dispatch token. Please verify your email.');
      }
    });
  }

  // 2. Submit token + new password
  onResetPassword(): void {
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
        this.step.set('completed');
      },
      error: (err: any) => {
        this.isLoading.set(false);
        const backendError = err?.error?.message 
          || (typeof err?.error === 'string' ? err.error : null)
          || 'Password reset failed. The token may be invalid or expired.';
        this.errorMessage.set(backendError);
      }
    });
  }
}