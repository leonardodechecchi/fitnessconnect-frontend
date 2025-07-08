import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isAuthenticated = signal<boolean>(false);
}
