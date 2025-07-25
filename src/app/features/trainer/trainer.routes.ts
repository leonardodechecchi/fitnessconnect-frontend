import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth-guard';
import { TrainerAvailabilityPage } from './pages/trainer-dashboard/trainer-availability/trainer-availability-page';
import { TrainerChatPage } from './pages/trainer-dashboard/trainer-chat/trainer-chat-page';
import { TrainerDashboardPage } from './pages/trainer-dashboard/trainer-dashboard-page';
import { TrainerDetailPage } from './pages/trainer-detail/trainer-detail-page';
import { TrainerOverviewPage } from './pages/trainer-overview/trainer-overview-page';

export const trainerRoutes: Routes = [
  {
    path: 'trainers',
    component: TrainerOverviewPage,
    canActivate: [authGuard],
  },
  {
    path: 'trainers/:trainerId',
    component: TrainerDetailPage,
    canActivate: [authGuard],
  },
  {
    path: 'trainers/:trainerId/dashboard',
    component: TrainerDashboardPage,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'availabilities', pathMatch: 'full' },
      { path: 'availabilities', component: TrainerAvailabilityPage },
      { path: 'chats', component: TrainerChatPage },
    ],
  },
];
