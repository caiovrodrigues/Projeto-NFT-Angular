import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {  Observable } from 'rxjs';
import { ResponseCadastroUsuario } from 'src/app/interfaces/ResponseCadastroUsuario';
import { IsLoggedService } from '../isLogged/is-logged.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private isLoggedService = inject(IsLoggedService);

  constructor(){}

  cadastrar(value: Partial<{ email: string | null; username: string | null; senha: string | null; confirmaSenha: string | null; }>): Observable<ResponseCadastroUsuario> {
    return this.http.post<ResponseCadastroUsuario>(`${this.apiUrl}/api/users/criar`, value);
  }

  logar(value: Partial<{ username: string | null; password: string | null; }>): Observable<{id: number, name: string}> {
    return this.http.post<{id: number, name: string}>(`${this.apiUrl}/api/users/auth`, value);
  }

  logout() {
    let token = this.cookieService.check("token");
    if(token){
      this.cookieService.delete("token");
      this.isLoggedService.setUserToken(null);
    }
  }

  checkAuthorizationEdit(idNft: number): Observable<{logado: boolean}>{
    let checkHasToken = this.isLoggedService.checkHasToken();

    if(checkHasToken){
      let { id } = this.isLoggedService.getUserFromToken();
      return this.http.get<{logado: boolean}>(`${this.apiUrl}/api/nft/canedit/nft/${idNft}/usuario/${id}`);
    }

    return new Observable(subscribe => {
      return subscribe.next({logado: false});
    })
  }

}
