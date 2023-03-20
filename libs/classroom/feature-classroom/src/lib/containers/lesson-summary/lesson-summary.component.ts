import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonSummaryStore } from './lesson-summary.store';
import { FormsModule } from '@angular/forms';
import { WordSelectorSpecialLongAgoVm } from './lesson-summary.vm';

@Component({
  selector: 'qisapp-lesson-summary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson-summary.component.html',
  styleUrls: ['./lesson-summary.component.scss'],
  providers: [LessonSummaryStore, WordSelectorSpecialLongAgoVm]
})
export class LessonSummaryComponent {

  store = inject(LessonSummaryStore)
  view = inject(WordSelectorSpecialLongAgoVm)

  vm = this.view.vm

  @Output() lessonStart: EventEmitter<any> = new EventEmitter()

  startLesson(){
    const {repetition, answerIncrement} = this.view.vm()
    this.lessonStart.emit({
      repetition, answerIncrement
    })
  }

}
