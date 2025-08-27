import { Routes } from '@angular/router';
import { LoginForm } from './auth/login/login';
import { SignupForm } from './auth/signup/signup';
import { MainView } from './view/main-view/main-view';

export const routes: Routes = [
    { path: 'login', component: LoginForm },
    { path: 'signup', component: SignupForm },
    { path: '', component: MainView }
];
