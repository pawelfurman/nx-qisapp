import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'
import { LessonRepository } from '../data-access/lesson.repository'


type State = {
    entities: any[],
    loaded: boolean,
    loading: boolean
}

const initialState: State = {
    entities: [],
    loaded: false,
    loading: false
}


export class SetsFetchStore extends ComponentStore<State> {

    lessonRepository = inject(LessonRepository)

    constructor(){
        super(initialState)
    }

    readonly entities$ = this.select(state => state.entities)
    readonly loaded$ = this.select(state => state.loaded)
    readonly loading$ = this.select(state => state.loading)


    vm$ = this.select(
        this.entities$, 
        this.loading$,
        this.loaded$,
        (entities, loaded, loading) => {
            return {
                entities,
                loaded,
                loading
            }
            
        }
    )


    readonly fetch = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => {
                this.patchState({loading: true})
            }),
            switchMap(() => this.lessonRepository.fetchAllSets().pipe(
                tapResponse((entities) => {
                    this.patchState({
                        entities,
                        loading: false,
                        loaded: true
                    })
                },
                () => {
                    this.patchState({
                        loading: false,
                        loaded: false
                    })
                })
            ) )
        ) 
    })

}