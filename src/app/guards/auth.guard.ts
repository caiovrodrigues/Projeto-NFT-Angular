import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  // console.log(route);
  // console.log(state);
  
  let hasToken = authService.usuarioLogado();
    
  if(!hasToken){
    router.navigate(['/auth']);
    messageService.add({severity: 'info', summary: 'Atenção', detail: 'Você precisa estar logado para poder compartilhar um nft'})
    return false;
  }
  
  return true;
};
