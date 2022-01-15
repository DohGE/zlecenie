import { ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordsCompareValidator(): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const password = formGroup.controls['password'];
    const repeatedPassword = formGroup.controls['repeatedPassword'];
    if (password.value !== repeatedPassword.value) {
      repeatedPassword.setErrors({
        ...repeatedPassword.errors,
        mustBeSame: true,
      });
    } else {
      repeatedPassword.clearValidators();
    }
    return;
  };
}
