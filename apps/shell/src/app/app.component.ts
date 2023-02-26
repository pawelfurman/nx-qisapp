import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FeatureHeaderComponent } from '@qisapp/shell/feature-header';
import { FeatureNavigationComponent } from '@qisapp/shell/feature-navigation';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    FeatureHeaderComponent,
    FeatureNavigationComponent
  ],
  selector: 'qisapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
}
