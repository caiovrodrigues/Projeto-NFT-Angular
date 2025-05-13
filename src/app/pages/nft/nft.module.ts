import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NftComponent } from './components/nft/nft.component';
import { NftEditComponent } from './components/nft-edit/nft-edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NFT_ROUTES } from './nft.routing';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [NftComponent, NftEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(NFT_ROUTES),
    //PrimeNG
    ButtonModule,
    TooltipModule,
    InputTextModule,
    //Shared
    SharedModule
  ]
})
export default class NftModule { }
