import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { map } from 'rxjs';
import { AuthApi } from '../../auth/auth-api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [MenubarModule, MenuModule, AvatarModule],
})
export class Navbar {
  #authApi = inject(AuthApi);
  #router = inject(Router);

  navbarItems: MenuItem[] = [];

  menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
    {
      label: 'Wishlist',
      icon: 'pi pi-heart',
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () =>
        this.#authApi
          .logout()
          .subscribe(() => this.#router.navigate(['/login'])),
    },
  ];

  currentUser = toSignal(
    this.#authApi.getMe().pipe(map((response) => response.data)),
  );
}
