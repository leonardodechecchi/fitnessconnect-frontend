import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TrainerCard } from '../card/trainer-card';
import { TrainerHttpClient } from '../trainer-http-client';

@Component({
  selector: 'app-trainer-list',
  styleUrl: './trainer-list.css',
  templateUrl: './trainer-list.html',
  imports: [
    AsyncPipe,
    TrainerCard,
    RouterLink,
    DrawerModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
  ],
})
export class TrainerList {
  readonly #http = inject(TrainerHttpClient);

  protected trainers$ = this.#http.getTrainers({
    page: '1',
    limit: '9',
    populate: 'specialties',
  });
}
