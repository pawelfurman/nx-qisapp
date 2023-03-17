import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonSummaryStore } from './lesson-summary.store';

@Component({
  selector: 'qisapp-lesson-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-summary.component.html',
  styleUrls: ['./lesson-summary.component.scss'],
  providers: [LessonSummaryStore]
})
export class LessonSummaryComponent {
  store = inject(LessonSummaryStore)

  vm$ = this.store.vm$



  startLesson(){
    this.store.startLesson()
  }
}
