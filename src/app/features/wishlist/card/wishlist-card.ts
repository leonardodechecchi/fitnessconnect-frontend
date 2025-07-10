import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';
import { WishlistHttpClient } from '../wishlist-http-client';
import { GetWishlistsResponse } from '../wishlist-types';

@Component({
  selector: 'app-wishlist-card',
  imports: [CardModule, AsyncPipe, ImageModule, ButtonModule],
  templateUrl: './wishlist-card.html',
})
export class WishlistCard {
  private readonly http = inject(WishlistHttpClient);

  readonly wishlist = input.required<GetWishlistsResponse['data'][0]>();
  readonly item = computed(() =>
    this.http
      .getWishlistItems(
        { wishlistId: this.wishlist().id },
        { page: '1', limit: '1', sortBy: 'createdAt', orderBy: 'desc' }
      )
      .pipe(map((response) => response.data))
  );
}
