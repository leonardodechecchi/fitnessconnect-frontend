import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { map } from 'rxjs';
import { Navbar } from '../../../../core/layout/navbar/navbar';
import { FilterMenu } from '../../components/filter-menu/filter-menu';
import { TrainerList } from '../../list/trainer-list';

@Component({
  selector: 'app-trainer-overview-page',
  templateUrl: './trainer-overview-page.html',
  imports: [
    FilterMenu,
    TrainerList,
    Navbar,
    DrawerModule,
    AsyncPipe,
    ButtonModule,
  ],
})
export class TrainerOverviewPage {
  #breakpoint = inject(BreakpointObserver);

  isSidebarVisible = signal<boolean>(false);
  isDrawerVisible = signal<boolean>(false);

  isMobile$ = this.#breakpoint
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  toggleMenu() {
    this.isSidebarVisible.update((value) => !value);
  }

  toggleDrawer() {
    this.isDrawerVisible.update((value) => !value);
  }
}
