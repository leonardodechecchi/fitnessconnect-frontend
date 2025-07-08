import { components, paths } from '../../shared/api/types';

export type LoginInput = components['schemas']['Login Input'];
export type LoginResponse =
  paths['/auth/login']['post']['responses']['200']['content']['application/json'];

export type RegisterInput = components['schemas']['Register Input'];
export type RegisterResponse =
  paths['/auth/register']['post']['responses']['200']['content']['application/json'];

export type GetMeResponse =
  paths['/auth/me']['get']['responses']['200']['content']['application/json'];

export type LogoutResponse =
  paths['/auth/logout']['post']['responses']['200']['content']['application/json'];

export type RefreshResponse =
  paths['/auth/refresh']['post']['responses']['200']['content']['application/json'];
