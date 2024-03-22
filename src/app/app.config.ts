import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ErrorResponseInterceptor } from '@shared/interceptors/error-response.interceptor';

import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    provideAnimations(),
    provideToastr({
      timeOut: 1500,
      preventDuplicates: false,
    }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor, ErrorResponseInterceptor, SpinnerInterceptor]),
    ),
  ],
};
