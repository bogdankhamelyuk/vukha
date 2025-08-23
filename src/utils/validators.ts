import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (!password?.value || !passwordConfirm?.value) {
        return null;
    }
    if (password && passwordConfirm && password.value !== passwordConfirm.value) {
        return { passwordMismatch: true };
    }
    return null;
};