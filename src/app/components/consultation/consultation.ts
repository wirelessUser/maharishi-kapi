import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminContentService } from '../../admin/features/admin-content.service';

export interface ConsultationTier {
  id: string;
  title: string;
  sanskritTag: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  duration: string;
  summary: string;
  devanagariNum: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-consultation',
  styleUrl: './consultation.css',
  templateUrl: './consultation.html',
})
export class Consultation implements OnInit {
  private readonly contentService = inject(AdminContentService);

  readonly consultations = signal<ConsultationTier[]>([]);

  ngOnInit(): void {
    this.loadConsultations();
  }

  private loadConsultations(): void {
    this.contentService.getConsultations().subscribe({
      next: (data: any) => {
        const rawList = Array.isArray(data) ? data : (data?.$values || data?.items || []);
        const mapped: ConsultationTier[] = rawList.map((item: any) => ({
          id: item.id || item.Id || item.tierId,
          devanagariNum: item.devanagariNum || item.DevanagariNum,
          title: item.title || item.Title,
          sanskritTag: item.sanskritTag || item.SanskritTag,
          category: item.category || item.Category,
          image: item.imageUrl || item.ImageUrl || item.image,
          price: Number(item.price ?? item.Price ?? 0),
          originalPrice: Number(item.originalPrice ?? item.OriginalPrice ?? 0),
          duration: item.duration || item.Duration,
          summary: item.summary || item.Summary
        }));

        this.consultations.set(mapped);
      },
      error: (err) => console.error('Consultations fetch error:', err)
    });
  }

  formatPrice(val: number): string {
    return '€' + (val || 0).toLocaleString('de-DE');
  }
}