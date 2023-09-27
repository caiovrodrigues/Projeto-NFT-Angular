import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Nft } from 'src/app/iNFT';

@Component({
  selector: 'app-nft-form',
  templateUrl: './nft-form.component.html',
  styleUrls: ['./nft-form.component.css']
})
export class NftFormComponent {
  @Output() onSubmit = new EventEmitter();
  @Input() btnText = '';
  @Input() titleTopo = '';
  @Input() nftEdit?: Nft;

  nftForm!: FormGroup;

  ngOnInit(){
    this.nftForm = new FormGroup({
      name: new FormControl(this.nftEdit ? this.nftEdit.name : '', [Validators.required]),
      description: new FormControl(this.nftEdit ? this.nftEdit.description : ''),
      price: new FormControl((this.nftEdit?.price), Validators.required),
      qtd: new FormControl(this.nftEdit?.qtd, Validators.required),
    })
  }

  get name(){
    return this.nftForm.get("name")!;
  }

  get qtd(){
    return this.nftForm.get("qtd")!;
  }

  get price(){
    return this.nftForm.get("price")!;
  }

  submit(){
    if(this.nftForm.invalid){
      return;
    }
    this.onSubmit.emit(this.nftForm.value);
  }

  fileSelected(){
    const file = document.getElementById('inputFile') as HTMLInputElement;
    
    const imgBlob = URL.createObjectURL(file.files![0]);

    const imgModel = document.getElementById("imgModel") as HTMLImageElement;
    imgModel.src = imgBlob;
    console.log(imgBlob);
    
    console.log('Carregou uma imagem');
    
  }
}
