import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserToken } from 'src/app/interfaces/UserToken';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {

  private cookieService = inject(CookieService);

  private isLogadoSubject = new BehaviorSubject<boolean>(false);
  isLogadoSubject$ = this.isLogadoSubject.asObservable();

  userFromToken$ = new BehaviorSubject<UserToken | null>(null);

  constructor() { 
    let hasToken = this.checkHasToken();
    if(hasToken){
      let userFromToken = this.getUserFromToken();
      this.setUserToken(userFromToken);
    }
  }

  //Retorna um boolean se existe um token nos cookies
  checkHasToken(){
    return this.cookieService.check("token");
  }

  //Retorna o usuário parsed do cookie
  getUserFromToken(): UserToken{
    let token = this.cookieService.get("token");
    let userFromToken = JSON.parse(token);
    return userFromToken;
  }

  //Seta um usuário ao cookie e atualiza seus observables
  setUserToken(userToken: UserToken | null){
    if(userToken != null){
      this.isLogadoSubject.next(true);
      this.cookieService.set("token", JSON.stringify(userToken));
      this.userFromToken$.next(userToken);
      return;
    }

    this.isLogadoSubject.next(false);
    this.userFromToken$.next(userToken);
    this.cookieService.delete("token");
  }
}
