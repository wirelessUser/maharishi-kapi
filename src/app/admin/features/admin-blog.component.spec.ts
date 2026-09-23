import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ArticleDetailDto, ArticleDto, AuthorDto } from '../../core/models/blog.models';
import { BlogService } from '../../core/services/blog.service';
import { AdminBlogComponent } from './admin-blog.component';
import { AdminContentService } from './admin-content.service';

const AUTHOR_ID = '3f2b8c1e-5d4a-4b7e-9c0f-1a2b3c4d5e6f';
const OTHER_AUTHOR_ID = '9a8b7c6d-1e2f-4a3b-8c4d-5e6f7a8b9c0d';
const AUTHORS: AuthorDto[] = [
  { id: AUTHOR_ID, name: 'Acharya Alok' },
  { id: OTHER_AUTHOR_ID, name: 'Riitu Dua' },
];
const DECK = 'A deck long enough to pass validation.';
const IMAGE = 'https://cdn.test/cover.jpg';
const CONTENT = 'Saturn returns to its natal position roughly every twenty-nine years. '.repeat(3);

const article = (slug: string, featured = false): ArticleDto => ({
  id: slug,
  slug,
  title: `Title of ${slug}`,
  deck: DECK,
  category: 'Vastu',
  image: IMAGE,
  author: 'Acharya Alok',
  authorPhoto: '',
  date: 'Sep 2, 2026',
  readTime: '6 min read',
  featured,
  pullQuote: null,
  issueVol: null,
});

const detail = (over: Partial<ArticleDetailDto> = {}): ArticleDetailDto => ({
  id: 'vastu-1',
  slug: 'vastu-1',
  title: 'Title of vastu-1',
  deck: DECK,
  category: 'Vastu',
  image: IMAGE,
  content: CONTENT,
  author: 'Acharya Alok',
  authorPhoto: '',
  publishedDate: '2026-09-02T00:00:00',
  readTimeMinutes: 6,
  featured: false,
  pullQuote: null,
  issueVolume: 'Vol. IX',
  viewCount: 3,
  ...over,
});

