import { inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AuthFacade } from '@qisapp/store';
import { debounceTime, distinctUntilChanged, filter, of, startWith, switchMap } from 'rxjs';
import { FeatureLoginRepository } from './feature-login.repository';

type State = {
    password: string
}


const initialState: State = {
    password: ''
}


export class FeatureLoginStore extends ComponentStore<State>{
    constructor(){
        super(initialState)
    }

    authFacade = inject(AuthFacade)
    repository = inject(FeatureLoginRepository)

    readonly password$ = this.select(state => state.password)
    readonly delayedPassword$ = this.password$.pipe(
        debounceTime(300),
        distinctUntilChanged()
    )

    vm$ = this.select(
        this.password$,
        this.delayedPassword$.pipe(startWith('')),
        (password, delayedPassword) => {
            return {
                password,
                loading: password !== delayedPassword
            }
        }
    )

    readonly checkPassword = this.effect(() => {
        return this.delayedPassword$.pipe(
            filter((value) => !!value.length),
            switchMap((value) => {
                return this.repository.login(value).pipe(
                    tapResponse(
                        (response)=>{
                            console.log('USER LOGGED IN!!', response)
                            console.log(response.token)
                            this.authFacade.login(response.token, response.username)
                        },
                        (error)=>{
                            console.log('error', error)
                        }
                    )
                )
            })
        )
    })
}