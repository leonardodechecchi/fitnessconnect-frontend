import { Component, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-trainer-dashboard-page',
  templateUrl: './trainer-dashboard-page.html',
  imports: [TableModule, CardModule, MenuModule, RouterOutlet, RouterLink],
})
export class TrainerDashboardPage {
  readonly trainerId = input.required<string>();

  menuItems: MenuItem[] = [{ label: 'Chats', icon: 'pi pi-comments' }];
}
