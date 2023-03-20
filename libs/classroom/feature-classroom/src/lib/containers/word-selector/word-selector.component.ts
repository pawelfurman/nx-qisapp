import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSetsComponent } from '../word-selector-sets/word-selector-sets.component';
import { WordSelectorSelectionComponent } from '../word-selector-selection/word-selector-selection.component';
import { WordSelectorStore } from './word-selector.store';
import { WordSelectorSetsStore } from '../word-selector-sets/word-selector-sets.store';
import { LessonSummaryComponent } from '../lesson-summary/lesson-summary.component';
import { LessonComponent } from '../lesson/lesson.component';
import { SetsFetchStore } from '../../store/sets-fetch.store';
import { Router } from '@angular/router';
import { WordSelectorSpecialComponent } from '../word-selector-special/word-selector-special.component';

@Component({
  selector: 'qisapp-word-selector',
  standalone: true,
  imports: [
    CommonModule,
    WordSelectorSetsComponent,
    WordSelectorSelectionComponent,
    LessonSummaryComponent,
    LessonComponent,
    WordSelectorSpecialComponent
  ],
  templateUrl: './word-selector.component.html',
  styleUrls: ['./word-selector.component.scss'],
  providers: [WordSelectorStore, SetsFetchStore]

})
export class WordSelectorComponent {

  store = inject(WordSelectorStore)
  setsFetchStore = inject(SetsFetchStore)
  router = inject(Router)

  vm$ = this.store.vm$


  fetchSets(){
    // this.setsFetchStore.fetch()
  }

  selectSet(setId: number){
    // this.store.addSet(setId)
    this.store.addQuestionsBySetId(setId)
  }

  startLesson(data: any){
    // this.store.moveQuestions();
    // this.router.navigate(['/', 'classroom', 'lesson'])

    this.store.startLesson(data)
  }

  removeQuestion(id: number){
    this.store.removeQuestion(id)
  }
}
