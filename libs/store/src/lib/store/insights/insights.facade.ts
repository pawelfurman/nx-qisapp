import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as InsightsActions from './insights.actions';
import * as InsightsFeature from './insights.reducer';
import * as InsightsSelectors from './insights.selectors';

@Injectable()
export class InsightsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  selectDateStart$ = this.store.pipe(select(InsightsSelectors.selectDateStart));
  selectDateEnd$ = this.store.pipe(select(InsightsSelectors.selectDateEnd));
  selectSets$ = this.store.pipe(select(InsightsSelectors.selectSets));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(InsightsActions.initInsights());
  }
}
