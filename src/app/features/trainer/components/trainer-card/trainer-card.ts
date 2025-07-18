import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Trainer } from '../../trainer-types';

@Component({
  selector: 'app-trainer-card',
  templateUrl: './trainer-card.html',
  imports: [CardModule],
})
export class TrainerCard {
  readonly trainer = input.required<Trainer>();
}
