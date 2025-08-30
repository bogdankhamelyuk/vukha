import { Component, inject, ChangeDetectionStrategy, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  TuiTextfield,
  TuiTitle,
  TuiButton,
  TuiAppearance,
  TuiIcon,
  TuiHint,
  TuiLabel,
  TuiError,
  TuiLink,
  TuiDialogService
} from '@taiga-ui/core';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import {
  TuiPassword, TuiInputDate, tuiInputPhoneInternationalOptionsProvider,
  TuiSortCountriesPipe, TuiCheckbox
} from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TUI_IS_IOS } from '@taiga-ui/cdk';

import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { type TuiCountryIsoCode } from '@taiga-ui/i18n';
import { getCountries } from 'libphonenumber-js';
import { defer } from 'rxjs';
import { AgbContent } from './agb-content/agb-content';
import { createRegistrationForm } from '../../../shared/registration-form';

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
    TuiCheckbox,
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
    AgbContent,
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
  private readonly dialog = inject(TuiDialogService);
  @ViewChild('agbTemplate') agbTemplate: TemplateRef<void>;
  protected readonly form;

  constructor(private router: Router, private fb: NonNullableFormBuilder) {
    this.form = createRegistrationForm(this.fb);
  }

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

  showAGB() {
    this.dialog
      .open(this.agbTemplate, {
        label: 'Allgemeine Geschäftsbedingungen',
        size: 'm',
      }).subscribe({
        complete: () => {
          this.form.get('agb')?.setValue(true);
        }
      });
  }

  onClick() {
    if (this.form.valid) {
      // Handle form submission
      console.log("Form submitted:", this.form.value);
    } else {
      // Mark all fields as touched to show validation errors
      this.form.markAllAsTouched();
    }
  }
}