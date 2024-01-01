import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartilharComponent } from './components/compartilhar.component';
import { RouterModule } from '@angular/router';

import { COMPARTILHAR_ROUTES } from './compartilhar.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CompartilharComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(COMPARTILHAR_ROUTES),
    //Shared
    SharedModule
  ]
})
export class CompartilharModule { }
