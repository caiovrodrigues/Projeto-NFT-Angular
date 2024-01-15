import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  authService = inject(AuthService);

  logado!: boolean;

  ngOnInit(): void {
    this.authService.isLogadoSubject$.subscribe(value => this.logado = value);
  }

  logout(){
    this.authService.logout();
  }

}
