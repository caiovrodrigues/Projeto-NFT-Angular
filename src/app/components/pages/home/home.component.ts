import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { PageableResponseNfts } from 'src/app/model/PageableResponseNfts';
import { Nft } from 'src/app/model/iNFT';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';
import { NftService } from 'src/app/services/nft/nft.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnDestroy{

  destroy$ = new Subject<void>();
  nfts!: Nft[];
  pageableNfts!: PageableResponseNfts;
  first: number = 0;

  pagina!: Params;

  constructor(private nftService: NftService, private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService, private isLoggedService: IsLoggedService){}

  ngOnInit(){
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if(value['token']){
        this.router.navigate(['']);
        this.messageService.add({severity: 'success', summary: 'Autenticado', detail: 'Login realizado com sucesso!'});
        localStorage.setItem("token", value['token']);

        this.isLoggedService.setUsuarioLogado(value['token']);
      }
      console.log(value);
      this.pagina = value;
      this.fetchNfts(value);
      console.log('queryParams emitiu um valor: ', Object.entries(value))
    });
  }

  fetchNfts(params: Params){
    this.nftService.getAllPageable(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.nfts = response.content;
        this.pageableNfts = response;
        this.first = response.pageable.offset;
        console.log('pageableNfTS:', this.pageableNfts);
        
      },
      error: (error) => {
        console.log("Deu algum erro", error);
      }
    });
  }

  onPageChange($event: PaginatorState) {
    this.first = $event.first!;
    console.log($event);
    console.log(this.activatedRoute);
    
    
    if($event.page == this.pageableNfts.pageable.pageNumber){
      return;
    }
    this.router.navigate([''], {queryParams: {page: $event.page}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
