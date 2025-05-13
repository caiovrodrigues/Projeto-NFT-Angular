import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { PaginatorModule } from 'primeng/paginator';

import { SpinnerComponent } from './shared/components/spinner/spinner.component';

import { LoadingInterceptor } from './loading.interceptor';
import { FirstletterPipe } from './pipes/firstletter.pipe';
import { TokenInjectHttpInterceptor } from './interceptors/TokenInjectHttpInterceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        SpinnerComponent,
        FirstletterPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        //PRIME NG
        ToastModule,
        AvatarModule,
        BadgeModule,
        PaginatorModule,
        //Shared
        SharedModule
    ],
    providers: [
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInjectHttpInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [AppComponent]
 })
export class AppModule { }
