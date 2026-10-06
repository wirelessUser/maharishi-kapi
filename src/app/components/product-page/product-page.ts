// product-page.ts
import { Component, signal, computed } from '@angular/core';
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

  // Category filter
  readonly selectedCategory = signal<string>('All');

  readonly categories: string[] = [
    'All',
    'Rosary & Malas',
    'Aromatics & Dhoop',
    'Havan Essentials',
    'Vastu & Sacred Artifacts',
    'Sacred Books'
  ];

  // गौमाता के अलग-अलग पंक्तियों के लिए पावन संदेश
  readonly cowBlessings: string[] = [
    'अति पावन! घर ले जाएँ 🌸',
    'सिद्ध एवं अभिमंत्रित! ✨',
    'दिव्य ऊर्जा का वास 🙏',
    'पवित्र साधना हेतु 🌿',
    'सात्विक एवं प्रामाणिक 🪔'
  ];

  // Dynamically filtered products
  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') {
      return this.allProducts;
    }
    return this.allProducts.filter(p => p.category === cat);
  });

  // प्रत्येक पंक्ति (Row) के लिए 4-4 प्रोडक्ट्स का ग्रुप
  readonly productRows = computed(() => {
    const items = this.filteredProducts();
    const rows: Product[][] = [];
    const rowSize = 4;
    for (let i = 0; i < items.length; i += rowSize) {
      rows.push(items.slice(i, i + rowSize));
    }
    return rows;
  });

  setCategory(cat: string): void {
    this.selectedCategory.set(cat);
  }

  formatPrice(value: number): string {
    return '₹' + value.toLocaleString('en-IN');
  }
}