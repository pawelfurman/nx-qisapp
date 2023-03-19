import { Component, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordSelectorSpecialStore } from './word-selector-special.store';

@Component({
  selector: 'qisapp-word-selector-special',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-selector-special.component.html',
  styleUrls: ['./word-selector-special.component.scss'],
  providers: [WordSelectorSpecialStore]
})
export class WordSelectorSpecialComponent {


  store = inject(WordSelectorSpecialStore)

  vm$ = this.store.vm$


  @Output() selectAmount = this.store.amountEmitter$

  selectLongestWithoutRepetition(){
    this.store.submit()
  }

  changeAmount( amount: number ){
    this.store.patchState({amount})
  }

}
