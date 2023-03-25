import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";


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

export class SetsCreationFromVm {

    readonly name = signal('')
    readonly description = signal('')
    readonly loading = signal(false)

    readonly vm =  computed(() => {
        return {
            name: this.name(),
            description: this.description(),
            loading: this.loading()
        }
    })

    readonly model = {
        name: this.name
    }

    clearForm(){
        this.name.set('')
        this.description.set('')
    }

}