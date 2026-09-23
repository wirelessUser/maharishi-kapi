import { Component, ElementRef, OnInit, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminContentService } from '../../admin/features/admin-content.service';

export interface JourneyPath {
  id: string;
  devanagariNum: string;
  sanskritTag: string;
  prompt: string;
  title: string;
  subtitle: string;
  deck: string;
  image: string;
  targetRoute: string;
  routeLabel: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-journey',
  styleUrl: './journey.css',
  templateUrl: './journey.html',
})
export class Journey implements OnInit {
  private readonly contentService = inject(AdminContentService);

  readonly scrollTrack = viewChild<ElementRef<HTMLDivElement>>('scrollTrack');
  readonly paths = signal<JourneyPath[]>([]);
  readonly selectedPathId = signal<string>('');

  ngOnInit(): void {
    this.loadJourneyPaths();
  }

  private loadJourneyPaths(): void {
    this.contentService.getJourneyPaths().subscribe({
      next: (data: any) => {
        const rawList = Array.isArray(data) ? data : (data?.$values || data?.items || []);
        const mapped: JourneyPath[] = rawList.map((item: any) => ({
          id: item.id || item.Id || item.routeId,
          devanagariNum: item.devanagariNum || item.DevanagariNum,
          sanskritTag: item.sanskritTag || item.SanskritTag,
          prompt: item.prompt || item.Prompt,
          title: item.title || item.Title,
          subtitle: item.subtitle || item.Subtitle,
          deck: item.deck || item.Deck,
          image: item.imageUrl || item.ImageUrl || item.image,
          targetRoute: item.targetRoute || item.TargetRoute,
          routeLabel: item.routeLabel || item.RouteLabel
        }));

        this.paths.set(mapped);
        if (mapped.length > 0) {
          this.selectedPathId.set(mapped[0].id);
        }
      },
      error: (err) => console.error('Journey paths fetch error:', err)
    });
  }

  selectPath(id: string): void {
    this.selectedPathId.set(id);
  }

  get selectedPath(): JourneyPath | undefined {
    return this.paths().find((p) => p.id === this.selectedPathId()) ?? this.paths()[0];
  }

  scrollLeft(): void {
    const el = this.scrollTrack()?.nativeElement;
    if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
  }

  scrollRight(): void {
    const el = this.scrollTrack()?.nativeElement;
    if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
  }
}