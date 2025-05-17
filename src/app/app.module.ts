import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule,  } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { PaginatorModule } from 'primeng/paginator';

import { SpinnerComponent } from './shared/components/spinner/spinner.component';

import { LoadingInterceptor } from './loading.interceptor';
import { FirstletterPipe } from './pipes/firstletter.pipe';
import { TokenInjectHttpInterceptor } from './interceptors/TokenInjectHttpInterceptor';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        FirstletterPipe
    ],
    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //Components
    HomeComponent,
    //PRIME NG
    ToastModule,
    AvatarModule,
    BadgeModule,
    PaginatorModule,
    ToggleSwitchModule,
    ButtonModule,
    //Shared
    SharedModule,
    HeaderComponent
],
    providers: [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInjectHttpInterceptor, multi: true },
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.my-app-dark'
                }
            }
        }),
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent]
 })
export class AppModule { }
