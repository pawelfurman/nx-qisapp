import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';


@Injectable()
export class DatabaseEffects {
  private actions$ = inject(Actions);
}
