import { Component, inject } from '@angular/core';
import { NftService } from 'src/app/services/nft/nft.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Nft } from 'src/app/model/iNFT';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-nft-edit',
    templateUrl: './nft-edit.component.html',
    styleUrls: ['./nft-edit.component.css'],
    standalone: false
})
export class NftEditComponent {
  title = 'Edite seu NFT';
  btnText = 'Editar';

  private router = inject(Router);
  private messageService = inject(MessageService);

  nftEdit!: Nft;

  id: number = 0;

  constructor(private nftService: NftService, private route: ActivatedRoute){}

  ngOnInit(){
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.nftService.getNft(this.id).subscribe(nft => this.nftEdit = nft);
  }

  onSubmit(nft: Nft){
    this.nftService.put(nft, this.id).subscribe({
      next: () => {
        this.messageService.add({severity: "success", summary: "Sucesso", detail: "NFT editado com sucesso!"});
        this.router.navigate(["./"]);
      }
    });
    console.log(nft);
  }
}
