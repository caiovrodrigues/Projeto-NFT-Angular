import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Nft } from 'src/app/model/iNFT';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';
import { NftService } from 'src/app/services/nft/nft.service';


@Component({
    selector: 'app-compartilhar',
    templateUrl: './compartilhar.component.html',
    styleUrls: ['./compartilhar.component.css'],
    standalone: false
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

    this.nftService.post(nft).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['nft', response.id]);        
        this.messageService.add({severity: 'success', summary: 'Parabéns', detail: `Seu NFT '${response.name}' foi compartilhado com sucesso`});
      },
      error: () => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Algo de errado aconteceu, tente novamente'})
    })
  }
}
