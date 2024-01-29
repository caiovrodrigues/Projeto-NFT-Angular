import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  pagina!: Params;

  constructor(private nftService: NftService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    console.log(this.activatedRoute);

    this.activatedRoute.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.pagina = value;
      this.fetchNfts(value)
      // console.log('queryParams emitiu um valor: ', Object.entries(value))
    });

  }

  fetchNfts(teste: Params){
    console.log(teste);
    
    this.nftService.getAllPageable(teste)
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
    if($event.page == this.pageableNfts.pageable.pageNumber){
      return;
    }
    this.router.navigate([''], {queryParams: {page: $event.page}});

    // console.log(this.activatedRoute);
    // this.fetchNfts(this.pagina);
    // this.nftService.getAllPageable(this.pagina)
    // .pipe(takeUntil(this.destroy$))
    // .subscribe({
    //   next: (response) => {
    //     this.nfts = response.content;
    //     this.pageableNfts = response;
    //   },
    //   error: (error) => {
    //     console.log("Deu algum erro", error);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
