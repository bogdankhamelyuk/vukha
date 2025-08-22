import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiTextfield,
  TuiTitle,
  TuiButton,
  TuiAppearance,
  TuiIcon,
  TuiHint,
  TuiLabel,
  TuiError,
  TuiLink
} from '@taiga-ui/core';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiTextarea, TuiPassword, TuiCheckbox, TuiInputDate, TuiFieldErrorPipe, TuiInputPhone } from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TUI_IS_IOS } from '@taiga-ui/cdk';


@Component({
  selector: 'app-signup',
  imports: [
    AsyncPipe,
    TuiForm,
    ReactiveFormsModule,
    TuiHeader,
    TuiCardLarge,
    TuiTextfield,
    TuiCheckbox,
    TuiTitle,
    TuiButton,
    TuiLabel,
    TuiHint,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputPhone,
    TuiIcon,
    TuiInputDate,
    TuiLink,
    TuiPassword,
    TuiTextarea,
    TuiAppearance
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupForm {
  protected readonly isIos = inject(TUI_IS_IOS);
  constructor(private router: Router) { }

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9+\-\s()]*$/)
    ]),
    adresse: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required]),
    agb: new FormControl(false, Validators.requiredTrue)
  });

  protected get pattern(): string | null {
    return this.isIos ? '+[0-9-]{1,20}' : null;
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
    console.log("ok")
  }

  navigateToSignUp() {
    this.router.navigate(['/login']);
  }

  loginWithGoogle() {
    // Implement Google login logic here
  }
}