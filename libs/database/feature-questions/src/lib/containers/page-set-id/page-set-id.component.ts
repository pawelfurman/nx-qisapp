import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetsCreateFormComponent } from '../question-sets-create-form/question-sets-create-form.component';
import { QuestionSetsListComponent } from '../question-sets-list/question-sets-list.component';
import { ActivatedRoute } from '@angular/router';
import { QuestionsRepository } from '../../data-acccess/questions.repository';
import { QuestionsFetchStore } from '../../store/questions-fetch.store';

@Component({
  selector: 'qisapp-page-set-id',
  standalone: true,
  imports: [
    CommonModule,
    QuestionSetsCreateFormComponent, 
    QuestionSetsListComponent],
  templateUrl: './page-set-id.component.html',
  styleUrls: ['./page-set-id.component.scss'],
  providers: [QuestionsRepository, QuestionsFetchStore]
})
export class PageSetIdComponent implements OnInit {
  route = inject(ActivatedRoute)
  setId = signal<string | number>(this.route.snapshot.paramMap.get('setId') as string)

  ngOnInit(): void {
  }
}
