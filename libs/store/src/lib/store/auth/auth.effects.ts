import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as AuthActions from './auth.actions'
import { LocalStorageService } from '@qisapp/utils/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private localStorage = inject(LocalStorageService)
  private router = inject(Router)

  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap((payload) => {
        this.localStorage.setItem('qisapp-user', payload)
        this.router.navigate([''])
      })
    ), {dispatch: false})


  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.localStorage.removeItem('qisapp-user')
        this.router.navigate(['', 'access'])
      })
    ), {dispatch: false})
    
}
