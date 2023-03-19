import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { ExerciseEngineService } from '../../services/engine.service'
import { WordSelectorStore } from '../word-selector/word-selector.store'


type State = {
    questions: any[],
    phrase: string,
    previousPhrase: string,
    previousQuestionId: string,
    toGuess: any[],
    guessed: any[]
}

const initialState: State = {
    questions: [],
    phrase: '',
    previousPhrase: '',
    previousQuestionId: '',
    toGuess: [],
    guessed: []

}

export class LessonStore extends ComponentStore<State> {

    engine = inject(ExerciseEngineService)

    constructor(){
        super(initialState)
    }

    questions$ = this.select(state => state.questions)
    phrase$ = this.select(state => state.phrase)
    toGuess$ = this.select(state => state.toGuess)
    guessed$ = this.select(state => state.guessed)
    previousPhrase$ = this.select(state => state.previousPhrase)
    previousQuestionId$ = this.select(state => state.previousQuestionId)


    firstToGuess$ = this.select(
        this.toGuess$,
        (toGuess) => toGuess[0]
    )

    currentQuestion$ = this.select(
        this.questions$,
        this.firstToGuess$,
        (questions, firstToGuessId) => questions.find(q => q.id === firstToGuessId)
    )

    previousQuestion$ = this.select(
        this.previousQuestionId$,
        this.questions$,
        (id, questions) => questions.find(q => q.id === id) 
    )

    

    vm$ = this.select(
        this.questions$,
        this.phrase$,
        this.currentQuestion$,
        this.toGuess$,
        this.guessed$,
        this.previousPhrase$,
        this.previousQuestion$,
        (questions, phrase, currentQuestion, toGuess, guessed, previousPhrase, previousQuestion) => {
            return {
                questions, phrase, currentQuestion, toGuess, guessed, previousPhrase, previousQuestion
            }
        }
    )


    readonly submitPhrase = this.effect((trigger$) => {
        return trigger$.pipe(
            switchMap(() => this.phrase$.pipe(
                take(1),
                filter(phrase => !!phrase.length)
            )),
            withLatestFrom(
                this.currentQuestion$,
                this.toGuess$,
                this.guessed$
                
            ),
            tap(([phrase, question, toGuess, guessed]) => {
                const correctness = this.engine.compareAnswers(phrase, question.secondValue)
                if(correctness){
                    this.engine.setupCorrectAnswer(toGuess, guessed)

                    const newState = this.engine.setupCorrectAnswer(toGuess, guessed)
                    this.patchState({
                        ...newState
                    })

                    if(!newState.toGuess.length){
                    }
                }else{
                    this.patchState({
                        toGuess: this.engine.setupIncorrectAnswer(toGuess, 1)
                    })
     
                }
                this.patchState({phrase: '', previousPhrase: phrase, previousQuestionId: question.id})
            })
        )
    })


    readonly setQuestions = this.effect(() => {
        return this.questions$.pipe(
            filter(questions => !!questions.length),
            tap((questions) => {
                const q = questions.slice(0, 2);
                const toGuess = this.engine.prepareQuestionsToGuess(q, 1)

                this.patchState({
                    toGuess
                })
            }) 
        )
    })

    readonly followEnd = this.effect(() => {
        return this.toGuess$.pipe(
            withLatestFrom(
                this.guessed$
            ),
            filter(([toGuess, guessed]) => !toGuess.length && !!guessed.length ),
            tap(([toGuess, guessed]) => {
            })
        )
    })


    readonly finish = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => {
                this.patchState({
                    questions: [],
                    toGuess: [],
                    guessed: []

                })
            })
        )
    })

}

