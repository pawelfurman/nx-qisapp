import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INSIGHTS_FEATURE_KEY,
  InsightsState,
} from './insights.reducer';

// Lookup the 'Insights' feature state managed by NgRx
export const selectInsightsState =
  createFeatureSelector<InsightsState>(INSIGHTS_FEATURE_KEY);

export const selectDateStart = createSelector(
  selectInsightsState,
  (state: InsightsState) => state.dateStart
);

export const selectDateEnd = createSelector(
  selectInsightsState,
  (state: InsightsState) => state.dateEnd
);


export const selectSets = createSelector(
  selectInsightsState,
  (state: InsightsState) => state.sets
);
