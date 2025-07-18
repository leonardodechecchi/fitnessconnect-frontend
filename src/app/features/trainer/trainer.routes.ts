import { Routes } from '@angular/router';
import { TrainerDetailPage } from './pages/trainer-detail/trainer-detail-page';
import { TrainerOverviewPage } from './pages/trainer-overview/trainer-overview-page';

export const trainerRoutes: Routes = [
  { path: 'trainers', component: TrainerOverviewPage },
  { path: 'trainer/:trainerId', component: TrainerDetailPage },
];
