import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as LayoutActions from './layout.actions';
import * as LayoutFeature from './layout.reducer';
import * as LayoutSelectors from './layout.selectors';

@Injectable()
export class LayoutFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(LayoutSelectors.selectLayoutLoaded));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(LayoutActions.initLayout());
  }
}
