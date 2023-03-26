import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListComponent } from '../question-list/question-list.component';
import { QuestionsRepository } from '../../data-acccess/questions.repository';

@Component({
  selector: 'qisapp-page-shell',
  standalone: true,
  imports: [CommonModule, QuestionListComponent],
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss'],
  providers: [QuestionsRepository]
})
export class PageShellComponent {}
