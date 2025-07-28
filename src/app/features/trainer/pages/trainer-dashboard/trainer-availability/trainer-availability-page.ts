import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { map, switchMap } from 'rxjs';
import { TrainerApi } from '../../../trainer-api';

@Component({
  selector: 'app-trainer-availability-page',
  templateUrl: './trainer-availability-page.html',
  imports: [CardModule, TableModule, DatePickerModule, ButtonModule],
})
export class TrainerAvailabilityPage {
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
