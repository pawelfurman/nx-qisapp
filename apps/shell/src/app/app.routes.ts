import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { AuthEffects, AuthFacade, authFeature } from '@qisapp/store';
import { provideEffects } from '@ngrx/effects';




export const appRoutes: Route[] = [
  { 
    path: '',
    providers: [
      AuthFacade,
      provideState(authFeature),
      provideEffects(AuthEffects)
    ],
    children: [
      {
        path: 'database',
        loadChildren: () => import('database/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: 'insights',
        loadChildren: () => import('insights/Routes').then((m) => m.remoteRoutes),
      },
      {
        path: '',
        component: NxWelcomeComponent
      },
    ]
  }

];
