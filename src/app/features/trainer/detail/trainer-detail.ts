import { AsyncPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { map, switchMap } from 'rxjs';
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
  ],
})
export class TrainerDetail {
  #http = inject(TrainerHttpClient);

  trainerId = input.required<string>();
  showDialog = signal<boolean>(false);

  trainer$ = toObservable(this.trainerId).pipe(
    switchMap((trainerId) =>
      this.#http.getTrainerById({ trainerId }).pipe(map((res) => res.data))
    )
  );

  onClick() {
    this.showDialog.set(true);
  }
}
