import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { delay, Observable, switchMap, tap } from "rxjs";
import { SetRepository } from "../data-access/sets.repository";


type State = {
    entities: any[],
    loading: boolean
}

const initialState: any = {
    entities: [],
    loading: false
}

export class SetsFetchStore extends ComponentStore<State> {


    repository = inject(SetRepository)

    constructor(){
        super(initialState)
    }

    readonly entities$ = this.select(state => state.entities)
    readonly loading$ = this.select(state => state.loading)


    fetchSets = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => {
                this.patchState({loading: true})
            }),
            delay(1000),
            switchMap(() => this.repository.fetchSets().pipe(
                tapResponse((entities) => {
                    this.patchState({entities, loading: false})
                }, () => {})
            ))
        )
        
        
    })
}