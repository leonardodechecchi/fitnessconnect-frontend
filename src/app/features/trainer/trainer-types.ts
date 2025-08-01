import { paths } from '../../shared/api/types';

export type Trainer =
  paths['/trainers/']['get']['responses']['200']['content']['application/json']['data'][0];

// Get Trainers
export type GetTrainersQuery =
  paths['/trainers/']['get']['parameters']['query'];

export type GetTrainersResponse =
  paths['/trainers/']['get']['responses']['200']['content']['application/json'];

// Get Trainer
export type GetTrainerPath =
  paths['/trainers/{trainerId}']['get']['parameters']['path'];

export type GetTrainerResponse =
  paths['/trainers/{trainerId}']['get']['responses']['200']['content']['application/json'];

// Get Trainer Slots
export type GetTrainerSlotsPath =
  paths['/trainers/{trainerId}/slots']['get']['parameters']['path'];

export type GetTrainerSlotsQuery =
  paths['/trainers/{trainerId}/slots']['get']['parameters']['query'];

export type GetTrainerSlotsResponse =
  paths['/trainers/{trainerId}/slots']['get']['responses']['200']['content']['application/json'];

// Get Trainer Availabilities
export type GetTrainerAvailabilitiesPath =
  paths['/trainers/{trainerId}/availabilities']['get']['parameters']['path'];

export type GetTrainerAvailabilitiesResponse =
  paths['/trainers/{trainerId}/availabilities']['get']['responses']['200']['content']['application/json'];
