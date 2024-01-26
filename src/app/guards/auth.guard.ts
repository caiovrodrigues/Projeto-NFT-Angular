import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { IsLoggedService } from '../services/isLogged/is-logged.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);
  const isLoggedService = inject(IsLoggedService);

  // console.log(route);
  // console.log(state);
  
  let hasToken = isLoggedService.checkHasToken();
    
  if(!hasToken){
    router.navigate(['/auth']);
    messageService.add({severity: 'info', summary: 'Atenção', detail: 'Você precisa estar logado para poder compartilhar um nft'});
    return false;
  }
  
  return true;
};
