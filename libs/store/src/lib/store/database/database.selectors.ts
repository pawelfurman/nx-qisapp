import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DATABASE_FEATURE_KEY,
  DatabaseState
} from './database.reducer';

// Lookup the 'Database' feature state managed by NgRx
export const selectDatabaseState =
  createFeatureSelector<DatabaseState>(DATABASE_FEATURE_KEY);


export const selectDatabaseLoaded = createSelector(
  selectDatabaseState,
  (state: DatabaseState) => state.loaded
);

