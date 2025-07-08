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
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    FloatLabel,
    InputText,
    PasswordModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly formBuilder = inject(FormBuilder);
  private readonly http = inject(AuthHttpClient);
  private readonly router = inject(Router);

  protected form = this.formBuilder.nonNullable.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
  });

  onSubmit() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.http
      .register({ timezone, ...this.form.getRawValue() })
      .subscribe(() => this.router.navigate(['login']));
  }
}
