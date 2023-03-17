import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { from, map, mergeMap, Observable, of, switchMap, tap, toArray, withLatestFrom } from 'rxjs'
import { LessonRepository } from '../../data-access/lesson.repository'
import { WordSelectorStore } from '../word-selector/word-selector.store'


type State = {
}

const initialState: State = {

}

export class LessonSummaryStore extends ComponentStore<State> {

    wordSelectorStore = inject(WordSelectorStore)
    lessonRepository = inject(LessonRepository)

    constructor(){
        super(initialState)
    }


    vm$ = this.select(
        this.wordSelectorStore.selectedSets$,
        this.wordSelectorStore.selectedQuestions$,
        (selectedSets, selectedQuestions) => {
            return {
                selectedSets,
                selectedQuestions
            }
        }
    )


    readonly startLesson = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(
                this.wordSelectorStore.selectedSets$
            ),
            tap(([_, selectedSets]) => {
                console.log(selectedSets)
            }),
            switchMap(([_, selectedSets]) => {
                return from(selectedSets).pipe(
                    mergeMap((setId: number) => {

                        return this.lessonRepository.fetchQuestionsBySetId(setId)
                    }),
                    toArray()
                )
            }),
            map(questions => {
                return questions.reduce((acc,curr) => {
                    return [...acc, ...curr]
                }, [])
            }),
            tap((questions) => {
                this.wordSelectorStore.patchState({questions})
            })
            
        )
    })

}



// return this.http.get<Question[]>(`${environment.api}/sets/${setId}/questions`)

// fetchSets = this.effect(() => {
//     return this.http.get<any[]>(`http://localhost:3000/sets`).pipe(
//         tapResponse((entities) => {
//             console.log('response1', entities)
//             this.patchState({entities})
//         }, () => {})
//     )
// })