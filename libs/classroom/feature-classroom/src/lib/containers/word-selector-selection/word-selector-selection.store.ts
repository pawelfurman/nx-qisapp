


import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
import { WordSelectorSetsStore } from '../word-selector-sets/word-selector-sets.store'
import { WordSelectorStore } from '../word-selector/word-selector.store'


type State = {
  
}

const initialState: State = {

}


export class WordSelectorSelectionStore extends ComponentStore<State> {


    wordSelectorStore = inject(WordSelectorStore)
    wordSelectorSetsStore = inject(WordSelectorSetsStore)

    constructor(){
        super(initialState)
    }


    vm$ = this.select(
        this.wordSelectorSetsStore.entities$,
        this.wordSelectorStore.selectedSets$,
        (entities, selectedSets) => {
            return {
                entities: entities.filter(e => !!selectedSets.find(id => id === e.id))

            }
            
        }
    )


}