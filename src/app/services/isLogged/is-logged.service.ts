import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {

  private isLogadoSubject = new BehaviorSubject<boolean>(false);
  public isLogadoSubject$ = this.isLogadoSubject.asObservable();

  public idLogado = new BehaviorSubject<number | null>(null);
  public idLogado$ = this.idLogado.asObservable();

  public usernameLogado = new BehaviorSubject<string | null>(null);
  public usernameLogado$ = this.usernameLogado.asObservable();

  constructor() {
    if(this.checkHasToken()){
      let token = this.getToken();
      let decodedToken = this.getTokenDecoded(token!);
      this.isLogadoSubject.next(true);
      this.idLogado.next(decodedToken!.id!);
      this.usernameLogado.next(decodedToken!.sub!);
    }
  }

  setUsuarioLogado(token: string | null){
    if(token){
      let decodedToken = this.getTokenDecoded(token);
      decodedToken ? this.idLogado.next(decodedToken.id!) : null;
      this.isLogadoSubject.next(true);
      this.usernameLogado.next(decodedToken!.sub!);
    }else{
      this.isLogadoSubject.next(false);
      this.idLogado.next(null);
      this.usernameLogado.next(null);
    }
  }

  //Retorna um boolean se existe o token no local storage
  checkHasToken(): boolean{
    let hasToken = localStorage.getItem("token");
    return hasToken ? true : false;
  }

  getToken(){
    return localStorage.getItem("token");
  }

  removeCredentials(){
    this.idLogado.next(null);
  }

  getTokenDecoded(token: string){
    let decodedToken = jwtDecode(token);
    return decodedToken ? decodedToken : null;
  }

}
