import { Component, inject } from '@angular/core';
import { Nft } from 'src/app/interfaces/iNFT';
import { NftDataTransferService } from 'src/app/services/nft data transfer/nft-data-transfer.service';
import { NftService } from 'src/app/services/nft/nft.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // nfts$!: Observable<Nft[]>;
  nfts!: Nft[];

  private nftDataTransfer = inject(NftDataTransferService);
  constructor(private nftService: NftService){}

  ngOnInit(){
    
    this.nftService.getAll().subscribe({
      next: (nfts) => {
        this.nfts = nfts;
        this.nftDataTransfer.NFTS_DATA$.next(nfts);
      },
      error: (error) => {
        console.log("Deu algum erro", error);
      }
    });

    // this.nfts$ = this.nftService.getAll();
  }

}
