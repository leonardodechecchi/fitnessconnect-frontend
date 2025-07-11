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
  private readonly http = inject(WishlistHttpClient);

  private page = signal(1);
  private limit = signal(10);

  protected wishlists$ = this.http
    .getWishlists({
      page: this.page().toString(),
      limit: this.limit().toString(),
    })
    .pipe(map((response) => response.data));
}
