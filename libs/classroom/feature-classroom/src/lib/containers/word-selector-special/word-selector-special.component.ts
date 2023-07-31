import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WordSelectorSpecialStore } from './word-selector-special.store';
import { WordSelectorSpecialLongAgoComponent } from '../word-selector-special-long-ago/word-selector-special-long-ago.component';
import { WordSelectorSpecialRandomComponent } from '../word-selector-special-random/word-selector-special-random.component';

@Component({
  selector: 'qisapp-word-selector-special',
  standalone: true,
  imports: [CommonModule, FormsModule, WordSelectorSpecialLongAgoComponent, WordSelectorSpecialRandomComponent],
  templateUrl: './word-selector-special.component.html',
  styleUrls: ['./word-selector-special.component.scss'],
  providers: [WordSelectorSpecialStore]
})
export class WordSelectorSpecialComponent {

  store = inject(WordSelectorSpecialStore)
 
}
