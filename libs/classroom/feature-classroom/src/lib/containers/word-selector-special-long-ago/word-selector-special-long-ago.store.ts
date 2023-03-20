import { HttpClient } from '@angular/common/http'
import { computed, effect, EventEmitter, inject, Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { delay, EMPTY, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { WordSelectorStore } from '../word-selector/word-selector.store'
import { WordSelectorSpecialLongAgoVm } from './word-selector-special-long-ago.vm'



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

@Injectable()
export class WordSelectorSpecialLongAgoStore extends ComponentStore<State> {

    repository = inject(LessonRepository)
    reactiveView = inject(WordSelectorSpecialLongAgoVm)
    wordSelectorStore = inject(WordSelectorStore)


    entities$ = this.select(state => state.entities)

    constructor(){
        super(initialState)
    }

    readonly fetchQuestions = this.effect((amount$: Observable<number>) => {

        return amount$.pipe(
            tap(() => {
                this.reactiveView.loading.set(true)
            }),
            switchMap((amount) => this.repository.fetchQuestionsByTimeAmount(amount).pipe(
                delay(1000),
                tapResponse(
                    (response: any) => {
                        this.reactiveView.loading.set(false)
                        this.wordSelectorStore.mergeSelectedQuestions(response.questions.map((q: any) => ({
                            ...q,
                            tag: `special-time-amount-${q.id}`
                        })))
                    },
                    () => {}
                )
            )) 
        )
    })



 


}