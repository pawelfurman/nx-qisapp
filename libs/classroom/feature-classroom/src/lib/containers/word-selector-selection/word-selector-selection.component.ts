import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSelectionStore } from './word-selector-selection.store';
import { WordSelectorSelectionVm } from './word-selector-selection.vm';

@Component({
  selector: 'qisapp-word-selector-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-selector-selection.component.html',
  styleUrls: ['./word-selector-selection.component.scss'],
  providers: [WordSelectorSelectionStore, WordSelectorSelectionVm]
})
export class WordSelectorSelectionComponent {

  @Output() removeQuestion: EventEmitter<number> = new EventEmitter()

  store = inject(WordSelectorSelectionStore)
  view = inject(WordSelectorSelectionVm)

  // vm$ = this.store.vm$
  vm = this.view.vm


  remove(questionId: number){
    this.removeQuestion.emit(questionId)
  }
}
