import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { map } from 'rxjs';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  username$ = this.store.pipe(select(AuthSelectors.selectUsername));
  token$ = this.store.pipe(select(AuthSelectors.selectToken))
  login$ = this.token$.pipe(
    map((token: string) => !!token.length)
  )


  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    console.log('init?')
    this.store.dispatch(AuthActions.initAuth());
  }

  login(token: string, username: string){

    this.store.dispatch(AuthActions.login({token, username}))
  }

  logout(){
    this.store.dispatch(AuthActions.logout())
  }
}
