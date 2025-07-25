import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { createMongoAbility, PureAbility } from '@casl/ability';
import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { credentialInterceptor } from './core/interceptors/credential-inteceptor';

const AppPreset = definePreset(Lara, {
  components: {
    menubar: {
      css: () =>
        `.p-menubar {
            background-color: white;
            border-radius: 0;
            border: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05)
        }`,
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: PureAbility, useValue: createMongoAbility() },
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([credentialInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: AppPreset,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
};
