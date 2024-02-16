import { Component, OnInit, inject } from '@angular/core';
import { UserToken } from 'src/app/interfaces/UserToken';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  private authService = inject(AuthService);
  private isLoggedService = inject(IsLoggedService);

  logado!: boolean;
  userFromToken!: UserToken;
  

  ngOnInit(): void {
    this.isLoggedService.isLogadoSubject$.subscribe(value => this.logado = value);
  }

  logout(){
    this.authService.logout();
  }

}
