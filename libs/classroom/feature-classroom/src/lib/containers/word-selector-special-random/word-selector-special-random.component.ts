import { Component, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSpecialRandomStore } from './word-selector-special-random.store';
import { WordSelectorSpecialRandomVm } from './word-selector-special-random.vm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[qisapp-word-selector-special-random]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-selector-special-random.component.html',
  styleUrls: ['./word-selector-special-random.component.scss'],
  providers: [WordSelectorSpecialRandomStore, WordSelectorSpecialRandomVm]
})
export class WordSelectorSpecialRandomComponent {

  store = inject(WordSelectorSpecialRandomStore)
  view = inject(WordSelectorSpecialRandomVm)

  vm = this.view.vm

  @Output() selectAmount = this.store.entities$


  selectRandom(){
    this.store.fetchQuestions(
      this.view.amount()
    )
  }

  changeAmount( amount: number ){
    this.view.amount.set(amount)
  }

  
}
