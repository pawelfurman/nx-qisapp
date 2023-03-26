import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { QuestionsRepository } from '../data-acccess/questions.repository'





type State = {
    setId: any,
    entities: any[],
    loading: boolean,
    loaded: boolean
}

const initialState: State = {
    setId: '',
    entities: [],
    loading: false,
    loaded: false
}

export class QuestionsFetchStore extends ComponentStore<State> {

    repository = inject(QuestionsRepository)

    constructor(){
        super(initialState)
    }


    entities$ = this.select(state => state.entities)
    loading$ = this.select(state => state.loading)
    loaded$ = this.select(state => state.loaded)
    setId$ = this.select(state => state.setId)

    model$ = this.select(
        this.entities$,
        this.loading$,
        this.loaded$,
        (entities, loading, loaded) => {
            return {
                entities,
                loading,
                loaded
            }
        }, {debounce: true}
    )


    readonly fetchQuestions = this.effect((setId$: Observable<any>) => {
        return setId$.pipe(
            tap(() => {
                this.patchState({loading: true})
            }),
            switchMap((setId) => this.repository.fetchQuestionsBySetId(setId).pipe(
                tapResponse(
                    (entities) => {
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

