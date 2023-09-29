import { Component } from '@angular/core';
import { Nft } from 'src/app/iNFT';
import { MessageService } from 'src/app/services/message.service';
import { NftService } from 'src/app/services/nft.service';


@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.css']
})
export class CompartilharComponent {
  title = 'Crie seu NFT';
  btnText = 'Criar';

  constructor(private nftService: NftService, private messageService: MessageService){}

  onSubmit(nft: Nft){
    this.nftService.post(nft).subscribe();
    this.messageService.add(`Parabéns, ${nft.name} foi criado com sucesso!`);
    console.log(nft);
  }
}
