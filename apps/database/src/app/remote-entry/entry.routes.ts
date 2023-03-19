import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { FeatureQuestionsComponent } from '@qisapp/database/feature-questions';
import { FeatureSetsComponent } from '@qisapp/database/feature-sets';
import { DatabaseEffects, DatabaseFacade, databaseFeature } from '@qisapp/store';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: [
      DatabaseFacade,
      provideState(
        databaseFeature
      ),
      provideEffects(DatabaseEffects)
    ],

    children: [{
      path: '',
      component: FeatureSetsComponent,
    },{
      path: 'questions',
      component: FeatureQuestionsComponent
    }]
  },

];
