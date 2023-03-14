import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureClassroomComponent } from '@qisapp/classroom/feature-classroom';

/* eslint-disable */

@Component({
  selector: 'qisapp-nx-welcome',
  standalone: true,
  imports: [CommonModule, FeatureClassroomComponent],
  template: `
    <h1>Classroom</h1>
    <qisapp-feature-classroom></qisapp-feature-classroom>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
