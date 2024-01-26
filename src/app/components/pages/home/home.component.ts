import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatorState } from 'primeng/paginator';
import { Subject, takeUntil } from 'rxjs';
import { PageableResponseNfts } from 'src/app/interfaces/PageableResponseNfts';
import { Nft } from 'src/app/interfaces/iNFT';
import { NftService } from 'src/app/services/nft/nft.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{

  destroy$ = new Subject<void>();
  nfts!: Nft[];
  pageableNfts!: PageableResponseNfts;

  constructor(private nftService: NftService){}

  ngOnInit(){
    this.fetchNfts();
  }

  fetchNfts(){
    this.nftService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.nfts = response.content;
        this.pageableNfts = response;
      },
      error: (error) => {
        console.log("Deu algum erro", error);
      }
    });
  }

  onPageChange($event: PaginatorState) {
    console.log($event);
    if($event.page == this.pageableNfts.pageable.pageNumber){
      return;
    }
    this.nftService.getAllPageable($event.page!)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.nfts = response.content;
        this.pageableNfts = response;
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
