import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSetsStore } from './word-selector-sets.store';
import { WordSelectorSetsItemComponent } from '../word-selector-sets-item/word-selector-sets-item.component';
import { SetsFetchStore } from '../../store/sets-fetch.store';
import { WordSelectorSetsVm } from './word-selector-sets.vm';

@Component({
  selector: 'qisapp-word-selector-sets',
  standalone: true,
  imports: [
    CommonModule,
    WordSelectorSetsItemComponent,
  ],
  templateUrl: './word-selector-sets.component.html',
  styleUrls: ['./word-selector-sets.component.scss'],
  providers: [WordSelectorSetsVm, WordSelectorSetsStore]

})
export class WordSelectorSetsComponent implements OnInit {
  
  setsFetchStore = inject(SetsFetchStore)
  store = inject(WordSelectorSetsStore)
  view = inject(WordSelectorSetsVm)

  vm = this.view.vm

  @Output() setSelection: EventEmitter<any> = new EventEmitter()

  ngOnInit(): void {}

  selectSet(setId: number){
    this.setSelection.emit(setId)
  }

  trackById(index:number, entity: any){
    return entity.id
  }

  fetchSets(){
    this.setsFetchStore.fetch()
  }
}
