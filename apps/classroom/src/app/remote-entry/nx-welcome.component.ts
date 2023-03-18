import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureClassroomComponent } from '@qisapp/classroom/feature-classroom';
import { RouterModule } from '@angular/router';

/* eslint-disable */

@Component({
  selector: 'qisapp-nx-welcome',
  standalone: true,
  imports: [CommonModule, FeatureClassroomComponent, RouterModule],
  template: `
    <h1>Classroom</h1>
    <router-outlet></router-outlet>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
