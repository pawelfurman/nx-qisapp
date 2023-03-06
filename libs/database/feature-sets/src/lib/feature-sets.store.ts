import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";


type State = {
    entities: any[]
}

const initialState: any = {
    entities: []
}

export class FeatureSetsStore extends ComponentStore<State> {

    http = inject(HttpClient)

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
        return this.http.get<any[]>(`http://localhost:3000/sets`).pipe(
            tapResponse((entities) => {
                console.log('response1', entities)
                this.patchState({entities})
            }, () => {})
        )
    })
}