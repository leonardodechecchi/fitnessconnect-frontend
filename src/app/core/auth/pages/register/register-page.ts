import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthApi } from '../../auth-api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.html',
  imports: [
    Card,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage {
  #authApi = inject(AuthApi);

  registerForm = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true }),
    lastName: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
  });

  performRegister() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.#authApi
      .register({ ...this.registerForm.getRawValue(), timezone })
      .subscribe();
  }
}
