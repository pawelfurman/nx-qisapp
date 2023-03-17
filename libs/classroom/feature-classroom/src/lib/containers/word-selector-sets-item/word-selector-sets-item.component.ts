import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[qisapp-word-selector-sets-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-selector-sets-item.component.html',
  styleUrls: ['./word-selector-sets-item.component.scss'],
})
export class WordSelectorSetsItemComponent {
  @Input() entity: any
  @Output() setSelection: EventEmitter<any> = new EventEmitter()


  selectSet(setId: number | string) {
    this.setSelection.emit(setId)
  }
}
