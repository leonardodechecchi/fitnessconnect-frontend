import { AsyncPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { WishlistHttpClient } from '../wishlist-http-client';
import { GetWishlistItemsResponse } from '../wishlist-types';

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

  items = signal<GetWishlistItemsResponse['data'][number][]>([]);

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
          .pipe(
            map((res) => res.data),
            tap((items) => this.items.set(items))
          ),
      })
    )
  );

  onDelete(event: Event, itemId: string) {
    console.log(event.target);
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
      accept: () => {
        this.#http
          .deleteWishlistItem({
            wishlistId: this.wishlistId(),
            itemId,
          })
          .subscribe((res) =>
            this.items.update((items) =>
              items.filter((item) => item.id !== res.data.id)
            )
          );
      },
    });
  }
}
