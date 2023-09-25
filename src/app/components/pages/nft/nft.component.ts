import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Nft } from 'src/app/iNFT';
import { NftService } from 'src/app/services/nft.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent {
  nft!: Nft;

  constructor(private nftService: NftService, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    
    this.nftService.getNft(id).subscribe({
      next: (nft) => {
        this.nft = nft;
      },
      error: (error) => {
        console.log('Algo deu errado', error);
      }
    });
  }

  deleteNft(nftt: Nft){
    this.nftService.delete(nftt).subscribe();
    this.messageService.add("Nft excluído com sucesso!");
  }
}

