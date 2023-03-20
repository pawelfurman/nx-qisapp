import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { SetsFetchStore } from '../../store/sets-fetch.store'
import { WordSelectorStore } from '../word-selector/word-selector.store'
import { WordSelectorSetsVm } from './word-selector-sets.vm'


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
    setsFetchStore = inject(SetsFetchStore)
    view = inject(WordSelectorSetsVm)

    constructor(){
        super(initialState)
    }

    readonly entities$ = this.select(state => state.entities)

    vm$ = this.select(
        this.setsFetchStore.entities$,
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


    onEntitiesFetch = this.effect((trigger$: Observable<any[]>) => {
        return this.setsFetchStore.entities$.pipe(
            tap((response) => {
                this.view.entities.set([...response])
            })
        )
    })

    onSetsSelect = this.effect((trigger$: Observable<any[]>) => {
        return this.wordSelectorStore.selectedSets$.pipe(
            tap((selectedSets: any) => {
                this.view.selectedSets.set([...selectedSets])
            })
        )
    })
}