import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  GetTrainerAvailabilitiesPath,
  GetTrainerAvailabilitiesResponse,
  GetTrainerPath,
  GetTrainerResponse,
  GetTrainerSlotsPath,
  GetTrainerSlotsQuery,
  GetTrainerSlotsResponse,
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
    });
  }

  getTrainer(path: GetTrainerPath) {
    return this.#http.get<GetTrainerResponse>(
      `${this.#baseUrl}/${path.trainerId}`,
    );
  }

  getTrainerSlots(path: GetTrainerSlotsPath, query: GetTrainerSlotsQuery) {
    return this.#http.get<GetTrainerSlotsResponse>(
      `${this.#baseUrl}/${path.trainerId}/slots`,
      { params: query },
    );
  }

  getTrainerAvailabilities(path: GetTrainerAvailabilitiesPath) {
    return this.#http.get<GetTrainerAvailabilitiesResponse>(
      `${this.#baseUrl}/${path.trainerId}/availabilities`,
    );
  }
}
