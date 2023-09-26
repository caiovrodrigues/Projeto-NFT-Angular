import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompartilharComponent } from './components/pages/compartilhar/compartilhar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NftComponent } from './components/pages/nft/nft.component';
import { NftEditComponent } from './components/pages/nft-edit/nft-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compartilhar', component: CompartilharComponent },
  { path: 'nft/:id', component: NftComponent },
  { path: 'editar/nft/:id', component: NftEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
