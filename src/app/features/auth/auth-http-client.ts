import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth } from '../../core/auth/auth';
import {
  GetMeResponse,
  LoginInput,
  LoginResponse,
  LogoutResponse,
  RefreshResponse,
  RegisterInput,
  RegisterResponse,
} from './auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpClient {
  #http = inject(HttpClient);
  #auth = inject(Auth);

  #baseUrl = `${environment.apiURL}/auth`;

  getMe() {
    return this.#http.get<GetMeResponse>(`${this.#baseUrl}/me`).pipe(
      map((response) => response.data),
      tap((user) => {
        this.#auth.setCurrentUser(user);
      })
    );
  }

  register(data: RegisterInput) {
    return this.#http.post<RegisterResponse>(`${this.#baseUrl}/register`, data);
  }

  login(data: LoginInput) {
    return this.#http.post<LoginResponse>(`${this.#baseUrl}/login`, data).pipe(
      switchMap(() => {
        return this.getMe();
      })
    );
  }

  logout() {
    return this.#http
      .post<LogoutResponse>(`${this.#baseUrl}/logout`, null)
      .pipe(tap(() => this.#auth.setCurrentUser(null)));
  }

  refresh() {
    return this.#http.post<RefreshResponse>(`${this.#baseUrl}/logout`, null);
  }
}
