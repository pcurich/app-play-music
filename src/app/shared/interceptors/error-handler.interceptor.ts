import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppCookieService } from '../services/cookie.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const cookieService = inject(AppCookieService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejo agnóstico de errores
      switch (error.status) {
        case 401:
          handleUnauthorized(router, cookieService);
          break;
        case 403:
          console.warn('Access forbidden:', error.url);
          break;
        case 500:
          console.error('Server error:', error.message);
          break;
      }

      return throwError(() => error);
    })
  );
};

function handleUnauthorized(router: Router, cookieService: AppCookieService): void {
  // Limpiar tokens de manera agnóstica
  cookieService.deleteCookie('token_session');
  cookieService.deleteCookie('access_token');
  cookieService.deleteCookie('refresh_token');

  // Redireccionar al login
  router.navigate(['/auth/login']);
}
