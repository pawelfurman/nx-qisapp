import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { InsightsEffects, InsightsFacade, insightsFeature } from '@qisapp/store';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '', component: RemoteEntryComponent,
    providers: [
      InsightsFacade,
      provideState(
        insightsFeature
      ),
      provideEffects(InsightsEffects),
    ]

    
  }
];