describe('AdminBlogComponent', () => {
  const cover = article('cover', true);
  const vastu = article('vastu-1');

  const blog = {
    getArticles: vi.fn(),
    getFeaturedArticle: vi.fn(),
    getAuthors: vi.fn(),
    getArticleById: vi.fn(),
    createArticle: vi.fn(),
    updateArticle: vi.fn(),
    deleteArticle: vi.fn(),
  };
  const media = { uploadImage: vi.fn() };

  const ok = <T>(data: T) => of({ status: 'success', data });

  beforeEach(() => {
    blog.getArticles.mockReturnValue(of({ status: 'success', items: [vastu], pagination: null }));
    blog.getFeaturedArticle.mockReturnValue(ok(cover));
    blog.getAuthors.mockReturnValue(ok(AUTHORS));
    TestBed.configureTestingModule({
      imports: [AdminBlogComponent],
      providers: [
        { provide: BlogService, useValue: blog },
        { provide: AdminContentService, useValue: media },
      ],
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  async function render() {
    const fixture = TestBed.createComponent(AdminBlogComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  function fillValidNewArticle(page: AdminBlogComponent) {
    page.openNewForm();
    page.form.controls.title.setValue('Saturn Returns: The 29th Year!');
    page.onTitleChange();
    page.form.patchValue({
      deck: DECK,
      content: CONTENT,
      image: IMAGE,
      authorId: AUTHOR_ID,
      publishedDate: '2020-01-15',
      readTimeMinutes: 8,
      category: 'Astrology',
      isFeatured: true,
    });
  }

  it('lists the featured article first, then the rest', async () => {
    const fixture = await render();

    expect(fixture.componentInstance.articles().map((a) => a.slug)).toEqual(['cover', 'vastu-1']);
    expect(fixture.nativeElement.textContent).toContain('Title of cover');
    expect(fixture.nativeElement.textContent).toContain('Featured');
  });

  it('still lists articles when no article is featured', async () => {
    blog.getFeaturedArticle.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
    const fixture = await render();

    expect(fixture.componentInstance.articles().map((a) => a.slug)).toEqual(['vastu-1']);
    expect(fixture.componentInstance.loadError()).toBeNull();
  });

  it('shows where the request went when the API cannot be reached', async () => {
    blog.getArticles.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 0, url: 'https://api.test/api/v1/blog' })),
    );
    const fixture = await render();

    expect(fixture.componentInstance.loadError()).toContain('https://api.test/api/v1/blog');
    expect(fixture.nativeElement.textContent).toContain('could not be loaded');
  });

  it('creates an article with a slug from the title, an ISO date and null optional fields', async () => {
    blog.createArticle.mockReturnValue(ok(detail()));
    const fixture = await render();
    const page = fixture.componentInstance;

    fillValidNewArticle(page);
    page.save();

    expect(blog.createArticle).toHaveBeenCalledWith({
      slug: 'saturn-returns-the-29th-year',
      title: 'Saturn Returns: The 29th Year!',
      deck: DECK,
      category: 'Astrology',
      image: IMAGE,
      content: CONTENT,
      authorId: AUTHOR_ID,
      publishedDate: '2020-01-15T00:00:00Z',
      readTimeMinutes: 8,
      isFeatured: true,
      pullQuote: null,
      issueVolume: null,
    });
    expect(blog.getArticles).toHaveBeenCalledTimes(2);
    expect(page.showForm()).toBe(false);
  });

  it('does not submit an invalid form and says what is missing', async () => {
    const fixture = await render();
    const page = fixture.componentInstance;

    page.openNewForm();
    page.save();

    expect(blog.createArticle).not.toHaveBeenCalled();
    expect(page.fieldError('title')).toBe('Required');
    expect(page.fieldError('authorId')).toBe('Required');
  });

  it('clicking Publish on an incomplete form lists the fields to fix instead of doing nothing', async () => {
    const fixture = await render();
    fixture.componentInstance.openNewForm();
    fixture.detectChanges();

    const publish: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    publish.click();
    fixture.detectChanges();

    expect(blog.createArticle).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toMatch(
      /Fix these fields before saving:\s*Title, Slug, Deck, Content, Cover Image, Author\./,
    );
  });

  it('offers the authors by name and creates the article with the chosen author id', async () => {
    blog.createArticle.mockReturnValue(ok(detail()));
    const fixture = await render();
    const page = fixture.componentInstance;

    page.openNewForm();
    fixture.detectChanges();

    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select[formControlName="authorId"]');
    expect(fixture.nativeElement.querySelector('input[formControlName="authorId"]')).toBeNull();
    expect(Array.from(select.options).map((o) => o.textContent?.trim())).toEqual([
      'Select an author…',
      'Acharya Alok',
      'Riitu Dua',
    ]);
    // Two authors, so nothing is chosen for the admin.
    expect(page.form.controls.authorId.value).toBe('');

    select.value = OTHER_AUTHOR_ID;
    select.dispatchEvent(new Event('change'));
    expect(page.form.controls.authorId.value).toBe(OTHER_AUTHOR_ID);

    fillValidNewArticle(page);
    page.form.controls.authorId.setValue(OTHER_AUTHOR_ID);
    page.save();
    expect(blog.createArticle).toHaveBeenCalledWith(expect.objectContaining({ authorId: OTHER_AUTHOR_ID }));
  });

  it('hides the author field and publishes under the author when there is only one', async () => {
    blog.getAuthors.mockReturnValue(ok([AUTHORS[0]]));
    blog.createArticle.mockReturnValue(ok(detail()));
    const fixture = await render();
    const page = fixture.componentInstance;

    page.openNewForm();
    fixture.detectChanges();

    expect(page.form.controls.authorId.value).toBe(AUTHOR_ID);
    expect(fixture.nativeElement.querySelector('select[formControlName="authorId"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('input[formControlName="authorId"]')).toBeNull();

    // The admin never touches the author: the sole author is sent along with the rest of the form.
    page.form.controls.title.setValue('Saturn Returns: The 29th Year!');
    page.onTitleChange();
    page.form.patchValue({ deck: DECK, content: CONTENT, image: IMAGE });
    page.save();
    expect(blog.createArticle).toHaveBeenCalledWith(expect.objectContaining({ authorId: AUTHOR_ID }));
  });

  it('says so when there are no authors or they cannot be loaded', async () => {
    blog.getAuthors.mockReturnValue(ok([]));
    const fixture = await render();
    const page = fixture.componentInstance;

    page.openNewForm();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('No authors exist yet');

    blog.getAuthors.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500, error: { title: 'boom' } })));
    page.openNewForm();
    fixture.detectChanges();
    expect(page.authorsError()).toBe('Could not load authors: boom');
    expect(fixture.nativeElement.textContent).toContain('Could not load authors: boom');
  });

  it('clicking Publish on a complete form sends the create request', async () => {
    blog.createArticle.mockReturnValue(ok(detail()));
    const fixture = await render();
    fillValidNewArticle(fixture.componentInstance);
    fixture.detectChanges();

    const publish: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    publish.click();

    expect(blog.createArticle).toHaveBeenCalledTimes(1);
  });

  it('updates an existing article without sending slug or author', async () => {
    blog.getArticleById.mockReturnValue(ok(detail({ pullQuote: 'A pull quote worth keeping.' })));
    blog.updateArticle.mockReturnValue(ok(detail()));
    const fixture = await render();
    const page = fixture.componentInstance;

    page.editArticle(vastu);
    expect(blog.getArticleById).toHaveBeenCalledWith('vastu-1');
    expect(page.isEditing()).toBe(true);
    expect(page.form.controls.slug.disabled).toBe(true);
    expect(page.form.controls.authorId.disabled).toBe(true);
    expect(page.form.controls.publishedDate.value).toBe('2026-09-02');

    page.form.controls.title.setValue('An updated headline');
    page.save();

    const [id, dto] = blog.updateArticle.mock.calls[0];
    expect(id).toBe('vastu-1');
    expect(dto).not.toHaveProperty('slug');
    expect(dto).not.toHaveProperty('authorId');
    expect(dto).toMatchObject({
      title: 'An updated headline',
      pullQuote: 'A pull quote worth keeping.',
      issueVolume: 'Vol. IX',
      publishedDate: '2026-09-02T00:00:00Z',
    });
  });

  it('keeps the form open and shows the API validation message when saving fails', async () => {
    blog.createArticle.mockReturnValue(
      throwError(
        () =>
          new HttpErrorResponse({
            status: 400,
            error: { errors: { PullQuote: ['The PullQuote field is required.'] } },
          }),
      ),
    );
    const fixture = await render();
    const page = fixture.componentInstance;

    fillValidNewArticle(page);
    page.save();

    expect(page.formError()).toContain('The PullQuote field is required.');
    expect(page.showForm()).toBe(true);
    expect(page.saving()).toBe(false);
  });

  it('deletes only after confirmation and then reloads the list', async () => {
    blog.deleteArticle.mockReturnValue(ok(true));
    const confirmSpy = vi.spyOn(globalThis, 'confirm');
    const fixture = await render();
    const page = fixture.componentInstance;

    confirmSpy.mockReturnValue(false);
    page.deleteArticle(vastu);
    expect(blog.deleteArticle).not.toHaveBeenCalled();

    confirmSpy.mockReturnValue(true);
    page.deleteArticle(vastu);
    expect(blog.deleteArticle).toHaveBeenCalledWith('vastu-1');
    expect(blog.getArticles).toHaveBeenCalledTimes(2);
  });

  describe('content editor', () => {
    async function openEditor() {
      const fixture = await render();
      const page = fixture.componentInstance;
      page.openNewForm();
      fixture.detectChanges();

      const box = (): HTMLTextAreaElement => fixture.nativeElement.querySelector('textarea[formControlName="content"]');
      const address = (): HTMLInputElement | null => fixture.nativeElement.querySelector('input[aria-label="Address"]');
      const press = (label: string) => {
        const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
        const button = buttons.find((b) => b.textContent?.trim() === label);
        expect(button, `a "${label}" button`).toBeDefined();
        button!.click();
        fixture.detectChanges();
      };
      // Types text into the textarea the way a user would, then places the selection.
      const write = (value: string, start = value.length, end = start) => {
        const el = box();
        el.value = value;
        el.dispatchEvent(new Event('input'));
        el.setSelectionRange(start, end);
      };
      const selected = () => box().value.slice(box().selectionStart, box().selectionEnd);
      const content = () => page.form.controls.content.value;
      return { fixture, page, box, address, press, write, selected, content };
    }

    it('offers the formatting buttons and a Write / Preview switch', async () => {
      const { fixture } = await openEditor();

      const labels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('[role="toolbar"] button')).map((b) =>
        b.textContent?.trim(),
      );
      expect(labels).toEqual(['Heading', 'Subheading', 'Bold', 'Italic', 'Link', 'Bullets', 'Numbers', 'Quote', 'Image', 'Divider']);
      expect(fixture.nativeElement.textContent).toContain('Write');
      expect(fixture.nativeElement.textContent).toContain('Preview');
    });

    it('turns the current line into a heading or subheading and updates the form', async () => {
      const { box, press, write, content } = await openEditor();

      write('Intro\nThe title\nOutro', 8);
      press('Heading');
      expect(content()).toBe('Intro\n## The title\nOutro');
      expect(box().value).toBe('Intro\n## The title\nOutro');

      press('Subheading');
      expect(content()).toBe('Intro\n### The title\nOutro');
    });

    it('bolds and italicises the selected words and keeps them selected', async () => {
      const { press, write, content, selected } = await openEditor();

      write('a wise word', 2, 6);
      press('Bold');
      expect(content()).toBe('a **wise** word');
      expect(selected()).toBe('wise');

      write('a wise word', 2, 6);
      press('Italic');
      expect(content()).toBe('a *wise* word');
    });

    it('makes lists and quotes from the selected lines and adds a divider', async () => {
      const { press, write, content } = await openEditor();

      write('one\ntwo', 0, 7);
      press('Bullets');
      expect(content()).toBe('- one\n- two');

      write('one\ntwo', 0, 7);
      press('Numbers');
      expect(content()).toBe('1. one\n2. two');

      write('wise words', 0, 10);
      press('Quote');
      expect(content()).toBe('> wise words');

      write('above below', 5);
      press('Divider');
      expect(content()).toBe('above\n\n---\n\nbelow');
    });

    it('supports Ctrl+B, Ctrl+I and Ctrl+K', async () => {
      const { fixture, box, address, write, content } = await openEditor();

      write('a wise word', 2, 6);
      const bold = new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, cancelable: true });
      box().dispatchEvent(bold);
      expect(bold.defaultPrevented).toBe(true);
      expect(content()).toBe('a **wise** word');

      write('a wise word', 2, 6);
      box().dispatchEvent(new KeyboardEvent('keydown', { key: 'i', ctrlKey: true, cancelable: true }));
      expect(content()).toBe('a *wise* word');

      box().dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, cancelable: true }));
      fixture.detectChanges();
      expect(address()).not.toBeNull();

      // A plain letter is left alone.
      const plain = new KeyboardEvent('keydown', { key: 'b', cancelable: true });
      box().dispatchEvent(plain);
      expect(plain.defaultPrevented).toBe(false);
    });

    it('asks for an address and links the selected text', async () => {
      const { page, address, press, write, content } = await openEditor();

      write('see courses now', 4, 11);
      press('Link');
      expect(address()).not.toBeNull();

      page.insertUrl.setValue('example.com/courses');
      press('Add link');
      expect(content()).toBe('see [courses](https://example.com/courses) now');
      expect(address()).toBeNull();
    });

    it('refuses an address that could run script and says why', async () => {
      const { fixture, page, address, press, write, content } = await openEditor();

      write('click here', 0, 10);
      press('Link');
      page.insertUrl.setValue('javascript:alert(1)');
      press('Add link');

      expect(content()).toBe('click here');
      expect(address()).not.toBeNull();
      expect(fixture.nativeElement.textContent).toContain('Enter a web address such as https://example.com');
    });

    it('adds the link when Enter is pressed in the address box, without saving the article', async () => {
      const { page, address, press, write, content } = await openEditor();

      write('see courses now', 4, 11);
      press('Link');
      const box = address()!;
      box.value = 'https://x.test';
      box.dispatchEvent(new Event('input'));
      const enter = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
      box.dispatchEvent(enter);

      expect(enter.defaultPrevented).toBe(true);
      expect(content()).toBe('see [courses](https://x.test) now');
      expect(page.saving()).toBe(false);
      expect(blog.createArticle).not.toHaveBeenCalled();
    });

    it('inserts an image on its own paragraph with a description', async () => {
      const { page, press, write, content } = await openEditor();

      write('Intro', 5);
      press('Image');
      page.insertUrl.setValue('https://cdn.test/temple.jpg');
      page.insertAlt.setValue('A temple');
      press('Add image');

      expect(content()).toBe('Intro\n\n![A temple](https://cdn.test/temple.jpg)\n\n');
    });

    it('uploads an image chosen in the image row and inserts it', async () => {
      media.uploadImage.mockReturnValue(of({ url: 'https://cdn.test/uploads/dawn-temple.png' }));
      const { page, press, write, content } = await openEditor();

      write('Intro', 5);
      press('Image');
      const file = new File(['x'], 'dawn-temple.png', { type: 'image/png' });
      page.onBodyImageSelected({ target: { files: [file], value: 'C:\\fakepath\\dawn-temple.png' } } as unknown as Event);

      expect(media.uploadImage).toHaveBeenCalledWith(file, 'blog');
      expect(content()).toBe('Intro\n\n![dawn temple](https://cdn.test/uploads/dawn-temple.png)\n\n');
      expect(page.uploading()).toBe(false);
    });

    it('reports a failed image upload in the image row and leaves the text alone', async () => {
      media.uploadImage.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 500, error: { title: 'storage is down' } })),
      );
      const { fixture, page, press, write, content } = await openEditor();

      write('Intro', 5);
      press('Image');
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      page.onBodyImageSelected({ target: { files: [file], value: '' } } as unknown as Event);
      fixture.detectChanges();

      expect(content()).toBe('Intro');
      expect(fixture.nativeElement.textContent).toContain('Image upload failed: storage is down');
      expect(page.uploading()).toBe(false);
    });

    it('previews the formatted article and returns to the same text', async () => {
      const { fixture, box, press, write } = await openEditor();
      const source = '## Hello\n\nRead [this](https://example.com) **now**.\n\n- one\n- two';

      write(source);
      press('Preview');

      const body: HTMLElement = fixture.nativeElement.querySelector('.article-body');
      expect(body.innerHTML).toContain('<h3>Hello</h3>');
      expect(body.querySelector('a')?.getAttribute('href')).toBe('https://example.com');
      expect(body.querySelector('a')?.getAttribute('target')).toBe('_blank');
      expect(body.querySelector('a')?.getAttribute('rel')).toBe('noopener noreferrer');
      expect(body.querySelector('strong')?.textContent).toBe('now');
      expect(body.querySelectorAll('li')).toHaveLength(2);
      expect(fixture.nativeElement.querySelector('textarea[formControlName="content"]')).toBeNull();

      press('Write');
      expect(box().value).toBe(source);
    });

    it('shows typed HTML as text in the preview instead of running it', async () => {
      const { fixture, press, write } = await openEditor();

      write('<script>alert(1)</script> and <img src=x onerror=alert(1)>');
      press('Preview');

      const body: HTMLElement = fixture.nativeElement.querySelector('.article-body');
      expect(body.querySelector('script')).toBeNull();
      expect(body.querySelector('img')).toBeNull();
      expect(body.textContent).toContain('<script>alert(1)</script>');
    });

    it('says there is nothing to preview yet when the content is empty', async () => {
      const { fixture, press } = await openEditor();

      press('Preview');
      expect(fixture.nativeElement.querySelector('.article-body')).toBeNull();
      expect(fixture.nativeElement.textContent).toContain('Nothing to preview yet');
    });

    it('saves the Markdown exactly as written', async () => {
      blog.createArticle.mockReturnValue(ok(detail()));
      const fixture = await render();
      const page = fixture.componentInstance;
      const markdown = '## Heading\n\nSome **bold** text and a [link](https://example.com) inside a paragraph.\n\n- one\n- two\n\n'.repeat(2);

      fillValidNewArticle(page);
      page.form.controls.content.setValue(markdown);
      page.save();

      expect(blog.createArticle).toHaveBeenCalledWith(expect.objectContaining({ content: markdown }));
    });

    it('starts in Write mode with no address row every time the form opens', async () => {
      const { fixture, page, press, write, address } = await openEditor();

      write('text', 0, 4);
      press('Link');
      press('Preview');
      expect(page.previewing()).toBe(true);
      page.closeForm();
      page.openNewForm();
      fixture.detectChanges();

      expect(page.previewing()).toBe(false);
      expect(page.insertPanel()).toBeNull();
      expect(address()).toBeNull();
    });
  });
});
