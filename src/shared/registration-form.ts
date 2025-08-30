import { matchPasswordsValidator, minAgeValidator } from './validators';
import { UserBase } from "../app/interfaces/user-base";
import { NonNullableFormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { PasswordsControls } from '../app/interfaces/password-control';

// shared: base controls dictionary
function createUserBaseControls(fb: NonNullableFormBuilder, initial: Partial<UserBase> = {}) {
    return {
        name: fb.control(initial.name ?? '', Validators.required),
        birthDate: fb.control(initial.birthDate ?? '', Validators.required),
        phoneNumber: fb.control(initial.phoneNumber ?? '', [
            Validators.required,
            Validators.pattern(/^[0-9+\-\s()]*$/),
        ]),
        email: fb.control(initial.email ?? '', [Validators.required, Validators.email]),
    } as const;
}

// Registration form (includes passwords + agb)
interface RegistrationControls extends ReturnType<typeof createUserBaseControls> {
    passwords: FormGroup<PasswordsControls>;
    agb: FormControl<boolean>;
};

export function createRegistrationForm(
    fb: NonNullableFormBuilder,
    initial = {}
) {
    const base = createUserBaseControls(fb, initial);
    return fb.group<RegistrationControls>({
        ...base,
        passwords: fb.group<PasswordsControls>(
            {
                password: fb.control('', [Validators.required, Validators.minLength(6)]),
                confirm: fb.control('', [Validators.required]),
            },
            { validators: [matchPasswordsValidator()] }
        ),
        agb: fb.control(false, Validators.requiredTrue),
    });
}

// Profile form (only base fields)
export function createProfileForm(
    fb: NonNullableFormBuilder,
    initial = {}
) {
    const base = createUserBaseControls(fb, initial);
    return fb.group<typeof base>(base);
}