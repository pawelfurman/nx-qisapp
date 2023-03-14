import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createFeature } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState{
  token: string
  username: string
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  token: '',
  username: 'pawelfurman'
};

const reducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action: any) =>{
    return {
      ...state, token: action.token, username: action.username
    }
  }),

  on(AuthActions.loginOnAppInit, (state, action: any) =>{
    return {
      ...state, token: action.token, username: action.username
    }
  }),

  on(AuthActions.logout, (state, action: any) =>{
    return {
      ...state, token: '', username: ''
    }
  }),

  on(AuthActions.initAuth, (state) => ({
    ...state
  }))
);

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer
})

