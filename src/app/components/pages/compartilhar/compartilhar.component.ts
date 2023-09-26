import { Component } from '@angular/core';
import { Nft } from 'src/app/iNFT';
import { NftService } from 'src/app/services/nft.service';


@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.css']
})
export class CompartilharComponent {
  titleTopo = 'Crie seu NFT'
  btnText = 'Enviar';

  constructor(private nftService: NftService){}

  onSubmit(nft: Nft){
    this.nftService.post(nft).subscribe();
    console.log(nft);
  }
}
