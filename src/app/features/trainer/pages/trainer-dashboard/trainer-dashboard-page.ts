import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';
import { DashboardMenu } from '../../components/dashboard-menu/dashboard-menu';

@Component({
  selector: 'app-trainer-dashboard-page',
  templateUrl: './trainer-dashboard-page.html',
  imports: [
    TableModule,
    CardModule,
    MenuModule,
    RouterOutlet,
    AvatarModule,
    NgClass,
    DrawerModule,
    DashboardMenu,
  ],
})
export class TrainerDashboardPage {
  #breakpoints = inject(BreakpointObserver);

  readonly trainerId = input.required<string>();

  isSmallScreen = toSignal(
    this.#breakpoints
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .pipe(map((value) => value.matches)),
  );

  isSidebarOpen = linkedSignal(() => (this.isSmallScreen() ? false : true));
  isDrawerOpen = signal<boolean>(false);

  toggleDrawer() {
    this.isDrawerOpen.update((current) => !current);
  }

  toggleSidebar() {
    this.isSidebarOpen.update((current) => !current);
  }

  constructor() {
    effect(() => {
      if (this.isSmallScreen()) {
        this.isSidebarOpen.set(false);
      } else {
        this.isDrawerOpen.set(false);
      }
    });
  }
}
