import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, finalize } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar sesión
  if (authService.hasValidSession()) {
    return true;
  }

  // Intentar refresh token
  const refreshToken = authService.getRefreshToken();

  if (!refreshToken) {
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return of(false);
  }

  console.log('🔄 Attempting token refresh...');


  return authService.refreshTokens().pipe(
    map(() => {
      console.log('✅ Token refresh successful');
      return true;
    }),
    catchError((error) => {
      console.error('❌ Token refresh failed:', error);
      return of(false);
    }),
    // ✅ Usar finalize para manejar redirección después de completar
    finalize(() => {
      // Solo redireccionar si no hay sesión válida después del intento
      setTimeout(() => {
        if (!authService.hasValidSession()) {
          console.log('🚪 Redirecting to login...');
          router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          });
        }
      }, 100); // Pequeño delay para asegurar que el estado se actualice
    })
  );
};

