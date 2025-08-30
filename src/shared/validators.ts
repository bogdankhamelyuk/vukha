// validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(passwordKey = 'password', confirmKey = 'confirm'): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const p = group.get(passwordKey)?.value;
        const c = group.get(confirmKey)?.value;
        if (p == null || c == null) return null;
        return p === c ? null : { passwordMismatch: true };
    };
}

export function minAgeValidator(minYears: number): ValidatorFn {
    return (control) => {
        const v = control.value;
        if (!v) return null;
        const d = new Date(v);
        if (isNaN(d.getTime())) return { invalidDate: true };
        const now = new Date();
        let age = now.getFullYear() - d.getFullYear();
        const m = now.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
        return age >= minYears ? null : { minAge: { required: minYears, actual: age } };
    };
}