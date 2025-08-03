import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TRACK_PROVIDERS } from '@modules/tracks';
import { SHARED_PROVIDERS } from './shared';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_PROVIDERS } from '@modules/auth/providers/auth.providers';
import {
  authTokenInterceptor,
  loadingInterceptor,
  errorHandlerInterceptor
} from '@shared/interceptors';
import { HISTORY_PROVIDERS } from '@modules/history';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,
        loadingInterceptor,
        errorHandlerInterceptor
      ])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    CookieService,
    ...TRACK_PROVIDERS,
    ...SHARED_PROVIDERS,
    ...AUTH_PROVIDERS,
    ...HISTORY_PROVIDERS,
  ]
};
