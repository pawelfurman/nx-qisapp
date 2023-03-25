import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";



export class SetsListDeleteVm {
    readonly loading = signal(false)
    readonly setId = signal(0)

    readonly vm =  computed(() => {
        return {
            loading: this.loading(),
            setId: this.setId()
        }
    })

}