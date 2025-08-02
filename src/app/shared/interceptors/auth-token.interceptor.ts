import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppCookieService } from '../services/cookie.service';


export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const cookieService = inject(AppCookieService);

  // Obtener token de cualquier fuente (agnóstico al servicio de auth)
  const token = getAuthToken(cookieService);

  // Si no hay token, continuar sin modificar la request
  if (!token) {
    return next(req);
  }

  // Clonar request y agregar header de autorización
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};


const getAuthToken = (cookieService: AppCookieService): string | null => {
  // Intenta obtener token de diferentes fuentes (orden de prioridad)
  return cookieService.getCookie('token_session') ||
         cookieService.getCookie('access_token') ||
         localStorage.getItem('auth_token') ||
         null;
}
