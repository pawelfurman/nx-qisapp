import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";


export class QuestionsSetsListVm {

    readonly entities = signal<any[]>([])
    readonly loading = signal(false)
    readonly setId = signal<any>('')

    readonly vm =  computed(() => {
        return {
            entities: this.entities(),
            loading: this.loading()
        }
    })

}