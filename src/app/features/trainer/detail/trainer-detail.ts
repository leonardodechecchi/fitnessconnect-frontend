import { AsyncPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { forkJoin, map, switchMap } from 'rxjs';
import { AddToWishlistDialog } from '../../../shared/components/add-to-wishlist-dialog/add-to-wishlist-dialog';
import { TrainerCard } from '../card/trainer-card';
import { TrainerHttpClient } from '../trainer-http-client';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.html',
  imports: [
    CardModule,
    AsyncPipe,
    TrainerCard,
    ButtonModule,
    DialogModule,
    AddToWishlistDialog,
    DatePickerModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DividerModule,
  ],
})
export class TrainerDetail {
  #http = inject(TrainerHttpClient);

  trainerId = input.required<string>();
  showDialog = signal<boolean>(false);
  slots = signal<any[]>([]);

  date = new FormControl(new Date(), { nonNullable: true });

  trainer$ = toObservable(this.trainerId).pipe(
    switchMap((trainerId) =>
      forkJoin({
        trainer: this.#http
          .getTrainerById({ trainerId })
          .pipe(map((res) => res.data)),
        slots: this.#http.getTrainerSlots(
          { trainerId },
          { date: DateTime.now().toISODate() }
        ),
      })
    )
  );

  onClick() {
    this.showDialog.set(true);
  }

  onDateSelect(date: Date) {
    const selectedDate = DateTime.fromJSDate(date).toISODate();

    this.#http
      .getTrainerSlots({ trainerId: this.trainerId() }, { date: selectedDate! })
      .pipe(map((res) => res.data))
      .subscribe((slots) => this.slots.set(slots));
  }
}
