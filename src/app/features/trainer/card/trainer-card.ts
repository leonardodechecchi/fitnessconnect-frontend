import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { GetTrainersResponse, Trainer } from '../trainer-types';

@Component({
  selector: 'app-trainer-card',
  imports: [CardModule, ChipModule],
  templateUrl: './trainer-card.html',
})
export class TrainerCard {
  trainer = input.required<Trainer>();
  specialties = input<GetTrainersResponse['data'][number]['specialties']>();
}
