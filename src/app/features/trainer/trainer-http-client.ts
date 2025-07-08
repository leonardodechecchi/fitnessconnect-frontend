import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  GetTrainerByIdPathParams,
  GetTrainerByIdResponse,
  GetTrainersQueryParams,
  GetTrainersResponse,
} from './trainer-types';

@Injectable({
  providedIn: 'root',
})
export class TrainerHttpClient {
  private readonly http = inject(HttpClient);

  private readonly baseURL = `${environment.apiURL}/trainers`;

  getTrainers(queryParams: GetTrainersQueryParams) {
    return this.http.get<GetTrainersResponse>(this.baseURL, {
      params: queryParams,
    });
  }

  getTrainerById(pathParams: GetTrainerByIdPathParams) {
    return this.http.get<GetTrainerByIdResponse>(
      `${this.baseURL}/${pathParams.trainerId}`
    );
  }
}
