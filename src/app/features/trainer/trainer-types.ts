import { components, paths } from '../../shared/api/types';

export type Trainer = components['schemas']['Trainer'];

export type GetTrainersQueryParams =
  paths['/trainers/']['get']['parameters']['query'];
export type GetTrainersResponse =
  paths['/trainers/']['get']['responses']['200']['content']['application/json'];

export type GetTrainerByIdPathParams =
  paths['/trainers/{trainerId}']['get']['parameters']['path'];
export type GetTrainerByIdResponse =
  paths['/trainers/{trainerId}']['get']['responses']['200']['content']['application/json'];

export type GetTrainerSlotsPathParams =
  paths['/trainers/{trainerId}/slots']['get']['parameters']['path'];
export type GetTrainerSlotsQueryParams =
  paths['/trainers/{trainerId}/slots']['get']['parameters']['query'];
export type GetTrainerSlotsResponse =
  paths['/trainers/{trainerId}/slots']['get']['responses']['200']['content']['application/json'];
