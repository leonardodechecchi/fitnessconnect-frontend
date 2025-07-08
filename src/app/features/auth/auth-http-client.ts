import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
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
  private http = inject(HttpClient);

  private baseURL = `${environment.apiURL}/auth`;

  getMe() {
    return this.http.get<GetMeResponse>(`${this.baseURL}/me`);
  }

  register(data: RegisterInput) {
    return this.http.post<RegisterResponse>(`${this.baseURL}/register`, data);
  }

  login(data: LoginInput) {
    return this.http.post<LoginResponse>(`${this.baseURL}/login`, data);
  }

  logout() {
    return this.http.post<LogoutResponse>(`${this.baseURL}/logout`, null);
  }

  refresh() {
    return this.http.post<RefreshResponse>(`${this.baseURL}/logout`, null);
  }
}
