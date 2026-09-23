import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthorAvatar } from '../../components/author-avatar/author-avatar';
import { ArticleDto } from '../../core/models/blog.models';
import { BlogService } from '../../core/services/blog.service';
import { renderArticleMarkdown } from '../../core/utils/article-markdown';
import { describeHttpError } from '../../core/utils/http-error';
import { SeoService } from '../../services/seo.service';

const ALL_CATEGORIES = 'All';
// The page has no pagination UI, so one large page holds the whole archive.
const PAGE_SIZE = 100;

// How many pages of columns the text spreads over. A page is one viewport wide plus the column gap, and the
// small tolerance absorbs sub-pixel rounding in scrollWidth. Pure, so it can be tested without a layout engine.
export const countTextPages = (scrollWidth: number, clientWidth: number, gap: number): number =>
  clientWidth > 0 ? Math.max(1, Math.ceil((scrollWidth + gap) / (clientWidth + gap) - 0.05)) : 1;

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, AuthorAvatar],
  selector: 'app-blog-page',
  styleUrl: './blog-page.css',
  templateUrl: './blog-page.html',
})
export class BlogPage {
  private readonly blog = inject(BlogService);
  private readonly destroyRef = inject(DestroyRef);
  private articlesRequest?: Subscription;
  private contentRequest?: Subscription;
  // Rendered bodies already fetched, so flipping back to an article neither refetches it nor counts another view.
  private readonly htmlCache = new Map<string, string>();
  private readonly injector = inject(Injector);
  private readonly articleColumns = viewChild<ElementRef<HTMLElement>>('articleColumns');

  readonly showTechnicalDetails = !environment.production;

  readonly selectedCategory = signal<string>(ALL_CATEGORIES);
  private readonly apiCategories = signal<string[]>([]);
  readonly categories = computed(() => [ALL_CATEGORIES, ...this.apiCategories()]);

  readonly loading = signal<boolean>(true);
  readonly loadError = signal<string | null>(null);

  private readonly featured = signal<ArticleDto | null>(null);
  // Grid stories: the API already applies the category filter and leaves the featured article out.
  readonly filteredArticles = signal<ArticleDto[]>([]);
  readonly trending = signal<ArticleDto[]>([]);

  // Currently open article in the top interactive magazine reader spread
  readonly activeSpreadIndex = signal<number>(0);
  readonly isFlipping = signal<boolean>(false);

  // Newsletter state
  emailInput = '';
  readonly subscribed = signal<boolean>(false);
  readonly subscribing = signal<boolean>(false);
  readonly subscribeError = signal<string | null>(null);

  // All selectable articles for the top magazine spread reader (cover story first)
  readonly allSelectableArticles = computed(() => {
    const category = this.selectedCategory();
    const featured = this.featured();
    const items = this.filteredArticles();
    return featured && (category === ALL_CATEGORIES || featured.category === category)
      ? [featured, ...items]
      : items;
  });

  readonly currentSpreadArticle = computed(() => {
    const list = this.allSelectableArticles();
    return list.length ? list[this.activeSpreadIndex() % list.length] : null;
  });

  // Body of the article open in the reader, as HTML rendered from its Markdown. null while it loads; the list
  // endpoints leave `content` out. It is bound with [innerHTML], so Angular sanitizes it once more.
  readonly spreadHtml = signal<string | null>(null);
  readonly spreadContentError = signal<string | null>(null);

