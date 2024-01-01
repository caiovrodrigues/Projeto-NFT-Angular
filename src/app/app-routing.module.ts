import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'compartilhar',
    loadChildren: () => import('src/app/modules/compartilhar/compartilhar.module').then(m => m.CompartilharModule)
  },
  {
    path: 'nft/:id', 
    loadChildren: () => import('src/app/modules/nft/nft.module')
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
