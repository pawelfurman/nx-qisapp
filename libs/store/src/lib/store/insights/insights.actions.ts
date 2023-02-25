import { createAction, props } from '@ngrx/store';
import { InsightsFilters } from './insights.models';

export const initInsights = createAction('[Insights Page] Init');

export const changeFilters = createAction(
  '[Insights] Change Filters',
  props<{ filters: Partial<InsightsFilters> }>()
);
