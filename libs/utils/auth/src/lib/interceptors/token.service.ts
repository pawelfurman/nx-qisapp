import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthFacade } from '@qisapp/store';
import { map, mergeMap, Observable, take } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  authFacade = inject(AuthFacade)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return this.authFacade.token$.pipe(
      take(1),
      map(token => {
        return request.clone({
          setHeaders: {
            'Authorization': token
          }
        })
      }),
      mergeMap( request => {
        return next.handle(request)
      })
    )
  }
}
