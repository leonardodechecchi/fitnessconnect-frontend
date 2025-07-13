import { AsyncPipe } from '@angular/common';
import { Component, inject, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { map } from 'rxjs';
import { WishlistHttpClient } from '../../../features/wishlist/wishlist-http-client';

@Component({
  selector: 'app-add-to-wishlist-dialog',
  templateUrl: './add-to-wishlist-dialog.html',
  imports: [
    DialogModule,
    ButtonModule,
    DividerModule,
    AsyncPipe,
    CardModule,
    DividerModule,
    CheckboxModule,
    InputText,
    FloatLabel,
    ReactiveFormsModule,
    ScrollPanelModule,
  ],
})
export class AddToWishlistDialog {
  #http = inject(WishlistHttpClient);

  show = model<boolean>(false);
  trainerId = input.required<string>();

  wishlistName = new FormControl<string>('', {
    validators: Validators.required,
    nonNullable: true,
  });

  protected wishlist$ = this.#http
    .getWishlists({ page: '1', limit: '10' })
    .pipe(map((res) => res.data));

  closeDialog() {
    this.wishlistName.reset();
    this.show.set(false);
  }

  createWishlist() {
    const name = this.wishlistName.getRawValue();
    this.#http
      .createWishlist({ name, trainerId: this.trainerId() })
      .subscribe(() => this.closeDialog());
  }
}
