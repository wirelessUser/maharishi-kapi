import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminContentService } from './admin-content.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-admin-journey',
  template: `
    <div class="flex justify-between items-end mb-6">
      <div><h1 class="text-3xl font-serif font-bold text-gray-900">Manage Journey Paths</h1></div>
      <button (click)="openNewForm()" class="bg-amber-600 text-white px-5 py-2.5 rounded-md font-bold text-sm">Add New Path</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title & Target</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (path of paths(); track path.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="text-sm font-bold">{{ path.title }} {{ path.subtitle }}</div>
                  <div class="text-xs text-amber-600">Route: {{ path.targetRoute }}</div>
                </td>
                <td class="px-6 py-4 text-right text-sm">
                  <button (click)="editPath(path)" class="text-indigo-600 font-bold mr-4">Edit</button>
                  <button (click)="deletePath(path.id)" class="text-red-600 font-bold">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm()) {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-bold mb-4">{{ isEditing() ? 'Edit Path' : 'New Path' }}</h3>
          <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4">
            <input formControlName="routeId" class="w-full border p-2 rounded text-sm" placeholder="Route ID (e.g. spiritual)" />

              <div class="grid grid-cols-2 gap-4">
              <input formControlName="devanagariNum" class="w-full border p-2 rounded text-sm" placeholder="Devanagari No." />
              <input formControlName="sanskritTag" class="w-full border p-2 rounded text-sm" placeholder="Sanskrit Tag" />
            </div>
            <input formControlName="prompt" class="w-full border p-2 rounded text-sm" placeholder="Prompt" />
            <div class="grid grid-cols-2 gap-4">
              <input formControlName="title" class="w-full border p-2 rounded text-sm" placeholder="Title" />
              <input formControlName="subtitle" class="w-full border p-2 rounded text-sm" placeholder="Subtitle" />
            </div>
            <textarea formControlName="deck" rows="3" class="w-full border p-2 rounded text-sm" placeholder="Description"></textarea>
            <input formControlName="imageUrl" class="w-full border p-2 rounded text-sm" placeholder="Image URL" />
            <div class="grid grid-cols-2 gap-4">
              <input formControlName="targetRoute" class="w-full border p-2 rounded text-sm" placeholder="Target Route" />
              <input formControlName="routeLabel" class="w-full border p-2 rounded text-sm" placeholder="Button Label" />
            </div>
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
export class AdminJourneyComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(AdminContentService);

  readonly paths = signal<any[]>([]);
  readonly showForm = signal(false);
  readonly isEditing = signal(false);
  private currentId: string | null = null;
  readonly isProcessing = this.service.isProcessing;

  readonly form = this.fb.group({
    routeId: ['', Validators.required],
    devanagariNum: [''],
    sanskritTag: [''],
    prompt: [''],
    title: ['', Validators.required],
    subtitle: [''],
    deck: [''],
    imageUrl: [''],
    targetRoute: ['', Validators.required],
    routeLabel: ['']
  });

  ngOnInit() { this.load(); }

  load() {
    this.service.getJourneyPaths().subscribe({
      next: (res: any) => {
        const rawList = Array.isArray(res) ? res : (res?.$values || res?.items || []);
        const mapped = rawList.map((item: any) => ({
          id: item.id || item.Id,
          routeId: item.routeId || item.RouteId || '',
          devanagariNum: item.devanagariNum || item.DevanagariNum || '',
          sanskritTag: item.sanskritTag || item.SanskritTag || '',
          prompt: item.prompt || item.Prompt || '',
          title: item.title || item.Title || '',
          subtitle: item.subtitle || item.Subtitle || '',
          deck: item.deck || item.Deck || '',
          imageUrl: item.imageUrl || item.ImageUrl || '',
          targetRoute: item.targetRoute || item.TargetRoute || '',
          routeLabel: item.routeLabel || item.RouteLabel || ''
        }));
        this.paths.set(mapped);
      }
    });
  }

  openNewForm() {
    this.form.reset();
    this.isEditing.set(false);
    this.currentId = null;
    this.showForm.set(true);
  }

editPath(path: any) {
    // Guid ID को सुरक्षित तरीके से निकालना
    this.currentId = path.id || path.Id;
    this.isEditing.set(true);

    this.form.patchValue({
      routeId: path.routeId || path.RouteId,
      devanagariNum: path.devanagariNum || path.DevanagariNum,
      sanskritTag: path.sanskritTag || path.SanskritTag,
      prompt: path.prompt || path.Prompt,
      title: path.title || path.Title,
      subtitle: path.subtitle || path.Subtitle,
      deck: path.deck || path.Deck,
      imageUrl: path.imageUrl || path.ImageUrl,
      targetRoute: path.targetRoute || path.TargetRoute,
      routeLabel: path.routeLabel || path.RouteLabel
    });

    this.showForm.set(true);
  }

  closeForm() { this.showForm.set(false); }

save() {
    if (this.form.invalid) {
      alert('Form is invalid! Please check all required fields.');
      return;
    }

    const payload = this.form.value;

    if (this.isEditing() && this.currentId) {
      console.log('Sending PUT update for ID:', this.currentId, payload);
      this.service.updateJourneyPath(this.currentId, payload).subscribe({
        next: () => {
          alert('Updated Successfully!');
          this.load();
          this.closeForm();
        },
        error: (err) => {
          console.error('Update Error:', err);
          alert('Update Failed! Status: ' + err.status + ' - ' + (err.error?.title || err.message));
        }
      });
    } else {
      this.service.createJourneyPath(payload).subscribe({
        next: () => {
          this.load();
          this.closeForm();
        },
        error: (err) => {
          console.error('Create Error:', err);
          alert('Create Failed! Status: ' + err.status);
        }
      });
    }
  }

  deletePath(id: string) {
    if (confirm('Delete this path?')) this.service.deleteJourneyPath(id).subscribe(() => this.load());
  }
}