import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  signUpForm = this.formBuilder.group({
    email: ['', Validators.email],
    username: ['', Validators.required],
    senha: ['', Validators.required],
    confirmaSenha: ['', Validators.required]
  });

  get email(){
    return this.signUpForm.get('email');
  }

  submit(){
    console.log(this.signUpForm);
    this.authService.cadastrar(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
