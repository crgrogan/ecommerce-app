import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { categoryValidator } from './category-validator';

@Directive({
  selector: '[appCategoryValid]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FilterCategoryValidatorDirective,
      multi: true,
    },
  ],
})
export class FilterCategoryValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return categoryValidator(control);
  }
}
