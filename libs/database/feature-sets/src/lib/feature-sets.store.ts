import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { SetRepository } from "./data-access/sets.repository";


type State = {
    entities: any[]
}

const initialState: any = {
    entities: []
}

export class FeatureSetsStore extends ComponentStore<State> {

    http = inject(HttpClient)
    repository = inject(SetRepository)

    constructor(){
        super(initialState)
    }

    readonly entities$ = this.select(state => state.entities)

    vm$ = this.select(
        this.entities$,
        (entities) => {
            return {
                entities
            }
            
        }
    )


    fetchSets = this.effect(() => {
        return this.repository.fetchSets().pipe(
            tapResponse((entities) => {
                this.patchState({entities})
            }, () => {})
        )
    })
}