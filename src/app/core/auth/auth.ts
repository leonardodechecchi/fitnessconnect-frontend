import { Injectable, signal } from '@angular/core';
import { paths } from '../../shared/api/types';

type User =
  paths['/auth/me']['get']['responses']['200']['content']['application/json']['data'];

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly #currentUser = signal<User | null>(null);
  readonly currentUser = this.#currentUser.asReadonly();

  setCurrentUser(user: User | null) {
    this.#currentUser.set(user);
  }
}
