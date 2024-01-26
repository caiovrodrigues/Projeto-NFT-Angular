import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nft } from 'src/app/interfaces/iNFT';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';
import { NftService } from 'src/app/services/nft/nft.service';


@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.css']
})
export class CompartilharComponent {
  title = 'Crie seu NFT';
  btnText = 'Criar';

  private isLoggedService = inject(IsLoggedService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  constructor(private nftService: NftService){}

  onSubmit(nft: Nft){
    let checkHasToken = this.isLoggedService.checkHasToken();

    if(!checkHasToken){
      this.router.navigate(['auth']);
      this.messageService.add({severity: 'info', summary: 'Atenção', detail: 'Você precisa estar logado para poder compartilhar um nft'});
      return;
    }

    let userFromToken = this.isLoggedService.getUserFromToken();

    this.nftService.post(nft, userFromToken.id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Parabéns', detail: 'Seu novo NFT foi compartilhado!'})
        this.router.navigate(['']);
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao compartilhar seu nft'})
    });
  }
}
