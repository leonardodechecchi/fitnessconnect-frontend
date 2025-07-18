import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { TrainerCard } from '../../components/trainer-card/trainer-card';
import { TrainerApi } from '../../trainer-api';

@Component({
  selector: 'app-trainer-detail-page',
  templateUrl: './trainer-detail-page.html',
  imports: [AsyncPipe, TrainerCard],
})
export class TrainerDetailPage {
  #trainerApi = inject(TrainerApi);

  readonly trainerId = input.required<string>();

  trainer$ = toObservable(this.trainerId).pipe(
    switchMap((trainerId) => this.#trainerApi.getTrainer({ trainerId })),
    map((response) => response.data),
  );
}
