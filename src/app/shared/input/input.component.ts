import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() inputType: string;
  @Input() label: string;
  @Input() fieldId: string;
  @Input() control: FormControl<any>;
  @Input() controlType = "input"

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
    /**
     * touched: User clicked into then out of a field.
     * dirty: User has changed the value of this field.
     */
  }
}
