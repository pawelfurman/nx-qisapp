import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

/* eslint-disable */

@Component({
  selector: 'qisapp-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template:  `
    <h1>Your Database</h1>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
