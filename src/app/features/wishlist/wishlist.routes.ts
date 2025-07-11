import { Routes } from '@angular/router';
import { WishlistDetail } from './detail/wishlist-detail';
import { WishlistList } from './list/wishlist-list';

export const wishlistRoutes: Routes = [
  {
    path: 'wishlists',
    component: WishlistList,
  },
  {
    path: 'wishlists/:wishlistId',
    component: WishlistDetail,
  },
];
