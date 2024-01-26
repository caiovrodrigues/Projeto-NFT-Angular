import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IsLoggedService } from 'src/app/services/isLogged/is-logged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private isLoggedService = inject(IsLoggedService);
  private cookieService = inject(CookieService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username(){
    return this.loginForm.get('username')!;
  }

  get password(){
    return this.loginForm.get('password')!;
  }

  logar(){
    if(this.loginForm.invalid){
      console.log(this.loginForm);
      this.username.markAsDirty();
      this.password.markAsDirty();
      return;
    }

    this.authService.logar(this.loginForm.value)
    .subscribe({
      next: (response) => {
        console.log("Deu certo: ", response);
        this.router.navigate(['']);
        this.messageService.add({severity: 'success', summary: 'Autenticado', detail: 'Login realizado com sucesso!'});
        
        this.isLoggedService.setUserToken(response);

        console.log("token do cookie: ", JSON.parse(this.cookieService.get("token")));
        
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Houve um erro', detail: err.error.message});
        console.log(err);
      }
    });
  }

}
