import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { delay, Observable, switchMap, tap } from "rxjs";
import { SetRepository } from "../../data-access/sets.repository";
import { SetsFetchStore } from "../../store/sets.fetch";
import { SetsCreationFromVm } from "./sets-creation-form.vm";


type State = {
    form: {
        name: string,
        description: string
    }
}

const initialState: any = {
    form: {
        name: '',
        description: ''
    }
}

export class SetsCreationFromStore extends ComponentStore<State> {

    repository = inject(SetRepository)
    setsFetchStore = inject(SetsFetchStore)
    view = inject(SetsCreationFromVm)

    constructor(){
        super(initialState)
    }

    //selectors
    form$ = this.select(state => state.form)
    name$ = this.select(
        this.form$,
        (form) => form.name
    )

    description$ = this.select(
        this.form$,
        (form) => form.description
    )


    vm$ = this.select(
        this.name$,
        this.description$,
        (
            name,
            description
        ) => {
            return {
                name,
                description
            }            
        }
    )


    readonly createSet = this.effect((data$: Observable<any>) => {
        return data$.pipe(
            tap((data) => {
                console.log('data', data)
                this.view.loading.set(true)
            }),
            delay(1000),
            switchMap((data) => this.repository.createSet(data).pipe(
                tapResponse(
                    (response) => {
                        this.view.loading.set(false)
                        this.setsFetchStore.fetchSets()
                    },
                    () => {
                        this.view.loading.set(false)
                    }
                )
            ))
        )
    }) 

}