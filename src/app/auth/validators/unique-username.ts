import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
      map((val) => {
        if (val.available) {
          return null;
        }
      }),
      catchError((err) => {
        console.log('err: >> ', err);
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
        //catchError() 要回傳一個 Observable，of() 就是建立一個 new Observanle() 的縮寫
      })
    );
  };
}
