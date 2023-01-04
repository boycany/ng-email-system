import { Component } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent {
  emails = []

  constructor(private emailService: EmailService){}

  ngOnInit(){
    this.emailService.getEmails().subscribe((emails)=>{
      console.log('emails :>> ', emails)
      this.emails = emails
    })
  }
}
