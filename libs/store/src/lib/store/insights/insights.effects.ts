import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';


@Injectable()
export class InsightsEffects {
  private actions$ = inject(Actions);

}
