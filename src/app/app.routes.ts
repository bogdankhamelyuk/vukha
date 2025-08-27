import { Routes } from '@angular/router';
import { LoginForm } from './auth/login/login';
import { SignupForm } from './auth/signup/signup';
import { Main } from './main/main';
export const routes: Routes = [
    { path: 'login', component: LoginForm },
    { path: 'signup', component: SignupForm },
    { path: 'main', component: Main }
];
