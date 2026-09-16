import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  
  newsletterEmail = '';
  readonly subscribed = signal<boolean>(false);

  subscribeNewsletter(event: Event): void {
    event.preventDefault();
    if (this.newsletterEmail.trim()) {
      this.subscribed.set(true);
      setTimeout(() => this.subscribed.set(false), 4000);
      this.newsletterEmail = '';
    }
  }
}