import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { QuestionsRepository } from '../../data-acccess/questions.repository'




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

export class QuestionListStore extends ComponentStore<State> {

    repository = inject(QuestionsRepository)

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


    readonly fetchQuestions = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => {
                this.patchState({loading: true})
            }),
            switchMap(() => this.repository.getQuestions().pipe(
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

}

