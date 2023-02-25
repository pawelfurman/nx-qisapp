import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createFeature } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState{
  firstName: string,
  secondName: string,
  username: string
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  firstName: "Pawel",
  secondName: "Furman",
  username: 'pawelfurman'
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.initAuth, (state) => ({
    ...state
  })),

);

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer
})

