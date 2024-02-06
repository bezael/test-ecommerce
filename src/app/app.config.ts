import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ErrorResponseInterceptor } from '@shared/interceptors/error-response.interceptor';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([ErrorResponseInterceptor])
    ),
  ],
};
