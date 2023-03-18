import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { LessonsRepository } from '../../data-access/lessons.repository'



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

export class LessonsStore extends ComponentStore<State> {

    repository = inject(LessonsRepository)

    constructor(){
        super(initialState)
    }


    entities$ = this.select(state => state.entities)
    loading$ = this.select(state => state.loading)
    loaded$ = this.select(state => state.loaded)

    vm$ = this.select(
        this.entities$,
        this.loading$,
        this.loaded$,
        (entities, loading, loaded) => {
            return {
                entities,
                loading,
                loaded
            }
        }
    )


    readonly fetchLessons = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => {
                this.patchState({loading: true})
            }),
            switchMap(() => this.repository.getLessons().pipe(
                tapResponse(
                    (entities) => {
                        console.log('response', entities)
                        this.patchState({
                            entities,
                            loading: true,
                            loaded: true
                        })
                    },
                    () => {
                        this.patchState({loading: false, loaded: false})
                    }
                )
            ))
        )
    })

}

