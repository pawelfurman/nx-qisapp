import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListStore } from './question-list.store';
import { RouterModule } from '@angular/router';
import { QuestionListItemComponent } from '../question-list-item/question-list-item.component';

@Component({
  selector: 'qisapp-question-list',
  standalone: true,
  imports: [CommonModule, RouterModule, QuestionListItemComponent],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  providers: [QuestionListStore]
})
export class QuestionListComponent implements OnInit {

  store = inject(QuestionListStore)
  
  vm$ = this.store.vm$

  ngOnInit(): void {
      this.store.fetchQuestions()
  }

  remove(id: any){
    this.store.removeQuestion(id)
  }
}
