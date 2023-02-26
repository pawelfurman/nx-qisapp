import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createFeature } from '@ngrx/store';

import * as LayoutActions from './layout.actions';
import { LayoutEntity } from './layout.models';

export const LAYOUT_FEATURE_KEY = 'layout';

export interface LayoutState extends EntityState<LayoutEntity> {
  loaded: boolean; // has the Layout list been loaded
}

export interface LayoutPartialState {
  readonly [LAYOUT_FEATURE_KEY]: LayoutState;
}

export const layoutAdapter: EntityAdapter<LayoutEntity> =
  createEntityAdapter<LayoutEntity>();

export const initialLayoutState: LayoutState = layoutAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialLayoutState,
  on(LayoutActions.initLayout, (state) => ({
    ...state,
    loaded: false,
  })),
);

export const layoutFeature = createFeature({
  name: LAYOUT_FEATURE_KEY,
  reducer
})