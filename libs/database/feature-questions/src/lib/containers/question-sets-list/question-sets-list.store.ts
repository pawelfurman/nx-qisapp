import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { QuestionsRepository } from '../../data-acccess/questions.repository'
import { QuestionsFetchStore } from '../../store/questions-fetch.store'
import { QuestionsSetsListVm } from './question-sets-list.vm'




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
    view = inject(QuestionsSetsListVm)

    constructor(){
        super(initialState)
    }


    entities$ = this.select(state => state.entities)
    loading$ = this.select(state => state.loading)
    loaded$ = this.select(state => state.loaded)
    setId$ = this.select(state => state.setId)

    model$ = this.select(
        this.questionsFetchStore.entities$,
        this.questionsFetchStore.loading$,
        this.questionsFetchStore.loaded$,
        (entities, loading, loaded) => {
            return {
                entities,
                loading,
                loaded
            }
        }, {debounce: true}
    )
    

    readonly fetchQuestions = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(this.setId$),
            tap(([_, setId]) => {
                this.questionsFetchStore.fetchQuestions(setId)
            })
        )
    })


    readonly markQuestionAsRemoved = this.updater((state, id: any) => {
        return {...state, entities: state.entities.map((e) => {
            if(e.id === id){
                return {...e, removed: true}
            }
            return e
        })}
    })

    readonly removeQuestion = this.effect((id$: Observable<any>) => {

        return id$.pipe(
            switchMap((id) => this.repository.deleteQuestion(id).pipe(
                tapResponse(
                    () => {
                        this.markQuestionAsRemoved(id)
                    },
                    () => {}
                )
            ))
        )
    })

    readonly deleteQuestion = this.effect((questionId$: Observable<string>) => {
        return questionId$.pipe(
            tap((questionId: any) => {
            }),
            switchMap((questionId) => this.repository.deleteQuestion(questionId)),
            withLatestFrom(this.setId$),
            tap(([_, setId]) => {
                this.questionsFetchStore.fetchQuestions(setId)
            })
        )
    })


    readonly syncView = this.effect(() => {
        return this.model$.pipe(
            tap((model: any) => {
                this.view.entities.set(model.entities)
            })
        )
    })

}

