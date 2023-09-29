import { Component } from '@angular/core';
import { NftService } from 'src/app/services/nft.service';
import { ActivatedRoute } from '@angular/router';
import { Nft } from 'src/app/iNFT';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-nft-edit',
  templateUrl: './nft-edit.component.html',
  styleUrls: ['./nft-edit.component.css']
})
export class NftEditComponent {
  title = 'Edite seu NFT';
  btnText = 'Editar';

  nftEdit!: Nft;

  id: number = 0;

  constructor(private nftService: NftService, private route: ActivatedRoute, private messageService: MessageService){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(this.id);

    this.nftService.getNft(this.id).subscribe(nft => this.nftEdit = nft);
  }

  onSubmit(nft: Nft){
    this.nftService.put(nft, this.id).subscribe();
    this.messageService.add(`${nft.name} alterado com sucesso`);
    console.log(nft);
  }
}
