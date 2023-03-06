import { createAction, props } from '@ngrx/store';

export const initAuth = createAction('[Auth Page] Init');

export const login = createAction('[Auth Page] Login', props<{token: string, username: string}>());

export const logout = createAction('[Auth Page] Logout');
