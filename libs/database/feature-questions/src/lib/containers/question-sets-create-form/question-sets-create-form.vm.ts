import { HttpClient } from "@angular/common/http";
import { computed, inject, signal } from "@angular/core";


export class QuestionsSetsCreateFormVm {

    readonly firstValue = signal('')
    readonly firstValueCollocation = signal('')
    readonly firstValueUsage = signal('')
    readonly secondValue = signal('')
    readonly secondValueCollocation = signal('')
    readonly secondValueUsage = signal('')


    readonly form = computed(() => {
        return {
            firstValue: this.firstValue(),
            firstValueCollocation: this.firstValueCollocation(),
            firstValueUsage: this.firstValueUsage(),
            secondValue: this.secondValue(),
            secondValueCollocation: this.secondValueCollocation(),
            secondValueUsage: this.secondValueUsage()
        }
    })


    readonly vm =  computed(() => {
        return {
            firstValue: this.firstValue(),
            firstValueCollocation: this.firstValueCollocation(),
            firstValueUsage: this.firstValueUsage(),
            secondValue: this.secondValue(),
            secondValueCollocation: this.secondValueCollocation(),
            secondValueUsage: this.secondValueUsage()
        }
    })

    resetForm(){
        this.firstValue.set('')
        this.firstValueCollocation.set('')
        this.firstValueUsage.set('')
        this.secondValue.set('')
        this.secondValueCollocation.set('')
        this.secondValueUsage.set('')
    }

}