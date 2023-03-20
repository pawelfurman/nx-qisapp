


import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
import { WordSelectorSetsStore } from '../word-selector-sets/word-selector-sets.store'
import { WordSelectorStore } from '../word-selector/word-selector.store'
import { WordSelectorSelectionVm } from './word-selector-selection.vm'


type State = {
  
}

const initialState: State = {

}


export class WordSelectorSelectionStore extends ComponentStore<State> {

    wordSelectorStore = inject(WordSelectorStore)
    view = inject(WordSelectorSelectionVm)

    constructor(){
        super(initialState)
    }

    readonly onQuestionsChange = this.effect(() => {
        return this.wordSelectorStore.selectedQuestions$.pipe(
            tap((questions) => this.view.questions.set([...questions]))
        )
    })
}