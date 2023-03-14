import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSetsStore } from './word-selector-sets.store';

@Component({
  selector: 'qisapp-word-selector-sets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-selector-sets.component.html',
  styleUrls: ['./word-selector-sets.component.scss'],
})
export class WordSelectorSetsComponent implements OnInit {
  store = inject(WordSelectorSetsStore)

  vm$ = this.store.vm$

  ngOnInit(): void {
      this.store.fetch()
  }

  selectSet(setId: number){
    this.store.selectSet(setId)
  }

  trackById(index:number, entity: any){
    return entity.id
  }
}
