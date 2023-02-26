import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createFeature } from '@ngrx/store';

import * as DatabaseActions from './database.actions';
import { DatabaseEntity } from './database.models';

export const DATABASE_FEATURE_KEY = 'database';

export interface DatabaseState {
  loaded: boolean
}

export interface DatabasePartialState {
  readonly [DATABASE_FEATURE_KEY]: DatabaseState;
}


export const initialDatabaseState: DatabaseState = {
  loaded: false
}


const reducer = createReducer(
  initialDatabaseState,
  on(DatabaseActions.initDatabase, (state) => ({
    ...state,
    loaded: false
  }))
);

export const databaseFeature = createFeature({
  name: DATABASE_FEATURE_KEY,
  reducer
})