import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import * as DatabaseActions from './database.actions';
import * as DatabaseSelectors from './database.selectors';

@Injectable()
export class DatabaseFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  // loaded$ = this.store.pipe(select(DatabaseSelectors.selectDatabaseLoaded));
  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DatabaseActions.initDatabase());
  }
}
