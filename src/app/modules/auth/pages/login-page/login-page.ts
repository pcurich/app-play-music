import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage implements OnInit {
  errorSession: boolean = false
  formLogin: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new UntypedFormGroup(
      {
        email: new UntypedFormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new UntypedFormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value
    // this.authService.sendCredentials(email, password)
    //   //TODO: 200 <400
    //   .subscribe(responseOk => { //TODO: Cuando el usuario credenciales Correctas ✔✔
    //     console.log('Session iniciada correcta', responseOk);
    //     const { tokenSession, data } = responseOk
    //     this.cookie.set('token', tokenSession, 4, '/') //TODO:📌📌📌📌
    //     this.router.navigate(['/', 'tracks'])
    //   },
    //     err => {//TODO error 400>=
    //       this.errorSession = true
    //       console.log('⚠⚠⚠⚠Ocurrio error con tu email o password');
    //     })

  }

}
