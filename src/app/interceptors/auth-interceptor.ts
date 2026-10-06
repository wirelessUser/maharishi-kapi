import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // 1. Only run in browser (prevents SSR errors)
  // 2. Reading directly breaks the HttpClient -> AuthService -> HttpClient cycle
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('astro_jwt_token');

    if (token && req.url.includes('astrokapiapi-hkesbwh6fjddhtg5.centralindia-01.azurewebsites.net')) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    }
  }

  return next(req);
};