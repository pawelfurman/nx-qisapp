import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class WordSelectorSpecialLongAgoVm {

    readonly amount = signal<number>(10)
    readonly loading = signal<boolean>(false)

    readonly vm =  computed(() => {
        return {
            amount: this.amount(),
            loading: this.loading(),
            disabled: this.amount() < 1 || this.loading()
        }
    })


    
}