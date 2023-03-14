import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureHeaderComponent } from '@qisapp/shell/feature-header';
import { FeatureNavigationComponent } from '@qisapp/shell/feature-navigation';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@qisapp/store';

@Component({
  selector: 'qisapp-feature-main-view',
  standalone: true,
  imports: [
    CommonModule,
    FeatureHeaderComponent,
    FeatureNavigationComponent,
    RouterModule
  ],
  templateUrl: './feature-main-view.component.html',
  styleUrls: ['./feature-main-view.component.scss'],
})
export class FeatureMainViewComponent implements OnInit {

  authFacade = inject(AuthFacade)
  login$ = this.authFacade.login$

  ngOnInit(){}
}
