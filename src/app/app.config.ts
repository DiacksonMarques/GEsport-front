import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideEnvironmentNgxMask } from 'ngx-mask';
import { errorInterceptor } from './core/auth/error.interceptor';
import { loggerInterceptor } from './core/auth/logger.interceptor';


registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([loggerInterceptor, errorInterceptor])),
    provideAnimations(),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
};
