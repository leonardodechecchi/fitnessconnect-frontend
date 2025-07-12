import { Routes } from '@angular/router';
import { TrainerDetail } from './detail/trainer-detail';
import { TrainerList } from './list/trainer-list';

export const trainerRoutes: Routes = [
  {
    path: '',
    redirectTo: '/trainers',
    pathMatch: 'full',
  },
  {
    path: 'trainers',
    component: TrainerList,
  },
  {
    path: 'trainers/:trainerId',
    component: TrainerDetail,
  },
];
