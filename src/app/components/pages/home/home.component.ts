import { Component, OnDestroy, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Nft } from 'src/app/interfaces/iNFT';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';
import { NftDataTransferService } from 'src/app/services/nft data transfer/nft-data-transfer.service';
import { NftService } from 'src/app/services/nft/nft.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{

  destroy$ = new Subject<void>();
  nfts!: Nft[];

  constructor(private nftService: NftService){}

  ngOnInit(){
    
    this.nftService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (nfts) => {
        this.nfts = nfts;
      },
      error: (error) => {
        console.log("Deu algum erro", error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
