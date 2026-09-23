import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContentService } from '../../admin/features/admin-content.service';

export interface AppScreen {
  id: string;
  title: string;
  sanskritTitle: string;
  tag: string;
  headline: string;
  description: string;
  image: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-immersive',
  styleUrl: './immersive.css',
  templateUrl: './immersive.html',
})
export class Immersive implements OnInit {
  private readonly contentService = inject(AdminContentService);

  readonly appScreens = signal<AppScreen[]>([]);
  readonly activeScreen = signal<AppScreen | null>(null);

  ngOnInit(): void {
    this.loadScreens();
  }

  private loadScreens(): void {
    this.contentService.getAppScreens().subscribe({
      next: (data: any) => {
        const rawList = Array.isArray(data) ? data : (data?.$values || data?.items || []);
        const mapped: AppScreen[] = rawList.map((item: any) => ({
          id: item.id || item.Id || item.screenId,
          title: item.title || item.Title,
          sanskritTitle: item.sanskritTitle || item.SanskritTitle || '',
          tag: item.tag || item.Tag || '',
          headline: item.headline || item.Headline || '',
          description: item.description || item.Description || '',
          image: item.imageUrl || item.ImageUrl || item.image
        }));

        this.appScreens.set(mapped);
        if (mapped.length > 0) {
          this.activeScreen.set(mapped[0]);
        }
      },
      error: (err) => console.error('App screens fetch error:', err)
    });
  }

  selectScreen(screen: AppScreen): void {
    this.activeScreen.set(screen);
  }
}