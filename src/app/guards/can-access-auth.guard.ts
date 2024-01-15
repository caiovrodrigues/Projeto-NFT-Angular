import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const canAccessAuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = authService.usuarioLogado();
  if(isLoggedIn){
    router.navigate(['']);
    return false;
  }
  return true;
};
