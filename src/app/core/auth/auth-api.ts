import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PureAbility } from '@casl/ability';
import { finalize, map, tap } from 'rxjs';
import {
  CheckAuthResponse,
  GetMeResponse,
  LoginBody,
  LoginResponse,
  LogoutResponse,
  RegisterBody,
  RegisterResponse,
} from './auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  #http = inject(HttpClient);
  #ability = inject(PureAbility);

  #baseUrl = 'http://localhost:3000/auth';

  checkAuth() {
    return this.#http.get<CheckAuthResponse>(this.#baseUrl);
  }

  getMe() {
    return this.#http.get<GetMeResponse>(`${this.#baseUrl}/me`);
  }

  login(body: LoginBody) {
    return this.#http.post<LoginResponse>(`${this.#baseUrl}/login`, body).pipe(
      map((response) => response.data),
      tap((rules) => this.#ability.update(rules)),
    );
  }

  logout() {
    return this.#http
      .post<LogoutResponse>(`${this.#baseUrl}/logout`, {})
      .pipe(finalize(() => this.#ability.update([])));
  }

  register(body: RegisterBody) {
    return this.#http.post<RegisterResponse>(`${this.#baseUrl}/register`, body);
  }
}
