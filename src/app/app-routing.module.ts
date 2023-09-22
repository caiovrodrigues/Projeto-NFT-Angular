import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompartilharComponent } from './components/pages/compartilhar/compartilhar.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'compartilhar', component: CompartilharComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
