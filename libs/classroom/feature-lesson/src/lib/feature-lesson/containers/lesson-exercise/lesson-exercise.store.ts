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
    answerIncrement: number,
    tries: number
    lessonId: number
}

const initialState: State = {
    questions: [],
    phrase: '',
    previousPhrase: '',
    previousQuestionId: '',
    toGuess: [],
    guessed: [],
    repetition: 1,
    answerIncrement: 1,
    tries: 0,
    lessonId: 0

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
    tries$ = this.select(state => state.tries)
    lessonId$ = this.select(state => state.lessonId)


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
        this.previousPhrase$,
        (id, questions, previousPhrase) => {
            const question = questions.find(q => q.id === id)

            if(!question){
                return undefined
            }
            
            return {
                ...question,
                result: this.engine.compareAnswers(previousPhrase, question.secondValue)
            }
        }
    )

    vm$ = this.select(
        this.questions$,
        this.phrase$,
        this.currentQuestion$,
        this.toGuess$,
        this.guessed$,
        this.previousPhrase$,
        this.previousQuestion$,
        this.tries$,
        this.lessonId$,
        (questions, phrase, currentQuestion, toGuess, guessed, previousPhrase, previousQuestion, tries, lessonId) => {
            return {
                questions, phrase, currentQuestion, toGuess, guessed, previousPhrase, previousQuestion,
                percent: (guessed.length / (toGuess.length + guessed.length) * 100).toFixed(2),
                efficiency: (100 * guessed.length / tries).toFixed()
            }
        }
    )

    readonly incrementTries = this.updater((state) => ({...state, tries: state.tries + 1}))


    readonly submitPhrase = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => {
                this.incrementTries()
            }),
            switchMap(() => this.phrase$.pipe(
                take(1),
                // filter(phrase => !!phrase.length)
            )),
            withLatestFrom(
                this.currentQuestion$,
                this.toGuess$,
                this.guessed$,
                this.answerIncrement$,
                this.lessonId$,
            ),
            tap(([phrase, question, toGuess, guessed, answerIncrement, lessonId]) => {
                const correctness = this.engine.compareAnswers(phrase, question.secondValue)
                console.log('phrase', phrase, correctness)
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
                        toGuess: this.engine.setupIncorrectAnswer(toGuess, answerIncrement)
                    })
     
                }

                this.repository.createLessonStep(lessonId, {
                    lessonId,
                    correctness,
                    questionId: question.id
                }).subscribe()

                this.patchState({phrase: '', previousPhrase: phrase, previousQuestionId: question.id})
            })
        )
    })


    readonly followEnd = this.effect(() => {
        return this.toGuess$.pipe(
            withLatestFrom(
                this.guessed$,
                this.lessonId$
            ),
            filter(([toGuess, guessed, lessonId]) => !toGuess.length && !!guessed.length ),
            tap(([toGuess, guessed, lessonId]) => {
            }),
            switchMap(([toGuess, guessed, lessonId]) => this.repository.createLessonStatus(lessonId, {
                lessonId,
                status: 'finished'
            }))
        )
    })


    readonly fetchLesson = this.effect((lessonId$: Observable<string | number>) => {
        return lessonId$.pipe(
            switchMap((lessonId) => this.repository.getLesson(lessonId).pipe(
                tapResponse(
                    (response: any) => {
                        this.patchState({
                            repetition: response.repetition,
                            answerIncrement: response.answerIncrement
                        })
                        const repetition = response.repetition
                        const reversedQuestions = response.questions.map((q:any) => this.engine.prepareReverseQuestion(q))
                        const toGuess =  this.engine.prepareQuestionsToGuess(reversedQuestions, repetition)
                        const tries = response.steps.length
            
                        //recreate the state
                        let newToGuess: any[] = [...toGuess]
                        let newGuessed: any[] = []
                        response.steps.forEach((step: any) => {
                            if(step.correctness){
                                const toGuessWithoutStep = newToGuess.filter(tg => tg !== step.questionId)
                                const stepsFromToGuess = newToGuess.filter(tg => tg === step.questionId)

                                newToGuess = [...toGuessWithoutStep, ...stepsFromToGuess.slice(1)]
                                newGuessed = [...newGuessed, stepsFromToGuess[0]]
                            }

                            if(!step.correctness){
                                const additionalAmount = repetition - 1;
                                if(repetition > 0){
                                    const penetlyToGuess = Array(additionalAmount).fill(step.questionId)

                                    newToGuess = [...newToGuess, ...penetlyToGuess]
                                }
                            }
                        })

                        this.patchState({
                            questions: response.questions.map((q:any) => this.engine.prepareReverseQuestion(q) ),
                            toGuess: [...this.engine.shuffleArray(newToGuess)],
                            guessed: [...newGuessed],
                            tries
                        })
                    },
                    () => {}
                )
            ))
        )
    }) 


    readonly changeStatus = this.effect((lessonId$: Observable<string | number>) => {
        return lessonId$.pipe(
            switchMap((lessonId) => this.repository.createLessonStatus(lessonId, {
                lessonId,
                status: 'initialized'
            }).pipe(
                tapResponse(
                    (response: any) => {
                    },
                    () => {}
                )
            ))
        )
    }) 

}

