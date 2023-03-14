import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
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


    fetch = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            switchMap(() => this.http.get<any[]>(`http://localhost:3000/sets`).pipe(
                tapResponse((entities) => {
                    this.patchState({entities})
                }, () => {})
            ) )
        ) 
    })

    selectSet = this.effect((setId$: Observable<number>) => {
        return setId$.pipe(
            tap((setId => {
                this.wordSelectorStore.addSet(setId)
            }))
        )
    })
}