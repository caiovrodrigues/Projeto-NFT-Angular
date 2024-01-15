import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTES } from './login.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LOGIN_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    //PrimeNG
    DividerModule,
    ButtonModule,
    InputTextModule
  ]
})
export class LoginModule { }
