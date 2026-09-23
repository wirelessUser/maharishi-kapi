import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-admin-layout',
  template: `
    <div class="flex h-screen bg-gray-100 font-sans">
      <!-- Sidebar -->
      <aside class="w-64 bg-[#2c1d11] text-white flex flex-col shrink-0">
        <div class="p-6 text-center border-b border-white/10">
          <h2 class="text-xl font-serif font-bold text-amber-500">Sanctum Admin</h2>
          <span class="text-xs font-mono text-gray-400">Content Manager</span>
        </div>
        
        <nav class="flex-1 p-4 space-y-2">
          <a routerLink="roles" routerLinkActive="bg-white/10 text-amber-400 border-l-4 border-amber-500" 
             class="block px-4 py-3 rounded text-sm font-bold transition-colors text-gray-300 hover:bg-white/5">
             <i class="fa-solid fa-users-gear mr-2"></i> Roles
          </a>
          <a routerLink="journey" routerLinkActive="bg-white/10 text-amber-400 border-l-4 border-amber-500" 
             class="block px-4 py-3 rounded text-sm font-bold transition-colors text-gray-300 hover:bg-white/5">
             <i class="fa-solid fa-route mr-2"></i> Journey Paths
          </a>
          <a routerLink="immersive" routerLinkActive="bg-white/10 text-amber-400 border-l-4 border-amber-500" 
             class="block px-4 py-3 rounded text-sm font-bold transition-colors text-gray-300 hover:bg-white/5">
             <i class="fa-solid fa-mobile-screen mr-2"></i> App Screens
          </a>
          <a routerLink="consultations" routerLinkActive="bg-white/10 text-amber-400 border-l-4 border-amber-500" 
             class="block px-4 py-3 rounded text-sm font-bold transition-colors text-gray-300 hover:bg-white/5">
             <i class="fa-solid fa-calendar-check mr-2"></i> Consultations
          </a>

          <!-- ✅ बाकी लिंक्स की तरह routerLink="retreats" करें -->
          <a routerLink="retreats" routerLinkActive="bg-white/10 text-amber-400 border-l-4 border-amber-500" 
             class="block px-4 py-3 rounded text-sm font-bold transition-colors text-gray-300 hover:bg-white/5 cursor-pointer">
             <i class="fa-solid fa-mountain-sun mr-2"></i> Retreats
          </a>

          <a routerLink="blog" routerLinkActive="bg-white/10 text-amber-400 border-l-4 border-amber-500"
             class="block px-4 py-3 rounded text-sm font-bold transition-colors text-gray-300 hover:bg-white/5">
             <i class="fa-solid fa-feather-pointed mr-2"></i> Blog Articles
          </a>
          
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-gray-50">
        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {}