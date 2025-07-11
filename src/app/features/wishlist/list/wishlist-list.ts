import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { WishlistCard } from '../card/wishlist-card';
import { WishlistHttpClient } from '../wishlist-http-client';

@Component({
  selector: 'app-wishlist-list',
  imports: [AsyncPipe, WishlistCard, RouterLink],
  templateUrl: './wishlist-list.html',
})
export class WishlistList {
  #http = inject(WishlistHttpClient);

  page = signal(1);
  limit = signal(10);

  wishlists$ = this.#http
    .getWishlists({
      page: this.page().toString(),
      limit: this.limit().toString(),
    })
    .pipe(map((response) => response.data));
}
