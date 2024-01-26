import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { IsLoggedService } from '../services/isLogged/is-logged.service';

export const canAccessAuthGuard: CanActivateFn = (route, state) => {

  const isLoggedService = inject(IsLoggedService);
  const router = inject(Router);

  let hasToken = isLoggedService.checkHasToken();
  if(hasToken){
    router.navigate(['']);
    return false;
  }
  return true;
};
