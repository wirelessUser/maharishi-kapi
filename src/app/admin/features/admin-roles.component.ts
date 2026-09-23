import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AdminContentService } from './admin-content.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-admin-roles',
  template: `
    <div class="flex justify-between items-end mb-6">
      <div>
        <h1 class="text-3xl font-serif font-bold text-gray-900">Manage Roles</h1>
      </div>
      <button (click)="openNewForm()" class="bg-amber-600 text-white px-5 py-2.5 rounded-md font-bold text-sm">
        Add New Role
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title & Specialization</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for (role of roles(); track role.id) {
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900">{{ role.title }}</div>
                  <div class="text-xs text-gray-500">{{ role.specialization }}</div>
                </td>
                <td class="px-6 py-4 text-right text-sm">
                  <button (click)="editRole(role)" class="text-indigo-600 font-bold mr-4">Edit</button>
                  <button (click)="deleteRole(role.id)" class="text-red-600 font-bold">Delete</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm()) {
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">{{ isEditing() ? 'Edit Role' : 'Create Role' }}</h3>
          <form [formGroup]="roleForm" (ngSubmit)="save()" class="space-y-4">
            <input formControlName="key" class="w-full border p-2 rounded text-sm" placeholder="Key (Slug)" [readonly]="isEditing()" />
            <div class="grid grid-cols-2 gap-4">
              <input formControlName="devanagariNum" class="w-full border p-2 rounded text-sm" placeholder="Devanagari No." />
              <input formControlName="icon" class="w-full border p-2 rounded text-sm" placeholder="Icon Class (fa-compass)" />
            </div>
            <input formControlName="title" class="w-full border p-2 rounded text-sm" placeholder="Title" />
            <input formControlName="specialization" class="w-full border p-2 rounded text-sm" placeholder="Specialization" />
            <textarea formControlName="description" rows="3" class="w-full border p-2 rounded text-sm" placeholder="Description"></textarea>
            <input formControlName="imageUrl" class="w-full border p-2 rounded text-sm" placeholder="Image URL" />
            <div class="flex items-center">
              <input type="checkbox" formControlName="hasPressLogos" class="mr-2" />
              <label class="text-sm text-gray-700">Show Press Logos</label>
            </div>
            <div class="flex gap-3 pt-4 border-t">
              <button type="button" (click)="closeForm()" class="flex-1 bg-gray-100 py-2 rounded text-sm font-bold">Cancel</button>
              <button type="submit" [disabled]="roleForm.invalid || isProcessing()" class="flex-1 bg-amber-600 text-white py-2 rounded text-sm font-bold">Save</button>
            </div>
          </form>
        </div>
      }
    </div>
  `
})
export class AdminRolesComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly adminService = inject(AdminContentService);

  readonly roles = signal<any[]>([]);
  readonly showForm = signal(false);
  readonly isEditing = signal(false);
  private currentEditId: string | null = null;
  readonly isProcessing = this.adminService.isProcessing;

  readonly roleForm = this.fb.group({
    key: ['', Validators.required],
    devanagariNum: [''],
    title: ['', Validators.required],
    specialization: ['', Validators.required],
    description: [''],
    icon: [''],
    imageUrl: [''],
    hasPressLogos: [false]
  });

  ngOnInit() { this.loadRoles(); }

  loadRoles() {
    this.adminService.getRoles().subscribe({
      next: (res: any) => {
        const rawList = Array.isArray(res) ? res : (res?.$values || res?.items || []);
        // सटीक मैपिंग: C# के बड़े अक्षरों को Angular के छोटे अक्षरों में बदलना
        const mapped = rawList.map((item: any) => ({
          id: item.id || item.Id,
          key: item.key || item.Key,
          devanagariNum: item.devanagariNum || item.DevanagariNum || '',
          title: item.title || item.Title || '',
          specialization: item.specialization || item.Specialization || '',
          description: item.description || item.Description || '',
          icon: item.icon || item.Icon || '',
          imageUrl: item.imageUrl || item.ImageUrl || '',
          hasPressLogos: item.hasPressLogos ?? item.HasPressLogos ?? false
        }));
        this.roles.set(mapped);
      }
    });
  }

  openNewForm() {
    this.roleForm.reset({ hasPressLogos: false });
    this.isEditing.set(false);
    this.currentEditId = null;
    this.showForm.set(true);
  }

editRole(role: any) {
    this.currentEditId = role.id || role.Id;
    this.isEditing.set(true);
    this.roleForm.patchValue({
      key: role.key || role.Key || '',
      devanagariNum: role.devanagariNum || role.DevanagariNum || '', // <-- यह लाइन
      icon: role.icon || role.Icon || '',
      title: role.title || role.Title || '',
      specialization: role.specialization || role.Specialization || '',
      description: role.description || role.Description || '',
      imageUrl: role.imageUrl || role.ImageUrl || '',
      hasPressLogos: role.hasPressLogos ?? role.HasPressLogos ?? false
    });
    this.showForm.set(true);
  }
  closeForm() {
    this.showForm.set(false);
    this.roleForm.reset();
  }

  save() {
    if (this.roleForm.invalid) return;
    const payload = this.roleForm.value;

    if (this.isEditing() && this.currentEditId) {
      this.adminService.updateRole(this.currentEditId, payload).subscribe({
        next: () => { this.loadRoles(); this.closeForm(); },
        error: (err) => alert('Update Failed! Check console.')
      });
    } else {
      this.adminService.createRole(payload).subscribe({
        next: () => { this.loadRoles(); this.closeForm(); },
        error: (err) => alert('Create Failed! Check console.')
      });
    }
  }

  deleteRole(id: string) {
    if (confirm('Delete this role?')) {
      this.adminService.deleteRole(id).subscribe(() => this.loadRoles());
    }
  }
}