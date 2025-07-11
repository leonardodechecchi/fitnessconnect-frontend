import { components, paths } from '../../shared/api/types';

export type Wishlist = components['schemas']['Wishlist'];

export type CreateWishlistInput =
  components['schemas']['Create Wishlist Input'];
export type CreateWishlistResponse =
  paths['/wishlists/']['post']['responses']['200']['content']['application/json'];

export type GetWishlistsQueryParams =
  paths['/wishlists/']['get']['parameters']['query'];
export type GetWishlistsResponse =
  paths['/wishlists/']['get']['responses']['200']['content']['application/json'];

export type GetWishlistPathParams =
  paths['/wishlists/{wishlistId}']['get']['parameters']['path'];
export type GetWishlistResponse =
  paths['/wishlists/{wishlistId}']['get']['responses']['200']['content']['application/json'];

export type PatchWishlistPathParams =
  paths['/wishlists/{wishlistId}']['patch']['parameters']['path'];
export type PatchWishlistResponse =
  paths['/wishlists/{wishlistId}']['patch']['responses']['200']['content']['application/json'];

export type DeleteWishlistPathParams =
  paths['/wishlists/{wishlistId}']['delete']['parameters']['path'];
export type DeleteWishlistResponse =
  paths['/wishlists/{wishlistId}']['delete']['responses']['200']['content']['application/json'];

export type GetWishlistItemsPathParams =
  paths['/wishlists/{wishlistId}/items']['get']['parameters']['path'];
export type GetWishlistItemsQueryParams =
  paths['/wishlists/{wishlistId}/items']['get']['parameters']['query'];
export type GetWishlistItemsResponse =
  paths['/wishlists/{wishlistId}/items']['get']['responses']['200']['content']['application/json'];

export type CreateWishlistItemInput =
  components['schemas']['Create Wishlist Item Input'];
export type CreateWishlistItemPathParams =
  paths['/wishlists/{wishlistId}/items']['post']['parameters']['path'];
export type CreateWishlistItemResponse =
  paths['/wishlists/{wishlistId}/items']['post']['responses']['200']['content']['application/json'];

export type GetWishlistItemPathParams =
  paths['/wishlists/{wishlistId}/items/{itemId}']['get']['parameters']['path'];
export type GetWishlistItemResponse =
  paths['/wishlists/{wishlistId}/items/{itemId}']['get']['responses']['200']['content']['application/json'];

export type DeleteWishlistItemPathParams =
  paths['/wishlists/{wishlistId}/items/{itemId}']['delete']['parameters']['path'];
export type DeleteWishlistItemResponse =
  paths['/wishlists/{wishlistId}/items/{itemId}']['delete']['responses']['200']['content']['application/json'];
