import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";


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

export class SetsListVm {

    readonly entities = signal<any[]>([])
    readonly loading = signal(false)

    readonly vm =  computed(() => {
        return {
            entities: this.entities(),
            loading: this.loading()
        }
    })

}