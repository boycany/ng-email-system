import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.signedin$.pipe(
      skipWhile((value) => value === null),  
      take(1),
      tap((authenticated) => {
        if(!authenticated){
          this.router.navigateByUrl('/')
        }
      })
      //從 AuthService 那邊接收 signedin$ 的 status, skip 掉 null 的值, 取 true 或 false
      //因為 AuthGuard 會在 app.component 建立之前就先執行，所以 AuthService 那邊才需將 signedin$ 設為 null  
    );
  }
}
