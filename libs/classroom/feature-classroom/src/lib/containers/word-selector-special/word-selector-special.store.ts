import { HttpClient } from '@angular/common/http'
import { EventEmitter, inject } from '@angular/core'
import { Router } from '@angular/router'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { EMPTY, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs'



type State = {
    amount: number | null

}

const initialState: State = {
    amount: null
}


export class WordSelectorSpecialStore extends ComponentStore<State> {

    amountEmitter$: EventEmitter<number> = new EventEmitter()

    constructor(){
        super(initialState)
    }

    amount$ = this.select(state => state.amount)

    vm$ = this.select(
        this.amount$,
        (amount) => {
            return {
                amount
            }
        }

    )

    readonly submit = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(
                this.amount$
            ),
            tap(([_, amount]) => {
                if(amount){
                    this.amountEmitter$.emit(amount)
                }
            })
        )
    })



 


}