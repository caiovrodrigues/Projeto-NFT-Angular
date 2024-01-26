import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Nft } from 'src/app/interfaces/iNFT';

@Component({
  selector: 'app-nft-form',
  templateUrl: './nft-form.component.html',
  styleUrls: ['./nft-form.component.css']
})
export class NftFormComponent {
  @Output() onSubmit = new EventEmitter();
  
  @Input() btnText = '';
  @Input() title = '';

  @Input() nftEdit?: Nft;

  nftForm!: FormGroup;

  isAddMode!: boolean;

  ngOnInit(){
    this.nftEdit ? this.isAddMode = true : this.isAddMode = false;

    this.nftForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(null, Validators.required),
      qtd: new FormControl(null, Validators.required),
      img_url: new FormControl(this.nftEdit?.img_url)
    })

    if(this.isAddMode == true){
      this.nftForm.patchValue({name: this.nftEdit?.name});
      this.nftForm.patchValue({description: this.nftEdit?.description});
      this.nftForm.patchValue({price: this.nftEdit?.price});
      this.nftForm.patchValue({qtd: this.nftEdit?.qtd});
      this.nftForm.patchValue({img_url: this.nftEdit?.img_url});
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

  fileSelected(data:any){
    console.log('Arquivo upado');
    
    console.log('Upload: ', data);
    
    const imgBlob = URL.createObjectURL(data.files![0]);

    this.nftForm.patchValue({img_url: imgBlob});

    const imgModel = document.getElementById("imgModel") as HTMLImageElement;
    imgModel.src = imgBlob;
    console.log(imgBlob);

    console.log('Carregou uma imagem');

  }
}
