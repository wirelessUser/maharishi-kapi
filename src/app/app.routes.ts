import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesPage } from './pages/courses-page/courses-page';
import { ServicesPage } from './pages/services-page/services-page';
import { AboutPage } from './pages/about-page/about-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'courses', component: CoursesPage },
  { path: 'services', component: ServicesPage },
  { path: 'about', component: AboutPage },
  { path: '**', redirectTo: '' } // अगर कोई गलत URL डाले तो होम पेज पर ले जाओ
];