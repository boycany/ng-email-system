import { FormGroup, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    // validate 函式傳進來的參數決定看是要驗證 FormGroup 還是 FormControl 類型，
    // 傳進 Abstract 類型的話，則是兩種都接受

    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
