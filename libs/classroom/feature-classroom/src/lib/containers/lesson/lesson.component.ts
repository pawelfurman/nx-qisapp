import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonStore } from './lesson.store';
import { FormsModule } from '@angular/forms';
import { ExerciseEngineService } from '../../services/engine.service';

@Component({
  selector: 'qisapp-lesson',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  providers: [LessonStore]
})
export class LessonComponent {

  store = inject(LessonStore)
  engine = inject(ExerciseEngineService)

  @Input() set questions(questions: any[]){
    this.store.patchState({questions: [...questions.map(q => this.engine.prepareReverseQuestion(q))]})
  }


  vm$ = this.store.vm$



}
