import { HttpClient } from '@angular/common/http'
import { inject } from '@angular/core'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { Observable, switchMap } from 'rxjs'


type State = {
    selectedSets: number[],
}

const initialState: State = {
    selectedSets: []
}


export class WordSelectorStore extends ComponentStore<State> {



    constructor(){
        super(initialState)
    }

    readonly selectedSets$ = this.select(state => state.selectedSets)


    readonly addSet = this.updater((state, setId: number) => {
        const isAdded = state.selectedSets.find( id => id === setId )
        const selectedSets = isAdded ?
            state.selectedSets.filter(id => id !== setId)
            : [...state.selectedSets, setId]
        return {...state, selectedSets}
    })

    vm$ = this.select(
        this.selectedSets$,
        (selectedSets) => {
            return {
                selectedSets
            }
            
        }
    )

}