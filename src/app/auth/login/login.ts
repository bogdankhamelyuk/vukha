import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiTextfield,
  TuiTitle,
  TuiButton,
  TuiAppearance,
  TuiIcon,
  TuiHint,
  TuiLabel,
  TuiLink
} from '@taiga-ui/core';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiPassword, TuiCheckbox } from '@taiga-ui/kit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
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
    TuiIcon,
    TuiLink,
    TuiPassword,
    TuiAppearance
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginForm {

  constructor(private router: Router) { }

  protected readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    saveLogin: new FormControl(false)
  });

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
    console.log("ok")
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  loginWithGoogle() {
    // Implement Google login logic here
  }
}
