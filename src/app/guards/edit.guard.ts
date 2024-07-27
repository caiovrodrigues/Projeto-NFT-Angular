import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

export const editGuard: CanActivateFn = (route, state) => {
  let idNft = Number(route.params['id']);

  const router = inject(Router);
  const messageService = inject(MessageService);
  const authService = inject(AuthService);

  console.log(state);
  

  return new Observable(subscribe => {
    authService.checkAuthorizationEdit(idNft).subscribe({
      next: (response) => {
        if(response.logado){
          subscribe.next(response.logado);
        }else{
          subscribe.next(response.logado);
          router.navigate([state.url.substring(0, 6)]);
          messageService.add({severity: "warn", summary: "Erro ao acessar rota de edição", detail: "Você não é dono do nft que está tentando editar"});
        }
      },
      error: (response) => {
        console.log(response);
        if(response.status === 403){
          router.navigate([state.url.substring(0, 6)]);
          messageService.add({severity: "warn", summary: "Erro ao acessar rota de edição", detail: "Você não é dono do nft que está tentando editar"});
        }
        subscribe.next(false);
      }
    })
  });
  
};
