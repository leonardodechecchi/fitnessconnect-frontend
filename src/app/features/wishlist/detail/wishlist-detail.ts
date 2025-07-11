import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { map } from 'rxjs';
import { components } from '../../../shared/api/types';
import { TrainerCard } from '../../trainer/card/trainer-card';
import { WishlistHttpClient } from '../wishlist-http-client';

@Component({
  selector: 'app-wishlist-detail',
  templateUrl: './wishlist-detail.html',
  imports: [AsyncPipe, TrainerCard],
})
export class WishlistDetail {
  private http = inject(WishlistHttpClient);

  readonly wishlist = input.required<components['schemas']['Wishlist']>();

  page = signal(1);
  limit = signal(10);

  readonly $items = computed(() =>
    this.http
      .getWishlistItems(
        { wishlistId: this.wishlist().id },
        { page: this.page().toString(), limit: this.limit().toString() }
      )
      .pipe(map((res) => res.data))
  );
}
