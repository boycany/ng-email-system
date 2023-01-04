import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Email } from './email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(private emailService: EmailService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot){
    // console.log('route :>> ', route);
    const { id } = route.params

    return this.emailService.getEmail(id).pipe(
      catchError(()=>{
        this.router.navigateByUrl('/inbox/not-found')
        return EMPTY
      })

    )
  }
}

/**
 * 用 Resolver 來解決 email-show.component 第一次 render 時，抓到 email 為 undefined 會有錯誤訊息。
 * 這樣就不用 在 email-show.component.html 下 *ngIf="email" 來解
 */