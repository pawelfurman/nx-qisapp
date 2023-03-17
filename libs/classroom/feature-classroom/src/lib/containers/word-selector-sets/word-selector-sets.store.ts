import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { WordSelectorStore } from '../word-selector/word-selector.store'


type State = {
    entities: any[],
    loading: boolean,
    loaded: boolean
}

const initialState: State = {
    entities: [],
    loading: false,
    loaded: false
}


export class WordSelectorSetsStore extends ComponentStore<State> {

    http = inject(HttpClient)
    lessonRepository = inject(LessonRepository)
    wordSelectorStore = inject(WordSelectorStore)

    constructor(){
        super(initialState)
    }

    readonly entities$ = this.select(state => state.entities)

    vm$ = this.select(
        this.entities$,
        this.wordSelectorStore.selectedSets$,
        (entities, selectedSets) => {
            return {
                entities: entities.map(e => {
                    return {
                        ...e,
                        isAdded: !!selectedSets.find(id => id === e.id)
                    }
                })
            }
            
        }
    )


    selectSet = this.effect((setId$: Observable<number>) => {
        return setId$.pipe(
            tap((setId => {
                // this.wordSelectorStore.addSet(setId)
            }))
        )
    })
}