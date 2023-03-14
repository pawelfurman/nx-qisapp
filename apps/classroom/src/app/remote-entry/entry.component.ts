import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'qisapp-classroom-entry',
  template: `<qisapp-nx-welcome></qisapp-nx-welcome>`,
})
export class RemoteEntryComponent {}
