import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequestCadastro } from 'src/app/interfaces/RequestCadastro';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private messageService = inject(MessageService);
  private router = inject(Router);

  ngOnInit(){}

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email(){
    return this.signUpForm.get('email')!;
  }

  get username(){
    return this.signUpForm.get('username')!;
  }

  get password(){
    return this.signUpForm.get('password')!;
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')!;
  }

  submit(){
    console.log(this.signUpForm);
    if(this.signUpForm.valid){
      this.authService.cadastrar(this.signUpForm.value as RequestCadastro).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Usuário logado com sucesso! Faça seu login agora mesmo`});
          this.router.navigate(['auth'])
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Houve um erro', detail: err.error.message});
        }
      });
    }
  }
}
