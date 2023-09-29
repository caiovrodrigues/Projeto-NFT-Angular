import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CompartilharComponent } from './components/pages/compartilhar/compartilhar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NftComponent } from './components/pages/nft/nft.component';
import { MessageComponent } from './components/message/message.component';
import { NftFormComponent } from './components/nft-form/nft-form.component';
import { NftEditComponent } from './components/pages/nft-edit/nft-edit.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CompartilharComponent,
    NftComponent,
    MessageComponent,
    NftFormComponent,
    NftEditComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
