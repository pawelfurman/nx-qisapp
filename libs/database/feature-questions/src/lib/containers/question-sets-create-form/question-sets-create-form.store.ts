import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { QuestionsRepository } from '../../data-acccess/questions.repository'
import { QuestionsFetchStore } from '../../store/questions-fetch.store'
import { QuestionsSetsCreateFormVm } from './question-sets-create-form.vm'




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

export class QuestionSetsListStore extends ComponentStore<State> {

    repository = inject(QuestionsRepository)
    questionsFetchStore = inject(QuestionsFetchStore)
    view = inject(QuestionsSetsCreateFormVm)

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


    readonly createQuestion = this.effect((formDate$: Observable<any>) => {
        return formDate$.pipe(
            tap((formDate) => {
                this.patchState({loading: true})
            }),
            withLatestFrom(this.setId$),
            switchMap(([formData, setId]) => this.repository.createQuestion(setId, formData).pipe(
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
                ),
                map((data: any) => setId)
            )),
            tap((setId: any) => {
                this.questionsFetchStore.fetchQuestions(setId)
            })
        )
    })
  

    readonly syncView = this.effect(() => {
        return this.model$.pipe(
            tap((model: any) => {
            })
        )
    })

}

