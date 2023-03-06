import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatureLoginStore } from './feature-login.store';
import { FeatureLoginRepository } from './feature-login.repository';


@Component({
  selector: 'qisapp-feature-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feature-login.component.html',
  styleUrls: ['./feature-login.component.scss'],
  providers: [FeatureLoginStore, FeatureLoginRepository]
})
export class FeatureLoginComponent {

  store = inject(FeatureLoginStore)

  vm$ = this.store.vm$

  modelChange(event: any){
    console.log(event)
    this.store.patchState({password: event})
  }
}
