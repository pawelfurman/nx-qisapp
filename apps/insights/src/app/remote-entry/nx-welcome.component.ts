import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthFacade, InsightsFacade } from '@qisapp/store';
import { UiComponentsDatepickerComponent } from '@qisapp/ui-components/datepicker';

/* eslint-disable */

@Component({
  selector: 'qisapp-nx-welcome',
  standalone: true,
  imports: [
    CommonModule,
    // UiComponentsDatepickerComponent
  ],
  providers: [],
  template:  `
    <h1>Insights</h1>
    <h2>x{{username$ | async}}x</h2>
    <!-- <qisapp-ui-components-datepicker></qisapp-ui-components-datepicker> -->
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit{
  // store = inject(Store)
  // insightsFacade = inject(InsightsFacade)
  authFacade = inject(AuthFacade)
  username$ = this.authFacade.username$

  ngOnInit(){
    console.log('f', this.authFacade)
  }
}
