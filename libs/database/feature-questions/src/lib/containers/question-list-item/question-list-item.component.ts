import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionListItemStore } from './question-list-item.store';

@Component({
  selector: '[qisapp-question-list-item]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.scss'],
  providers: [QuestionListItemStore]
})
export class QuestionListItemComponent {

  store = inject(QuestionListItemStore)

  @Input() entity!: any

  vm$ = this.store.vm$


  updateQuestion(entity: any){
    this.store.updateQuestion({...entity})
  }

  removeQuestion(entity: any){
    this.store.removeQuestion(entity.id)
  }


}
