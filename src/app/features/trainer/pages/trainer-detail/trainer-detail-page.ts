import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DateTime } from 'luxon';
import { CardModule } from 'primeng/card';
import { map, switchMap } from 'rxjs';
import { TrainerCard } from '../../components/trainer-card/trainer-card';
import { TrainerApi } from '../../trainer-api';

@Component({
  selector: 'app-trainer-detail-page',
  templateUrl: './trainer-detail-page.html',
  imports: [AsyncPipe, TrainerCard, CardModule, DatePipe],
})
export class TrainerDetailPage {
  #trainerApi = inject(TrainerApi);

  readonly trainerId = input.required<string>();

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
  );
}
