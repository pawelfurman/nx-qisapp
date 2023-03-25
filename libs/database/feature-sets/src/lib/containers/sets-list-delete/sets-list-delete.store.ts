import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { catchError, concatMap, delay, EMPTY, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { SetRepository } from "../../data-access/sets.repository";
import { SetsListDeleteVm } from "./sets-list-delete.vm";



type State = {
    loading: boolean
    setId: number
}

const initialState: any = {
    loading: false,
    setId: 0
}

export class SetsListDeleteStore extends ComponentStore<State> {

    repository = inject(SetRepository)
    view = inject(SetsListDeleteVm)

    constructor(){
        super(initialState)
    }

    setId$ = this.select(state => state.setId)
    loading$ = this.select(state => state.loading)



    model$ = this.select(
        this.setId$,
        this.loading$,
        (setId, loading) => {
            return {
                setId,
                loading
            }
        }
    )


    readonly syncView = this.effect(() => {
        return this.model$.pipe(
            tap((model) => {
                this.view.setId.set(model.setId)
                this.view.loading.set(model.loading)
            })
        )
    })

    removeSet = this.effect((setId$: Observable<number>) => {
        return setId$.pipe(
            tap((setId) => {
                this.patchState({loading: true})
            }),
            switchMap((setId) => {
                return this.repository.deleteCheckSet(setId).pipe(
                    delay(1000),
                    tapResponse(
                        () => {}, 
                        () => {}
                    ),
                    map((response: any) => {
                        return [response, setId] as any
                    }),
                )
            }),
            switchMap(([canBeRemoved, setId]) => {
                if(canBeRemoved){
                    return this.repository.deleteSet(setId)
                }

                return throwError(() => new Error('Set is not empty'))
            }),
            tap((_: any) => {
                this.patchState({loading: false})
            }),
            catchError((error) => {
                console.log(error)
                this.patchState({loading: false})
                return of(error)
            })
        )
    })

}