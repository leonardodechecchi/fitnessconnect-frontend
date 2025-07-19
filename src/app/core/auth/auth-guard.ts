import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthApi } from './auth-api';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authApi = inject(AuthApi);
  const router = inject(Router);

  return authApi.checkAuth().pipe(
    map((response) => response.data.isAuthenticated),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    }),
  );
};
