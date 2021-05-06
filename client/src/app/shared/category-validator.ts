import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const categoryValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const name = control.get('filterCategoriesName');
  const img = control.get('filterCategoriesImg');

  return name && img && name.value && !img.value
    ? { validationError: true }
    : null;
};
