import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import {
  provideState,
  provideStore,
} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects, AuthFacade, authFeature, layoutFeature } from '@qisapp/store';
import { TokenInterceptor } from '@qisapp/utils/auth';
import { AppComponent } from './app/app.component';
import { initializeApp } from './app/app.init';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideState(authFeature),
    provideState(layoutFeature),
    provideEffects(AuthEffects),
    AuthFacade,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [],
      multi: true
    },

    importProvidersFrom(
      HttpClientModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
}).catch((err) => console.error(err));
