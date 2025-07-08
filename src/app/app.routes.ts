import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { trainerRoutes } from './features/trainer/trainer.routes';

export const routes: Routes = [...authRoutes, ...trainerRoutes];
