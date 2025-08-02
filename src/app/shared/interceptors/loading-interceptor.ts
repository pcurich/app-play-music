import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);

  // Verificar si esta request debe mostrar loading
  if (shouldShowLoading(req)) {
    loadingService.setLoading(true, req.url);
  }

  return next(req).pipe(
    finalize(() => {
      if (shouldShowLoading(req)) {
        loadingService.setLoading(false, req.url);
      }
    })
  );
};

// ✅ Función para determinar si mostrar loading (configurable)
function shouldShowLoading(req: HttpRequest<unknown>): boolean {
  // Excluir ciertos endpoints del loading
  const excludePatterns = [
    '/api/health',
    '/api/ping',
    '/api/metrics'
  ];

  return !excludePatterns.some(pattern => req.url.includes(pattern));
}
