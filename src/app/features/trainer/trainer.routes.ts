import { Routes } from '@angular/router';
import { TrainerList } from './list/trainer-list';

export const trainerRoutes: Routes = [
  {
    path: 'trainers',
    component: TrainerList,
  },
];
