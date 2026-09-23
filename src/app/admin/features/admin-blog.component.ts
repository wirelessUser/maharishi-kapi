import { Component, DestroyRef, ElementRef, Injector, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { catchError, forkJoin, of } from 'rxjs';
import { ArticleDto, AuthorDto } from '../../core/models/blog.models';
import { BlogService } from '../../core/services/blog.service';
import { renderArticleMarkdown } from '../../core/utils/article-markdown';
import { apiErrorMessage, describeHttpError } from '../../core/utils/http-error';
import {
  IMAGE_SCHEMES,
  TextEdit,
  formatLines,
  insertDivider,
  insertImage,
  insertLink,
  normalizeUrl,
  wrapInline,
} from '../../core/utils/markdown-format';
import { AdminContentService } from './admin-content.service';

// Mirrors CreateArticleValidator / UpdateArticleValidator in the API.
export const BLOG_CATEGORIES = ['Astrology', 'Vastu', 'Ayurveda', 'Numerology', 'Culture'];

const PAGE_SIZE = 100;

const FIELD_LABELS: Record<string, string> = {
  title: 'Title',
  slug: 'Slug',
  category: 'Category',
  deck: 'Deck',
  content: 'Content',
  image: 'Cover Image',
  authorId: 'Author',
  publishedDate: 'Published On',
  readTimeMinutes: 'Read Time',
  pullQuote: 'Pull Quote',
  issueVolume: 'Issue / Volume',
};

const PATTERN_HINTS: Record<string, string> = {
  slug: 'Lowercase letters, numbers and hyphens only',
  image: 'Must be a full http(s) URL',
};

// The article body is stored as Markdown. These buttons write the Markdown for the author.
type FormatAction = 'h2' | 'h3' | 'bold' | 'italic' | 'link' | 'ul' | 'ol' | 'quote' | 'image' | 'hr';

const TOOLBAR: { action: FormatAction; label: string; title: string }[] = [
  { action: 'h2', label: 'Heading', title: 'Heading for a new section' },
  { action: 'h3', label: 'Subheading', title: 'Subheading inside a section' },
  { action: 'bold', label: 'Bold', title: 'Bold (Ctrl+B)' },
  { action: 'italic', label: 'Italic', title: 'Italic (Ctrl+I)' },
  { action: 'link', label: 'Link', title: 'Link the selected text (Ctrl+K)' },
  { action: 'ul', label: 'Bullets', title: 'Bulleted list' },
  { action: 'ol', label: 'Numbers', title: 'Numbered list' },
  { action: 'quote', label: 'Quote', title: 'Quote' },
  { action: 'image', label: 'Image', title: 'Insert an image' },
  { action: 'hr', label: 'Divider', title: 'Divider line' },
];

const SHORTCUTS: Record<string, FormatAction> = { b: 'bold', i: 'italic', k: 'link' };

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-admin-blog',
  template: `
    <div class="flex justify-between items-end mb-6">
      <div>
        <h1 class="text-3xl font-serif font-bold text-gray-900">Manage Journal Articles</h1>
        <p class="text-sm text-gray-500 mt-1">Write, edit and feature the articles shown on the public Journal page</p>
      </div>
      <button type="button" (click)="openNewForm()" class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-md font-bold text-sm shadow-sm cursor-pointer transition-all">
        Add New Article
      </button>
    </div>

    @if (actionError(); as message) {
      <div role="alert" class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{{ message }}</div>
    }

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Article list -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden self-start">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category & Date</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @if (loadError(); as error) {
              <tr>
                <td colspan="3" class="px-6 py-8 text-center text-sm text-red-700">
                  <p class="font-bold">The articles could not be loaded.</p>
                  <p class="mt-1 text-xs font-mono break-words">{{ error }}</p>
                  <button type="button" (click)="load()" class="mt-3 text-indigo-600 font-bold cursor-pointer hover:underline">Try again</button>
                </td>
              </tr>
            } @else if (loading()) {
              <tr><td colspan="3" class="px-6 py-8 text-center text-sm text-gray-500 animate-pulse">Loading articles…</td></tr>
            } @else {
              @for (a of articles(); track a.id) {
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      @if (a.image) {
                        <img [src]="a.image" alt="" class="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                      }
                      <div>
                        <div class="text-sm font-bold text-gray-900">
                          {{ a.title }}
                          @if (a.featured) {
                            <span class="ml-2 align-middle text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Featured</span>
                          }
                        </div>
                        <div class="text-xs text-amber-600 font-mono">{{ a.slug }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-xs font-semibold text-gray-800">{{ a.category }}</div>
                    <div class="text-[11px] text-gray-500">{{ a.date }} · {{ a.readTime }}</div>
                  </td>
                  <td class="px-6 py-4 text-right text-sm whitespace-nowrap">
                    <button type="button" (click)="editArticle(a)" class="text-indigo-600 font-bold mr-4 cursor-pointer hover:underline">Edit</button>
                    <button type="button" (click)="deleteArticle(a)" class="text-red-600 font-bold cursor-pointer hover:underline">Delete</button>
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="3" class="px-6 py-8 text-center text-sm text-gray-500">No articles yet. Use “Add New Article” to publish the first one.</td></tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Form panel -->
      @if (showForm()) {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-h-[85vh] overflow-y-auto">
          <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
            {{ isEditing() ? 'Edit Article' : 'New Article' }}
          </h3>

          <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Title *</label>
              <input formControlName="title" (input)="onTitleChange()" class="w-full border p-2 rounded text-sm" placeholder="e.g. Saturn Returns: What Your 29th Year Is Teaching You" />
              @if (fieldError('title'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
                <input formControlName="slug" class="w-full border p-2 rounded text-sm bg-gray-50" placeholder="saturn-returns" />
                @if (fieldError('slug'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                <select formControlName="category" class="w-full border p-2 rounded text-sm bg-white">
                  @for (c of categories; track c) {
                    <option [value]="c">{{ c }}</option>
                  }
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Deck (short summary) *</label>
              <textarea formControlName="deck" rows="3" class="w-full border p-2 rounded text-sm" placeholder="One or two sentences shown under the headline"></textarea>
              @if (fieldError('deck'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="article-content" class="block text-xs font-bold text-gray-700">Content *</label>
                <div class="inline-flex rounded border border-gray-300 overflow-hidden text-[11px] font-bold" role="group" aria-label="Editor mode">
                  <button type="button" (click)="showWrite()" [attr.aria-pressed]="!previewing()" class="px-3 py-1 cursor-pointer" [class.bg-amber-600]="!previewing()" [class.text-white]="!previewing()" [class.bg-white]="previewing()" [class.text-gray-600]="previewing()">Write</button>
                  <button type="button" (click)="showPreview()" [attr.aria-pressed]="previewing()" class="px-3 py-1 cursor-pointer border-l border-gray-300" [class.bg-amber-600]="previewing()" [class.text-white]="previewing()" [class.bg-white]="!previewing()" [class.text-gray-600]="!previewing()">Preview</button>
                </div>
              </div>

              @if (!previewing()) {
                <div class="flex flex-wrap gap-1 mb-1.5" role="toolbar" aria-label="Formatting">
                  @for (button of toolbar; track button.action) {
                    <button
                      type="button"
                      (mousedown)="$event.preventDefault()"
                      (click)="format(button.action)"
                      [title]="button.title"
                      class="px-2 py-1 rounded border border-gray-300 bg-white hover:bg-amber-50 text-[11px] font-semibold text-gray-700 cursor-pointer"
                      [class.font-black]="button.action === 'bold'"
                      [class.italic]="button.action === 'italic'"
                    >{{ button.label }}</button>
                  }
                </div>

                @if (insertPanel(); as panel) {
                  <div class="mb-1.5 p-2 rounded border border-amber-200 bg-amber-50/60 space-y-2" role="group" [attr.aria-label]="panel.kind === 'link' ? 'Add a link' : 'Add an image'">
                    <div class="flex gap-2 items-center">
                      <input
                        #insertUrlBox
                        [formControl]="insertUrl"
                        (keydown.enter)="$event.preventDefault(); confirmInsert()"
                        (keydown.escape)="closeInsertPanel()"
                        aria-label="Address"
                        class="flex-1 border p-1.5 rounded text-xs bg-white"
                        [placeholder]="panel.kind === 'link' ? 'https://example.com (or an email address)' : 'Image address, https://…'"
                      />
                      <button type="button" (click)="confirmInsert()" class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded text-xs font-bold cursor-pointer shrink-0">{{ panel.kind === 'link' ? 'Add link' : 'Add image' }}</button>
                      <button type="button" (click)="closeInsertPanel()" class="px-2 py-1.5 rounded text-xs text-gray-600 hover:bg-gray-100 cursor-pointer shrink-0">Cancel</button>
                    </div>
                    @if (panel.kind === 'image') {
                      <div class="flex gap-2 items-center">
                        <input
                          [formControl]="insertAlt"
                          (keydown.enter)="$event.preventDefault(); confirmInsert()"
                          (keydown.escape)="closeInsertPanel()"
                          aria-label="Image description"
                          class="flex-1 border p-1.5 rounded text-xs bg-white"
                          placeholder="Describe the image (helps screen readers and search)"
                        />
                        <label class="bg-white border border-amber-600 text-amber-700 hover:bg-amber-50 px-3 py-1.5 rounded text-xs font-bold cursor-pointer shrink-0">
                          <span>Upload instead</span>
                          <input type="file" accept="image/*" class="hidden" (change)="onBodyImageSelected($event)" />
                        </label>
                      </div>
                    }
                    @if (insertError(); as message) { <p class="text-[11px] text-red-600">{{ message }}</p> }
                  </div>
                }

                <textarea
                  #contentBox
                  id="article-content"
                  formControlName="content"
                  rows="14"
                  (keydown)="onContentKeydown($event)"
                  class="w-full border p-2 rounded text-sm leading-relaxed"
                  placeholder="Write the full article here (at least 100 characters)"
                ></textarea>
                <p class="text-[11px] text-gray-500 mt-1">Leave a blank line between paragraphs. Use the buttons for headings, links, lists and images, or type Markdown yourself (## Heading, **bold**, [text](https://link)). Check the result under Preview.</p>
              } @else {
                @if (contentPreviewHtml(); as html) {
                  <div class="article-body min-h-40 border rounded p-3 bg-[#fffdfa] text-[#59493e] text-[13px] leading-relaxed" [innerHTML]="html"></div>
                } @else {
                  <p class="min-h-40 border border-dashed rounded p-3 text-xs italic text-gray-400">Nothing to preview yet. Write something under Write.</p>
                }
              }
              @if (fieldError('content'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
            </div>

            <div class="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60">
              <label class="block text-xs font-bold text-gray-800 mb-1">Cover Image *</label>
              <div class="flex gap-2 items-center">
                <input formControlName="image" class="flex-1 border p-2 rounded text-xs bg-white text-gray-600" placeholder="Paste an image URL, or upload one" />
                <label class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-xs font-bold cursor-pointer transition-all shrink-0">
                  <span>Upload</span>
                  <input type="file" accept="image/*" class="hidden" (change)="onImageSelected($event)" />
                </label>
              </div>
              @if (uploading()) {
                <p class="text-[11px] text-amber-700 mt-1 font-mono animate-pulse">Uploading image…</p>
              }
              @if (fieldError('image'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
              @if (form.controls.image.value && form.controls.image.valid) {
                <img [src]="form.controls.image.value" alt="Cover preview" class="mt-2 h-28 w-full rounded object-cover border border-gray-200" />
              }
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Published On *</label>
                <input type="date" formControlName="publishedDate" [max]="today" class="w-full border p-2 rounded text-sm" />
                @if (fieldError('publishedDate'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Read Time (min) *</label>
                <input type="number" formControlName="readTimeMinutes" min="1" max="120" class="w-full border p-2 rounded text-sm" />
                @if (fieldError('readTimeMinutes'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
              </div>
            </div>

            @if (!isEditing() && showAuthorField()) {
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Author *</label>
                <select formControlName="authorId" class="w-full border p-2 rounded text-sm bg-white">
                  <option value="" disabled>Select an author…</option>
                  @for (author of authors(); track author.id) {
                    <option [value]="author.id">{{ author.name }}</option>
                  }
                </select>
                @if (authorsError(); as message) {
                  <p class="text-[11px] text-red-600 mt-1">{{ message }}</p>
                } @else if (authorsLoaded() && !authors().length) {
                  <p class="text-[11px] text-amber-700 mt-1">No authors exist yet. Add one to the BlogAuthors table, then reopen this form.</p>
                } @else {
                  <p class="text-[11px] text-gray-500 mt-1">The author cannot be changed after publishing.</p>
                }
                @if (fieldError('authorId'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
              </div>
            }

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Pull Quote</label>
              <textarea formControlName="pullQuote" rows="2" class="w-full border p-2 rounded text-sm" placeholder="Optional highlighted quote (10–300 characters)"></textarea>
              @if (fieldError('pullQuote'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Issue / Volume</label>
              <input formControlName="issueVolume" class="w-full border p-2 rounded text-sm" placeholder="e.g. Vol. IX · Dispatch 12" />
              @if (fieldError('issueVolume'); as e) { <p class="text-[11px] text-red-600 mt-1">{{ e }}</p> }
            </div>

            <label class="flex items-start gap-2 text-sm text-gray-800">
              <input type="checkbox" formControlName="isFeatured" class="mt-1" />
              <span>
                <span class="font-bold">Feature as the cover story</span>
                <span class="block text-[11px] text-gray-500">Shown first on the Journal page. Keep only one article featured.</span>
              </span>
            </label>

            @if (submitAttempted() && invalidFieldLabels().length) {
              <div role="alert" class="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                Fix these fields before saving: <span class="font-bold">{{ invalidFieldLabels().join(', ') }}</span>.
              </div>
            }

            @if (formError(); as message) {
              <div role="alert" class="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{{ message }}</div>
            }

            <div class="flex gap-3 pt-4 border-t">
              <button type="button" (click)="closeForm()" class="flex-1 bg-gray-100 hover:bg-gray-200 py-2.5 rounded text-sm font-bold text-gray-700 cursor-pointer">
                Cancel
              </button>
              <button type="submit" [disabled]="saving() || uploading()" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded text-sm font-bold shadow-sm disabled:opacity-50 cursor-pointer">
                {{ saving() ? 'Saving…' : isEditing() ? 'Update Article' : 'Publish Article' }}
              </button>
            </div>

          </form>
        </div>
      }
    </div>
  `
})
export class AdminBlogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly blog = inject(BlogService);
  private readonly media = inject(AdminContentService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly categories = BLOG_CATEGORIES;
  // UTC date, because the API rejects publish dates later than "now" in UTC.
  readonly today = new Date().toISOString().slice(0, 10);

  readonly articles = signal<ArticleDto[]>([]);
  readonly authors = signal<AuthorDto[]>([]);
  readonly authorsLoaded = signal(false);
  readonly authorsError = signal<string | null>(null);
  // A single author leaves nothing to choose (preselectSoleAuthor fills it in), so the field only appears when
  // there is a choice to make, or when the list is empty or failed to load and the admin needs to see why.
  readonly showAuthorField = computed(
    () => this.authors().length > 1 || !!this.authorsError() || (this.authorsLoaded() && this.authors().length === 0),
  );
  readonly loading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly actionError = signal<string | null>(null);

  readonly showForm = signal(false);
  readonly editingId = signal<string | null>(null);
  readonly isEditing = computed(() => this.editingId() !== null);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly formError = signal<string | null>(null);

  private readonly notInFuture = (control: AbstractControl): ValidationErrors | null =>
    control.value && control.value > this.today ? { future: true } : null;

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/^[a-z0-9-]+$/)]],
    category: ['Astrology', Validators.required],
    deck: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    content: ['', [Validators.required, Validators.minLength(100)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/\S+$/i)]],
    authorId: ['', Validators.required],
    publishedDate: [this.today, [Validators.required, this.notInFuture]],
    readTimeMinutes: [5, [Validators.required, Validators.min(1), Validators.max(120)]],
    isFeatured: [false],
    pullQuote: ['', [Validators.minLength(10), Validators.maxLength(300)]],
    issueVolume: ['', [Validators.minLength(3), Validators.maxLength(50)]],
  });

  // Shown after the first save attempt and kept live, so the list shrinks as fields are fixed.
  readonly submitAttempted = signal(false);
  private readonly formStatus = toSignal(this.form.statusChanges, { initialValue: this.form.status });
  readonly invalidFieldLabels = computed(() => {
    this.formStatus();
    return Object.keys(this.form.controls)
      .filter((name) => this.form.get(name)?.invalid)
      .map((name) => FIELD_LABELS[name]);
  });

  // Content editor. The body is Markdown: the toolbar edits the textarea, and the preview renders the text the
  // same way the public reader does (core/utils/article-markdown.ts).
  readonly toolbar = TOOLBAR;
  private readonly injector = inject(Injector);
  private readonly contentBox = viewChild<ElementRef<HTMLTextAreaElement>>('contentBox');
  private readonly insertUrlBox = viewChild<ElementRef<HTMLInputElement>>('insertUrlBox');
  readonly previewing = signal(false);
  private readonly contentValue = toSignal(this.form.controls.content.valueChanges, {
    initialValue: this.form.controls.content.value,
  });
  readonly contentPreviewHtml = computed(() => renderArticleMarkdown(this.contentValue()));
  // Link and image both ask for an address first. The selection is remembered because focus leaves the textarea.
  readonly insertPanel = signal<{ kind: 'link' | 'image'; start: number; end: number } | null>(null);
  readonly insertUrl = new FormControl('', { nonNullable: true });
  readonly insertAlt = new FormControl('', { nonNullable: true });
  readonly insertError = signal<string | null>(null);

  constructor() {
    // Browser-only, so prerendering the admin routes never calls the API.
    afterNextRender(() => this.load());
  }

  load(): void {
    this.loading.set(true);
    this.loadError.set(null);
    forkJoin({
      list: this.blog.getArticles({ pageSize: PAGE_SIZE }),
      // The list leaves the featured article out, and the API errors when none is flagged.
      featured: this.blog.getFeaturedArticle().pipe(catchError(() => of(null))),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ list, featured }) => {
          this.articles.set(featured ? [featured.data, ...list.items] : list.items);
          this.loading.set(false);
        },
        error: (err) => {
          this.loadError.set(describeHttpError(err));
          this.loading.set(false);
        },
      });
  }

  openNewForm(): void {
    this.form.reset({ category: 'Astrology', publishedDate: this.today, readTimeMinutes: 5, isFeatured: false });
    this.form.controls.slug.enable();
    this.form.controls.authorId.enable();
    this.editingId.set(null);
    this.formError.set(null);
    this.submitAttempted.set(false);
    this.showForm.set(true);
    this.resetEditor();
    this.preselectSoleAuthor();
    this.loadAuthors();
  }

  // Re-fetched whenever the form opens, so an author added to the database shows up without a page reload.
  private loadAuthors(): void {
    this.authorsError.set(null);
    this.blog
      .getAuthors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          this.authors.set(data);
          this.authorsLoaded.set(true);
          this.preselectSoleAuthor();
        },
        error: (err) => {
          this.authorsLoaded.set(true);
          this.authorsError.set(`Could not load authors: ${apiErrorMessage(err)}`);
        },
      });
  }

  // With a single author there is nothing to choose, so a new article starts with that author selected.
  private preselectSoleAuthor(): void {
    const [only, ...others] = this.authors();
    if (only && !others.length && !this.isEditing() && !this.form.controls.authorId.value) {
      this.form.controls.authorId.setValue(only.id);
    }
  }

  editArticle(article: ArticleDto): void {
    this.actionError.set(null);
    this.blog
      .getArticleById(article.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          this.form.reset({
            title: data.title,
            slug: data.slug,
            category: data.category,
            deck: data.deck,
            content: data.content,
            image: data.image,
            publishedDate: data.publishedDate.slice(0, 10),
            readTimeMinutes: data.readTimeMinutes,
            isFeatured: data.featured,
            pullQuote: data.pullQuote ?? '',
            issueVolume: data.issueVolume ?? '',
          });
          this.form.controls.slug.disable();
          this.form.controls.authorId.disable();
          this.editingId.set(data.id);
          this.formError.set(null);
          this.submitAttempted.set(false);
          this.showForm.set(true);
          this.resetEditor();
        },
        error: (err) => this.actionError.set(`Could not open the article: ${apiErrorMessage(err)}`),
      });
  }

  closeForm(): void {
    this.showForm.set(false);
    this.resetEditor();
    this.editingId.set(null);
    this.formError.set(null);
    this.submitAttempted.set(false);
  }

  onTitleChange(): void {
    if (this.isEditing()) {
      return;
    }
    const slug = this.form.controls.title.value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 100);
    this.form.controls.slug.setValue(slug);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.uploading.set(true);
    this.media
      .uploadImage(file, 'blog')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ url }) => {
          this.form.controls.image.setValue(url);
          this.form.controls.image.markAsTouched();
          this.uploading.set(false);
        },
        error: (err) => {
          this.uploading.set(false);
          this.formError.set(`Image upload failed: ${apiErrorMessage(err)}`);
        },
      });
    input.value = '';
  }

  showWrite(): void {
    this.previewing.set(false);
  }

  showPreview(): void {
    this.insertPanel.set(null);
    this.previewing.set(true);
  }

  format(action: FormatAction): void {
    const box = this.contentBox()?.nativeElement;
    if (!box) {
      return;
    }
    const { value, selectionStart: start, selectionEnd: end } = box;
    switch (action) {
      case 'bold':
        this.commitEdit(box, wrapInline(value, start, end, '**', 'bold text'));
        break;
      case 'italic':
        this.commitEdit(box, wrapInline(value, start, end, '*', 'italic text'));
        break;
      case 'h2':
      case 'h3':
      case 'ul':
      case 'ol':
      case 'quote':
        this.commitEdit(box, formatLines(value, start, end, action));
        break;
      case 'hr':
        this.commitEdit(box, insertDivider(value, end));
        break;
      case 'link':
      case 'image':
        this.openInsertPanel(action, start, end);
        break;
    }
  }

  onContentKeydown(event: KeyboardEvent): void {
    if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey) {
      return;
    }
    const action = SHORTCUTS[event.key.toLowerCase()];
    if (action) {
      event.preventDefault();
      this.format(action);
    }
  }

  closeInsertPanel(): void {
    this.insertPanel.set(null);
    this.insertError.set(null);
    this.contentBox()?.nativeElement.focus();
  }

  confirmInsert(): void {
    const panel = this.insertPanel();
    const box = this.contentBox()?.nativeElement;
    if (!panel || !box) {
      return;
    }
    const url = normalizeUrl(this.insertUrl.value, panel.kind === 'image' ? IMAGE_SCHEMES : undefined);
    if (!url) {
      this.insertError.set(
        panel.kind === 'image'
          ? 'Enter an image address starting with https://, or use Upload instead.'
          : 'Enter a web address such as https://example.com, or an email address.',
      );
      return;
    }
    // The text can change while the panel is open, so keep the remembered positions inside it.
    const start = Math.min(panel.start, box.value.length);
    const end = Math.min(panel.end, box.value.length);
    this.insertPanel.set(null);
    this.insertError.set(null);
    this.commitEdit(
      box,
      panel.kind === 'link'
        ? insertLink(box.value, start, end, url)
        : insertImage(box.value, start, end, url, this.insertAlt.value),
    );
  }

  // Upload from the image panel: the uploaded address is put into the panel and inserted straight away.
  onBodyImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.uploading.set(true);
    this.insertError.set(null);
    this.media
      .uploadImage(file, 'blog')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ url }) => {
          this.uploading.set(false);
          this.insertUrl.setValue(url);
          if (!this.insertAlt.value.trim()) {
            this.insertAlt.setValue(file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '));
          }
          this.confirmInsert();
        },
        error: (err) => {
          this.uploading.set(false);
          this.insertError.set(`Image upload failed: ${apiErrorMessage(err)}`);
        },
      });
    input.value = '';
  }

  private openInsertPanel(kind: 'link' | 'image', start: number, end: number): void {
    const selected = this.contentBox()?.nativeElement.value.slice(start, end).trim() ?? '';
    this.insertUrl.setValue('');
    this.insertAlt.setValue(kind === 'image' ? selected : '');
    this.insertError.set(null);
    this.insertPanel.set({ kind, start, end });
    afterNextRender(() => this.insertUrlBox()?.nativeElement.focus(), { injector: this.injector });
  }

  private commitEdit(box: HTMLTextAreaElement, edit: TextEdit): void {
    box.focus();
    box.setSelectionRange(edit.from, edit.to);
    // execCommand keeps the browser's undo history, so Ctrl+Z still works after a toolbar button. It is the only
    // way to edit a textarea from code and keep that. Where it is unavailable the control is set directly.
    const applied = typeof document.execCommand === 'function' && document.execCommand('insertText', false, edit.insert);
    if (!applied) {
      this.form.controls.content.setValue(box.value.slice(0, edit.from) + edit.insert + box.value.slice(edit.to));
    }
    this.form.controls.content.markAsDirty();
    box.setSelectionRange(edit.selectStart, edit.selectEnd);
  }

  private resetEditor(): void {
    this.previewing.set(false);
    this.insertPanel.set(null);
    this.insertError.set(null);
  }

  save(): void {
    if (this.form.invalid) {
      this.submitAttempted.set(true);
      this.form.markAllAsTouched();
      // The panel scrolls, so jump to the first field that needs attention.
      this.host.nativeElement.querySelector<HTMLElement>('input.ng-invalid, textarea.ng-invalid, select.ng-invalid')?.focus();
      return;
    }
    if (this.saving()) {
      return;
    }

    const id = this.editingId();
    const v = this.form.getRawValue();
    // Blank optional fields go out as null so the public page falls back to the deck.
    const article = {
      title: v.title,
      deck: v.deck,
      category: v.category,
      image: v.image,
      content: v.content,
      publishedDate: `${v.publishedDate}T00:00:00Z`,
      readTimeMinutes: v.readTimeMinutes,
      isFeatured: v.isFeatured,
      pullQuote: v.pullQuote.trim() || null,
      issueVolume: v.issueVolume.trim() || null,
    };

    this.saving.set(true);
    this.formError.set(null);
    const request = id
      ? this.blog.updateArticle(id, article)
      : this.blog.createArticle({ ...article, slug: v.slug, authorId: v.authorId });

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.closeForm();
        this.load();
      },
      error: (err) => {
        this.saving.set(false);
        this.formError.set(`${id ? 'Update' : 'Create'} failed: ${apiErrorMessage(err)}`);
      },
    });
  }

  deleteArticle(article: ArticleDto): void {
    if (!confirm(`Delete “${article.title}”? It will disappear from the Journal.`)) {
      return;
    }
    this.actionError.set(null);
    this.blog
      .deleteArticle(article.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this.editingId() === article.id) {
            this.closeForm();
          }
          this.load();
        },
        error: (err) => this.actionError.set(`Delete failed: ${apiErrorMessage(err)}`),
      });
  }

  fieldError(name: string): string | null {
    const control = this.form.get(name);
    const errors = control?.errors;
    if (!control?.touched || !errors) {
      return null;
    }
    if (errors['required']) return 'Required';
    if (errors['minlength']) return `At least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength']) return `At most ${errors['maxlength'].requiredLength} characters`;
    if (errors['min'] || errors['max']) return 'Enter a number from 1 to 120';
    if (errors['future']) return 'Cannot be in the future';
    return PATTERN_HINTS[name] ?? 'Invalid value';
  }
}
