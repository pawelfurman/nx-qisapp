import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as InsightsActions from './insights.actions';
import * as InsightsFeature from './insights.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class InsightsEffects {
  private actions$ = inject(Actions);

}
