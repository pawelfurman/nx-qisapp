import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class WordSelectorSelectionVm {


    readonly questions = signal<any[]>([])



    readonly vm = computed(() => {
        return {
            questions: this.questions()
        }
    })

     

    
}