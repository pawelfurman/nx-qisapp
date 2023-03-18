import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonExerciseComponent } from './containers/lesson-exercise/lesson-exercise.component';
import { LessonRepository } from './data-access/lesson.repository';

@Component({
  selector: 'qisapp-feature-lesson',
  standalone: true,
  imports: [CommonModule, LessonExerciseComponent],
  templateUrl: './feature-lesson.component.html',
  styleUrls: ['./feature-lesson.component.scss'],
  providers: [
    LessonRepository,
  ]
})
export class FeatureLessonComponent {}
