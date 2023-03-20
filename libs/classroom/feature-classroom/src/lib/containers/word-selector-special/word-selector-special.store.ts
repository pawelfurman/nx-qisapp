import { HttpClient } from '@angular/common/http'
import { EventEmitter, inject } from '@angular/core'
import { Router } from '@angular/router'
import {ComponentStore, tapResponse} from '@ngrx/component-store'
import { EMPTY, map, Observable, switchMap, tap, withLatestFrom } from 'rxjs'



type State = {
}

const initialState: State = {

}


export class WordSelectorSpecialStore extends ComponentStore<State> {

    constructor(){
        super(initialState)
    }


}