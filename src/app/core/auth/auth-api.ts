import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoginBody,
  LoginResponse,
  RegisterBody,
  RegisterResponse,
} from './auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  #http = inject(HttpClient);

  login(body: LoginBody) {
    return this.#http.post<LoginResponse>(
      'http://localhost:3000/auth/login',
      body,
    );
  }

  register(body: RegisterBody) {
    return this.#http.post<RegisterResponse>('/auth/register', body);
  }
}
