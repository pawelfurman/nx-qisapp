import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorComponent } from './containers/word-selector/word-selector.component';
import { LessonSummaryComponent } from './containers/lesson-summary/lesson-summary.component';
import { LessonComponent } from './containers/lesson/lesson.component';
import { ExerciseEngineService } from './services/engine.service';
import { LessonRepository } from './data-access/lesson.repository';
import { SetsFetchStore } from './store/sets-fetch.store';

@Component({
  selector: 'qisapp-feature-classroom',
  standalone: true,
  imports: [
    CommonModule,
    WordSelectorComponent
  ],
  templateUrl: './feature-classroom.component.html',
  styleUrls: ['./feature-classroom.component.scss'],
  providers: [
    ExerciseEngineService,
    LessonRepository,
    SetsFetchStore,
  ]
})
export class FeatureClassroomComponent {}
