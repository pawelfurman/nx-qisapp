import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { tap } from "rxjs";
import { SetRepository } from "../../data-access/sets.repository";
import { SetsFetchStore } from "../../store/sets.fetch";
import { SetsListVm } from "./sets-list.vm";


type State = {
}

const initialState: any = {

}

export class SetsListStore extends ComponentStore<State> {

    view = inject(SetsListVm)
    setsFetchStore = inject(SetsFetchStore)

    constructor(){
        super(initialState)
    }

    model$ = this.select(
        this.setsFetchStore.entities$,
        this.setsFetchStore.loading$,
        (entities, loading) => {
            return {
                entities,
                loading
            }
        }
    )

    readonly syncView = this.effect(() => {
        return this.model$.pipe(
            tap((model) => {
                this.view.entities.set(model.entities)
                this.view.loading.set(model.loading)
            })
        )
    })
}