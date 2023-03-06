
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthFacade } from '@qisapp/store';
import { map, Observable, of } from 'rxjs';
// import { selectToken } from '../store/auth.feature';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenGuard implements CanLoad, CanActivate {


  router = inject(Router)
  authFacade = inject(AuthFacade)

  token$: Observable<string> = this.authFacade.token$

  constructor(){}
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.token$.pipe(
      map((token) => {
        if(token.length){
          return true;
        }
        return this.router.createUrlTree(['/access']);
      })
    );
  }

  canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.token$.pipe(
      map((token) => {
        if(token.length){
          return true;
        }
        return this.router.createUrlTree(['/access']);
      })
    );
  }


  
}