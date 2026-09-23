import { Component, ElementRef, HostListener, OnInit, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContentService } from '../../admin/features/admin-content.service';

export interface Role {
  id?: string;
  key: string;
  devanagariNum: string;
  icon: string;
  title: string;
  specialization: string;
  desc?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  pressLogos?: boolean;
  hasPressLogos?: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-roles',
  styleUrl: './roles.css',
  templateUrl: './roles.html',
})
export class Roles implements OnInit {
  private readonly contentService = inject(AdminContentService);

  readonly roles = signal<Role[]>([]);

  readonly viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');
  readonly track = viewChild<ElementRef<HTMLDivElement>>('track');

  readonly currentIndex = signal(0);
  private readonly stepPx = signal(0);
  private readonly maxOffsetPx = signal(0);

  constructor() {
    afterNextRender(() => this.measure());
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.contentService.getRoles().subscribe({
      next: (data: any) => {
        const rawList = Array.isArray(data) ? data : (data?.$values || data?.items || []);
        // डेटाबेस के कॉलम नामों (imageUrl, description) को UI मॉडल (image, desc) से मैप करना
        const mapped: Role[] = rawList.map((item: any) => ({
          id: item.id || item.Id,
          key: item.key || item.Key,
          devanagariNum: item.devanagariNum || item.DevanagariNum,
          icon: item.icon || item.Icon,
          title: item.title || item.Title,
          specialization: item.specialization || item.Specialization,
          desc: item.description || item.Description || item.desc,
          image: item.imageUrl || item.ImageUrl || item.image,
          pressLogos: item.hasPressLogos ?? item.HasPressLogos ?? item.pressLogos ?? false
        }));

        this.roles.set(mapped);
        setTimeout(() => this.measure(), 100);
      },
      error: (err) => console.error('Roles fetch error:', err)
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.measure();
  }

  goTo(i: number) {
    const n = this.roles().length;
    if (n === 0) return;
    this.currentIndex.set(((i % n) + n) % n);
  }

  next() {
    this.goTo(this.currentIndex() + 1);
  }

  prev() {
    this.goTo(this.currentIndex() - 1);
  }

  trackTransform(): string {
    const raw = this.currentIndex() * this.stepPx();
    const clamped = Math.min(raw, this.maxOffsetPx());
    return `translateX(-${clamped}px)`;
  }

  private measure() {
    const trackEl = this.track()?.nativeElement;
    const viewportEl = this.viewport()?.nativeElement;
    const cardEl = trackEl?.firstElementChild as HTMLElement | undefined;
    if (!trackEl || !viewportEl || !cardEl) return;

    const gap = parseFloat(getComputedStyle(trackEl).columnGap || '0') || 0;
    const cardWidth = cardEl.getBoundingClientRect().width;
    const n = this.roles().length;

    this.stepPx.set(cardWidth + gap);
    const totalWidth = n * cardWidth + (n - 1) * gap;
    const viewportWidth = viewportEl.getBoundingClientRect().width;
    this.maxOffsetPx.set(Math.max(0, totalWidth - viewportWidth));
  }
}