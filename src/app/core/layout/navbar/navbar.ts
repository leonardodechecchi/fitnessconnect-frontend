import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AuthHttpClient } from '../../../features/auth/auth-http-client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [MenubarModule, MenuModule, AvatarModule, ButtonModule, AsyncPipe],
})
export class Navbar {
  readonly #router = inject(Router);
  readonly #auth = inject(AuthHttpClient);

  user$ = this.#auth.getMe();

  readonly menuItems: MenuItem[] = [];
  readonly avatarMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () =>
        this.#auth.logout().subscribe(() => this.#router.navigate(['/login'])),
    },
  ];

  goToWishlist() {
    this.#router.navigate(['/wishlists']);
  }
}
