import { Routes } from '@angular/router';
import { LoginForm } from './auth/login/login';
import { SignupForm } from './auth/signup/signup';
import { MainView } from './view/main-view/main-view';
import { UserSettings } from './settings/user-settings/user-settings';

export const routes: Routes = [
    { path: 'login', component: LoginForm },
    { path: 'signup', component: SignupForm },
    { path: '', component: MainView },
    { path: 'settings', component: UserSettings }
];
