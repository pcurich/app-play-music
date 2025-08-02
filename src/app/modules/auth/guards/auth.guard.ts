import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar sesión
  if (authService.hasValidSession()) {
    return true;
  }

  // Intentar refresh token
  const refreshToken = authService.getRefreshToken();
  if (refreshToken) {
    return authService.refreshTokens().pipe(
      map(() => true),
      catchError(() => {
        router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }

  // No hay sesión válida
  router.navigate(['/auth/login']);
  return false;
};

export const authChildGuard: CanActivateFn = authGuard;
