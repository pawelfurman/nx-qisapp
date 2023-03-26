import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetsListStore } from './question-sets-list.store';
import { QuestionsSetsListVm } from './question-sets-list.vm';

@Component({
  selector: 'qisapp-question-sets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-sets-list.component.html',
  styleUrls: ['./question-sets-list.component.scss'],
  providers: [QuestionSetsListStore, QuestionsSetsListVm]
})
export class QuestionSetsListComponent implements OnInit {

  store = inject(QuestionSetsListStore)
  view = inject(QuestionsSetsListVm)

  vm = this.view.vm
  
  @Input() set setId(setId: number | string){
      this.store.patchState({setId})
  }

  ngOnInit(): void {
      this.store.fetchQuestions()
  }


  deleteQuestion(questionId: any){
    this.store.deleteQuestion(questionId)
  }
}
