import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  CreateWishlistInput,
  CreateWishlistItemInput,
  CreateWishlistItemPathParams,
  CreateWishlistItemResponse,
  CreateWishlistResponse,
  DeleteWishlistItemPathParams,
  DeleteWishlistItemResponse,
  DeleteWishlistPathParams,
  DeleteWishlistResponse,
  GetWishlistItemPathParams,
  GetWishlistItemResponse,
  GetWishlistItemsPathParams,
  GetWishlistItemsQueryParams,
  GetWishlistItemsResponse,
  GetWishlistPathParams,
  GetWishlistResponse,
  GetWishlistsQueryParams,
  GetWishlistsResponse,
} from './wishlist-types';

@Injectable({
  providedIn: 'root',
})
export class WishlistHttpClient {
  private readonly http = inject(HttpClient);

  private readonly baseURL = `${environment.apiURL}/wishlists`;

  createWishlist(data: CreateWishlistInput) {
    return this.http.post<CreateWishlistResponse>(this.baseURL, data);
  }

  getWishlists(queryParams: GetWishlistsQueryParams) {
    return this.http.get<GetWishlistsResponse>(this.baseURL, {
      params: queryParams,
    });
  }

  getWishlist(pathParams: GetWishlistPathParams) {
    return this.http.get<GetWishlistResponse>(
      `${this.baseURL}/${pathParams.wishlistId}`
    );
  }

  // TODO: patch wishlist

  deleteWishlist(pathParams: DeleteWishlistPathParams) {
    return this.http.delete<DeleteWishlistResponse>(
      `${this.baseURL}/${pathParams.wishlistId}`
    );
  }

  getWishlistItems(
    pathParams: GetWishlistItemsPathParams,
    queryParams: GetWishlistItemsQueryParams
  ) {
    return this.http.get<GetWishlistItemsResponse>(
      `${this.baseURL}/${pathParams.wishlistId}/items`,
      { params: queryParams }
    );
  }

  createWishlistItem(
    pathParams: CreateWishlistItemPathParams,
    data: CreateWishlistItemInput
  ) {
    return this.http.post<CreateWishlistItemResponse>(
      `${this.baseURL}/${pathParams.wishlistId}/items`,
      data
    );
  }

  getWishlistItem(pathParams: GetWishlistItemPathParams) {
    return this.http.get<GetWishlistItemResponse>(
      `${this.baseURL}/${pathParams.wishlistId}/items/${pathParams.itemId}`
    );
  }

  deleteWishlistItem(pathParams: DeleteWishlistItemPathParams) {
    return this.http.delete<DeleteWishlistItemResponse>(
      `${this.baseURL}/${pathParams.wishlistId}/items/${pathParams.itemId}`
    );
  }
}
