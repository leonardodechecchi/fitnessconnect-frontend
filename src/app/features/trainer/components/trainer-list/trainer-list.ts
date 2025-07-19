import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { TrainerApi } from '../../trainer-api';
import { TrainerCard } from '../trainer-card/trainer-card';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.html',
  imports: [TrainerCard, AsyncPipe, RouterLink, PaginatorModule, CardModule],
})
export class TrainerList {
  #trainerApi = inject(TrainerApi);

  #page$ = new BehaviorSubject<number>(1);
  #limit$ = new BehaviorSubject<number>(12);

  result$ = combineLatest([this.#page$, this.#limit$]).pipe(
    switchMap(([page, limit]) =>
      this.#trainerApi.getTrainers({
        page: page.toString(),
        limit: limit.toString(),
      }),
    ),
  );

  fetchTrainers(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    const limit = event.rows ?? 12;

    if (this.#page$.value !== page) this.#page$.next(page);
    if (this.#limit$.value !== limit) this.#limit$.next(limit);
  }
}
