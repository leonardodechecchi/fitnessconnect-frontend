import { paths } from '../../shared/api/types';

export type GetTrainersQuery =
  paths['/trainers/']['get']['parameters']['query'];

export type GetTrainersResponse =
  paths['/trainers/']['get']['responses']['200']['content']['application/json'];
