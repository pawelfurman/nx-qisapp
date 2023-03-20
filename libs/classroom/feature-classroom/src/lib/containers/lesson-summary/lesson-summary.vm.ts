import { computed, Injectable, signal } from "@angular/core";

@Injectable()
export class WordSelectorSpecialLongAgoVm {

    readonly wordsAmount = signal(0)
    readonly repetition = signal(1)
    readonly answerIncrement = signal(1)

    readonly vm =  computed(() => {
        return {
            wordsAmount: this.wordsAmount(),
            repetition: this.repetition(),
            answerIncrement: this.answerIncrement()
        }
    })

}