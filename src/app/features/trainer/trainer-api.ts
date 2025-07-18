import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GetTrainerPath,
  GetTrainerResponse,
  GetTrainersQuery,
  GetTrainersResponse,
} from './trainer-types';

@Injectable({
  providedIn: 'root',
})
export class TrainerApi {
  #http = inject(HttpClient);

  #baseUrl = 'http://localhost:3000/trainers';

  getTrainers(query: GetTrainersQuery) {
    return this.#http.get<GetTrainersResponse>(this.#baseUrl, {
      params: query,
      withCredentials: true,
    });
  }

  getTrainer(path: GetTrainerPath) {
    return this.#http.get<GetTrainerResponse>(
      `${this.#baseUrl}/${path.trainerId}`,
      { withCredentials: true },
    );
  }
}
