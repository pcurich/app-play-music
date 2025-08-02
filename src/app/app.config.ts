import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TRACK_PROVIDERS } from '@modules/tracks';
import { SHARED_PROVIDERS } from './shared';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_PROVIDERS } from '@modules/auth/providers/auth.providers';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    CookieService,
    ...TRACK_PROVIDERS,
    ...SHARED_PROVIDERS,
    ...AUTH_PROVIDERS,
  ]
};
