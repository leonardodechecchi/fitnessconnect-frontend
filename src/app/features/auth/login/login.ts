import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthHttpClient } from '../auth-http-client';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputText,
    FloatLabel,
    PasswordModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly formBuilder = inject(FormBuilder);
  private readonly http = inject(AuthHttpClient);
  private readonly router = inject(Router);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    this.http
      .login(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['']));
  }
}
