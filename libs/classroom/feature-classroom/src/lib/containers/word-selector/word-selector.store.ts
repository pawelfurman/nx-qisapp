import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { EMPTY, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { SetsFetchStore } from '../../store/sets-fetch.store'


type State = {
    selectedSets: number[]
    questions: any[]
    setsEntities: any[]
    selectedQuestions: any[]
}

const initialState: State = {
    selectedSets: [],
    questions: [],
    setsEntities: [],
    selectedQuestions: []
}


export class WordSelectorStore extends ComponentStore<State> {

    lessonRepository = inject(LessonRepository)
    setsFetchStore = inject(SetsFetchStore)
    router = inject(Router)


    constructor(){
        super(initialState)
    }

    readonly questions$ = this.select(state => state.questions)
    readonly setsEntities$ = this.select(state => state.setsEntities)
    readonly selectedQuestions$ = this.select(state => state.selectedQuestions)


    readonly selectedSets$ = this.select(state => state.selectedQuestions
        .map(sq => sq.tag)
        .map(tag => Number(tag.split('-').slice(-1)[0]))
        .filter((value,index,array) => array.indexOf(value)=== index)
    )

    vm$ = this.select(
        this.selectedSets$,
        this.questions$,
        this.setsFetchStore.entities$,
        this.selectedQuestions$,
        (selectedSets, questions, entities, selectedQuestions) => {
            return {
                selectedSets,
                questions,
                entities,
                selectedQuestions
            }
            
        }
    )

    readonly mergeSelectedQuestions = this.updater((state, questions: any[]) => {
        return {...state, selectedQuestions: [...state.selectedQuestions, ...questions]}
    })

    readonly moveQuestions = this.updater((state) => {
        return {...state, questions: [...state.selectedQuestions], selectedQuestions: []}
    })



    readonly addQuestionsBySetId = this.effect((setId$: Observable<number>) => {
        return setId$.pipe(
            withLatestFrom(
                this.selectedQuestions$
            ),
            switchMap(([setId, selectedQuestions]) => {
                const tag = `set-id-${setId}`
                const isTagInSelection = selectedQuestions.filter(sq => sq.tag === tag)

                if(isTagInSelection.length){
                    this.patchState({
                        selectedQuestions: selectedQuestions.filter(sq => sq.tag !== tag)
                    })
                    return EMPTY
                }   

                return this.lessonRepository.fetchQuestionsBySetId(setId).pipe(
                    tapResponse(
                        (questions) => {
                            this.mergeSelectedQuestions(questions.map(q => ({...q, tag: `set-id-${setId}`})))
                            
                        },
                        () => {}    
                    )
                )
            } )
        )
    })



    readonly startLesson = this.effect((data$: Observable<any>) => {
        return data$.pipe(
            withLatestFrom(
                this.selectedQuestions$.pipe(
                    map(selecteQuestions => selecteQuestions.map(sq => sq.id))
                )
            ),
            switchMap(([data, questions]) => this.lessonRepository.createLesson({
                questions,
                ...data
            }).pipe(
                tapResponse(
                    (response: any) => {
                        this.router.navigate(['/', 'classroom', 'lessons', response.id])

                    },
                    () => {}
                ))
            ),
            
            
        )
    })


    readonly addQuestionsByTimeAmount = this.effect((amount$: Observable<number>) => {
        return amount$.pipe(
            tap(() => {}),
            switchMap((amount) => this.lessonRepository.fetchQuestionsByTimeAmount(amount).pipe(
                tapResponse(
                    (response: any) => {
                        this.mergeSelectedQuestions(response.questions.map((q: any) => {
                            return {
                                ...q,
                                tag: `special-time-amount-${q.id}`
                            }
                        }))
                    },
                    () => {

                    })
            ))
        )
    })


}