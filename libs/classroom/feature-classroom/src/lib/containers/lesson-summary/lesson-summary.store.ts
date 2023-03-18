import { HttpClient } from '@angular/common/http'
import { EventEmitter, inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { from, map, mergeMap, Observable, of, switchMap, tap, toArray, withLatestFrom } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { WordSelectorStore } from '../word-selector/word-selector.store'


type State = {
    answerIncrement: number,
    repetition: number
}

const initialState: State = {
    answerIncrement: 1,
    repetition: 1
}

export class LessonSummaryStore extends ComponentStore<State> {

    wordSelectorStore = inject(WordSelectorStore)
    lessonRepository = inject(LessonRepository)

    startLessonEmitter: EventEmitter<any> = new EventEmitter()

    constructor(){
        super(initialState)
    }

    answerIncrement$ = this.select(state => state.answerIncrement)
    repetition$ = this.select(state => state.repetition)

    vm$ = this.select(
        this.wordSelectorStore.selectedSets$,
        this.wordSelectorStore.selectedQuestions$,
        this.answerIncrement$,
        this.repetition$,
        (selectedSets, selectedQuestions, answerIncrement, repetition) => {
            return {
                selectedSets,
                selectedQuestions,
                answerIncrement,
                repetition
            }
        }
    )


    readonly startLesson = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(
                this.repetition$,
                this.answerIncrement$
            ),
            tap(([_, repetition, answerIncrement]) => {
                this.startLessonEmitter.emit({
                    repetition,
                    answerIncrement
                })
            })
            
        )
    })

}

