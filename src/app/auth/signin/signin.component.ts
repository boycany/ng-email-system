import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, SigninCredentials } from '../auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService){}

  onSubmit(){
    if (this.authForm.invalid) {
      return;
    }
    console.log('this.authForm.value :>> ', this.authForm.value);

    this.authService
      .signin(this.authForm.value as SigninCredentials)
      .subscribe({
        next: (response) => {
          console.log('signin response: >> ', response)
        },
        error: ({error}) => {
          // console.log('signin err :>> ', err);
          if(error.username || error.password){
            this.authForm.setErrors({ credentials: true })
          }
        }
      })
  }
}