  // The body sits in a fixed-height, multi-column viewport. Text that doesn't fit flows into further columns off to
  // the side and a "page" is one screenful of them, so a long article turns pages instead of stretching the reader.
  readonly textPage = signal(0);
  readonly textPageCount = signal(1);
  // Set when going back from an article's first page, so the article before it opens on its last page.
  private pendingLastPage = false;

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'The Maharishi Kapi Journal | Vedic Magazine & Editorial',
      description: 'Read Vedic astrology, Vastu, Ayurveda, numerology, and culture in an authentic interactive magazine format.',
      path: '/blog',
      keywords: 'Vedic astrology magazine, Vastu editorial, Ayurveda journal, numerology articles',
    });

    // Fetch the text of whichever article is open in the reader. Nothing is open until the browser has
    // loaded the list, so this never fires during server rendering.
    effect(() => {
      const article = this.currentSpreadArticle();
      if (article) {
        untracked(() => this.loadSpreadContent(article));
      }
    });

    // Re-count the pages whenever the columns are resized (window resize, layout change) or an image in the
    // article finishes loading, since an image changes how much room the text has.
    effect((onCleanup) => {
      const columns = this.articleColumns()?.nativeElement;
      if (!columns) {
        return;
      }
      const remeasure = () => this.measureTextPages();
      // `load` does not bubble, so listen in the capture phase to catch images inside the article.
      columns.addEventListener('load', remeasure, true);
      onCleanup(() => columns.removeEventListener('load', remeasure, true));

      if (typeof ResizeObserver === 'undefined') {
        return;
      }
      const observer = new ResizeObserver(remeasure);
      observer.observe(columns);
      onCleanup(() => observer.disconnect());
    });

    // Browser-only: the server render and the first client render must both show the loading state.
    afterNextRender(() => {
      this.loadPage();

      // Web fonts change how the text wraps, and with it the number of pages.
      const remeasure = () => this.measureTextPages();
      document.fonts?.addEventListener('loadingdone', remeasure);
      this.destroyRef.onDestroy(() => document.fonts?.removeEventListener('loadingdone', remeasure));
    });
  }

  loadPage(): void {
    this.loadCategories();
    this.loadFeatured();
    this.loadTrending();
    this.loadArticles();
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.activeSpreadIndex.set(0);
    this.loadArticles();
  }

  // Turning the leaf pages through the open article's text first, then moves on to the next article.
  nextSpread(): void {
    if (this.textPage() < this.textPageCount() - 1) {
      this.textPage.update((page) => page + 1);
      return;
    }
    const list = this.allSelectableArticles();
    if (list.length === 1) {
      this.textPage.set(0);
      return;
    }
    this.triggerFlip(() => {
      this.activeSpreadIndex.update((curr) => (curr + 1) % list.length);
    });
  }

  prevSpread(): void {
    if (this.textPage() > 0) {
      this.textPage.update((page) => page - 1);
      return;
    }
    const list = this.allSelectableArticles();
    if (list.length === 1) {
      this.textPage.set(this.textPageCount() - 1);
      return;
    }
    this.triggerFlip(() => {
      // Like turning a leaf back: the previous article opens on its last page.
      this.pendingLastPage = true;
      this.activeSpreadIndex.update((curr) => (curr - 1 + list.length) % list.length);
    });
  }

  // Opens any selected article in the top magazine reading spread & smoothly scrolls up
  openArticleInMagazine(article: ArticleDto): void {
    const list = this.allSelectableArticles();
    const targetIdx = list.findIndex((a) => a.slug === article.slug);
    if (targetIdx !== -1) {
      this.triggerFlip(() => {
        this.activeSpreadIndex.set(targetIdx);
      });
      // Smooth scroll back up to the open magazine reader
      const reader = document.getElementById('magazine-desk-view');
      reader?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  subscribe(event: Event): void {
    event.preventDefault();
    const email = this.emailInput.trim();
    if (!email || this.subscribing()) {
      return;
    }

    this.subscribing.set(true);
    this.subscribeError.set(null);
    this.blog
      .subscribe(email)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.subscribing.set(false);
          this.emailInput = '';
          this.subscribed.set(true);
          setTimeout(() => this.subscribed.set(false), 4000);
        },
        error: () => {
          this.subscribing.set(false);
          this.subscribeError.set('We could not add your email just now. Please check the address and try again.');
        },
      });
  }

  private loadArticles(): void {
    // Cancels the previous in-flight request so a slow response can't overwrite a newer category.
    this.articlesRequest?.unsubscribe();
    this.loading.set(true);
    this.loadError.set(null);
    this.filteredArticles.set([]);

    const category = this.selectedCategory();
    this.articlesRequest = this.blog
      .getArticles({ pageSize: PAGE_SIZE, category: category === ALL_CATEGORIES ? undefined : category })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.filteredArticles.set(res.items);
          this.activeSpreadIndex.set(0);
          this.loading.set(false);
        },
        error: (err) => {
          this.loadError.set(describeHttpError(err));
          this.loading.set(false);
        },
      });
  }

  // Detail endpoints return `content` (and record a public view on the API side).
  private loadSpreadContent(article: ArticleDto): void {
    // A different article was opened: drop the request for the previous one and start on its first page.
    this.contentRequest?.unsubscribe();
    this.spreadContentError.set(null);
    this.textPage.set(0);
    this.textPageCount.set(1);

    const cached = this.htmlCache.get(article.id);
    if (cached !== undefined) {
      this.spreadHtml.set(cached);
      this.measureAfterRender();
      return;
    }

    this.spreadHtml.set(null);
    this.contentRequest = this.blog
      .getArticleById(article.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          const html = renderArticleMarkdown(data.content);
          this.htmlCache.set(article.id, html);
          this.spreadHtml.set(html);
          this.measureAfterRender();
        },
        error: (err) => {
          this.pendingLastPage = false;
          this.spreadContentError.set(describeHttpError(err));
        },
      });
  }

  private measureAfterRender(): void {
    afterNextRender(() => this.measureTextPages(), { injector: this.injector });
  }

  // Reads the laid-out columns to see how many pages the open article spans. Runs after the text renders, on
  // resize, and when web fonts finish loading, since each of those can change how the text wraps.
  private measureTextPages(): void {
    const columns = this.articleColumns()?.nativeElement;
    if (!columns) {
      return;
    }
    const gap = parseFloat(getComputedStyle(columns).columnGap) || 0;
    const count = countTextPages(columns.scrollWidth, columns.clientWidth, gap);
    this.textPageCount.set(count);
    this.textPage.update((page) => (this.pendingLastPage ? count - 1 : Math.min(page, count - 1)));
    this.pendingLastPage = false;
  }

  private loadCategories(): void {
    this.blog
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.apiCategories.set(res.data),
        error: (err) => console.warn('[blog] categories unavailable:', describeHttpError(err)),
      });
  }

  private loadFeatured(): void {
    this.blog
      .getFeaturedArticle()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.featured.set(res.data),
        // A missing featured article is a normal state; the list still renders without it.
        error: (err) => {
          this.featured.set(null);
          console.warn('[blog] featured article unavailable:', describeHttpError(err));
        },
      });
  }

  private loadTrending(): void {
    this.blog
      .getTrendingArticles()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => this.trending.set(res.data),
        error: (err) => {
          this.trending.set([]);
          console.warn('[blog] trending unavailable:', describeHttpError(err));
        },
      });
  }

  private triggerFlip(callback: () => void): void {
    this.isFlipping.set(true);
    setTimeout(() => {
      callback();
      setTimeout(() => this.isFlipping.set(false), 260);
    }, 180);
  }
}
