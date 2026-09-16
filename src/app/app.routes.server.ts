import { RenderMode, ServerRoute } from '@angular/ssr';
import { RETREATS } from './data/retreats';
import { COURSES } from './data/courses';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'retreats/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return RETREATS.map((retreat) => ({ slug: retreat.slug }));
    },
  },
  {
    path: 'courses/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return COURSES.map((course) => ({ slug: course.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
