import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs/operators';
import { AuthApi } from '../../auth-api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DividerModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginPage {
  #authApi = inject(AuthApi);
  #router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  isLoading = signal<boolean>(false);

  performLogin() {
    this.isLoading.set(true);

    this.#authApi
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe(() => {});
  }
}
