import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminContentService } from './admin-content.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-admin-consultations',
  template: `
    <div class="flex justify-between items-end mb-6">
      <div><h1 class="text-3xl font-serif font-bold text-gray-900">Manage Consultations</h1></div>
      <button (click)="openNewForm()" class="bg-amber-600 text-white px-5 py-2.5 rounded-md font-bold text-sm">Add Tier</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title & Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (tier of tiers(); track tier.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="text-sm font-bold">{{ tier.title }}</div>
                  <div class="text-xs text-gray-500">{{ tier.category }}</div>
                </td>
                <td class="px-6 py-4 font-mono text-sm text-green-700 font-bold">€{{ tier.price }}</td>
                <td class="px-6 py-4 text-right text-sm">
                  <button (click)="editTier(tier)" class="text-indigo-600 font-bold mr-4">Edit</button>
                  <button (click)="deleteTier(tier.id)" class="text-red-600 font-bold">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm()) {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-bold mb-4">{{ isEditing() ? 'Edit Tier' : 'New Tier' }}</h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">
            <input formControlName="tierId" class="w-full border p-2 rounded text-sm" placeholder="Tier ID (slug)" [readonly]="isEditing()" />
            <div class="grid grid-cols-2 gap-4">
              <input formControlName="devanagariNum" class="w-full border p-2 rounded text-sm" placeholder="Devanagari No." />
              <input formControlName="sanskritTag" class="w-full border p-2 rounded text-sm" placeholder="Sanskrit Tag" />
            </div>
            <input formControlName="title" class="w-full border p-2 rounded text-sm" placeholder="Title" />
            <input formControlName="category" class="w-full border p-2 rounded text-sm" placeholder="Category" />
            <div class="grid grid-cols-2 gap-4">
              <input type="number" formControlName="price" class="w-full border p-2 rounded text-sm" placeholder="Price (€)" />
              <input type="number" formControlName="originalPrice" class="w-full border p-2 rounded text-sm" placeholder="Original Price (€)" />
            </div>
            <input formControlName="duration" class="w-full border p-2 rounded text-sm" placeholder="Duration String" />
            <textarea formControlName="summary" rows="3" class="w-full border p-2 rounded text-sm" placeholder="Summary"></textarea>
            <input formControlName="imageUrl" class="w-full border p-2 rounded text-sm" placeholder="Image URL" />
            <div class="flex gap-3 pt-4">
              <button type="button" (click)="closeForm()" class="flex-1 bg-gray-100 py-2 rounded text-sm font-bold">Cancel</button>
              <button type="submit" [disabled]="form.invalid || isProcessing()" class="flex-1 bg-amber-600 text-white py-2 rounded text-sm font-bold">Save</button>
            </div>
          </form>
        </div>
      }
    </div>
  `
})
export class AdminConsultationsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(AdminContentService);

  readonly tiers = signal<any[]>([]);
  readonly showForm = signal(false);
  readonly isEditing = signal(false);
  private currentId: string | null = null;
  readonly isProcessing = this.service.isProcessing;

readonly form = this.fb.group({
    tierId: ['', Validators.required],
    title: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    // बाकी सभी को Optional कर दें ताकि बटन कभी ब्लॉक न हो:
    originalPrice: [0],
    devanagariNum: [''],
    sanskritTag: [''],
    duration: [''],
    summary: [''],
    imageUrl: ['']
  });

  ngOnInit() { this.load(); }

  load() {
    this.service.getConsultations().subscribe({
      next: (res: any) => {
        const rawList = Array.isArray(res) ? res : (res?.$values || res?.items || []);
        const mapped = rawList.map((item: any) => ({
          id: item.id || item.Id,
          tierId: item.tierId || item.TierId || '',
          devanagariNum: item.devanagariNum || item.DevanagariNum || '',
          title: item.title || item.Title || '',
          sanskritTag: item.sanskritTag || item.SanskritTag || '',
          category: item.category || item.Category || '',
          price: item.price ?? item.Price ?? 0,
          originalPrice: item.originalPrice ?? item.OriginalPrice ?? 0,
          duration: item.duration || item.Duration || '',
          summary: item.summary || item.Summary || '',
          imageUrl: item.imageUrl || item.ImageUrl || ''
        }));
        this.tiers.set(mapped);
      }
    });
  }

  openNewForm() {
    this.form.reset({ price: 0, originalPrice: 0 });
    this.isEditing.set(false);
    this.currentId = null;
    this.showForm.set(true);
  }

  editTier(tier: any) {
    this.currentId = tier.id;
    this.isEditing.set(true);
    this.form.patchValue(tier);
    this.showForm.set(true);
  }

  closeForm() { this.showForm.set(false); }

  save() {
    if (this.form.invalid) return;
    const payload = this.form.value;

    if (this.isEditing() && this.currentId) {
      this.service.updateConsultation(this.currentId, payload).subscribe({
        next: () => { this.load(); this.closeForm(); },
        error: () => alert('Update Failed')
      });
   } else {
      this.service.createConsultation(payload).subscribe({
        next: () => { 
          this.load(); 
          this.closeForm(); 
        },
        error: (err) => {
          console.error('Create Consultation Error:', err);
          // असली एरर पॉपअप में दिखेगा:
          const msg = err.error?.title || err.error?.message || JSON.stringify(err.error) || err.message;
          alert('Create Failed (Status ' + err.status + '): ' + msg);
        }
      });
    }
  }

  deleteTier(id: string) {
    if (confirm('Delete this tier?')) this.service.deleteConsultation(id).subscribe(() => this.load());
  }
}