import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Hardcoded to true for development so you can access the admin panel
  const tempIsAdminLoggedIn = true; 
  
  if (tempIsAdminLoggedIn) {
    return true;
  }
  
  return router.parseUrl('/'); 
};