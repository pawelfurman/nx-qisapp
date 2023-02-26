import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LAYOUT_FEATURE_KEY,
  LayoutState,
} from './layout.reducer';

// Lookup the 'Layout' feature state managed by NgRx
export const selectLayoutState =
  createFeatureSelector<LayoutState>(LAYOUT_FEATURE_KEY);

export const selectLayoutLoaded = createSelector(
  selectLayoutState,
  (state: LayoutState) => state.loaded
);
