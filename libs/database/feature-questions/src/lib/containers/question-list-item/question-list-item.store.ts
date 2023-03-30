import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { QuestionsRepository } from '../../data-acccess/questions.repository'




type State = {
    loading: boolean,
    loaded: boolean,
    removed: boolean
}

const initialState: State = {
    loading: false,
    loaded: false,
    removed: false
}

export class QuestionListItemStore extends ComponentStore<State> {

    repository = inject(QuestionsRepository)

    constructor(){
        super(initialState)
    }


    loading$ = this.select(state => state.loading)
    loaded$ = this.select(state => state.loaded)
    removed$ = this.select(state => state.removed)

    vm$ = this.select(
        this.loading$,
        this.loaded$,
        this.removed$,
        (loading, loaded, removed) => {
            return {
                loading,
                loaded,
                removed
            }
        }
    )


    readonly updateQuestion = this.effect((data$: Observable<any>) => {

        return data$.pipe(
            switchMap((data) => this.repository.updateQuestion(data.setId, data.id, data).pipe(
                tapResponse(
                    (response) => {
                        console.log('respo', response)
                    },
                    () => {}
                )
            ))
        )
    })


    readonly removeQuestion = this.effect((id$: Observable<any>) => {

        return id$.pipe(
            switchMap((id) => this.repository.deleteQuestion(id).pipe(
                tapResponse(
                    () => {
                        this.patchState({removed: true})
                    },
                    () => {}
                )
            ))
        )
    })
}

