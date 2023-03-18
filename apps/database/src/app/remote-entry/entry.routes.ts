import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DatabaseEffects, DatabaseFacade, databaseFeature } from '@qisapp/store';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryComponent,
    providers: [
      DatabaseFacade,
      provideState(
        databaseFeature
      ),
      provideEffects(DatabaseEffects)
    ],
  },

];
