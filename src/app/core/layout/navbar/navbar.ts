import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MongoAbility } from '@casl/ability';
import { AbilityServiceSignal } from '@casl/angular';
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
  #can = inject<AbilityServiceSignal<MongoAbility>>(AbilityServiceSignal).can;

  navbarItems: MenuItem[] = [];

  menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-cog',
      visible: this.#can('read', 'Dashboard'),
      command: () => {
        this.#router.navigate([
          '/trainers',
          this.currentUser()?.id,
          'dashboard',
        ]);
      },
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
