import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Nft } from 'src/app/iNFT';
import { NftService } from 'src/app/services/nft.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // nfts$!: Observable<Nft[]>;
  nfts!: Nft[];

  constructor(private nftService: NftService){}

  ngOnInit(){
    console.log("Componente iniciou");
    
    this.nftService.getAll().subscribe({
      next: (nfts) => {
        this.nfts = nfts;
      },
      error: (error) => {
        console.log("Deu algum erro", error);
      }
    });

    // this.nfts$ = this.nftService.getAll();
  }

}
