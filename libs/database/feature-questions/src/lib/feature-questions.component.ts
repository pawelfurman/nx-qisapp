import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from './containers/question-list/question-list.component';
import { QuestionsRepository } from './data-acccess/questions.repository';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'qisapp-feature-questions',
  standalone: true,
  imports: [CommonModule, QuestionListComponent],
  templateUrl: './feature-questions.component.html',
  styleUrls: ['./feature-questions.component.scss'],
  providers: [QuestionsRepository]
})
export class FeatureQuestionsComponent {}
