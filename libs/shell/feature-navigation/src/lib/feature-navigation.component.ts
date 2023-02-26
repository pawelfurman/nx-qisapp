import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'qisapp-feature-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-navigation.component.html',
  styleUrls: ['./feature-navigation.component.scss'],
})
export class FeatureNavigationComponent {}
