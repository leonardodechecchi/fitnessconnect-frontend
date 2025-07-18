import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetTrainersQuery, GetTrainersResponse } from './trainer-types';

@Injectable({
  providedIn: 'root',
})
export class TrainerApi {
  #http = inject(HttpClient);

  #baseUrl = 'http://localhost:3000/trainers';

  getTrainers(query: GetTrainersQuery) {
    return this.#http.get<GetTrainersResponse>(this.#baseUrl, {
      params: query,
    });
  }
}
