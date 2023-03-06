import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSetsStore } from './feature-sets.store';

@Component({
  selector: 'qisapp-feature-sets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-sets.component.html',
  styleUrls: ['./feature-sets.component.scss'],
  providers: [
    FeatureSetsStore
  ]
})
export class FeatureSetsComponent implements OnInit{
  store = inject(FeatureSetsStore)


  vm$ = this.store.vm$


  ngOnInit(): void {
      this.store.fetchSets();
  }
}
