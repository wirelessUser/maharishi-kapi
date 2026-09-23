import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminContentService } from './admin-content.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-admin-immersive',
  template: `
    <div class="flex justify-between items-end mb-6">
      <div>
        <h1 class="text-3xl font-serif font-bold text-gray-900">Manage App Screens</h1>
      </div>
      <button (click)="openNewForm()" class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-md font-bold text-sm shadow-sm cursor-pointer">
        Add New Screen
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title & Tag</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- $index और screenId को ट्रैक करें ताकि मल्टीपल रो सही से रेंडर हों -->
            @for (screen of screens(); track (screen.id || screen.screenId || $index)) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900">{{ screen.title }}</div>
                  <div class="text-xs text-gray-500">{{ screen.tag || 'No Tag' }}</div>
                </td>
                <td class="px-6 py-4 text-right text-sm">
                  <button (click)="editScreen(screen)" class="text-indigo-600 font-bold mr-4 cursor-pointer">Edit</button>
                  <button (click)="deleteScreen(screen.id)" class="text-red-600 font-bold cursor-pointer">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm()) {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ isEditing() ? 'Edit Screen' : 'New Screen' }}</h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">
            <input formControlName="screenId" class="w-full border p-2 rounded text-sm" placeholder="Screen ID (slug: e.g. kundli-view)" [readonly]="isEditing()" />
            <input formControlName="title" class="w-full border p-2 rounded text-sm" placeholder="Title" />
            <div class="grid grid-cols-2 gap-4">
              <input formControlName="sanskritTitle" class="w-full border p-2 rounded text-sm" placeholder="Sanskrit Title" />
              <input formControlName="tag" class="w-full border p-2 rounded text-sm" placeholder="Tag" />
            </div>
            <input formControlName="headline" class="w-full border p-2 rounded text-sm" placeholder="Headline" />
            <textarea formControlName="description" rows="3" class="w-full border p-2 rounded text-sm" placeholder="Description"></textarea>
            <input formControlName="imageUrl" class="w-full border p-2 rounded text-sm" placeholder="Image URL" />
            
            <div class="flex gap-3 pt-4 border-t">
              <button type="button" (click)="closeForm()" class="flex-1 bg-gray-100 py-2 rounded text-sm font-bold">Cancel</button>
              <button type="submit" [disabled]="form.invalid || isProcessing()" class="flex-1 bg-amber-600 text-white py-2 rounded text-sm font-bold">
                {{ isEditing() ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  `
})
export class AdminImmersiveComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(AdminContentService);

  readonly screens = signal<any[]>([]);
  readonly showForm = signal(false);
  readonly isEditing = signal(false);
  private currentId: string | null = null;
  readonly isProcessing = this.service.isProcessing;

  readonly form = this.fb.group({
    screenId: ['', Validators.required],
    title: ['', Validators.required],
    sanskritTitle: [''],
    tag: [''],
    headline: [''],
    description: [''],
    imageUrl: ['']
  });

  ngOnInit() { this.load(); }

  load() {
    this.service.getAppScreens().subscribe({
      next: (res: any) => {
        const rawList = Array.isArray(res) ? res : (res?.$values || res?.items || []);
        const mapped = rawList.map((item: any) => ({
          // id और screenId दोनों को फॉलबैक दें
          id: item.id || item.Id || item.screenId || item.ScreenId,
          screenId: item.screenId || item.ScreenId || '',
          title: item.title || item.Title || '',
          sanskritTitle: item.sanskritTitle || item.SanskritTitle || '',
          tag: item.tag || item.Tag || '',
          headline: item.headline || item.Headline || '',
          description: item.description || item.Description || '',
          imageUrl: item.imageUrl || item.ImageUrl || ''
        }));
        this.screens.set(mapped);
      }
    });
  }

  openNewForm() {
    this.form.reset();
    this.isEditing.set(false); // निश्चित करें कि एडिट मोड बंद हो
    this.currentId = null;     // पुरानी ID पूरी तरह साफ़ करें
    this.showForm.set(true);
  }

  editScreen(screen: any) {
    this.currentId = screen.id;
    this.isEditing.set(true);
    this.form.patchValue(screen);
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.currentId = null;
    this.isEditing.set(false);
  }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.value;

    if (this.isEditing() && this.currentId) {
      console.log('Sending PUT (Update) for:', this.currentId);
      this.service.updateAppScreen(this.currentId, payload).subscribe({
        next: () => { this.load(); this.closeForm(); },
        error: (err) => console.error('Update Screen Error:', err)
      });
    } else {
      console.log('Sending POST (Create New Screen):', payload);
      this.service.createAppScreen(payload).subscribe({
        next: () => { this.load(); this.closeForm(); },
        error: (err) => console.error('Create Screen Error:', err)
      });
    }
  }

  deleteScreen(id: string) {
    if (confirm('Delete this screen?')) {
      this.service.deleteAppScreen(id).subscribe(() => this.load());
    }
  }
}