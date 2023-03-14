import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSelectionStore } from './word-selector-selection.store';

@Component({
  selector: 'qisapp-word-selector-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-selector-selection.component.html',
  styleUrls: ['./word-selector-selection.component.scss'],
  providers: [WordSelectorSelectionStore]
})
export class WordSelectorSelectionComponent {
  store = inject(WordSelectorSelectionStore)

  vm$ = this.store.vm$
}
