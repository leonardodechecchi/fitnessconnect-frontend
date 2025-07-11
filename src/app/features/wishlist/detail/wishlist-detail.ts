import { AsyncPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { TrainerCard } from '../../trainer/card/trainer-card';
import { WishlistHttpClient } from '../wishlist-http-client';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.html',
  imports: [AsyncPipe, TrainerCard],
})
export class WishlistDetail {
  #http = inject(WishlistHttpClient);

  page = signal(1);
  limit = signal(10);

  wishlistId = input.required<string>();

  items$ = toObservable(this.wishlistId).pipe(
    switchMap((wishlistId) =>
      this.#http.getWishlistItems(
        { wishlistId },
        { page: this.page().toString(), limit: this.limit().toString() }
      )
    ),
    map((res) => res.data)
  );
}
