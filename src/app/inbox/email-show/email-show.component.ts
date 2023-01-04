import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { EmailService } from '../email.service';
import { Email } from '../email'

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {
  email: Email

  constructor(
    private route: ActivatedRoute, 
    private emailService: EmailService){
      // console.log('this.route.snapshot.data: >> ', this.route.snapshot.data);
      this.email = this.route.snapshot.data['mail']

      this.route.data.subscribe(({ email }) => {
        this.email = email
      })
  }

  ngOnInit(){
    /*
    1st way
    // console.log('Activated Route: >> ', this.route)
    console.log('this.route.snapshot :>> ', this.route.snapshot);

    this.route.params.subscribe((snapshot) => {
      console.log('snapshot :>> ', snapshot);  
      //這裡的 key 值，跟 inbox-routing 設定的參數名稱有關，因為 route 設定為 :id，所以 snapshot 就是 { id: xXXxxx }
    })
    */

    /*
    2nd way
    // this.route.params.pipe(
    //   switchMap(({ id })=>{
    //     return this.emailService.getEmail(id)
    // })).subscribe(email => {
    //     this.email = email
    // })
    */
  }
}
