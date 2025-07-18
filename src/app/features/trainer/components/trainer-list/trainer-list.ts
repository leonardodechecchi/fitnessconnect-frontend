import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TrainerApi } from '../../trainer-api';
import { TrainerCard } from '../trainer-card/trainer-card';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.html',
  imports: [TrainerCard, AsyncPipe],
})
export class TrainerList {
  #trainerApi = inject(TrainerApi);

  trainers$ = this.#trainerApi
    .getTrainers({ page: '1', limit: '10' })
    .pipe(map((response) => response.data));
}
