import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TrainerCard } from '../card/trainer-card';
import { TrainerHttpClient } from '../trainer-http-client';

@Component({
  selector: 'app-trainer-list',
  imports: [AsyncPipe, TrainerCard],
  templateUrl: './trainer-list.html',
})
export class TrainerList {
  private readonly http = inject(TrainerHttpClient);

  protected trainers$ = this.http.getTrainers({
    page: '1',
    limit: '9',
    populate: 'specialties',
  });
}
