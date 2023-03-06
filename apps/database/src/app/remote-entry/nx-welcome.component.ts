import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  providers: [],
})
export class NxWelcomeComponent {

}
