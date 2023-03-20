import { Component, effect, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSpecialLongAgoVm } from './word-selector-special-long-ago.vm';
import { WordSelectorSpecialLongAgoStore } from './word-selector-special-long-ago.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[qisapp-word-selector-special-long-ago]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './word-selector-special-long-ago.component.html',
  styleUrls: ['./word-selector-special-long-ago.component.scss'],
  providers: [WordSelectorSpecialLongAgoStore, WordSelectorSpecialLongAgoVm]
})
export class WordSelectorSpecialLongAgoComponent {


  store = inject(WordSelectorSpecialLongAgoStore)
  view = inject(WordSelectorSpecialLongAgoVm)

  vm = this.view.vm

  @Output() selectAmount = this.store.entities$


  selectLongestWithoutRepetition(){
    this.store.fetchQuestions(
      this.view.amount()
    )
  }

  changeAmount( amount: number ){
    this.view.amount.set(amount)


  }



}
