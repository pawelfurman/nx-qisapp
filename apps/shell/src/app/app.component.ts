import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FeatureMainViewComponent } from '@qisapp/shell/feature-main-view';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    FeatureMainViewComponent
  ],
  selector: 'qisapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'shell';
}
