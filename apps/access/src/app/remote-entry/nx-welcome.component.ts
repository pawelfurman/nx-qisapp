import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureLoginComponent } from '@qisapp/access/feature-login';
import { StoreModule } from '@ngrx/store';
import { AuthFacade } from '@qisapp/store';

/* eslint-disable */

@Component({
  selector: 'qisapp-nx-welcome',
  standalone: true,
  imports: [CommonModule, FeatureLoginComponent],
  template: `
    <qisapp-feature-login></qisapp-feature-login>
  `,
  providers: [],
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit{
  authFacade = inject(AuthFacade)


  ngOnInit(): void {
      console.log('facade', this.authFacade)
  }
}
