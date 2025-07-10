import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { trainerRoutes } from './features/trainer/trainer.routes';
import { wishlistRoutes } from './features/wishlist/wishlist.routes';

export const routes: Routes = [
  ...authRoutes,
  ...trainerRoutes,
  ...wishlistRoutes,
];
