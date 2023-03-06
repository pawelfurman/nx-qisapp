import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFacade } from '@qisapp/store';
import { Router } from '@angular/router';

@Component({
  selector: 'qisapp-feature-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss'],
})
export class FeatureHeaderComponent {

  authFacade = inject(AuthFacade)
  router = inject(Router)

  logout(){
    this.authFacade.logout()
  }
}
