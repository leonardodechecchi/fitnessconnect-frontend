import { components, paths } from '../../shared/api/types';

// Auth
export type CheckAuthResponse =
  paths['/auth/']['get']['responses']['200']['content']['application/json'];

// Login
export type LoginBody = components['schemas']['Login Input'];

export type LoginResponse =
  paths['/auth/login']['post']['responses']['200']['content']['application/json'];

// Register
export type RegisterBody = components['schemas']['Register Input'];

export type RegisterResponse =
  paths['/auth/register']['post']['responses']['200']['content']['application/json'];
