import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSetsStore } from './feature-sets.store';
import { RouterModule } from '@angular/router';
import { SetsCreationFormComponent } from './containers/sets-creation-form/sets-creation-form.component';
import { SetRepository } from './data-access/sets.repository';
import { SetsListComponent } from './containers/sets-list/sets-list.component';
import { SetsFetchStore } from './store/sets.fetch';

@Component({
  selector: 'qisapp-feature-sets',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SetsCreationFormComponent,
    SetsListComponent
  ],
  templateUrl: './feature-sets.component.html',
  styleUrls: ['./feature-sets.component.scss'],
  providers: [
    FeatureSetsStore,
    SetRepository,
    SetsFetchStore
  ]
})
export class FeatureSetsComponent implements OnInit{
  store = inject(FeatureSetsStore)

  vm$ = this.store.vm$

  ngOnInit(): void {
  }
}
