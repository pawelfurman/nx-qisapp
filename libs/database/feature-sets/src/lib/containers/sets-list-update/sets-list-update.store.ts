import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { catchError, concatMap, delay, EMPTY, map, Observable, of, switchMap, tap, throwError, withLatestFrom } from "rxjs";
import { SetRepository } from "../../data-access/sets.repository";



type State = {
    loading: boolean
    entity: any
}

const initialState: any = {
    loading: false,
    entity: {}
}

export class SetsListUpdateStore extends ComponentStore<State> {

    repository = inject(SetRepository)

    constructor(){
        super(initialState)
    }

    entity$ = this.select(state => state.entity)
    loading$ = this.select(state => state.loading)


    updateSet = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap((setId) => {
                this.patchState({loading: true})
            }),
            withLatestFrom(this.entity$),
            switchMap(([_, data]) => {
                console.log('entity?1', {...data})
                return this.repository.updateSet(data.id, data).pipe(
                    delay(1000),
                    tapResponse(
                        (response) => {
                            console.log('resposne', response)
                        }, 
                        () => {}
                    ),
                )
            }),
            tap((_: any) => {
                this.patchState({loading: false})
            }),
            catchError((error) => {
                this.patchState({loading: false})
                return of(error)
            })
        )
    })

}