import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { map, switchMap } from 'rxjs';
import { SlotSelector } from '../../components/slot-selector/slot-selector';
import { TrainerCard } from '../../components/trainer-card/trainer-card';
import { TrainerApi } from '../../trainer-api';

@Component({
  selector: 'app-trainer-detail-page',
  templateUrl: './trainer-detail-page.html',
  imports: [
    TrainerCard,
    CardModule,
    ButtonModule,
    DatePickerModule,
    FormsModule,
    SlotSelector,
  ],
})
export class TrainerDetailPage {
  #trainerApi = inject(TrainerApi);

  readonly trainerId = input.required<string>();

  trainer = toSignal(
    toObservable(this.trainerId).pipe(
      switchMap((trainerId) => this.#trainerApi.getTrainer({ trainerId })),
      map((response) => response.data),
    ),
  );
}
