import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordSelectorSetsComponent } from '../word-selector-sets/word-selector-sets.component';
import { WordSelectorSelectionComponent } from '../word-selector-selection/word-selector-selection.component';
import { WordSelectorStore } from './word-selector.store';
import { WordSelectorSetsStore } from '../word-selector-sets/word-selector-sets.store';
import { LessonSummaryComponent } from '../lesson-summary/lesson-summary.component';
import { LessonComponent } from '../lesson/lesson.component';
import { SetsFetchStore } from '../../store/sets-fetch.store';

@Component({
  selector: 'qisapp-word-selector',
  standalone: true,
  imports: [
    CommonModule,
    WordSelectorSetsComponent,
    WordSelectorSelectionComponent,
    LessonSummaryComponent,
    LessonComponent
  ],
  templateUrl: './word-selector.component.html',
  styleUrls: ['./word-selector.component.scss'],
  providers: [WordSelectorStore, WordSelectorSetsStore, SetsFetchStore]
  //@TODO - INCORRECT - WordSelectorSetsStore shouldnt be provided here
})
export class WordSelectorComponent {

  store = inject(WordSelectorStore)
  setsFetchStore = inject(SetsFetchStore)

  vm$ = this.store.vm$


  fetchSets(){
    this.setsFetchStore.fetch()
  }

  selectSet(setId: number){
    // this.store.addSet(setId)
    this.store.addQuestionsBySetId(setId)
  }
}
