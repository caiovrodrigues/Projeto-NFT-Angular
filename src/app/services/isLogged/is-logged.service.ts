import { Injectable, computed, signal } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserLogadoInfo } from 'src/app/interfaces/UserLogadoInfo';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {

  private isLogadoSignal = signal(0);
  private computed = computed(() => console.log(this.isLogadoSignal()));
  

  private issLogadoSubject = new BehaviorSubject<UserLogadoInfo | null>(null);
  public issLogadoSubject$ = this.issLogadoSubject.asObservable();

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
      this.setIsLogadoSubject(decodedToken);
      this.isLogadoSubject.next(true);
      // this.idLogado.next(decodedToken && decodedToken.id ? decodedToken.id : null);
      this.usernameLogado.next(decodedToken!.sub!);
    }
  }

  setIsLogadoSubject(decodedToken: JwtPayload | null) {
    // this.issLogadoSubject.next()
  }

  setUsuarioLogado(token: string | null){
    if(token){
      let decodedToken = this.getTokenDecoded(token);
      // decodedToken && decodedToken.id ? this.idLogado.next(decodedToken.id) : null;
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
