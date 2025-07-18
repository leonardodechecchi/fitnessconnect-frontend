import { Component } from '@angular/core';
import { TrainerList } from '../../components/trainer-list/trainer-list';

@Component({
  selector: 'app-trainer-overview-page',
  templateUrl: './trainer-overview-page.html',
  imports: [TrainerList],
})
export class TrainerOverviewPage {}
