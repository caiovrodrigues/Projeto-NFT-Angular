import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { canAccessAuthGuard } from './guards/can-access-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'compartilhar',
    loadChildren: () => import('src/app/modules/compartilhar/compartilhar.module').then(m => m.CompartilharModule),
    canActivate: [authGuard],
  },
  {
    path: 'nft/:id', 
    loadChildren: () => import('src/app/modules/nft/nft.module')
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/modules/login/login.module').then(modules => modules.LoginModule),
    canActivate: [canAccessAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
