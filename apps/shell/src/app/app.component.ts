import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule

  ],
  selector: 'qisapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shell';
}
