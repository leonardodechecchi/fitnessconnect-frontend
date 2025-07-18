import { Routes } from '@angular/router';
import { TrainerDetail } from './detail/trainer-detail';
import { TrainerOverviewPage } from './pages/trainer-overview/trainer-overview-page';

export const trainerRoutes: Routes = [
  {
    path: '',
    redirectTo: '/trainers',
    pathMatch: 'full',
  },
  {
    path: 'trainers',
    component: TrainerOverviewPage,
  },
  {
    path: 'trainers/:trainerId',
    component: TrainerDetail,
  },
];
