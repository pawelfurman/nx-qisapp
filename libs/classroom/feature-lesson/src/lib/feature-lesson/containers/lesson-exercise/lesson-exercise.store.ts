import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { filter, from, map, mergeMap, Observable, of, switchMap, take, tap, toArray, withLatestFrom } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { ExerciseEngineService } from '../../services/engine.service'



type State = {
    questions: any[],
    phrase: string,
    previousPhrase: string,
    previousQuestionId: string,
    toGuess: any[],
    guessed: any[],
    repetition: number,
    answerIncrement: number
}

const initialState: State = {
    questions: [],
    phrase: '',
    previousPhrase: '',
    previousQuestionId: '',
    toGuess: [],
    guessed: [],
    repetition: 1,
    answerIncrement: 1

}

export class LessonExerciseStore extends ComponentStore<State> {

    engine = inject(ExerciseEngineService)
    repository = inject(LessonRepository)

    constructor(){
        super(initialState)
    }

    questions$ = this.select(state => state.questions)
    phrase$ = this.select(state => state.phrase)
    toGuess$ = this.select(state => state.toGuess)
    guessed$ = this.select(state => state.guessed)
    previousPhrase$ = this.select(state => state.previousPhrase)
    previousQuestionId$ = this.select(state => state.previousQuestionId)
    repetition$ = this.select(state => state.repetition)
    answerIncrement$ = this.select(state => state.answerIncrement)


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
                this.guessed$,
                this.answerIncrement$
            ),
            tap(([phrase, question, toGuess, guessed, answerIncrement]) => {
                const correctness = this.engine.compareAnswers(phrase, question.secondValue)
                if(correctness){
                    this.engine.setupCorrectAnswer(toGuess, guessed)

                    const newState = this.engine.setupCorrectAnswer(toGuess, guessed)
                    this.patchState({
                        ...newState
                    })

                    if(!newState.toGuess.length){
                        console.log('FInish from phrase guess')
                    }
                }else{
                    this.patchState({
                        toGuess: this.engine.setupIncorrectAnswer(toGuess, answerIncrement)
                    })
     
                }
                this.patchState({phrase: '', previousPhrase: phrase, previousQuestionId: question.id})
            })
        )
    })


    readonly setQuestions = this.effect(() => {
        return this.questions$.pipe(
            filter(questions => !!questions.length),
            withLatestFrom(this.repetition$),
            tap(([questions, repetition]: any[]) => {
                const q = questions.slice(0, 2);
                const toGuess = this.engine.prepareQuestionsToGuess(q, repetition)

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
                console.log('FINISH')
            })
        )
    })


    readonly fetchLesson = this.effect((lessonId$: Observable<string | number>) => {
        return lessonId$.pipe(
            switchMap((lessonId) => this.repository.getLesson(lessonId).pipe(
                tapResponse(
                    (response: any) => {
                        console.log(response, response.repetition)
                        this.patchState({
                            repetition: response.repetition,
                            answerIncrement: response.answerIncrement
                        })

                        this.patchState({
                            questions: response.questions.map((q:any) => this.engine.prepareReverseQuestion(q) )
                        })
                    },
                    () => {}
                )
            ))
        )
    }) 
}

