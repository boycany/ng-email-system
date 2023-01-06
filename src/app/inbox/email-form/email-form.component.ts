import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent {
  emailForm : FormGroup;
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter()

  constructor() {}

  ngOnInit() {
    // console.log('this.email :>> ', this.email);

    const { from, to, subject, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    })
  }

  onSubmit(){
    console.log('this.emailForm :>> ', this.emailForm);
    if(this.emailForm.invalid){
      return
    }

    // console.log('emailForm :>> ', this.emailForm.value);
    // console.log('this.emailForm.getRawValue() :>> ', this.emailForm.getRawValue());

    this.emailSubmit.emit(this.emailForm.value)
  }
}
