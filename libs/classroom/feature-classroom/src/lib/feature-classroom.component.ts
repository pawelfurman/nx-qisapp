import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorComponent } from './containers/word-selector/word-selector.component';
import { LessonSummaryComponent } from './containers/lesson-summary/lesson-summary.component';

@Component({
  selector: 'qisapp-feature-classroom',
  standalone: true,
  imports: [
    CommonModule,
    WordSelectorComponent
  ],
  templateUrl: './feature-classroom.component.html',
  styleUrls: ['./feature-classroom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureClassroomComponent {}
