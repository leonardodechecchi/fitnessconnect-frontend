import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { map, switchMap } from 'rxjs';
import { TrainerApi } from '../../trainer-api';

@Component({
  selector: 'app-trainer-dashboard-page',
  templateUrl: './trainer-dashboard-page.html',
  imports: [TableModule, CardModule],
})
export class TrainerDashboardPage {
  #trainerApi = inject(TrainerApi);

  readonly trainerId = input.required<string>();

  availabilities = toSignal(
    toObservable(this.trainerId).pipe(
      switchMap((trainerId) =>
        this.#trainerApi.getTrainerAvailabilities({ trainerId }),
      ),
      map((response) => response.data),
    ),
    { initialValue: [] },
  );
}
