import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { EMPTY, Observable, switchMap, tap, withLatestFrom } from 'rxjs'
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

    readonly mergeQuestions = this.updater((state, questions: any[]) => {
        return {...state, selectedQuestions: [...state.selectedQuestions, ...questions]}
    })



    readonly addQuestionsBySetId = this.effect((setId$: Observable<number>) => {
        return setId$.pipe(
            withLatestFrom(
                this.selectedQuestions$
            ),
            switchMap(([setId, selectedQuestions]) => {
                const tag = `set-id-${setId}`
                const isTagInSelection = selectedQuestions.filter(sq => sq.tag === tag)
                console.log('isTagInSelection', isTagInSelection)

                if(isTagInSelection.length){
                    this.patchState({
                        selectedQuestions: selectedQuestions.filter(sq => sq.tag !== tag)
                    })
                    return EMPTY
                }   

                return this.lessonRepository.fetchQuestionsBySetId(setId).pipe(
                    tapResponse(
                        (questions) => {
                            console.log('questions', questions)
                            this.mergeQuestions(questions.map(q => ({...q, tag: `set-id-${setId}`})))
                            
                        },
                        () => {}    
                    )
                )
            } )
        )
    })

    




}