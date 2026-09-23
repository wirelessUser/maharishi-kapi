import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminContentService } from './admin-content.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-admin-retreats',
  template: `
    <div class="flex justify-between items-end mb-6">
      <div>
        <h1 class="text-3xl font-serif font-bold text-gray-900">Manage Sacred Retreats</h1>
        <p class="text-sm text-gray-500 mt-1">Add, update, and manage Himalayan & Vedic retreats</p>
      </div>
      <button (click)="openNewForm()" class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-md font-bold text-sm shadow-sm cursor-pointer transition-all">
        Add New Retreat
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- टेबल व्यू (बायाँ हिस्सा) -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Retreat</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location & Dates</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (r of retreats(); track (r.id || r.slug || $index)) {
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    @if (r.cardImage) {
                      <img [src]="r.cardImage" class="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    }
                    <div>
                      <div class="text-sm font-bold text-gray-900">{{ r.title }}</div>
                      <div class="text-xs text-amber-600 font-mono">{{ r.slug }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-xs font-semibold text-gray-800">{{ r.location }}</div>
                  <div class="text-[11px] text-gray-500">{{ r.dateRange }} ({{ r.duration }})</div>
                </td>
                <td class="px-6 py-4 font-mono text-sm text-green-700 font-bold">
                  \${{ r.priceFrom }}
                </td>
                <td class="px-6 py-4 text-right text-sm">
                  <button (click)="editRetreat(r)" class="text-indigo-600 font-bold mr-4 cursor-pointer hover:underline">Edit</button>
                  <button (click)="deleteRetreat(r.id)" class="text-red-600 font-bold cursor-pointer hover:underline">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- फॉर्म पैनल (दायाँ हिस्सा) -->
      @if (showForm()) {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-h-[85vh] overflow-y-auto">
          <h3 class="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
            {{ isEditing() ? 'Edit Retreat' : 'New Sacred Retreat' }}
          </h3>

          <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">
            
            <!-- Basic Details -->
            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Title *</label>
              <input formControlName="title" (input)="onTitleChange()" class="w-full border p-2 rounded text-sm" placeholder="e.g. Himalayan Mahashivratri Sadhana" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
                <input formControlName="slug" class="w-full border p-2 rounded text-sm bg-gray-50" placeholder="himalayan-sadhana" [readonly]="isEditing()" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Tagline</label>
                <input formControlName="tagline" class="w-full border p-2 rounded text-sm" placeholder="e.g. KEDARNATH VALLEY" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Subtitle</label>
              <input formControlName="subtitle" class="w-full border p-2 rounded text-sm" placeholder="A 7-Day High-Altitude Tantric Immersion" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Location</label>
                <input formControlName="location" class="w-full border p-2 rounded text-sm" placeholder="Rishikesh & Kedarnath" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Elevation</label>
                <input formControlName="elevation" class="w-full border p-2 rounded text-sm" placeholder="11,755 ft · Garhwal" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Date Range</label>
                <input formControlName="dateRange" class="w-full border p-2 rounded text-sm" placeholder="Feb 24 – Mar 2, 2026" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                <input formControlName="duration" class="w-full border p-2 rounded text-sm" placeholder="7 Days / 6 Nights" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Price From ($) *</label>
                <input type="number" formControlName="priceFrom" class="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Total Seats</label>
                <input type="number" formControlName="seatsTotal" class="w-full border p-2 rounded text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Seats Left</label>
                <input type="number" formControlName="seatsLeft" class="w-full border p-2 rounded text-sm" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-1">Summary</label>
              <textarea formControlName="summary" rows="3" class="w-full border p-2 rounded text-sm" placeholder="Brief editorial summary of this journey..."></textarea>
            </div>

            <!-- Image Upload 1: Hero Image -->
            <div class="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60">
              <label class="block text-xs font-bold text-gray-800 mb-1">Hero Image (Large Banner)</label>
              <div class="flex gap-2 items-center">
                <input formControlName="heroImage" class="flex-1 border p-2 rounded text-xs bg-white text-gray-600" placeholder="Azure URL will be set automatically" readonly />
                <label class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0">
                  <span>Upload</span>
                  <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event, 'heroImage')" />
                </label>
              </div>
              @if (uploadingField() === 'heroImage') {
                <p class="text-[11px] text-amber-700 mt-1 font-mono animate-pulse">Uploading to Azure Blob...</p>
              }
            </div>

            <!-- Image Upload 2: Card Image -->
            <div class="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60">
              <label class="block text-xs font-bold text-gray-800 mb-1">Card / Brochure Image</label>
              <div class="flex gap-2 items-center">
                <input formControlName="cardImage" class="flex-1 border p-2 rounded text-xs bg-white text-gray-600" placeholder="Azure URL will be set automatically" readonly />
                <label class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0">
                  <span>Upload</span>
                  <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event, 'cardImage')" />
                </label>
              </div>
              @if (uploadingField() === 'cardImage') {
                <p class="text-[11px] text-amber-700 mt-1 font-mono animate-pulse">Uploading to Azure Blob...</p>
              }
            </div>

            <!-- Submit Buttons -->
            <div class="flex gap-3 pt-4 border-t">
              <button type="button" (click)="closeForm()" class="flex-1 bg-gray-100 hover:bg-gray-200 py-2.5 rounded text-sm font-bold text-gray-700">
                Cancel
              </button>
              <button type="submit" [disabled]="form.invalid || isProcessing()" class="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded text-sm font-bold shadow-sm disabled:opacity-50">
                {{ isEditing() ? 'Update Retreat' : 'Save Retreat' }}
              </button>
            </div>

          </form>
        </div>
      }
    </div>
  `
})
export class AdminRetreatsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(AdminContentService);

  readonly retreats = signal<any[]>([]);
  readonly showForm = signal(false);
  readonly isEditing = signal(false);
  readonly uploadingField = signal<string | null>(null);
  readonly isProcessing = signal(false);

  private currentId: string | null = null;

  readonly form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    tagline: [''],
    subtitle: [''],
    location: [''],
    elevation: [''],
    dateRange: [''],
    duration: [''],
    priceFrom: [0, [Validators.required, Validators.min(0)]],
    seatsTotal: [20],
    seatsLeft: [20],
    status: ['upcoming'],
    summary: [''],
    heroImage: [''],
    cardImage: ['']
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getRetreats().subscribe({
      next: (res: any) => {
        const list = Array.isArray(res) ? res : (res?.$values || []);
        this.retreats.set(list.map((r: any) => ({
          id: r.id || r.Id,
          slug: r.slug || r.Slug,
          title: r.title || r.Title,
          location: r.location || r.Location,
          dateRange: r.dateRange || r.DateRange,
          duration: r.duration || r.Duration,
          priceFrom: r.priceFrom ?? r.PriceFrom ?? 0,
          cardImage: r.cardImage || r.CardImage
        })));
      },
      error: (err) => console.error('Failed to load retreats:', err)
    });
  }

  onTitleChange() {
    if (!this.isEditing()) {
      const title = this.form.get('title')?.value || '';
      const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      this.form.get('slug')?.setValue(slug);
    }
  }

  onFileSelected(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.uploadingField.set(controlName);

    this.service.uploadImage(file, 'retreats').subscribe({
      next: (res) => {
        this.form.get(controlName)?.setValue(res.url);
        this.uploadingField.set(null);
      },
      error: (err) => {
        alert('Image upload failed: ' + (err.error?.message || err.message));
        this.uploadingField.set(null);
      }
    });
  }

  openNewForm() {
    this.form.reset({ priceFrom: 0, seatsTotal: 20, seatsLeft: 20, status: 'upcoming' });
    this.isEditing.set(false);
    this.currentId = null;
    this.showForm.set(true);
  }

  editRetreat(r: any) {
    this.currentId = r.id;
    this.isEditing.set(true);

    // Get full retreat details
    this.service.getRetreatBySlug(r.slug).subscribe({
      next: (full: any) => {
        this.form.patchValue({
          title: full.title || full.Title,
          slug: full.slug || full.Slug,
          tagline: full.tagline || full.Tagline,
          subtitle: full.subtitle || full.Subtitle,
          location: full.location || full.Location,
          elevation: full.elevation || full.Elevation,
          dateRange: full.dateRange || full.DateRange,
          duration: full.duration || full.Duration,
          priceFrom: full.priceFrom ?? full.PriceFrom ?? 0,
          seatsTotal: full.seatsTotal ?? full.SeatsTotal ?? 20,
          seatsLeft: full.seatsLeft ?? full.SeatsLeft ?? 20,
          status: full.status || full.Status || 'upcoming',
          summary: full.summary || full.Summary,
          heroImage: full.heroImage || full.HeroImage,
          cardImage: full.cardImage || full.CardImage
        });
        this.showForm.set(true);
      }
    });
  }

  closeForm() {
    this.showForm.set(false);
    this.currentId = null;
  }

  save() {
    if (this.form.invalid) return;
    this.isProcessing.set(true);
    const payload = this.form.value;

    if (this.isEditing() && this.currentId) {
      this.service.updateRetreat(this.currentId, payload).subscribe({
        next: () => {
          this.isProcessing.set(false);
          this.load();
          this.closeForm();
        },
        error: (err) => {
          this.isProcessing.set(false);
          alert('Update failed: ' + (err.error?.title || err.message));
        }
      });
    } else {
      this.service.createRetreat(payload).subscribe({
        next: () => {
          this.isProcessing.set(false);
          this.load();
          this.closeForm();
        },
        error: (err) => {
          this.isProcessing.set(false);
          alert('Create failed: ' + (err.error?.title || err.message));
        }
      });
    }
  }

  deleteRetreat(id: string) {
    if (confirm('Are you sure you want to delete this retreat?')) {
      this.service.deleteRetreat(id).subscribe(() => this.load());
    }
  }
}