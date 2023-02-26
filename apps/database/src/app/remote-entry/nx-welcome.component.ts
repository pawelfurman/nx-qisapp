import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '@qisapp/store';
import { FeatureSetsComponent } from '@qisapp/database/feature-sets';


/* eslint-disable */

@Component({
  selector: 'qisapp-nx-welcome',
  standalone: true,
  imports: [CommonModule, FeatureSetsComponent],
  template:  `
    <h1>Your Database</h1>
    <qisapp-feature-sets></qisapp-feature-sets>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  providers: [
    AuthFacade
  ],
})
export class NxWelcomeComponent {

}
