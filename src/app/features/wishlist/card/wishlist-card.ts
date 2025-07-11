import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { map, switchMap } from 'rxjs';
import { WishlistHttpClient } from '../wishlist-http-client';
import { Wishlist } from '../wishlist-types';

@Component({
  selector: 'app-wishlist-card',
  imports: [CardModule, AsyncPipe, ImageModule, ButtonModule],
  templateUrl: './wishlist-card.html',
})
export class WishlistCard {
  #http = inject(WishlistHttpClient);

  wishlist = input.required<Wishlist>();

  item$ = toObservable(this.wishlist).pipe(
    switchMap((wishlist) =>
      this.#http.getWishlistItems(
        { wishlistId: wishlist.id },
        { page: '1', limit: '1', sortBy: 'createdAt', orderBy: 'desc' }
      )
    ),
    map((res) => res.data)
  );
}
