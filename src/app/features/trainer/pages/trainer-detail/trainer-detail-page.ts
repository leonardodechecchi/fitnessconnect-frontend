import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { map, of, switchMap } from 'rxjs';
import { TrainerCard } from '../../components/trainer-card/trainer-card';
import { TrainerApi } from '../../trainer-api';

@Component({
  selector: 'app-trainer-detail-page',
  templateUrl: './trainer-detail-page.html',
  imports: [
    AsyncPipe,
    TrainerCard,
    CardModule,
    DatePipe,
    ButtonModule,
    DatePickerModule,
  ],
})
export class TrainerDetailPage {
  #trainerApi = inject(TrainerApi);

  readonly trainerId = input.required<string>();
  readonly date = signal<Date>(new Date());

  s = new Date();

  trainer$ = toObservable(this.trainerId).pipe(
    switchMap((trainerId) => this.#trainerApi.getTrainer({ trainerId })),
    map((response) => response.data),
  );

  slots$ = toObservable(this.trainerId).pipe(
    switchMap((trainerId) =>
      this.#trainerApi.getTrainerSlots(
        { trainerId },
        { date: DateTime.now().toISODate() },
      ),
    ),
    map((response) => response.data),
    switchMap((slots) =>
      !slots.length
        ? of([
            { start: '2025-01-20T09:00:00Z', end: '2025-01-20T10:00:00Z' },
            { start: '2025-01-20T14:00:00Z', end: '2025-01-20T15:00:00Z' },
            { start: '2025-01-20T16:30:00Z', end: '2025-01-20T17:30:00Z' },
            { start: '2025-01-21T08:00:00Z', end: '2025-01-21T09:00:00Z' },
            { start: '2025-01-21T13:00:00Z', end: '2025-01-21T14:30:00Z' },
          ])
        : of(slots),
    ),
  );
}
