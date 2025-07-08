import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { GetTrainersResponse } from '../trainer-types';

@Component({
  selector: 'app-trainer-card',
  imports: [CardModule, ChipModule],
  templateUrl: './trainer-card.html',
})
export class TrainerCard {
  readonly trainer = input.required<GetTrainersResponse['data'][0]>();
}
