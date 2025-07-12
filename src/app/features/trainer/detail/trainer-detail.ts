import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { map, switchMap } from 'rxjs';
import { TrainerCard } from '../card/trainer-card';
import { TrainerHttpClient } from '../trainer-http-client';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.html',
  imports: [CardModule, AsyncPipe, TrainerCard, ButtonModule],
})
export class TrainerDetail {
  #http = inject(TrainerHttpClient);

  trainerId = input.required<string>();

  trainer$ = toObservable(this.trainerId).pipe(
    switchMap((trainerId) =>
      this.#http.getTrainerById({ trainerId }).pipe(map((res) => res.data))
    )
  );

  onClick() {}
}
