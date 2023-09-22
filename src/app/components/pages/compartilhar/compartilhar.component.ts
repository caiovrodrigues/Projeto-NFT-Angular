import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-compartilhar',
  templateUrl: './compartilhar.component.html',
  styleUrls: ['./compartilhar.component.css']
})
export class CompartilharComponent {
  cardName: string = '';
  cardPrice: number = 0;
  cardQtd: number = 0;

  nftForm!: FormGroup;

  ngOnInit(){
    this.nftForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl(''),
      qtd: new FormControl(''),
    })
  }

  get name(){
    return this.nftForm.get("name")!;
  }

  submit(){
    if(this.nftForm.invalid){
      return;
    }
    console.log('Deu certo');
    console.log(this.nftForm.value);
  }
}
