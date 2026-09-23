import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ArticleDetailDto, ArticleDto } from '../../core/models/blog.models';
import { BlogService } from '../../core/services/blog.service';
import { BlogPage, countTextPages } from './blog-page';

const article = (slug: string, category: string, featured = false): ArticleDto => ({
  id: slug,
  slug,
  title: `Title of ${slug}`,
  deck: `Deck of ${slug}`,
  category,
  image: '',
  author: 'Acharya Alok',
  authorPhoto: '',
  date: 'Sep 2, 2026',
  readTime: '5 min read',
  featured,
  pullQuote: null,
  issueVol: null,
});

const detail = (slug: string, content = `First paragraph of ${slug}.\nSecond paragraph of ${slug}.`): ArticleDetailDto => ({
  id: slug,
  slug,
  title: `Title of ${slug}`,
  deck: `Deck of ${slug}`,
  category: 'Astrology',
  image: '',
  content,
  author: 'Acharya Alok',
  authorPhoto: '',
  publishedDate: '2026-09-02T00:00:00',
  readTimeMinutes: 5,
  featured: false,
  pullQuote: null,
  issueVolume: null,
  viewCount: 0,
});

describe('countTextPages', () => {
  it('is one page when the text fits, then one more per screenful of columns', () => {
    const viewport = 600;
    const gap = 24;
    const column = (viewport - gap) / 2;

    expect(countTextPages(viewport, viewport, gap)).toBe(1);
    expect(countTextPages(2 * (viewport + gap) - gap, viewport, gap)).toBe(2);
    // Five columns: two full pages, then a third page holding a single column.
    expect(countTextPages(5 * column + 4 * gap, viewport, gap)).toBe(3);
  });

  it('treats an unmeasurable viewport as a single page', () => {
    expect(countTextPages(0, 0, 0)).toBe(1);
  });
});

