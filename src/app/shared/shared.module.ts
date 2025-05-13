import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { LimitenamePipe } from 'src/app/pipes/limitename.pipe';
import { CardComponent } from './components/card/card.component';
import { NftFormComponent } from './components/nft-form/nft-form.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    NftFormComponent,
    CardComponent,
    LimitenamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //PrimeNG
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    TextareaModule
  ],
  exports: [NftFormComponent, CardComponent, TextareaModule]
})
export class SharedModule { }
