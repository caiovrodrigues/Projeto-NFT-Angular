import { Component, inject } from '@angular/core';
import { Nft } from 'src/app/interfaces/iNFT';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NftService } from 'src/app/services/nft/nft.service';


@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.css']
})
export class CompartilharComponent {
  title = 'Crie seu NFT';
  btnText = 'Criar';

  private authService = inject(AuthService);

  constructor(private nftService: NftService){}

  onSubmit(nft: Nft){
    this.nftService.post(nft, this.authService.getIdUsuarioLogado()).subscribe();
    console.log(nft);
  }
}
