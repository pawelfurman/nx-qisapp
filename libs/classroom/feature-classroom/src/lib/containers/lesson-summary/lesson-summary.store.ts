import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { from, map, mergeMap, Observable, of, switchMap, tap, toArray, withLatestFrom } from 'rxjs'
import { WordSelectorStore } from '../word-selector/word-selector.store'


type State = {
}

const initialState: State = {

}


export class LessonSummaryStore extends ComponentStore<State> {

    wordSelectorStore = inject(WordSelectorStore)
    http = inject(HttpClient)

    constructor(){
        super(initialState)
    }


    vm$ = this.select(
        this.wordSelectorStore.selectedSets$,
        (selectedSets) => {
            return {
                selectedSets
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
                        console.log('setId', setId)

                        return this.http.get<any[]>(`http://localhost:3000/sets/${setId}/questions`)
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
                console.log('questions', questions)
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