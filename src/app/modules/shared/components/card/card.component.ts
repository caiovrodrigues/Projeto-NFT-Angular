import { Component, Input } from '@angular/core';
import { Nft } from 'src/app/iNFT';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() nft?: Nft;
  @Input() imgFull: boolean = false;

  ngOnInit(){
    console.log('imgfull ', this.imgFull)
  }
}
