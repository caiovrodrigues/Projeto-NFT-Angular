import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {  Observable } from 'rxjs';
import { ResponseCadastroUsuario } from 'src/app/model/ResponseCadastroUsuario';
import { IsLoggedService } from '../isLogged/is-logged.service';
import { RequestLogin } from 'src/app/model/RequestLogin';
import { RequestCadastro } from 'src/app/model/RequestCadastro';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);
  private isLoggedService = inject(IsLoggedService);

  constructor(){}

  cadastrar(value: RequestCadastro): Observable<ResponseCadastroUsuario> {
    return this.http.post<ResponseCadastroUsuario>(`${this.apiUrl}/api/users/register`, value);
  }

  logar(value: RequestLogin): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/api/users/login`, value);
  }

  logout() {
    if(this.isLoggedService.checkHasToken()){
      localStorage.removeItem("token");
      this.isLoggedService.setUsuarioLogado(null);
    }
  }

  checkAuthorizationEdit(idNft: number): Observable<{logado: boolean}>{
    return this.http.get<{logado: boolean}>(`${this.apiUrl}/api/nft/${idNft}/canedit`);
  }

}
