import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page';
import { RegisterPage } from './pages/register/register-page';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
];
