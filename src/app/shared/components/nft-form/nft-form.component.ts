import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Nft } from 'src/app/model/iNFT';

@Component({
    selector: 'app-nft-form',
    templateUrl: './nft-form.component.html',
    styleUrls: ['./nft-form.component.css'],
    standalone: false
})
export class NftFormComponent {
  @Output() onSubmit = new EventEmitter();
  @Output() uploadImage = new EventEmitter();
  
  @Input() btnText = '';
  @Input() title = '';

  @Input() nftEdit?: Nft;

  nftForm!: FormGroup;
  urlUploadMinio = "http://localhost:8080/api/nft/id/upload-picture";

  isAddMode!: boolean;

  ngOnInit(){
    this.nftEdit ? this.isAddMode = true : this.isAddMode = false;

    this.nftForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(null, Validators.required),
      qtd: new FormControl(null, Validators.required),
      img_url: new FormControl(this.nftEdit?.urlMinio),
      upload: new FormControl('')
    })

    if(this.isAddMode == true){
      this.nftForm.patchValue({name: this.nftEdit?.name});
      this.nftForm.patchValue({description: this.nftEdit?.description});
      this.nftForm.patchValue({price: this.nftEdit?.price});
      this.nftForm.patchValue({qtd: this.nftEdit?.qtd});
      this.nftForm.patchValue({img_url: this.nftEdit?.urlMinio});
      this.urlUploadMinio = this.urlUploadMinio.replace("id", `${this.nftEdit?.id}`);
      console.log("url para upload de imagem do nft atual: ", this.urlUploadMinio);
    }
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

  get img_url(){
    return this.nftForm.get("img_url")!;
  }

  submit(){
    if(this.nftForm.invalid){
      return;
    }
    console.log(this.nftForm.value);

    this.onSubmit.emit(this.nftForm.value);
  }

  fileSelected(data: File){
    console.log(data);
    let blob = URL.createObjectURL(data);
    this.nftForm.patchValue({img_url: blob});
  }
}
