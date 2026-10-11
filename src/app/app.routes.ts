import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesPage } from './pages/courses-page/courses-page';
import { ServicesPage } from './pages/services-page/services-page';
import { AboutPage } from './pages/about-page/about-page';
import { BlogPage } from './pages/blog-page/blog-page';
import { RetreatsPage } from './pages/retreats-page/retreats-page';
import { RetreatDetailPage } from './pages/retreat-detail-page/retreat-detail-page';
import { CourseDetailPage } from './pages/course-detail-page/course-detail-page';
import { FundraiserPage } from './fundraiser-page/fundraiser-page';
import { ResidentialPage } from './residential-page/residential-page';
import { LibraryPage } from './kapi-library-page/kapi-library-page';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'courses', component: CoursesPage },
  { path: 'courses/:slug', component: CourseDetailPage },
  { path: 'services', component: ServicesPage },
  { path: 'about', component: AboutPage },
  { path: 'blog', component: BlogPage },
  { path: 'retreats', component: RetreatsPage },
  { path: 'fundraise', component: FundraiserPage },
  { path: 'Fundraise', redirectTo: 'fundraise' },
  { path: 'retreats/:slug', component: RetreatDetailPage },
  { path: 'library', component: LibraryPage },
  { path: 'residential', component: ResidentialPage },

  // PRODUCT ROUTE
  {
    path: 'product',
    loadComponent: () => import('./components/product-page/product-page').then(m => m.ProductPage)
  },
  {
    path: 'products',
    redirectTo: 'product'
  },

  // 1. PUBLIC CART ROUTE (Top-level)
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
  },

  // 2. PUBLIC AUTH / SIGN IN / REGISTER ROUTES (Top-level)
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/auth.component/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'register',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 3. PUBLIC FORGOT & RESET PASSWORD ROUTES (Top-level)
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },

  // 4. PUBLIC MY ORDERS ROUTE (Top-level)
  {
    path: 'my-orders',
    loadComponent: () => import('./pages/my-orders/my-orders.component/my-orders.component').then(m => m.MyOrdersComponent)
  },

  // Admin Backend Panel (Lazy Loaded)
  {
    path: 'admin',
    loadComponent: () => import('./admin/features/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { 
        path: '', 
        redirectTo: 'roles', 
        pathMatch: 'full' 
      },
      { 
        path: 'roles', 
        loadComponent: () => import('./admin/features/admin-roles.component').then(m => m.AdminRolesComponent) 
      },
      { 
        path: 'journey', 
        loadComponent: () => import('./admin/features/admin-journey.component').then(m => m.AdminJourneyComponent) 
      },
      { 
        path: 'immersive', 
        loadComponent: () => import('./admin/features/admin-immersive.component').then(m => m.AdminImmersiveComponent) 
      },
      { 
        path: 'consultations', 
        loadComponent: () => import('./admin/features/admin-consultations.component').then(m => m.AdminConsultationsComponent) 
      },
      { 
        path: 'retreats', 
        loadComponent: () => import('./admin/features/admin-retreat.component').then(m => m.AdminRetreatsComponent)
      },
      { 
        path: 'blog', 
        loadComponent: () => import('./admin/features/admin-blog.component').then(m => m.AdminBlogComponent) 
      }
    ]
  },

  // Catch-all route (always at the very end)
  { path: '**', redirectTo: '' }
];