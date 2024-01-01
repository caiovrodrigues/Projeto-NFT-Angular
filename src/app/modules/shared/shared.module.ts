import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { NftFormComponent } from './components/nft-form/nft-form.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    NftFormComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //PrimeNG
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    FileUploadModule
  ],
  exports: [NftFormComponent, CardComponent]
})
export class SharedModule { }
