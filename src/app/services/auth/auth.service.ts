import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, tap, timeout } from 'rxjs';
import { ResponseCadastroUsuario } from 'src/app/interfaces/ResponseCadastroUsuario';
import { NftService } from '../nft/nft.service';
import { Nft } from 'src/app/interfaces/iNFT';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080';
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  private isLogadoSubject = new BehaviorSubject<boolean>(false);
  isLogadoSubject$ = this.isLogadoSubject.asObservable();

  constructor(){
    let check = this.cookieService.check("token");
    check ? this.isLogadoSubject.next(true) : this.isLogadoSubject.next(false);
  }

  setLogadoSubject(isLogado: boolean){
    console.log("setLogadoSubject do authService, valor do subject logado: ", this.isLogadoSubject.value);
    this.isLogadoSubject.next(isLogado);
  }

  getIdUsuarioLogado(): number{
    return Number(this.cookieService.get("token"));
  }

  cadastrar(value: Partial<{ email: string | null; username: string | null; senha: string | null; confirmaSenha: string | null; }>): Observable<ResponseCadastroUsuario> {
    return this.http.post<ResponseCadastroUsuario>(`${this.apiUrl}/api/users`, value);
  }

  logar(value: Partial<{ username: string | null; password: string | null; }>): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/api/users`, value);
  }

  logout() {
    let token = this.cookieService.check("token");
    if(token){
      this.cookieService.delete("token");
      this.setLogadoSubject(false);
    }
  }

  usuarioLogado(): boolean{
    console.log('passou pelo usuarioLogado');
    return this.cookieService.check("token");
  
  }

  checkAuthorizationEdit(idNft: number): Observable<{logado: boolean}>{
    let idUser = this.getIdUsuarioLogado();
    return this.http.get<{logado: boolean}>(`${this.apiUrl}/api/nft/canedit/nft/${idNft}/usuario/${idUser}`);
  }

}
