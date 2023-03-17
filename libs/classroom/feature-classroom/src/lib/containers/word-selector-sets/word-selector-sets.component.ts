import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSetsStore } from './word-selector-sets.store';
import { WordSelectorSetsItemComponent } from '../word-selector-sets-item/word-selector-sets-item.component';

@Component({
  selector: 'qisapp-word-selector-sets',
  standalone: true,
  imports: [
    CommonModule,
    WordSelectorSetsItemComponent,
  ],
  templateUrl: './word-selector-sets.component.html',
  styleUrls: ['./word-selector-sets.component.scss'],

})
export class WordSelectorSetsComponent implements OnInit {
  
  store = inject(WordSelectorSetsStore)
  vm$ = this.store.vm$


  @Input() set entities(entities: any[]){
    this.store.patchState({entities})
  }

  @Output() setSelection: EventEmitter<any> = new EventEmitter()



  ngOnInit(): void {
  }

  selectSet(setId: number){
    this.setSelection.emit(setId)
  }

  trackById(index:number, entity: any){
    return entity.id
  }
}
