import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
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
import {
  TuiPassword, TuiInputDate, tuiInputPhoneInternationalOptionsProvider,
  TuiSortCountriesPipe,
} from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TUI_IS_IOS } from '@taiga-ui/cdk';

import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { type TuiCountryIsoCode } from '@taiga-ui/i18n';

import { getCountries } from 'libphonenumber-js';
import { defer } from 'rxjs';
import { passwordMatchValidator } from '../../../utils/validators';

@Component({
  selector: 'app-signup',
  imports: [
    AsyncPipe,
    TuiForm,
    ReactiveFormsModule,
    TuiHeader,
    TuiCardLarge,
    TuiTextfield,
    TuiTitle,
    TuiButton,
    TuiLabel,
    TuiHint,
    TuiError,
    TuiIcon,
    TuiInputDate,
    TuiLink,
    TuiPassword,
    TuiAppearance,
    AsyncPipe,
    TuiButton,
    TuiInputPhoneInternational,
    TuiSortCountriesPipe,
    TuiTextfield,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiInputPhoneInternationalOptionsProvider({
      metadata: defer(async () =>
        import('libphonenumber-js/max/metadata').then((m) => m.default),
      ),
    }),
  ],
})
export class SignupForm {
  protected readonly isIos = inject(TUI_IS_IOS);
  constructor(private router: Router) { }

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9+\-\s()]*$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required]),
  }, { validators: passwordMatchValidator });

  protected readonly countries = getCountries();
  protected countryIsoCode: TuiCountryIsoCode = 'AT';
  protected value = '';
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