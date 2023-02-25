import { createReducer, on, Action, createFeature } from '@ngrx/store';

import * as InsightsActions from './insights.actions';

export const INSIGHTS_FEATURE_KEY = 'insights';

export interface InsightsState {
  dateStart: string
  dateEnd: string
  sets: any[]
}

export interface InsightsPartialState {
  readonly [INSIGHTS_FEATURE_KEY]: InsightsState;
}

export const initialInsightsState: InsightsState = {
    dateStart: '',
    dateEnd: '',
    sets: []
}

const reducer = createReducer(
  initialInsightsState,
  on(InsightsActions.initInsights, (state) => ({
    ...state,
    loaded: false,
    error: null,
  }))
);

export const insightsFeature = createFeature({
  name: INSIGHTS_FEATURE_KEY,
  reducer
}) 



// export function insightsReducer(
//   state: InsightsState | undefined,
//   action: Action
// ) {
//   return reducer(state, action);
// }


