import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { BlogService } from './blog.service';

describe('BlogService', () => {
  const base = `${environment.apiUrl}/blog`;
  let service: BlogService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BlogService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends only the query params that were provided', () => {
    service.getArticles({ pageSize: 100, category: 'Vastu' }).subscribe();

    const req = http.expectOne((r) => r.url === base);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('pageSize')).toBe('100');
    expect(req.request.params.get('category')).toBe('Vastu');
    expect(req.request.params.has('page')).toBe(false);
    expect(req.request.params.has('sortBy')).toBe(false);
    req.flush({ status: 'success', items: [], pagination: null });
  });

  it('calls the featured, trending, categories and authors routes the BlogController exposes', () => {
    service.getFeaturedArticle().subscribe();
    http.expectOne(`${base}/featured/main`).flush({ status: 'success', data: null });

    service.getTrendingArticles(3).subscribe();
    const trending = http.expectOne((r) => r.url === `${base}/trending`);
    expect(trending.request.params.get('count')).toBe('3');
    trending.flush({ status: 'success', data: [] });

    service.getCategories().subscribe();
    http.expectOne(`${base}/categories`).flush({ status: 'success', data: [] });

    service.getAuthors().subscribe();
    http.expectOne(`${base}/authors`).flush({ status: 'success', data: [] });
  });

  it('calls the fetch-by-id, create, update and delete routes with the expected verbs and bodies', () => {
    const dto = {
      title: 'A headline',
      deck: 'A deck long enough.',
      category: 'Vastu',
      image: 'https://cdn.test/a.jpg',
      content: 'x'.repeat(100),
      publishedDate: '2020-01-15T00:00:00Z',
      readTimeMinutes: 5,
      isFeatured: false,
      pullQuote: null,
      issueVolume: null,
    };

    service.getArticleById('abc').subscribe();
    http.expectOne({ method: 'GET', url: `${base}/abc` }).flush({ status: 'success', data: null });

    service.createArticle({ ...dto, slug: 'a-headline', authorId: 'author-1' }).subscribe();
    const post = http.expectOne({ method: 'POST', url: base });
    expect(post.request.body).toMatchObject({ slug: 'a-headline', authorId: 'author-1', isFeatured: false });
    post.flush({ status: 'success', data: null });

    service.updateArticle('abc', dto).subscribe();
    const put = http.expectOne({ method: 'PUT', url: `${base}/abc` });
    expect(put.request.body).toEqual(dto);
    put.flush({ status: 'success', data: null });

    service.deleteArticle('abc').subscribe();
    http.expectOne({ method: 'DELETE', url: `${base}/abc` }).flush({ status: 'success', data: true });
  });

  it('posts the email to the subscribe route', () => {
    service.subscribe('reader@example.com').subscribe();

    const req = http.expectOne(`${base}/subscribe`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'reader@example.com' });
    req.flush({ status: 'success', data: true });
  });
});
