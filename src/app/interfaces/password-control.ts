import { FormControl } from "@angular/forms";

export interface PasswordsControls {
    password: FormControl<string>;
    confirm: FormControl<string>;
};