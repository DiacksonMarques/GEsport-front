import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideAnimations(),
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ]
};
