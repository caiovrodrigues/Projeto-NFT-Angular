import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Nft } from 'src/app/model/iNFT';
import { NftService } from '../nft/nft.service';

@Injectable({
  providedIn: 'root'
})
export class NftDataTransferService {

  public NFTS_DATA$ = new BehaviorSubject<Nft[] | null>(null);
  public nft_data: Nft[] = [];

  private nftService = inject(NftService);

  
  setNftData(nfts: Array<Nft>){
    this.NFTS_DATA$.next(nfts);
    this.getApiNftData();
  }

  getApiNftData(){
    this.nftService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (response) => {
        this.nft_data = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    });
    return this.nft_data;
  }
}
