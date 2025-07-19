import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth-guard';
import { TrainerDetailPage } from './pages/trainer-detail/trainer-detail-page';
import { TrainerOverviewPage } from './pages/trainer-overview/trainer-overview-page';

export const trainerRoutes: Routes = [
  {
    path: 'trainers',
    component: TrainerOverviewPage,
    canActivate: [authGuard],
  },
  {
    path: 'trainer/:trainerId',
    component: TrainerDetailPage,
    canActivate: [authGuard],
  },
];
