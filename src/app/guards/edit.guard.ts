import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MessageService } from 'primeng/api';

export const editGuard: CanActivateFn = (route, state) => {
  let idNft = Number(route.params['id']);

  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  console.log(route);
  console.log(state);

  return new Promise((resolve, reject) => {
    authService.checkAuthorizationEdit(idNft).subscribe({
      next: (response) => {
        if(response.logado){
          console.log("Voce foi autorizado pela requisição: ", response);
          
          resolve(response.logado);
        }else{
          reject("Você não é owner do nft para editá-lo");
          router.navigate([state.url.substring(0, 6)]);
          messageService.add({severity: "error", summary: "Erro ao acessar rota de edição", detail: "Você não é dono do nft que está tentando editar"});
        }
      }
      })
    });


  
};
