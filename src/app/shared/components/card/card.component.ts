import { Component, Input } from '@angular/core';
import { Nft } from 'src/app/model/iNFT';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  urlBaseMinio = "http://localhost:9000/nft"
  @Input({required: true}) nft?: Nft;
  @Input() imgFull: boolean = false;

  ngOnInit(){
    console.log(this.nft);
    
  }

}
