import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonSummaryStore } from './lesson-summary.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'qisapp-lesson-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-summary.component.html',
  styleUrls: ['./lesson-summary.component.scss'],
  providers: [LessonSummaryStore]
})
export class LessonSummaryComponent {

  store = inject(LessonSummaryStore)

  vm$ = this.store.vm$

  @Output() lessonStart = this.store.startLessonEmitter

  startLesson(){
    this.store.startLesson()
  }

  updateRepetition(repetition: number){
    this.store.patchState({repetition })
  }

  updateAnswerIncrement(answerIncrement: number){
    this.store.patchState({answerIncrement })
  }
}
