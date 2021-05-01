import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword)
    console.log(password.value, confirmPassword.value);

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { matchError: true };
};
