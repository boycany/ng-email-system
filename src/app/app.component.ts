import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'email-client';
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  /**
   * 另一個寫法 >>
   * 這樣 template 的 code 就可以直接讀取 signedin 這個 property，不需要再經過 async pipe
   *
   * signedin = false
   *
   * constructor(private authService: AuthService){}
   *
   * ngOnInit(){
   *  this.authService.signedin$.subscribe(signedin=>{
   *    this.signedin = signedin
   *  })
   * }
   *
   */

  ngOnInit(){
    this.authService.checkAuth().subscribe()
    // setTimeout(()=>{
    //   this.authService.signout().subscribe()
    // }, 5000)
  }
}
