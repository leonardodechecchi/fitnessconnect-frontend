import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CheckAuthResponse,
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

  #baseUrl = 'http://localhost:3000/auth';

  checkAuth() {
    return this.#http.get<CheckAuthResponse>(this.#baseUrl);
  }

  login(body: LoginBody) {
    return this.#http.post<LoginResponse>(`${this.#baseUrl}/login`, body);
  }

  register(body: RegisterBody) {
    return this.#http.post<RegisterResponse>(`${this.#baseUrl}/register`, body);
  }
}
