import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PRODUCTS, Product } from './products.data';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-product-page',
  templateUrl: './product-page.html',
})
export class ProductPage {
  readonly allProducts = PRODUCTS;

  // View Mode: 'slider' (3D Stage) या 'grid' (eCommerce Catalogue)
  readonly viewMode = signal<'slider' | 'grid'>('slider');
  
  // 3D Slider का एक्टिव इंडेक्स
  readonly activeIndex = signal<number>(0);
  
  // क्या सेंटर वाली एक्टिव किताब खुली (unfolded) हुई है
  readonly isBookOpen = signal<boolean>(false);

  // कैटेगरी फ़िल्टर
  readonly selectedCategory = signal<string>('All');

  readonly categories: string[] = [
    'All',
    'Rosary & Malas',
    'Aromatics & Dhoop',
    'Havan Essentials',
    'Vastu & Sacred Artifacts',
    'Sacred Books'
  ];

  // फ़िल्टर किए गए प्रॉडक्ट्स
  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') {
      return this.allProducts;
    }
    return this.allProducts.filter(p => p.category === cat);
  });

  // कीबोर्ड नेविगेशन (Left / Right Arrow Keys)
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.viewMode() !== 'slider') return;
    if (event.key === 'ArrowRight') this.nextSlide();
    if (event.key === 'ArrowLeft') this.prevSlide();
    if (event.key === 'Escape') this.isBookOpen.set(false);
  }

  nextSlide(): void {
    const total = this.filteredProducts().length;
    if (total === 0) return;
    this.isBookOpen.set(false);
    this.activeIndex.update((i) => (i + 1) % total);
  }

  prevSlide(): void {
    const total = this.filteredProducts().length;
    if (total === 0) return;
    this.isBookOpen.set(false);
    this.activeIndex.update((i) => (i - 1 + total) % total);
  }

  goToSlide(index: number): void {
    if (index === this.activeIndex()) {
      // अगर उसी सेंटर वाली किताब पर दोबारा क्लिक करें तो वह खुल/बंद हो
      this.isBookOpen.update((open) => !open);
    } else {
      this.isBookOpen.set(false);
      this.activeIndex.set(index);
    }
  }

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.activeIndex.set(0);
    this.isBookOpen.set(false);
  }

  toggleViewMode(mode: 'slider' | 'grid'): void {
    this.viewMode.set(mode);
    this.isBookOpen.set(false);
  }

  formatPrice(value: number): string {
    return '₹' + value.toLocaleString('en-IN');
  }

  // 3D स्लाइडर में हर किताब की डेप्थ, ट्रांसलेशन और रोटेशन की गणना
  getSlideStyle(index: number): { [key: string]: string | number } {
    const active = this.activeIndex();
    const total = this.filteredProducts().length;
    
    // सर्कुलर दूरी (Shortest distance in circular list)
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);

    // अगर किताब स्क्रीन से 3 स्टेप्स से ज्यादा दूर है तो छुपा दें
    if (absDiff > 3) {
      return {
        display: 'none',
        opacity: 0,
        pointerEvents: 'none'
      };
    }

    if (diff === 0) {
      // सेंटर की एक्टिव किताब
      return {
        transform: 'translateX(0px) translateZ(60px) rotateY(0deg) scale(1)',
        zIndex: 50,
        opacity: 1,
        pointerEvents: 'auto',
        filter: 'drop-shadow(0 25px 35px rgba(47,31,19,0.35))'
      };
    }

    // साइड की किताबें (Left / Right)
    const direction = diff > 0 ? 1 : -1;
    const xOffset = direction * (260 + (absDiff - 1) * 180);
    const zOffset = -180 * absDiff;
    const rotateY = -direction * (32 + (absDiff - 1) * 8);
    const scale = Math.max(0.68, 1 - absDiff * 0.14);
    const opacity = Math.max(0.3, 1 - absDiff * 0.32);

    return {
      transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 50 - absDiff * 10,
      opacity: opacity,
      pointerEvents: 'auto',
      filter: 'brightness(0.85) contrast(0.95)'
    };
  }
}