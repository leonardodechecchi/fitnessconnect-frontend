import { AsyncPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { forkJoin, map, switchMap } from 'rxjs';
import { WishlistHttpClient } from '../wishlist-http-client';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.html',
  imports: [
    AsyncPipe,
    AvatarModule,
    ButtonModule,
    DividerModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
})
export class WishlistDetail {
  #http = inject(WishlistHttpClient);
  #confirmationService = inject(ConfirmationService);

  page = signal(1);
  limit = signal(10);

  wishlistId = input.required<string>();

  response$ = toObservable(this.wishlistId).pipe(
    switchMap((wishlistId) =>
      forkJoin({
        wishlist: this.#http
          .getWishlist({ wishlistId })
          .pipe(map((res) => res.data)),
        items: this.#http
          .getWishlistItems(
            { wishlistId },
            { page: this.page().toString(), limit: this.limit().toString() }
          )
          .pipe(map((res) => res.data)),
      })
    )
  );

  onDelete(event: Event) {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
    });
  }
}
