import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { map } from 'rxjs';
import { SearchFilter } from '../../components/search-filter/search-filter';
import { TrainerList } from '../../components/trainer-list/trainer-list';

@Component({
  selector: 'app-trainer-overview-page',
  templateUrl: './trainer-overview-page.html',
  imports: [
    TrainerList,
    CardModule,
    SearchFilter,
    DrawerModule,
    Button,
    AsyncPipe,
  ],
})
export class TrainerOverviewPage {
  #breakpoint = inject(BreakpointObserver);

  isMobile$ = this.#breakpoint
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  isDrawerOpen = signal<boolean>(false);

  toggleDrawer() {
    this.isDrawerOpen.update((isOpen) => !isOpen);
  }
}