describe('BlogPage', () => {
  const cover = article('cover', 'Astrology', true);
  const vastu = article('vastu-1', 'Vastu');
  const ayurveda = article('ayurveda-1', 'Ayurveda');

  const blog = {
    getArticles: vi.fn(),
    getFeaturedArticle: vi.fn(),
    getTrendingArticles: vi.fn(),
    getCategories: vi.fn(),
    getArticleById: vi.fn(),
    subscribe: vi.fn(),
  };

  const paged = (items: ArticleDto[]) => of({ status: 'success', items, pagination: null });
  const ok = <T>(data: T) => of({ status: 'success', data });

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    blog.getArticles.mockReturnValue(paged([vastu, ayurveda]));
    blog.getFeaturedArticle.mockReturnValue(ok(cover));
    blog.getTrendingArticles.mockReturnValue(ok([cover, vastu]));
    blog.getCategories.mockReturnValue(ok(['Astrology', 'Ayurveda', 'Vastu']));
    blog.getArticleById.mockReset();
    blog.getArticleById.mockImplementation((id: string) => ok(detail(id)));
    TestBed.configureTestingModule({
      imports: [BlogPage],
      providers: [{ provide: BlogService, useValue: blog }],
    });
  });

  afterEach(() => vi.restoreAllMocks());

  async function render() {
    const fixture = TestBed.createComponent(BlogPage);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  it('shows API articles with the featured cover first and out of the grid', async () => {
    const fixture = await render();
    const page = fixture.componentInstance;

    expect(page.allSelectableArticles().map((a) => a.slug)).toEqual(['cover', 'vastu-1', 'ayurveda-1']);
    expect(page.filteredArticles().map((a) => a.slug)).toEqual(['vastu-1', 'ayurveda-1']);
    expect(page.categories()).toEqual(['All', 'Astrology', 'Ayurveda', 'Vastu']);
    expect(page.trending().map((a) => a.slug)).toEqual(['cover', 'vastu-1']);
    expect(fixture.nativeElement.textContent).toContain('Title of cover');
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
  });

  it('asks the API for the selected category and omits the filter for All', async () => {
    const fixture = await render();
    const page = fixture.componentInstance;

    blog.getArticles.mockReturnValue(paged([vastu]));
    page.selectCategory('Vastu');
    expect(blog.getArticles).toHaveBeenLastCalledWith({ pageSize: 100, category: 'Vastu' });
    expect(page.allSelectableArticles().map((a) => a.slug)).toEqual(['vastu-1']);

    page.selectCategory('All');
    expect(blog.getArticles).toHaveBeenLastCalledWith({ pageSize: 100, category: undefined });
  });

  it('still renders the list when there is no featured article', async () => {
    blog.getFeaturedArticle.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500, url: 'https://api.test/api/v1/blog/featured/main' })),
    );
    const fixture = await render();

    expect(fixture.componentInstance.allSelectableArticles().map((a) => a.slug)).toEqual(['vastu-1', 'ayurveda-1']);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
  });

  it('shows an error state, not bundled content, when the API cannot be reached', async () => {
    blog.getArticles.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 0, url: 'https://api.test/api/v1/blog' })),
    );
    const fixture = await render();
    const page = fixture.componentInstance;

    expect(page.loadError()).toContain('https://api.test/api/v1/blog');
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    expect(page.filteredArticles()).toEqual([]);

    blog.getArticles.mockReturnValue(paged([vastu]));
    page.loadPage();
    fixture.detectChanges();
    expect(page.loadError()).toBeNull();
    expect(page.filteredArticles().map((a) => a.slug)).toEqual(['vastu-1']);
  });

  it("shows the open article's own text instead of placeholder copy", async () => {
    blog.getArticleById.mockImplementation((id: string) =>
      ok(detail(id, 'The real opening paragraph.\r\n\r\nA second paragraph from the admin.\n')),
    );
    const fixture = await render();
    fixture.detectChanges();

    expect(blog.getArticleById).toHaveBeenCalledWith('cover');
    const body: HTMLElement = fixture.nativeElement.querySelector('.article-columns');
    expect(Array.from(body.querySelectorAll('p')).map((p) => p.textContent?.trim())).toEqual([
      'The real opening paragraph.',
      'A second paragraph from the admin.',
    ]);
    expect(fixture.nativeElement.textContent).not.toContain('Parampara');
  });

  it('fetches each article once and reuses it when the reader flips back', async () => {
    const fixture = await render();
    const page = fixture.componentInstance;
    fixture.detectChanges();
    const requested = () => blog.getArticleById.mock.calls.map(([id]) => id);
    expect(requested()).toEqual(['cover']);
    const coverHtml = page.spreadHtml();
    expect(coverHtml).toContain('Second paragraph of cover.');

    page.activeSpreadIndex.set(1);
    fixture.detectChanges();
    expect(requested()).toEqual(['cover', 'vastu-1']);
    expect(page.spreadHtml()).toContain('Second paragraph of vastu-1.');

    page.activeSpreadIndex.set(0);
    fixture.detectChanges();
    expect(requested()).toEqual(['cover', 'vastu-1']);
    expect(page.spreadHtml()).toBe(coverHtml);
  });

  it('says the full article could not be loaded instead of falling back to filler text', async () => {
    blog.getArticleById.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500, url: 'https://api.test/api/v1/blog/cover' })),
    );
    const fixture = await render();
    fixture.detectChanges();

    expect(fixture.componentInstance.spreadContentError()).toContain('HTTP 500');
    expect(fixture.nativeElement.textContent).toContain('The full article could not be loaded');
    expect(fixture.nativeElement.textContent).not.toContain('Parampara');
    expect(fixture.nativeElement.querySelector('.article-columns')).toBeNull();
  });

  it('renders the body as formatted HTML: headings, emphasis, links, lists, quotes and images', async () => {
    const markdown = [
      '# Opening heading',
      '',
      '## A subheading',
      '',
      'Read **bold**, *italic* and a [link](https://example.com/page).',
      '',
      '- first point',
      '- second point',
      '',
      '> A quoted line',
      '',
      '![Chart](https://cdn.test/chart.png)',
    ].join('\n');
    blog.getArticleById.mockImplementation((id: string) => ok(detail(id, markdown)));
    const fixture = await render();
    fixture.detectChanges();
    const body: HTMLElement = fixture.nativeElement.querySelector('.article-columns');

    // The article title is the reader's h2, so body headings start one level below it.
    expect(body.querySelector('h2')?.textContent).toBe('Opening heading');
    expect(body.querySelector('h3')?.textContent).toBe('A subheading');
    expect(body.querySelector('strong')?.textContent).toBe('bold');
    expect(body.querySelector('em')?.textContent).toBe('italic');
    expect(body.querySelectorAll('li')).toHaveLength(2);
    expect(body.querySelector('blockquote')?.textContent).toContain('A quoted line');
    expect(body.querySelector('img')?.getAttribute('src')).toBe('https://cdn.test/chart.png');
    // Angular's sanitizer must leave the external-link attributes intact.
    const link = body.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://example.com/page');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(body.classList.contains('article-body--dropcap')).toBe(true);
  });

  it('never renders raw HTML or script links typed into an article body', async () => {
    const hostile =
      'Before <script>window.__pwned = 1</script> <img src=x onerror="window.__pwned = 2"> [click](javascript:window.__pwned=3) after';
    blog.getArticleById.mockImplementation((id: string) => ok(detail(id, hostile)));
    const fixture = await render();
    fixture.detectChanges();
    const body: HTMLElement = fixture.nativeElement.querySelector('.article-columns');

    expect(body.querySelector('script')).toBeNull();
    expect(body.querySelector('img')).toBeNull();
    expect(body.querySelector('a')).toBeNull();
    // It is shown as text instead, and nothing ran.
    expect(body.textContent).toContain('<script>');
    expect((globalThis as { __pwned?: number }).__pwned).toBeUndefined();
  });

  it('re-counts the pages when an image inside the article finishes loading', async () => {
    let scrollWidth = 600;
    vi.spyOn(Element.prototype, 'scrollWidth', 'get').mockImplementation(() => scrollWidth);
    vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(600);
    blog.getArticleById.mockImplementation((id: string) =>
      ok(detail(id, '![Chart](https://cdn.test/chart.png)\n\nSome text after the picture.')),
    );
    const fixture = await render();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const page = fixture.componentInstance;
    expect(page.textPageCount()).toBe(1);

    // The picture took up room, so the text now needs more columns.
    scrollWidth = 1500;
    fixture.nativeElement.querySelector('.article-columns img').dispatchEvent(new Event('load'));

    expect(page.textPageCount()).toBe(3);
  });

  it('pages through a long article before moving on to the next one', async () => {
    const fixture = await render();
    const page = fixture.componentInstance;
    fixture.detectChanges();
    page.textPageCount.set(3);

    vi.useFakeTimers();
    try {
      page.nextSpread();
      page.nextSpread();
      fixture.detectChanges();
      expect([page.textPage(), page.activeSpreadIndex()]).toEqual([2, 0]);
      expect(fixture.nativeElement.querySelector('.article-columns').style.getPropertyValue('--page')).toBe('2');
      expect(fixture.nativeElement.textContent).toContain('3 / 3');

      // Last page reached: the next turn opens the next article, starting from its first page.
      page.nextSpread();
      vi.advanceTimersByTime(500);
    } finally {
      vi.useRealTimers();
    }
    fixture.detectChanges();
    expect(page.activeSpreadIndex()).toBe(1);
    expect(page.textPage()).toBe(0);
  });

  it("goes back through the pages, then opens the previous article on its last page", async () => {
    // jsdom has no layout, so pretend the browser laid every article out over three pages.
    vi.spyOn(Element.prototype, 'scrollWidth', 'get').mockReturnValue(1500);
    vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(600);
    const fixture = await render();
    const page = fixture.componentInstance;
    page.activeSpreadIndex.set(1);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect([page.textPageCount(), page.textPage()]).toEqual([3, 0]);

    page.textPage.set(1);
    page.prevSpread();
    expect(page.textPage()).toBe(0);

    vi.useFakeTimers();
    try {
      page.prevSpread();
      vi.advanceTimersByTime(500);
    } finally {
      vi.useRealTimers();
    }
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(page.activeSpreadIndex()).toBe(0);
    expect(page.textPage()).toBe(2);
  });

  it('wraps around inside a lone article instead of flipping to itself', async () => {
    blog.getFeaturedArticle.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 404 })));
    blog.getArticles.mockReturnValue(paged([vastu]));
    const fixture = await render();
    const page = fixture.componentInstance;
    page.textPageCount.set(2);

    page.nextSpread();
    expect(page.textPage()).toBe(1);
    page.nextSpread();
    expect(page.textPage()).toBe(0);
    page.prevSpread();
    expect(page.textPage()).toBe(1);
  });
});
